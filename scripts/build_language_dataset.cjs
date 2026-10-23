const fs = require('fs');
const path = require('path');
const XLSX = require('xlsx');

const { LANGUAGES } = require('./data/languages.cjs');

// Load vocabulary batches (IDs 1 - 500)
const b0 = require('./data/vocab_batch_0.cjs').VOCAB_BATCH_0;
const b1 = require('./data/vocab_batch_1.cjs').VOCAB_BATCH_1;
const b2 = require('./data/vocab_batch_2.cjs').VOCAB_BATCH_2;
const b3 = require('./data/vocab_batch_3.cjs').VOCAB_BATCH_3;
const b4 = require('./data/vocab_batch_4.cjs').VOCAB_BATCH_4;
const b5 = require('./data/vocab_batch_5.cjs').VOCAB_BATCH_5;
const b6 = require('./data/vocab_batch_6.cjs').VOCAB_BATCH_6;
const b7 = require('./data/vocab_batch_7.cjs').VOCAB_BATCH_7;
const b8 = require('./data/vocab_batch_8.cjs').VOCAB_BATCH_8;
const b9 = require('./data/vocab_batch_9.cjs').VOCAB_BATCH_9;
const b10 = require('./data/vocab_batch_10.cjs').VOCAB_BATCH_10;
const b11 = require('./data/vocab_batch_11.cjs').VOCAB_BATCH_11;
const VOCABULARY_LIST = [...b0, ...b1, ...b2, ...b3, ...b4, ...b5, ...b6, ...b7, ...b8, ...b9, ...b10, ...b11];

// Load sentences batches (IDs 1 - 300)
const s1 = require('./data/sentences_batch_1.cjs').SENTENCES_BATCH_1;
const s2 = require('./data/sentences_batch_2.cjs').SENTENCES_BATCH_2;
const s3 = require('./data/sentences_batch_3.cjs').SENTENCES_BATCH_3;
const s4 = require('./data/sentences_batch_4.cjs').SENTENCES_BATCH_4;
const s5 = require('./data/sentences_batch_5.cjs').SENTENCES_BATCH_5;
const s6 = require('./data/sentences_batch_6.cjs').SENTENCES_BATCH_6;
const SENTENCES_LIST = [...s1, ...s2, ...s3, ...s4, ...s5, ...s6];

console.log('Compiling 20-Language Learning Dataset...');
console.log(`- Vocabulary: ${VOCABULARY_LIST.length} items`);
console.log(`- Sentences: ${SENTENCES_LIST.length} items`);
console.log(`- Languages: ${LANGUAGES.length} world languages`);

// Build Excel Workbook
const wb = XLSX.utils.book_new();

// Sheet 1: Vocabulary (250 Words)
const vocabRows = VOCABULARY_LIST.map((item) => {
  const row = {
    ID: item.id,
    Category: item.category
  };
  LANGUAGES.forEach(lang => {
    const trans = item.translations[lang.code] || { text: '', pronunciation: '' };
    row[`${lang.name}`] = trans.text;
    row[`${lang.name}_Pronunciation`] = trans.pronunciation;
  });
  return row;
});
const vocabSheet = XLSX.utils.json_to_sheet(vocabRows);
XLSX.utils.book_append_sheet(wb, vocabSheet, 'Vocabulary (500 Words)');

// Sheet 2: Conversational Sentences (300)
const sentenceRows = SENTENCES_LIST.map((item) => {
  const row = {
    ID: item.id,
    Category: item.category
  };
  LANGUAGES.forEach(lang => {
    const trans = item.translations[lang.code] || { text: '', pronunciation: '' };
    row[`${lang.name}`] = trans.text;
    row[`${lang.name}_Pronunciation`] = trans.pronunciation;
  });
  return row;
});
const sentenceSheet = XLSX.utils.json_to_sheet(sentenceRows);
XLSX.utils.book_append_sheet(wb, sentenceSheet, 'Conversations (300 Sentences)');

// Sheet 3: Languages Overview
const langRows = LANGUAGES.map(l => ({
  'Language Code': l.code,
  'Language': l.name,
  'Native Script Name': l.nativeName,
  'Flag': l.flag,
  'Reading Direction': l.dir.toUpperCase(),
  'Writing Script': l.script,
  'Web Speech Synthesis Code': l.speechCode
}));
const langSheet = XLSX.utils.json_to_sheet(langRows);
XLSX.utils.book_append_sheet(wb, langSheet, 'Languages Overview (20)');

// Sheet 4: Course Guide
const guideRows = [
  { 'Section': 'Course Title', 'Details': 'Global Polyglot: Master 20 World Languages' },
  { 'Section': 'Coverage', 'Details': '500 Essential Core Vocabulary Words + 300 Real-life Conversational Sentences (Organized into Modules)' },
  { 'Section': 'Languages Included', 'Details': 'English, Mandarin Chinese, Hindi, Spanish, French, Arabic, Bengali, Portuguese, Russian, Urdu, Indonesian, German, Japanese, Punjabi, Swahili, Marathi, Telugu, Turkish, Tamil, Vietnamese' },
  { 'Section': 'Bilingual Learning Method', 'Details': 'Select any native language (e.g. Urdu, English, Hindi, Arabic) and choose any target language. Study side-by-side with phonetic romanized pronunciations and native audio speech synthesis.' },
  { 'Section': 'Interactive Studio', 'Details': 'Available online on the D.TEN platform under Courses -> Global Polyglot Studio with flashcard practice, audio player, search filters, and instant Excel export.' }
];
const guideSheet = XLSX.utils.json_to_sheet(guideRows);
XLSX.utils.book_append_sheet(wb, guideSheet, 'Course Guide');

// File paths
const excelRootPath = path.resolve('Global_Language_Learning_20_Languages.xlsx');
const publicDir = path.resolve('public/data/languages');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}
const excelPublicPath = path.join(publicDir, 'Global_Language_Learning_20_Languages.xlsx');
const jsonPublicPath = path.join(publicDir, 'language_learning_20.json');

// Write Excel files
XLSX.writeFileSync(wb, excelRootPath);
console.log(`✓ Master Excel workbook written: ${excelRootPath}`);

fs.copyFileSync(excelRootPath, excelPublicPath);
console.log(`✓ Browser downloadable Excel copied: ${excelPublicPath}`);

// Write JSON for ultra-fast client-side reactive search & audio playback
const fullDataset = {
  version: '1.0',
  updatedAt: new Date().toISOString(),
  languages: LANGUAGES,
  vocabularyCount: VOCABULARY_LIST.length,
  sentencesCount: SENTENCES_LIST.length,
  vocabulary: VOCABULARY_LIST,
  sentences: SENTENCES_LIST
};

fs.writeFileSync(jsonPublicPath, JSON.stringify(fullDataset, null, 2), 'utf8');
console.log(`✓ Public JSON dataset saved: ${jsonPublicPath}`);

// Sync to dist if present
const distDir = path.resolve('dist/data/languages');
if (fs.existsSync(path.resolve('dist'))) {
  fs.mkdirSync(distDir, { recursive: true });
  fs.copyFileSync(excelRootPath, path.join(distDir, 'Global_Language_Learning_20_Languages.xlsx'));
  fs.writeFileSync(path.join(distDir, 'language_learning_20.json'), JSON.stringify(fullDataset), 'utf8');
  console.log(`✓ Synced to dist: ${distDir}`);
}

console.log('=== MULTILINGUAL DATASET BUILD SUCCESSFUL ===');
