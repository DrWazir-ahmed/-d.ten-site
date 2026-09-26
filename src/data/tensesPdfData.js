// Tenses Examplified Dataset (English to Urdu)
// Source: By Dr Wazir Ahmed Deesu | www.deesu.org/dten
// Exemplary Sentence: "He writes a letter" / "وہ خط لکھتا ہے"

export const TENSES_CHRONOLOGICAL = [
  // Present Tenses
  { id: 1, tense: "Present Indefinite Assertive", english: "He writes a letter.", urdu: "وہ خط لکھتا ہے", category: "Present" },
  { id: 2, tense: "Present Indefinite Negative", english: "He does not write a letter.", urdu: "وہ خط نہیں لکھتا ہے", category: "Present" },
  { id: 3, tense: "Present Indefinite Interrogative", english: "Does he write a letter?", urdu: "کیا وہ خط لکھتا ہے؟", category: "Present" },
  { id: 4, tense: "Present Continuous Assertive", english: "He is writing a letter.", urdu: "وہ خط لکھ رہا ہے", category: "Present" },
  { id: 5, tense: "Present Continuous Negative", english: "He is not writing a letter.", urdu: "وہ خط نہیں لکھ رہا ہے", category: "Present" },
  { id: 6, tense: "Present Cont. Interrogative", english: "Is he writing a letter?", urdu: "کیا وہ خط لکھ رہا ہے؟", category: "Present" },
  { id: 7, tense: "Present Perfect Assertive", english: "He has written a letter.", urdu: "وہ خط لکھ چکا ہے", category: "Present" },
  { id: 8, tense: "Present Perfect Negative", english: "He has not written a letter.", urdu: "وہ خط نہیں لکھ چکا ہے", category: "Present" },
  { id: 9, tense: "Present Perfect Interrogative", english: "Has he written a letter?", urdu: "کیا وہ خط لکھ چکا ہے؟", category: "Present" },
  { id: 10, tense: "Present Perf. Cont. Assertive", english: "He has been writing a letter since morning.", urdu: "وہ صبح سے خط لکھ رہا ہے", category: "Present" },
  { id: 11, tense: "Present Perf. Cont. Negative", english: "He has not been writing a letter since morning.", urdu: "وہ صبح سے خط نہیں لکھ رہا ہے", category: "Present" },
  { id: 12, tense: "Present Perf. Cont. Interrogative", english: "Has he been writing a letter since morning?", urdu: "کیا وہ صبح سے خط لکھ رہا ہے؟", category: "Present" },

  // Past Tenses
  { id: 13, tense: "Past Indefinite Assertive", english: "He wrote a letter.", urdu: "اس نے خط لکھا", category: "Past" },
  { id: 14, tense: "Past Indefinite Negative", english: "He did not write a letter.", urdu: "اس نے خط نہیں لکھا", category: "Past" },
  { id: 15, tense: "Past Indefinite Interrogative", english: "Did he write a letter?", urdu: "کیا اس نے خط لکھا؟", category: "Past" },
  { id: 16, tense: "Past Continuous Assertive", english: "He was writing a letter.", urdu: "وہ خط لکھ رہا تھا", category: "Past" },
  { id: 17, tense: "Past Continuous Negative", english: "He was not writing a letter.", urdu: "وہ خط نہیں لکھ رہا تھا", category: "Past" },
  { id: 18, tense: "Past Continuous Interrogative", english: "Was he writing a letter?", urdu: "کیا وہ خط لکھ رہا تھا؟", category: "Past" },
  { id: 19, tense: "Past Perfect Assertive", english: "He had written a letter.", urdu: "وہ خط لکھ چکا تھا", category: "Past" },
  { id: 20, tense: "Past Perfect Negative", english: "He had not written a letter.", urdu: "وہ خط نہیں لکھ چکا تھا", category: "Past" },
  { id: 21, tense: "Past Perfect Interrogative", english: "Had he written a letter?", urdu: "کیا وہ خط لکھ چکا تھا؟", category: "Past" },
  { id: 22, tense: "Past Perf. Cont. Assertive", english: "He had been writing a letter since morning.", urdu: "وہ صبح سے خط لکھ رہا تھا", category: "Past" },
  { id: 23, tense: "Past Perf. Cont. Negative", english: "He had not been writing a letter since morning.", urdu: "وہ صبح سے خط نہیں لکھ رہا تھا", category: "Past" },
  { id: 24, tense: "Past Perf. Cont. Interrogative", english: "Had he been writing a letter since morning?", urdu: "کیا وہ صبح سے خط لکھ رہا تھا؟", category: "Past" },

  // Future Tenses
  { id: 25, tense: "Future Indefinite Assertive", english: "He will write a letter.", urdu: "وہ خط لکھے گا", category: "Future" },
  { id: 26, tense: "Future Indefinite Negative", english: "He will not write a letter.", urdu: "وہ خط نہیں لکھے گا", category: "Future" },
  { id: 27, tense: "Future Indefinite Interrogative", english: "Will he write a letter?", urdu: "کیا وہ خط لکھے گا؟", category: "Future" },
  { id: 28, tense: "Future Continuous Assertive", english: "He will be writing a letter.", urdu: "وہ خط لکھ رہا ہوگا", category: "Future" },
  { id: 29, tense: "Future Continuous Negative", english: "He will not be writing a letter.", urdu: "وہ خط نہیں لکھ رہا ہوگا", category: "Future" },
  { id: 30, tense: "Future Continuous Interrogative", english: "Will he be writing a letter?", urdu: "کیا وہ خط لکھ رہا ہوگا؟", category: "Future" },
  { id: 31, tense: "Future Perfect Assertive", english: "He will have written a letter.", urdu: "وہ خط لکھ چکا ہوگا", category: "Future" },
  { id: 32, tense: "Future Perfect Negative", english: "He will not have written a letter.", urdu: "وہ خط نہیں لکھ چکا ہوگا", category: "Future" },
  { id: 33, tense: "Future Perfect Interrogative", english: "Will he have written a letter?", urdu: "کیا وہ خط لکھ چکا ہوگا؟", category: "Future" },
  { id: 34, tense: "Future Perf. Cont. Assertive", english: "He will have been writing a letter since morning.", urdu: "وہ صبح سے خط لکھ رہا ہوگا", category: "Future" },
  { id: 35, tense: "Future Perf. Cont. Negative", english: "He will not have been writing a letter since morning.", urdu: "وہ صبح سے خط نہیں لکھ رہا ہوگا", category: "Future" },
  { id: 36, tense: "Future Perf. Cont. Interrogative", english: "Will he have been writing a letter since morning?", urdu: "کیا وہ صبح سے خط لکھ رہا ہوگا؟", category: "Future" }
];

