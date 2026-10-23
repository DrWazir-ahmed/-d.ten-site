import { createRequire } from 'module';
import fs from 'fs';
import path from 'path';

const require = createRequire(import.meta.url);
const XLSX = require('xlsx');

const QUESTIONS_DIR = path.resolve('public/data/curriculum/questions');
const INDEX_FILE = path.resolve('public/data/curriculum/curriculum_index.json');

if (!fs.existsSync(QUESTIONS_DIR)) {
  fs.mkdirSync(QUESTIONS_DIR, { recursive: true });
}

// Helper to resolve correct answer to 0, 1, 2, 3 and letter
const resolveAnswer = (ca, opt1, opt2, opt3, opt4) => {
  const str = String(ca || '').trim();
  if (str === '1') return { idx: 0, letter: 'A' };
  if (str === '2') return { idx: 1, letter: 'B' };
  if (str === '3') return { idx: 2, letter: 'C' };
  if (str === '4') return { idx: 3, letter: 'D' };

  const sOpt1 = String(opt1 || '').trim().toLowerCase();
  const sOpt2 = String(opt2 || '').trim().toLowerCase();
  const sOpt3 = String(opt3 || '').trim().toLowerCase();
  const sOpt4 = String(opt4 || '').trim().toLowerCase();
  const sCa = str.toLowerCase();

  if (sCa && sCa === sOpt1) return { idx: 0, letter: 'A' };
  if (sCa && sCa === sOpt2) return { idx: 1, letter: 'B' };
  if (sCa && sCa === sOpt3) return { idx: 2, letter: 'C' };
  if (sCa && sCa === sOpt4) return { idx: 3, letter: 'D' };

  return { idx: 0, letter: 'A' };
};

const sanitize = (name) => {
  return String(name)
    .trim()
    .replace(/[^a-zA-Z0-9_\-]/g, '_')
    .replace(/_+/g, '_');
};

console.log('Loading existing curriculum index...');
let indexData = JSON.parse(fs.readFileSync(INDEX_FILE, 'utf8'));

// Filter out any previous FBISE systems so script is idempotent
const baseSystems = indexData.systems.filter(s => !s.id.startsWith('FBISE_'));

// Add flag and country to existing systems
baseSystems.forEach(sys => {
  if (sys.id === 'Cambridge') {
    sys.country = 'United Kingdom';
    sys.flag = '🇬🇧';
  } else if (sys.id === 'India_CBSE') {
    sys.country = 'India';
    sys.flag = '🇮🇳';
  } else if (sys.id === 'US_High_School') {
    sys.country = 'United States';
    sys.flag = '🇺🇸';
  }
  sys.classes?.forEach(cls => {
    cls.country = sys.country;
    cls.flag = sys.flag;
    cls.subjects?.forEach(sub => {
      sub.country = sys.country;
      sub.flag = sys.flag;
    });
  });
});

console.log('Reading "Matric, English, Math.xlsx"...');
const wb = XLSX.readFile('Matric, English, Math.xlsx');

// ==========================================
// 1. PROCESS MATRIC SHEET (FBISE Pakistan - Matric)
// ==========================================
console.log('Processing Sheet 1: Matric...');
const matricRows = XLSX.utils.sheet_to_json(wb.Sheets['Matric']);
const matricData = {}; // class -> subject -> unit -> array of questions

const SUBJECT_DISPLAY_MAP = {
  'Biology': 'Biology',
  'Chemistry': 'Chemistry',
  'Physics': 'Physics',
  'Math': 'Mathematics',
  'CS': 'Computer Science',
  'English': 'English',
  'PST Eng': 'Pakistan Studies (English)',
  'PST Urdu': 'Pakistan Studies (Urdu)'
};

