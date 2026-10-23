export const POLYGLOT_COURSE_DATA = {
  id: "course-polyglot-20-languages",
  title: "Global Polyglot: Master 20 World Languages",
  description: "Comprehensive multilingual learning course covering 20 world languages: English, Mandarin Chinese, Hindi, Spanish, French, Arabic, Bengali, Portuguese, Russian, Urdu, Indonesian, German, Japanese, Punjabi, Swahili, Marathi, Telugu, Turkish, Tamil, and Vietnamese. Learn 250 common vocabulary words and 100 conversational sentences with bilingual text, phonetic pronunciations, and native audio synthesis.",
  category: "Language Learning",
  level: "All Levels",
  membership: "free",
  thumbnail: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?auto=format&fit=crop&w=800&q=80",
  instructor: "D.TEN Global Language Faculty",
  duration: "10 hours",
  lessonCount: 6,
  rating: 5.0,
  reviewsCount: 528,
  status: "published",
  createdDate: "2026-10-23",
  excelDownloadUrl: "/data/languages/Global_Language_Learning_20_Languages.xlsx",
  objectives: [
    "Select your native language and learn any of the 20 most spoken world languages",
    "Master 250 core daily vocabulary words across 10 vital categories",
    "Speak 100 real-life conversational sentences for travel, dining, shopping, hotel, emergency, and social interaction",
    "Read phonetic romanizations and listen to crystal-clear native speech synthesis",
    "Download the complete course dataset as a structured Excel workbook (.xlsx)"
  ],
  requirements: [
    "No prior foreign language background required",
    "Interest in cross-cultural communication, travel, and international languages"
  ],
  lessons: [
    {
      id: "les-polyglot-studio",
      title: "Interactive Polyglot Studio (20 Languages)",
      duration: "Flexible",
      type: "language_studio",
      content: `Welcome to the Global Polyglot Studio. In this interactive environment, you can select any of the 20 supported languages as your native tongue and choose any target language to learn.\n\nKey Capabilities:\n- 250 Common Vocabulary Words categorized into Numbers, Family, Time, Food, Travel, Verbs, etc.\n- 100 Real-life Conversational Sentences covering Airport, Hotel, Directions, Dining, Shopping, Health, and Emergency.\n- Instant Dual-Language Text display with script-sensitive font sizing and RTL direction support for Urdu and Arabic.\n- Phonetic Romanization pronunciation guides for every single phrase.\n- Text-to-Speech audio listening powered by the Web Speech API.\n- Interactive Flashcards Mode with reveal answer testing.\n- Complete Course Excel Workbook (.xlsx) export button for offline study.`
    },
    {
      id: "les-polyglot-greetings",
      title: "Module 1: Greetings, Civility & Everyday Courtesy",
      duration: "45 mins",
      type: "language_studio",
      defaultCategory: "Greetings & Civility",
      content: `First impressions matter across all world cultures. In this module, focus on mastering basic civilities such as Hello, Good morning, Thank you very much, Please, Excuse me, and I am sorry across your target languages.\n\nPoliteness Guidelines:\n- In Asian languages like Japanese, polite speech levels (Keigo) show profound respect to seniors and strangers.\n- In South Asian and Middle Eastern cultures (Urdu, Hindi, Arabic), greetings like 'Assalam-o-Alaikum' and 'Namaste' carry deep cultural warmth.\n- Always practice listening to the native pronunciation using the audio button beside each card.`
    },
    {
      id: "les-polyglot-numbers-time",
      title: "Module 2: Numbers, Quantity, Time & Calendar",
      duration: "50 mins",
      type: "language_studio",
      defaultCategory: "Numbers & Quantity",
      content: `Numbers and time form the backbone of practical logistics—from buying train tickets and asking prices to scheduling meetings.\n\nPractice Routine:\n1. Learn counting from 1 to 10 in your target language.\n2. Practice days of the week, today, tomorrow, and yesterday.\n3. Test yourself using Flashcard mode to quickly recall numbers without peeking.`
    },
    {
      id: "les-polyglot-food-dining",
      title: "Module 3: Food, Dining, Shopping & Markets",
      duration: "50 mins",
      type: "language_studio",
      defaultCategory: "Dining & Food",
      content: `Dining out and shopping in local markets is one of the most rewarding experiences of speaking another language.\n\nKey Sentences:\n- Requesting a table for two.\n- Asking for the menu, water, or the bill.\n- Checking whether food is spicy or vegetarian.\n- Inquiring about prices, bargaining for discounts, and paying with cash or credit card.`
    },
    {
      id: "les-polyglot-travel-emergency",
      title: "Module 4: Travel, Directions, Health & Emergency",
      duration: "45 mins",
      type: "language_studio",
      defaultCategory: "Directions & Navigation",
      content: `Safety and clear navigation are indispensable when traveling internationally.\n\nEssential Skills:\n- Asking directions to railway stations, airports, and restrooms.\n- Taking taxis and telling drivers where to stop.\n- Communicating symptoms to pharmacists or doctors.\n- Urgent phrases: calling an ambulance, contacting the police, or reaching an embassy.`
    },
    {
      id: "les-polyglot-assessment",
      title: "Module 5: Global Polyglot Knowledge Assessment",
      duration: "30 mins",
      type: "quiz",
      quizId: "quiz-polyglot-20"
    }
  ],
  quiz: {
    id: "quiz-polyglot-20",
    title: "Global Polyglot 20-Languages Assessment",
    passingScore: 70,
    questions: [
      {
        id: "pq1",
        question: "Which of the following is the standard greeting in Mandarin Chinese?",
        options: ["Konnichiwa (こんにちは)", "Nǐ hǎo (你好)", "Marhaban (مرحباً)", "Bonjour"],
        correctAnswer: 1,
        explanation: "Nǐ hǎo (你好) is the standard hello / greeting in Mandarin Chinese."
      },
      {
        id: "pq2",
        question: "In Urdu and Arabic, what is the correct reading and text alignment direction?",
        options: ["Left-to-Right (LTR)", "Right-to-Left (RTL)", "Top-to-Bottom", "Bottom-to-Top"],
        correctAnswer: 1,
        explanation: "Both Urdu (Nastaliq script) and Arabic are written and read Right-to-Left (RTL)."
      },
      {
        id: "pq3",
        question: "How do you say 'Thank you very much' in Spanish?",
        options: ["Merci beaucoup", "Muchas gracias", "Muito obrigado", "Vielen Dank"],
        correctAnswer: 1,
        explanation: "'Muchas gracias' translates to 'Thank you very much' in Spanish."
      },
      {
        id: "pq4",
        question: "What does the phrase 'Al-hisab min fadlik' (الحساب من فضلك) mean in Arabic?",
        options: ["Where is the train station?", "The bill, please", "Good morning", "Help me please"],
        correctAnswer: 1,
        explanation: "'Al-hisab min fadlik' is the standard polite Arabic request for the restaurant check / bill."
      },
      {
        id: "pq5",
        question: "What does 'Sama-sama' mean in Indonesian when someone says 'Terima kasih' (Thank you)?",
        options: ["You are welcome (likewise)", "Goodbye", "Excuse me", "Delicious"],
        correctAnswer: 0,
        explanation: "'Sama-sama' is the standard Indonesian polite response meaning 'You are welcome'."
      },
      {
        id: "pq6",
        question: "In Japanese, which phrase means 'Excuse me' or 'Pardon me'?",
        options: ["Arigatou", "Sumimasen (すみません)", "Sayounara", "Konnichiwa"],
        correctAnswer: 1,
        explanation: "'Sumimasen' is widely used in Japanese for 'Excuse me', 'Pardon', or to get someone's attention."
      },
      {
        id: "pq7",
        question: "How is 'One' spoken in Swahili?",
        options: ["Bir", "Ek", "Moja", "Satu"],
        correctAnswer: 2,
        explanation: "'Moja' is the number One in Swahili."
      },
      {
        id: "pq8",
        question: "Which file format can be downloaded directly from the Polyglot Studio for offline study?",
        options: ["Photoshop PSD", "Excel Spreadsheet (.xlsx)", "Audio MP3 only", "AutoCAD DWG"],
        correctAnswer: 1,
        explanation: "The complete course dataset with 250 vocabulary words and 100 conversational sentences across all 20 languages is downloadable as a structured Excel spreadsheet (.xlsx)."
      }
    ]
  }
};