export const TENSES_TYPEWISE = [
  {
    type: "Indefinite Tenses",
    rows: [
      { tense: "Present Indefinite-Assertive", english: "He writes a letter.", urdu: "وہ خط لکھتا ہے" },
      { tense: "Present Indefinite-Negative", english: "He does not write a letter.", urdu: "وہ خط نہیں لکھتا ہے" },
      { tense: "Present Indefinite-Interrogative", english: "Does he write a letter?", urdu: "کیا وہ خط لکھتا ہے؟" },
      { tense: "Past Indefinite-Assertive", english: "He wrote a letter.", urdu: "اس نے خط لکھا" },
      { tense: "Past Indefinite-Negative", english: "He did not write a letter.", urdu: "اس نے خط نہیں لکھا" },
      { tense: "Past Indefinite-Interrogative", english: "Did he write a letter?", urdu: "کیا اس نے خط لکھا؟" },
      { tense: "Future Indefinite-Assertive", english: "He will write a letter.", urdu: "وہ خط لکھے گا" },
      { tense: "Future Indefinite-Negative", english: "He will not write a letter.", urdu: "وہ خط نہیں لکھے گا" },
      { tense: "Future Indefinite-Interrogative", english: "Will he write a letter?", urdu: "کیا وہ خط لکھے گا؟" }
    ]
  },
  {
    type: "Continuous Tenses",
    rows: [
      { tense: "Present Continuous-Assertive", english: "He is writing a letter.", urdu: "وہ خط لکھ رہا ہے" },
      { tense: "Present Continuous-Negative", english: "He is not writing a letter.", urdu: "وہ خط نہیں لکھ رہا ہے" },
      { tense: "Present Continuous-Interrogative", english: "Is he writing a letter?", urdu: "کیا وہ خط لکھ رہا ہے؟" },
      { tense: "Past Continuous-Assertive", english: "He was writing a letter.", urdu: "وہ خط لکھ رہا تھا" },
      { tense: "Past Continuous-Negative", english: "He was not writing a letter.", urdu: "وہ خط نہیں لکھ رہا تھا" },
      { tense: "Past Continuous-Interrogative", english: "Was he writing a letter?", urdu: "کیا وہ خط لکھ رہا تھا؟" },
      { tense: "Future Continuous-Assertive", english: "He will be writing a letter.", urdu: "وہ خط لکھ رہا ہوگا" },
      { tense: "Future Continuous-Negative", english: "He will not be writing a letter.", urdu: "وہ خط نہیں لکھ رہا ہوگا" },
      { tense: "Future Continuous-Interrogative", english: "Will he be writing a letter?", urdu: "کیا وہ خط لکھ رہا ہوگا؟" }
    ]
  },
  {
    type: "Perfect Tenses",
    rows: [
      { tense: "Present Perfect-Assertive", english: "He has written a letter.", urdu: "وہ خط لکھ چکا ہے" },
      { tense: "Present Perfect-Negative", english: "He has not written a letter.", urdu: "وہ خط نہیں لکھ چکا ہے" },
      { tense: "Present Perfect-Interrogative", english: "Has he written a letter?", urdu: "کیا وہ خط لکھ چکا ہے؟" },
      { tense: "Past Perfect-Assertive", english: "He had written a letter.", urdu: "وہ خط لکھ چکا تھا" },
      { tense: "Past Perfect-Negative", english: "He had not written a letter.", urdu: "وہ خط نہیں لکھ چکا تھا" },
      { tense: "Past Perfect-Interrogative", english: "Had he written a letter?", urdu: "کیا وہ خط لکھ چکا تھا؟" },
      { tense: "Future Perfect-Assertive", english: "He will have written a letter.", urdu: "وہ خط لکھ چکا ہوگا" },
      { tense: "Future Perfect-Negative", english: "He will not have written a letter.", urdu: "وہ خط نہیں لکھ چکا ہوگا" },
      { tense: "Future Perfect-Interrogative", english: "Will he have written a letter?", urdu: "کیا وہ خط لکھ چکا ہوگا؟" }
    ]
  },
  {
    type: "Perfect Continuous Tenses",
    rows: [
      { tense: "Present Perf. Cont. Assertive", english: "He has been writing a letter since morning.", urdu: "وہ صبح سے خط لکھ رہا ہے" },
      { tense: "Present Perf. Cont. Negative", english: "He has not been writing a letter since morning.", urdu: "وہ صبح سے خط نہیں لکھ رہا ہے" },
      { tense: "Present Perf. Cont. Interrogative", english: "Has he been writing a letter since morning?", urdu: "کیا وہ صبح سے خط لکھ رہا ہے؟" },
      { tense: "Past Perf. Cont. Assertive", english: "He had been writing a letter since morning.", urdu: "وہ صبح سے خط لکھ رہا تھا" },
      { tense: "Past Perf. Cont. Negative", english: "He had not been writing a letter since morning.", urdu: "وہ صبح سے خط نہیں لکھ رہا تھا" },
      { tense: "Past Perf. Cont. Interrogative", english: "Had he been writing a letter since morning?", urdu: "کیا وہ صبح سے خط لکھ رہا تھا؟" },
      { tense: "Future Perf. Cont. Assertive", english: "He will have been writing a letter since morning.", urdu: "وہ صبح سے خط لکھ رہا ہوگا" },
      { tense: "Future Perf. Cont. Negative", english: "He will not have been writing a letter since morning.", urdu: "وہ صبح سے خط نہیں لکھ رہا ہوگا" },
      { tense: "Future Perf. Cont. Interrogative", english: "Will he have been writing a letter since morning?", urdu: "کیا وہ صبح سے خط لکھ رہا ہوگا؟" }
    ]
  }
];