matricRows.forEach((r, idx) => {
  const rawClass = String(r['Class'] || '').trim();
  const clsName = rawClass === '9' ? 'Class 9' : rawClass === '10' ? 'Class 10' : `Class ${rawClass}`;
  const clsId = sanitize(clsName);
  
  const rawSub = String(r['Subject'] || '').trim();
  const subName = SUBJECT_DISPLAY_MAP[rawSub] || rawSub;
  const subId = sanitize(subName);

  const rawUnit = String(r['Unit'] || '').trim();
  const unitNum = parseInt(rawUnit, 10) || 1;

  if (!matricData[clsId]) {
    matricData[clsId] = {
      id: clsId,
      name: `${clsName} (SSC Part-${rawClass === '9' ? 'I' : 'II'})`,
      country: 'Pakistan',
      flag: '🇵🇰',
      subjects: {}
    };
  }

  if (!matricData[clsId].subjects[subId]) {
    matricData[clsId].subjects[subId] = {
      id: subId,
      name: subName,
      country: 'Pakistan',
      flag: '🇵🇰',
      units: {}
    };
  }

  if (!matricData[clsId].subjects[subId].units[unitNum]) {
    matricData[clsId].subjects[subId].units[unitNum] = [];
  }

  const { idx: ansIdx, letter: ansLetter } = resolveAnswer(
    r['CorrectAnswer'],
    r['Option1'],
    r['Option2'],
    r['Option3'],
    r['Option4']
  );

  matricData[clsId].subjects[subId].units[unitNum].push({
    id: `q-matric-${idx + 1}`,
    qNo: matricData[clsId].subjects[subId].units[unitNum].length + 1,
    difficulty: 'Medium',
    subTopic: `Unit ${unitNum}`,
    question: String(r['Question'] || '').trim(),
    options: [
      String(r['Option1'] || '').trim(),
      String(r['Option2'] || '').trim(),
      String(r['Option3'] || '').trim(),
      String(r['Option4'] || '').trim()
    ],
    correctAnswer: ansIdx,
    correctLetter: ansLetter,
    explanation: String(r['Explanation'] || '').trim() || `The correct option is (${ansLetter}).`
  });
});

// Construct Matric System object and write question files
const fbiseMatricSystem = {
  id: 'FBISE_Matric',
  name: 'FBISE Pakistan - Matric',
  country: 'Pakistan',
  flag: '🇵🇰',
  description: 'Federal Board of Intermediate & Secondary Education (FBISE) - SSC Part-I & Part-II (Classes 9 & 10) Sciences & Humanities',
  classes: []
};

let matricQuestionsCount = 0;
for (const clsId of Object.keys(matricData).sort()) {
  const clsObj = matricData[clsId];
  const classItem = {
    id: clsObj.id,
    name: clsObj.name,
    country: 'Pakistan',
    flag: '🇵🇰',
    subjects: []
  };

  for (const subId of Object.keys(clsObj.subjects).sort()) {
    const subObj = clsObj.subjects[subId];
    const fileKey = `FBISE_Matric__${clsId}__${subId}`;
    const questionFileMap = {};
    const chaptersList = [];
    let subQCount = 0;

    const unitNums = Object.keys(subObj.units).map(Number).sort((a, b) => a - b);
    for (const uNum of unitNums) {
      const qList = subObj.units[uNum];
      questionFileMap[String(uNum)] = qList;
      subQCount += qList.length;
      chaptersList.push({
        no: uNum,
        title: `Unit ${uNum}`,
        count: qList.length
      });
    }

    fs.writeFileSync(
      path.join(QUESTIONS_DIR, `${fileKey}.json`),
      JSON.stringify(questionFileMap)
    );

    matricQuestionsCount += subQCount;
    classItem.subjects.push({
      id: subObj.id,
      name: subObj.name,
      country: 'Pakistan',
      flag: '🇵🇰',
      fileKey,
      chapterCount: chaptersList.length,
      questionCount: subQCount,
      chapters: chaptersList
    });
  }

  fbiseMatricSystem.classes.push(classItem);
}
console.log(`Saved FBISE Matric: ${matricQuestionsCount} questions.`);

// ==========================================
// 2. PROCESS ENGLISH SHEET (FBISE Pakistan - English)
// ==========================================
console.log('Processing Sheet 2: English...');
const englishRows = XLSX.utils.sheet_to_json(wb.Sheets['English']);
const englishSubjects = {};

