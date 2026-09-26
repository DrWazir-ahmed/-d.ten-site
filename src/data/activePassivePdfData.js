// Active/Passive Voice Examplified Dataset
// Source: By Dr Wazir Ahmed Deesu | www.deesu.org/dten
// Subject: Ali | Verb: Help | Object: Them

export const ACTIVE_PASSIVE_CHRONOLOGICAL = [
  // Present Tenses
  { id: 1, tense: "Present Indefinite Assertive", active: "Ali helps them.", passive: "They are helped by Ali.", category: "Present" },
  { id: 2, tense: "Present Indefinite Negative", active: "Ali does not help them.", passive: "They are not helped by Ali.", category: "Present" },
  { id: 3, tense: "Present Indefinite Interrogative", active: "Does Ali help them?", passive: "Are they helped by Ali?", category: "Present" },
  { id: 4, tense: "Present Continuous Assertive", active: "Ali is helping them.", passive: "They are being helped by Ali.", category: "Present" },
  { id: 5, tense: "Present Continuous Negative", active: "Ali is not helping them.", passive: "They are not being helped by Ali.", category: "Present" },
  { id: 6, tense: "Present Continuous Interrogative", active: "Is Ali helping them?", passive: "Are they being helped by Ali?", category: "Present" },
  { id: 7, tense: "Present Perfect Assertive", active: "Ali has helped them.", passive: "They have been helped by Ali.", category: "Present" },
  { id: 8, tense: "Present Perfect Negative", active: "Ali has not helped them.", passive: "They have not been helped by Ali.", category: "Present" },
  { id: 9, tense: "Present Perfect Interrogative", active: "Has Ali helped them?", passive: "Have they been helped by Ali?", category: "Present" },
  { id: 10, tense: "Present Perf. Cont. Assertive", active: "Ali has been helping them.", passive: "They have been being helped by Ali.", category: "Present" },
  { id: 11, tense: "Present Perf. Cont. Negative", active: "Ali has not been helping them.", passive: "They have not been being helped by Ali.", category: "Present" },
  { id: 12, tense: "Present Perf. Cont. Interrogative", active: "Has Ali been helping them?", passive: "Have they been being helped by Ali?", category: "Present" },

  // Past Tenses
  { id: 13, tense: "Past Indefinite Assertive", active: "Ali helped them.", passive: "They were helped by Ali.", category: "Past" },
  { id: 14, tense: "Past Indefinite Negative", active: "Ali did not help them.", passive: "They were not helped by Ali.", category: "Past" },
  { id: 15, tense: "Past Indefinite Interrogative", active: "Did Ali help them?", passive: "Were they helped by Ali?", category: "Past" },
  { id: 16, tense: "Past Continuous Assertive", active: "Ali was helping them.", passive: "They were being helped by Ali.", category: "Past" },
  { id: 17, tense: "Past Continuous Negative", active: "Ali was not helping them.", passive: "They were not being helped by Ali.", category: "Past" },
  { id: 18, tense: "Past Continuous Interrogative", active: "Was Ali helping them?", passive: "Were they being helped by Ali?", category: "Past" },
  { id: 19, tense: "Past Perfect Assertive", active: "Ali had helped them.", passive: "They had been helped by Ali.", category: "Past" },
  { id: 20, tense: "Past Perfect Negative", active: "Ali had not helped them.", passive: "They had not been helped by Ali.", category: "Past" },
  { id: 21, tense: "Past Perfect Interrogative", active: "Had Ali helped them?", passive: "Had they been helped by Ali?", category: "Past" },
  { id: 22, tense: "Past Perf. Cont. Assertive", active: "Ali had been helping them.", passive: "They had been being helped by Ali.", category: "Past" },
  { id: 23, tense: "Past Perf. Cont. Negative", active: "Ali had not been helping them.", passive: "They had not been being helped by Ali.", category: "Past" },
  { id: 24, tense: "Past Perf. Cont. Interrogative", active: "Had Ali been helping them?", passive: "Had they been being helped by Ali?", category: "Past" },

  // Future Tenses
  { id: 25, tense: "Future Indefinite Assertive", active: "Ali will help them.", passive: "They will be helped by Ali.", category: "Future" },
  { id: 26, tense: "Future Indefinite Negative", active: "Ali will not help them.", passive: "They will not be helped by Ali.", category: "Future" },
  { id: 27, tense: "Future Indefinite Interrogative", active: "Will Ali help them?", passive: "Will they be helped by Ali?", category: "Future" },
  { id: 28, tense: "Future Continuous Assertive", active: "Ali will be helping them.", passive: "They will be being helped by Ali.", category: "Future" },
  { id: 29, tense: "Future Continuous Negative", active: "Ali will not be helping them.", passive: "They will not be being helped by Ali.", category: "Future" },
  { id: 30, tense: "Future Continuous Interrogative", active: "Will Ali be helping them?", passive: "Will they be being helped by Ali?", category: "Future" },
  { id: 31, tense: "Future Perfect Assertive", active: "Ali will have helped them.", passive: "They will have been helped by Ali.", category: "Future" },
  { id: 32, tense: "Future Perfect Negative", active: "Ali will not have helped them.", passive: "They will not have been helped by Ali.", category: "Future" },
  { id: 33, tense: "Future Perfect Interrogative", active: "Will Ali have helped them?", passive: "Will they have been helped by Ali?", category: "Future" },
  { id: 34, tense: "Future Perf. Cont. Assertive", active: "Ali will have been helping them.", passive: "They will have been being helped by Ali.", category: "Future" },
  { id: 35, tense: "Future Perf. Cont. Negative", active: "Ali will not have been helping them.", passive: "They will not have been being helped by Ali.", category: "Future" },
  { id: 36, tense: "Future Perf. Cont. Interrogative", active: "Will Ali have been helping them?", passive: "Will they have been being helped by Ali?", category: "Future" }
];

