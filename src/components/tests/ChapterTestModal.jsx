import React, { useState, useEffect, useRef } from 'react';
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
  Bookmark, 
  Check, 
  ChevronRight,
  BookOpen,
  Info,
  Lightbulb,
  CheckSquare
} from 'lucide-react';
import { getChapter10MCQs } from '../../services/curriculumService';
import { recordQuizResult } from '../../services/firebaseService';
import { useAuth } from '../../context/AuthContext';
import confetti from 'canvas-confetti';

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

  // Load questions
  const loadTest = async () => {
    if (!subject?.fileKey || !chapter?.no) return;
    setLoading(true);
    setAnswers({});
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

  if (!isOpen) return null;

  const currentQ = questions[currentIndex];
  const userAns = currentQ ? answers[currentQ.id] : undefined;

  const handleSelectOption = (qId, optionIdx) => {
    if (submitted) return;
    setAnswers(prev => ({ ...prev, [qId]: optionIdx }));
  };

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
  const progressPercent = Math.round((answeredCount / (questions.length || 10)) * 100);

  const formatTimer = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md p-3 sm:p-6 flex items-center justify-center animate-fadeIn">
      <div className="relative w-full max-w-4xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden max-h-[92vh] flex flex-col">
        
        {/* Top Gradient Progress Bar */}
        <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-brand-600 via-indigo-600 to-purple transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* Top Header */}
        <div className="px-5 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50/90 dark:bg-slate-800/60">
          <div className="flex items-center gap-3 min-w-0">
            <span className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-brand-600 to-indigo-600 text-white flex items-center justify-center shrink-0 shadow-md shadow-brand-500/25">
              <Award className="w-5 h-5" />
            </span>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-400 uppercase tracking-wider truncate">
                <span>{system?.name}</span>
                <span>&bull;</span>
                <span>{className?.name}</span>
                <span>&bull;</span>
                <span className="text-brand-600 dark:text-brand-400">{subject?.name}</span>
              </div>
              <h3 className="text-sm sm:text-base font-black text-slate-900 dark:text-white truncate">
                Chapter {chapter?.no}: {chapter?.title}
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            {/* Countdown Timer */}
            {!submitted && (
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 font-mono text-xs font-bold border border-amber-200 dark:border-amber-800 shadow-sm">
                <Clock className="w-3.5 h-3.5 animate-pulse" />
                <span>{formatTimer(timeLeft)}</span>
              </div>
            )}

            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-700 transition"
              title="Close Assessment"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Sub Header: Question Palette & Mode Toggle */}
        <div className="px-5 py-3 bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
          
          {/* Quick Question Selector Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto py-0.5 scrollbar-none">
            {questions.map((q, idx) => {
              const isAnswered = answers[q.id] !== undefined;
              const isCurrent = currentIndex === idx;
              const isCorrect = submitted && answers[q.id] === q.correctAnswer;
              const isWrong = submitted && isAnswered && answers[q.id] !== q.correctAnswer;

              let style = 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-slate-300';
              if (isCurrent) style = 'border-brand-500 bg-brand-50 dark:bg-brand-950/60 text-brand-600 dark:text-brand-400 font-black ring-2 ring-brand-500/25';
              else if (submitted) {
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
                  className={`w-7 h-7 sm:w-8 sm:h-8 rounded-xl border text-xs flex items-center justify-center transition-all ${style}`}
                  title={`Jump to Question ${idx + 1}`}
                >
                  {idx + 1}
                </button>
              );
            })}
          </div>

          {/* Instant feedback toggle */}
          <div className="flex items-center gap-2 ml-auto">
            <label className="flex items-center gap-2 cursor-pointer text-slate-600 dark:text-slate-300 font-bold select-none text-[11px] bg-slate-50 dark:bg-slate-800 px-3 py-1.5 rounded-xl border border-slate-200/80 dark:border-slate-700">
              <input
                type="checkbox"
                checked={instantFeedback}
                onChange={(e) => setInstantFeedback(e.target.checked)}
                className="rounded border-slate-300 text-brand-600 focus:ring-brand-500 w-3.5 h-3.5"
              />
              <span className="flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-amber-500" />
                <span>Instant Feedback Mode</span>
              </span>
            </label>
          </div>
        </div>

        {/* Modal Content Body */}
        <div className="p-5 sm:p-7 overflow-y-auto flex-1 space-y-6">
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
                <div className={`p-6 rounded-3xl border shadow-lg ${
                  results.passed 
                    ? 'bg-gradient-to-r from-emerald-50 via-teal-50/50 to-white dark:from-emerald-950/40 dark:via-slate-900 dark:to-slate-900 border-emerald-500/30' 
                    : 'bg-gradient-to-r from-rose-50 via-amber-50/50 to-white dark:from-rose-950/40 dark:via-slate-900 dark:to-slate-900 border-rose-500/30'
                } animate-fadeIn`}>
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-5">
                    <div className="flex items-center gap-4 text-center sm:text-left">
                      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-md ${
                        results.passed ? 'bg-emerald-600 shadow-emerald-500/30' : 'bg-rose-600 shadow-rose-500/30'
                      }`}>
                        {results.passed ? <Award className="w-7 h-7" /> : <XCircle className="w-7 h-7" />}
                      </div>
                      <div>
                        <div className="flex items-center justify-center sm:justify-start gap-2">
                          <h4 className={`text-xl font-black ${results.passed ? 'text-emerald-900 dark:text-emerald-100' : 'text-rose-900 dark:text-rose-100'}`}>
                            {results.passed ? 'Assessment Passed! 🎉' : 'Assessment Needs Review'}
                          </h4>
                        </div>
                        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-0.5">
                          You scored <span className="font-black text-slate-900 dark:text-white">{results.score}</span> out of {results.total} ({results.percentage}%). Required passing threshold is 70%.
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={loadTest}
                      className="py-2.5 px-5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-black text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 transition flex items-center gap-2 shadow-sm shrink-0"
                    >
                      <RotateCcw className="w-4 h-4 text-brand-600" />
                      <span>Retake (New 10 MCQs)</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Active Question Card */}
              {currentQ && (
                <div className="space-y-5 animate-fadeIn">
                  
                  {/* Question Meta Header */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-8 h-8 rounded-xl bg-gradient-to-tr from-brand-600 to-indigo-600 text-white font-black text-xs flex items-center justify-center shadow-sm">
                        {currentIndex + 1}
                      </span>
                      <span className="text-xs font-black uppercase tracking-wider text-slate-400">
                        Question {currentIndex + 1} of {questions.length}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      {currentQ.difficulty && (
                        <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border ${
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
                        <span className="px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-[10px] font-bold text-slate-500 border border-slate-200/60 dark:border-slate-700">
                          {currentQ.subTopic}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Question Text Box */}
                  <div className="p-5 sm:p-6 rounded-3xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/90 dark:border-slate-800 shadow-sm">
                    <p className="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-relaxed">
                      {currentQ.question}
                    </p>
                  </div>

                  {/* 4 MCQ Options */}
                  <div className="space-y-3">
                    {currentQ.options.map((optText, optIdx) => {
                      const optLetter = ['A', 'B', 'C', 'D'][optIdx];
                      const isSelected = userAns === optIdx;
                      const isCorrect = optIdx === currentQ.correctAnswer;
                      const showFeedback = (submitted || (instantFeedback && userAns !== undefined));

                      let style = 'border-slate-200 dark:border-slate-800 hover:border-brand-400 dark:hover:border-brand-600 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 hover:shadow-md';
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
                          onClick={() => handleSelectOption(currentQ.id, optIdx)}
                          className={`w-full p-4 rounded-2xl border text-left text-xs sm:text-sm font-medium transition-all flex items-center justify-between gap-3 ${style}`}
                        >
                          <div className="flex items-center gap-3.5 min-w-0">
                            <span className={`w-8 h-8 rounded-xl font-black flex items-center justify-center shrink-0 text-xs shadow-sm transition-transform ${letterStyle}`}>
                              {optLetter}
                            </span>
                            <span className="leading-snug">{optText}</span>
                          </div>

                          {showFeedback && isCorrect && (
                            <span className="flex items-center gap-1 text-emerald-600 font-black text-xs shrink-0">
                              <CheckCircle2 className="w-5 h-5" />
                              <span className="hidden sm:inline">Correct</span>
                            </span>
                          )}
                          {showFeedback && isSelected && !isCorrect && (
                            <span className="flex items-center gap-1 text-rose-600 font-black text-xs shrink-0">
                              <XCircle className="w-5 h-5" />
                              <span className="hidden sm:inline">Incorrect</span>
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {/* Immediate or Submitted Feedback & Explanation Card */}
                  {(submitted || (instantFeedback && userAns !== undefined)) && currentQ.explanation && (
                    <div className="p-4 sm:p-5 rounded-3xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-500/30 text-xs space-y-2 animate-fadeIn shadow-sm">
                      <div className="flex items-center gap-2 font-black text-amber-800 dark:text-amber-300 uppercase tracking-wider text-[11px]">
                        <Lightbulb className="w-4 h-4 text-amber-500 shrink-0" />
                        <span>Explanation & Concept Feedback</span>
                      </div>
                      <p className="text-slate-700 dark:text-slate-200 leading-relaxed text-xs sm:text-sm pl-6">
                        {currentQ.explanation}
                      </p>
                    </div>
                  )}

                </div>
              )}
            </>
          )}
        </div>

        {/* Modal Footer Controls */}
        <div className="px-5 py-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50/90 dark:bg-slate-800/60 flex items-center justify-between gap-3">
          
          <button
            type="button"
            disabled={currentIndex === 0}
            onClick={() => setCurrentIndex(prev => prev - 1)}
            className="py-2.5 px-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 disabled:opacity-40 text-xs font-bold text-slate-700 dark:text-slate-300 transition flex items-center gap-1.5 shadow-sm"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Previous</span>
          </button>

          <div className="flex items-center gap-2">
            {!submitted ? (
              currentIndex === questions.length - 1 ? (
                <button
                  type="button"
                  onClick={handleSubmitTest}
                  className="py-2.5 px-6 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-black text-xs sm:text-sm shadow-lg shadow-emerald-500/25 transition flex items-center gap-2"
                >
                  <Check className="w-4 h-4" />
                  <span>Submit 10 MCQs Test</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => setCurrentIndex(prev => prev + 1)}
                  className="py-2.5 px-5 rounded-2xl bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-700 hover:to-indigo-700 text-white font-black text-xs sm:text-sm shadow-lg shadow-brand-500/25 transition flex items-center gap-2"
                >
                  <span>Next Question</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )
            ) : (
              <button
                type="button"
                onClick={onClose}
                className="py-2.5 px-6 rounded-2xl bg-brand-600 hover:bg-brand-700 text-white font-black text-xs sm:text-sm shadow-md shadow-brand-500/25 transition flex items-center gap-2"
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
