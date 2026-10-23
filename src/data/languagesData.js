export const SUPPORTED_LANGUAGES = [
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇬🇧', dir: 'ltr', speechCode: 'en-US', script: 'Latin' },
  { code: 'zh', name: 'Mandarin Chinese', nativeName: '中文 (普通话)', flag: '🇨🇳', dir: 'ltr', speechCode: 'zh-CN', script: 'Simplified Chinese' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', flag: '🇮🇳', dir: 'ltr', speechCode: 'hi-IN', script: 'Devanagari' },
  { code: 'es', name: 'Spanish', nativeName: 'Español', flag: '🇪🇸', dir: 'ltr', speechCode: 'es-ES', script: 'Latin' },
  { code: 'fr', name: 'French', nativeName: 'Français', flag: '🇫🇷', dir: 'ltr', speechCode: 'fr-FR', script: 'Latin' },
  { code: 'ar', name: 'Arabic', nativeName: 'العربية', flag: '🇸🇦', dir: 'rtl', speechCode: 'ar-SA', script: 'Arabic' },
  { code: 'bn', name: 'Bengali', nativeName: 'বাংলা', flag: '🇧🇩', dir: 'ltr', speechCode: 'bn-BD', script: 'Bengali' },
  { code: 'pt', name: 'Portuguese', nativeName: 'Português', flag: '🇵🇹', dir: 'ltr', speechCode: 'pt-PT', script: 'Latin' },
  { code: 'ru', name: 'Russian', nativeName: 'Русский', flag: '🇷🇺', dir: 'ltr', speechCode: 'ru-RU', script: 'Cyrillic' },
  { code: 'ur', name: 'Urdu', nativeName: 'اردو', flag: '🇵🇰', dir: 'rtl', speechCode: 'ur-PK', script: 'Nastaliq' },
  { code: 'id', name: 'Indonesian', nativeName: 'Bahasa Indonesia', flag: '🇮🇩', dir: 'ltr', speechCode: 'id-ID', script: 'Latin' },
  { code: 'de', name: 'German', nativeName: 'Deutsch', flag: '🇩🇪', dir: 'ltr', speechCode: 'de-DE', script: 'Latin' },
  { code: 'ja', name: 'Japanese', nativeName: '日本語', flag: '🇯🇵', dir: 'ltr', speechCode: 'ja-JP', script: 'Kanji / Kana' },
  { code: 'pa', name: 'Punjabi', nativeName: 'ਪੰਜਾਬੀ / پنجابی', flag: '🇮🇳', dir: 'ltr', speechCode: 'pa-IN', script: 'Gurmukhi' },
  { code: 'sw', name: 'Swahili', nativeName: 'Kiswahili', flag: '🇰🇪', dir: 'ltr', speechCode: 'sw-KE', script: 'Latin' },
  { code: 'mr', name: 'Marathi', nativeName: 'मराठी', flag: '🇮🇳', dir: 'ltr', speechCode: 'mr-IN', script: 'Devanagari' },
  { code: 'te', name: 'Telugu', nativeName: 'తెలుగు', flag: '🇮🇳', dir: 'ltr', speechCode: 'te-IN', script: 'Telugu' },
  { code: 'tr', name: 'Turkish', nativeName: 'Türkçe', flag: '🇹🇷', dir: 'ltr', speechCode: 'tr-TR', script: 'Latin' },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்', flag: '🇮🇳', dir: 'ltr', speechCode: 'ta-IN', script: 'Tamil' },
  { code: 'vi', name: 'Vietnamese', nativeName: 'Tiếng Việt', flag: '🇻🇳', dir: 'ltr', speechCode: 'vi-VN', script: 'Latin' }
];

export const COURSE_MODULES = [
  {
    id: 1,
    title: "Module 1: Foundations & Daily Essentials",
    shortTitle: "Foundations",
    description: "Greetings, courtesy, essential numbers, basic question starters & daily etiquette",
    vocabRange: [1, 50],
    sentenceRange: [1, 30],
    badge: "Level 1 • Beginner"
  },
  {
    id: 2,
    title: "Module 2: Family, People & Time",
    shortTitle: "Family & Time",
    description: "Family members, relationships, days of the week, months, calendar & telling time",
    vocabRange: [51, 100],
    sentenceRange: [31, 60],
    badge: "Level 2 • Beginner"
  },
  {
    id: 3,
    title: "Module 3: Food, Dining & Market",
    shortTitle: "Food & Dining",
    description: "Fruits, vegetables, meals, ordering food at restaurants, flavors & drinks",
    vocabRange: [101, 150],
    sentenceRange: [61, 90],
    badge: "Level 3 • Elementary"
  },
  {
    id: 4,
    title: "Module 4: House, Living & Daily Objects",
    shortTitle: "Home & Routine",
    description: "Rooms, furniture, household objects, daily schedule, chores & home maintenance",
    vocabRange: [151, 200],
    sentenceRange: [91, 120],
    badge: "Level 4 • Elementary"
  },
  {
    id: 5,
    title: "Module 5: Travel, Navigation & Transit",
    shortTitle: "Travel & Transit",
    description: "Airport check-in, customs, train stations, metro cards, bus rides & city navigation",
    vocabRange: [201, 250],
    sentenceRange: [121, 150],
    badge: "Level 5 • Intermediate"
  },
  {
    id: 6,
    title: "Module 6: Body, Health & Wellness",
    shortTitle: "Body & Health",
    description: "Human anatomy, feeling unwell, pharmacy, doctor consultations & medical advice",
    vocabRange: [251, 300],
    sentenceRange: [151, 180],
    badge: "Level 6 • Intermediate"
  },
  {
    id: 7,
    title: "Module 7: Education, Work & Career",
    shortTitle: "School & Work",
    description: "Classrooms, university exams, job interviews, office meetings & emails",
    vocabRange: [301, 350],
    sentenceRange: [181, 210],
    badge: "Level 7 • Intermediate"
  },
  {
    id: 8,
    title: "Module 8: Technology, Media & Society",
    shortTitle: "Tech & Media",
    description: "Smartphones, internet, cloud services, software apps & digital devices",
    vocabRange: [351, 400],
    sentenceRange: [211, 240],
    badge: "Level 8 • Advanced"
  },
  {
    id: 9,
    title: "Module 9: Living World, Animals & Nature",
    shortTitle: "Nature & Animals",
    description: "Animals, birds, sea life, weather forecasts, seasons & the natural environment",
    vocabRange: [401, 450],
    sentenceRange: [241, 270],
    badge: "Level 9 • Advanced"
  },
  {
    id: 10,
    title: "Module 10: Feelings, Discussions & Fluency",
    shortTitle: "Fluency & Mastery",
    description: "Complex feelings, sentence connectors, opinions, cultural dialogues & graduation",
    vocabRange: [451, 500],
    sentenceRange: [271, 300],
    badge: "Level 10 • Master Polyglot"
  }
];

export const VOCABULARY_CATEGORIES = [
  "All Categories",
  "Greetings & Civility",
  "Numbers & Quantity",
  "People & Family",
  "Time & Calendar",
  "Food & Dining",
  "Home & Daily Objects",
  "Places, Travel & Directions",
  "Core Verbs",
  "Adjectives & Descriptors",
  "Nature, Colors & Weather",
  "Body & Health",
  "Clothing & Fashion",
  "Education & School",
  "Work & Careers",
  "Technology & Devices",
  "Animals & Nature",
  "Emotions & Feelings"
];

export const SENTENCE_CATEGORIES = [
  "All Categories",
  "Greetings & Introductions",
  "Questions & Clarification",
  "Directions & Navigation",
  "Dining & Food",
  "Shopping & Markets",
  "Hotel & Accommodation",
  "Transportation",
  "Health & Medical",
  "Emergencies & Safety",
  "Social & Future Plans",
  "Airport & Flights",
  "Housing & Renting",
  "Education & School",
  "Work & Career",
  "Technology & Devices",
  "Weather & Seasons",
  "Conversations & Thoughts"
];
