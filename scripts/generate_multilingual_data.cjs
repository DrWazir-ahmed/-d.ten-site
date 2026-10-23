const fs = require('fs');
const path = require('path');
const XLSX = require('xlsx');
const { LANGUAGES } = require('./data/languages.cjs');

// Helper to create a multilingual translation object
function createTranslationMap(baseMap) {
  const result = {};
  LANGUAGES.forEach(l => {
    if (baseMap[l.code]) {
      result[l.code] = {
        text: baseMap[l.code][0],
        pronunciation: baseMap[l.code][1] || baseMap[l.code][0]
      };
    } else {
      // Fallback
      result[l.code] = {
        text: baseMap['en'][0],
        pronunciation: baseMap['en'][1] || baseMap['en'][0]
      };
    }
  });
  return result;
}

console.log('Language generator framework loaded.');
module.exports = { createTranslationMap };
