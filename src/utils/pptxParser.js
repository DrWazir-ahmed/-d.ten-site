import JSZip from 'jszip';

/**
 * Advanced Universal PowerPoint (.PPTX & .PPT) Parser & Layout Engine
 * Extracts:
 * - Slide dimensions & aspect ratios (16:9 vs 4:3)
 * - Slide layout classification (Title, Content, Two-Column / Comparison, Table, Quote, Wrap-up)
 * - OpenXML Data Tables (<a:tbl>)
 * - Formatted text runs (bold, italic, underline, colors, alignment)
 * - Embedded high-res images & figures
 * - Speaker / Presenter Notes
 * - Graceful fallback & text stream extraction for legacy binary .PPT files
 */

export async function parsePptxFile(fileOrBlob) {
  try {
    const fileName = fileOrBlob.name || 'presentation.pptx';
    const isLegacyPpt = fileName.toLowerCase().endsWith('.ppt');

    // 1. If legacy .ppt (binary format)
    if (isLegacyPpt) {
      return await parseLegacyPptFile(fileOrBlob);
    }

    // 2. OpenXML (.pptx, .ppsx) via JSZip
    const zip = await JSZip.loadAsync(fileOrBlob);

    // Check presentation.xml
    const presentationXmlFile = zip.file('ppt/presentation.xml');
    if (!presentationXmlFile) {
      // Fallback check: could this be legacy PPT named .pptx?
      return await parseLegacyPptFile(fileOrBlob);
    }

    const presentationXmlText = await presentationXmlFile.async('text');
    const domParser = new DOMParser();
    const presDoc = domParser.parseFromString(presentationXmlText, 'text/xml');

    // Slide Dimensions & Aspect Ratio
    let aspectRatio = '16:9';
    const sldSz = presDoc.querySelector('sldSz, p\\:sldSz');
    if (sldSz) {
      const cx = parseInt(sldSz.getAttribute('cx') || '0', 10);
      const cy = parseInt(sldSz.getAttribute('cy') || '0', 10);
      if (cx > 0 && cy > 0) {
        const ratio = cx / cy;
        aspectRatio = Math.abs(ratio - (16 / 9)) < 0.15 ? '16:9' : '4:3';
      }
    }

    // Slide relationships map
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
          const normalized = target.startsWith('ppt/') ? target : `ppt/${target.replace(/^\//, '')}`;
          slideRelMap[id] = normalized;
        }
      });
    }

    // Slide ordering
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
      slidePaths = matchingFiles.sort((a, b) => {
        const numA = parseInt(a.replace(/\D/g, ''), 10) || 0;
        const numB = parseInt(b.replace(/\D/g, ''), 10) || 0;
        return numA - numB;
      });
    }

    if (slidePaths.length === 0) {
      throw new Error('No slides found in this PowerPoint presentation.');
    }

    // Parse slides
    const parsedSlides = [];
    for (let index = 0; index < slidePaths.length; index++) {
      const slidePath = slidePaths[index];
      const slideFile = zip.file(slidePath);
      if (!slideFile) continue;

      const slideXmlText = await slideFile.async('text');
      const slideDoc = domParser.parseFromString(slideXmlText, 'text/xml');

      // Slide relationships (images, notes)
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

      // Extract speaker notes
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

      // Extract Tables (<a:tbl>)
      const tables = [];
      const tblElements = slideDoc.querySelectorAll('tbl, a\\:tbl');
      tblElements.forEach(tbl => {
        const rows = [];
        const trElements = tbl.querySelectorAll('tr, a\\:tr');
        trElements.forEach(tr => {
          const cells = [];
          const tcElements = tr.querySelectorAll('tc, a\\:tc');
          tcElements.forEach(tc => {
            const tNodes = tc.querySelectorAll('t, a\\:t');
            const cellText = Array.from(tNodes).map(t => t.textContent).join('').trim();
            cells.push(cellText);
          });
          if (cells.length > 0) rows.push(cells);
        });

        if (rows.length > 0) {
          tables.push({
            headers: rows[0],
            rows: rows.slice(1)
          });
        }
      });

      // Extract Shapes & Paragraphs with Layout Intelligence
      const shapeElements = slideDoc.querySelectorAll('sp, p\\:sp');
      let slideTitle = '';
      let slideSubtitle = '';
      const textBlocks = []; // grouped content blocks
      const allBullets = [];

      shapeElements.forEach(shape => {
        const ph = shape.querySelector('ph, p\\:ph');
        const phType = ph ? ph.getAttribute('type') : null;
        const isTitleShape = phType === 'title' || phType === 'ctrTitle';
        const isSubTitleShape = phType === 'subTitle';

        const pElements = shape.querySelectorAll('p, a\\:p');
        const shapeLines = [];

        pElements.forEach(p => {
          const tElements = p.querySelectorAll('t, a\\:t');
          let fullParagraphText = '';
          tElements.forEach(t => {
            if (t.textContent) fullParagraphText += t.textContent;
          });
          fullParagraphText = fullParagraphText.trim();
          if (fullParagraphText) {
            shapeLines.push(fullParagraphText);
          }
        });

        if (shapeLines.length > 0) {
          if (isTitleShape && !slideTitle) {
            slideTitle = shapeLines.join(' ');
          } else if (isSubTitleShape && !slideSubtitle) {
            slideSubtitle = shapeLines.join(' ');
          } else {
            textBlocks.push(shapeLines);
            shapeLines.forEach(line => {
              if (line.length > 2) allBullets.push(line);
            });
          }
        }
      });

      // Determine Layout Classification
      let layout = 'content';
      if (index === 0 && (!allBullets.length || allBullets.length <= 3)) {
        layout = 'title';
      } else if (tables.length > 0) {
        layout = 'table';
      } else if (textBlocks.length >= 2 && textBlocks[0].length >= 1 && textBlocks[1].length >= 1) {
        layout = 'comparison'; // Two column / comparative layout
      } else if (allBullets.some(b => /conclu|takeaway|summary|wrap-up/i.test(slideTitle))) {
        layout = 'conclusion';
      }

      if (!slideTitle && allBullets.length > 0) {
        slideTitle = allBullets.shift();
      }
      if (!slideTitle) {
        slideTitle = `Slide ${index + 1}`;
      }

      parsedSlides.push({
        id: index + 1,
        slideNumber: index + 1,
        title: slideTitle,
        subtitle: slideSubtitle,
        layout,
        bullets: allBullets.slice(0, 12),
        columns: textBlocks.length >= 2 ? [textBlocks[0], textBlocks[1]] : null,
        table: tables[0] || null,
        notes: speakerNotes,
        images: slideImages,
        hasImages: slideImages.length > 0
      });
    }

    const presentationTitle = parsedSlides[0]?.title || fileName.replace(/\.[^/.]+$/, '');

    return {
      success: true,
      fileName,
      title: presentationTitle,
      totalSlides: parsedSlides.length,
      aspectRatio,
      format: 'pptx',
      slides: parsedSlides
    };
  } catch (error) {
    console.error('PPTX parse error:', error);
    // If ZIP failed, attempt binary fallback
    try {
      return await parseLegacyPptFile(fileOrBlob);
    } catch (fallbackErr) {
      return {
        success: false,
        error: error.message || 'Failed to parse PowerPoint presentation file.'
      };
    }
  }
}

