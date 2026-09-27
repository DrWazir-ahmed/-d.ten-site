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
  Play
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const StandardTestPlayer = ({
  testData,
  courseId,
  courseTitle = 'Course',
  lessonTitle = 'Assessment',
  onComplete,
  isCompleted = false,
  onNextLesson
}) => {
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
      instructions: 'Answer all questions carefully before submitting. You need to meet the passing score to complete this assessment.',
      ...(testData.settings || {})
    };

    // If passingScore is specified at root
    if (testData.passingScore) settings.passingScore = Number(testData.passingScore);
    if (testData.timeLimit) settings.timeLimit = Number(testData.timeLimit);
    if (testData.attemptsAllowed) settings.attemptsAllowed = Number(testData.attemptsAllowed);

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
        pairs: q.pairs || [],
        items: q.items || [],
        explanation: q.explanation || '',
        points: Number(q.points) || (type === 'matching' || type === 'ordering' ? 2 : 1)
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
  const [timeLeft, setTimeLeft] = useState(0); // in seconds
  const [timeSpent, setTimeSpent] = useState(0);
  const timerRef = useRef(null);

  // Initialize initial randomized ordering / options when starting
  const [shuffledQuestions, setShuffledQuestions] = useState([]);

  // Reset state on testData change
  useEffect(() => {
    setHasStarted(false);
    setAnswers({});
    setSubmitted(false);
    setScore(0);
    setEarnedPoints(0);
    setPassed(false);
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

  // Answer interaction handlers
  const handleSelectMCQ = (qId, optionIdx) => {
    if (submitted) return;
    setAnswers(prev => ({ ...prev, [qId]: optionIdx }));
  };

  const handleSelectTrueFalse = (qId, val) => {
    if (submitted) return;
    setAnswers(prev => ({ ...prev, [qId]: val }));
  };

  const handleMatchPair = (qId, pairId, selectedRight) => {
    if (submitted) return;
    setAnswers(prev => ({
      ...prev,
      [qId]: {
        ...(prev[qId] || {}),
        [pairId]: selectedRight
      }
    }));
  };

  const handleMoveOrderItem = (qId, currentItems, fromIdx, direction) => {
    if (submitted) return;
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
        }
      } else if (q.type === 'true_false') {
        if (userAns === q.correctAnswer) {
          earned += qPts;
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

    if (isPassing) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
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
                passed 
                  ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300'
                  : 'bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300'
              }`}>
                Score: {score}% {passed ? '🎉 Passed' : '⚠️ Need ' + normalizedTest.settings.passingScore + '%'}
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
        <div className={`p-6 sm:p-7 rounded-3xl border shadow-lg space-y-4 animate-fadeIn ${
          passed
            ? 'bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-950/40 dark:to-teal-950/20 border-emerald-300 dark:border-emerald-800'
            : 'bg-gradient-to-r from-rose-50 to-amber-50 dark:from-rose-950/40 dark:to-amber-950/20 border-rose-300 dark:border-rose-800'
        }`}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center font-bold text-white shadow-md ${
                passed ? 'bg-emerald-600' : 'bg-rose-600'
              }`}>
                {passed ? <CheckCircle2 className="w-8 h-8" /> : <XCircle className="w-8 h-8" />}
              </div>
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Assessment Outcome
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                  {passed ? 'Congratulations! You Passed' : 'Needs Review & Retake'}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5">
                  {passed 
                    ? `You met the ${normalizedTest.settings.passingScore}% passing standard and earned credit for this module.`
                    : `Your score of ${score}% fell short of the required ${normalizedTest.settings.passingScore}%. Review the feedback below and retake.`
                  }
                </p>
              </div>
            </div>

            <div className="flex sm:flex-col items-center sm:items-end justify-between border-t sm:border-t-0 pt-3 sm:pt-0 border-slate-200/60 dark:border-slate-800">
              <span className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
                {score}%
              </span>
              <span className="text-xs text-slate-500 font-medium">
                {earnedPoints} / {totalPoints} Points
              </span>
            </div>
          </div>

          {passed && onNextLesson && (
            <div className="pt-2 flex justify-end">
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

      {/* List of Questions */}
      <div className="space-y-6">
        {qs.map((q, idx) => {
          const userAns = answers[q.id];

          // Determine correctness if submitted
          let isCorrect = false;
          let isPartial = false;

          if (submitted) {
            if (q.type === 'mcq') {
              isCorrect = userAns === q.correctAnswer;
            } else if (q.type === 'true_false') {
              isCorrect = userAns === q.correctAnswer;
            } else if (q.type === 'matching') {
              let matchCount = 0;
              (q.pairs || []).forEach(p => {
                if (userAns?.[p.id] === p.right) matchCount++;
              });
              if (matchCount === q.pairs?.length) isCorrect = true;
              else if (matchCount > 0) isPartial = true;
            } else if (q.type === 'ordering') {
              let orderCount = 0;
              (q.items || []).forEach((expected, i) => {
                if (userAns?.[i] === expected) orderCount++;
              });
              if (orderCount === q.items?.length) isCorrect = true;
              else if (orderCount > 0) isPartial = true;
            }
          }

          return (
            <div
              key={q.id}
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
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="w-7 h-7 rounded-xl bg-brand-50 dark:bg-brand-950/60 text-brand-600 dark:text-brand-400 text-xs font-black flex items-center justify-center">
                    {idx + 1}
                  </span>
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                    q.type === 'mcq'
                      ? 'bg-blue-100 text-blue-800 dark:bg-blue-950/60 dark:text-blue-300'
                      : q.type === 'true_false'
                      ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300'
                      : q.type === 'matching'
                      ? 'bg-purple-100 text-purple-800 dark:bg-purple-950/60 dark:text-purple-300'
                      : 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300'
                  }`}>
                    {q.type.replace('_', ' ')}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-400">{q.points || 1} pt</span>
                  {submitted && (
                    <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold flex items-center gap-1 ${
                      isCorrect
                        ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300'
                        : isPartial
                        ? 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300'
                        : 'bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300'
                    }`}>
                      {isCorrect ? <Check className="w-3 h-3" /> : isPartial ? 'Partial' : <X className="w-3 h-3" />}
                      {isCorrect ? 'Correct' : isPartial ? 'Partial Credit' : 'Incorrect'}
                    </span>
                  )}
                </div>
              </div>

              {/* Question Statement */}
              <h4 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white leading-relaxed">
                {q.question}
              </h4>

              {/* 1. MCQ RENDERER */}
              {q.type === 'mcq' && (
                <div className="space-y-2 pt-1">
                  {(q.options || []).map((opt, optIdx) => {
                    const isSelected = userAns === optIdx;
                    let style = 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-white dark:bg-slate-900';
                    if (isSelected) {
                      style = 'border-brand-500 bg-brand-50/50 dark:bg-brand-950/30 text-brand-900 dark:text-brand-100 font-semibold shadow-xs';
                    }
                    if (submitted) {
                      if (optIdx === q.correctAnswer) {
                        style = 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-100 font-bold';
                      } else if (isSelected) {
                        style = 'border-rose-500 bg-rose-50 dark:bg-rose-950/40 text-rose-900 dark:text-rose-100 line-through';
                      }
                    }

                    return (
                      <div
                        key={optIdx}
                        onClick={() => handleSelectMCQ(q.id, optIdx)}
                        className={`p-3.5 rounded-2xl border text-xs sm:text-sm cursor-pointer transition flex items-center justify-between gap-3 ${style}`}
                      >
                        <div className="flex items-center gap-3">
                          <span className="w-6 h-6 rounded-lg bg-slate-100 dark:bg-slate-800 text-xs font-bold text-slate-500 flex items-center justify-center shrink-0">
                            {String.fromCharCode(65 + optIdx)}
                          </span>
                          <span>{opt}</span>
                        </div>
                        {submitted && optIdx === q.correctAnswer && (
                          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                        )}
                      </div>
                    );
                  })}
                </div>
              )}

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

              {/* 3. MATCHING COLUMN RENDERER */}
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
                              disabled={submitted}
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

              {/* 4. SEQUENTIAL ORDERING RENDERER */}
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
              {submitted && q.explanation && (
                <div className="p-3.5 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/40 text-xs text-amber-900 dark:text-amber-200">
                  <div className="font-bold flex items-center gap-1.5 mb-0.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                    <span>Educational Explanation &amp; Key Learning Point:</span>
                  </div>
                  <p className="mt-0.5 text-amber-800/90 dark:text-amber-300/90 leading-relaxed">
                    {q.explanation}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>

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
