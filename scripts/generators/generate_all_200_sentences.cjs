// scripts/generators/generate_all_200_sentences.cjs
const fs = require('fs');
const path = require('path');
const { LANGUAGES } = require('../data/languages.cjs');

console.log('Building full 200 conversational sentences (IDs 101 - 300)...');

// Helper to construct a translation map
function makeTranslation(baseMap) {
  const result = {};
  LANGUAGES.forEach(l => {
    if (baseMap[l.code]) {
      result[l.code] = {
        text: baseMap[l.code][0],
        pronunciation: baseMap[l.code][1] || baseMap[l.code][0]
      };
    } else {
      // Clean fallback with English
      result[l.code] = {
        text: baseMap['en'] ? baseMap['en'][0] : '',
        pronunciation: baseMap['en'] ? baseMap['en'][1] : ''
      };
    }
  });
  return result;
}

// Function to write batch
function writeBatch(filePath, varName, items) {
  let content = `const { createTranslationMap } = require('../generate_multilingual_data.cjs');\n\n`;
  content += `const ${varName} = [\n`;
  
  items.forEach((item, idx) => {
    const numericId = typeof item.id === 'number' ? item.id : (item.sentenceId || idx + 1);
    content += `  {\n`;
    content += `    id: ${numericId}, category: ${JSON.stringify(item.category)},\n`;
    content += `    translations: createTranslationMap({\n`;
    const codes = Object.keys(item.rawTrans);
    codes.forEach((c, cIdx) => {
      const [txt, pron] = item.rawTrans[c];
      const isLast = cIdx === codes.length - 1;
      content += `      ${c}: [${JSON.stringify(txt)}, ${JSON.stringify(pron)}]${isLast ? '' : ','}\n`;
    });
    content += `    })\n`;
    content += `  }${idx === items.length - 1 ? '' : ','}\n`;
  });
  
  content += `];\n\nmodule.exports = { ${varName} };\n`;
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`✓ Wrote ${varName}: ${items.length} sentences to ${filePath}`);
}

module.exports = { makeTranslation, writeBatch };
