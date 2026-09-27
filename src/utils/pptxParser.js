import JSZip from 'jszip';

/**
 * Universal PPTX (PowerPoint OpenXML) Parser
 * Extracts slides, titles, body paragraphs, bullet points, speaker notes, and embedded images
 * completely client-side without requiring server-side software.
 */
export async function parsePptxFile(fileOrBlob) {
  try {
    const zip = await JSZip.loadAsync(fileOrBlob);

    // 1. Check for presentation.xml
    const presentationXmlFile = zip.file('ppt/presentation.xml');
    if (!presentationXmlFile) {
      throw new Error('Invalid PPTX file: ppt/presentation.xml not found.');
    }

    const presentationXmlText = await presentationXmlFile.async('text');
    const domParser = new DOMParser();
    const presDoc = domParser.parseFromString(presentationXmlText, 'text/xml');

    // 2. Discover slide files & order
    // Check presentation.xml.rels for relationship IDs
    const relsFile = zip.file('ppt/_rels/presentation.xml.rels');
    const slideRelMap = {};
    if (relsFile) {
      const relsText = await relsFile.async('text');
      const relsDoc = domParser.parseFromString(relsText, 'text/xml');
      const relElements = relsDoc.querySelectorAll('Relationship');
      relElements.forEach(rel => {
        const id = rel.getAttribute('Id');
        const target = rel.getAttribute('Target');
        if (target && (target.includes('slides/slide') || rel.getAttribute('Type')?.includes('/slide'))) {
          // Normalize path: target might be "slides/slide1.xml"
          const normalized = target.startsWith('ppt/') ? target : `ppt/${target.replace(/^\//, '')}`;
          slideRelMap[id] = normalized;
        }
      });
    }

    // Try to get ordered slide list from <p:sldIdLst>
    const sldIdList = presDoc.querySelectorAll('sldId, p\\:sldId');
    let slidePaths = [];

    if (sldIdList && sldIdList.length > 0) {
      sldIdList.forEach(node => {
        const rId = node.getAttribute('r:id') || node.getAttribute('id');
        if (rId && slideRelMap[rId]) {
          slidePaths.push(slideRelMap[rId]);
        }
      });
    }

    // Fallback: search all files matching ppt/slides/slide*.xml
    if (slidePaths.length === 0) {
      const matchingFiles = [];
      zip.forEach((path) => {
        if (/^ppt\/slides\/slide\d+\.xml$/i.test(path)) {
          matchingFiles.push(path);
        }
      });
      // Sort numerically
      slidePaths = matchingFiles.sort((a, b) => {
        const numA = parseInt(a.replace(/\D/g, ''), 10) || 0;
        const numB = parseInt(b.replace(/\D/g, ''), 10) || 0;
        return numA - numB;
      });
    }

    if (slidePaths.length === 0) {
      throw new Error('No slides found in this PPTX file.');
    }

    // 3. Parse each slide
    const parsedSlides = [];
    for (let index = 0; index < slidePaths.length; index++) {
      const slidePath = slidePaths[index];
      const slideFile = zip.file(slidePath);
      if (!slideFile) continue;

      const slideXmlText = await slideFile.async('text');
      const slideDoc = domParser.parseFromString(slideXmlText, 'text/xml');

      // Check relationships for this slide (images, notes, etc.)
      const slideFileName = slidePath.split('/').pop();
      const slideRelsPath = `ppt/slides/_rels/${slideFileName}.rels`;
      const slideRelsFile = zip.file(slideRelsPath);
      const imageRelMap = {};
      let notesPath = null;

      if (slideRelsFile) {
        const slideRelsText = await slideRelsFile.async('text');
        const sRelsDoc = domParser.parseFromString(slideRelsText, 'text/xml');
        const sRels = sRelsDoc.querySelectorAll('Relationship');
        sRels.forEach(r => {
          const type = r.getAttribute('Type') || '';
          const target = r.getAttribute('Target') || '';
          const id = r.getAttribute('Id');
          if (type.includes('/image') && id) {
            // Target is usually "../media/image1.png"
            const mediaPath = target.startsWith('..') ? `ppt/${target.replace(/^\.\.\//, '')}` : `ppt/media/${target.split('/').pop()}`;
            imageRelMap[id] = mediaPath;
          } else if (type.includes('/notesSlide')) {
            notesPath = target.startsWith('..') ? `ppt/${target.replace(/^\.\.\//, '')}` : `ppt/notesSlides/${target.split('/').pop()}`;
          }
        });
      }

      // Extract images from zip
      const slideImages = [];
      const blipElements = slideDoc.querySelectorAll('blip, a\\:blip');
      for (const blip of blipElements) {
        const embedId = blip.getAttribute('r:embed') || blip.getAttribute('embed');
        if (embedId && imageRelMap[embedId]) {
          const mediaPath = imageRelMap[embedId];
          const mediaFile = zip.file(mediaPath);
          if (mediaFile) {
            try {
              const base64Data = await mediaFile.async('base64');
              const ext = mediaPath.split('.').pop().toLowerCase();
              const mime = ext === 'jpg' || ext === 'jpeg' ? 'image/jpeg' : ext === 'svg' ? 'image/svg+xml' : 'image/png';
              slideImages.push({
                id: embedId,
                name: mediaPath.split('/').pop(),
                dataUrl: `data:${mime};base64,${base64Data}`
              });
            } catch (imgErr) {
              console.warn(`Could not extract media file ${mediaPath}:`, imgErr);
            }
          }
        }
      }

      // Extract speaker notes if available
      let speakerNotes = '';
      if (notesPath) {
        const notesFile = zip.file(notesPath);
        if (notesFile) {
          try {
            const notesXmlText = await notesFile.async('text');
            const notesDoc = domParser.parseFromString(notesXmlText, 'text/xml');
            const noteTextNodes = notesDoc.querySelectorAll('t, a\\:t');
            const noteTexts = Array.from(noteTextNodes).map(n => n.textContent?.trim()).filter(Boolean);
            speakerNotes = noteTexts.join(' ');
          } catch (notesErr) {
            console.warn('Could not extract notes:', notesErr);
          }
        }
      }

      // Extract shapes & paragraphs
      const shapeElements = slideDoc.querySelectorAll('sp, p\\:sp');
      let slideTitle = '';
      let slideSubtitle = '';
      const paragraphs = [];
      const bullets = [];

      shapeElements.forEach(shape => {
        // Check placeholder type
        const ph = shape.querySelector('ph, p\\:ph');
        const phType = ph ? ph.getAttribute('type') : null;
        const isTitleShape = phType === 'title' || phType === 'ctrTitle';
        const isSubTitleShape = phType === 'subTitle';

        // Extract paragraphs
        const pElements = shape.querySelectorAll('p, a\\:p');
        pElements.forEach(p => {
          const tElements = p.querySelectorAll('t, a\\:t');
          let fullParagraphText = '';
          tElements.forEach(t => {
            if (t.textContent) fullParagraphText += t.textContent;
          });

          fullParagraphText = fullParagraphText.trim();
          if (!fullParagraphText) return;

          if (isTitleShape && !slideTitle) {
            slideTitle = fullParagraphText;
          } else if (isSubTitleShape && !slideSubtitle) {
            slideSubtitle = fullParagraphText;
          } else {
            paragraphs.push(fullParagraphText);
            // Treat non-title text lines as bullets or bullet items
            if (fullParagraphText.length > 2) {
              bullets.push(fullParagraphText);
            }
          }
        });
      });

      // If no title was found via placeholder, use the first short paragraph or fallback
      if (!slideTitle && paragraphs.length > 0) {
        slideTitle = paragraphs.shift();
      }
      if (!slideTitle) {
        slideTitle = `Slide ${index + 1}`;
      }

      parsedSlides.push({
        id: index + 1,
        slideNumber: index + 1,
        title: slideTitle,
        subtitle: slideSubtitle,
        bullets: bullets.slice(0, 10),
        paragraphs,
        rawText: paragraphs.join('\n'),
        notes: speakerNotes,
        images: slideImages,
        hasImages: slideImages.length > 0
      });
    }

    // Determine deck title
    const presentationTitle = parsedSlides[0]?.title || (fileOrBlob.name ? fileOrBlob.name.replace(/\.[^/.]+$/, '') : 'PowerPoint Presentation');

    return {
      success: true,
      fileName: fileOrBlob.name || 'presentation.pptx',
      title: presentationTitle,
      totalSlides: parsedSlides.length,
      format: 'pptx',
      slides: parsedSlides
    };
  } catch (error) {
    console.error('PPTX parse error:', error);
    return {
      success: false,
      error: error.message || 'Failed to parse PPTX file'
    };
  }
}