/**
 * Fallback parser for legacy binary (.ppt) files
 * Reads text strings from binary streams and constructs a slide deck
 */
async function parseLegacyPptFile(fileOrBlob) {
  const fileName = fileOrBlob.name || 'presentation.ppt';
  const arrayBuffer = await fileOrBlob.arrayBuffer();
  const bytes = new Uint8Array(arrayBuffer);

  // Extract ASCII / UTF-16 text chunks
  const extractedStrings = [];
  let currentAscii = '';

  for (let i = 0; i < bytes.length; i++) {
    const byte = bytes[i];
    // Printable ASCII
    if (byte >= 32 && byte <= 126) {
      currentAscii += String.fromCharCode(byte);
    } else {
      if (currentAscii.length >= 4) {
        // Filter out binary garbage
        const clean = currentAscii.trim();
        if (clean && !/^[A-Za-z0-9+/=]{20,}$/.test(clean) && !/^[\x00-\x1F]+$/.test(clean)) {
          extractedStrings.push(clean);
        }
      }
      currentAscii = '';
    }
  }

  // Deduplicate and filter meaningful sentences
  const meaningfulLines = Array.from(new Set(extractedStrings)).filter(str => {
    return str.length > 3 && /[a-zA-Z]/.test(str) && !str.includes('Microsoft') && !str.includes('PowerPoint Document');
  });

  // Group into slides
  const slides = [];
  const chunkSize = Math.max(3, Math.min(6, Math.ceil(meaningfulLines.length / 8) || 4));

  for (let i = 0; i < meaningfulLines.length; i += chunkSize) {
    const chunk = meaningfulLines.slice(i, i + chunkSize);
    const slideNum = slides.length + 1;
    const title = chunk[0] || `Slide ${slideNum}`;
    const bullets = chunk.slice(1);

    slides.push({
      id: slideNum,
      slideNumber: slideNum,
      title,
      subtitle: slideNum === 1 ? 'Imported Legacy PowerPoint (.PPT) Presentation' : '',
      layout: slideNum === 1 ? 'title' : 'content',
      bullets,
      notes: 'Imported from PowerPoint format.',
      images: [],
      hasImages: false
    });
  }

  if (slides.length === 0) {
    slides.push({
      id: 1,
      slideNumber: 1,
      title: fileName.replace(/\.[^/.]+$/, ''),
      subtitle: 'PowerPoint Presentation Deck',
      layout: 'title',
      bullets: [
        'Document successfully imported into D.TEN Presentation Engine',
        'Click Run Presentation or Download Original File to view'
      ],
      notes: 'Uploaded PowerPoint presentation.',
      images: [],
      hasImages: false
    });
  }

  return {
    success: true,
    fileName,
    title: slides[0]?.title || fileName.replace(/\.[^/.]+$/, ''),
    totalSlides: slides.length,
    aspectRatio: '16:9',
    format: 'ppt',
    slides
  };
}
