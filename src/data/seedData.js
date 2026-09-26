import { 
  AI_COURSE_MODULES, 
  AI_COURSE_LESSONS, 
  AI_COURSE_OBJECTIVES 
} from './aiCourseData';
import { TENSES_COURSE_DATA } from './tensesCourseData';
import { ACTIVE_PASSIVE_COURSE_DATA } from './activePassiveCourseData';
import { FBISE_ISLAMIAT_ITEM } from './fbiseIslamiatVocab';

export const INITIAL_CATEGORIES = {
  courses: [
    "English",
    "Mathematics",
    "Science",
    "Computer Science",
    "Education",
    "Professional Skills",
    "Safety",
    "Technology",
    "Language Learning",
    "Exam Preparation"
  ],
  apps: [
    "Learning Apps",
    "Education Apps",
    "Productivity Apps",
    "Testing Apps",
    "Grammar Apps",
    "Mathematics Apps"
  ],
  tools: [
    "Calculators",
    "Quiz Tools",
    "Writing Tools",
    "Educational Tools",
    "Productivity Tools",
    "Teacher Tools"
  ],
  content: [
    "Articles",
    "Study Notes",
    "Worksheets",
    "PDFs",
    "Videos",
    "Tutorials",
    "Exam Resources",
    "Educational Guides",
    "Vocabulary Guides"
  ]
};