englishRows.forEach((r, idx) => {
  const rawSub = String(r['Subject'] || '').trim();
  const subName = rawSub === 'Active/Passive' ? 'Active & Passive Voice' :
                  rawSub === 'Direct/Indirect' ? 'Direct & Indirect Speech' :
                  rawSub;
  const subId = sanitize(subName);

  const unitTitle = String(r['Unit'] || '').trim();

  if (!englishSubjects[subId]) {
    englishSubjects[subId] = {
      id: subId,
      name: subName,
      unitOrder: [],
      units: {}
    };
  }

  if (!englishSubjects[subId].units[unitTitle]) {
    englishSubjects[subId].units[unitTitle] = [];
    englishSubjects[subId].unitOrder.push(unitTitle);
  }

  const { idx: ansIdx, letter: ansLetter } = resolveAnswer(
    r['CorrectAnswer'],
    r['Option1'],
    r['Option2'],
    r['Option3'],
    r['Option4']
  );

  const difficulty = String(r['Difficult Level'] || 'Intermediate').trim();
  const explanation = String(r['Explanation'] || '').trim() || `The correct option is (${ansLetter}).`;

  englishSubjects[subId].units[unitTitle].push({
    id: `q-eng-${idx + 1}`,
    qNo: englishSubjects[subId].units[unitTitle].length + 1,
    difficulty,
    subTopic: unitTitle,
    question: String(r['Question'] || '').trim(),
    options: [
      String(r['Option1'] || '').trim(),
      String(r['Option2'] || '').trim(),
      String(r['Option3'] || '').trim(),
      String(r['Option4'] || '').trim()
    ],
    correctAnswer: ansIdx,
    correctLetter: ansLetter,
    explanation
  });
});

const fbiseEnglishSystem = {
  id: 'FBISE_English',
  name: 'FBISE Pakistan - English',
  country: 'Pakistan',
  flag: '🇵🇰',
  description: 'Federal Board of Intermediate & Secondary Education (FBISE) - Secondary English Grammar, Tenses, Parts of Speech & Syntax',
  classes: [
    {
      id: 'Secondary_English',
      name: 'Secondary English (Classes 9 & 10)',
      country: 'Pakistan',
      flag: '🇵🇰',
      subjects: []
    }
  ]
};

let englishQuestionsCount = 0;
for (const subId of Object.keys(englishSubjects)) {
  const subObj = englishSubjects[subId];
  const fileKey = `FBISE_English__Secondary_English__${subId}`;
  const questionFileMap = {};
  const chaptersList = [];
  let subQCount = 0;

  subObj.unitOrder.forEach((unitTitle, index) => {
    const chapNo = index + 1;
    const qList = subObj.units[unitTitle];
    questionFileMap[String(chapNo)] = qList;
    subQCount += qList.length;
    chaptersList.push({
      no: chapNo,
      title: unitTitle,
      count: qList.length
    });
  });

  fs.writeFileSync(
    path.join(QUESTIONS_DIR, `${fileKey}.json`),
    JSON.stringify(questionFileMap)
  );

  englishQuestionsCount += subQCount;
  fbiseEnglishSystem.classes[0].subjects.push({
    id: subObj.id,
    name: subObj.name,
    country: 'Pakistan',
    flag: '🇵🇰',
    fileKey,
    chapterCount: chaptersList.length,
    questionCount: subQCount,
    chapters: chaptersList
  });
}
console.log(`Saved FBISE English: ${englishQuestionsCount} questions.`);

// ==========================================
// 3. PROCESS MATH SHEET (FBISE Pakistan - Math)
// ==========================================
console.log('Processing Sheet 3: Math...');
const mathRows = XLSX.utils.sheet_to_json(wb.Sheets['Math']);
const mathSubjects = {};

