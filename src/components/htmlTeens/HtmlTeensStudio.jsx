import React, { useState, useEffect, useMemo, useRef } from 'react';
import { 
  Play, 
  RotateCcw, 
  Volume2, 
  VolumeX, 
  Sparkles, 
  Award, 
  Trophy, 
  CheckCircle2, 
  XCircle, 
  AlertCircle, 
  ChevronRight, 
  ChevronLeft, 
  BookOpen, 
  Code, 
  Globe, 
  Check, 
  Copy, 
  Lightbulb, 
  HelpCircle,
  Star,
  Compass,
  ArrowRight,
  GraduationCap,
  Monitor,
  Smartphone,
  Eye,
  CheckCircle,
  ExternalLink
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { HTML_TEENS_COURSE } from '../../data/htmlTeensCourseData';
import { validateHtmlCode, buildSandboxHtml } from './HtmlValidator';
import { HtmlTeensCertificate } from './HtmlTeensCertificate';
import { speakUrduFahad, stopUrduSpeech } from '../../services/urduVoiceService';

export const HtmlTeensStudio = ({ standalone = false }) => {
  // Navigation State
  const [activeModuleId, setActiveModuleId] = useState(1);
  const [activeLessonIndex, setActiveLessonIndex] = useState(0);

  // Active View: 'lesson' | 'quiz' | 'exam'
  const [activeView, setActiveView] = useState('lesson');

  // Preview Mode: 'desktop' | 'mobile'
  const [previewDevice, setPreviewDevice] = useState('desktop');

  // Code Playground State
  const [userCode, setUserCode] = useState('');
  const [copiedCode, setCopiedCode] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [showSolution, setShowSolution] = useState(false);

  // Audio Speech State
  const [speakingLanguage, setSpeakingLanguage] = useState(null); // 'en' | 'ur' | null

  // Progress tracking in localStorage
  const [completedLessons, setCompletedLessons] = useState(() => {
    try {
      const saved = localStorage.getItem('dten_html_teens_completed');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Module Quiz State
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizScore, setQuizScore] = useState(0);

  // Final Exam State
  const [examAnswers, setExamAnswers] = useState({});
  const [examSubmitted, setExamSubmitted] = useState(false);
  const [examScore, setExamScore] = useState(0);
  const [showCertificate, setShowCertificate] = useState(false);

  // Active Module & Lesson
  const currentModule = useMemo(() => {
    return HTML_TEENS_COURSE.modules.find(m => m.id === activeModuleId) || HTML_TEENS_COURSE.modules[0];
  }, [activeModuleId]);

  const currentLesson = useMemo(() => {
    return currentModule.lessons[activeLessonIndex] || currentModule.lessons[0];
  }, [currentModule, activeLessonIndex]);

  // Load starter code on lesson change
  useEffect(() => {
    if (currentLesson) {
      setUserCode(currentLesson.starterCode);
      setShowHint(false);
      setShowSolution(false);
      stopSpeaking();
    }
  }, [currentLesson?.id]);

  // Save progress
  useEffect(() => {
    try {
      localStorage.setItem('dten_html_teens_completed', JSON.stringify(completedLessons));
    } catch {
      // ignore
    }
  }, [completedLessons]);

  // HTML Validation on live code
  const validation = useMemo(() => {
    return validateHtmlCode(userCode);
  }, [userCode]);

  // Live sandbox document
  const sandboxHtml = useMemo(() => {
    return buildSandboxHtml(userCode);
  }, [userCode]);

  // Mark current lesson as complete
  const markLessonComplete = (lessonId) => {
    if (!completedLessons.includes(lessonId)) {
      const updated = [...completedLessons, lessonId];
      setCompletedLessons(updated);
      triggerCelebration();
    }
  };

  const triggerCelebration = () => {
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.8 }
      });
    } catch {
      // ignore
    }
  };

  // Text to Speech for English and Urdu voices
  const speakText = (text, langCode) => {
    stopSpeaking();

    if (langCode === 'ur') {
      setSpeakingLanguage('ur');
      // Look for pre-recorded audio in /audio/htmlTeens/{lessonId}_urdu.mp3
      speakUrduFahad({
        text,
        lessonId: currentLesson?.id,
        courseType: 'htmlTeens',
        onStart: () => setSpeakingLanguage('ur'),
        onEnd: () => setSpeakingLanguage(null),
        onError: () => setSpeakingLanguage(null),
      });
      return;
    }

    if (!window.speechSynthesis) return;
    setSpeakingLanguage('en');

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    utterance.rate = 0.95;
    utterance.pitch = 1.05;

    utterance.onend = () => setSpeakingLanguage(null);
    utterance.onerror = () => setSpeakingLanguage(null);

    window.speechSynthesis.speak(utterance);
  };

  const stopSpeaking = () => {
    stopUrduSpeech();
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    setSpeakingLanguage(null);
  };

  // Reset to starter code
  const handleResetCode = () => {
    setUserCode(currentLesson.starterCode);
    setShowHint(false);
  };

  // Copy code helper
  const handleCopyCode = () => {
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(userCode);
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    }
  };

  // Insert Solution into Editor
  const handleInsertSolution = () => {
    setUserCode(currentLesson.solution);
    setShowSolution(false);
    markLessonComplete(currentLesson.id);
  };

  // Module Quiz Submission
  const handleQuizAnswer = (qIdx, optIdx) => {
    setQuizAnswers(prev => ({ ...prev, [qIdx]: optIdx }));
  };

  const submitModuleQuiz = () => {
    let score = 0;
    const questions = currentModule.quiz.questions;
    questions.forEach((q, idx) => {
      if (quizAnswers[idx] === q.answer) {
        score++;
      }
    });
    setQuizScore(score);
    setQuizSubmitted(true);

    if (score >= Math.ceil(questions.length * 0.6)) {
      triggerCelebration();
    }
  };

  const resetModuleQuiz = () => {
    setQuizAnswers({});
    setQuizSubmitted(false);
    setQuizScore(0);
  };

  // Final Exam Submission
  const handleExamAnswer = (qIdx, optIdx) => {
    setExamAnswers(prev => ({ ...prev, [qIdx]: optIdx }));
  };

  const submitFinalExam = () => {
    let score = 0;
    const questions = HTML_TEENS_COURSE.finalExam.questions;
    questions.forEach((q, idx) => {
      if (examAnswers[idx] === q.answer) {
        score++;
      }
    });
    setExamScore(score);
    setExamSubmitted(true);

    if (score >= HTML_TEENS_COURSE.finalExam.passingScore) {
      triggerCelebration();
      setTimeout(() => {
        try {
          confetti({
            particleCount: 100,
            spread: 90,
            origin: { y: 0.6 }
          });
        } catch {}
      }, 300);
    }
  };

  const resetFinalExam = () => {
    setExamAnswers({});
    setExamSubmitted(false);
    setExamScore(0);
  };

  // Overall Progress
  const totalLessonsCount = 21;
  const progressPercent = Math.min(100, Math.round((completedLessons.length / totalLessonsCount) * 100));

  return (
    <div className="w-full min-h-screen bg-slate-900 text-slate-100 flex flex-col font-sans selection:bg-blue-600 selection:text-white">
      
      {/* ─────────────────────────────────────────────────────────────
          TOP APP HEADER & TEEN PROGRESS BAR
      ───────────────────────────────────────────────────────────── */}
      <header className="bg-slate-950/90 border-b border-slate-800 sticky top-0 z-40 backdrop-blur-md px-4 sm:px-6 py-3">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
          
          {/* Logo & Course Title */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-blue-600 to-cyan-500 flex items-center justify-center text-white font-extrabold shadow-lg shadow-blue-500/20 text-lg">
              &lt;/&gt;
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base sm:text-lg font-extrabold text-white tracking-tight">
                  HTML5 Web Developer
                </h1>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-blue-500/20 text-blue-400 border border-blue-500/30 uppercase tracking-wider">
                  Teen Coder (13–16 Yrs)
                </span>
              </div>
              <p className="text-xs text-slate-400 font-urdu font-medium" dir="rtl">
                ایچ ٹی ایم ایل 5 ویب ڈویلپمنٹ برائے پاکستانی نوجوان طلبہ 🇵🇰
              </p>
            </div>
          </div>

          {/* Progress Bar & Actions */}
          <div className="flex items-center gap-4 w-full md:w-auto justify-end">
            <div className="flex-1 md:w-48 bg-slate-800 rounded-full h-2.5 overflow-hidden border border-slate-700">
              <div 
                className="bg-gradient-to-r from-blue-500 to-cyan-400 h-full rounded-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <div className="text-xs font-bold text-cyan-400 whitespace-nowrap">
              {completedLessons.length} / {totalLessonsCount} Completed ({progressPercent}%)
            </div>

            {/* Quick Final Exam Button */}
            <button
              onClick={() => setActiveView('exam')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm ${
                activeView === 'exam'
                  ? 'bg-amber-500 text-slate-950 font-black'
                  : 'bg-amber-500/10 text-amber-300 border border-amber-500/30 hover:bg-amber-500/20'
              }`}
            >
              <Trophy className="w-3.5 h-3.5" />
              Final Exam
            </button>
          </div>
        </div>
      </header>

      {/* ─────────────────────────────────────────────────────────────
          7 MODULES HORIZONTAL TABS CAROUSEL
      ───────────────────────────────────────────────────────────── */}
      <nav className="bg-slate-900/90 border-b border-slate-800 px-4 sm:px-6 py-2 overflow-x-auto scrollbar-thin">
        <div className="max-w-7xl mx-auto flex items-center gap-2 min-w-max">
          {HTML_TEENS_COURSE.modules.map((m) => {
            const isCurrentModule = activeModuleId === m.id && activeView !== 'exam';
            const moduleCompletedCount = m.lessons.filter(l => completedLessons.includes(l.id)).length;
            const isAllCompleted = moduleCompletedCount === m.lessons.length;

            return (
              <button
                key={m.id}
                onClick={() => {
                  setActiveModuleId(m.id);
                  setActiveLessonIndex(0);
                  setActiveView('lesson');
                }}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all border ${
                  isCurrentModule
                    ? 'bg-blue-600 text-white border-blue-500 shadow-md shadow-blue-600/30'
                    : 'bg-slate-800/80 hover:bg-slate-800 text-slate-300 border-slate-700/80 hover:border-slate-600'
                }`}
              >
                <span>{m.id}. {m.title.split(':')[0]}</span>
                {isAllCompleted ? (
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                ) : (
                  <span className="text-[10px] px-1.5 py-0.2 rounded-md bg-slate-900/60 text-slate-400 font-mono">
                    {moduleCompletedCount}/3
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </nav>

      {/* ─────────────────────────────────────────────────────────────
          MAIN CONTENT AREA
      ───────────────────────────────────────────────────────────── */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 flex flex-col gap-6">

        {/* ─── VIEW 1: FINAL CERTIFICATION EXAM ─── */}
        {activeView === 'exam' && (
          <div className="bg-slate-950 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl">
            <div className="flex flex-col sm:flex-row items-center justify-between pb-6 border-b border-slate-800 gap-4">
              <div>
                <span className="px-3 py-1 rounded-full text-xs font-black bg-amber-500/20 text-amber-300 border border-amber-500/30 uppercase tracking-widest inline-flex items-center gap-1.5">
                  <Trophy className="w-3.5 h-3.5" />
                  Official Certification
                </span>
                <h2 className="text-xl sm:text-2xl font-black text-white mt-2">
                  {HTML_TEENS_COURSE.finalExam.title}
                </h2>
                <h3 className="text-sm sm:text-base font-urdu font-bold text-amber-400 mt-1" dir="rtl">
                  {HTML_TEENS_COURSE.finalExam.urduTitle}
                </h3>
              </div>
              <button
                onClick={() => setActiveView('lesson')}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700"
              >
                ← Back to Lessons
              </button>
            </div>

            {/* Questions List */}
            <div className="space-y-6 my-6">
              {HTML_TEENS_COURSE.finalExam.questions.map((q, qIdx) => {
                const selectedOpt = examAnswers[qIdx];
                const isAnswered = selectedOpt !== undefined;

                return (
                  <div key={qIdx} className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h4 className="text-sm sm:text-base font-bold text-slate-100">
                          {q.question}
                        </h4>
                        <p className="text-xs sm:text-sm font-urdu font-semibold text-amber-300 mt-1" dir="rtl">
                          {q.urduQuestion}
                        </p>
                      </div>
                      <span className="px-2 py-1 rounded-lg bg-slate-800 text-slate-400 text-xs font-mono">
                        Q{qIdx + 1}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                      {q.options.map((opt, optIdx) => {
                        const isSelected = selectedOpt === optIdx;
                        let btnStyle = "bg-slate-800/80 hover:bg-slate-800 text-slate-300 border-slate-700";

                        if (examSubmitted) {
                          if (optIdx === q.answer) {
                            btnStyle = "bg-emerald-600/30 text-emerald-200 border-emerald-500 font-bold";
                          } else if (isSelected && optIdx !== q.answer) {
                            btnStyle = "bg-rose-600/30 text-rose-200 border-rose-500";
                          }
                        } else if (isSelected) {
                          btnStyle = "bg-blue-600 text-white border-blue-500 font-bold shadow-md";
                        }

                        return (
                          <button
                            key={optIdx}
                            disabled={examSubmitted}
                            onClick={() => handleExamAnswer(qIdx, optIdx)}
                            className={`p-3 rounded-xl text-xs sm:text-sm text-left transition-all border ${btnStyle} flex items-center justify-between`}
                          >
                            <span>{opt}</span>
                            {examSubmitted && optIdx === q.answer && (
                              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 ml-2" />
                            )}
                          </button>
                        );
                      })}
                    </div>

                    {examSubmitted && (
                      <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-slate-300">
                        <strong className="text-amber-400">Explanation: </strong>
                        {q.explanation}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Exam Action Bar */}
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
              {!examSubmitted ? (
                <>
                  <div className="text-xs text-slate-400">
                    Answer all 10 questions. Need <strong>7 / 10 (70%)</strong> to earn your Official D.TEN HTML5 Diploma.
                  </div>
                  <button
                    onClick={submitFinalExam}
                    disabled={Object.keys(examAnswers).length < HTML_TEENS_COURSE.finalExam.questions.length}
                    className={`px-6 py-3 rounded-2xl text-sm font-black transition-all shadow-lg ${
                      Object.keys(examAnswers).length >= HTML_TEENS_COURSE.finalExam.questions.length
                        ? 'bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white shadow-blue-600/30'
                        : 'bg-slate-800 text-slate-500 border border-slate-700 cursor-not-allowed'
                    }`}
                  >
                    Submit Exam for Grading 🎯
                  </button>
                </>
              ) : (
                <>
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black text-xl ${
                      examScore >= HTML_TEENS_COURSE.finalExam.passingScore
                        ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/30'
                        : 'bg-rose-500 text-white shadow-lg shadow-rose-500/30'
                    }`}>
                      {examScore}/10
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-white">
                        {examScore >= HTML_TEENS_COURSE.finalExam.passingScore ? '🎉 Congratulations! You Passed!' : 'Almost There! Try Again.'}
                      </h4>
                      <p className="text-xs text-slate-400">
                        {examScore >= HTML_TEENS_COURSE.finalExam.passingScore
                          ? 'You are now an officially certified Junior HTML5 Web Developer.'
                          : 'Review the lessons and re-take the exam to claim your diploma.'}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={resetFinalExam}
                      className="px-4 py-2.5 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700"
                    >
                      <RotateCcw className="w-3.5 h-3.5 inline mr-1" />
                      Retake Exam
                    </button>
                    {examScore >= HTML_TEENS_COURSE.finalExam.passingScore && (
                      <button
                        onClick={() => setShowCertificate(true)}
                        className="px-6 py-2.5 rounded-xl text-xs font-black bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-950 shadow-lg shadow-amber-400/20 hover:scale-105 transition-all flex items-center gap-2"
                      >
                        <Award className="w-4 h-4" />
                        Claim D.TEN Certificate 📜
                      </button>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        )}

        {/* ─── VIEW 2: MODULE END QUIZ ─── */}
        {activeView === 'quiz' && (
          <div className="bg-slate-950 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
            <div className="flex flex-col sm:flex-row items-center justify-between pb-4 border-b border-slate-800 gap-3">
              <div>
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-500/20 text-blue-400 border border-blue-500/30 uppercase tracking-wider">
                  Module {activeModuleId} Knowledge Check
                </span>
                <h2 className="text-xl font-black text-white mt-1.5">
                  {currentModule.quiz.title}
                </h2>
                <h3 className="text-sm font-urdu font-bold text-amber-400 mt-0.5" dir="rtl">
                  {currentModule.quiz.urduTitle}
                </h3>
              </div>
              <button
                onClick={() => setActiveView('lesson')}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700"
              >
                ← Return to Editor
              </button>
            </div>

            <div className="space-y-4">
              {currentModule.quiz.questions.map((q, qIdx) => {
                const selectedOpt = quizAnswers[qIdx];

                return (
                  <div key={qIdx} className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
                    <h4 className="text-sm font-bold text-slate-100">
                      {qIdx + 1}. {q.question}
                    </h4>
                    <p className="text-xs font-urdu font-semibold text-amber-300" dir="rtl">
                      {q.urduQuestion}
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {q.options.map((opt, optIdx) => {
                        const isSelected = selectedOpt === optIdx;
                        let btnStyle = "bg-slate-800/80 hover:bg-slate-800 text-slate-300 border-slate-700";

                        if (quizSubmitted) {
                          if (optIdx === q.answer) {
                            btnStyle = "bg-emerald-600/30 text-emerald-200 border-emerald-500 font-bold";
                          } else if (isSelected && optIdx !== q.answer) {
                            btnStyle = "bg-rose-600/30 text-rose-200 border-rose-500";
                          }
                        } else if (isSelected) {
                          btnStyle = "bg-blue-600 text-white border-blue-500 font-bold";
                        }

                        return (
                          <button
                            key={optIdx}
                            disabled={quizSubmitted}
                            onClick={() => handleQuizAnswer(qIdx, optIdx)}
                            className={`p-3 rounded-xl text-xs text-left transition-all border ${btnStyle} flex items-center justify-between`}
                          >
                            <span>{opt}</span>
                            {quizSubmitted && optIdx === q.answer && (
                              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                            )}
                          </button>
                        );
                      })}
                    </div>

                    {quizSubmitted && (
                      <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-400">
                        <strong className="text-amber-400">Note: </strong> {q.explanation}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="flex items-center justify-between pt-2">
              {!quizSubmitted ? (
                <button
                  onClick={submitModuleQuiz}
                  disabled={Object.keys(quizAnswers).length < currentModule.quiz.questions.length}
                  className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                    Object.keys(quizAnswers).length >= currentModule.quiz.questions.length
                      ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-md shadow-blue-600/30'
                      : 'bg-slate-800 text-slate-500 border border-slate-700 cursor-not-allowed'
                  }`}
                >
                  Grade My Quiz ✨
                </button>
              ) : (
                <div className="flex items-center gap-3 w-full justify-between">
                  <div className="text-sm font-bold text-slate-200">
                    Your Score: <span className="text-emerald-400">{quizScore}</span> / {currentModule.quiz.questions.length}
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={resetModuleQuiz}
                      className="px-3 py-1.5 rounded-lg text-xs font-bold bg-slate-800 text-slate-300 border border-slate-700"
                    >
                      Retry
                    </button>
                    {activeModuleId < 7 ? (
                      <button
                        onClick={() => {
                          setActiveModuleId(prev => prev + 1);
                          setActiveLessonIndex(0);
                          setActiveView('lesson');
                          resetModuleQuiz();
                        }}
                        className="px-4 py-1.5 rounded-lg text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white"
                      >
                        Next Module ➔
                      </button>
                    ) : (
                      <button
                        onClick={() => setActiveView('exam')}
                        className="px-4 py-1.5 rounded-lg text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950"
                      >
                        Proceed to Final Exam 🎓
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ─── VIEW 3: INTERACTIVE LESSON STUDIO (EDITOR + LIVE PREVIEW) ─── */}
        {activeView === 'lesson' && (
          <div className="space-y-6">
            
            {/* 3 Lessons Bar of Current Module */}
            <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-2xl bg-slate-950/70 border border-slate-800">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-400">
                  Module {activeModuleId} Lessons:
                </span>
                <div className="flex items-center gap-1.5">
                  {currentModule.lessons.map((les, idx) => {
                    const isSelected = activeLessonIndex === idx;
                    const isDone = completedLessons.includes(les.id);

                    return (
                      <button
                        key={les.id}
                        onClick={() => setActiveLessonIndex(idx)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border flex items-center gap-1.5 ${
                          isSelected
                            ? 'bg-blue-600 text-white border-blue-500 shadow-md shadow-blue-600/30'
                            : 'bg-slate-900 text-slate-300 border-slate-800 hover:border-slate-700'
                        }`}
                      >
                        {isDone && <Check className="w-3 h-3 text-emerald-400" />}
                        Lesson {idx + 1}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Module Quiz Trigger */}
              <button
                onClick={() => {
                  setActiveView('quiz');
                  resetModuleQuiz();
                }}
                className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-blue-500/10 hover:bg-blue-500/20 text-blue-300 border border-blue-500/30 transition-all flex items-center gap-1.5"
              >
                <HelpCircle className="w-3.5 h-3.5" />
                Take Module {activeModuleId} Quiz
              </button>
            </div>

            {/* Lesson Banner Card with Bilingual Audio Narration */}
            <div className="p-5 sm:p-6 rounded-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 border border-slate-800 shadow-xl space-y-4">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-extrabold bg-blue-500/20 text-blue-400 border border-blue-500/30 uppercase tracking-wider">
                      {currentModule.badge}
                    </span>
                    <span className="text-xs text-slate-400 font-mono">
                      Lesson {activeLessonIndex + 1} of 3
                    </span>
                  </div>
                  <h2 className="text-lg sm:text-xl font-black text-white mt-1">
                    {currentLesson.title}
                  </h2>
                  <h3 className="text-base sm:text-lg font-urdu font-bold text-amber-400" dir="rtl">
                    {currentLesson.urduTitle}
                  </h3>
                </div>

                {/* Audio Narration Buttons */}
                <div className="flex flex-wrap items-center gap-2">
                  {/* Urdu Voice Narration */}
                  <button
                    onClick={() => speakingLanguage === 'ur' ? stopSpeaking() : speakText(currentLesson.urduVoice, 'ur')}
                    className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all border ${
                      speakingLanguage === 'ur'
                        ? 'bg-emerald-600 text-white border-emerald-700 shadow-md ring-2 ring-emerald-400 animate-pulse'
                        : 'bg-emerald-950/40 hover:bg-emerald-950/60 text-emerald-300 border-emerald-800'
                    }`}
                    title="سبق سنیں (اُردو آواز)"
                  >
                    <Volume2 className={`w-4 h-4 ${speakingLanguage === 'ur' ? 'animate-bounce text-yellow-300' : 'text-emerald-400'}`} />
                    <span className="font-urdu text-xs">
                      {speakingLanguage === 'ur' ? 'روکیں (Stop)' : '🎙️ اُردو آواز'}
                    </span>
                  </button>

                  {/* English Voice Narration */}
                  <button
                    onClick={() => speakingLanguage === 'en' ? stopSpeaking() : speakText(currentLesson.englishVoice, 'en')}
                    className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all border ${
                      speakingLanguage === 'en'
                        ? 'bg-blue-600 text-white border-blue-700 shadow-md ring-2 ring-blue-400 animate-pulse'
                        : 'bg-blue-950/40 hover:bg-blue-950/60 text-blue-300 border-blue-800'
                    }`}
                    title="Listen in English"
                  >
                    <Volume2 className={`w-4 h-4 ${speakingLanguage === 'en' ? 'animate-bounce' : ''}`} />
                    <span>{speakingLanguage === 'en' ? 'Stop Audio' : '🔊 English Voice'}</span>
                  </button>
                </div>
              </div>

              {/* Bilingual Concept Explanation */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 text-xs sm:text-sm text-slate-300 leading-relaxed space-y-1">
                  <div className="font-bold text-blue-400 text-xs uppercase tracking-wider">
                    Core Technical Concept:
                  </div>
                  <p>{currentLesson.concept}</p>
                </div>

                <div className="p-4 rounded-2xl bg-amber-950/20 border border-amber-900/40 text-xs sm:text-sm text-amber-200 leading-relaxed font-urdu text-right space-y-1" dir="rtl">
                  <div className="font-bold text-amber-400 text-xs tracking-wider">
                    تکنیکی تصور (اردو وضاحت):
                  </div>
                  <p>{currentLesson.urduConcept}</p>
                </div>
              </div>

              {/* Pakistani Teen Context Box */}
              <div className="p-3 rounded-xl bg-blue-950/30 border border-blue-900/40 flex items-center gap-2.5 text-xs text-blue-200">
                <Globe className="w-4 h-4 text-cyan-400 shrink-0" />
                <div>
                  <strong>🇵🇰 Pakistani Teen Context: </strong> {currentLesson.pakistaniContext}
                </div>
              </div>
            </div>

            {/* ─── SPLIT WORKSPACE: LEFT EDITOR | RIGHT LIVE SANDBOX PREVIEW ─── */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              
              {/* LEFT PANE: HTML CODE EDITOR */}
              <div className="flex flex-col bg-slate-950 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl min-h-[480px]">
                
                {/* Editor Header */}
                <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
                    <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
                    <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
                    <span className="ml-2 font-mono text-xs font-bold text-slate-400 flex items-center gap-1">
                      <Code className="w-3.5 h-3.5 text-blue-400" />
                      index.html
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleCopyCode}
                      className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 transition-all flex items-center gap-1"
                      title="Copy HTML to clipboard"
                    >
                      {copiedCode ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                      {copiedCode ? 'Copied' : 'Copy'}
                    </button>

                    <button
                      onClick={handleResetCode}
                      className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 transition-all flex items-center gap-1"
                      title="Reset code to lesson starter"
                    >
                      <RotateCcw className="w-3 h-3" />
                      Reset
                    </button>
                  </div>
                </div>

                {/* Textarea Code Editor */}
                <div className="relative flex-1 bg-slate-950 font-mono text-xs sm:text-sm">
                  <textarea
                    value={userCode}
                    onChange={(e) => setUserCode(e.target.value)}
                    spellCheck={false}
                    className="w-full h-full min-h-[380px] p-4 bg-transparent text-cyan-200 leading-relaxed font-mono resize-none focus:outline-none border-none selection:bg-blue-600"
                    placeholder="Enter your HTML5 code here..."
                  />
                </div>

                {/* Coding Challenge & Solution Footer */}
                <div className="p-4 bg-slate-900/90 border-t border-slate-800 space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className="text-xs text-slate-300">
                      <strong className="text-amber-400">⚡ Code Challenge: </strong>
                      {currentLesson.challenge}
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-slate-800/80">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setShowHint(!showHint)}
                        className="px-3 py-1 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 transition-all flex items-center gap-1"
                      >
                        <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
                        {showHint ? 'Hide Hint' : 'Show Hint'}
                      </button>

                      <button
                        onClick={() => setShowSolution(!showSolution)}
                        className="px-3 py-1 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 transition-all flex items-center gap-1"
                      >
                        <Sparkles className="w-3.5 h-3.5 text-blue-400" />
                        {showSolution ? 'Hide Solution' : 'View Solution'}
                      </button>
                    </div>

                    <button
                      onClick={() => markLessonComplete(currentLesson.id)}
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                        completedLessons.includes(currentLesson.id)
                          ? 'bg-emerald-600/30 text-emerald-300 border border-emerald-500/40'
                          : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-md'
                      }`}
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      {completedLessons.includes(currentLesson.id) ? 'Completed ✓' : 'Mark Completed'}
                    </button>
                  </div>

                  {/* Hint Reveal Box */}
                  {showHint && (
                    <div className="p-3 rounded-xl bg-amber-950/30 border border-amber-900/50 text-xs text-amber-200">
                      <strong>💡 Helpful Hint: </strong> {currentLesson.hint}
                    </div>
                  )}

                  {/* Solution Box with Insert Button */}
                  {showSolution && (
                    <div className="p-3 rounded-xl bg-blue-950/40 border border-blue-900/50 space-y-2">
                      <div className="flex items-center justify-between text-xs text-blue-300 font-bold">
                        <span>Solution Preview:</span>
                        <button
                          onClick={handleInsertSolution}
                          className="px-2 py-0.5 rounded bg-blue-600 hover:bg-blue-500 text-white text-[11px]"
                        >
                          Insert into Editor ➔
                        </button>
                      </div>
                      <pre className="p-2 rounded bg-slate-950 text-cyan-300 text-[11px] font-mono overflow-x-auto max-h-36">
                        {currentLesson.solution}
                      </pre>
                    </div>
                  )}
                </div>

              </div>

              {/* RIGHT PANE: LIVE SANDBOX WEB PREVIEW */}
              <div className="flex flex-col bg-slate-950 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl min-h-[480px]">
                
                {/* Browser Simulator Top Bar */}
                <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <span className="p-1 rounded bg-slate-800 text-slate-400">
                      <Globe className="w-3.5 h-3.5 text-emerald-400" />
                    </span>
                    <span className="text-xs font-mono text-slate-400 truncate max-w-[200px] sm:max-w-xs">
                      https://teen-dev.dten.pk/preview
                    </span>
                  </div>

                  {/* Desktop / Mobile Switcher */}
                  <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800">
                    <button
                      onClick={() => setPreviewDevice('desktop')}
                      className={`p-1.5 rounded-lg transition-all ${
                        previewDevice === 'desktop'
                          ? 'bg-blue-600 text-white shadow-sm'
                          : 'text-slate-400 hover:text-slate-200'
                      }`}
                      title="Desktop Monitor View"
                    >
                      <Monitor className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => setPreviewDevice('mobile')}
                      className={`p-1.5 rounded-lg transition-all ${
                        previewDevice === 'mobile'
                          ? 'bg-blue-600 text-white shadow-sm'
                          : 'text-slate-400 hover:text-slate-200'
                      }`}
                      title="Mobile Smartphone View"
                    >
                      <Smartphone className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Real-time Validation Bar */}
                {validation.errors.length > 0 && (
                  <div className="px-4 py-2 bg-rose-950/60 border-b border-rose-900/60 text-xs text-rose-300 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
                      <span>{validation.errors[0].english}</span>
                    </div>
                    <span className="font-urdu text-[11px] text-rose-200 hidden sm:inline" dir="rtl">
                      {validation.errors[0].urdu}
                    </span>
                  </div>
                )}

                {validation.warnings.length > 0 && validation.errors.length === 0 && (
                  <div className="px-4 py-1.5 bg-amber-950/50 border-b border-amber-900/50 text-xs text-amber-300 flex items-center gap-2">
                    <Lightbulb className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span>{validation.warnings[0].english}</span>
                  </div>
                )}

                {/* The Isolated Sandbox Web Iframe */}
                <div className="flex-1 bg-slate-900/50 p-4 flex items-center justify-center overflow-auto">
                  <div className={`transition-all duration-300 bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-700/80 ${
                    previewDevice === 'mobile'
                      ? 'w-[320px] h-[520px] ring-8 ring-slate-800'
                      : 'w-full h-full min-h-[400px]'
                  }`}>
                    <iframe
                      title="Live HTML Sandbox Preview"
                      srcDoc={sandboxHtml}
                      sandbox="allow-scripts allow-modals"
                      className="w-full h-full border-none bg-white"
                    />
                  </div>
                </div>

                {/* Live Inspector Stats Footer */}
                <div className="px-4 py-2 bg-slate-900 border-t border-slate-800 text-xs text-slate-400 flex items-center justify-between">
                  <div className="flex items-center gap-3 font-mono text-[11px]">
                    <span className="text-emerald-400 font-bold">● Live Sync</span>
                    <span>Elements: {validation.stats.tagsCount}</span>
                  </div>
                  <div className="text-[11px] text-slate-500">
                    D.TEN Sandbox v5.0
                  </div>
                </div>

              </div>

            </div>

            {/* Bottom Lesson Navigation */}
            <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-950 border border-slate-800">
              <button
                disabled={activeLessonIndex === 0 && activeModuleId === 1}
                onClick={() => {
                  if (activeLessonIndex > 0) {
                    setActiveLessonIndex(prev => prev - 1);
                  } else if (activeModuleId > 1) {
                    setActiveModuleId(prev => prev - 1);
                    setActiveLessonIndex(2);
                  }
                }}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                  activeLessonIndex === 0 && activeModuleId === 1
                    ? 'bg-slate-900 text-slate-600 border border-slate-800 cursor-not-allowed'
                    : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'
                }`}
              >
                <ChevronLeft className="w-4 h-4" />
                Previous Lesson
              </button>

              <div className="text-xs font-mono text-slate-400">
                Module {activeModuleId} • Lesson {activeLessonIndex + 1} of 3
              </div>

              <button
                onClick={() => {
                  if (activeLessonIndex < 2) {
                    setActiveLessonIndex(prev => prev + 1);
                  } else if (activeModuleId < 7) {
                    setActiveView('quiz');
                  } else {
                    setActiveView('exam');
                  }
                }}
                className="px-5 py-2 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white shadow-md shadow-blue-600/30 transition-all flex items-center gap-1.5"
              >
                {activeLessonIndex < 2 ? 'Next Lesson' : (activeModuleId < 7 ? 'Take Module Quiz' : 'Final Exam')}
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        )}

      </main>

      {/* ─────────────────────────────────────────────────────────────
          CERTIFICATE MODAL POPUP
      ───────────────────────────────────────────────────────────── */}
      {showCertificate && (
        <HtmlTeensCertificate
          finalScore={examScore}
          totalQuestions={10}
          onClose={() => setShowCertificate(false)}
        />
      )}

    </div>
  );
};