export const INITIAL_COURSES = [
  {
    id: "course-1",
    title: "English Grammar Fundamentals",
    description: "Master essential English grammar rules, sentence structure, punctuation, and parts of speech with clear explanations and practical exercises.",
    category: "English",
    level: "Beginner",
    membership: "free",
    thumbnail: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=800&q=80",
    instructor: "Dr Wazir Ahmed",
    duration: "4 hours 30 mins",
    lessonCount: 6,
    rating: 4.8,
    reviewsCount: 342,
    status: "published",
    createdDate: "2025-01-15",
    objectives: [
      "Understand and identify all 8 parts of speech correctly",
      "Construct compound and complex sentences without comma splices",
      "Master standard subject-verb agreement rules",
      "Apply punctuation marks with high confidence in daily writing"
    ],
    requirements: [
      "Basic understanding of conversational English",
      "Desire to improve academic or professional communication"
    ],
    lessons: [
      {
        id: "les-1-1",
        title: "Introduction to Nouns and Pronouns",
        duration: "18 mins",
        type: "video",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        content: `Nouns are naming words that identify a person, place, thing, or idea. Pronouns replace nouns to avoid repetition.\n\nKey Concepts:\n1. Common vs Proper Nouns (e.g., city vs London)\n2. Concrete vs Abstract Nouns (e.g., book vs knowledge)\n3. Personal, Possessive, and Demonstrative Pronouns\n\nRule of thumb: Always ensure your pronoun agrees in number and gender with its antecedent.`
      },
      {
        id: "les-1-2",
        title: "Mastering Action and Linking Verbs",
        duration: "24 mins",
        type: "text",
        content: `Verbs are the engine of every English sentence. Without a verb, a complete thought cannot be formed.\n\nTypes of Verbs:\n- Action verbs describe physical or mental action (run, calculate, think).\n- Linking verbs connect the subject to a subject complement that describes or identifies it (is, seem, become).\n\nWatch out for auxiliary verbs like 'have', 'do', and 'will' that help construct tense aspects.`
      },
      {
        id: "les-1-3",
        title: "Adjectives and Adverbs in Action",
        duration: "20 mins",
        type: "video",
        content: `Modifiers add vivid color and detail to language. Adjectives modify nouns or pronouns; adverbs modify verbs, adjectives, or other adverbs.`
      },
      {
        id: "les-1-4",
        title: "Subject-Verb Agreement Essentials",
        duration: "25 mins",
        type: "text",
        content: `The golden rule: singular subjects require singular verbs; plural subjects require plural verbs. Special cases include collective nouns and compound subjects connected by 'or'/'nor'.`
      },
      {
        id: "les-1-5",
        title: "Prepositions and Prepositional Phrases",
        duration: "22 mins",
        type: "text",
        content: `Prepositions show spatial, temporal, or logical relationships between nouns and other words. Examples include in, on, at, under, through, and despite.`
      },
      {
        id: "les-1-6",
        title: "Final Review & Grammar Quiz",
        duration: "15 mins",
        type: "quiz",
        quizId: "quiz-1"
      }
    ],
    quiz: {
      id: "quiz-1",
      title: "English Grammar Fundamentals Assessment",
      passingScore: 70,
      questions: [
        {
          id: "q1",
          question: "Which of the following is an abstract noun?",
          options: ["Mountain", "Courage", "Apple", "Guitar"],
          correctAnswer: 1,
          explanation: "Courage is an idea or quality, making it an abstract noun."
        },
        {
          id: "q2",
          question: "Identify the correct sentence with proper subject-verb agreement:",
          options: [
            "Neither the teacher nor the students was ready.",
            "Each of the players have a new uniform.",
            "The committee agrees on the new proposal.",
            "All the children was happy."
          ],
          correctAnswer: 2,
          explanation: "'The committee agrees' treats the collective noun as a single unified entity."
        },
        {
          id: "q3",
          question: "What part of speech is the word 'swiftly' in 'She ran swiftly'?",
          options: ["Adjective", "Adverb", "Noun", "Preposition"],
          correctAnswer: 1,
          explanation: "'Swiftly' modifies the action verb 'ran', so it is an adverb."
        }
      ]
    }
  },
  {
    id: "course-2",
    title: "Spoken English for Beginners",
    description: "Build fluent, natural speaking confidence with everyday conversational dialogues, pronunciation drills, and speech etiquette.",
    category: "English",
    level: "Beginner",
    membership: "free",
    thumbnail: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80",
    instructor: "Dr Wazir Ahmed",
    duration: "3 hours 45 mins",
    lessonCount: 5,
    rating: 4.7,
    reviewsCount: 198,
    status: "published",
    createdDate: "2025-01-20",
    objectives: [
      "Greet and introduce yourself effortlessly in social and formal settings",
      "Ask open-ended questions and keep conversations flowing naturally",
      "Overcome hesitation and pronounce challenging phonemes accurately"
    ],
    requirements: ["Basic reading knowledge of English"],
    lessons: [
      { id: "les-2-1", title: "Everyday Greetings and Self-Introductions", duration: "20 mins", type: "video", content: "Learn friendly greetings, small talk openers, and polite follow-ups." },
      { id: "les-2-2", title: "Ordering Food and Asking Directions", duration: "25 mins", type: "text", content: "Practical roleplay scripts for restaurants, cafes, transit, and city navigation." },
      { id: "les-2-3", title: "Phone Etiquette and Professional Inquiries", duration: "30 mins", type: "video", content: "How to answer calls, leave concise voicemails, and schedule appointments." },
      { id: "les-2-4", title: "Common Pronunciation Traps & Intonation", duration: "22 mins", type: "text", content: "Mastering rhythm, sentence stress, and voiced vs unvoiced consonants." },
      { id: "les-2-5", title: "Spoken English Knowledge Check", duration: "15 mins", type: "quiz", quizId: "quiz-2" }
    ],
    quiz: {
      id: "quiz-2",
      title: "Spoken English Practice Quiz",
      passingScore: 70,
      questions: [
        {
          id: "q2-1",
          question: "Which response is the most natural reply to 'How do you do?' in formal English?",
          options: ["I do good.", "How do you do?", "What do you mean?", "Fine thanks, bye."],
          correctAnswer: 1,
          explanation: "In formal British and traditional English, 'How do you do?' is formally returned with 'How do you do?' or 'Very well, thank you'."
        }
      ]
    }
  },
  {
    id: "course-3",
    title: "Mathematics Fundamentals",
    description: "Clear up core numerical concepts including fractions, decimals, percentages, ratios, and basic arithmetic shortcuts.",
    category: "Mathematics",
    level: "Beginner",
    membership: "free",
    thumbnail: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=800&q=80",
    instructor: "Dr Wazir Ahmed",
    duration: "5 hours 10 mins",
    lessonCount: 6,
    rating: 4.9,
    reviewsCount: 412,
    status: "published",
    createdDate: "2025-01-22",
    objectives: [
      "Perform arithmetic on fractions and decimals with speed and accuracy",
      "Calculate real-world percentages (discounts, taxes, interest)",
      "Set up and solve direct and inverse proportions"
    ],
    requirements: ["No advanced math prerequisites required"],
    lessons: [
      { id: "les-3-1", title: "Number Systems and Order of Operations (PEMDAS)", duration: "25 mins", type: "video", content: "PEMDAS: Parentheses, Exponents, Multiplication & Division, Addition & Subtraction." },
      { id: "les-3-2", title: "Fractions: Addition, Subtraction, and Simplification", duration: "30 mins", type: "text", content: "Finding the Lowest Common Denominator (LCD) and simplifying complex fractions." },
      { id: "les-3-3", title: "Decimals and Precision Rounding", duration: "20 mins", type: "text", content: "Converting fractions to decimals and handling repeating digits." },
      { id: "les-3-4", title: "Percentages in Daily Life", duration: "25 mins", type: "video", content: "Calculating percentage increase, decrease, margin, and compound growth." },
      { id: "les-3-5", title: "Ratios, Rates, and Proportions", duration: "28 mins", type: "text", content: "Solving ratio problems and unit rate comparisons." },
      { id: "les-3-6", title: "Math Fundamentals Mastery Quiz", duration: "20 mins", type: "quiz", quizId: "quiz-3" }
    ],
    quiz: {
      id: "quiz-3",
      title: "Math Fundamentals Test",
      passingScore: 75,
      questions: [
        {
          id: "q3-1",
          question: "Evaluate: 8 + 2 * (6 - 3)",
          options: ["30", "14", "24", "18"],
          correctAnswer: 1,
          explanation: "6 - 3 = 3; 2 * 3 = 6; 8 + 6 = 14."
        },
        {
          id: "q3-2",
          question: "What is 15% of 240?",
          options: ["32", "36", "40", "48"],
          correctAnswer: 1,
          explanation: "10% of 240 = 24. 5% = 12. 24 + 12 = 36."
        }
      ]
    }
  },
  {
    id: "course-4",
    title: "Algebra Essentials",
    description: "Deep dive into linear equations, quadratic formulas, polynomials, coordinate graphing, and algebraic modeling.",
    category: "Mathematics",
    level: "Intermediate",
    membership: "premium",
    thumbnail: "https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=800&q=80",
    instructor: "Dr Wazir Ahmed",
    duration: "6 hours 40 mins",
    lessonCount: 7,
    rating: 4.95,
    reviewsCount: 289,
    status: "published",
    createdDate: "2025-02-01",
    objectives: [
      "Solve single and multi-variable linear equation systems",
      "Factor quadratic equations and apply the quadratic formula",
      "Graph linear inequalities on Cartesian planes",
      "Model real-life optimization problems using algebraic expressions"
    ],
    requirements: ["Basic arithmetic & fractions knowledge"],
    lessons: [
      { id: "les-4-1", title: "Variables, Expressions, and Equations", duration: "25 mins", type: "video", content: "Formulating expressions and isolating variables." },
      { id: "les-4-2", title: "Solving Linear Systems: Substitution & Elimination", duration: "35 mins", type: "text", content: "Two equations with two unknowns solved step-by-step." },
      { id: "les-4-3", title: "Graphing Lines: Slope-Intercept Form (y = mx + b)", duration: "30 mins", type: "video", content: "Slope calculations, parallel and perpendicular line properties." },
      { id: "les-4-4", title: "Polynomial Operations and Factoring", duration: "40 mins", type: "text", content: "Factoring trinomials, difference of squares, and grouping." },
      { id: "les-4-5", title: "The Quadratic Formula and Discriminant", duration: "35 mins", type: "video", content: "Using x = (-b ± √(b² - 4ac)) / (2a) to find real and complex roots." },
      { id: "les-4-6", title: "Word Problems & Algebraic Models", duration: "30 mins", type: "text", content: "Translating word problems into mathematical equations." },
      { id: "les-4-7", title: "Algebra Final Exam & Certification Test", duration: "30 mins", type: "quiz", quizId: "quiz-4" }
    ],
    quiz: {
      id: "quiz-4",
      title: "Algebra Essentials Final Exam",
      passingScore: 80,
      questions: [
        {
          id: "q4-1",
          question: "Solve for x: 3x - 7 = 14",
          options: ["x = 5", "x = 7", "x = 8", "x = 6"],
          correctAnswer: 1,
          explanation: "3x = 14 + 7 = 21 -> x = 7."
        },
        {
          id: "q4-2",
          question: "What is the slope of the line 2y - 6x = 10?",
          options: ["6", "2", "3", "-3"],
          correctAnswer: 2,
          explanation: "2y = 6x + 10 -> y = 3x + 5. The slope m is 3."
        }
      ]
    }
  },
  {
    id: "course-5",
    title: "English Vocabulary Builder",
    description: "Expand your lexical repertoire with root words, prefixes, idioms, collocations, and contextual vocabulary drills.",
    category: "English",
    level: "Beginner",
    membership: "free",
    thumbnail: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&w=800&q=80",
    instructor: "Dr Wazir Ahmed",
    duration: "3 hours 20 mins",
    lessonCount: 4,
    rating: 4.6,
    reviewsCount: 154,
    status: "published",
    createdDate: "2025-02-05",
    objectives: [
      "Decode unfamiliar academic words using Latin and Greek roots",
      "Use high-frequency idioms in natural contexts",
      "Avoid repetitive wording with rich synonym sets"
    ],
    requirements: ["Basic reading comprehension"],
    lessons: [
      { id: "les-5-1", title: "Greek and Latin Roots That Unlock Hundreds of Words", duration: "25 mins", type: "text", content: "Roots like bene (good), mal (bad), chron (time), and spect (see)." },
      { id: "les-5-2", title: "Collocations: Words That Go Together", duration: "20 mins", type: "video", content: "Why we say 'heavy rain' instead of 'strong rain'." },
      { id: "les-5-3", title: "Idiomatic Expressions for Daily and Work Life", duration: "25 mins", type: "text", content: "Common idioms like 'bite the bullet', 'hit the nail on the head', and 'see eye to eye'." },
      { id: "les-5-4", title: "Vocabulary Retention Quiz", duration: "15 mins", type: "quiz", quizId: "quiz-5" }
    ],
    quiz: {
      id: "quiz-5",
      title: "Vocabulary Knowledge Check",
      passingScore: 70,
      questions: [
        {
          id: "q5-1",
          question: "What does the root word 'chron' mean?",
          options: ["Sound", "Time", "Light", "Color"],
          correctAnswer: 1,
          explanation: "'Chron' originates from Greek chronos, meaning time (e.g., chronological)."
        }
      ]
    }
  },
  {
    id: "course-6",
    title: "Advanced English Grammar",
    description: "High-level grammatical mastery covering subjunctive moods, inversion, participle clauses, nuances of conditionals, and stylistic precision.",
    category: "English",
    level: "Advanced",
    membership: "premium",
    thumbnail: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=800&q=80",
    instructor: "Dr Wazir Ahmed",
    duration: "5 hours 50 mins",
    lessonCount: 6,
    rating: 4.9,
    reviewsCount: 310,
    status: "published",
    createdDate: "2025-02-10",
    objectives: [
      "Master inverted sentence structures for rhetorical impact",
      "Utilize subjunctive mood forms with pristine grammatical accuracy",
      "Write elegant participle clauses that streamline complex prose"
    ],
    requirements: ["Solid intermediate English command"],
    lessons: [
      { id: "les-6-1", title: "The Subjunctive Mood in Modern & Formal English", duration: "30 mins", type: "video", content: "Clauses with demand, insist, and recommendation: 'I insist that he be present'." },
      { id: "les-6-2", title: "Inversion with Negative Adverbials", duration: "25 mins", type: "text", content: "'Rarely have I seen...', 'Seldom did they anticipate...'" },
      { id: "les-6-3", title: "Reduced Relative Clauses and Participle Structures", duration: "35 mins", type: "text", content: "Turning 'The man who is standing there' into 'The man standing there'." },
      { id: "les-6-4", title: "Mixed Conditionals and Hypothetical Nuances", duration: "30 mins", type: "video", content: "Third and second conditional mixtures linking past conditions to present results." },
      { id: "les-6-5", title: "Stylistic Parallelism and Rhetorical Cadence", duration: "28 mins", type: "text", content: "Crafting memorable cadences in essays and public addresses." },
      { id: "les-6-6", title: "Advanced Grammar Master Quiz", duration: "20 mins", type: "quiz", quizId: "quiz-6" }
    ],
    quiz: {
      id: "quiz-6",
      title: "Advanced English Grammar Assessment",
      passingScore: 80,
      questions: [
        {
          id: "q6-1",
          question: "Choose the grammatically correct inverted structure:",
          options: [
            "Seldom she had heard such beautiful music.",
            "Seldom had she heard such beautiful music.",
            "Seldom did she heard such beautiful music.",
            "Seldom she heard such beautiful music."
          ],
          correctAnswer: 1,
          explanation: "Negative adverbial inversion requires auxiliary inversion: Seldom + had + subject + past participle."
        }
      ]
    }
  },
  {
    id: "course-7",
    title: "Basic Computer Skills",
    description: "Empower yourself with fundamental computer literacy: operating systems, file organization, internet safety, and word processing.",
    category: "Computer Science",
    level: "Beginner",
    membership: "free",
    thumbnail: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80",
    instructor: "Dr Wazir Ahmed",
    duration: "3 hours 15 mins",
    lessonCount: 5,
    rating: 4.8,
    reviewsCount: 420,
    status: "published",
    createdDate: "2025-02-12",
    objectives: [
      "Navigate Windows and macOS environments comfortably",
      "Organize, archive, and back up personal files securely",
      "Identify phishing emails, weak passwords, and suspicious links",
      "Use keyboard shortcuts to double productivity"
    ],
    requirements: ["Access to any desktop computer or laptop"],
    lessons: [
      { id: "les-7-1", title: "Hardware, Software, and OS Navigation", duration: "20 mins", type: "video", content: "Understanding CPU, RAM, storage, and desktop basics." },
      { id: "les-7-2", title: "File Management, Folders, and Cloud Backups", duration: "25 mins", type: "text", content: "How to structure folders, rename files in bulk, and use Google Drive / OneDrive." },
      { id: "les-7-3", title: "Internet Browsing and Cybersecurity Safety", duration: "30 mins", type: "video", content: "Safe browsing habits, 2FA setup, and password managers." },
      { id: "les-7-4", title: "Essential Keyboard Shortcuts Every User Must Know", duration: "20 mins", type: "text", content: "Ctrl+C, Ctrl+V, Alt+Tab, Win+Shift+S, and task management." },
      { id: "les-7-5", title: "Computer Literacy Quiz", duration: "15 mins", type: "quiz", quizId: "quiz-7" }
    ],
    quiz: {
      id: "quiz-7",
      title: "Basic Computer Skills Check",
      passingScore: 70,
      questions: [
        {
          id: "q7-1",
          question: "Which of the following creates a secure, resilient password?",
          options: [
            "Your pet's name followed by 123",
            "A sequence of 16+ randomized characters, numbers, and symbols managed by a password manager",
            "Your birthdate spelled backwards",
            "The word 'Password2025!'"
          ],
          correctAnswer: 1,
          explanation: "Long, random passphrases generated and stored in a password manager prevent brute-force attacks."
        }
      ]
    }
  },
  {
    id: "course-8",
    title: "Introduction to Artificial Intelligence",
    description: "Comprehensive end-to-end curriculum: Foundations of AI, Programming in Python, Mathematics for AI, Data Handling, Machine Learning, Deep Learning, NLP, Computer Vision, AI Frameworks, Ethics, and Hands-on Projects.",
    category: "Technology",
    level: "Intermediate",
    membership: "premium",
    thumbnail: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=800&q=80",
    instructor: "Dr Wazir Ahmed",
    duration: "24 hours 30 mins",
    lessonCount: 87,
    rating: 4.96,
    reviewsCount: 520,
    status: "published",
    createdDate: "2025-02-15",
    objectives: AI_COURSE_OBJECTIVES,
    requirements: ["Basic computer literacy and curiosity about modern artificial intelligence systems"],
    modules: AI_COURSE_MODULES,
    lessons: AI_COURSE_LESSONS,
    quiz: {
      id: "quiz-8",
      title: "AI Fundamentals Certification Test",
      passingScore: 80,
      questions: [
        {
          id: "q8-1",
          question: "Which type of AI is designed to perform a specific dedicated task and represents virtually all current real-world AI applications?",
          options: ["Super AI", "Narrow AI (Weak AI)", "General AI (Strong AI)", "Quantum AI"],
          correctAnswer: 1,
          explanation: "Narrow AI (or Weak AI) is designed to perform one specific task efficiently, such as virtual assistants, facial recognition, and recommendation engines."
        },
        {
          id: "q8-2",
          question: "In Machine Learning, what type of learning trains a model using labeled data where inputs are paired with correct answers?",
          options: ["Unsupervised Learning", "Reinforcement Learning", "Supervised Learning", "Self-Taught Learning"],
          correctAnswer: 2,
          explanation: "Supervised learning uses labeled datasets to teach algorithms to classify data or predict outcomes accurately."
        },
        {
          id: "q8-3",
          question: "What core innovation enables modern Transformers to process long sequences efficiently?",
          options: ["Convolutional Kernels", "Self-Attention Mechanism", "Binary Search Trees", "Gradient Descent without weights"],
          correctAnswer: 1,
          explanation: "The self-attention mechanism enables models to weigh the importance of all tokens across a sequence simultaneously."
        }
      ]
    }
  },
  {
    id: "course-9",
    title: "Study Skills & Time Management",
    description: "Proven cognitive learning techniques: spaced repetition, active recall, Pomodoro technique, Feynman technique, and stress management.",
    category: "Education",
    level: "Beginner",
    membership: "free",
    thumbnail: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=800&q=80",
    instructor: "Dr Wazir Ahmed",
    duration: "2 hours 50 mins",
    lessonCount: 4,
    rating: 4.85,
    reviewsCount: 230,
    status: "published",
    createdDate: "2025-02-18",
    objectives: [
      "Implement active recall and spaced repetition schedules",
      "Master the Pomodoro method to eradicate procrastination",
      "Use the Feynman Technique to demystify complex subjects"
    ],
    requirements: ["Willingness to experiment with new learning habits"],
    lessons: [
      { id: "les-9-1", title: "The Science of Memory: Active Recall vs Passive Rereading", duration: "25 mins", type: "video", content: "Testing yourself strengthens neural retrieval pathways far more than highlighting." },
      { id: "les-9-2", title: "Spaced Repetition & The Forgetting Curve", duration: "20 mins", type: "text", content: "Ebbinghaus curve and how scheduling reviews at 1, 3, 7, and 30 days cements long-term memory." },
      { id: "les-9-3", title: "Deep Work and Distraction-Proof Study Blocks", duration: "25 mins", type: "video", content: "Managing notification dopamine loops and entering flow state." },
      { id: "les-9-4", title: "Study Mastery Assessment", duration: "15 mins", type: "quiz", quizId: "quiz-9" }
    ],
    quiz: {
      id: "quiz-9",
      title: "Study Methods Quiz",
      passingScore: 75,
      questions: [
        {
          id: "q9-1",
          question: "Which learning strategy yields the highest long-term retention according to cognitive science?",
          options: [
            "Re-reading the textbook chapter 4 times",
            "Highlighting important sentences with multiple colors",
            "Active recall through flashcards and self-quizzing",
            "Cramming the night before an exam"
          ],
          correctAnswer: 2,
          explanation: "Active recall forces the brain to retrieve information, building stronger synaptic connections."
        }
      ]
    }
  },
  {
    id: "course-10",
    title: "Professional Communication Skills",
    description: "Excel in executive presentations, persuasive business emails, cross-functional collaboration, conflict resolution, and leadership speaking.",
    category: "Professional Skills",
    level: "Intermediate",
    membership: "premium",
    thumbnail: "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=800&q=80",
    instructor: "Dr Wazir Ahmed",
    duration: "4 hours 45 mins",
    lessonCount: 5,
    rating: 4.9,
    reviewsCount: 380,
    status: "published",
    createdDate: "2025-02-20",
    objectives: [
      "Draft concise, action-oriented business emails using the BLUF framework",
      "Deliver confident, persuasive presentations to executive stakeholders",
      "De-escalate workplace conflict with non-violent communication techniques"
    ],
    requirements: ["Professional or academic writing baseline"],
    lessons: [
      { id: "les-10-1", title: "The BLUF (Bottom Line Up Front) Communication Model", duration: "25 mins", type: "video", content: "Putting your key ask in the first sentence to respect senior stakeholders' time." },
      { id: "les-10-2", title: "Executive Email Etiquette and Brevity", duration: "25 mins", type: "text", content: "Subject lines that get opened, bullet points that get approved." },
      { id: "les-10-3", title: "Constructive Feedback & Conflict De-escalation", duration: "30 mins", type: "video", content: "Using 'I' statements and separating observation from judgment." },
      { id: "les-10-4", title: "Public Speaking & Non-Verbal Gravitas", duration: "35 mins", type: "video", content: "Pacing, intentional pauses, posture, and vocal inflection." },
      { id: "les-10-5", title: "Communication Skills Certification", duration: "20 mins", type: "quiz", quizId: "quiz-10" }
    ],
    quiz: {
      id: "quiz-10",
      title: "Professional Communication Assessment",
      passingScore: 80,
      questions: [
        {
          id: "q10-1",
          question: "What does BLUF stand for in business writing?",
          options: ["Be Loud Until Finished", "Bottom Line Up Front", "Business Logic Under File", "Basic Layout User Friendly"],
          correctAnswer: 1,
          explanation: "Bottom Line Up Front ensures the recipient understands the goal and action item immediately."
        }
      ]
    }
  },
  {
    id: "course-11",
    title: "Workplace Safety Fundamentals",
    description: "Standard OSHA/ISO safety protocols, hazard identification, emergency evacuation, fire safety, and ergonomic workspace setup.",
    category: "Safety",
    level: "Beginner",
    membership: "free",
    thumbnail: "https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=800&q=80",
    instructor: "Dr Wazir Ahmed",
    duration: "3 hours 10 mins",
    lessonCount: 4,
    rating: 4.75,
    reviewsCount: 165,
    status: "published",
    createdDate: "2025-02-22",
    objectives: [
      "Spot and report common physical, chemical, and ergonomic hazards",
      "Properly select and maintain Personal Protective Equipment (PPE)",
      "Execute workplace emergency evacuation plans systematically"
    ],
    requirements: ["No prerequisites"],
    lessons: [
      { id: "les-11-1", title: "Hierarchy of Hazard Controls", duration: "20 mins", type: "video", content: "Elimination, Substitution, Engineering Controls, Administrative Controls, and PPE." },
      { id: "les-11-2", title: "Fire Safety, Extinguisher Classes, and PASS Technique", duration: "25 mins", type: "text", content: "Pull, Aim, Squeeze, Sweep for ABC fire extinguishers." },
      { id: "les-11-3", title: "Ergonomics: Preventing Repetitive Strain Injuries (RSI)", duration: "20 mins", type: "video", content: "Screen height, chair adjustment, 90-degree arm alignment, and standing desks." },
      { id: "les-11-4", title: "Safety Awareness Knowledge Check", duration: "15 mins", type: "quiz", quizId: "quiz-11" }
    ],
    quiz: {
      id: "quiz-11",
      title: "Workplace Safety Quiz",
      passingScore: 75,
      questions: [
        {
          id: "q11-1",
          question: "What is the most effective level in the Hierarchy of Hazard Controls?",
          options: ["Personal Protective Equipment (PPE)", "Administrative Controls", "Elimination of the hazard", "Warning signs"],
          correctAnswer: 2,
          explanation: "Physically removing the hazard (Elimination) is the most protective control measure."
        }
      ]
    }
  },
  {
    id: "course-12",
    title: "Technical Writing Essentials",
    description: "Write crisp API documentation, software user manuals, Standard Operating Procedures (SOPs), and technical whitepapers.",
    category: "Professional Skills",
    level: "Intermediate",
    membership: "premium",
    thumbnail: "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=800&q=80",
    instructor: "Dr Wazir Ahmed",
    duration: "5 hours 15 mins",
    lessonCount: 5,
    rating: 4.92,
    reviewsCount: 240,
    status: "published",
    createdDate: "2025-02-25",
    objectives: [
      "Structure technical documents for developer and non-technical audiences",
      "Author crystal-clear step-by-step Standard Operating Procedures (SOPs)",
      "Utilize Markdown, DITA, and Docs-as-Code workflows"
    ],
    requirements: ["Basic technical or analytical familiarity"],
    lessons: [
      { id: "les-12-1", title: "Audience Analysis and Information Architecture", duration: "30 mins", type: "video", content: "Determining whether readers are developers, system admins, or end users." },
      { id: "les-12-2", title: "Writing Clear, Actionable Procedures", duration: "25 mins", type: "text", content: "Imperative mood, numbered steps, prerequisites, and expected outcomes." },
      { id: "les-12-3", title: "API and Code Documentation Best Practices", duration: "35 mins", type: "video", content: "Documenting endpoints, parameters, request/response JSON payloads, and error codes." },
      { id: "les-12-4", title: "The Docs-as-Code Philosophy (Git, Markdown, CI/CD)", duration: "30 mins", type: "text", content: "Treating documentation like source code with version control and automated linting." },
      { id: "les-12-5", title: "Technical Writing Final Evaluation", duration: "20 mins", type: "quiz", quizId: "quiz-12" }
    ],
    quiz: {
      id: "quiz-12",
      title: "Technical Writing Certification Assessment",
      passingScore: 80,
      questions: [
        {
          id: "q12-1",
          question: "Which grammatical mood is standard for procedural instructions in technical documentation?",
          options: ["Subjunctive mood", "Imperative mood (e.g., 'Click Save')", "Passive voice (e.g., 'Save should be clicked')", "Interrogative mood"],
          correctAnswer: 1,
          explanation: "Imperative mood directly addresses the reader with concise, actionable instructions."
        }
      ]
    }
  },
  TENSES_COURSE_DATA,
  ACTIVE_PASSIVE_COURSE_DATA
];