mathRows.forEach((r, idx) => {
  const subName = String(r['Subject'] || '').trim();
  const subId = sanitize(subName);
  const unitTitle = String(r['Unit'] || '').trim();

  if (!mathSubjects[subId]) {
    mathSubjects[subId] = {
      id: subId,
      name: subName,
      unitOrder: [],
      units: {}
    };
  }

  if (!mathSubjects[subId].units[unitTitle]) {
    mathSubjects[subId].units[unitTitle] = [];
    mathSubjects[subId].unitOrder.push(unitTitle);
  }

  const { idx: ansIdx, letter: ansLetter } = resolveAnswer(
    r['CorrectAnswer'],
    r['Option1'],
    r['Option2'],
    r['Option3'],
    r['Option4']
  );

  const difficulty = String(r['Level'] || 'Intermediate').trim();
  const explanation = String(r['Explanation'] || '').trim() || `The correct option is (${ansLetter}).`;

  mathSubjects[subId].units[unitTitle].push({
    id: `q-math-${idx + 1}`,
    qNo: mathSubjects[subId].units[unitTitle].length + 1,
    difficulty,
    subTopic: unitTitle,
    question: String(r['Question'] || '').trim(),
    options: [
      String(r['Option1'] || '').trim(),
      String(r['Option2'] || '').trim(),
      String(r['Option3'] || '').trim(),
      String(r['Option4'] || '').trim()
    ],
    correctAnswer: ansIdx,
    correctLetter: ansLetter,
    explanation
  });
});

const fbiseMathSystem = {
  id: 'FBISE_Math',
  name: 'FBISE Pakistan - Math',
  country: 'Pakistan',
  flag: '🇵🇰',
  description: 'Federal Board of Intermediate & Secondary Education (FBISE) - Secondary Mathematics Complete Syllabi',
  classes: [
    {
      id: 'Secondary_Math',
      name: 'Secondary Mathematics (Classes 9 & 10)',
      country: 'Pakistan',
      flag: '🇵🇰',
      subjects: []
    }
  ]
};

let mathQuestionsCount = 0;
for (const subId of Object.keys(mathSubjects)) {
  const subObj = mathSubjects[subId];
  const fileKey = `FBISE_Math__Secondary_Math__${subId}`;
  const questionFileMap = {};
  const chaptersList = [];
  let subQCount = 0;

  subObj.unitOrder.forEach((unitTitle, index) => {
    const chapNo = index + 1;
    const qList = subObj.units[unitTitle];
    questionFileMap[String(chapNo)] = qList;
    subQCount += qList.length;
    chaptersList.push({
      no: chapNo,
      title: unitTitle,
      count: qList.length
    });
  });

  fs.writeFileSync(
    path.join(QUESTIONS_DIR, `${fileKey}.json`),
    JSON.stringify(questionFileMap)
  );

  mathQuestionsCount += subQCount;
  fbiseMathSystem.classes[0].subjects.push({
    id: subObj.id,
    name: subObj.name,
    country: 'Pakistan',
    flag: '🇵🇰',
    fileKey,
    chapterCount: chaptersList.length,
    questionCount: subQCount,
    chapters: chaptersList
  });
}
console.log(`Saved FBISE Math: ${mathQuestionsCount} questions.`);

// Assemble all systems
const finalSystems = [
  ...baseSystems,
  fbiseMatricSystem,
  fbiseEnglishSystem,
  fbiseMathSystem
];

const totalQuestionsOverall = finalSystems.reduce((acc, sys) => {
  return acc + (sys.classes || []).reduce((cAcc, cls) => {
    return cAcc + (cls.subjects || []).reduce((sAcc, sub) => sAcc + sub.questionCount, 0);
  }, 0);
}, 0);

const finalIndex = {
  generatedAt: new Date().toISOString(),
  totalQuestions: totalQuestionsOverall,
  systems: finalSystems
};

fs.writeFileSync(INDEX_FILE, JSON.stringify(finalIndex, null, 2));

// Also copy to dist if dist exists
const distIndex = path.resolve('dist/data/curriculum/curriculum_index.json');
if (fs.existsSync(path.dirname(distIndex))) {
  fs.writeFileSync(distIndex, JSON.stringify(finalIndex, null, 2));
}

console.log('--- CURRICULUM GENERATION COMPLETED ---');
console.log('Total Systems:', finalSystems.length);
finalSystems.forEach(s => {
  const qCount = (s.classes || []).reduce((acc, c) => 
    acc + (c.subjects || []).reduce((sAcc, sub) => sAcc + sub.questionCount, 0), 0
  );
  console.log(`  ${s.flag} ${s.name} (${s.country}): ${s.classes.length} classes, ${qCount} questions`);
});
console.log('Total Questions Across All Systems:', totalQuestionsOverall);
