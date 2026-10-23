const b0 = require('./data/vocab_batch_0.cjs').VOCAB_BATCH_0;
const b1 = require('./data/vocab_batch_1.cjs').VOCAB_BATCH_1;
const b2 = require('./data/vocab_batch_2.cjs').VOCAB_BATCH_2;
const b3 = require('./data/vocab_batch_3.cjs').VOCAB_BATCH_3;
const b4 = require('./data/vocab_batch_4.cjs').VOCAB_BATCH_4;
const b5 = require('./data/vocab_batch_5.cjs').VOCAB_BATCH_5;
const b6 = require('./data/vocab_batch_6.cjs').VOCAB_BATCH_6;

const s1 = require('./data/sentences_batch_1.cjs').SENTENCES_BATCH_1;
const s2 = require('./data/sentences_batch_2.cjs').SENTENCES_BATCH_2;

const allVocab = [...b0, ...b1, ...b2, ...b3, ...b4, ...b5, ...b6];
const allSentences = [...s1, ...s2];

console.log('--- DATASET VERIFICATION ---');
console.log('Total Vocabulary:', allVocab.length);
console.log('Total Sentences:', allSentences.length);

const { LANGUAGES } = require('./data/languages.cjs');
console.log('Target Languages:', LANGUAGES.length);

// Verify all languages exist in all items
let vocabMissing = 0;
allVocab.forEach(v => {
  LANGUAGES.forEach(l => {
    if (!v.translations[l.code] || !v.translations[l.code].text) vocabMissing++;
  });
});

let sentenceMissing = 0;
allSentences.forEach(s => {
  LANGUAGES.forEach(l => {
    if (!s.translations[l.code] || !s.translations[l.code].text) sentenceMissing++;
  });
});

console.log('Vocab missing translations:', vocabMissing);
console.log('Sentences missing translations:', sentenceMissing);