export const INITIAL_APPS = [
  {
    id: "app-1",
    name: "English Grammar Gamified",
    description: "Interactive bite-sized grammar battles, streak tracking, and instant corrections that make learning English grammar as addictive as a game.",
    category: "Grammar Apps",
    icon: "Gamepad2",
    platform: "Web / Mobile",
    url: "/apps/grammar-gamified",
    membership: "free",
    status: "published",
    screenshots: [
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?auto=format&fit=crop&w=600&q=80"
    ]
  },
  {
    id: "app-2",
    name: "Learn English & Math",
    description: "Combined dual-curriculum app for students. Practice arithmetic drills side-by-side with vocabulary and phonics puzzles.",
    category: "Learning Apps",
    icon: "BookOpen",
    platform: "Web / Mobile",
    url: "/apps/english-math",
    membership: "free",
    status: "published",
    screenshots: [
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=600&q=80"
    ]
  },
  {
    id: "app-3",
    name: "Safety 24/7",
    description: "Workplace safety companion featuring daily safety moments, incident logging, emergency procedures, and chemical safety lookup.",
    category: "Productivity Apps",
    icon: "ShieldCheck",
    platform: "Web / Mobile",
    url: "/apps/safety-247",
    membership: "free",
    status: "published",
    screenshots: [
      "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80"
    ]
  },
  {
    id: "app-4",
    name: "CrossMath Challenge",
    description: "Grid-based math crossword puzzles that train mental arithmetic, operational logic, and deductive reasoning under time limits.",
    category: "Mathematics Apps",
    icon: "Grid",
    platform: "Web App",
    url: "/apps/crossmath",
    membership: "premium",
    status: "published",
    screenshots: [
      "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=600&q=80"
    ]
  },
  {
    id: "app-5",
    name: "English Vocabulary Trainer",
    description: "Spaced-repetition flashcard system tailored for TOEFL, IELTS, and GRE test prep with audio pronunciation and usage examples.",
    category: "Education Apps",
    icon: "Repeat",
    platform: "Web / Mobile",
    url: "/apps/vocab-trainer",
    membership: "free",
    status: "published",
    screenshots: [
      "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&w=600&q=80"
    ]
  },
  {
    id: "app-6",
    name: "Math Puzzle Challenge",
    description: "Curated collection of 500+ logic puzzles, nonograms, arithmetic labyrinths, and geometric paradoxes for curious minds.",
    category: "Mathematics Apps",
    icon: "Brain",
    platform: "Web App",
    url: "/apps/math-puzzles",
    membership: "premium",
    status: "published",
    screenshots: [
      "https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=600&q=80"
    ]
  },
  {
    id: "app-7",
    name: "Traffic Sign Learning",
    description: "Interactive visual recognition quiz app for road safety signs, regulatory symbols, hazard warnings, and international road rules.",
    category: "Learning Apps",
    icon: "Compass",
    platform: "Web / Mobile",
    url: "/apps/traffic-signs",
    membership: "free",
    status: "published",
    screenshots: [
      "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&w=600&q=80"
    ]
  },
  {
    id: "app-8",
    name: "AI Learning Hub",
    description: "Interactive playground to test prompt engineering techniques, inspect model outputs, analyze sentiment, and explore machine learning concepts.",
    category: "Education Apps",
    icon: "Sparkles",
    platform: "Web App",
    url: "/apps/ai-hub",
    membership: "premium",
    status: "published",
    screenshots: [
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=600&q=80"
    ]
  }
];

