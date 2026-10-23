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
  Info
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
          particleCount: 80,
          spread: 70,
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
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-sm p-3 sm:p-6 flex items-center justify-center animate-fadeIn">
      <div className="relative w-full max-w-4xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden max-h-[92vh] flex flex-col">
        
        {/* Top Header */}
        <div className="px-5 py-3.5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50/90 dark:bg-slate-800/60">
          <div className="flex items-center gap-2.5 min-w-0">
            <span className="p-2 rounded-xl bg-brand-500/10 text-brand-600 dark:text-brand-400 shrink-0">
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
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 font-mono text-xs font-bold border border-amber-200 dark:border-amber-800">
                <Clock className="w-3.5 h-3.5" />
                <span>{formatTimer(timeLeft)}</span>
              </div>
            )}

            <button
              onClick={onClose}
              className="p-1.5 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-700 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Sub Header: Question Palette & Mode Toggle */}
        <div className="px-5 py-2.5 bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
          
          {/* Quick Question Selector Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto py-0.5">
            {questions.map((q, idx) => {
              const isAnswered = answers[q.id] !== undefined;
              const isCurrent = currentIndex === idx;
              const isCorrect = submitted && answers[q.id] === q.correctAnswer;
              const isWrong = submitted && isAnswered && answers[q.id] !== q.correctAnswer;

              let style = 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700';
              if (isCurrent) style = 'border-brand-500 bg-brand-50 dark:bg-brand-950/60 text-brand-600 dark:text-brand-400 font-black ring-2 ring-brand-500/20';
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
                  className={`w-7 h-7 rounded-lg border text-xs flex items-center justify-center transition-all ${style}`}
                >
                  {idx + 1}
                </button>
              );
            })}
          </div>

          {/* Instant feedback toggle */}
          <div className="flex items-center gap-2 ml-auto">
            <label className="flex items-center gap-1.5 cursor-pointer text-slate-500 dark:text-slate-400 font-medium select-none text-[11px]">
              <input
                type="checkbox"
                checked={instantFeedback}
                onChange={(e) => setInstantFeedback(e.target.checked)}
                className="rounded border-slate-300 text-brand-600 focus:ring-brand-500 w-3.5 h-3.5"
              />
              <span>Instant Answer Feedback</span>
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
                <div className={`p-5 rounded-3xl border ${
                  results.passed 
                    ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500/30' 
                    : 'bg-rose-50 dark:bg-rose-950/40 border-rose-500/30'
                } animate-fadeIn`}>
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-3.5">
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white ${
                        results.passed ? 'bg-emerald-600' : 'bg-rose-600'
                      }`}>
                        {results.passed ? <Award className="w-6 h-6" /> : <XCircle className="w-6 h-6" />}
                      </div>
                      <div>
                        <h4 className={`text-lg font-black ${results.passed ? 'text-emerald-900 dark:text-emerald-100' : 'text-rose-900 dark:text-rose-100'}`}>
                          {results.passed ? 'Assessment Passed! 🎉' : 'Needs Review'}
                        </h4>
                        <p className="text-xs text-slate-600 dark:text-slate-300">
                          You scored <span className="font-black text-sm">{results.score}</span> out of {results.total} ({results.percentage}%). Required passing score is 70%.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={loadTest}
                        className="py-2.5 px-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 transition flex items-center gap-1.5 shadow-sm"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>Retake (New 10 MCQs)</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Active Question Card */}
              {currentQ && (
                <div className="space-y-5 animate-fadeIn">
                  
                  {/* Question Meta */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-8 h-8 rounded-xl bg-brand-50 dark:bg-brand-950/60 text-brand-600 dark:text-brand-400 font-black text-sm flex items-center justify-center border border-brand-200 dark:border-brand-800">
                        {currentIndex + 1}
                      </span>
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                        Question {currentIndex + 1} of {questions.length}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      {currentQ.difficulty && (
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                          currentQ.difficulty.toLowerCase() === 'easy'
                            ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300'
                            : currentQ.difficulty.toLowerCase() === 'hard'
                            ? 'bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300'
                            : 'bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300'
                        }`}>
                          {currentQ.difficulty}
                        </span>
                      )}
                      {currentQ.subTopic && (
                        <span className="px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-[10px] font-semibold text-slate-500">
                          {currentQ.subTopic}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Question Text */}
                  <div className="p-4 sm:p-5 rounded-2xl bg-slate-50/80 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800">
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

                      let style = 'border-slate-200 dark:border-slate-800 hover:border-brand-300 dark:hover:border-brand-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200';
                      let letterStyle = 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400';

                      if (isSelected) {
                        style = 'border-brand-500 bg-brand-50/60 dark:bg-brand-950/40 text-brand-900 dark:text-brand-100 font-bold';
                        letterStyle = 'bg-brand-600 text-white';
                      }

                      if (showFeedback) {
                        if (isCorrect) {
                          style = 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-100 font-bold';
                          letterStyle = 'bg-emerald-600 text-white';
                        } else if (isSelected) {
                          style = 'border-rose-500 bg-rose-50 dark:bg-rose-950/40 text-rose-900 dark:text-rose-100';
                          letterStyle = 'bg-rose-600 text-white';
                        }
                      }

                      return (
                        <button
                          key={optIdx}
                          type="button"
                          disabled={submitted}
                          onClick={() => handleSelectOption(currentQ.id, optIdx)}
                          className={`w-full p-3.5 sm:p-4 rounded-2xl border text-left text-xs sm:text-sm font-medium transition flex items-center justify-between gap-3 ${style}`}
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <span className={`w-7 h-7 rounded-xl font-bold flex items-center justify-center shrink-0 text-xs ${letterStyle}`}>
                              {optLetter}
                            </span>
                            <span className="leading-snug">{optText}</span>
                          </div>

                          {showFeedback && isCorrect && (
                            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                          )}
                          {showFeedback && isSelected && !isCorrect && (
                            <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {/* Immediate or Submitted Feedback & Explanation Card */}
                  {(submitted || (instantFeedback && userAns !== undefined)) && currentQ.explanation && (
                    <div className="p-4 rounded-2xl bg-amber-50/60 dark:bg-amber-950/30 border border-amber-500/20 text-xs space-y-1.5 animate-fadeIn">
                      <div className="flex items-center gap-1.5 font-bold text-amber-800 dark:text-amber-300">
                        <Info className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
                        <span>Explanation & Concept Feedback:</span>
                      </div>
                      <p className="text-slate-700 dark:text-slate-300 leading-relaxed pl-5">
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
        <div className="px-5 py-3.5 border-t border-slate-200 dark:border-slate-800 bg-slate-50/90 dark:bg-slate-800/60 flex items-center justify-between gap-3">
          
          <button
            type="button"
            disabled={currentIndex === 0}
            onClick={() => setCurrentIndex(prev => prev - 1)}
            className="py-2.5 px-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 disabled:opacity-40 text-xs font-bold text-slate-700 dark:text-slate-300 transition flex items-center gap-1.5"
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
                  className="py-2.5 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs sm:text-sm shadow-md shadow-emerald-500/25 transition flex items-center gap-2"
                >
                  <Check className="w-4 h-4" />
                  <span>Submit 10 MCQs Test</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => setCurrentIndex(prev => prev + 1)}
                  className="py-2.5 px-5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-black text-xs sm:text-sm shadow-md shadow-brand-500/25 transition flex items-center gap-2"
                >
                  <span>Next Question</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )
            ) : (
              <button
                type="button"
                onClick={onClose}
                className="py-2.5 px-6 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-black text-xs sm:text-sm shadow-md shadow-brand-500/25 transition flex items-center gap-2"
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
