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
  Filter
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

export const StandardTestPlayer = ({
  testData,
  courseId,
  courseTitle = 'Course',
  lessonTitle = 'Assessment',
  onComplete,
  isCompleted = false,
  onNextLesson
}) => {
  const { currentUser } = useAuth();

  // Normalize test data (supports modular testData, legacy quiz, or fallback)
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

    // If passingScore is specified at root
    if (testData.passingScore) settings.passingScore = Number(testData.passingScore);
    if (testData.timeLimit) settings.timeLimit = Number(testData.timeLimit);
    if (testData.attemptsAllowed) settings.attemptsAllowed = Number(testData.attemptsAllowed);
    if (testData.retryUntil100 !== undefined) settings.retryUntil100 = Boolean(testData.retryUntil100);

    let rawQuestions = testData.questions || [];

    // Fallback if legacy course.quiz was passed
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

  const [hasStarted, setHasStarted] = useState(false);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [earnedPoints, setEarnedPoints] = useState(0);
  const [totalPoints, setTotalPoints] = useState(0);
  const [passed, setPassed] = useState(false);
  const [attemptsCount, setAttemptsCount] = useState(0);
  const [markedForReview, setMarkedForReview] = useState({});
  const [timeLeft, setTimeLeft] = useState(0); // in seconds
  const [timeSpent, setTimeSpent] = useState(0);
  const timerRef = useRef(null);

  // 100% Mastery Challenge & Wrong-Answer Revision state
  const [isFixingWrongMode, setIsFixingWrongMode] = useState(false);
  const [reviewFilter, setReviewFilter] = useState('all'); // 'all' | 'wrong' | 'correct'

  // Initialize initial randomized ordering / options when starting
  const [shuffledQuestions, setShuffledQuestions] = useState([]);

  // Reset state on testData change
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
    if (timerRef.current) clearInterval(timerRef.current);
  }, [normalizedTest?.title]);

  // Start assessment handler
  const handleStartTest = () => {
    if (!normalizedTest) return;

    let qs = [...normalizedTest.questions];
    if (normalizedTest.settings.shuffleQuestions) {
      qs.sort(() => Math.random() - 0.5);
    }

    // Initialize ordering questions with scrambled sequence
    const initialAnswers = {};
    qs.forEach(q => {
      if (q.type === 'ordering') {
        const scrambled = [...q.items].sort(() => Math.random() - 0.5);
        initialAnswers[q.id] = scrambled;
      } else if (q.type === 'matching') {
        initialAnswers[q.id] = {};
      }
    });

    setShuffledQuestions(qs);
    setAnswers(initialAnswers);
    setHasStarted(true);
    setSubmitted(false);
    setAttemptsCount(prev => prev + 1);

    // Timer setup
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

  // Auto-submit when timer expires
  const handleAutoSubmit = () => {
    alert('Time limit expired! Your test is being automatically evaluated.');
    evaluateAndSubmit();
  };

  // Clear timer on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  // Helper to determine question correctness
  const getQuestionResult = (q, currentAnswers) => {
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

  // Answer interaction handlers
  const handleSelectMCQ = (qId, optionIdx) => {
    if (submitted && !isFixingWrongMode) return;
    if (submitted && isFixingWrongMode) {
      const allQs = shuffledQuestions.length > 0 ? shuffledQuestions : (normalizedTest?.questions || []);
      const q = allQs.find(item => item.id === qId);
      if (q && getQuestionResult(q, answers).isCorrect) return; // Locked correct
    }
    setAnswers(prev => ({ ...prev, [qId]: optionIdx }));
  };

  const handleSelectTrueFalse = (qId, val) => {
    if (submitted && !isFixingWrongMode) return;
    if (submitted && isFixingWrongMode) {
      const allQs = shuffledQuestions.length > 0 ? shuffledQuestions : (normalizedTest?.questions || []);
      const q = allQs.find(item => item.id === qId);
      if (q && getQuestionResult(q, answers).isCorrect) return; // Locked correct
    }
    setAnswers(prev => ({ ...prev, [qId]: val }));
  };

  const handleFillBlank = (qId, val) => {
    if (submitted && !isFixingWrongMode) return;
    if (submitted && isFixingWrongMode) {
      const allQs = shuffledQuestions.length > 0 ? shuffledQuestions : (normalizedTest?.questions || []);
      const q = allQs.find(item => item.id === qId);
      if (q && getQuestionResult(q, answers).isCorrect) return;
    }
    setAnswers(prev => ({ ...prev, [qId]: val }));
  };

  const handleMatchPair = (qId, pairId, selectedRight) => {
    if (submitted && !isFixingWrongMode) return;
    if (submitted && isFixingWrongMode) {
      const allQs = shuffledQuestions.length > 0 ? shuffledQuestions : (normalizedTest?.questions || []);
      const q = allQs.find(item => item.id === qId);
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
      const allQs = shuffledQuestions.length > 0 ? shuffledQuestions : (normalizedTest?.questions || []);
      const q = allQs.find(item => item.id === qId);
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

    const qs = shuffledQuestions.length > 0 ? shuffledQuestions : normalizedTest.questions;
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
          let correctCount = 0;
          q.pairs.forEach(p => {
            if (userAns[p.id] === p.right) correctCount++;
          });
          const frac = (q.pairs.length > 0) ? (correctCount / q.pairs.length) : 0;
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
        quizTitle: normalizedTest.title,
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
    const qs = shuffledQuestions.length > 0 ? shuffledQuestions : normalizedTest.questions;
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
        `You have ${unansweredCount} unanswered or incomplete question(s). Do you still wish to submit now?`
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

  if (!normalizedTest || normalizedTest.questions.length === 0) {
    return (
      <div className="p-8 text-center bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800">
        <HelpCircle className="w-12 h-12 text-slate-300 mx-auto mb-3" />
        <h3 className="font-bold text-base text-slate-800 dark:text-white">Assessment is being prepared</h3>
        <p className="text-xs text-slate-400 mt-1">This test module has not been populated with questions yet.</p>
      </div>
    );
  }

  const qs = shuffledQuestions.length > 0 ? shuffledQuestions : normalizedTest.questions;

  // Format countdown
  const formatTime = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  // Question counts by type
  const typeCounts = {
    mcq: qs.filter(q => q.type === 'mcq').length,
    true_false: qs.filter(q => q.type === 'true_false').length,
    fill_blank: qs.filter(q => q.type === 'fill_blank').length,
    matching: qs.filter(q => q.type === 'matching').length,
    ordering: qs.filter(q => q.type === 'ordering').length
  };

  /* ──────────────────────────────────────────────────────────────────────────
     1. PRE-TEST SPLASH SCREEN
     ────────────────────────────────────────────────────────────────────────── */
  if (!hasStarted && !submitted) {
    const maxAttempts = normalizedTest.settings.attemptsAllowed || 0;
    const attemptsLeft = maxAttempts > 0 ? maxAttempts - attemptsCount : null;

    return (
      <div className="max-w-2xl mx-auto py-8 px-4 sm:px-6">
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl space-y-6 text-center animate-fadeIn">
          
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-brand-600 to-indigo-600 text-white flex items-center justify-center mx-auto shadow-lg shadow-brand-500/25">
            <Award className="w-8 h-8" />
          </div>

          <div>
            <span className="text-[11px] font-black uppercase tracking-wider text-brand-600 dark:text-brand-400 bg-brand-50 dark:bg-brand-950/60 px-3 py-1 rounded-full border border-brand-200 dark:border-brand-800">
              Interactive Assessment Module
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-3">
              {normalizedTest.title}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-2 max-w-lg mx-auto">
              {normalizedTest.settings.instructions}
            </p>
          </div>

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
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Questions</span>
              <span className="text-base font-black text-slate-900 dark:text-white flex items-center gap-1 mt-0.5">
                <HelpCircle className="w-4 h-4 text-purple-500" />
                {qs.length} Items
              </span>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Attempts</span>
              <span className="text-base font-black text-slate-900 dark:text-white flex items-center gap-1 mt-0.5">
                <RotateCcw className="w-4 h-4 text-brand-500" />
                {maxAttempts > 0 ? `${maxAttempts} Max` : 'Unlimited'}
              </span>
            </div>
          </div>

          {/* Question Breakdown Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-1 text-xs">
            {typeCounts.mcq > 0 && (
              <span className="px-2.5 py-1 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 font-bold border border-blue-200 dark:border-blue-800">
                {typeCounts.mcq} Multiple Choice
              </span>
            )}
            {typeCounts.true_false > 0 && (
              <span className="px-2.5 py-1 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 font-bold border border-emerald-200 dark:border-emerald-800">
                {typeCounts.true_false} True / False
              </span>
            )}
            {typeCounts.fill_blank > 0 && (
              <span className="px-2.5 py-1 rounded-xl bg-teal-50 dark:bg-teal-950/40 text-teal-700 dark:text-teal-300 font-bold border border-teal-200 dark:border-teal-800">
                {typeCounts.fill_blank} Fill in the Blank
              </span>
            )}
            {typeCounts.matching > 0 && (
              <span className="px-2.5 py-1 rounded-xl bg-purple-50 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300 font-bold border border-purple-200 dark:border-purple-800">
                {typeCounts.matching} Matching Column
              </span>
            )}
            {typeCounts.ordering > 0 && (
              <span className="px-2.5 py-1 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 font-bold border border-amber-200 dark:border-amber-800">
                {typeCounts.ordering} Sequential Ordering
              </span>
            )}
          </div>

          {isCompleted && (
            <div className="p-3.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-500/30 text-emerald-800 dark:text-emerald-200 text-xs font-bold flex items-center justify-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>You have previously passed and completed this assessment.</span>
            </div>
          )}

          <div className="pt-2">
            <button
              onClick={handleStartTest}
              className="w-full py-3.5 px-6 rounded-2xl bg-brand-600 hover:bg-brand-700 text-white font-black text-sm sm:text-base shadow-lg shadow-brand-500/25 hover:shadow-brand-500/40 transition-all flex items-center justify-center gap-2 group"
            >
              <span>{isCompleted ? 'Retake Assessment' : 'Commence Assessment'}</span>
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
  const answeredCount = qs.reduce((cnt, q) => {
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

  const progressPct = Math.round((answeredCount / qs.length) * 100);

  // Compute question statuses & filtering
  const questionsWithStatus = useMemo(() => {
    return qs.map((q, idx) => {
      const res = getQuestionResult(q, answers);
      return {
        ...q,
        index: idx,
        isCorrect: res.isCorrect,
        status: res.status
      };
    });
  }, [qs, answers]);

  const correctCount = useMemo(() => {
    return questionsWithStatus.filter(q => q.isCorrect).length;
  }, [questionsWithStatus]);

  const wrongCount = useMemo(() => {
    return qs.length - correctCount;
  }, [qs.length, correctCount]);

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

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12 animate-fadeIn">
      
      {/* Test Sticky Banner */}
      <div className="sticky top-20 z-20 p-4 rounded-2xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border border-slate-200 dark:border-slate-800 shadow-md flex flex-wrap items-center justify-between gap-3">
        <div>
          <h3 className="font-black text-base text-slate-900 dark:text-white truncate">
            {normalizedTest.title}
          </h3>
          <p className="text-xs text-slate-400">
            {answeredCount} of {qs.length} answered ({progressPct}%) • Target: {normalizedTest.settings.passingScore}%
          </p>
        </div>

        <div className="flex items-center gap-3">
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

          {submitted && (
            <div className="flex items-center gap-2">
              <span className={`px-3 py-1 rounded-xl text-xs font-black ${
                score === 100
                  ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 ring-2 ring-emerald-500/30'
                  : passed 
                  ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300'
                  : 'bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300'
              }`}>
                Score: {score}% {score === 100 ? '👑 100% Mastered' : passed ? '🎉 Passed' : '⚠️ Need ' + normalizedTest.settings.passingScore + '%'}
              </span>

              <button
                onClick={handleRetake}
                className="px-3 py-1.5 rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-bold hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-1"
              >
                <RotateCcw className="w-3.5 h-3.5" /> Retake
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
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                  {score === 100 ? '🎉 100% Mastery Achieved!' : passed ? 'Congratulations! You Passed' : 'Needs Review & Retake'}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5 font-urdu">
                  {score === 100
                    ? `ماشاءاللہ! آپ نے تمام ${qs.length} سوالات کے درست جوابات کے ساتھ 100% مکمل کامیابی حاصل کر لی ہے۔`
                    : passed 
                    ? `You met the ${normalizedTest.settings.passingScore}% passing standard and earned credit for this module.`
                    : `آپ کا اسکور ${score}% ہے۔ مطلوبہ معیار 100% ہے۔ نیچے دیے گئے بٹن سے غلط سوالات درست کریں!`
                  }
                </p>
              </div>
            </div>

            <div className="flex sm:flex-col items-center sm:items-end justify-between border-t sm:border-t-0 pt-3 sm:pt-0 border-slate-200/60 dark:border-slate-800">
              <span className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
                {score}%
              </span>
              <span className="text-xs text-slate-500 font-medium">
                {earnedPoints} / {totalPoints} Points ({correctCount}/{qs.length} Correct)
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
                    آپ کے <span className="font-bold text-rose-600 dark:text-rose-400">{wrongCount} سوالات</span> غلط ہیں۔ 100% حاصل کرنے کے لیے غلط سوالات درست کریں!
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  setIsFixingWrongMode(true);
                  setReviewFilter('wrong');
                }}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-black text-xs shadow-md transition flex items-center justify-center gap-2 shrink-0 font-urdu"
              >
                <RotateCcw className="w-4 h-4" />
                <span>غلط سوالات درست کریں ({wrongCount} غلط)</span>
              </button>
            </div>
          )}

          {passed && onNextLesson && (
            <div className="pt-1 flex justify-end">
              <button
                onClick={onNextLesson}
                className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition flex items-center gap-1.5"
              >
                <span>Continue to Next Lesson</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
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
              className={`px-3 py-1.5 rounded-xl font-bold transition flex items-center gap-1.5 ${
                reviewFilter === 'all'
                  ? 'bg-brand-600 text-white shadow-xs'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
              }`}
            >
              <span>تمام سوالات (All)</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded-md bg-black/10 dark:bg-white/10">{qs.length}</span>
            </button>

            <button
              type="button"
              onClick={() => setReviewFilter('wrong')}
              className={`px-3 py-1.5 rounded-xl font-bold transition flex items-center gap-1.5 ${
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
              className={`px-3 py-1.5 rounded-xl font-bold transition flex items-center gap-1.5 ${
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
                <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" /> Correct ({correctCount})</span>
                <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block" /> Wrong ({wrongCount})</span>
              </>
            ) : (
              <>
                <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" /> Answered</span>
                <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" /> Review</span>
                <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-slate-300 dark:bg-slate-700 inline-block" /> Pending</span>
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
                className={`w-7 h-7 rounded-xl font-bold text-xs transition flex items-center justify-center ${btnStyle}`}
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
                      className={`p-1.5 rounded-xl border text-xs font-semibold flex items-center gap-1 transition ${
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
                        className={`py-4 px-4 rounded-2xl border text-sm font-black transition flex items-center justify-center gap-2 ${style}`}
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
                              className={`px-3 py-2 rounded-xl border text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-brand-500 ${
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
                                  className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-30"
                                  title="Move Earlier in Sequence"
                                >
                                  <ArrowUp className="w-3.5 h-3.5" />
                                </button>
                                <button
                                  type="button"
                                  disabled={stepIdx === currentOrder.length - 1}
                                  onClick={() => handleMoveOrderItem(q.id, currentOrder, stepIdx, 'down')}
                                  className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-30"
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
              className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-bold hover:bg-slate-100 dark:hover:bg-slate-800 font-urdu"
            >
              جائزہ موڈ
            </button>
            <button
              type="button"
              onClick={evaluateAndSubmit}
              className="flex-1 sm:flex-none px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-600 to-emerald-600 hover:from-amber-700 hover:to-emerald-700 text-white font-black text-xs shadow-lg shadow-amber-500/25 transition flex items-center justify-center gap-2 font-urdu"
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
          <div className="text-xs text-slate-500">
            {answeredCount} of {qs.length} questions completed. Review your responses before submitting.
          </div>
          <button
            onClick={handleSubmitClick}
            disabled={answeredCount === 0}
            className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-brand-600 hover:bg-brand-700 disabled:opacity-50 text-white font-black text-sm shadow-md transition flex items-center justify-center gap-2"
          >
            <Check className="w-4 h-4" />
            <span>Submit Assessment Answers</span>
          </button>
        </div>
      ) : (
        <div className="p-5 rounded-3xl bg-slate-100 dark:bg-slate-800 text-center space-y-2">
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Your assessment results have been recorded to your learning record.
          </p>
        </div>
      )}

    </div>
  );
};