export const TENSES_PDF_ITEM = {
  id: "content-pdf-tenses-examplified",
  title: "Tenses Examplified — English to Urdu (A4 Page Size Printable Chart)",
  description: "Official 2-page A4 reference chart of all 12 English tenses with authentic Urdu translations across Assertive, Negative, and Interrogative forms. Includes Chronological and Type-Wise layouts.",
  contentType: "PDFs",
  category: "English",
  thumbnail: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&w=800&q=80",
  author: "Dr Wazir Ahmed Deesu",
  membership: "free",
  publishDate: "2025-03-02",
  status: "published",
  downloadUrl: "#",
  isEnglishPdf: true,
  pdfType: "tenses",
  meta: {
    sentence: "He writes a letter",
    urduSentence: "وہ خط لکھتا ہے",
    pages: 2,
    totalRules: 36
  },
  body: `Tenses Examplified (A4 Page size Printable)
By Dr Wazir Ahmed Deesu | www.deesu.org/dten
Formula Example: "He writes a letter" (وہ خط لکھتا ہے)

Complete 36-sentence bilingual English-Urdu tense reference chart:
- Present Indefinite, Continuous, Perfect, Perfect Continuous
- Past Indefinite, Continuous, Perfect, Perfect Continuous
- Future Indefinite, Continuous, Perfect, Perfect Continuous
Available in Chronological and Type-Wise layouts with instant A4 print & PDF export.`
};
