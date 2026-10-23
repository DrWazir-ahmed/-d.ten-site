import React, { useState, useEffect, useRef, useMemo } from 'react';
import { 
  X, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  Award, 
  RotateCcw, 
  ArrowRight, 
  ArrowLeft, 
  HelpCircle, 
  Sparkles, 
  Check, 
  ChevronRight,
  BookOpen,
  Info,
  Lightbulb,
  CheckSquare,
  Maximize2,
  Minimize2,
  Flag,
  Keyboard,
  Type
} from 'lucide-react';
import { getChapter10MCQs } from '../../services/curriculumService';
import { recordQuizResult } from '../../services/firebaseService';
import { useAuth } from '../../context/AuthContext';
import confetti from 'canvas-confetti';

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

export const ChapterTestModal = ({ 
  isOpen, 
  onClose, 
  system, 
  className, 
  subject, 
  chapter 
}) => {
  const { currentUser } = useAuth();
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [instantFeedback, setInstantFeedback] = useState(true);
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes
  const [timerActive, setTimerActive] = useState(true);
  const timerRef = useRef(null);

  // Modern UI & Universal Screen Options
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [fontSizeLevel, setFontSizeLevel] = useState('normal'); // 'normal' | 'large' | 'xl'
  const [flaggedQuestions, setFlaggedQuestions] = useState({});
  const [showShortcutsHelp, setShowShortcutsHelp] = useState(false);
  const [autoAdvance, setAutoAdvance] = useState(false);

  // Load questions
  const loadTest = async () => {
    if (!subject?.fileKey || !chapter?.no) return;
    setLoading(true);
    setAnswers({});
    setFlaggedQuestions({});
    setSubmitted(false);
    setCurrentIndex(0);
    setTimeLeft(600);
    setTimerActive(true);

    const qData = await getChapter10MCQs(subject.fileKey, chapter.no, true);
    setQuestions(qData);
    setLoading(false);
  };

  useEffect(() => {
    if (isOpen) {
      loadTest();
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isOpen, subject?.fileKey, chapter?.no]);

  // Timer effect
  useEffect(() => {
    if (!isOpen || submitted || loading || !timerActive) return;

    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          handleSubmitTest();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, [isOpen, submitted, loading, timerActive]);

  const currentQ = questions[currentIndex];
  const userAns = currentQ ? answers[currentQ.id] : undefined;

  const isQuestionRTL = useMemo(() => {
    if (!currentQ) return false;
    const subName = String(subject?.name || '').toLowerCase();
    if (subName.includes('urdu') || isUrduOrRTL(subName)) {
      if (isUrduOrRTL(currentQ.question) || (currentQ.options && currentQ.options.some(isUrduOrRTL))) {
        return true;
      }
    }
    if (isUrduOrRTL(currentQ.question)) return true;
    if (currentQ.options && currentQ.options.some(isUrduOrRTL)) return true;
    return false;
  }, [currentQ, subject?.name]);

  const handleSelectOption = (qId, optionIdx) => {
    if (submitted) return;
    setAnswers(prev => ({ ...prev, [qId]: optionIdx }));

    // Auto advance if enabled and not on last question
    if (autoAdvance && currentIndex < questions.length - 1) {
      setTimeout(() => {
        setCurrentIndex(prev => Math.min(prev + 1, questions.length - 1));
      }, 350);
    }
  };

  const handleClearAnswer = (qId) => {
    if (submitted) return;
    setAnswers(prev => {
      const copy = { ...prev };
      delete copy[qId];
      return copy;
    });
  };

  const toggleFlagCurrent = () => {
    if (!currentQ) return;
    setFlaggedQuestions(prev => ({
      ...prev,
      [currentQ.id]: !prev[currentQ.id]
    }));
  };

  // Keyboard navigation shortcuts
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (['INPUT', 'TEXTAREA'].includes(e.target.tagName)) return;

      if (e.key === 'ArrowRight' || e.key === 'PageDown') {
        e.preventDefault();
        setCurrentIndex(prev => Math.min(prev + 1, questions.length - 1));
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        e.preventDefault();
        setCurrentIndex(prev => Math.max(prev - 1, 0));
      } else if (e.key.toLowerCase() === 'f') {
        e.preventDefault();
        toggleFlagCurrent();
      } else if (e.key === '?' || (e.shiftKey && e.key === '/')) {
        e.preventDefault();
        setShowShortcutsHelp(prev => !prev);
      } else if (!submitted && currentQ) {
        if (e.key === '1' || e.key.toLowerCase() === 'a') {
          handleSelectOption(currentQ.id, 0);
        } else if (e.key === '2' || e.key.toLowerCase() === 'b') {
          handleSelectOption(currentQ.id, 1);
        } else if (e.key === '3' || e.key.toLowerCase() === 'c') {
          handleSelectOption(currentQ.id, 2);
        } else if (e.key === '4' || e.key.toLowerCase() === 'd') {
          handleSelectOption(currentQ.id, 3);
        } else if (e.key === 'Backspace' || e.key === 'Delete') {
          handleClearAnswer(currentQ.id);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, questions.length, currentQ, submitted, autoAdvance]);

  // Evaluate test
  const calculateResults = () => {
    let score = 0;
    questions.forEach(q => {
      if (answers[q.id] === q.correctAnswer) {
        score++;
      }
    });
    const percentage = Math.round((score / (questions.length || 1)) * 100);
    const passed = percentage >= 70;
    return { score, total: questions.length, percentage, passed };
  };

  const handleSubmitTest = async () => {
    if (submitted) return;
    if (timerRef.current) clearInterval(timerRef.current);
    setSubmitted(true);

    const results = calculateResults();

    if (results.passed) {
      try {
        confetti({
          particleCount: 90,
          spread: 75,
          origin: { y: 0.6 }
        });
      } catch (e) {}
    }

    // Save to user history if logged in
    if (currentUser?.uid) {
      try {
        const testTitle = `${system?.name || 'Curriculum'} - ${subject?.name}: Ch ${chapter?.no}`;
        await recordQuizResult(
          currentUser.uid,
          subject?.id || 'curriculum',
          subject?.name || 'Curriculum Subject',
          testTitle,
          results.percentage,
          results.passed
        );
      } catch (err) {
        console.warn('Could not record quiz result:', err);
      }
    }
  };

  const results = calculateResults();
  const answeredCount = Object.keys(answers).length;
  const flaggedCount = Object.values(flaggedQuestions).filter(Boolean).length;
  const remainingCount = Math.max(0, questions.length - answeredCount);
  const progressPercent = Math.round((answeredCount / (questions.length || 10)) * 100);

  const formatTimer = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  // Font sizing styles
  const getQuestionFontSize = () => {
    if (isQuestionRTL) {
      if (fontSizeLevel === 'xl') return 'text-xl sm:text-3xl leading-[2.6]';
      if (fontSizeLevel === 'large') return 'text-lg sm:text-2xl leading-[2.4]';
      return 'text-base sm:text-xl leading-[2.2]';
    }
    if (fontSizeLevel === 'xl') return 'text-lg sm:text-2xl leading-relaxed';
    if (fontSizeLevel === 'large') return 'text-base sm:text-xl leading-relaxed';
    return 'text-sm sm:text-lg leading-relaxed';
  };

  const getOptionFontSize = () => {
    if (isQuestionRTL) {
      if (fontSizeLevel === 'xl') return 'text-base sm:text-xl leading-relaxed';
      if (fontSizeLevel === 'large') return 'text-sm sm:text-lg leading-relaxed';
      return 'text-xs sm:text-base leading-relaxed';
    }
    if (fontSizeLevel === 'xl') return 'text-sm sm:text-base';
    if (fontSizeLevel === 'large') return 'text-xs sm:text-sm';
    return 'text-xs sm:text-sm';
  };

  if (!isOpen) return null;

  return (
    <div className={`fixed inset-0 z-50 animate-fadeIn ${
      isFullscreen 
        ? 'bg-slate-950 flex flex-col p-0' 
        : 'overflow-y-auto bg-slate-950/80 backdrop-blur-md p-2 sm:p-4 md:p-6 flex items-center justify-center'
    }`}>
      <div className={`relative bg-white dark:bg-slate-900 overflow-hidden flex flex-col transition-all duration-300 ${
        isFullscreen
          ? 'w-full h-full rounded-none border-none'
          : 'w-full max-w-4xl lg:max-w-5xl max-h-[94vh] rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800'
      }`}>
        
        {/* Top Gradient Progress Bar */}
        <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-brand-600 via-indigo-600 to-purple transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* Top Header - Sleek Modern Flex Header */}
        <div className="px-4 sm:px-6 py-3 sm:py-3.5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50/90 dark:bg-slate-800/60 gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <span className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-600 to-indigo-600 text-white flex items-center justify-center shrink-0 shadow-md shadow-brand-500/25">
              <Award className="w-4 h-4" />
            </span>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 text-[10px] sm:text-[11px] font-bold text-slate-400 uppercase tracking-wider truncate">
                <span className="text-xs">{system?.flag}</span>
                <span>{system?.name}</span>
                <span>&bull;</span>
                <span>{className?.name}</span>
                <span>&bull;</span>
                <span className="text-brand-600 dark:text-brand-400 font-extrabold">{subject?.name}</span>
              </div>
              <h3 className="text-xs sm:text-sm font-black text-slate-900 dark:text-white truncate">
                Chapter {chapter?.no}: {chapter?.title}
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {/* Countdown Timer */}
            {!submitted && (
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 font-mono text-xs font-bold border border-amber-200 dark:border-amber-800 shadow-2xs">
                <Clock className="w-3.5 h-3.5 animate-pulse" />
                <span>{formatTimer(timeLeft)}</span>
              </div>
            )}

            {/* Universal Fullscreen Canvas Toggle */}
            <button
              onClick={() => setIsFullscreen(prev => !prev)}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-700 transition shadow-2xs"
              title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen Mode"}
            >
              {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>

            {/* Close Modal */}
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-700 transition"
              title="Close Assessment"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Sub Header: Question Palette, Zoom & Mode Controls */}
        <div className="px-4 sm:px-6 py-2.5 bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
          
          {/* Quick Question Selector Pills with Flags */}
          <div className="flex items-center gap-1.5 overflow-x-auto py-0.5 scrollbar-none">
            {questions.map((q, idx) => {
              const isAnswered = answers[q.id] !== undefined;
              const isCurrent = currentIndex === idx;
              const isFlagged = flaggedQuestions[q.id];
              const isCorrect = submitted && answers[q.id] === q.correctAnswer;
              const isWrong = submitted && isAnswered && answers[q.id] !== q.correctAnswer;

              let style = 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-slate-300';
              if (isCurrent) {
                style = 'border-brand-500 bg-brand-50 dark:bg-brand-950/60 text-brand-600 dark:text-brand-400 font-black ring-2 ring-brand-500/25';
              } else if (submitted) {
                if (isCorrect) style = 'bg-emerald-500 text-white font-bold border-emerald-600';
                else if (isWrong) style = 'bg-rose-500 text-white font-bold border-rose-600';
                else style = 'bg-slate-200 dark:bg-slate-700 text-slate-400';
              } else if (isAnswered) {
                style = 'bg-brand-600 text-white font-bold border-brand-700';
              }

              return (
                <button
                  key={q.id}
                  onClick={() => setCurrentIndex(idx)}
                  className={`relative w-7 h-7 sm:w-8 sm:h-8 rounded-xl border text-xs flex items-center justify-center transition-all ${style}`}
                  title={`Question ${idx + 1}${isAnswered ? ' (Answered)' : ''}${isFlagged ? ' (Marked for review)' : ''}`}
                >
                  {idx + 1}
                  {isFlagged && (
                    <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-amber-500 ring-2 ring-white dark:ring-slate-900" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Quick Status and Accessibility Controls */}
          <div className="flex items-center gap-2 ml-auto">
            
            {/* Status Summary */}
            <span className="hidden md:inline text-[11px] font-semibold text-slate-400 mr-1">
              {answeredCount}/{questions.length} Answered {flaggedCount > 0 && `• ${flaggedCount} Flagged`}
            </span>

            {/* Font Scaler Pill (Universal Zoom: Normal, Large, Extra Large) */}
            <div className="flex items-center rounded-xl bg-slate-100 dark:bg-slate-800 p-0.5 border border-slate-200 dark:border-slate-700">
              <button
                type="button"
                onClick={() => setFontSizeLevel('normal')}
                className={`px-2 py-1 rounded-lg text-[10px] font-bold transition ${
                  fontSizeLevel === 'normal'
                    ? 'bg-white dark:bg-slate-700 text-brand-600 dark:text-brand-300 shadow-2xs'
                    : 'text-slate-500 hover:text-slate-800 dark:hover:text-white'
                }`}
                title="Normal text size"
              >
                A
              </button>
              <button
                type="button"
                onClick={() => setFontSizeLevel('large')}
                className={`px-2 py-1 rounded-lg text-xs font-bold transition ${
                  fontSizeLevel === 'large'
                    ? 'bg-white dark:bg-slate-700 text-brand-600 dark:text-brand-300 shadow-2xs'
                    : 'text-slate-500 hover:text-slate-800 dark:hover:text-white'
                }`}
                title="Large text size"
              >
                A+
              </button>
              <button
                type="button"
                onClick={() => setFontSizeLevel('xl')}
                className={`px-2 py-1 rounded-lg text-xs font-extrabold transition ${
                  fontSizeLevel === 'xl'
                    ? 'bg-white dark:bg-slate-700 text-brand-600 dark:text-brand-300 shadow-2xs'
                    : 'text-slate-500 hover:text-slate-800 dark:hover:text-white'
                }`}
                title="Extra large text size (Recommended for Nastaliq Urdu)"
              >
                A++
              </button>
            </div>

            {/* Keyboard Shortcuts Hint */}
            <button
              onClick={() => setShowShortcutsHelp(prev => !prev)}
              className={`p-1.5 rounded-xl border text-[11px] font-bold flex items-center gap-1 transition ${
                showShortcutsHelp 
                  ? 'bg-brand-50 border-brand-300 text-brand-600 dark:bg-brand-950/60 dark:text-brand-300' 
                  : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-500'
              }`}
              title="Keyboard shortcuts: A-D (Options), ←/→ (Navigate), F (Flag)"
            >
              <Keyboard className="w-3.5 h-3.5" />
              <span className="hidden lg:inline">Shortcuts</span>
            </button>

            {/* Instant feedback toggle */}
            <label className="flex items-center gap-1.5 cursor-pointer text-slate-600 dark:text-slate-300 font-bold select-none text-[10px] sm:text-[11px] bg-slate-50 dark:bg-slate-800 px-2.5 py-1 rounded-xl border border-slate-200/80 dark:border-slate-700">
              <input
                type="checkbox"
                checked={instantFeedback}
                onChange={(e) => setInstantFeedback(e.target.checked)}
                className="rounded border-slate-300 text-brand-600 focus:ring-brand-500 w-3 h-3"
              />
              <span className="flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-amber-500" />
                <span>Instant Feedback</span>
              </span>
            </label>
          </div>
        </div>

        {/* Keyboard Shortcuts Overlay Banner */}
        {showShortcutsHelp && (
          <div className="px-6 py-2 bg-gradient-to-r from-brand-50 to-indigo-50 dark:from-slate-800 dark:to-slate-800/80 border-b border-brand-200 dark:border-slate-700 flex items-center justify-between text-xs text-slate-700 dark:text-slate-300 animate-fadeIn">
            <div className="flex flex-wrap items-center gap-4">
              <span className="font-bold flex items-center gap-1.5 text-brand-700 dark:text-brand-300">
                <Keyboard className="w-3.5 h-3.5" /> Shortcuts Active:
              </span>
              <span><kbd className="px-1.5 py-0.5 rounded bg-white dark:bg-slate-700 border text-[10px] font-mono">1-4</kbd> or <kbd className="px-1.5 py-0.5 rounded bg-white dark:bg-slate-700 border text-[10px] font-mono">A-D</kbd> Select Option</span>
              <span><kbd className="px-1.5 py-0.5 rounded bg-white dark:bg-slate-700 border text-[10px] font-mono">←</kbd> <kbd className="px-1.5 py-0.5 rounded bg-white dark:bg-slate-700 border text-[10px] font-mono">→</kbd> Previous/Next</span>
              <span><kbd className="px-1.5 py-0.5 rounded bg-white dark:bg-slate-700 border text-[10px] font-mono">F</kbd> Flag for Review</span>
              <span><kbd className="px-1.5 py-0.5 rounded bg-white dark:bg-slate-700 border text-[10px] font-mono">Del</kbd> Clear Choice</span>
            </div>
            <button onClick={() => setShowShortcutsHelp(false)} className="text-slate-400 hover:text-slate-600 text-xs font-bold">
              ✕
            </button>
          </div>
        )}

        {/* Modal Content Body */}
        <div className="p-4 sm:p-6 md:p-8 overflow-y-auto flex-1 space-y-5">
          {loading ? (
            <div className="py-20 text-center space-y-3">
              <div className="w-10 h-10 border-4 border-brand-500 border-t-transparent rounded-full animate-spin mx-auto" />
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Loading 10 Chapter MCQs from Database...
              </p>
            </div>
          ) : questions.length === 0 ? (
            <div className="py-16 text-center space-y-3">
              <HelpCircle className="w-12 h-12 text-slate-300 mx-auto" />
              <h4 className="font-bold text-slate-800 dark:text-white">No Questions Available</h4>
              <p className="text-xs text-slate-500">
                Could not find MCQs for this chapter in the dataset.
              </p>
            </div>
          ) : (
            <>
              {/* Score Banner when Submitted */}
              {submitted && (
                <div className={`p-5 sm:p-6 rounded-2xl border shadow-md ${
                  results.passed 
                    ? 'bg-gradient-to-r from-emerald-50 via-teal-50/50 to-white dark:from-emerald-950/40 dark:via-slate-900 dark:to-slate-900 border-emerald-500/30' 
                    : 'bg-gradient-to-r from-rose-50 via-amber-50/50 to-white dark:from-rose-950/40 dark:via-slate-900 dark:to-slate-900 border-rose-500/30'
                } animate-fadeIn`}>
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-3.5 text-center sm:text-left">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-md shrink-0 ${
                        results.passed ? 'bg-emerald-600 shadow-emerald-500/30' : 'bg-rose-600 shadow-rose-500/30'
                      }`}>
                        {results.passed ? <Award className="w-6 h-6" /> : <XCircle className="w-6 h-6" />}
                      </div>
                      <div>
                        <h4 className={`text-lg font-black ${results.passed ? 'text-emerald-900 dark:text-emerald-100' : 'text-rose-900 dark:text-rose-100'}`}>
                          {results.passed ? 'Assessment Passed! 🎉' : 'Assessment Needs Review'}
                        </h4>
                        <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5">
                          You scored <span className="font-black text-slate-900 dark:text-white">{results.score}</span> out of {results.total} ({results.percentage}%). Required passing threshold is 70%.
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={loadTest}
                      className="py-2 px-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-black text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 transition flex items-center gap-2 shadow-2xs shrink-0"
                    >
                      <RotateCcw className="w-3.5 h-3.5 text-brand-600" />
                      <span>Retake (New 10 MCQs)</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Active Question Card */}
              {currentQ && (
                <div className="space-y-4 animate-fadeIn max-w-4xl mx-auto">
                  
                  {/* Question Meta Header */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-7 h-7 rounded-lg bg-gradient-to-tr from-brand-600 to-indigo-600 text-white font-black text-xs flex items-center justify-center shadow-xs">
                        {currentIndex + 1}
                      </span>
                      <span className="text-xs font-black uppercase tracking-wider text-slate-400">
                        Question {currentIndex + 1} of {questions.length}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      {/* Flag for Review Toggle */}
                      <button
                        type="button"
                        onClick={toggleFlagCurrent}
                        className={`px-2.5 py-1 rounded-lg text-xs font-bold flex items-center gap-1.5 transition ${
                          flaggedQuestions[currentQ.id]
                            ? 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 border border-amber-300 dark:border-amber-700'
                            : 'bg-slate-100 text-slate-500 hover:text-slate-800 dark:bg-slate-800 dark:text-slate-400'
                        }`}
                        title="Flag this question to review later"
                      >
                        <Flag className={`w-3.5 h-3.5 ${flaggedQuestions[currentQ.id] ? 'fill-current text-amber-500' : ''}`} />
                        <span>{flaggedQuestions[currentQ.id] ? 'Flagged' : 'Flag'}</span>
                      </button>

                      {currentQ.difficulty && (
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
                          currentQ.difficulty.toLowerCase() === 'easy'
                            ? 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800'
                            : currentQ.difficulty.toLowerCase() === 'hard'
                            ? 'bg-rose-50 dark:bg-rose-950/50 text-rose-700 dark:text-rose-300 border-rose-200 dark:border-rose-800'
                            : 'bg-amber-50 dark:bg-amber-950/50 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800'
                        }`}>
                          {currentQ.difficulty}
                        </span>
                      )}
                      {currentQ.subTopic && (
                        <span className="hidden sm:inline-block px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-[10px] font-bold text-slate-500 border border-slate-200/60 dark:border-slate-700">
                          {currentQ.subTopic}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Question Text Box */}
                  <div 
                    dir={isQuestionRTL ? 'rtl' : 'ltr'}
                    className={`p-4 sm:p-5 md:p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/90 dark:border-slate-800 shadow-2xs ${
                      isQuestionRTL ? 'text-right' : 'text-left'
                    }`}
                  >
                    <p className={`font-bold text-slate-900 dark:text-white ${getQuestionFontSize()} ${
                      isQuestionRTL ? 'font-urdu tracking-wide' : ''
                    }`}>
                      {currentQ.question}
                    </p>
                  </div>

                  {/* 4 MCQ Options */}
                  <div className="space-y-2.5" dir={isQuestionRTL ? 'rtl' : 'ltr'}>
                    {currentQ.options.map((optText, optIdx) => {
                      const optLetter = ['A', 'B', 'C', 'D'][optIdx];
                      const isSelected = userAns === optIdx;
                      const isCorrect = optIdx === currentQ.correctAnswer;
                      const showFeedback = (submitted || (instantFeedback && userAns !== undefined));

                      let style = 'border-slate-200 dark:border-slate-800 hover:border-brand-400 dark:hover:border-brand-600 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 hover:shadow-2xs';
                      let letterStyle = 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400';

                      if (isSelected) {
                        style = 'border-brand-500 bg-brand-50/70 dark:bg-brand-950/40 text-brand-900 dark:text-brand-100 font-bold ring-2 ring-brand-500/20';
                        letterStyle = 'bg-brand-600 text-white';
                      }

                      if (showFeedback) {
                        if (isCorrect) {
                          style = 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-100 font-bold ring-2 ring-emerald-500/20';
                          letterStyle = 'bg-emerald-600 text-white';
                        } else if (isSelected) {
                          style = 'border-rose-500 bg-rose-50 dark:bg-rose-950/40 text-rose-900 dark:text-rose-100 ring-2 ring-rose-500/20';
                          letterStyle = 'bg-rose-600 text-white';
                        }
                      }

                      return (
                        <button
                          key={optIdx}
                          type="button"
                          disabled={submitted}
                          dir={isQuestionRTL ? 'rtl' : 'ltr'}
                          onClick={() => handleSelectOption(currentQ.id, optIdx)}
                          className={`w-full p-3.5 sm:p-4 rounded-xl border ${isQuestionRTL ? 'text-right' : 'text-left'} ${getOptionFontSize()} font-medium transition-all flex items-center justify-between gap-3 ${style}`}
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <span className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg font-black flex items-center justify-center shrink-0 text-xs shadow-xs transition-transform ${letterStyle}`}>
                              {optLetter}
                            </span>
                            <span className={`leading-snug ${isQuestionRTL ? 'font-urdu' : ''}`}>
                              {optText}
                            </span>
                          </div>

                          {showFeedback && isCorrect && (
                            <span className="flex items-center gap-1.5 text-emerald-600 font-black text-xs shrink-0">
                              <CheckCircle2 className="w-4 h-4" />
                              <span className="hidden sm:inline">{isQuestionRTL ? 'درست' : 'Correct'}</span>
                            </span>
                          )}
                          {showFeedback && isSelected && !isCorrect && (
                            <span className="flex items-center gap-1.5 text-rose-600 font-black text-xs shrink-0">
                              <XCircle className="w-4 h-4" />
                              <span className="hidden sm:inline">{isQuestionRTL ? 'غلط' : 'Incorrect'}</span>
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {/* Immediate or Submitted Feedback & Explanation Card */}
                  {(submitted || (instantFeedback && userAns !== undefined)) && currentQ.explanation && (() => {
                    const isExpRTL = isQuestionRTL || isUrduOrRTL(currentQ.explanation);
                    return (
                      <div 
                        dir={isExpRTL ? 'rtl' : 'ltr'}
                        className={`p-4 sm:p-5 rounded-2xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-500/30 text-xs space-y-2 animate-fadeIn shadow-2xs ${
                          isExpRTL ? 'text-right' : 'text-left'
                        }`}
                      >
                        <div className="flex items-center gap-2 font-black text-amber-800 dark:text-amber-300 uppercase tracking-wider text-[11px]">
                          <Lightbulb className="w-4 h-4 text-amber-500 shrink-0" />
                          <span>{isExpRTL ? 'وضاحت اور رہنمائی' : 'Explanation & Concept Feedback'}</span>
                        </div>
                        <p className={`text-slate-700 dark:text-slate-200 leading-relaxed text-xs sm:text-sm ${
                          isExpRTL ? 'font-urdu text-sm sm:text-base leading-loose pr-6' : 'pl-6'
                        }`}>
                          {currentQ.explanation}
                        </p>
                      </div>
                    );
                  })()}

                </div>
              )}
            </>
          )}
        </div>

        {/* Modal Footer Controls */}
        <div className="px-4 sm:px-6 py-3 border-t border-slate-200 dark:border-slate-800 bg-slate-50/90 dark:bg-slate-800/60 flex items-center justify-between gap-3">
          
          <div className="flex items-center gap-2">
            <button
              type="button"
              disabled={currentIndex === 0}
              onClick={() => setCurrentIndex(prev => prev - 1)}
              className="py-2 px-3.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 disabled:opacity-40 text-xs font-bold text-slate-700 dark:text-slate-300 transition flex items-center gap-1.5 shadow-2xs"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Previous</span>
            </button>

            {/* Clear selection option */}
            {!submitted && userAns !== undefined && (
              <button
                type="button"
                onClick={() => handleClearAnswer(currentQ.id)}
                className="py-2 px-3 rounded-xl text-xs font-semibold text-slate-500 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition flex items-center gap-1"
                title="Clear selected choice for this question"
              >
                <RotateCcw className="w-3 h-3" />
                <span className="hidden sm:inline">Clear Choice</span>
              </button>
            )}
          </div>

          <div className="flex items-center gap-2">
            {!submitted ? (
              currentIndex === questions.length - 1 ? (
                <button
                  type="button"
                  onClick={handleSubmitTest}
                  className="py-2 px-5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-black text-xs sm:text-sm shadow-md shadow-emerald-500/25 transition flex items-center gap-1.5"
                >
                  <Check className="w-4 h-4" />
                  <span>Submit 10 MCQs Test</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => setCurrentIndex(prev => prev + 1)}
                  className="py-2 px-4 rounded-xl bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-700 hover:to-indigo-700 text-white font-black text-xs sm:text-sm shadow-md shadow-brand-500/25 transition flex items-center gap-1.5"
                >
                  <span>Next Question</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )
            ) : (
              <button
                type="button"
                onClick={onClose}
                className="py-2 px-5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-black text-xs sm:text-sm shadow-md shadow-brand-500/25 transition flex items-center gap-1.5"
              >
                <span>Finished Review</span>
              </button>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};