export const INITIAL_TOOLS = [
  {
    id: "tool-1",
    name: "Percentage Calculator",
    description: "Quickly compute percentage of a number, percentage increase/decrease, fraction to percentage, and reverse percentage.",
    category: "Calculators",
    membership: "free",
    url: "/tools/percentage-calculator",
    status: "published",
    component: "PercentageCalculator"
  },
  {
    id: "tool-2",
    name: "Grade Calculator",
    description: "Weighted grade calculator for exams, assignments, quizzes, and homework with final grade target estimator.",
    category: "Calculators",
    membership: "free",
    url: "/tools/grade-calculator",
    status: "published",
    component: "GradeCalculator"
  },
  {
    id: "tool-3",
    name: "GPA Calculator",
    description: "Calculate standard 4.0 scale semester and cumulative GPA with credit hours and letter grade mapping.",
    category: "Calculators",
    membership: "free",
    url: "/tools/gpa-calculator",
    status: "published",
    component: "GpaCalculator"
  },
  {
    id: "tool-4",
    name: "Scientific Calculator",
    description: "Browser-based scientific calculator supporting trigonometric functions, logarithms, powers, roots, and factorials.",
    category: "Calculators",
    membership: "free",
    url: "/tools/scientific-calculator",
    status: "published",
    component: "ScientificCalculator"
  },
  {
    id: "tool-5",
    name: "Unit Converter",
    description: "Convert units across length, weight/mass, temperature, volume, area, time, and digital storage seamlessly.",
    category: "Educational Tools",
    membership: "free",
    url: "/tools/unit-converter",
    status: "published",
    component: "UnitConverter"
  },
  {
    id: "tool-6",
    name: "Quiz Generator",
    description: "Automated AI-assisted quiz generator that creates tailored multiple-choice and short-answer quizzes on any educational topic.",
    category: "Quiz Tools",
    membership: "premium",
    url: "/tools/quiz-generator",
    status: "published",
    component: "QuizGeneratorTool"
  },
  {
    id: "tool-7",
    name: "MCQ Generator",
    description: "Generate challenging 4-option multiple-choice questions with full rationale explanations, difficulty tiers, and printable export.",
    category: "Quiz Tools",
    membership: "premium",
    url: "/tools/mcq-generator",
    status: "published",
    component: "McqGeneratorTool"
  },
  {
    id: "tool-8",
    name: "Study Planner",
    description: "Interactive timetable and daily study schedule generator based on exam dates, subjects, and available daily study hours.",
    category: "Productivity Tools",
    membership: "free",
    url: "/tools/study-planner",
    status: "published",
    component: "StudyPlanner"
  },
  {
    id: "tool-9",
    name: "Word Counter",
    description: "Real-time word, character, sentence, paragraph, reading time, and speaking time counter with reading grade level analysis.",
    category: "Writing Tools",
    membership: "free",
    url: "/tools/word-counter",
    status: "published",
    component: "WordCounter"
  },
  {
    id: "tool-10",
    name: "Learning Progress Calculator",
    description: "Forecast completion dates for courses and books based on current pacing, pages/lessons remaining, and daily study limits.",
    category: "Educational Tools",
    membership: "free",
    url: "/tools/progress-calculator",
    status: "published",
    component: "LearningProgressCalculator"
  }
];