export const ACTIVE_PASSIVE_TYPEWISE = [
  {
    type: "Indefinite Tenses",
    rows: [
      { tense: "Present Indefinite-Assertive", active: "Ali helps them.", passive: "They are helped by Ali." },
      { tense: "Present Indefinite-Negative", active: "Ali does not help them.", passive: "They are not helped by Ali." },
      { tense: "Present Indefinite-Interrogative", active: "Does Ali help them?", passive: "Are they helped by Ali?" },
      { tense: "Past Indefinite-Assertive", active: "Ali helped them.", passive: "They were helped by Ali." },
      { tense: "Past Indefinite-Negative", active: "Ali did not help them.", passive: "They were not helped by Ali." },
      { tense: "Past Indefinite-Interrogative", active: "Did Ali help them?", passive: "Were they helped by Ali?" },
      { tense: "Future Indefinite-Assertive", active: "Ali will help them.", passive: "They will be helped by Ali." },
      { tense: "Future Indefinite-Negative", active: "Ali will not help them.", passive: "They will not be helped by Ali." },
      { tense: "Future Indefinite-Interrogative", active: "Will Ali help them?", passive: "Will they be helped by Ali?" }
    ]
  },
  {
    type: "Continuous Tenses",
    rows: [
      { tense: "Present Continuous-Assertive", active: "Ali is helping them.", passive: "They are being helped by Ali." },
      { tense: "Present Continuous-Negative", active: "Ali is not helping them.", passive: "They are not being helped by Ali." },
      { tense: "Present Continuous-Interrogative", active: "Is Ali helping them?", passive: "Are they being helped by Ali?" },
      { tense: "Past Continuous-Assertive", active: "Ali was helping them.", passive: "They were being helped by Ali." },
      { tense: "Past Continuous-Negative", active: "Ali was not helping them.", passive: "They were not being helped by Ali." },
      { tense: "Past Continuous-Interrogative", active: "Was Ali helping them?", passive: "Were they being helped by Ali?" },
      { tense: "Future Continuous-Assertive", active: "Ali will be helping them.", passive: "They will be being helped by Ali." },
      { tense: "Future Continuous-Negative", active: "Ali will not be helping them.", passive: "They will not be being helped by Ali." },
      { tense: "Future Continuous-Interrogative", active: "Will Ali be helping them?", passive: "Will they be being helped by Ali?" }
    ]
  },
  {
    type: "Perfect Tenses",
    rows: [
      { tense: "Present Perfect-Assertive", active: "Ali has helped them.", passive: "They have been helped by Ali." },
      { tense: "Present Perfect-Negative", active: "Ali has not helped them.", passive: "They have not been helped by Ali." },
      { tense: "Present Perfect-Interrogative", active: "Has Ali helped them?", passive: "Have they been helped by Ali?" },
      { tense: "Past Perfect-Assertive", active: "Ali had helped them.", passive: "They had been helped by Ali." },
      { tense: "Past Perfect-Negative", active: "Ali had not helped them.", passive: "They had not been helped by Ali." },
      { tense: "Past Perfect-Interrogative", active: "Had Ali helped them?", passive: "Had they been helped by Ali?" },
      { tense: "Future Perfect-Assertive", active: "Ali will have helped them.", passive: "They will have been helped by Ali." },
      { tense: "Future Perfect-Negative", active: "Ali will not have helped them.", passive: "They will not have been helped by Ali." },
      { tense: "Future Perfect-Interrogative", active: "Will Ali have helped them?", passive: "Will they have been helped by Ali?" }
    ]
  },
  {
    type: "Perfect Continuous Tenses",
    rows: [
      { tense: "Present Perf. Cont. Assertive", active: "Ali has been helping them.", passive: "They have been being helped by Ali." },
      { tense: "Present Perf. Cont. Negative", active: "Ali has not been helping them.", passive: "They have not been being helped by Ali." },
      { tense: "Present Perf. Cont. Interrogative", active: "Has Ali been helping them?", passive: "Have they been being helped by Ali?" },
      { tense: "Past Perf. Cont. Assertive", active: "Ali had been helping them.", passive: "They had been being helped by Ali." },
      { tense: "Past Perf. Cont. Negative", active: "Ali had not been helping them.", passive: "They had not been being helped by Ali." },
      { tense: "Past Perf. Cont. Interrogative", active: "Had Ali been helping them?", passive: "Had they been being helped by Ali?" },
      { tense: "Future Perf. Cont. Assertive", active: "Ali will have been helping them.", passive: "They will have been being helped by Ali." },
      { tense: "Future Perf. Cont. Negative", active: "Ali will not have been helping them.", passive: "They will not have been being helped by Ali." },
      { tense: "Future Perf. Cont. Interrogative", active: "Will Ali have been helping them?", passive: "Will they have been being helped by Ali?" }
    ]
  }
];

