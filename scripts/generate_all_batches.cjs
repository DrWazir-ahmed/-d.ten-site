// scripts/generate_all_batches.cjs
const fs = require('fs');
const path = require('path');
const { LANGUAGES } = require('./data/languages.cjs');

// Helper to format sentence entries into CJS files
function writeBatchFile(filePath, varName, items) {
  let content = `const { createTranslationMap } = require('../generate_multilingual_data.cjs');\n\n`;
  content += `const ${varName} = [\n`;
  
  items.forEach((item, idx) => {
    content += `  {\n`;
    content += `    id: ${item.id}, category: ${JSON.stringify(item.category)},\n`;
    content += `    translations: createTranslationMap({\n`;
    const keys = Object.keys(item.translations);
    keys.forEach((k, kIdx) => {
      const [txt, pron] = item.translations[k];
      const isLast = kIdx === keys.length - 1;
      content += `      ${k}: [${JSON.stringify(txt)}, ${JSON.stringify(pron)}]${isLast ? '' : ','}\n`;
    });
    content += `    })\n`;
    content += `  }${idx === items.length - 1 ? '' : ','}\n`;
  });
  
  content += `];\n\nmodule.exports = { ${varName} };\n`;
  
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`✓ Wrote ${varName} (${items.length} items) -> ${filePath}`);
}

console.log('Batch file writer loaded.');
module.exports = { writeBatchFile };