export const INITIAL_CONTENT = [
  {
    id: "content-1",
    title: "20 Most Common Prepositions",
    description: "Master the 20 prepositions that appear in over 85% of spoken and written English sentences with practical contextual illustrations.",
    contentType: "Study Notes",
    category: "English",
    thumbnail: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=600&q=80",
    author: "Dr Wazir Ahmed",
    membership: "free",
    publishDate: "2025-01-10",
    status: "published",
    downloadUrl: "#",
    body: `Prepositions establish critical relationships of time, space, and direction.

Here are the 20 most frequent prepositions:
1. OF - Indicates belonging or composition: 'A cup of tea', 'Citizen of the world'.
2. IN - Indicates enclosure or periods of time: 'In the room', 'In 2026'.
3. TO - Expresses direction or destination: 'Walk to school', 'Send to him'.
4. FOR - Indicates purpose or recipient: 'A gift for you', 'Studying for an exam'.
5. WITH - Indicates accompaniment or tool: 'Write with a pen', 'Travel with friends'.
6. ON - Position on top or specific days: 'On the desk', 'On Monday'.
7. AT - Specific points in time or location: 'At 5 PM', 'At the station'.
8. FROM - Origin or starting point: 'A letter from Paris'.
9. BY - Means of action or deadline: 'By train', 'Finish by noon'.
10. ABOUT - Concerning a subject: 'A story about perseverance'.
11. AS - Role or comparison: 'Work as a developer'.
12. INTO - Movement inside: 'Jump into the water'.
13. LIKE - Resemblance: 'Soar like an eagle'.
14. THROUGH - Passing from one end to another: 'Walk through the park'.
15. AFTER - Following in time: 'After lunch'.
16. OVER - Higher than: 'Bridge over the river'.
17. BETWEEN - Specifically two items: 'Between two choices'.
18. UNDER - Below surface: 'Under the tree'.
19. AGAINST - Opposing or touching: 'Lean against the wall'.
20. DURING - Throughout a duration: 'During the lecture'.`
  },
  {
    id: "content-2",
    title: "English Tenses Complete Guide",
    description: "Comprehensive breakdown of all 12 English verb tenses with formulas, timeline graphics, common errors, and practical conversational examples.",
    contentType: "PDFs",
    category: "English",
    thumbnail: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&w=600&q=80",
    author: "Dr Wazir Ahmed",
    membership: "free",
    publishDate: "2025-01-14",
    status: "published",
    downloadUrl: "#",
    body: `Every English tense combines a Time (Past, Present, Future) with an Aspect (Simple, Continuous, Perfect, Perfect Continuous).

Key Quick References:
- Present Simple: Subject + Base Verb (Daily habits, universal truths)
- Present Continuous: Subject + am/is/are + Verb-ing (Actions happening right now)
- Present Perfect: Subject + have/has + Past Participle (Past actions with present relevance)
- Past Simple: Subject + Past Form (-ed / irregular) (Completed past actions with specific time)
- Past Perfect: Subject + had + Past Participle (The past before the past)
- Future Simple: Subject + will + Base Verb (Spontaneous decisions or predictions)`
  },
  {
    id: "content-3",
    title: "Parts of Speech Reference Guide",
    description: "Visual overview of Nouns, Pronouns, Verbs, Adjectives, Adverbs, Prepositions, Conjunctions, and Interjections.",
    contentType: "Worksheets",
    category: "English",
    thumbnail: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=600&q=80",
    author: "Dr Wazir Ahmed",
    membership: "free",
    publishDate: "2025-01-18",
    status: "published",
    downloadUrl: "#",
    body: `The 8 Parts of Speech Form the backbone of English syntax:
1. Noun (Person, Place, Thing, Idea)
2. Pronoun (Replaces a noun: he, she, it, they)
3. Verb (Expresses action or state of being: write, be)
4. Adjective (Modifies a noun: blue, brilliant)
5. Adverb (Modifies a verb or adjective: quickly, very)
6. Preposition (Shows relationship: under, across)
7. Conjunction (Connects clauses: and, but, although)
8. Interjection (Expresses sudden emotion: Wow!, Ouch!)`
  },
  {
    id: "content-4",
    title: "Basic Mathematics Formula Sheet",
    description: "Essential formulas for geometry (area, perimeter, volume), algebra (quadratic, factoring), and trigonometry on a single printable sheet.",
    contentType: "PDFs",
    category: "Mathematics",
    thumbnail: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=600&q=80",
    author: "Dr Wazir Ahmed",
    membership: "free",
    publishDate: "2025-01-20",
    status: "published",
    downloadUrl: "#",
    body: `Quick Formula Sheet:
- Area of Circle = π * r²
- Circumference of Circle = 2 * π * r
- Area of Triangle = 1/2 * base * height
- Pythagorean Theorem = a² + b² = c²
- Quadratic Formula = x = (-b ± √(b² - 4ac)) / (2a)
- Slope of Line = (y2 - y1) / (x2 - x1)`
  },
  {
    id: "content-5",
    title: "Algebra Quick Reference",
    description: "Step-by-step factoring cheat sheet, exponent laws, and quadratic function behaviors.",
    contentType: "Study Notes",
    category: "Mathematics",
    thumbnail: "https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=600&q=80",
    author: "Dr Wazir Ahmed",
    membership: "premium",
    publishDate: "2025-01-25",
    status: "published",
    downloadUrl: "#",
    body: `Laws of Exponents:
1. a^m * a^n = a^(m+n)
2. a^m / a^n = a^(m-n)
3. (a^m)^n = a^(m*n)
4. a^0 = 1 (where a ≠ 0)
5. a^(-n) = 1 / (a^n)

Factoring Special Products:
- Difference of Squares: a² - b² = (a - b)(a + b)
- Perfect Square Trinomials: a² ± 2ab + b² = (a ± b)²`
  },
  {
    id: "content-6",
    title: "Study Skills Guide",
    description: "Actionable handbook covering the Feynman Technique, Cornell note-taking, active recall routines, and exam preparation checklists.",
    contentType: "Educational Guides",
    category: "Education",
    thumbnail: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=600&q=80",
    author: "Dr Wazir Ahmed",
    membership: "free",
    publishDate: "2025-02-01",
    status: "published",
    downloadUrl: "#",
    body: `The 4-Step Feynman Technique:
1. Choose a concept you want to learn.
2. Teach it to a 12-year-old child (use simple analogies, no jargon).
3. Identify knowledge gaps where you struggle to explain smoothly.
4. Review your source materials, refine your explanation, and repeat until simple.`
  },
  {
    id: "content-7",
    title: "Classroom Management Tips",
    description: "Evidence-based classroom management strategies for teachers: positive behavioral interventions, engagement hooks, and pacing techniques.",
    contentType: "Articles",
    category: "Education",
    thumbnail: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=600&q=80",
    author: "Dr Wazir Ahmed",
    membership: "free",
    publishDate: "2025-02-04",
    status: "published",
    downloadUrl: "#",
    body: `1. Establish clear routines from Day One.
2. Focus on positive reinforcement rather than punitive reprimands.
3. Use the 'Do Now' technique so students engage immediately upon entering.
4. Circulate the room to maintain proximity control without interrupting speech.`
  },
  {
    id: "content-8",
    title: "Technical Writing Guide",
    description: "Comprehensive style manual for writing developer documentation, API endpoints, release notes, and product troubleshooting guides.",
    contentType: "Educational Guides",
    category: "Professional Skills",
    thumbnail: "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=600&q=80",
    author: "Dr Wazir Ahmed",
    membership: "premium",
    publishDate: "2025-02-08",
    status: "published",
    downloadUrl: "#",
    body: `Golden Principles of Technical Writing:
1. Be direct: Put the action verb at the start of instructions.
2. Eliminate redundant words: Replace 'at this point in time' with 'now'.
3. Use tables for multi-attribute configurations.
4. Provide copyable code blocks with realistic inputs and expected outputs.`
  },
  {
    id: "content-9",
    title: "Workplace Safety Checklist",
    description: "Daily and monthly inspection safety checklist covering ergonomics, chemical storage, fire exit corridors, and electrical panels.",
    contentType: "Worksheets",
    category: "Safety",
    thumbnail: "https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=600&q=80",
    author: "Dr Wazir Ahmed",
    membership: "free",
    publishDate: "2025-02-12",
    status: "published",
    downloadUrl: "#",
    body: `Daily Safety Checklist:
- [ ] Emergency exits illuminated and unobstructed
- [ ] Fire extinguishers inspected (pin in place, pressure gauge in green)
- [ ] First-aid kits stocked and easily accessible
- [ ] Cords and cables taped down or covered with cord protectors
- [ ] Eye wash stations tested and clear of debris`
  },
  {
    id: "content-10",
    title: "AI in Education",
    description: "In-depth article on how generative AI is transforming personalized tutoring, adaptive grading, curriculum creation, and student engagement.",
    contentType: "Articles",
    category: "Technology",
    thumbnail: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=600&q=80",
    author: "Dr Wazir Ahmed",
    membership: "premium",
    publishDate: "2025-02-15",
    status: "published",
    downloadUrl: "#",
    body: `Artificial intelligence is fundamentally reshaping pedagogy.
Adaptive learning algorithms can identify exactly where a learner encounters friction—whether in fractions or participle clauses—and dynamically tailor analogies to match their interests.`
  },
  {
    id: "content-11",
    title: "English Vocabulary Practice",
    description: "50 high-yield SAT/GRE vocabulary exercises with sentences, antonyms, synonyms, and fill-in-the-blank questions.",
    contentType: "Worksheets",
    category: "English",
    thumbnail: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=600&q=80",
    author: "Dr Wazir Ahmed",
    membership: "free",
    publishDate: "2025-02-20",
    status: "published",
    downloadUrl: "#",
    body: `Exercise Set 1:
1. EPHEMERAL (adj): Lasting a very short time.
   Sentence: The morning mist over the valley was ephemeral, vanishing as soon as the sun crested the ridge.
2. PRAGMATIC (adj): Dealing with things sensibly and realistically.
   Sentence: We need a pragmatic solution rather than theoretical debates.`
  },
  {
    id: "content-12",
    title: "Exam Preparation Guide",
    description: "A bulletproof 4-week roadmap to prepare for standardized exams, reduce test anxiety, and optimize sleep/nutrition during finals week.",
    contentType: "Exam Resources",
    category: "Education",
    thumbnail: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=600&q=80",
    author: "Dr Wazir Ahmed",
    membership: "free",
    publishDate: "2025-02-24",
    status: "published",
    downloadUrl: "#",
    body: `The 4-Week Exam Timeline:
- Week 4: Gather all syllabus items, map missing notes, create a master topics list.
- Week 3: Deep conceptual review with Feynman technique and summary flashcards.
- Week 2: Timed past-paper simulations under strict exam conditions.
- Week 1: Highlighting weak spots, reviewing formula sheets, and enforcing 8-hour sleep cycles.`
  },
  FBISE_ISLAMIAT_ITEM
];