export const ACTIVE_PASSIVE_PDF_ITEM = {
  id: "content-pdf-active-passive-voice",
  title: "Active/Passive Voice Examplified (A4 Page Size Printable Chart)",
  description: "Official 2-page A4 reference chart of Active & Passive Voice across all 12 tenses with Assertive, Negative, and Interrogative transformations. Subject: Ali | Verb: Help | Object: Them.",
  contentType: "PDFs",
  category: "English",
  thumbnail: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=800&q=80",
  author: "Dr Wazir Ahmed Deesu",
  membership: "free",
  publishDate: "2025-03-02",
  status: "published",
  downloadUrl: "#",
  isEnglishPdf: true,
  pdfType: "active-passive",
  meta: {
    subject: "Ali",
    verb: "Help",
    object: "Them",
    pages: 2,
    totalRules: 36
  },
  body: `Active/Passive Voice Examplified (A4 Page size Printable)
By Dr Wazir Ahmed Deesu | www.deesu.org/dten
Subject: Ali | Verb: Help | Object: Them

Includes 36 standard active and passive transformations across all 12 tenses:
- Present Indefinite, Continuous, Perfect, Perfect Continuous
- Past Indefinite, Continuous, Perfect, Perfect Continuous
- Future Indefinite, Continuous, Perfect, Perfect Continuous
Available in both Chronological and Type-Wise layouts with instant A4 printing format.`
};
