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
  ExternalLink,
  Layers,
  Terminal,
  Languages,
  ArrowLeft,
  Maximize2,
  FileCode,
  RefreshCw,
  Lock
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { HTML_TEENS_COURSE } from '../../data/htmlTeensCourseData';
import { validateHtmlCode, buildSandboxHtml } from './HtmlValidator';
import { HtmlTeensCertificate } from './HtmlTeensCertificate';
import { speakUrduFahad, stopUrduSpeech } from '../../services/urduVoiceService';
import { useSEO } from '../../hooks/useSEO';

export const HtmlTeensStudio = ({ standalone = false }) => {
  useSEO(standalone ? {
    title: 'HTML & Web Development for Teens - Interactive Code Editor | D.TEN Academy',
    description: 'Learn HTML5 and modern web design tailored for teens ages 13-16. Interactive browser editor, real-time preview screen, coding challenges, Urdu audio commentary, and certificate.',
    keywords: 'HTML for teens, web development for beginners, learn HTML CSS Pakistan, teen coding projects, interactive HTML editor, D.TEN web design studio',
    canonicalUrl: 'https://dten.deesu.org/html-teens'
  } : {});
  // Navigation State
  const [activeModuleId, setActiveModuleId] = useState(1);
  const [activeLessonIndex, setActiveLessonIndex] = useState(0);

  // Active View: 'lesson' | 'quiz' | 'exam'
  const [activeView, setActiveView] = useState('lesson');

  // Lesson Step Mode: 'slides' | 'editor'
  const [lessonMode, setLessonMode] = useState('slides');
  const [activeSlide, setActiveSlide] = useState(0); // 0: Concept, 1: Glossary, 2: Example 1, 3: Example 2, 4: Challenge

  // Language Preference: Urdu Optional Toggle
  const [showUrdu, setShowUrdu] = useState(true);

  // Preview Mode: 'desktop' | 'mobile'
  const [previewDevice, setPreviewDevice] = useState('desktop');

  // Code Playground State
  const [userCode, setUserCode] = useState('');
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedExIndex, setCopiedExIndex] = useState(null);
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
      setActiveSlide(0);
      setLessonMode('slides');
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

  // Text to Speech
  const speakText = (text, langCode) => {
    stopSpeaking();

    if (langCode === 'ur') {
      setSpeakingLanguage('ur');
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

  const handleResetCode = () => {
    setUserCode(currentLesson.starterCode);
    setShowHint(false);
  };

  const handleCopyCode = () => {
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(userCode);
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    }
  };

  const handleCopyExample = (code, index) => {
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(code);
      setCopiedExIndex(index);
      setTimeout(() => setCopiedExIndex(null), 2000);
    }
  };

  const handleInsertSolution = () => {
    setUserCode(currentLesson.solution);
    setShowSolution(false);
    markLessonComplete(currentLesson.id);
  };

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

  // Progress metrics
  const totalLessonsCount = 21;
  const progressPercent = Math.min(100, Math.round((completedLessons.length / totalLessonsCount) * 100));

  // Editor line numbers
  const lineCount = useMemo(() => {
    return Math.max(1, (userCode || '').split('\n').length);
  }, [userCode]);

  // Clean, short labels for each module to prevent overcrowding
  const MODULE_NAV_ITEMS = [
    { id: 1, label: '1. Basics', short: 'Basics' },
    { id: 2, label: '2. Links', short: 'Links' },
    { id: 3, label: '3. Media', short: 'Media' },
    { id: 4, label: '4. Layouts', short: 'Layouts' },
    { id: 5, label: '5. Tables', short: 'Tables' },
    { id: 6, label: '6. Forms', short: 'Forms' },
    { id: 7, label: '7. Projects', short: 'Projects' }
  ];

  // Slide Deck Definitions
  const SLIDE_STEPS = [
    { id: 0, title: 'Concept', urduTitle: 'تصور اور مثال' },
    { id: 1, title: 'Vocabulary', urduTitle: 'نئے الفاظ' },
    { id: 2, title: 'Example 1', urduTitle: 'مثال 1' },
    { id: 3, title: 'Example 2', urduTitle: 'مثال 2' },
    { id: 4, title: 'Challenge', urduTitle: 'کوڈنگ چیلنج' }
  ];

  return (
    <div className="w-full min-h-screen bg-[#070b14] text-slate-100 flex flex-col font-sans selection:bg-blue-600 selection:text-white">
      
      {/* ─────────────────────────────────────────────────────────────
          1. SLIM & MINIMALIST GLASSMORPHIC HEADER
      ───────────────────────────────────────────────────────────── */}
      <header className="bg-slate-950/80 border-b border-slate-800/80 sticky top-0 z-40 backdrop-blur-xl px-4 sm:px-6 py-2">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
          
          {/* Brand Info */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-600 to-cyan-500 flex items-center justify-center text-white font-black text-sm shadow-md shadow-cyan-500/20">
              &lt;/&gt;
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-sm sm:text-base text-white tracking-tight">
                  HTML5 Studio
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                  Teens 13–16
                </span>
              </div>
            </div>
          </div>

          {/* Minimalist Progress Meter */}
          <div className="hidden md:flex items-center gap-3 bg-slate-900/60 border border-slate-800/80 rounded-xl px-3 py-1 text-xs">
            <span className="text-slate-400 font-medium">Progress</span>
            <div className="w-20 h-1.5 bg-slate-800 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <span className="text-cyan-400 font-mono font-bold">{completedLessons.length}/21 ({progressPercent}%)</span>
          </div>

          {/* Action & Voice Controls (Unified Single Row) */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            
            {/* Optional Urdu Switch */}
            <button
              onClick={() => setShowUrdu(!showUrdu)}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all border ${
                showUrdu
                  ? 'bg-amber-500/10 text-amber-300 border-amber-500/30'
                  : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-slate-200'
              }`}
              title="Toggle Urdu"
            >
              <Languages className="w-3.5 h-3.5 inline mr-1" />
              <span>{showUrdu ? 'اردو: آن' : 'اردو: آف'}</span>
            </button>

            {/* Urdu Voice Button */}
            <button
              onClick={() => speakingLanguage === 'ur' ? stopSpeaking() : speakText(currentLesson.urduVoice, 'ur')}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all border flex items-center gap-1 ${
                speakingLanguage === 'ur'
                  ? 'bg-emerald-600 text-white border-emerald-500 shadow-md animate-pulse'
                  : 'bg-slate-900 hover:bg-slate-800 text-emerald-400 border-slate-800'
              }`}
              title="اُردو آواز سنیں"
            >
              <Volume2 className="w-3.5 h-3.5" />
              <span className="font-urdu text-xs">{speakingLanguage === 'ur' ? 'روکیں' : '🎙️ اُردو آواز'}</span>
            </button>

            {/* English Voice Button */}
            <button
              onClick={() => speakingLanguage === 'en' ? stopSpeaking() : speakText(currentLesson.englishVoice, 'en')}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all border flex items-center gap-1 ${
                speakingLanguage === 'en'
                  ? 'bg-blue-600 text-white border-blue-500 shadow-md animate-pulse'
                  : 'bg-slate-900 hover:bg-slate-800 text-blue-400 border-slate-800'
              }`}
              title="Listen in English"
            >
              <Volume2 className="w-3.5 h-3.5" />
              <span>{speakingLanguage === 'en' ? 'Stop' : '🔊 English'}</span>
            </button>

            {/* Exam Button */}
            <button
              onClick={() => setActiveView('exam')}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all border flex items-center gap-1 ${
                activeView === 'exam'
                  ? 'bg-amber-500 text-slate-950 font-black border-amber-400'
                  : 'bg-amber-500/10 text-amber-300 border-amber-500/30 hover:bg-amber-500/20'
              }`}
            >
              <Trophy className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Exam</span>
            </button>

          </div>
        </div>
      </header>

      {/* ─────────────────────────────────────────────────────────────
          2. CLEAN & COMPACT MODULE TRACK (NO OVERLAPPING TEXT)
      ───────────────────────────────────────────────────────────── */}
      <nav className="bg-slate-950/40 border-b border-slate-800/60 px-4 sm:px-6 py-2 overflow-x-auto scrollbar-thin">
        <div className="max-w-7xl mx-auto flex items-center gap-1.5 min-w-max">
          {MODULE_NAV_ITEMS.map((item) => {
            const mData = HTML_TEENS_COURSE.modules.find(m => m.id === item.id);
            const isCurrentModule = activeModuleId === item.id && activeView !== 'exam';
            const moduleCompletedCount = mData.lessons.filter(l => completedLessons.includes(l.id)).length;
            const isAllCompleted = moduleCompletedCount === mData.lessons.length;

            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveModuleId(item.id);
                  setActiveLessonIndex(0);
                  setActiveView('lesson');
                  setLessonMode('slides');
                  setActiveSlide(0);
                }}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${
                  isCurrentModule
                    ? 'bg-blue-600 text-white border-blue-400 shadow-md shadow-blue-600/25'
                    : 'bg-slate-900/60 hover:bg-slate-850 text-slate-300 border-slate-800'
                }`}
              >
                <span>{item.label}</span>
                {isAllCompleted ? (
                  <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                ) : (
                  <span className={`text-[10px] px-1.5 py-0.2 rounded font-mono ${
                    isCurrentModule ? 'bg-black/25 text-white' : 'bg-slate-950 text-slate-400'
                  }`}>
                    {moduleCompletedCount}/3
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </nav>

      {/* ─────────────────────────────────────────────────────────────
          3. MAIN CONTENT WORKSPACE
      ───────────────────────────────────────────────────────────── */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 flex flex-col gap-4">

        {/* ─── VIEW 1: FINAL EXAM (WITH GAUGE SCORE METER) ─── */}
        {activeView === 'exam' && (
          <div className="bg-slate-950/80 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl">
            <div className="flex flex-col sm:flex-row items-center justify-between pb-4 border-b border-slate-800 gap-3">
              <div>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-amber-500/20 text-amber-300 border border-amber-500/30 uppercase tracking-widest inline-flex items-center gap-1">
                  <Trophy className="w-3 h-3" />
                  Official D.TEN Certification
                </span>
                <h2 className="text-xl sm:text-2xl font-black text-white mt-1">
                  {HTML_TEENS_COURSE.finalExam.title}
                </h2>
                {showUrdu && (
                  <h3 className="text-sm font-urdu font-bold text-amber-400 mt-0.5" dir="rtl">
                    {HTML_TEENS_COURSE.finalExam.urduTitle}
                  </h3>
                )}
              </div>
              <button
                onClick={() => setActiveView('lesson')}
                className="px-3 py-1.5 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700"
              >
                ← Back to Lessons
              </button>
            </div>

            {/* Questions with Accent Borders */}
            <div className="space-y-4 my-6">
              {HTML_TEENS_COURSE.finalExam.questions.map((q, qIdx) => {
                const selectedOpt = examAnswers[qIdx];

                return (
                  <div key={qIdx} className="p-4 sm:p-5 rounded-2xl bg-slate-900/50 border border-slate-800/80 border-l-4 border-l-cyan-500 space-y-3">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h4 className="text-sm sm:text-base font-bold text-slate-100">
                          {q.question}
                        </h4>
                        {showUrdu && (
                          <p className="text-xs sm:text-sm font-urdu font-semibold text-amber-300/90 mt-1" dir="rtl">
                            {q.urduQuestion}
                          </p>
                        )}
                      </div>
                      <span className="px-2 py-0.5 rounded bg-slate-800 text-cyan-300 text-xs font-mono font-bold shrink-0">
                        Q{qIdx + 1}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                      {q.options.map((opt, optIdx) => {
                        const isSelected = selectedOpt === optIdx;
                        let btnStyle = "bg-slate-950/60 hover:bg-slate-800/60 text-slate-300 border-slate-800";

                        if (examSubmitted) {
                          if (optIdx === q.answer) {
                            btnStyle = "bg-emerald-600/30 text-emerald-200 border-emerald-500 font-bold";
                          } else if (isSelected && optIdx !== q.answer) {
                            btnStyle = "bg-rose-600/30 text-rose-200 border-rose-500";
                          }
                        } else if (isSelected) {
                          btnStyle = "bg-blue-600 text-white border-blue-400 font-bold shadow-md";
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
                      <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-slate-300 flex items-start gap-2">
                        <Lightbulb className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                        <div>
                          <strong className="text-amber-400">Explanation: </strong>
                          {q.explanation}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Exam Action Bar with Gauge Meter */}
            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
              {!examSubmitted ? (
                <>
                  <div className="text-xs text-slate-400">
                    Answer all 10 questions. Need <strong className="text-white">7/10 (70%)</strong> to pass and earn your Diploma.
                  </div>
                  <button
                    onClick={submitFinalExam}
                    disabled={Object.keys(examAnswers).length < HTML_TEENS_COURSE.finalExam.questions.length}
                    className={`px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all shadow-md ${
                      Object.keys(examAnswers).length >= HTML_TEENS_COURSE.finalExam.questions.length
                        ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-blue-600/30'
                        : 'bg-slate-800 text-slate-500 border border-slate-700 cursor-not-allowed'
                    }`}
                  >
                    Submit Exam for Grading 🎯
                  </button>
                </>
              ) : (
                <>
                  <div className="flex items-center gap-4">
                    <div className="relative w-16 h-16 shrink-0 flex items-center justify-center">
                      <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                        <circle cx="50" cy="50" r="40" className="stroke-slate-800" strokeWidth="8" fill="transparent" />
                        <circle
                          cx="50"
                          cy="50"
                          r="40"
                          className={examScore >= HTML_TEENS_COURSE.finalExam.passingScore ? "stroke-emerald-400" : "stroke-rose-500"}
                          strokeWidth="8"
                          strokeDasharray={251.2}
                          strokeDashoffset={251.2 - (251.2 * (examScore / 10))}
                          strokeLinecap="round"
                          fill="transparent"
                          style={{ transition: 'stroke-dashoffset 1s ease-in-out' }}
                        />
                      </svg>
                      <span className="absolute text-sm font-black text-white font-mono">{examScore * 10}%</span>
                    </div>

                    <div>
                      <h4 className="text-sm sm:text-base font-bold text-white">
                        {examScore >= HTML_TEENS_COURSE.finalExam.passingScore ? '🎉 You Passed!' : 'Almost There! Try Again.'}
                      </h4>
                      <p className="text-xs text-slate-400">
                        Score: <span className="text-cyan-400 font-mono font-bold">{examScore}/10</span>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={resetFinalExam}
                      className="px-3.5 py-2 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700"
                    >
                      <RotateCcw className="w-3.5 h-3.5 inline mr-1" />
                      Retake
                    </button>
                    {examScore >= HTML_TEENS_COURSE.finalExam.passingScore && (
                      <button
                        onClick={() => setShowCertificate(true)}
                        className="px-5 py-2 rounded-xl text-xs font-black bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-950 shadow-md shadow-amber-400/20"
                      >
                        <Award className="w-3.5 h-3.5 inline mr-1" />
                        Claim Certificate 📜
                      </button>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        )}

        {/* ─── VIEW 2: MODULE QUIZ (WITH ACCENT BORDERS) ─── */}
        {activeView === 'quiz' && (
          <div className="bg-slate-950/80 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div>
                <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">
                  Module {activeModuleId} Knowledge Check
                </span>
                <h2 className="text-lg sm:text-xl font-bold text-white mt-1">
                  {currentModule.quiz.title}
                </h2>
              </div>
              <button
                onClick={() => setActiveView('lesson')}
                className="px-3 py-1.5 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700"
              >
                ← Return to Lesson
              </button>
            </div>

            <div className="space-y-3.5">
              {currentModule.quiz.questions.map((q, qIdx) => {
                const selectedOpt = quizAnswers[qIdx];

                return (
                  <div key={qIdx} className="p-4 rounded-2xl bg-slate-900/50 border border-slate-800/80 border-l-4 border-l-blue-500 space-y-2.5">
                    <h4 className="text-sm font-bold text-slate-100">
                      {qIdx + 1}. {q.question}
                    </h4>
                    {showUrdu && (
                      <p className="text-xs font-urdu font-semibold text-amber-300" dir="rtl">
                        {q.urduQuestion}
                      </p>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {q.options.map((opt, optIdx) => {
                        const isSelected = selectedOpt === optIdx;
                        let btnStyle = "bg-slate-950/60 hover:bg-slate-800/60 text-slate-300 border-slate-800";

                        if (quizSubmitted) {
                          if (optIdx === q.answer) {
                            btnStyle = "bg-emerald-600/30 text-emerald-200 border-emerald-500 font-bold";
                          } else if (isSelected && optIdx !== q.answer) {
                            btnStyle = "bg-rose-600/30 text-rose-200 border-rose-500";
                          }
                        } else if (isSelected) {
                          btnStyle = "bg-blue-600 text-white border-blue-400 font-bold";
                        }

                        return (
                          <button
                            key={optIdx}
                            disabled={quizSubmitted}
                            onClick={() => handleQuizAnswer(qIdx, optIdx)}
                            className={`p-2.5 rounded-xl text-xs text-left transition-all border ${btnStyle} flex items-center justify-between`}
                          >
                            <span>{opt}</span>
                            {quizSubmitted && optIdx === q.answer && (
                              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 ml-1" />
                            )}
                          </button>
                        );
                      })}
                    </div>

                    {quizSubmitted && (
                      <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300">
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
                      ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-md'
                      : 'bg-slate-800 text-slate-500 border border-slate-700 cursor-not-allowed'
                  }`}
                >
                  Grade My Quiz ✨
                </button>
              ) : (
                <div className="flex items-center justify-between w-full">
                  <div className="text-sm font-bold text-slate-200">
                    Score: <span className="text-emerald-400 font-mono font-black">{quizScore}</span> / {currentModule.quiz.questions.length}
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
                          setLessonMode('slides');
                          setActiveSlide(0);
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
                        Final Exam 🎓
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ─── VIEW 3: LESSON VIEW (CLEAN SLIDES OR CODE STUDIO) ─── */}
        {activeView === 'lesson' && (
          <div className="space-y-4">
            
            {/* UNIFIED SUB-BAR: LESSON TABS + MODE TOGGLE + QUIZ (ALL IN ONE ROW) */}
            <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-2.5 rounded-2xl bg-slate-950/70 border border-slate-800/80 backdrop-blur-md">
              
              {/* Lesson Tabs */}
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-bold text-slate-400 mr-1 hidden sm:inline">Lessons:</span>
                {currentModule.lessons.map((les, idx) => {
                  const isSelected = activeLessonIndex === idx;
                  const isDone = completedLessons.includes(les.id);

                  return (
                    <button
                      key={les.id}
                      onClick={() => {
                        setActiveLessonIndex(idx);
                        setLessonMode('slides');
                        setActiveSlide(0);
                      }}
                      className={`px-3 py-1 rounded-xl text-xs font-bold transition-all border flex items-center gap-1.5 ${
                        isSelected
                          ? 'bg-blue-600 text-white border-blue-400 shadow-sm'
                          : 'bg-slate-900 text-slate-300 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      {isDone && <Check className="w-3 h-3 text-emerald-400" />}
                      <span>Lesson {idx + 1}</span>
                    </button>
                  );
                })}
              </div>

              {/* View Mode Switcher & Quiz */}
              <div className="flex items-center gap-2">
                <div className="bg-slate-900 p-0.5 rounded-xl border border-slate-800 flex items-center">
                  <button
                    onClick={() => setLessonMode('slides')}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                      lessonMode === 'slides'
                        ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-sm'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>Slides</span>
                  </button>
                  <button
                    onClick={() => setLessonMode('editor')}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                      lessonMode === 'editor'
                        ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-sm'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <Code className="w-3.5 h-3.5" />
                    <span>Editor & Live</span>
                  </button>
                </div>

                <button
                  onClick={() => {
                    setActiveView('quiz');
                    resetModuleQuiz();
                  }}
                  className="px-2.5 py-1 rounded-xl text-xs font-bold bg-blue-500/10 hover:bg-blue-500/20 text-cyan-300 border border-blue-500/30 transition-all flex items-center gap-1"
                >
                  <HelpCircle className="w-3.5 h-3.5" />
                  <span>Quiz {activeModuleId}</span>
                </button>
              </div>

            </div>

            {/* ══════════════════════════════════════════════════════════════
                MODE A: SLIDE DECK (SPACIOUS, BEAUTIFUL & UNCLUTTERED)
            ══════════════════════════════════════════════════════════════ */}
            {lessonMode === 'slides' && (
              <div className="bg-slate-950/80 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col min-h-[540px] backdrop-blur-xl">
                
                {/* Clean Stepper Header */}
                <div className="px-5 py-3 bg-slate-900/60 border-b border-slate-800 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-cyan-400 font-mono">
                      {activeSlide + 1}/5
                    </span>
                    <span className="text-xs sm:text-sm font-bold text-white">
                      {SLIDE_STEPS[activeSlide].title}
                    </span>
                    {showUrdu && (
                      <span className="text-xs font-urdu text-amber-300 hidden sm:inline">
                        ({SLIDE_STEPS[activeSlide].urduTitle})
                      </span>
                    )}
                  </div>

                  {/* Stepper Pills */}
                  <div className="flex items-center gap-1.5">
                    {SLIDE_STEPS.map((s, idx) => (
                      <button
                        key={s.id}
                        onClick={() => setActiveSlide(idx)}
                        className={`w-7 h-7 rounded-lg text-xs font-bold transition-all border flex items-center justify-center ${
                          activeSlide === idx
                            ? 'bg-blue-600 text-white border-blue-400 shadow-sm scale-105'
                            : activeSlide > idx
                            ? 'bg-slate-900 text-emerald-400 border-slate-700'
                            : 'bg-slate-950 text-slate-500 border-slate-800 hover:text-slate-300'
                        }`}
                        title={s.title}
                      >
                        {idx + 1}
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={() => setLessonMode('editor')}
                    className="px-3 py-1.5 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-sm flex items-center gap-1 transition-all"
                  >
                    <span>Editor</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* SLIDE CANVAS BODY (GENEROUS SPACING & BEAUTIFUL TYPOGRAPHY) */}
                <div className="flex-1 p-6 sm:p-8 flex flex-col justify-center">
                  
                  {/* SLIDE 0: CONCEPT & REAL-WORLD ANALOGY */}
                  {activeSlide === 0 && (
                    <div className="max-w-4xl mx-auto w-full space-y-5">
                      <div>
                        <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                          {currentLesson.title}
                        </h2>
                        {showUrdu && (
                          <h3 className="text-base sm:text-lg font-urdu font-bold text-amber-400 mt-1" dir="rtl">
                            {currentLesson.urduTitle}
                          </h3>
                        )}
                      </div>

                      {/* Real-World Analogy */}
                      {currentLesson.analogy && (
                        <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-emerald-950/30 to-slate-900/60 border border-emerald-800/50 space-y-2">
                          <div className="flex items-center gap-1.5 text-emerald-400 font-bold text-xs uppercase tracking-wider">
                            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                            <span>Real-World Analogy (آسان مثال):</span>
                          </div>
                          <p className="text-xs sm:text-sm text-emerald-100 leading-relaxed">
                            {currentLesson.analogy}
                          </p>
                          {showUrdu && currentLesson.urduAnalogy && (
                            <p className="text-xs sm:text-sm font-urdu text-amber-300 leading-relaxed pt-1 border-t border-emerald-900/40" dir="rtl">
                              {currentLesson.urduAnalogy}
                            </p>
                          )}
                        </div>
                      )}

                      {/* Core Technical Concept */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                        <div className="p-4 rounded-2xl bg-slate-900/50 border border-slate-800 space-y-1.5">
                          <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-400">
                            Core Web Concept:
                          </h4>
                          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                            {currentLesson.concept}
                          </p>
                        </div>

                        {showUrdu ? (
                          <div className="p-4 rounded-2xl bg-amber-950/20 border border-amber-900/30 space-y-1.5 font-urdu text-right" dir="rtl">
                            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400">
                              تکنیکی تصور (وضاحت):
                            </h4>
                            <p className="text-xs sm:text-sm text-amber-200 leading-relaxed">
                              {currentLesson.urduConcept}
                            </p>
                          </div>
                        ) : (
                          <div className="p-4 rounded-2xl bg-slate-900/50 border border-slate-800 space-y-1.5">
                            <h4 className="text-xs font-bold uppercase tracking-wider text-teal-400">
                              Pakistani Teen Context:
                            </h4>
                            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                              {currentLesson.pakistaniContext}
                            </p>
                          </div>
                        )}
                      </div>

                      {showUrdu && (
                        <div className="p-3 rounded-xl bg-slate-900/40 border border-slate-800 text-xs text-slate-300 flex items-center gap-2">
                          <span className="text-base">🇵🇰</span>
                          <div>
                            <strong className="text-cyan-300">Pakistani Teen Context: </strong>
                            <span>{currentLesson.pakistaniContext}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* SLIDE 1: TECHNICAL TERMS GLOSSARY */}
                  {activeSlide === 1 && (
                    <div className="max-w-4xl mx-auto w-full space-y-4">
                      <div className="text-center space-y-1">
                        <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">
                          Vocabulary & Syntax Terms
                        </span>
                        <h3 className="text-lg sm:text-xl font-bold text-white">
                          New Terms Introduced in this Lesson
                        </h3>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {currentLesson.newTerms?.map((item, idx) => (
                          <div key={idx} className="p-3.5 rounded-2xl bg-slate-900/50 border border-slate-800 space-y-2">
                            <div className="flex items-center justify-between pb-1.5 border-b border-slate-800">
                              <span className="px-2 py-0.5 rounded bg-blue-600/20 text-cyan-300 font-mono text-xs font-bold border border-blue-500/30">
                                {item.term}
                              </span>
                              {showUrdu && (
                                <span className="text-xs font-urdu font-bold text-amber-300" dir="rtl">
                                  {item.urduTerm}
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-slate-300 leading-relaxed">
                              {item.definition}
                            </p>
                            {showUrdu && (
                              <p className="text-xs font-urdu text-amber-200/90 leading-relaxed pt-1 border-t border-slate-800/60" dir="rtl">
                                {item.urduDefinition}
                              </p>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* SLIDE 2: EXAMPLE 1 */}
                  {activeSlide === 2 && (
                    <div className="max-w-5xl mx-auto w-full space-y-3.5">
                      {currentLesson.examples && currentLesson.examples[0] ? (
                        <>
                          <div className="flex items-center justify-between">
                            <div>
                              <span className="text-xs font-mono text-cyan-400 uppercase font-bold">
                                Example 1 of 2 • Core Syntax
                              </span>
                              <h3 className="text-base sm:text-lg font-bold text-white">
                                {currentLesson.examples[0].title}
                              </h3>
                            </div>

                            <button
                              onClick={() => handleCopyExample(currentLesson.examples[0].code, 0)}
                              className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 flex items-center gap-1"
                            >
                              {copiedExIndex === 0 ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                              <span>{copiedExIndex === 0 ? 'Copied' : 'Copy'}</span>
                            </button>
                          </div>

                          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3.5 items-stretch">
                            {/* Code Box */}
                            <div className="rounded-2xl bg-slate-950 border border-slate-800 overflow-hidden flex flex-col">
                              <div className="px-3.5 py-1.5 bg-slate-900 border-b border-slate-800 text-[11px] font-mono text-slate-400 flex items-center justify-between">
                                <span>example1.html</span>
                                <span className="text-cyan-400">HTML5</span>
                              </div>
                              <pre className="p-3.5 font-mono text-xs text-cyan-200 overflow-x-auto flex-1 leading-relaxed bg-[#0b101e]">
                                {currentLesson.examples[0].code}
                              </pre>
                            </div>

                            {/* Live Output Mini Render */}
                            <div className="rounded-2xl bg-slate-950 border border-slate-800 overflow-hidden flex flex-col">
                              <div className="px-3.5 py-1.5 bg-slate-900 border-b border-slate-800 text-[11px] font-mono text-slate-400 flex items-center justify-between">
                                <span>Live Output</span>
                                <span className="text-emerald-400 font-bold">● Live</span>
                              </div>
                              <div className="p-3 bg-white text-slate-900 flex-1 overflow-auto rounded-b-2xl min-h-[140px]">
                                <iframe
                                  title="Mini Preview 1"
                                  srcDoc={buildSandboxHtml(currentLesson.examples[0].code)}
                                  className="w-full h-full min-h-[120px] border-none"
                                  sandbox="allow-scripts"
                                />
                              </div>
                            </div>
                          </div>

                          {/* Explanation */}
                          <div className="p-3.5 rounded-2xl bg-slate-900/50 border border-slate-800 space-y-1">
                            <h5 className="text-xs font-bold text-cyan-400 uppercase tracking-wider">
                              Why it works:
                            </h5>
                            <p className="text-xs text-slate-300 leading-relaxed">
                              {currentLesson.examples[0].explanation}
                            </p>
                            {showUrdu && (
                              <p className="text-xs font-urdu text-amber-200 leading-relaxed pt-1 border-t border-slate-800/60" dir="rtl">
                                {currentLesson.examples[0].urduExplanation}
                              </p>
                            )}
                          </div>
                        </>
                      ) : (
                        <p className="text-slate-400">Loading...</p>
                      )}
                    </div>
                  )}

                  {/* SLIDE 3: EXAMPLE 2 */}
                  {activeSlide === 3 && (
                    <div className="max-w-5xl mx-auto w-full space-y-3.5">
                      {currentLesson.examples && currentLesson.examples[1] ? (
                        <>
                          <div className="flex items-center justify-between">
                            <div>
                              <span className="text-xs font-mono text-teal-400 uppercase font-bold">
                                Example 2 of 2 • Pakistani Teen Project
                              </span>
                              <h3 className="text-base sm:text-lg font-bold text-white">
                                {currentLesson.examples[1].title}
                              </h3>
                            </div>

                            <button
                              onClick={() => handleCopyExample(currentLesson.examples[1].code, 1)}
                              className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 flex items-center gap-1"
                            >
                              {copiedExIndex === 1 ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                              <span>{copiedExIndex === 1 ? 'Copied' : 'Copy'}</span>
                            </button>
                          </div>

                          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3.5 items-stretch">
                            <div className="rounded-2xl bg-slate-950 border border-slate-800 overflow-hidden flex flex-col">
                              <div className="px-3.5 py-1.5 bg-slate-900 border-b border-slate-800 text-[11px] font-mono text-slate-400 flex items-center justify-between">
                                <span>project.html</span>
                                <span className="text-teal-400">HTML5</span>
                              </div>
                              <pre className="p-3.5 font-mono text-xs text-cyan-200 overflow-x-auto flex-1 leading-relaxed bg-[#0b101e]">
                                {currentLesson.examples[1].code}
                              </pre>
                            </div>

                            <div className="rounded-2xl bg-slate-950 border border-slate-800 overflow-hidden flex flex-col">
                              <div className="px-3.5 py-1.5 bg-slate-900 border-b border-slate-800 text-[11px] font-mono text-slate-400 flex items-center justify-between">
                                <span>Live Output</span>
                                <span className="text-emerald-400 font-bold">● Live</span>
                              </div>
                              <div className="p-3 bg-white text-slate-900 flex-1 overflow-auto rounded-b-2xl min-h-[140px]">
                                <iframe
                                  title="Mini Preview 2"
                                  srcDoc={buildSandboxHtml(currentLesson.examples[1].code)}
                                  className="w-full h-full min-h-[120px] border-none"
                                  sandbox="allow-scripts"
                                />
                              </div>
                            </div>
                          </div>

                          <div className="p-3.5 rounded-2xl bg-slate-900/50 border border-slate-800 space-y-1">
                            <h5 className="text-xs font-bold text-teal-400 uppercase tracking-wider">
                              Why it works:
                            </h5>
                            <p className="text-xs text-slate-300 leading-relaxed">
                              {currentLesson.examples[1].explanation}
                            </p>
                            {showUrdu && (
                              <p className="text-xs font-urdu text-amber-200 leading-relaxed pt-1 border-t border-slate-800/60" dir="rtl">
                                {currentLesson.examples[1].urduExplanation}
                              </p>
                            )}
                          </div>
                        </>
                      ) : (
                        <p className="text-slate-400">Loading...</p>
                      )}
                    </div>
                  )}

                  {/* SLIDE 4: CHALLENGE & LAUNCH ACTION */}
                  {activeSlide === 4 && (
                    <div className="max-w-4xl mx-auto w-full space-y-5 text-center">
                      <div>
                        <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                          Interactive Challenge
                        </span>
                        <h2 className="text-xl sm:text-2xl font-black text-white mt-1">
                          Ready for Hands-On Practice!
                        </h2>
                        {showUrdu && (
                          <h3 className="text-sm sm:text-base font-urdu font-bold text-amber-400 mt-1" dir="rtl">
                            اب آپ خود کوڈنگ کریں اور لائیو رزلٹ دیکھیں!
                          </h3>
                        )}
                      </div>

                      <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 text-left space-y-2.5">
                        <div className="flex items-center gap-1.5 text-amber-400 font-bold text-xs uppercase tracking-wider">
                          <Lightbulb className="w-3.5 h-3.5" />
                          <span>Your Mission:</span>
                        </div>
                        <p className="text-xs sm:text-sm text-slate-200 font-medium leading-relaxed">
                          {currentLesson.challenge}
                        </p>
                        <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-400">
                          <strong className="text-cyan-300">💡 Hint: </strong> {currentLesson.hint}
                        </div>
                      </div>

                      <div className="pt-2">
                        <button
                          onClick={() => setLessonMode('editor')}
                          className="px-7 py-3 rounded-2xl text-sm font-black bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 text-slate-950 shadow-lg shadow-emerald-500/20 hover:scale-105 transition-all inline-flex items-center gap-2"
                        >
                          <Code className="w-4 h-4 text-slate-950" />
                          <span>Launch Live Code Editor & Sandbox 🚀</span>
                        </button>
                      </div>
                    </div>
                  )}

                </div>

                {/* Slide Footer Stepper Controls */}
                <div className="px-5 py-3 bg-slate-900/60 border-t border-slate-800 flex items-center justify-between">
                  <button
                    disabled={activeSlide === 0}
                    onClick={() => setActiveSlide(prev => Math.max(0, prev - 1))}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1 ${
                      activeSlide === 0
                        ? 'bg-slate-900 text-slate-600 border border-slate-800 cursor-not-allowed'
                        : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'
                    }`}
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>Previous</span>
                  </button>

                  <div className="text-xs text-slate-400 font-mono">
                    Slide <span className="text-cyan-400 font-bold">{activeSlide + 1}</span> / {SLIDE_STEPS.length}
                  </div>

                  {activeSlide < SLIDE_STEPS.length - 1 ? (
                    <button
                      onClick={() => setActiveSlide(prev => Math.min(SLIDE_STEPS.length - 1, prev + 1))}
                      className="px-4 py-1.5 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white shadow-sm flex items-center gap-1"
                    >
                      <span>Next</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  ) : (
                    <button
                      onClick={() => setLessonMode('editor')}
                      className="px-4 py-1.5 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-sm flex items-center gap-1"
                    >
                      <span>Code Studio</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  )}
                </div>

              </div>
            )}

            {/* ══════════════════════════════════════════════════════════════
                MODE B: SPLIT CODE STUDIO & LIVE PREVIEW (MINIMALIST & SPACIOUS)
            ══════════════════════════════════════════════════════════════ */}
            {lessonMode === 'editor' && (
              <div className="space-y-3.5">
                
                {/* Editor Header */}
                <div className="p-3 rounded-2xl bg-slate-950/80 border border-slate-800 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setLessonMode('slides')}
                      className="px-3 py-1 rounded-xl text-xs font-bold bg-slate-900 hover:bg-slate-850 text-cyan-300 border border-slate-800 flex items-center gap-1"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" />
                      <span>Review Slides</span>
                    </button>
                    <span className="text-xs text-slate-400 hidden sm:inline">
                      M{activeModuleId} • Lesson {activeLessonIndex + 1}: {currentLesson.title.split(':')[0]}
                    </span>
                  </div>

                  <span className="text-emerald-400 text-xs font-bold flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block" />
                    Live Sync
                  </span>
                </div>

                {/* Split Workspace */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  
                  {/* Left: Code Editor */}
                  <div className="flex flex-col bg-[#0e131f] border border-slate-800 rounded-2xl overflow-hidden shadow-xl min-h-[500px]">
                    <div className="flex items-center justify-between px-3 py-1.5 bg-slate-950 border-b border-slate-800 select-none">
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1">
                          <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block" />
                          <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" />
                          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
                        </div>
                        <span className="text-xs font-mono text-slate-300 font-bold ml-1">index.html</span>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={handleCopyCode}
                          className="px-2 py-0.5 rounded text-[11px] font-semibold bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800"
                        >
                          {copiedCode ? 'Copied' : 'Copy'}
                        </button>
                        <button
                          onClick={handleResetCode}
                          className="px-2 py-0.5 rounded text-[11px] font-semibold bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800"
                        >
                          Reset
                        </button>
                      </div>
                    </div>

                    <div className="relative flex-1 bg-[#0b0f19] flex font-mono text-xs sm:text-sm">
                      <div className="w-9 py-3 bg-[#080c14] border-r border-slate-900 text-slate-600 select-none text-right pr-2 text-xs shrink-0">
                        {Array.from({ length: lineCount }, (_, i) => (
                          <div key={i + 1} className="h-6 leading-6">
                            {i + 1}
                          </div>
                        ))}
                      </div>

                      <textarea
                        value={userCode}
                        onChange={(e) => setUserCode(e.target.value)}
                        spellCheck={false}
                        className="flex-1 min-h-[360px] p-3 bg-transparent text-cyan-200 leading-6 font-mono resize-none focus:outline-none border-none selection:bg-blue-600"
                        placeholder="Type HTML here..."
                      />
                    </div>

                    {/* Status & Actions */}
                    <div className="p-3 bg-slate-900/90 border-t border-slate-800 space-y-2">
                      <div className="text-xs text-slate-300">
                        <strong className="text-amber-400">Challenge: </strong>
                        {currentLesson.challenge}
                      </div>

                      <div className="flex items-center justify-between gap-2 pt-1 border-t border-slate-800">
                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => setShowHint(!showHint)}
                            className="px-2.5 py-1 rounded-lg text-xs bg-slate-800 hover:bg-slate-700 text-slate-300"
                          >
                            {showHint ? 'Hide Hint' : 'Hint'}
                          </button>
                          <button
                            onClick={() => setShowSolution(!showSolution)}
                            className="px-2.5 py-1 rounded-lg text-xs bg-slate-800 hover:bg-slate-700 text-slate-300"
                          >
                            {showSolution ? 'Hide Solution' : 'Solution'}
                          </button>
                        </div>

                        <button
                          onClick={() => markLessonComplete(currentLesson.id)}
                          className={`px-3 py-1 rounded-xl text-xs font-bold transition-all ${
                            completedLessons.includes(currentLesson.id)
                              ? 'bg-emerald-600/30 text-emerald-300 border border-emerald-500/40'
                              : 'bg-emerald-600 hover:bg-emerald-500 text-white'
                          }`}
                        >
                          {completedLessons.includes(currentLesson.id) ? 'Completed ✓' : 'Complete'}
                        </button>
                      </div>

                      {showHint && (
                        <div className="p-2.5 rounded-xl bg-amber-950/30 border border-amber-900/40 text-xs text-amber-200">
                          {currentLesson.hint}
                        </div>
                      )}

                      {showSolution && (
                        <div className="p-2.5 rounded-xl bg-blue-950/40 border border-blue-900/40 space-y-1.5">
                          <div className="flex items-center justify-between text-xs text-cyan-300">
                            <span>Solution:</span>
                            <button
                              onClick={handleInsertSolution}
                              className="px-2 py-0.5 rounded bg-blue-600 text-white text-[10px]"
                            >
                              Insert ➔
                            </button>
                          </div>
                          <pre className="p-2 rounded bg-slate-950 text-cyan-300 text-[11px] font-mono overflow-x-auto max-h-32">
                            {currentLesson.solution}
                          </pre>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Right: Live Preview */}
                  <div className="flex flex-col bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden shadow-xl min-h-[500px]">
                    <div className="flex items-center justify-between px-3 py-1.5 bg-slate-900 border-b border-slate-800">
                      <div className="flex items-center gap-1.5 text-xs font-mono text-slate-400">
                        <Lock className="w-3 h-3 text-emerald-400" />
                        <span className="truncate max-w-[200px]">https://preview.dten.pk</span>
                      </div>

                      <div className="flex items-center gap-1 bg-slate-950 p-0.5 rounded-lg border border-slate-800">
                        <button
                          onClick={() => setPreviewDevice('desktop')}
                          className={`p-1 rounded ${previewDevice === 'desktop' ? 'bg-blue-600 text-white' : 'text-slate-400'}`}
                          title="Desktop View"
                        >
                          <Monitor className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => setPreviewDevice('mobile')}
                          className={`p-1 rounded ${previewDevice === 'mobile' ? 'bg-blue-600 text-white' : 'text-slate-400'}`}
                          title="Mobile View"
                        >
                          <Smartphone className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    <div className="flex-1 bg-slate-900/40 p-3 flex items-center justify-center overflow-auto">
                      <div className={`transition-all bg-white rounded-xl overflow-hidden shadow-lg border border-slate-800 ${
                        previewDevice === 'mobile' ? 'w-[300px] h-[480px] ring-4 ring-slate-800' : 'w-full h-full min-h-[380px]'
                      }`}>
                        <iframe
                          title="Live Preview"
                          srcDoc={sandboxHtml}
                          sandbox="allow-scripts allow-modals"
                          className="w-full h-full border-none bg-white"
                        />
                      </div>
                    </div>

                    <div className="px-3 py-1.5 bg-slate-900 border-t border-slate-800 text-[11px] font-mono text-slate-400 flex items-center justify-between">
                      <span className="text-emerald-400 font-bold">● Live Sync</span>
                      <span>Tags: {validation.stats.tagsCount}</span>
                    </div>
                  </div>

                </div>

                {/* Lesson Navigation Footer */}
                <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-950 border border-slate-800">
                  <button
                    disabled={activeLessonIndex === 0 && activeModuleId === 1}
                    onClick={() => {
                      if (activeLessonIndex > 0) {
                        setActiveLessonIndex(prev => prev - 1);
                      } else if (activeModuleId > 1) {
                        setActiveModuleId(prev => prev - 1);
                        setActiveLessonIndex(2);
                      }
                      setLessonMode('slides');
                      setActiveSlide(0);
                    }}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1 ${
                      activeLessonIndex === 0 && activeModuleId === 1
                        ? 'bg-slate-900 text-slate-600 border border-slate-800 cursor-not-allowed'
                        : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'
                    }`}
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>Previous</span>
                  </button>

                  <button
                    onClick={() => setLessonMode('slides')}
                    className="px-3 py-1.5 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700"
                  >
                    Review Slides
                  </button>

                  <button
                    onClick={() => {
                      if (activeLessonIndex < 2) {
                        setActiveLessonIndex(prev => prev + 1);
                        setLessonMode('slides');
                        setActiveSlide(0);
                      } else if (activeModuleId < 7) {
                        setActiveView('quiz');
                      } else {
                        setActiveView('exam');
                      }
                    }}
                    className="px-4 py-1.5 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white shadow-sm flex items-center gap-1"
                  >
                    <span>{activeLessonIndex < 2 ? 'Next Lesson' : (activeModuleId < 7 ? 'Quiz' : 'Exam')}</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

              </div>
            )}

          </div>
        )}

      </main>

      {/* ─────────────────────────────────────────────────────────────
          4. CERTIFICATE MODAL
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
