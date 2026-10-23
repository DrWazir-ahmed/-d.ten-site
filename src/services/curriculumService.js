// Service to load and query Curriculum Systems, Classes, Subjects, Chapters and 10 MCQs Tests
let cachedIndex = null;
const cachedSubjectFiles = new Map();

/**
 * Fetch and return the curriculum hierarchy index
 */
export const getCurriculumIndex = async () => {
  if (cachedIndex) return cachedIndex;
  try {
    const res = await fetch('/data/curriculum/curriculum_index.json');
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    const data = await res.json();
    cachedIndex = data;
    return data;
  } catch (err) {
    console.error('Failed to load curriculum index:', err);
    return { systems: [] };
  }
};

/**
 * Fetch questions for a specific subject file and return 10 MCQs for the requested chapter
 * @param {string} fileKey - sanitized system__class__subject
 * @param {number|string} chapterNo - chapter number
 * @param {boolean} randomize - whether to sample 10 random questions from the chapter pool
 */
export const getChapter10MCQs = async (fileKey, chapterNo, randomize = true) => {
  try {
    let subjectData = cachedSubjectFiles.get(fileKey);
    if (!subjectData) {
      const res = await fetch(`/data/curriculum/questions/${fileKey}.json`);
      if (!res.ok) throw new Error(`Failed to load questions for ${fileKey}: ${res.status}`);
      subjectData = await res.json();
      cachedSubjectFiles.set(fileKey, subjectData);
    }

    const chapKey = String(chapterNo);
    const questions = subjectData[chapKey] || subjectData[Number(chapterNo)] || [];

    if (!questions || questions.length === 0) {
      return [];
    }

    // Clone questions
    let pool = [...questions];

    if (randomize && pool.length > 10) {
      // Shuffle array
      pool.sort(() => Math.random() - 0.5);
    }

    // Select 10 questions
    const selected = pool.slice(0, 10);

    return selected.map((q, idx) => ({
      id: q.id || `mcq-${idx + 1}`,
      qIndex: idx + 1,
      qNo: q.qNo || idx + 1,
      type: 'mcq',
      question: q.question,
      options: q.options,
      correctAnswer: q.correctAnswer, // 0, 1, 2, 3
      correctLetter: q.correctLetter, // 'A', 'B', 'C', 'D'
      explanation: q.explanation || '',
      difficulty: q.difficulty || 'Medium',
      subTopic: q.subTopic || '',
      points: 1
    }));
  } catch (err) {
    console.error('Error fetching chapter questions:', err);
    return [];
  }
};

/**
 * Fast search across all curriculum systems, classes, subjects, and chapters
 * @param {Array} systems - array of curriculum system objects
 * @param {string} query - search query string
 * @param {number} limit - maximum results (default 60)
 */
export const searchCurriculumTests = (systems = [], query = '', limit = 60) => {
  if (!query || query.trim().length < 2) return [];
  const q = query.toLowerCase().trim();
  const tokens = q.split(/\s+/).filter(Boolean);
  const results = [];

  for (const sys of systems) {
    const sysName = (sys.name || '').toLowerCase();
    const country = (sys.country || '').toLowerCase();

    for (const cls of (sys.classes || [])) {
      const clsName = (cls.name || '').toLowerCase();

      for (const sub of (cls.subjects || [])) {
        const subName = (sub.name || '').toLowerCase();
        const fileKey = sub.fileKey;

        for (const chap of (sub.chapters || [])) {
          const chapTitle = (chap.title || `Chapter ${chap.no}`).toLowerCase();
          const targetStr = `${sysName} ${country} ${clsName} ${subName} ${chapTitle} chapter ${chap.no} unit ${chap.no}`;

          const matches = tokens.every(token => targetStr.includes(token));

          if (matches) {
            results.push({
              id: `${fileKey}__${chap.no}`,
              systemId: sys.id,
              systemName: sys.name,
              country: sys.country,
              flag: sys.flag,
              classId: cls.id,
              className: cls.name,
              subjectId: sub.id,
              subjectName: sub.name,
              fileKey,
              chapterNo: chap.no,
              chapterTitle: chap.title,
              questionCount: chap.count || 10,
              system: sys,
              classItem: cls,
              subject: sub,
              chapter: chap
            });

            if (results.length >= limit) return results;
          }
        }
      }
    }
  }
  return results;
};
