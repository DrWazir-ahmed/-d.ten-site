import React, { useState, useEffect, useMemo, useRef } from 'react';
import { 
  Award, 
  Clock, 
  HelpCircle, 
  CheckCircle2, 
  XCircle, 
  AlertCircle, 
  RotateCcw, 
  ArrowRight, 
  Check, 
  X, 
  ArrowUp, 
  ArrowDown, 
  Sparkles, 
  Layers, 
  ListOrdered, 
  Columns,
  Play, 
  Bookmark, 
  FileText, 
  Filter,
  BookOpen,
  ChevronRight
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { saveQuizResult } from '../../services/firebaseService';
import { useAuth } from '../../context/AuthContext';

// Helper to detect Urdu/Arabic script text for bidirectional RTL rendering
const isUrduOrRTL = (text) => {
  if (!text) return false;
  const str = String(text).trim();
  const rtlChars = str.match(/[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF]/g);
  if (!rtlChars) return false;
  const firstLetter = str.replace(/[^a-zA-Z\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF]/g, '')[0];
  if (firstLetter && /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF]/.test(firstLetter)) {
    return true;
  }
  return rtlChars.length > 2;
};

// Descriptive labels for Islamiat Class 9 Units
const ISLAMIAT_UNIT_LABELS = {
  'Unit 1': 'یونٹ 1: قرآن مجید اور حدیث نبوی ﷺ',
  'Unit 2': 'یونٹ 2: ایمانیات و عبادات',
  'Unit 3': 'یونٹ 3: سیرت النبی ﷺ',
  'Unit 4': 'یونٹ 4: اخلاق و آداب',
  'Unit 5': 'یونٹ 5: حسن معاملات و معاشرت',
  'Unit 6': 'یونٹ 6: ہدایت کے سرچشمے اور مشاہیر اسلام',
  'Unit 7': 'یونٹ 7: اسلامی تعلیمات اور عصر حاضر کے تقاضے'
};

// Pure Helper to determine question correctness (Top-level, safe for all hooks)
const getQuestionResult = (q, currentAnswers) => {
  if (!q) return { status: 'unanswered', isCorrect: false };
  const userAns = currentAnswers[q.id];
  if (userAns === undefined || userAns === null) return { status: 'unanswered', isCorrect: false };

  if (q.type === 'mcq' || q.type === 'true_false') {
    const isCorrect = userAns === q.correctAnswer;
    return { status: isCorrect ? 'correct' : 'wrong', isCorrect };
  }
  if (q.type === 'fill_blank') {
    const acceptable = q.acceptedAnswers && Array.isArray(q.acceptedAnswers) && q.acceptedAnswers.length > 0
      ? q.acceptedAnswers
      : [String(q.correctAnswer || '')];
    const trimmed = (userAns || '').toString().trim();
    const isCorrect = acceptable.some(acc => {
      if (q.caseSensitive) return acc.toString().trim() === trimmed;
      return acc.toString().trim().toLowerCase() === trimmed.toLowerCase();
    }) && trimmed.length > 0;
    return { status: isCorrect ? 'correct' : 'wrong', isCorrect };
  }
  if (q.type === 'matching') {
    let matchCount = 0;
    (q.pairs || []).forEach(p => {
      if (userAns?.[p.id] === p.right) matchCount++;
    });
    const isCorrect = matchCount === (q.pairs?.length || 0);
    return { status: isCorrect ? 'correct' : (matchCount > 0 ? 'partial' : 'wrong'), isCorrect };
  }
  if (q.type === 'ordering') {
    let orderCount = 0;
    (q.items || []).forEach((expected, i) => {
      if (userAns?.[i] === expected) orderCount++;
    });
    const isCorrect = orderCount === (q.items?.length || 0);
    return { status: isCorrect ? 'correct' : (orderCount > 0 ? 'partial' : 'wrong'), isCorrect };
  }
  return { status: 'unknown', isCorrect: false };
};

