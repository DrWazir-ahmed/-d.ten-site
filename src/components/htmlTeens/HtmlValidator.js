/**
 * HtmlValidator.js
 * In-browser HTML5 syntax inspector & sandbox generator for 13-16 year old web students.
 * Detects unclosed tags, void element misuse, missing attributes, and provides
 * encouraging bilingual (English & Urdu) feedback.
 */

const VOID_ELEMENTS = new Set([
  'area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 
  'link', 'meta', 'param', 'source', 'track', 'wbr'
]);

const PAIRED_ELEMENTS = [
  'html', 'head', 'body', 'title', 'style', 'script',
  'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'span', 'strong', 'em', 'mark', 'code', 'pre', 'blockquote',
  'a', 'ul', 'ol', 'li', 'dl', 'dt', 'dd',
  'table', 'thead', 'tbody', 'tfoot', 'tr', 'th', 'td',
  'form', 'label', 'select', 'option', 'textarea', 'button',
  'header', 'nav', 'main', 'section', 'article', 'aside', 'footer', 'div',
  'video', 'audio', 'iframe'
];

export function validateHtmlCode(code) {
  const errors = [];
  const warnings = [];

  if (!code || !code.trim()) {
    return {
      isValid: true,
      errors: [],
      warnings: [],
      stats: { tagsCount: 0, elementsCount: 0 }
    };
  }

  // 1. Check for unclosed attribute quotes like <div class="my-class>
  const unclosedQuoteRegex = /<[a-zA-Z0-9]+[^>]*=\s*["'][^"'>]*$/m;
  if (unclosedQuoteRegex.test(code)) {
    errors.push({
      type: 'SYNTAX_QUOTE',
      english: 'Unclosed quotation mark inside an HTML attribute! E.g. class="card" (missing closing quote).',
      urdu: 'ایٹریبیوٹ میں کوٹیشن مارک بند کرنا بھول گئے ہیں۔ مثلاً class="card" میں دوسرا کوٹیشن مارک لگانا ضروری ہے۔'
    });
  }

  // 2. Check for void elements with illegal closing tags e.g. </img> or </br>
  for (const voidTag of VOID_ELEMENTS) {
    const illegalClose = new RegExp(`</\\s*${voidTag}\\s*>`, 'i');
    if (illegalClose.test(code)) {
      warnings.push({
        type: 'VOID_CLOSING',
        english: `<${voidTag}> is a self-closing void element in HTML5 and does NOT have a </${voidTag}> closing tag.`,
        urdu: `<${voidTag}> خودکار طور پر بند ہونے والا ٹیگ ہے، اسے </${voidTag}> لکھنے کی ضرورت نہیں ہے۔`
      });
    }
  }

  // 3. Tag Balance Inspector (Stack based)
  const tagRegex = /<\/?([a-zA-Z0-9\-]+)(?:\s+[^>]*)?>/g;
  const stack = [];
  let match;
  let tagsFound = 0;

  while ((match = tagRegex.exec(code)) !== null) {
    const fullTag = match[0];
    const tagName = match[1].toLowerCase();

    // Skip DOCTYPE and HTML comments
    if (fullTag.startsWith('<!') || fullTag.startsWith('<?')) continue;

    const isClosing = fullTag.startsWith('</');

    if (VOID_ELEMENTS.has(tagName)) {
      tagsFound++;
      continue;
    }

    if (PAIRED_ELEMENTS.includes(tagName)) {
      tagsFound++;
      if (!isClosing) {
        // Opening tag
        stack.push({ tagName, line: code.substring(0, match.index).split('\n').length });
      } else {
        // Closing tag
        if (stack.length === 0) {
          errors.push({
            type: 'EXTRA_CLOSING',
            english: `Found closing </${tagName}> without a matching opening <${tagName}> tag!`,
            urdu: `بغیر کھولے </${tagName}> بند ٹیگ ملا ہے۔ پہلے <${tagName}> کھولنا ضروری ہے۔`
          });
        } else {
          const top = stack.pop();
          if (top.tagName !== tagName) {
            errors.push({
              type: 'MISMATCHED_TAGS',
              english: `Mismatched tags! Expected </${top.tagName}> (opened on line ${top.line}) but found </${tagName}>.`,
              urdu: `ٹیگز کی ترتیب میں غلطی! لائن ${top.line} پر <${top.tagName}> کھولا گیا تھا لیکن بند </${tagName}> کر دیا گیا۔`
            });
          }
        }
      }
    }
  }

  // Any remaining unclosed tags
  if (stack.length > 0) {
    const unclosed = stack.map(s => `<${s.tagName}> (line ${s.line})`).join(', ');
    errors.push({
      type: 'UNCLOSED_TAGS',
      english: `Missing closing tag for: ${unclosed}. Make sure to close each element with </tag>!`,
      urdu: `یہ ٹیگز بند ہونا باقی ہیں: ${unclosed}۔ ہر ٹیگ کو </tag> کے ساتھ بند کریں۔`
    });
  }

  // 4. Missing image src check
  const imgWithoutSrcRegex = /<img(?![^>]*\bsrc\s*=)[^>]*>/i;
  if (imgWithoutSrcRegex.test(code)) {
    warnings.push({
      type: 'MISSING_SRC',
      english: 'An <img> tag is missing its "src" attribute! Without src="image.jpg", the browser cannot show anything.',
      urdu: 'تصویر کے <img> ٹیگ میں src نہیں ملا! تصویر دکھانے کے لیے src="link" لکھنا ضروری ہے۔'
    });
  }

  // 5. Missing anchor href check
  const aWithoutHrefRegex = /<a(?![^>]*\bhref\s*=)[^>]*>/i;
  if (aWithoutHrefRegex.test(code)) {
    warnings.push({
      type: 'MISSING_HREF',
      english: 'An <a> link tag is missing its "href" attribute! Use href="https://..." to make it clickable.',
      urdu: 'لنک <a> ٹیگ میں href نہیں لکھا گیا! کلک کرنے کے قابل بنانے کے لیے href="url" لکھیں۔'
    });
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
    stats: {
      tagsCount: tagsFound,
      hasErrors: errors.length > 0,
      hasWarnings: warnings.length > 0
    }
  };
}

/**
 * Creates a complete HTML document string for secure iframe sandbox rendering
 */
export function buildSandboxHtml(userCode) {
  if (!userCode || !userCode.trim()) {
    return `<!DOCTYPE html><html><body style="font-family:sans-serif;color:#64748b;display:flex;align-items:center;justify-content:center;height:100vh;margin:0;"><p>Type HTML code to see live preview...</p></body></html>`;
  }

  // If the user already wrote full <!DOCTYPE html><html>...</html>
  if (userCode.toLowerCase().includes('<html')) {
    return userCode;
  }

  // Wrap partial snippets into standard modern HTML5 wrapper
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    /* Default modern baseline styles */
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      margin: 16px;
      line-height: 1.5;
    }
  </style>
</head>
<body>
  ${userCode}
</body>
</html>`;
}