export const StandardTestPlayer = ({
  testData,
  courseId,
  courseTitle = 'Course',
  lessonTitle = 'Assessment',
  onComplete,
  isCompleted = false,
  onNextLesson,
  onClose
}) => {
  const { currentUser } = useAuth();

  // 1. Normalize test data (supports modular testData, legacy quiz, or fallback)
  const normalizedTest = useMemo(() => {
    if (!testData) return null;

    const title = testData.title || lessonTitle || 'Course Assessment';
    const settings = {
      passingScore: 70,
      timeLimit: 0,
      attemptsAllowed: 0,
      shuffleQuestions: false,
      shuffleOptions: false,
      showInstantFeedback: false,
      requirePassingToProceed: true,
      retryUntil100: false,
      instructions: 'Answer all questions carefully before submitting. You need to meet the passing score to complete this assessment.',
      ...(testData.settings || {})
    };

    if (testData.passingScore) settings.passingScore = Number(testData.passingScore);
    if (testData.timeLimit) settings.timeLimit = Number(testData.timeLimit);
    if (testData.attemptsAllowed) settings.attemptsAllowed = Number(testData.attemptsAllowed);
    if (testData.retryUntil100 !== undefined) settings.retryUntil100 = Boolean(testData.retryUntil100);

    let rawQuestions = testData.questions || [];
    if (rawQuestions.length === 0 && testData.questions) {
      rawQuestions = testData.questions;
    }

    const processedQuestions = rawQuestions.map((q, idx) => {
      const type = q.type || 'mcq';
      return {
        id: q.id || `q-${idx}`,
        type,
        question: q.question || `Question ${idx + 1}`,
        options: q.options || [],
        correctAnswer: q.correctAnswer !== undefined ? q.correctAnswer : 0,
        acceptedAnswers: q.acceptedAnswers || (q.correctAnswer !== undefined ? [String(q.correctAnswer)] : []),
        caseSensitive: Boolean(q.caseSensitive),
        hint: q.hint || '',
        pairs: q.pairs || [],
        items: q.items || [],
        explanation: q.explanation || '',
        points: Number(q.points) || (type === 'matching' || type === 'ordering' || type === 'fill_blank' ? 2 : 1),
        surah: q.surah || '',
        qNum: q.qNum || '',
        unit: q.unit || '',
        topic: q.topic || '',
        pageNumber: q.pageNumber || ''
      };
    });

    return {
      title,
      settings,
      questions: processedQuestions
    };
  }, [testData, lessonTitle]);

  // 2. All States (Defined unconditionally at top)
  const [hasStarted, setHasStarted] = useState(false);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [earnedPoints, setEarnedPoints] = useState(0);
  const [totalPoints, setTotalPoints] = useState(0);
  const [passed, setPassed] = useState(false);
  const [attemptsCount, setAttemptsCount] = useState(0);
  const [markedForReview, setMarkedForReview] = useState({});
  const [timeLeft, setTimeLeft] = useState(0);
  const [timeSpent, setTimeSpent] = useState(0);
  const timerRef = useRef(null);

  // 100% Mastery Challenge & Wrong-Answer Revision state
  const [isFixingWrongMode, setIsFixingWrongMode] = useState(false);
  const [reviewFilter, setReviewFilter] = useState('all'); // 'all' | 'wrong' | 'correct'

  // Surah / Unit / Topic selection scope state
  const [selectedSurah, setSelectedSurah] = useState('ALL');
  const [selectedUnit, setSelectedUnit] = useState('ALL');
  const [selectedTopic, setSelectedTopic] = useState('ALL');

  // Random shuffled questions when test starts
  const [shuffledQuestions, setShuffledQuestions] = useState([]);

  // 3. All useMemos (Unconditionally declared at top before ANY return)
  const availableSurahs = useMemo(() => {
    if (!normalizedTest) return [];
    const list = [];
    normalizedTest.questions.forEach(q => {
      if (q.surah && !list.includes(q.surah)) {
        list.push(q.surah);
      }
    });
    return list;
  }, [normalizedTest]);

  const availableUnits = useMemo(() => {
    if (!normalizedTest) return [];
    const list = [];
    normalizedTest.questions.forEach(q => {
      if (q.unit && !list.includes(q.unit)) {
        list.push(q.unit);
      }
    });
    return list;
  }, [normalizedTest]);

  const availableTopics = useMemo(() => {
    if (!normalizedTest) return [];
    const list = [];
    normalizedTest.questions.forEach(q => {
      if (selectedUnit === 'ALL' || q.unit === selectedUnit) {
        if (q.topic && !list.includes(q.topic)) {
          list.push(q.topic);
        }
      }
    });
    return list;
  }, [normalizedTest, selectedUnit]);

  // Scoped question pool according to selected Surah or Unit/Topic
  const scopedQuestions = useMemo(() => {
    if (!normalizedTest) return [];
    let list = normalizedTest.questions;

    if (availableSurahs.length > 0 && selectedSurah !== 'ALL') {
      list = list.filter(q => q.surah === selectedSurah);
    } else if (availableUnits.length > 0) {
      if (selectedUnit !== 'ALL') {
        list = list.filter(q => q.unit === selectedUnit);
      }
      if (selectedTopic !== 'ALL') {
        list = list.filter(q => q.topic === selectedTopic);
      }
    }

    return list;
  }, [normalizedTest, availableSurahs.length, availableUnits.length, selectedSurah, selectedUnit, selectedTopic]);

  // Active question list (shuffled if started, else current scoped questions)
  const activeQuestions = useMemo(() => {
    if (hasStarted && shuffledQuestions.length > 0) {
      return shuffledQuestions;
    }
    return scopedQuestions;
  }, [hasStarted, shuffledQuestions, scopedQuestions]);

  // Status mapping for active questions
  const questionsWithStatus = useMemo(() => {
    return activeQuestions.map((q, idx) => {
      const res = getQuestionResult(q, answers);
      return {
        ...q,
        index: idx,
        isCorrect: res.isCorrect,
        status: res.status
      };
    });
  }, [activeQuestions, answers]);

  const correctCount = useMemo(() => {
    return questionsWithStatus.filter(q => q.isCorrect).length;
  }, [questionsWithStatus]);

  const wrongCount = useMemo(() => {
    return activeQuestions.length - correctCount;
  }, [activeQuestions.length, correctCount]);

  const displayQuestions = useMemo(() => {
    if (!submitted) return questionsWithStatus;
    if (reviewFilter === 'wrong') {
      return questionsWithStatus.filter(q => !q.isCorrect);
    }
    if (reviewFilter === 'correct') {
      return questionsWithStatus.filter(q => q.isCorrect);
    }
    return questionsWithStatus;
  }, [questionsWithStatus, submitted, reviewFilter]);

  const typeCounts = useMemo(() => {
    return {
      mcq: activeQuestions.filter(q => q.type === 'mcq').length,
      true_false: activeQuestions.filter(q => q.type === 'true_false').length,
      fill_blank: activeQuestions.filter(q => q.type === 'fill_blank').length,
      matching: activeQuestions.filter(q => q.type === 'matching').length,
      ordering: activeQuestions.filter(q => q.type === 'ordering').length
    };
  }, [activeQuestions]);

  const answeredCount = useMemo(() => {
    return activeQuestions.reduce((cnt, q) => {
      const a = answers[q.id];
      if (q.type === 'mcq' || q.type === 'true_false') {
        return a !== undefined && a !== null ? cnt + 1 : cnt;
      }
      if (q.type === 'fill_blank') {
        return a !== undefined && a !== null && a.toString().trim().length > 0 ? cnt + 1 : cnt;
      }
      if (q.type === 'matching') {
        const pairs = Object.keys(a || {}).length;
        return pairs >= (q.pairs?.length || 1) ? cnt + 1 : cnt;
      }
      if (q.type === 'ordering') {
        return Array.isArray(a) && a.length > 0 ? cnt + 1 : cnt;
      }
      return cnt;
    }, 0);
  }, [activeQuestions, answers]);

  const progressPct = useMemo(() => {
    return activeQuestions.length > 0 ? Math.round((answeredCount / activeQuestions.length) * 100) : 0;
  }, [activeQuestions.length, answeredCount]);

  // 4. Reset effects
  useEffect(() => {
    setHasStarted(false);
    setAnswers({});
    setMarkedForReview({});
    setSubmitted(false);
    setScore(0);
    setEarnedPoints(0);
    setPassed(false);
    setIsFixingWrongMode(false);
    setReviewFilter('all');
    setShuffledQuestions([]);
    if (timerRef.current) clearInterval(timerRef.current);
  }, [normalizedTest?.title, selectedSurah, selectedUnit, selectedTopic]);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  // Format countdown
  const formatTime = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  // Start assessment handler
  const handleStartTest = () => {
    if (!normalizedTest || scopedQuestions.length === 0) return;

    let qs = [...scopedQuestions];
    if (normalizedTest.settings.shuffleQuestions) {
      qs.sort(() => Math.random() - 0.5);
    }

    const initialAnswers = {};
    qs.forEach(q => {
      if (q.type === 'ordering') {
        const scrambled = [...(q.items || [])].sort(() => Math.random() - 0.5);
        initialAnswers[q.id] = scrambled;
      } else if (q.type === 'matching') {
        initialAnswers[q.id] = {};
      }
    });

    setShuffledQuestions(qs);
    setAnswers(initialAnswers);
    setHasStarted(true);
    setSubmitted(false);
    setIsFixingWrongMode(false);
    setReviewFilter('all');
    setAttemptsCount(prev => prev + 1);

    const limitMinutes = normalizedTest.settings.timeLimit || 0;
    if (limitMinutes > 0) {
      const totalSecs = limitMinutes * 60;
      setTimeLeft(totalSecs);
      setTimeSpent(0);

      if (timerRef.current) clearInterval(timerRef.current);
      timerRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            handleAutoSubmit();
            return 0;
          }
          return prev - 1;
        });
        setTimeSpent(prev => prev + 1);
      }, 1000);
    }
  };

  const handleAutoSubmit = () => {
    alert('Time limit expired! Your test is being automatically evaluated.');
    evaluateAndSubmit();
  };

  // Answer interaction handlers
  const handleSelectMCQ = (qId, optionIdx) => {
    if (submitted && !isFixingWrongMode) return;
    if (submitted && isFixingWrongMode) {
      const q = activeQuestions.find(item => item.id === qId);
      if (q && getQuestionResult(q, answers).isCorrect) return; // Locked correct
    }
    setAnswers(prev => ({ ...prev, [qId]: optionIdx }));
  };

  const handleSelectTrueFalse = (qId, val) => {
    if (submitted && !isFixingWrongMode) return;
    if (submitted && isFixingWrongMode) {
      const q = activeQuestions.find(item => item.id === qId);
      if (q && getQuestionResult(q, answers).isCorrect) return;
    }
    setAnswers(prev => ({ ...prev, [qId]: val }));
  };

  const handleFillBlank = (qId, val) => {
    if (submitted && !isFixingWrongMode) return;
    if (submitted && isFixingWrongMode) {
      const q = activeQuestions.find(item => item.id === qId);
      if (q && getQuestionResult(q, answers).isCorrect) return;
    }
    setAnswers(prev => ({ ...prev, [qId]: val }));
  };

  const handleMatchPair = (qId, pairId, selectedRight) => {
    if (submitted && !isFixingWrongMode) return;
    if (submitted && isFixingWrongMode) {
      const q = activeQuestions.find(item => item.id === qId);
      if (q && getQuestionResult(q, answers).isCorrect) return;
    }
    setAnswers(prev => ({
      ...prev,
      [qId]: {
        ...(prev[qId] || {}),
        [pairId]: selectedRight
      }
    }));
  };

  const handleMoveOrderItem = (qId, currentItems, fromIdx, direction) => {
    if (submitted && !isFixingWrongMode) return;
    if (submitted && isFixingWrongMode) {
      const q = activeQuestions.find(item => item.id === qId);
      if (q && getQuestionResult(q, answers).isCorrect) return;
    }
    const toIdx = direction === 'up' ? fromIdx - 1 : fromIdx + 1;
    if (toIdx < 0 || toIdx >= currentItems.length) return;

    const updated = [...currentItems];
    const temp = updated[fromIdx];
    updated[fromIdx] = updated[toIdx];
    updated[toIdx] = temp;

    setAnswers(prev => ({ ...prev, [qId]: updated }));
  };

  // Evaluation & Grading
  const evaluateAndSubmit = () => {
    if (timerRef.current) clearInterval(timerRef.current);

    const qs = activeQuestions;
    let earned = 0;
    let total = 0;

    qs.forEach(q => {
      const qPts = Number(q.points) || 1;
      total += qPts;
      const userAns = answers[q.id];

      if (q.type === 'mcq') {
        if (userAns === q.correctAnswer) {
          earned += qPts;
        } else if (normalizedTest.settings.negativeMarking > 0 && userAns !== undefined && userAns !== null) {
          earned = Math.max(0, earned - Number(normalizedTest.settings.negativeMarking));
        }
      } else if (q.type === 'true_false') {
        if (userAns === q.correctAnswer) {
          earned += qPts;
        } else if (normalizedTest.settings.negativeMarking > 0 && userAns !== undefined && userAns !== null) {
          earned = Math.max(0, earned - Number(normalizedTest.settings.negativeMarking));
        }
      } else if (q.type === 'fill_blank') {
        const acceptable = q.acceptedAnswers && Array.isArray(q.acceptedAnswers) && q.acceptedAnswers.length > 0
          ? q.acceptedAnswers
          : [String(q.correctAnswer || '')];
        const trimmed = (userAns || '').toString().trim();
        const isMatch = acceptable.some(acc => {
          if (q.caseSensitive) return acc.toString().trim() === trimmed;
          return acc.toString().trim().toLowerCase() === trimmed.toLowerCase();
        });
        if (isMatch && trimmed.length > 0) {
          earned += qPts;
        } else if (normalizedTest.settings.negativeMarking > 0 && trimmed.length > 0) {
          earned = Math.max(0, earned - Number(normalizedTest.settings.negativeMarking));
        }
      } else if (q.type === 'matching') {
        if (userAns && typeof userAns === 'object') {
          let cCount = 0;
          q.pairs.forEach(p => {
            if (userAns[p.id] === p.right) cCount++;
          });
          const frac = (q.pairs.length > 0) ? (cCount / q.pairs.length) : 0;
          earned += Math.round(frac * qPts * 10) / 10;
        }
      } else if (q.type === 'ordering') {
        if (Array.isArray(userAns)) {
          let correctPositions = 0;
          q.items.forEach((expectedItem, i) => {
            if (userAns[i] === expectedItem) correctPositions++;
          });
          const frac = (q.items.length > 0) ? (correctPositions / q.items.length) : 0;
          earned += Math.round(frac * qPts * 10) / 10;
        }
      }
    });

    const calculatedPct = total > 0 ? Math.round((earned / total) * 100) : 0;
    const target = normalizedTest.settings.passingScore || 70;
    const isPassing = calculatedPct >= target;

    setScore(calculatedPct);
    setEarnedPoints(earned);
    setTotalPoints(total);
    setPassed(isPassing);
    setSubmitted(true);

    if (calculatedPct === 100) {
      setIsFixingWrongMode(false);
      setReviewFilter('all');
      confetti({
        particleCount: 150,
        spread: 80,
        origin: { y: 0.6 }
      });
    } else if (isPassing && !isFixingWrongMode) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    }

    try {
      saveQuizResult({
        userId: currentUser?.uid || 'current-user',
        courseId: courseId || testData?.id || 'standard-test',
        courseTitle: courseTitle || normalizedTest.title,
        quizTitle: `${normalizedTest.title}${selectedSurah !== 'ALL' ? ' - ' + selectedSurah : selectedUnit !== 'ALL' ? ' - ' + selectedUnit : ''}`,
        score: calculatedPct,
        passed: isPassing,
        earnedPoints: earned,
        totalPoints: total,
        completedAt: new Date().toISOString()
      });
    } catch (e) {
      console.warn("Could not record test result to student dashboard:", e);
    }

    if (onComplete) {
      onComplete({
        passed: isPassing,
        score: calculatedPct,
        earnedPoints: earned,
        totalPoints: total
      });
    }
  };

  const handleSubmitClick = () => {
    const qs = activeQuestions;
    let unansweredCount = 0;

    qs.forEach(q => {
      const a = answers[q.id];
      if (q.type === 'mcq' || q.type === 'true_false') {
        if (a === undefined || a === null) unansweredCount++;
      } else if (q.type === 'matching') {
        const matchesCount = Object.keys(a || {}).length;
        if (matchesCount < q.pairs.length) unansweredCount++;
      }
    });

    if (unansweredCount > 0) {
      const confirmSubmit = window.confirm(
        `آپ کے ${unansweredCount} سوالات ابھی حل طلب ہیں۔ کیا آپ ابھی جمع کروانا چاہتے ہیں؟`
      );
      if (!confirmSubmit) return;
    }

    evaluateAndSubmit();
  };

  const handleRetake = () => {
    const maxAttempts = normalizedTest.settings.attemptsAllowed || 0;
    if (maxAttempts > 0 && attemptsCount >= maxAttempts) {
      alert(`You have reached the maximum allowed limit of ${maxAttempts} attempt(s) for this assessment.`);
      return;
    }
    handleStartTest();
  };

  /* ──────────────────────────────────────────────────────────────────────────
     CONDITIONAL RENDERS (Safe: All Hooks were executed above unconditionally)
     ────────────────────────────────────────────────────────────────────────── */

  if (!normalizedTest || normalizedTest.questions.length === 0) {
    return (
      <div className="p-8 text-center bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800">
        <HelpCircle className="w-12 h-12 text-slate-300 mx-auto mb-3" />
        <h3 className="font-bold text-base text-slate-800 dark:text-white">Assessment is being prepared</h3>
        <p className="text-xs text-slate-400 mt-1">This test module has not been populated with questions yet.</p>
      </div>
    );
  }

  /* ──────────────────────────────────────────────────────────────────────────
     1. PRE-TEST SPLASH SCREEN & SURAH/UNIT SELECTOR
     ────────────────────────────────────────────────────────────────────────── */
  if (!hasStarted && !submitted) {
    const maxAttempts = normalizedTest.settings.attemptsAllowed || 0;
    const attemptsLeft = maxAttempts > 0 ? maxAttempts - attemptsCount : null;

    return (
      <div className="max-w-3xl mx-auto py-6 px-3 sm:px-6">
        <div className="p-5 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl space-y-6 text-center animate-fadeIn">
          
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-brand-600 via-indigo-600 to-emerald-600 text-white flex items-center justify-center mx-auto shadow-lg shadow-brand-500/25">
            {availableSurahs.length > 0 ? <BookOpen className="w-8 h-8" /> : <Award className="w-8 h-8" />}
          </div>

          <div>
            <span className="text-[11px] font-black uppercase tracking-wider text-brand-600 dark:text-brand-400 bg-brand-50 dark:bg-brand-950/60 px-3 py-1 rounded-full border border-brand-200 dark:border-brand-800 font-urdu">
              {availableSurahs.length > 0 ? 'ترجمۃ القرآن المجید • نہم جماعت' : availableUnits.length > 0 ? 'اسلامیات لازمی • نہم جماعت' : 'Interactive Assessment Module'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-3 font-urdu">
              {normalizedTest.title}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-2 max-w-xl mx-auto font-urdu leading-relaxed">
              {normalizedTest.settings.instructions}
            </p>
          </div>

          {/* ───────────────────────────────────────────────────────────
              INTERACTIVE SURAH SELECTOR (For Tarjama-tul-Quran)
              ─────────────────────────────────────────────────────────── */}
          {availableSurahs.length > 0 && (
            <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 text-right space-y-3" dir="rtl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 border-b border-slate-200 dark:border-slate-700/60 pb-2.5">
                <span className="text-xs sm:text-sm font-black text-slate-900 dark:text-white font-urdu flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4 text-emerald-600" />
                  امتحانی سورت کا انتخاب کریں:
                </span>
                <span className="text-[11px] font-bold text-emerald-700 dark:text-emerald-300 font-urdu">
                  {selectedSurah === 'ALL' 
                    ? `مکمل پرچہ (تمام 18 سورتیں • 90 سوالات)` 
                    : `منتخب شدہ: ${selectedSurah} • (${scopedQuestions.length} سوالات)`}
                </span>
              </div>

              {/* Surah Pills Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 max-h-60 overflow-y-auto pr-1">
                <button
                  type="button"
                  onClick={() => setSelectedSurah('ALL')}
                  className={`p-2.5 rounded-xl text-xs font-urdu font-black transition flex items-center justify-between border cursor-pointer ${
                    selectedSurah === 'ALL'
                      ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm ring-2 ring-emerald-400/30'
                      : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-emerald-500 hover:bg-emerald-50/30'
                  }`}
                >
                  <span>تمام 18 سورتیں</span>
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-md bg-black/10 dark:bg-white/10 font-bold">
                    {normalizedTest.questions.length}
                  </span>
                </button>

                {availableSurahs.map((surah, sIdx) => {
                  const sCount = normalizedTest.questions.filter(q => q.surah === surah).length;
                  const isSel = selectedSurah === surah;
                  return (
                    <button
                      key={surah}
                      type="button"
                      onClick={() => setSelectedSurah(surah)}
                      className={`p-2.5 rounded-xl text-xs font-urdu font-bold transition flex items-center justify-between border cursor-pointer ${
                        isSel
                          ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm ring-2 ring-emerald-400/30'
                          : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-emerald-500 hover:bg-emerald-50/30'
                      }`}
                    >
                      <span className="truncate">📖 {surah}</span>
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-md bg-black/10 dark:bg-white/10 font-bold shrink-0">
                        {sCount}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* ───────────────────────────────────────────────────────────
              INTERACTIVE UNIT & TOPIC SELECTOR (For Islamiat)
              ─────────────────────────────────────────────────────────── */}
          {availableUnits.length > 0 && (
            <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 text-right space-y-3" dir="rtl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 border-b border-slate-200 dark:border-slate-700/60 pb-2.5">
                <span className="text-xs sm:text-sm font-black text-slate-900 dark:text-white font-urdu flex items-center gap-1.5">
                  <Layers className="w-4 h-4 text-blue-600" />
                  امتحانی یونٹ کا انتخاب کریں:
                </span>
                <span className="text-[11px] font-bold text-blue-700 dark:text-blue-300 font-urdu">
                  {selectedUnit === 'ALL' 
                    ? `مکمل نصاب (تمام 7 یونٹس • 131 سوالات)` 
                    : `منتخب شدہ: ${ISLAMIAT_UNIT_LABELS[selectedUnit] || selectedUnit} • (${scopedQuestions.length} سوالات)`}
                </span>
              </div>

              {/* Units Buttons */}
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setSelectedUnit('ALL');
                    setSelectedTopic('ALL');
                  }}
                  className={`px-3 py-2 rounded-xl text-xs font-urdu font-black transition flex items-center gap-1.5 border cursor-pointer ${
                    selectedUnit === 'ALL'
                      ? 'bg-blue-600 text-white border-blue-600 shadow-sm ring-2 ring-blue-400/30'
                      : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-blue-500'
                  }`}
                >
                  <span>تمام نصاب (مکمل 131 سوالات)</span>
                </button>

                {availableUnits.map((u) => {
                  const uCount = normalizedTest.questions.filter(q => q.unit === u).length;
                  const isSel = selectedUnit === u;
                  const label = ISLAMIAT_UNIT_LABELS[u] || u;
                  return (
                    <button
                      key={u}
                      type="button"
                      onClick={() => {
                        setSelectedUnit(u);
                        setSelectedTopic('ALL');
                      }}
                      className={`px-3 py-2 rounded-xl text-xs font-urdu font-bold transition flex items-center gap-1.5 border cursor-pointer ${
                        isSel
                          ? 'bg-blue-600 text-white border-blue-600 shadow-sm ring-2 ring-blue-400/30'
                          : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-blue-500 hover:bg-blue-50/30'
                      }`}
                    >
                      <span>{label}</span>
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-md bg-black/10 dark:bg-white/10 font-bold">
                        {uCount}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Sub-Topics within the selected Unit */}
              {selectedUnit !== 'ALL' && availableTopics.length > 1 && (
                <div className="pt-2.5 border-t border-slate-200 dark:border-slate-700/60 flex flex-wrap items-center gap-1.5">
                  <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 font-urdu ml-1">
                    سبق منتخب کریں:
                  </span>
                  <button
                    type="button"
                    onClick={() => setSelectedTopic('ALL')}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-urdu font-bold transition cursor-pointer ${
                      selectedTopic === 'ALL'
                        ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900'
                        : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
                    }`}
                  >
                    تمام اسباق ({normalizedTest.questions.filter(q => q.unit === selectedUnit).length})
                  </button>
                  {availableTopics.map(t => {
                    const tCount = normalizedTest.questions.filter(q => q.unit === selectedUnit && q.topic === t).length;
                    const isTSel = selectedTopic === t;
                    return (
                      <button
                        key={t}
                        type="button"
                        onClick={() => setSelectedTopic(t)}
                        className={`px-2.5 py-1 rounded-lg text-[11px] font-urdu font-bold transition cursor-pointer ${
                          isTSel
                            ? 'bg-blue-600 text-white'
                            : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-blue-500'
                        }`}
                      >
                        {t} ({tCount})
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* Assessment Standards Summary Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-left">
            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Target</span>
              <span className="text-base font-black text-slate-900 dark:text-white flex items-center gap-1 mt-0.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                {normalizedTest.settings.passingScore}% Pass
              </span>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Time Limit</span>
              <span className="text-base font-black text-slate-900 dark:text-white flex items-center gap-1 mt-0.5">
                <Clock className="w-4 h-4 text-amber-500" />
                {normalizedTest.settings.timeLimit ? `${normalizedTest.settings.timeLimit} Mins` : 'Untimed'}
              </span>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Selected Items</span>
              <span className="text-base font-black text-slate-900 dark:text-white flex items-center gap-1 mt-0.5">
                <HelpCircle className="w-4 h-4 text-purple-500" />
                {scopedQuestions.length} Questions
              </span>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">100% Mastery</span>
              <span className="text-base font-black text-emerald-600 dark:text-emerald-400 flex items-center gap-1 mt-0.5">
                <Sparkles className="w-4 h-4 text-emerald-500" />
                Active
              </span>
            </div>
          </div>

          <div className="pt-2">
            <button
              onClick={handleStartTest}
              className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-700 hover:to-indigo-700 text-white font-black text-sm sm:text-base shadow-lg shadow-brand-500/25 hover:shadow-brand-500/40 transition-all flex items-center justify-center gap-2 group cursor-pointer font-urdu"
            >
              <span>ٹیسٹ شروع کریں ({scopedQuestions.length} سوالات)</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

        </div>
      </div>
    );
  }

  /* ──────────────────────────────────────────────────────────────────────────
     2. ACTIVE ASSESSMENT OR COMPLETED REVIEW VIEW
     ────────────────────────────────────────────────────────────────────────── */
  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12 animate-fadeIn">
      
      {/* Test Sticky Banner */}
      <div className="sticky top-20 z-20 p-4 rounded-2xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border border-slate-200 dark:border-slate-800 shadow-md flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="font-black text-base text-slate-900 dark:text-white truncate font-urdu">
              {normalizedTest.title}
            </h3>
            {selectedSurah !== 'ALL' && (
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 font-urdu border border-emerald-300 dark:border-emerald-800">
                📖 {selectedSurah}
              </span>
            )}
            {selectedUnit !== 'ALL' && (
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-blue-100 dark:bg-blue-950/60 text-blue-800 dark:text-blue-300 font-urdu border border-blue-300 dark:border-blue-800">
                🏷️ {ISLAMIAT_UNIT_LABELS[selectedUnit] || selectedUnit} {selectedTopic !== 'ALL' ? `• ${selectedTopic}` : ''}
              </span>
            )}
          </div>
          <p className="text-xs text-slate-400 mt-0.5 font-urdu">
            {answeredCount} از {activeQuestions.length} حل شدہ ({progressPct}%) • مطلوبہ ہدف: {normalizedTest.settings.passingScore}%
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          {/* Active Countdown */}
          {!submitted && normalizedTest.settings.timeLimit > 0 && (
            <div className={`px-3 py-1.5 rounded-xl font-mono text-xs font-bold flex items-center gap-1.5 ${
              timeLeft < 120
                ? 'bg-rose-100 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300 animate-pulse'
                : timeLeft < 300
                ? 'bg-amber-100 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300'
                : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
            }`}>
              <Clock className="w-3.5 h-3.5" />
              <span>{formatTime(timeLeft)}</span>
            </div>
          )}

          {/* Change Scope Button */}
          {(availableSurahs.length > 0 || availableUnits.length > 0) && (
            <button
              type="button"
              onClick={() => {
                if (!submitted && answeredCount > 0) {
                  const c = window.confirm("کیا آپ سورت یا یونٹ تبدیل کرنا چاہتے ہیں؟ موجودہ جوابات صاف ہو جائیں گے۔");
                  if (!c) return;
                }
                setHasStarted(false);
                setSubmitted(false);
                setAnswers({});
                setIsFixingWrongMode(false);
              }}
              className="px-2.5 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-urdu font-bold text-slate-600 dark:text-slate-300 transition"
              title="سورت یا یونٹ کا انتخاب تبدیل کریں"
            >
              🔄 انتخاب تبدیل کریں
            </button>
          )}

          {submitted && (
            <div className="flex items-center gap-2">
              <span className={`px-3 py-1 rounded-xl text-xs font-black ${
                score === 100
                  ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 ring-2 ring-emerald-500/30'
                  : passed 
                  ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300'
                  : 'bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300'
              }`}>
                اسکور: {score}% {score === 100 ? '👑 100% مکمل' : passed ? '🎉 پاس' : '⚠️ ضرورت ' + normalizedTest.settings.passingScore + '%'}
              </span>

              <button
                onClick={handleRetake}
                className="px-3 py-1.5 rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-bold hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-1 font-urdu"
              >
                <RotateCcw className="w-3.5 h-3.5" /> دوبارہ ٹیسٹ
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Post-Submission Result Card */}
      {submitted && (
        <div className={`p-6 sm:p-7 rounded-3xl border shadow-lg space-y-5 animate-fadeIn ${
          score === 100
            ? 'bg-gradient-to-r from-emerald-50 via-teal-50 to-green-50 dark:from-emerald-950/40 dark:via-teal-950/30 dark:to-green-950/20 border-emerald-400 dark:border-emerald-700'
            : passed
            ? 'bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-950/40 dark:to-teal-950/20 border-emerald-300 dark:border-emerald-800'
            : 'bg-gradient-to-r from-rose-50 to-amber-50 dark:from-rose-950/40 dark:to-amber-950/20 border-rose-300 dark:border-rose-800'
        }`}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center font-bold text-white shadow-md shrink-0 ${
                score === 100 ? 'bg-gradient-to-tr from-emerald-500 to-teal-500' : passed ? 'bg-emerald-600' : 'bg-rose-600'
              }`}>
                {score === 100 ? <Sparkles className="w-8 h-8 animate-pulse" /> : passed ? <CheckCircle2 className="w-8 h-8" /> : <XCircle className="w-8 h-8" />}
              </div>
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Assessment Outcome
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white font-urdu">
                  {score === 100 ? '🎉 ماشاءاللہ! 100% مکمل کامیابی!' : passed ? 'مبارک ہو! آپ پاس ہیں' : 'دوبارہ کوشش کی ضرورت ہے'}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5 font-urdu">
                  {score === 100
                    ? `ماشاءاللہ! آپ نے اس سیکشن کے تمام ${activeQuestions.length} سوالات کے درست جوابات کے ساتھ 100% معیار مکمل کر لیا ہے۔`
                    : passed 
                    ? `آپ نے کامیابی سے پاسنگ معیار حاصل کر لیا ہے، لیکن 100% مکمل کرنے کے لیے نیچے غلط سوالات درست کریں۔`
                    : `آپ کا اسکور ${score}% ہے۔ 100% حاصل کرنے تک نیچے دیے گئے بٹن سے غلط سوالات کو دوبارہ حل کریں۔`
                  }
                </p>
              </div>
            </div>

            <div className="flex sm:flex-col items-center sm:items-end justify-between border-t sm:border-t-0 pt-3 sm:pt-0 border-slate-200/60 dark:border-slate-800">
              <span className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
                {score}%
              </span>
              <span className="text-xs text-slate-500 font-medium">
                {earnedPoints} / {totalPoints} Points ({correctCount}/{activeQuestions.length} درست)
              </span>
            </div>
          </div>

          {/* 100% Mastery Challenge Call-to-Action Banner */}
          {score < 100 && (
            <div className="p-4 rounded-2xl bg-white/80 dark:bg-slate-900/80 border border-amber-300 dark:border-amber-800/60 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-xs">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-xs">
                  <RotateCcw className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-black text-slate-900 dark:text-white font-urdu">
                    🎯 100% ہدف چیلنج (Mastery Challenge)
                  </h4>
                  <p className="text-[11px] text-slate-600 dark:text-slate-300 font-urdu">
                    آپ کے <span className="font-bold text-rose-600 dark:text-rose-400">{wrongCount} سوالات</span> غلط ہیں۔ 100% اسکور کے لیے غلط سوالات درست کریں!
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  setIsFixingWrongMode(true);
                  setReviewFilter('wrong');
                }}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-black text-xs shadow-md transition flex items-center justify-center gap-2 shrink-0 font-urdu cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                <span>غلط سوالات درست کریں ({wrongCount} غلط)</span>
              </button>
            </div>
          )}

          {/* Buttons to Choose Another Surah or Unit */}
          <div className="flex flex-wrap items-center justify-end gap-2 pt-1">
            {(availableSurahs.length > 0 || availableUnits.length > 0) && (
              <button
                type="button"
                onClick={() => {
                  setHasStarted(false);
                  setSubmitted(false);
                  setAnswers({});
                  setIsFixingWrongMode(false);
                }}
                className="px-4 py-2 rounded-xl bg-slate-800 dark:bg-slate-700 hover:bg-slate-700 text-white text-xs font-bold font-urdu transition flex items-center gap-1.5"
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>اگلی سورت یا یونٹ کا انتخاب کریں</span>
              </button>
            )}

            {passed && onNextLesson && (
              <button
                onClick={onNextLesson}
                className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition flex items-center gap-1.5"
              >
                <span>Continue to Next Lesson</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      )}

      {/* Review Filter Tabs (Active when submitted) */}
      {submitted && (
        <div className="p-3 sm:p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-wrap items-center justify-between gap-2.5">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-700 dark:text-slate-300">
            <Filter className="w-4 h-4 text-brand-500" />
            <span className="font-urdu">سوالات فلٹر کریں:</span>
          </div>

          <div className="flex flex-wrap items-center gap-1.5 text-xs">
            <button
              type="button"
              onClick={() => setReviewFilter('all')}
              className={`px-3 py-1.5 rounded-xl font-bold transition flex items-center gap-1.5 cursor-pointer ${
                reviewFilter === 'all'
                  ? 'bg-brand-600 text-white shadow-xs'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
              }`}
            >
              <span>تمام سوالات (All)</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded-md bg-black/10 dark:bg-white/10">{activeQuestions.length}</span>
            </button>

            <button
              type="button"
              onClick={() => setReviewFilter('wrong')}
              className={`px-3 py-1.5 rounded-xl font-bold transition flex items-center gap-1.5 cursor-pointer ${
                reviewFilter === 'wrong'
                  ? 'bg-rose-600 text-white shadow-xs'
                  : 'bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 hover:bg-rose-100'
              }`}
            >
              <span>صرف غلط سوالات (Wrong)</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded-md bg-rose-200 dark:bg-rose-900/80 text-rose-900 dark:text-rose-200 font-bold">{wrongCount}</span>
            </button>

            <button
              type="button"
              onClick={() => setReviewFilter('correct')}
              className={`px-3 py-1.5 rounded-xl font-bold transition flex items-center gap-1.5 cursor-pointer ${
                reviewFilter === 'correct'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-100'
              }`}
            >
              <span>درست سوالات (Correct)</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded-md bg-emerald-200 dark:bg-emerald-900/80 text-emerald-900 dark:text-emerald-200 font-bold">{correctCount}</span>
            </button>
          </div>
        </div>
      )}

      {/* Question Navigation Palette */}
      <div className="p-3.5 sm:p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-xs font-bold text-slate-700 dark:text-slate-300">
          <span>Question Palette:</span>
          <div className="flex items-center gap-2 text-[11px] font-normal text-slate-400">
            {submitted ? (
              <>
                <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" /> درست ({correctCount})</span>
                <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block" /> غلط ({wrongCount})</span>
              </>
            ) : (
              <>
                <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" /> حل شدہ</span>
                <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" /> نشان زد</span>
                <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-slate-300 dark:bg-slate-700 inline-block" /> باقی</span>
              </>
            )}
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-1.5 max-h-36 overflow-y-auto pr-1">
          {questionsWithStatus.map((q, qIndex) => {
            const isAnswered = answers[q.id] !== undefined && answers[q.id] !== null && (
              q.type === 'fill_blank' ? answers[q.id].toString().trim().length > 0 :
              q.type === 'matching' ? Object.keys(answers[q.id] || {}).length > 0 : true
            );
            const isMarked = Boolean(markedForReview[q.id]);

            let btnStyle = 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200';
            if (submitted) {
              if (q.isCorrect) {
                btnStyle = 'bg-emerald-600 text-white shadow-xs';
              } else {
                btnStyle = 'bg-rose-500 text-white shadow-xs ring-1 ring-rose-300';
              }
            } else {
              if (isMarked) {
                btnStyle = 'bg-amber-500 text-white shadow-xs ring-2 ring-amber-300';
              } else if (isAnswered) {
                btnStyle = 'bg-emerald-600 text-white shadow-xs';
              }
            }

            return (
              <button
                key={q.id}
                type="button"
                onClick={() => {
                  const el = document.getElementById(`question-card-${q.id}`);
                  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }}
                className={`w-7 h-7 rounded-xl font-bold text-xs transition flex items-center justify-center cursor-pointer ${btnStyle}`}
                title={`Question ${qIndex + 1} (${submitted ? (q.isCorrect ? 'Correct' : 'Incorrect') : isMarked ? 'Marked for Review' : isAnswered ? 'Answered' : 'Unanswered'})`}
              >
                {qIndex + 1}
              </button>
            );
          })}
        </div>
      </div>

      {/* List of Questions */}
      <div className="space-y-6">
        {displayQuestions.length === 0 && (
          <div className="p-8 text-center bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800">
            <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto mb-2" />
            <h4 className="font-bold text-base text-slate-800 dark:text-white font-urdu">
              {reviewFilter === 'wrong' ? 'ماشاءاللہ! کوئی غلط سوال باقی نہیں ہے۔' : 'کوئی سوال موجود نہیں ہے۔'}
            </h4>
            <p className="text-xs text-slate-400 mt-1 font-urdu">
              تمام سوالات دیکھنے کے لیے فلٹر میں &apos;تمام سوالات&apos; منتخب کریں۔
            </p>
          </div>
        )}

        {displayQuestions.map((q) => {
          const idx = q.index;
          const userAns = answers[q.id];
          const isCorrect = q.isCorrect;
          const isPartial = q.status === 'partial';

          return (
            <div
              key={q.id}
              id={`question-card-${q.id}`}
              className={`p-5 sm:p-6 rounded-3xl bg-white dark:bg-slate-900 border shadow-sm transition-all space-y-4 ${
                submitted
                  ? isCorrect
                    ? 'border-emerald-500/40 bg-emerald-50/10'
                    : isPartial
                    ? 'border-amber-500/40 bg-amber-50/10'
                    : 'border-rose-500/40 bg-rose-50/10'
                  : 'border-slate-200 dark:border-slate-800'
              }`}
            >
              {/* Question Header */}
              <div className="flex flex-wrap items-center justify-between gap-2.5">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="w-7 h-7 rounded-xl bg-brand-50 dark:bg-brand-950/60 text-brand-600 dark:text-brand-400 text-xs font-black flex items-center justify-center">
                    {idx + 1}
                  </span>

                  {/* Surah / Topic / Unit Badges */}
                  {q.surah && (
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800 font-urdu">
                      📖 {q.surah}
                    </span>
                  )}
                  {q.unit && (
                    <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                      {q.unit}
                    </span>
                  )}
                  {q.topic && (
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-blue-100 dark:bg-blue-950/60 text-blue-800 dark:text-blue-300 border border-blue-300 dark:border-blue-800 font-urdu">
                      🏷️ {q.topic}
                    </span>
                  )}
                  {q.pageNumber && (
                    <span className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800 font-urdu">
                      صفحہ {q.pageNumber}
                    </span>
                  )}

                  {!q.surah && !q.topic && (
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      q.type === 'mcq'
                        ? 'bg-blue-100 text-blue-800 dark:bg-blue-950/60 dark:text-blue-300'
                        : q.type === 'true_false'
                        ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300'
                        : q.type === 'fill_blank'
                        ? 'bg-teal-100 text-teal-800 dark:bg-teal-950/60 dark:text-teal-300'
                        : q.type === 'matching'
                        ? 'bg-purple-100 text-purple-800 dark:bg-purple-950/60 dark:text-purple-300'
                        : 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300'
                    }`}>
                      {q.type === 'fill_blank' ? 'Fill in the Blank' : q.type.replace('_', ' ')}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  {!submitted && (
                    <button
                      type="button"
                      onClick={() => setMarkedForReview(prev => ({ ...prev, [q.id]: !prev[q.id] }))}
                      className={`p-1.5 rounded-xl border text-xs font-semibold flex items-center gap-1 transition cursor-pointer ${
                        markedForReview[q.id]
                          ? 'bg-amber-50 dark:bg-amber-950/40 border-amber-500/40 text-amber-600 dark:text-amber-400'
                          : 'border-slate-200 dark:border-slate-800 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'
                      }`}
                      title="Mark question to review later"
                    >
                      <Bookmark className={`w-3.5 h-3.5 ${markedForReview[q.id] ? 'fill-amber-500 text-amber-500' : ''}`} />
                      <span className="hidden sm:inline">{markedForReview[q.id] ? 'Marked' : 'Review'}</span>
                    </button>
                  )}

                  <span className="text-xs font-bold text-slate-400">{q.points || 1} pt</span>

                  {submitted && (
                    <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold flex items-center gap-1 font-urdu ${
                      isCorrect
                        ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300'
                        : isPartial
                        ? 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300'
                        : 'bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300'
                    }`}>
                      {isCorrect ? <Check className="w-3 h-3" /> : isPartial ? 'جزوی' : <X className="w-3 h-3" />}
                      {isCorrect ? 'درست جواب' : isPartial ? 'جزوی درست' : 'غلط جواب'}
                    </span>
                  )}
                </div>
              </div>

              {/* Question Statement */}
              {(() => {
                const isQUrdu = isUrduOrRTL(q.question) || (q.options && q.options.some(isUrduOrRTL));
                return (
                  <>
                    <h4 
                      dir={isQUrdu ? 'rtl' : 'ltr'}
                      className={`text-sm sm:text-base font-bold text-slate-900 dark:text-white leading-relaxed ${
                        isQUrdu ? 'text-right font-urdu text-base sm:text-xl leading-[2.3]' : ''
                      }`}
                    >
                      {q.question}
                    </h4>

                    {/* 1. MCQ RENDERER */}
                    {q.type === 'mcq' && (
                      <div className="space-y-2 pt-1" dir={isQUrdu ? 'rtl' : 'ltr'}>
                        {(q.options || []).map((opt, optIdx) => {
                          const isSelected = userAns === optIdx;
                          let style = 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-white dark:bg-slate-900 cursor-pointer';

                          if (!submitted) {
                            if (isSelected) {
                              style = 'border-brand-500 bg-brand-50/50 dark:bg-brand-950/30 text-brand-900 dark:text-brand-100 font-semibold shadow-xs';
                            }
                          } else if (isFixingWrongMode) {
                            if (isCorrect) {
                              if (optIdx === q.correctAnswer) {
                                style = 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-100 font-bold opacity-90 cursor-default';
                              } else {
                                style = 'border-slate-200 dark:border-slate-800 bg-slate-50/40 dark:bg-slate-800/20 text-slate-400 opacity-60 cursor-default';
                              }
                            } else {
                              if (isSelected) {
                                style = 'border-amber-500 bg-amber-50/70 dark:bg-amber-950/40 text-amber-900 dark:text-amber-100 font-bold ring-2 ring-amber-400/50 cursor-pointer';
                              } else {
                                style = 'border-slate-300 dark:border-slate-700 hover:border-amber-400 dark:hover:border-amber-500 bg-white dark:bg-slate-900 cursor-pointer';
                              }
                            }
                          } else {
                            if (optIdx === q.correctAnswer) {
                              style = 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-100 font-bold cursor-default';
                            } else if (isSelected) {
                              style = 'border-rose-500 bg-rose-50 dark:bg-rose-950/40 text-rose-900 dark:text-rose-100 line-through cursor-default';
                            } else {
                              style = 'border-slate-200 dark:border-slate-800 opacity-60 cursor-default';
                            }
                          }

                          return (
                            <div
                              key={optIdx}
                              dir={isQUrdu ? 'rtl' : 'ltr'}
                              onClick={() => handleSelectMCQ(q.id, optIdx)}
                              className={`p-3.5 rounded-2xl border ${isQUrdu ? 'text-right' : 'text-left'} text-xs sm:text-sm transition flex items-center justify-between gap-3 ${style}`}
                            >
                              <div className="flex items-center gap-3">
                                <span className="w-6 h-6 rounded-lg bg-slate-100 dark:bg-slate-800 text-xs font-bold text-slate-500 flex items-center justify-center shrink-0">
                                  {String.fromCharCode(65 + optIdx)}
                                </span>
                                <span className={isQUrdu ? 'font-urdu text-sm sm:text-base leading-relaxed' : ''}>{opt}</span>
                              </div>

                              {/* Badges/Indicators */}
                              {submitted && !isFixingWrongMode && optIdx === q.correctAnswer && (
                                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                              )}
                              {submitted && isFixingWrongMode && isCorrect && optIdx === q.correctAnswer && (
                                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                              )}
                              {submitted && isFixingWrongMode && !isCorrect && isSelected && (
                                <span className="text-[10px] font-bold text-amber-700 dark:text-amber-300 bg-amber-100 dark:bg-amber-950/60 px-2 py-0.5 rounded-md shrink-0 font-urdu">
                                  منتخب شدہ (Selected)
                                </span>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </>
                );
              })()}

              {/* 2. TRUE / FALSE RENDERER */}
              {q.type === 'true_false' && (
                <div className="grid grid-cols-2 gap-3 pt-1">
                  {[true, false].map((val) => {
                    const isSelected = userAns === val;
                    let style = 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-white dark:bg-slate-900';
                    if (isSelected) {
                      style = 'border-brand-500 bg-brand-50/60 dark:bg-brand-950/40 text-brand-900 dark:text-brand-100 font-bold';
                    }
                    if (submitted) {
                      if (val === q.correctAnswer) {
                        style = 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-100 font-bold';
                      } else if (isSelected) {
                        style = 'border-rose-500 bg-rose-50 dark:bg-rose-950/40 text-rose-900 dark:text-rose-100 line-through';
                      }
                    }

                    return (
                      <button
                        key={String(val)}
                        type="button"
                        onClick={() => handleSelectTrueFalse(q.id, val)}
                        className={`py-4 px-4 rounded-2xl border text-sm font-black transition flex items-center justify-center gap-2 cursor-pointer ${style}`}
                      >
                        {val ? <Check className="w-4 h-4 text-emerald-600" /> : <X className="w-4 h-4 text-rose-600" />}
                        <span>{val ? 'TRUE' : 'FALSE'}</span>
                        {submitted && val === q.correctAnswer && (
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 ml-1" />
                        )}
                      </button>
                    );
                  })}
                </div>
              )}

              {/* 3. FILL IN THE BLANK RENDERER */}
              {q.type === 'fill_blank' && (
                <div className="space-y-3 pt-1">
                  <div className="relative">
                    <input
                      type="text"
                      disabled={submitted && !isFixingWrongMode}
                      value={userAns || ''}
                      onChange={(e) => handleFillBlank(q.id, e.target.value)}
                      placeholder="Type your answer here..."
                      className={`w-full px-4 py-3 rounded-2xl border text-sm font-medium transition focus:outline-none ${
                        submitted
                          ? isCorrect
                            ? 'border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/30 text-emerald-900 dark:text-emerald-100'
                            : 'border-rose-500 bg-rose-50/50 dark:bg-rose-950/30 text-rose-900 dark:text-rose-100'
                          : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20'
                      }`}
                    />
                  </div>

                  {submitted && (
                    <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs space-y-1.5">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-bold text-slate-500 dark:text-slate-400">Accepted Answer(s):</span>
                        <div className="flex flex-wrap gap-1.5">
                          {(q.acceptedAnswers && q.acceptedAnswers.length > 0 ? q.acceptedAnswers : [q.correctAnswer]).map((acc, aIdx) => (
                            <span key={aIdx} className="px-2 py-0.5 rounded-md bg-emerald-100 dark:bg-emerald-900/40 text-emerald-800 dark:text-emerald-300 font-mono font-bold text-xs">
                              {acc}
                            </span>
                          ))}
                        </div>
                      </div>
                      {q.caseSensitive && (
                        <p className="text-[10px] text-amber-600 dark:text-amber-400 font-medium">
                          Note: Case-sensitive matching was enforced for this question.
                        </p>
                      )}
                    </div>
                  )}
                </div>
              )}

              {/* 4. MATCHING COLUMN RENDERER */}
              {q.type === 'matching' && (
                <div className="space-y-3 pt-1 text-xs">
                  <p className="text-[11px] text-slate-400">
                    Match each item in Column A with its corresponding match from Column B:
                  </p>

                  <div className="space-y-2">
                    {(q.pairs || []).map((pair) => {
                      const selectedVal = userAns?.[pair.id] || '';
                      const isPairCorrect = submitted && selectedVal === pair.right;

                      return (
                        <div
                          key={pair.id}
                          className="p-3 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                        >
                          <div className="flex items-center gap-2 min-w-0 flex-1">
                            <span className="w-2 h-2 rounded-full bg-brand-500 shrink-0" />
                            <span className="font-bold text-slate-800 dark:text-slate-200 text-xs sm:text-sm">
                              {pair.left}
                            </span>
                          </div>

                          <div className="flex items-center gap-2 shrink-0">
                            <span className="text-slate-400">➔</span>
                            <select
                              disabled={submitted && !isFixingWrongMode}
                              value={selectedVal}
                              onChange={(e) => handleMatchPair(q.id, pair.id, e.target.value)}
                              className={`px-3 py-2 rounded-xl border text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-brand-500 cursor-pointer ${
                                submitted
                                  ? isPairCorrect
                                    ? 'border-emerald-500 bg-emerald-50 text-emerald-900'
                                    : 'border-rose-500 bg-rose-50 text-rose-900'
                                  : 'border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900'
                              }`}
                            >
                              <option value="">-- Select Matching Option --</option>
                              {(q.pairs || []).map((p) => (
                                <option key={p.id} value={p.right}>
                                  {p.right}
                                </option>
                              ))}
                            </select>

                            {submitted && (
                              isPairCorrect ? (
                                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                              ) : (
                                <span className="text-[10px] text-emerald-600 font-bold ml-1">
                                  Key: {pair.right}
                                </span>
                              )
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* 5. SEQUENTIAL ORDERING RENDERER */}
              {q.type === 'ordering' && (
                <div className="space-y-3 pt-1 text-xs">
                  <p className="text-[11px] text-slate-400">
                    Use the up &amp; down arrows to arrange all items in their correct sequential order:
                  </p>

                  <div className="space-y-2">
                    {(() => {
                      const currentOrder = userAns || q.items || [];
                      return currentOrder.map((stepItem, stepIdx) => {
                        const isPositionCorrect = submitted && stepItem === q.items[stepIdx];

                        return (
                          <div
                            key={stepIdx}
                            className={`p-3 rounded-2xl border flex items-center justify-between gap-3 transition ${
                              submitted
                                ? isPositionCorrect
                                  ? 'border-emerald-500 bg-emerald-50/70 text-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-100'
                                  : 'border-rose-500 bg-rose-50/70 text-rose-900 dark:bg-rose-950/40 dark:text-rose-100'
                                : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900'
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <span className="w-7 h-7 rounded-xl bg-slate-100 dark:bg-slate-800 font-black text-xs text-slate-600 dark:text-slate-300 flex items-center justify-center shrink-0">
                                #{stepIdx + 1}
                              </span>
                              <span className="text-xs sm:text-sm font-medium">{stepItem}</span>
                            </div>

                            {!submitted ? (
                              <div className="flex items-center gap-1">
                                <button
                                  type="button"
                                  disabled={stepIdx === 0}
                                  onClick={() => handleMoveOrderItem(q.id, currentOrder, stepIdx, 'up')}
                                  className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-30 cursor-pointer"
                                  title="Move Earlier in Sequence"
                                >
                                  <ArrowUp className="w-3.5 h-3.5" />
                                </button>
                                <button
                                  type="button"
                                  disabled={stepIdx === currentOrder.length - 1}
                                  onClick={() => handleMoveOrderItem(q.id, currentOrder, stepIdx, 'down')}
                                  className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-30 cursor-pointer"
                                  title="Move Later in Sequence"
                                >
                                  <ArrowDown className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            ) : (
                              isPositionCorrect ? (
                                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                              ) : (
                                <span className="text-[10px] text-emerald-600 font-bold shrink-0">
                                  Target: #{stepIdx + 1}
                                </span>
                              )
                            )}
                          </div>
                        );
                      });
                    })()}
                  </div>
                </div>
              )}

              {/* Explanation & Rationale */}
              {submitted && q.explanation && (!isFixingWrongMode || isCorrect) && (
                <div className="p-3.5 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/40 text-xs text-amber-900 dark:text-amber-200">
                  <div className="font-bold flex items-center gap-1.5 mb-0.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                    <span>Educational Explanation &amp; Key Learning Point:</span>
                  </div>
                  <p className="mt-0.5 text-amber-800/90 dark:text-amber-300/90 leading-relaxed font-urdu">
                    {q.explanation}
                  </p>
                </div>
              )}

              {submitted && isFixingWrongMode && !isCorrect && (
                <div className="p-3 rounded-2xl bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/40 text-xs text-rose-800 dark:text-rose-300 flex items-center gap-2 font-urdu">
                  <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                  <span>یہ سوال پچھلی بار غلط تھا۔ درست آپشن منتخب کریں اور نیچے سے تصحیح جمع کروائیں۔</span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Sticky Floating Action Bar during Wrong-Fixing Mastery Mode */}
      {submitted && isFixingWrongMode && wrongCount > 0 && (
        <div className="sticky bottom-4 z-30 p-4 rounded-2xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-2 border-amber-500 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-3 animate-slideUp">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-500 text-white flex items-center justify-center font-black text-sm shrink-0">
              {wrongCount}
            </div>
            <div>
              <span className="text-xs font-black text-slate-900 dark:text-white font-urdu block">
                غلط سوالات کی تصحیح جاری ہے (100% ہدف)
              </span>
              <span className="text-[11px] text-slate-500 dark:text-slate-400 font-urdu">
                باقی غلط سوالات: {wrongCount} • اپنے نئے جوابات منتخب کریں اور چیک کریں۔
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              type="button"
              onClick={() => {
                setIsFixingWrongMode(false);
                setReviewFilter('all');
              }}
              className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-bold hover:bg-slate-100 dark:hover:bg-slate-800 font-urdu cursor-pointer"
            >
              جائزہ موڈ
            </button>
            <button
              type="button"
              onClick={evaluateAndSubmit}
              className="flex-1 sm:flex-none px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-600 to-emerald-600 hover:from-amber-700 hover:to-emerald-700 text-white font-black text-xs shadow-lg shadow-amber-500/25 transition flex items-center justify-center gap-2 font-urdu cursor-pointer"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>تصحیح جمع کروائیں اور اسکور چیک کریں</span>
            </button>
          </div>
        </div>
      )}

      {/* Action Submit Bar */}
      {!submitted ? (
        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-lg flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-slate-500 font-urdu">
            {answeredCount} از {activeQuestions.length} سوالات مکمل ہوئے۔ جمع کروانے سے پہلے جائزہ لیں۔
          </div>
          <button
            onClick={handleSubmitClick}
            disabled={answeredCount === 0}
            className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-brand-600 hover:bg-brand-700 disabled:opacity-50 text-white font-black text-sm shadow-md transition flex items-center justify-center gap-2 font-urdu cursor-pointer"
          >
            <Check className="w-4 h-4" />
            <span>ٹیسٹ کے جوابات جمع کروائیں</span>
          </button>
        </div>
      ) : (
        <div className="p-5 rounded-3xl bg-slate-100 dark:bg-slate-800 text-center space-y-2">
          <p className="text-xs text-slate-500 dark:text-slate-400 font-urdu">
            آپ کے ٹیسٹ کے نتائج آپ کے ڈیش بورڈ ریکارڈ میں محفوظ کر دیے گئے ہیں۔
          </p>
        </div>
      )}

    </div>
  );
};
