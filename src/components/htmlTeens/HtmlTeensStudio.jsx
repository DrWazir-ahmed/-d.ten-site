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
  Zap,
  Flame,
  FileCode,
  ShieldCheck,
  RefreshCw
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

  // Lesson Step Mode: 'slides' | 'editor'
  // Starts with Slides first, then transitions to editor and live screen
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
      setLessonMode('slides'); // Start with slides when switching lessons
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

  // Text to Speech for English and Urdu voices (Always available)
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

  // Copy Example Code helper
  const handleCopyExample = (code, index) => {
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(code);
      setCopiedExIndex(index);
      setTimeout(() => setCopiedExIndex(null), 2000);
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

  // Total Progress
  const totalLessonsCount = 21;
  const progressPercent = Math.min(100, Math.round((completedLessons.length / totalLessonsCount) * 100));

  // Slide Deck Definitions for Current Lesson
  const SLIDE_STEPS = [
    { id: 0, title: 'Concept Blueprint', urduTitle: 'تصور اور مثال', icon: Sparkles },
    { id: 1, title: 'Technical Terms', urduTitle: 'نئے الفاظ', icon: BookOpen },
    { id: 2, title: 'Example 1', urduTitle: 'مثال 1', icon: Code },
    { id: 3, title: 'Example 2', urduTitle: 'مثال 2', icon: Globe },
    { id: 4, title: 'Coding Challenge', urduTitle: 'کوڈنگ چیلنج', icon: Terminal }
  ];

  return (
    <div className="w-full min-h-screen bg-[#0a0f1d] text-slate-100 flex flex-col font-sans selection:bg-blue-600 selection:text-white relative">
      
      {/* ─────────────────────────────────────────────────────────────
          1. TOP GLOW ACCENT BAR & STICKY MODERN HEADER
      ───────────────────────────────────────────────────────────── */}
      <div className="h-1 w-full bg-gradient-to-r from-blue-600 via-cyan-400 to-emerald-400 shadow-sm shadow-cyan-500/20 z-50 sticky top-0" />

      <header className="bg-slate-950/85 border-b border-slate-800/80 sticky top-1 z-40 backdrop-blur-xl px-4 sm:px-6 py-2.5 transition-all">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-3">
          
          {/* Logo & Course Title & Progress */}
          <div className="flex items-center gap-3.5 w-full lg:w-auto justify-between lg:justify-start">
            <div className="flex items-center gap-3">
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl blur opacity-40 group-hover:opacity-75 transition duration-300" />
                <div className="relative w-10 h-10 rounded-xl bg-gradient-to-tr from-slate-900 to-slate-950 border border-slate-700/80 flex items-center justify-center text-cyan-400 font-black shadow-inner text-base">
                  &lt;/&gt;
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-sm sm:text-base font-extrabold text-white tracking-tight flex items-center gap-2">
                    <span>HTML5 Web Developer</span>
                    <span className="hidden sm:inline-block px-2 py-0.5 rounded-full text-[10px] font-black tracking-wider bg-gradient-to-r from-blue-500/10 to-cyan-500/10 text-cyan-400 border border-cyan-500/30 uppercase">
                      Teens 13–16
                    </span>
                  </h1>
                </div>

                {showUrdu ? (
                  <p className="text-[11px] text-amber-300/90 font-urdu font-medium tracking-wide flex items-center gap-1.5" dir="rtl">
                    <span>🇵🇰 ایچ ٹی ایم ایل 5 ویب ڈویلپمنٹ برائے پاکستانی نوجوان</span>
                  </p>
                ) : (
                  <p className="text-[11px] text-slate-400">
                    Modern Frontend Engineering Masterclass
                  </p>
                )}
              </div>
            </div>

            {/* Quick Progress Badge on Mobile */}
            <div className="flex lg:hidden items-center gap-2 bg-slate-900/90 border border-slate-800 px-2.5 py-1 rounded-xl text-xs">
              <span className="text-[10px] text-slate-400 font-mono">{completedLessons.length}/21</span>
              <div className="w-12 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-blue-500 to-emerald-400 rounded-full transition-all duration-500"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          </div>

          {/* Center: Overall Progress Bar (Desktop) */}
          <div className="hidden lg:flex items-center gap-3 bg-slate-900/70 border border-slate-800/80 rounded-2xl px-3.5 py-1.5">
            <div className="text-left">
              <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-slate-400 gap-3">
                <span>Course Progress</span>
                <span className="text-cyan-400 font-mono font-extrabold">{progressPercent}%</span>
              </div>
              <div className="w-36 h-1.5 bg-slate-800 rounded-full overflow-hidden mt-1">
                <div 
                  className="h-full bg-gradient-to-r from-blue-500 via-cyan-400 to-emerald-400 rounded-full transition-all duration-500 shadow-sm shadow-cyan-400/50"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
            <span className="px-2 py-0.5 rounded-lg bg-slate-800/90 text-slate-300 font-mono text-[11px] font-bold">
              {completedLessons.length}/21
            </span>
          </div>

          {/* DUAL VOICE BUTTONS & OPTIONAL URDU TOGGLE */}
          <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto justify-end">
            
            {/* Urdu Optional Toggle */}
            <button
              onClick={() => setShowUrdu(!showUrdu)}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all duration-200 border ${
                showUrdu
                  ? 'bg-amber-500/10 text-amber-300 border-amber-500/40 hover:bg-amber-500/20 shadow-sm shadow-amber-500/10'
                  : 'bg-slate-900/80 text-slate-400 border-slate-800 hover:text-slate-200 hover:border-slate-700'
              }`}
              title="اردو تحریر آن یا آف کریں (Toggle Urdu Language On/Off)"
            >
              <Languages className="w-3.5 h-3.5" />
              <span>{showUrdu ? 'اردو: آن (ON)' : 'اردو: آف (OFF)'}</span>
            </button>

            {/* Voice 1: Urdu Voice (Always Visible) */}
            <button
              onClick={() => speakingLanguage === 'ur' ? stopSpeaking() : speakText(currentLesson.urduVoice, 'ur')}
              className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all duration-200 border ${
                speakingLanguage === 'ur'
                  ? 'bg-emerald-600 text-white border-emerald-500 shadow-lg shadow-emerald-600/30 ring-2 ring-emerald-400/40 animate-pulse'
                  : 'bg-emerald-950/40 hover:bg-emerald-900/50 text-emerald-300 border-emerald-800/80 hover:border-emerald-700'
              }`}
              title="سبق سنیں (اُردو آواز)"
            >
              <div className="flex items-center gap-0.5">
                {speakingLanguage === 'ur' ? (
                  <div className="flex items-center gap-0.5 mr-0.5">
                    <span className="w-1 h-3 bg-white rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-1 h-4 bg-white rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-1 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                ) : (
                  <Volume2 className="w-3.5 h-3.5 text-emerald-400" />
                )}
              </div>
              <span className="font-urdu text-xs">
                {speakingLanguage === 'ur' ? 'روکیں (Stop)' : '🎙️ اُردو آواز'}
              </span>
            </button>

            {/* Voice 2: English Voice (Always Visible) */}
            <button
              onClick={() => speakingLanguage === 'en' ? stopSpeaking() : speakText(currentLesson.englishVoice, 'en')}
              className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all duration-200 border ${
                speakingLanguage === 'en'
                  ? 'bg-blue-600 text-white border-blue-500 shadow-lg shadow-blue-600/30 ring-2 ring-blue-400/40 animate-pulse'
                  : 'bg-blue-950/40 hover:bg-blue-900/50 text-blue-300 border-blue-800/80 hover:border-blue-700'
              }`}
              title="Listen in English"
            >
              <div className="flex items-center gap-0.5">
                {speakingLanguage === 'en' ? (
                  <div className="flex items-center gap-0.5 mr-0.5">
                    <span className="w-1 h-3 bg-white rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-1 h-4 bg-white rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-1 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                ) : (
                  <Volume2 className="w-3.5 h-3.5 text-blue-400" />
                )}
              </div>
              <span>{speakingLanguage === 'en' ? 'Stop' : '🔊 English Voice'}</span>
            </button>

            {/* Final Exam Trigger */}
            <button
              onClick={() => setActiveView('exam')}
              className={`px-3 py-1.5 rounded-xl text-xs font-extrabold transition-all duration-200 flex items-center gap-1.5 shadow-sm ${
                activeView === 'exam'
                  ? 'bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-950 shadow-amber-400/20'
                  : 'bg-amber-500/10 text-amber-300 border border-amber-500/30 hover:bg-amber-500/20'
              }`}
            >
              <Trophy className="w-3.5 h-3.5" />
              <span>Exam</span>
            </button>

          </div>
        </div>
      </header>

      {/* ─────────────────────────────────────────────────────────────
          2. MODULE TRACK NAVIGATION CAROUSEL (7 CORE MODULES)
      ───────────────────────────────────────────────────────────── */}
      <nav className="bg-slate-950/70 border-b border-slate-800/60 px-4 sm:px-6 py-2 overflow-x-auto scrollbar-thin">
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
                  setLessonMode('slides');
                  setActiveSlide(0);
                }}
                className={`group flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all duration-200 border ${
                  isCurrentModule
                    ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white border-blue-400/80 shadow-md shadow-blue-500/20'
                    : 'bg-slate-900/60 hover:bg-slate-800/80 text-slate-300 border-slate-800/80 hover:border-slate-700'
                }`}
              >
                <span className="text-sm">{m.badge}</span>
                <span>M{m.id}: {m.title.split(':')[0]}</span>
                {isAllCompleted ? (
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                ) : (
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-md font-mono ${
                    isCurrentModule ? 'bg-black/25 text-white' : 'bg-slate-950/80 text-slate-400'
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
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 flex flex-col gap-5">

        {/* ─── VIEW 1: FINAL CERTIFICATION EXAM ─── */}
        {activeView === 'exam' && (
          <div className="bg-gradient-to-b from-slate-950 to-slate-900/90 border border-slate-800/90 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-md">
            <div className="flex flex-col sm:flex-row items-center justify-between pb-6 border-b border-slate-800/80 gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full text-xs font-black bg-gradient-to-r from-amber-500/20 to-yellow-500/20 text-amber-300 border border-amber-500/30 uppercase tracking-widest inline-flex items-center gap-1.5 shadow-sm">
                    <Trophy className="w-3.5 h-3.5 text-amber-400" />
                    Official D.TEN Certification
                  </span>
                  <span className="text-xs text-slate-400 font-mono">10 Questions • 70% to Pass</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-white mt-2">
                  {HTML_TEENS_COURSE.finalExam.title}
                </h2>
                {showUrdu && (
                  <h3 className="text-sm sm:text-base font-urdu font-bold text-amber-400 mt-1" dir="rtl">
                    {HTML_TEENS_COURSE.finalExam.urduTitle}
                  </h3>
                )}
              </div>
              <button
                onClick={() => setActiveView('lesson')}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-all flex items-center gap-1.5"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                Back to Lessons
              </button>
            </div>

            {/* Questions List */}
            <div className="space-y-5 my-6">
              {HTML_TEENS_COURSE.finalExam.questions.map((q, qIdx) => {
                const selectedOpt = examAnswers[qIdx];

                return (
                  <div key={qIdx} className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800/80 space-y-3 transition-all hover:border-slate-700/90">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h4 className="text-sm sm:text-base font-bold text-slate-100 leading-snug">
                          {q.question}
                        </h4>
                        {showUrdu && (
                          <p className="text-xs sm:text-sm font-urdu font-semibold text-amber-300/90 mt-1" dir="rtl">
                            {q.urduQuestion}
                          </p>
                        )}
                      </div>
                      <span className="px-2.5 py-1 rounded-lg bg-slate-800/90 text-cyan-300 text-xs font-mono font-bold shrink-0 border border-slate-700">
                        Q{qIdx + 1}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                      {q.options.map((opt, optIdx) => {
                        const isSelected = selectedOpt === optIdx;
                        let btnStyle = "bg-slate-950/60 hover:bg-slate-800/60 text-slate-300 border-slate-800";

                        if (examSubmitted) {
                          if (optIdx === q.answer) {
                            btnStyle = "bg-emerald-600/30 text-emerald-200 border-emerald-500 font-bold shadow-sm shadow-emerald-500/10";
                          } else if (isSelected && optIdx !== q.answer) {
                            btnStyle = "bg-rose-600/30 text-rose-200 border-rose-500";
                          }
                        } else if (isSelected) {
                          btnStyle = "bg-blue-600 text-white border-blue-400 font-bold shadow-md shadow-blue-600/30";
                        }

                        return (
                          <button
                            key={optIdx}
                            disabled={examSubmitted}
                            onClick={() => handleExamAnswer(qIdx, optIdx)}
                            className={`p-3 rounded-xl text-xs sm:text-sm text-left transition-all duration-200 border ${btnStyle} flex items-center justify-between group`}
                          >
                            <span className="leading-relaxed">{opt}</span>
                            {examSubmitted && optIdx === q.answer && (
                              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 ml-2" />
                            )}
                          </button>
                        );
                      })}
                    </div>

                    {examSubmitted && (
                      <div className="p-3.5 rounded-xl bg-slate-950/90 border border-slate-800 text-xs text-slate-300 flex items-start gap-2">
                        <Lightbulb className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
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

            {/* Exam Action Bar */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4">
              {!examSubmitted ? (
                <>
                  <div className="text-xs text-slate-400">
                    Answer all 10 questions. Pass score is <strong className="text-white">7 / 10 (70%)</strong> to earn your Official D.TEN HTML5 Diploma.
                  </div>
                  <button
                    onClick={submitFinalExam}
                    disabled={Object.keys(examAnswers).length < HTML_TEENS_COURSE.finalExam.questions.length}
                    className={`px-6 py-3 rounded-xl text-sm font-black transition-all shadow-lg flex items-center gap-2 ${
                      Object.keys(examAnswers).length >= HTML_TEENS_COURSE.finalExam.questions.length
                        ? 'bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white shadow-blue-600/30 hover:scale-[1.02]'
                        : 'bg-slate-800 text-slate-500 border border-slate-700 cursor-not-allowed'
                    }`}
                  >
                    <span>Submit Exam for Grading</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </>
              ) : (
                <>
                  <div className="flex items-center gap-3.5">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center font-black text-xl shadow-lg ${
                      examScore >= HTML_TEENS_COURSE.finalExam.passingScore
                        ? 'bg-gradient-to-tr from-emerald-500 to-teal-400 text-slate-950 shadow-emerald-500/30'
                        : 'bg-gradient-to-tr from-rose-600 to-pink-500 text-white shadow-rose-500/30'
                    }`}>
                      {examScore}/10
                    </div>
                    <div>
                      <h4 className="text-base font-extrabold text-white">
                        {examScore >= HTML_TEENS_COURSE.finalExam.passingScore ? '🎉 Congratulations! You Passed!' : 'Almost There! Try Again.'}
                      </h4>
                      <p className="text-xs text-slate-400 mt-0.5">
                        {examScore >= HTML_TEENS_COURSE.finalExam.passingScore
                          ? 'You are now an officially certified Junior HTML5 Web Developer.'
                          : 'Review the lessons and re-take the exam to claim your diploma.'}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={resetFinalExam}
                      className="px-4 py-2.5 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-all flex items-center gap-1.5"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      Retake Exam
                    </button>
                    {examScore >= HTML_TEENS_COURSE.finalExam.passingScore && (
                      <button
                        onClick={() => setShowCertificate(true)}
                        className="px-6 py-2.5 rounded-xl text-xs font-black bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 text-slate-950 shadow-lg shadow-amber-400/25 hover:scale-105 transition-all flex items-center gap-2"
                      >
                        <Award className="w-4 h-4 text-slate-950" />
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
          <div className="bg-gradient-to-b from-slate-950 to-slate-900/90 border border-slate-800/90 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
            <div className="flex flex-col sm:flex-row items-center justify-between pb-4 border-b border-slate-800/80 gap-3">
              <div>
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-500/20 text-cyan-300 border border-blue-500/30 uppercase tracking-wider inline-flex items-center gap-1.5">
                  <HelpCircle className="w-3.5 h-3.5" />
                  Module {activeModuleId} Knowledge Check
                </span>
                <h2 className="text-xl font-black text-white mt-2">
                  {currentModule.quiz.title}
                </h2>
                {showUrdu && (
                  <h3 className="text-sm font-urdu font-bold text-amber-400 mt-0.5" dir="rtl">
                    {currentModule.quiz.urduTitle}
                  </h3>
                )}
              </div>
              <button
                onClick={() => setActiveView('lesson')}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-all flex items-center gap-1.5"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                Return to Lesson
              </button>
            </div>

            <div className="space-y-4">
              {currentModule.quiz.questions.map((q, qIdx) => {
                const selectedOpt = quizAnswers[qIdx];

                return (
                  <div key={qIdx} className="p-4 sm:p-5 rounded-2xl bg-slate-900/70 border border-slate-800/80 space-y-3">
                    <h4 className="text-sm font-bold text-slate-100">
                      {qIdx + 1}. {q.question}
                    </h4>
                    {showUrdu && (
                      <p className="text-xs font-urdu font-semibold text-amber-300/90" dir="rtl">
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
                          btnStyle = "bg-blue-600 text-white border-blue-400 font-bold shadow-md shadow-blue-600/20";
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
                              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 ml-2" />
                            )}
                          </button>
                        );
                      })}
                    </div>

                    {quizSubmitted && (
                      <div className="p-3 rounded-xl bg-slate-950/90 border border-slate-800 text-xs text-slate-300">
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
                  className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                    Object.keys(quizAnswers).length >= currentModule.quiz.questions.length
                      ? 'bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white shadow-md shadow-blue-600/30'
                      : 'bg-slate-800 text-slate-500 border border-slate-700 cursor-not-allowed'
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Grade My Quiz</span>
                </button>
              ) : (
                <div className="flex items-center gap-3 w-full justify-between">
                  <div className="text-sm font-bold text-slate-200">
                    Your Score: <span className="text-emerald-400 font-mono text-base font-black">{quizScore}</span> / {currentModule.quiz.questions.length}
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={resetModuleQuiz}
                      className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-slate-800 text-slate-300 border border-slate-700 hover:bg-slate-700 transition-all"
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
                        className="px-4 py-1.5 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white shadow-md shadow-blue-600/25 transition-all flex items-center gap-1.5"
                      >
                        <span>Next Module</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    ) : (
                      <button
                        onClick={() => setActiveView('exam')}
                        className="px-4 py-1.5 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-md shadow-amber-500/25 transition-all flex items-center gap-1.5"
                      >
                        <Trophy className="w-3.5 h-3.5" />
                        <span>Proceed to Final Exam</span>
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ─── VIEW 3: LESSON EXPERIENCE (SLIDES FIRST, THEN LIVE EDITOR) ─── */}
        {activeView === 'lesson' && (
          <div className="space-y-4">
            
            {/* Sub-navigation: 3 Lessons Selector & Mode Switcher */}
            <div className="flex flex-wrap items-center justify-between gap-3 p-2.5 sm:p-3 rounded-2xl bg-slate-950/80 border border-slate-800/80 backdrop-blur-md">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-400 px-1 hidden sm:inline">
                  Lessons:
                </span>
                <div className="flex items-center gap-1.5">
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
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all duration-200 border flex items-center gap-1.5 ${
                          isSelected
                            ? 'bg-blue-600 text-white border-blue-400 shadow-md shadow-blue-600/30'
                            : 'bg-slate-900/90 text-slate-300 border-slate-800 hover:border-slate-700 hover:bg-slate-800/80'
                        }`}
                      >
                        {isDone && <Check className="w-3.5 h-3.5 text-emerald-400" />}
                        <span>Lesson {idx + 1}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Toggle Mode: Slides vs Code Studio */}
              <div className="flex items-center gap-2">
                <div className="bg-slate-900/90 p-1 rounded-xl border border-slate-800 flex items-center gap-1">
                  <button
                    onClick={() => setLessonMode('slides')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all duration-200 flex items-center gap-1.5 ${
                      lessonMode === 'slides'
                        ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-sm'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>Presentation Slides</span>
                  </button>
                  <button
                    onClick={() => setLessonMode('editor')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all duration-200 flex items-center gap-1.5 ${
                      lessonMode === 'editor'
                        ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-sm'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <Code className="w-3.5 h-3.5" />
                    <span>Editor & Live Preview</span>
                  </button>
                </div>

                <button
                  onClick={() => {
                    setActiveView('quiz');
                    resetModuleQuiz();
                  }}
                  className="px-3 py-1.5 rounded-xl text-xs font-bold bg-blue-500/10 hover:bg-blue-500/20 text-cyan-300 border border-blue-500/30 transition-all flex items-center gap-1"
                >
                  <HelpCircle className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Quiz</span> {activeModuleId}
                </button>
              </div>
            </div>

            {/* ══════════════════════════════════════════════════════════════
                MODE A: MODERN SLIDE DECK (5 INTERACTIVE SLIDES)
            ══════════════════════════════════════════════════════════════ */}
            {lessonMode === 'slides' && (
              <div className="bg-slate-950/90 border border-slate-800/90 rounded-3xl overflow-hidden shadow-2xl flex flex-col min-h-[580px] backdrop-blur-md">
                
                {/* Modern Stepper Header */}
                <div className="p-3.5 sm:p-4 bg-slate-900/80 border-b border-slate-800/80 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-extrabold bg-blue-500/20 text-cyan-400 border border-blue-500/30 uppercase font-mono">
                      Step {activeSlide + 1}/5
                    </span>
                    <span className="text-xs sm:text-sm font-extrabold text-white">
                      {SLIDE_STEPS[activeSlide].title}
                    </span>
                    {showUrdu && (
                      <span className="text-xs font-urdu font-bold text-amber-400">
                        ({SLIDE_STEPS[activeSlide].urduTitle})
                      </span>
                    )}
                  </div>

                  {/* Stepper Wizard Indicator */}
                  <div className="flex items-center gap-2">
                    {SLIDE_STEPS.map((s, idx) => {
                      const StepIcon = s.icon;
                      const isActive = activeSlide === idx;
                      const isPast = activeSlide > idx;

                      return (
                        <button
                          key={s.id}
                          onClick={() => setActiveSlide(idx)}
                          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-xl text-xs font-bold transition-all duration-200 border ${
                            isActive
                              ? 'bg-blue-600 text-white border-blue-400 shadow-md shadow-blue-500/25 ring-2 ring-blue-500/20'
                              : isPast
                              ? 'bg-slate-800/80 text-emerald-400 border-slate-700'
                              : 'bg-slate-900/60 text-slate-500 border-slate-800 hover:text-slate-300'
                          }`}
                          title={s.title}
                        >
                          <StepIcon className="w-3 h-3" />
                          <span className="hidden md:inline">{idx + 1}</span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Quick Jump to Code Editor */}
                  <button
                    onClick={() => setLessonMode('editor')}
                    className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white shadow-md shadow-emerald-600/20 flex items-center gap-1.5 transition-all"
                  >
                    <span>Open Editor</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* SLIDE CANVAS BODY */}
                <div className="flex-1 p-5 sm:p-8 flex flex-col justify-center">
                  
                  {/* SLIDE 0: CONCEPT BLUEPRINT & INTUITION */}
                  {activeSlide === 0 && (
                    <div className="max-w-4xl mx-auto w-full space-y-6 animate-fadeIn">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-500/20 text-cyan-300 border border-blue-500/30">
                            {currentModule.badge} • Module {activeModuleId}
                          </span>
                          <span className="text-xs text-slate-400 font-mono">
                            Lesson {activeLessonIndex + 1} of 3
                          </span>
                        </div>

                        <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                          {currentLesson.title}
                        </h2>
                        {showUrdu && (
                          <h3 className="text-lg sm:text-xl font-urdu font-bold text-amber-400 leading-relaxed" dir="rtl">
                            {currentLesson.urduTitle}
                          </h3>
                        )}
                      </div>

                      {/* Analogy Card */}
                      {currentLesson.analogy && (
                        <div className="p-5 rounded-2xl bg-gradient-to-br from-emerald-950/40 via-slate-900/90 to-slate-900 border border-emerald-800/60 shadow-lg space-y-2.5">
                          <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase tracking-wider">
                            <Sparkles className="w-4 h-4 text-emerald-400 shrink-0" />
                            <span>Beginner Real-World Analogy (آسان مثال):</span>
                          </div>
                          <p className="text-sm text-emerald-100 leading-relaxed font-medium">
                            {currentLesson.analogy}
                          </p>
                          {showUrdu && currentLesson.urduAnalogy && (
                            <p className="text-sm font-urdu text-amber-300 leading-relaxed pt-1.5 border-t border-emerald-800/40" dir="rtl">
                              {currentLesson.urduAnalogy}
                            </p>
                          )}
                        </div>
                      )}

                      {/* Technical Concept */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800/80 space-y-2 shadow-sm">
                          <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
                            <Code className="w-3.5 h-3.5" />
                            Core Web Concept:
                          </h4>
                          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                            {currentLesson.concept}
                          </p>
                        </div>

                        {showUrdu ? (
                          <div className="p-5 rounded-2xl bg-amber-950/20 border border-amber-900/40 space-y-2 font-urdu text-right shadow-sm" dir="rtl">
                            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400">
                              تکنیکی تصور (اردو وضاحت):
                            </h4>
                            <p className="text-xs sm:text-sm text-amber-200 leading-relaxed">
                              {currentLesson.urduConcept}
                            </p>
                          </div>
                        ) : (
                          <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800/80 space-y-2 shadow-sm">
                            <h4 className="text-xs font-bold uppercase tracking-wider text-teal-400 flex items-center gap-1.5">
                              <Globe className="w-3.5 h-3.5" />
                              Pakistani Teen Context:
                            </h4>
                            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                              {currentLesson.pakistaniContext}
                            </p>
                          </div>
                        )}
                      </div>

                      {showUrdu && (
                        <div className="p-4 rounded-xl bg-gradient-to-r from-blue-950/40 to-slate-900 border border-blue-900/50 flex items-center gap-3 text-xs text-blue-200 shadow-sm">
                          <span className="text-lg">🇵🇰</span>
                          <div>
                            <strong className="text-cyan-300">Pakistani Teen Context: </strong> 
                            <span className="text-slate-300">{currentLesson.pakistaniContext}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* SLIDE 1: TECHNICAL TERMS GLOSSARY */}
                  {activeSlide === 1 && (
                    <div className="max-w-4xl mx-auto w-full space-y-5 animate-fadeIn">
                      <div className="text-center space-y-1.5">
                        <span className="text-xs font-bold uppercase tracking-wider text-indigo-400 flex items-center justify-center gap-1.5">
                          <BookOpen className="w-4 h-4 text-indigo-400" />
                          Vocabulary & Technical Terms
                        </span>
                        <h3 className="text-xl sm:text-2xl font-black text-white">
                          New Terms Introduced in this Lesson
                        </h3>
                        {showUrdu && (
                          <p className="text-sm font-urdu font-bold text-amber-400" dir="rtl">
                            اس سبق میں سکھائے جانے والے نئے الفاظ اور اصطلاحات
                          </p>
                        )}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {currentLesson.newTerms?.map((item, idx) => (
                          <div key={idx} className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800/80 space-y-2.5 hover:border-slate-700 transition-all shadow-sm">
                            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                              <span className="px-2.5 py-1 rounded-lg bg-blue-600/20 text-cyan-300 font-mono text-xs font-bold border border-blue-500/30">
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
                              <p className="text-xs font-urdu text-amber-200/90 leading-relaxed pt-1.5 border-t border-slate-800/60" dir="rtl">
                                {item.urduDefinition}
                              </p>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* SLIDE 2: CODE EXAMPLE 1 WITH LINE-BY-LINE EXPLANATION & MINI PREVIEW */}
                  {activeSlide === 2 && (
                    <div className="max-w-5xl mx-auto w-full space-y-4 animate-fadeIn">
                      {currentLesson.examples && currentLesson.examples[0] ? (
                        <>
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                            <div>
                              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-extrabold bg-blue-500/20 text-cyan-400 border border-blue-500/30 uppercase font-mono">
                                Example 1 of 2 • Core Syntax
                              </span>
                              <h3 className="text-lg sm:text-xl font-bold text-white mt-1">
                                {currentLesson.examples[0].title}
                              </h3>
                              {showUrdu && (
                                <h4 className="text-sm font-urdu font-bold text-amber-400" dir="rtl">
                                  {currentLesson.examples[0].urduTitle}
                                </h4>
                              )}
                            </div>

                            <button
                              onClick={() => handleCopyExample(currentLesson.examples[0].code, 0)}
                              className="self-start sm:self-auto px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-800/90 hover:bg-slate-700 text-slate-200 border border-slate-700 flex items-center gap-1.5 transition-all"
                            >
                              {copiedExIndex === 0 ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                              <span>{copiedExIndex === 0 ? 'Copied' : 'Copy Code'}</span>
                            </button>
                          </div>

                          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-stretch">
                            {/* VS-Code Style Snippet */}
                            <div className="rounded-2xl bg-slate-950 border border-slate-800 overflow-hidden flex flex-col shadow-lg">
                              <div className="px-4 py-2.5 bg-slate-900/90 border-b border-slate-800 text-[11px] font-mono text-slate-400 flex items-center justify-between">
                                <div className="flex items-center gap-1.5">
                                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 inline-block" />
                                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
                                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
                                  <span className="ml-2 text-slate-400 font-bold">example1.html</span>
                                </div>
                                <span className="text-cyan-400 font-mono text-[10px]">HTML5</span>
                              </div>
                              <pre className="p-4 font-mono text-xs sm:text-sm text-cyan-200 overflow-x-auto flex-1 leading-relaxed bg-[#0b101e]">
                                {currentLesson.examples[0].code}
                              </pre>
                            </div>

                            {/* Live Output Mini Render */}
                            <div className="rounded-2xl bg-slate-950 border border-slate-800 overflow-hidden flex flex-col shadow-lg">
                              <div className="px-4 py-2.5 bg-slate-900/90 border-b border-slate-800 text-[11px] font-mono text-slate-400 flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                  <Globe className="w-3.5 h-3.5 text-emerald-400" />
                                  <span className="truncate max-w-[180px] sm:max-w-none">Live Browser Simulation</span>
                                </div>
                                <span className="text-emerald-400 font-bold flex items-center gap-1">
                                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block" />
                                  Render
                                </span>
                              </div>
                              <div className="p-3 bg-white text-slate-900 flex-1 overflow-auto rounded-b-2xl min-h-[160px]">
                                <iframe
                                  title="Mini Preview 1"
                                  srcDoc={buildSandboxHtml(currentLesson.examples[0].code)}
                                  className="w-full h-full min-h-[140px] border-none"
                                  sandbox="allow-scripts"
                                />
                              </div>
                            </div>
                          </div>

                          {/* Explanation Box */}
                          <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800/80 space-y-1 shadow-sm">
                            <h5 className="text-xs font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
                              <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
                              Why this code works (وضاحت):
                            </h5>
                            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                              {currentLesson.examples[0].explanation}
                            </p>
                            {showUrdu && (
                              <p className="text-xs sm:text-sm font-urdu text-amber-200 leading-relaxed pt-1.5 border-t border-slate-800/60" dir="rtl">
                                {currentLesson.examples[0].urduExplanation}
                              </p>
                            )}
                          </div>
                        </>
                      ) : (
                        <p className="text-slate-400">Example loading...</p>
                      )}
                    </div>
                  )}

                  {/* SLIDE 3: CODE EXAMPLE 2 WITH LINE-BY-LINE EXPLANATION & MINI PREVIEW */}
                  {activeSlide === 3 && (
                    <div className="max-w-5xl mx-auto w-full space-y-4 animate-fadeIn">
                      {currentLesson.examples && currentLesson.examples[1] ? (
                        <>
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                            <div>
                              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-extrabold bg-teal-500/20 text-teal-300 border border-teal-500/30 uppercase font-mono">
                                Example 2 of 2 • Pakistani Teen Project
                              </span>
                              <h3 className="text-lg sm:text-xl font-bold text-white mt-1">
                                {currentLesson.examples[1].title}
                              </h3>
                              {showUrdu && (
                                <h4 className="text-sm font-urdu font-bold text-amber-400" dir="rtl">
                                  {currentLesson.examples[1].urduTitle}
                                </h4>
                              )}
                            </div>

                            <button
                              onClick={() => handleCopyExample(currentLesson.examples[1].code, 1)}
                              className="self-start sm:self-auto px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-800/90 hover:bg-slate-700 text-slate-200 border border-slate-700 flex items-center gap-1.5 transition-all"
                            >
                              {copiedExIndex === 1 ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                              <span>{copiedExIndex === 1 ? 'Copied' : 'Copy Code'}</span>
                            </button>
                          </div>

                          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-stretch">
                            {/* VS-Code Style Snippet */}
                            <div className="rounded-2xl bg-slate-950 border border-slate-800 overflow-hidden flex flex-col shadow-lg">
                              <div className="px-4 py-2.5 bg-slate-900/90 border-b border-slate-800 text-[11px] font-mono text-slate-400 flex items-center justify-between">
                                <div className="flex items-center gap-1.5">
                                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 inline-block" />
                                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
                                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
                                  <span className="ml-2 text-slate-400 font-bold">project_showcase.html</span>
                                </div>
                                <span className="text-teal-400 font-mono text-[10px]">HTML5</span>
                              </div>
                              <pre className="p-4 font-mono text-xs sm:text-sm text-cyan-200 overflow-x-auto flex-1 leading-relaxed bg-[#0b101e]">
                                {currentLesson.examples[1].code}
                              </pre>
                            </div>

                            {/* Live Output Mini Render */}
                            <div className="rounded-2xl bg-slate-950 border border-slate-800 overflow-hidden flex flex-col shadow-lg">
                              <div className="px-4 py-2.5 bg-slate-900/90 border-b border-slate-800 text-[11px] font-mono text-slate-400 flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                  <Globe className="w-3.5 h-3.5 text-emerald-400" />
                                  <span className="truncate max-w-[180px] sm:max-w-none">Live Browser Simulation</span>
                                </div>
                                <span className="text-emerald-400 font-bold flex items-center gap-1">
                                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block" />
                                  Render
                                </span>
                              </div>
                              <div className="p-3 bg-white text-slate-900 flex-1 overflow-auto rounded-b-2xl min-h-[160px]">
                                <iframe
                                  title="Mini Preview 2"
                                  srcDoc={buildSandboxHtml(currentLesson.examples[1].code)}
                                  className="w-full h-full min-h-[140px] border-none"
                                  sandbox="allow-scripts"
                                />
                              </div>
                            </div>
                          </div>

                          {/* Explanation Box */}
                          <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800/80 space-y-1 shadow-sm">
                            <h5 className="text-xs font-bold text-teal-400 uppercase tracking-wider flex items-center gap-1.5">
                              <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
                              Why this code works (وضاحت):
                            </h5>
                            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                              {currentLesson.examples[1].explanation}
                            </p>
                            {showUrdu && (
                              <p className="text-xs sm:text-sm font-urdu text-amber-200 leading-relaxed pt-1.5 border-t border-slate-800/60" dir="rtl">
                                {currentLesson.examples[1].urduExplanation}
                              </p>
                            )}
                          </div>
                        </>
                      ) : (
                        <p className="text-slate-400">Example loading...</p>
                      )}
                    </div>
                  )}

                  {/* SLIDE 4: CODING CHALLENGE BRIEFING & LAUNCH ACTION */}
                  {activeSlide === 4 && (
                    <div className="max-w-4xl mx-auto w-full space-y-6 text-center animate-fadeIn">
                      <div className="space-y-2">
                        <span className="px-3 py-1 rounded-full text-xs font-black bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 uppercase tracking-widest inline-flex items-center gap-1.5 shadow-sm">
                          <Terminal className="w-3.5 h-3.5" />
                          Ready for Hands-On Practice!
                        </span>
                        <h2 className="text-2xl sm:text-3xl font-black text-white">
                          Time to Code in the Interactive Studio
                        </h2>
                        {showUrdu && (
                          <h3 className="text-base sm:text-lg font-urdu font-bold text-amber-400" dir="rtl">
                            اب آپ خود کوڈنگ کریں اور لائیو رزلٹ دیکھیں!
                          </h3>
                        )}
                      </div>

                      {/* Challenge Details Card */}
                      <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800/90 text-left space-y-3.5 shadow-xl">
                        <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase tracking-wider">
                          <Lightbulb className="w-4 h-4 text-amber-400" />
                          <span>Your Mission & Challenge:</span>
                        </div>
                        <p className="text-sm sm:text-base text-slate-200 font-medium leading-relaxed">
                          {currentLesson.challenge}
                        </p>
                        <div className="p-3.5 rounded-xl bg-slate-950/90 border border-slate-800 text-xs text-slate-400 flex items-start gap-2">
                          <Sparkles className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                          <div>
                            <strong className="text-cyan-300">Helpful Hint: </strong> {currentLesson.hint}
                          </div>
                        </div>
                      </div>

                      {/* BIG LAUNCH BUTTON INTO EDITOR */}
                      <div className="pt-2">
                        <button
                          onClick={() => setLessonMode('editor')}
                          className="group px-8 py-4 rounded-2xl text-base font-black bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 text-slate-950 shadow-2xl shadow-emerald-500/25 hover:scale-105 transition-all inline-flex items-center gap-3"
                        >
                          <Code className="w-5 h-5 text-slate-950 group-hover:rotate-12 transition-transform" />
                          <span>Launch Live Code Editor & Sandbox Screen 🚀</span>
                        </button>
                        {showUrdu && (
                          <p className="text-xs font-urdu text-amber-300 font-semibold mt-2.5" dir="rtl">
                            کلک کریں اور لائیو ویب براؤزر اسکرین پر کوڈنگ شروع کریں!
                          </p>
                        )}
                      </div>
                    </div>
                  )}

                </div>

                {/* Slide Footer Controls Bar */}
                <div className="p-3.5 sm:p-4 bg-slate-900/90 border-t border-slate-800/80 flex items-center justify-between">
                  <button
                    disabled={activeSlide === 0}
                    onClick={() => setActiveSlide(prev => Math.max(0, prev - 1))}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                      activeSlide === 0
                        ? 'bg-slate-900/60 text-slate-600 border border-slate-800/80 cursor-not-allowed'
                        : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 shadow-sm'
                    }`}
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>Previous Slide</span>
                  </button>

                  <div className="text-xs text-slate-400 font-mono">
                    Slide <span className="text-cyan-400 font-bold">{activeSlide + 1}</span> of {SLIDE_STEPS.length}
                  </div>

                  {activeSlide < SLIDE_STEPS.length - 1 ? (
                    <button
                      onClick={() => setActiveSlide(prev => Math.min(SLIDE_STEPS.length - 1, prev + 1))}
                      className="px-5 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white shadow-md shadow-blue-600/30 transition-all flex items-center gap-1.5"
                    >
                      <span>Next Slide</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  ) : (
                    <button
                      onClick={() => setLessonMode('editor')}
                      className="px-5 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white shadow-md shadow-emerald-600/30 transition-all flex items-center gap-1.5"
                    >
                      <span>Launch Code Studio</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  )}
                </div>

              </div>
            )}

            {/* ══════════════════════════════════════════════════════════════
                MODE B: THE CODE EDITOR & LIVE WEB SANDBOX SCREEN
            ══════════════════════════════════════════════════════════════ */}
            {lessonMode === 'editor' && (
              <div className="space-y-4">
                
                {/* Editor Header Bar with Return to Slides button */}
                <div className="p-3 sm:p-3.5 rounded-2xl bg-slate-950/90 border border-slate-800/90 flex flex-wrap items-center justify-between gap-3 shadow-lg">
                  <div className="flex items-center gap-2.5">
                    <button
                      onClick={() => setLessonMode('slides')}
                      className="px-3 py-1.5 rounded-xl text-xs font-bold bg-blue-600/20 hover:bg-blue-600/30 text-cyan-300 border border-blue-500/30 flex items-center gap-1.5 transition-all"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" />
                      <span>Review Presentation Slides</span>
                    </button>
                    <span className="text-xs font-mono text-slate-400 hidden sm:inline">
                      M{activeModuleId} • Lesson {activeLessonIndex + 1}: {currentLesson.title.split(':')[0]}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-xs">
                    <span className="text-emerald-400 font-bold flex items-center gap-1.5 bg-emerald-950/40 border border-emerald-800/50 px-2.5 py-1 rounded-xl">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block" />
                      Live Sync Active
                    </span>
                  </div>
                </div>

                {/* ─── SPLIT WORKSPACE: LEFT EDITOR | RIGHT LIVE SANDBOX PREVIEW ─── */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                  
                  {/* LEFT PANE: HTML CODE EDITOR */}
                  <div className="flex flex-col bg-slate-950 border border-slate-800/90 rounded-3xl overflow-hidden shadow-2xl min-h-[520px]">
                    
                    {/* Editor Header */}
                    <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900/90 border-b border-slate-800">
                      <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
                        <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
                        <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
                        <span className="ml-2 font-mono text-xs font-bold text-slate-300 flex items-center gap-1.5">
                          <FileCode className="w-3.5 h-3.5 text-cyan-400" />
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
                          <span>{copiedCode ? 'Copied' : 'Copy'}</span>
                        </button>

                        <button
                          onClick={handleResetCode}
                          className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 transition-all flex items-center gap-1"
                          title="Reset code to lesson starter"
                        >
                          <RotateCcw className="w-3 h-3" />
                          <span>Reset</span>
                        </button>
                      </div>
                    </div>

                    {/* Textarea Code Editor */}
                    <div className="relative flex-1 bg-[#090d18] font-mono text-xs sm:text-sm">
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
                      <div className="text-xs text-slate-300 leading-relaxed">
                        <strong className="text-amber-400">⚡ Code Challenge: </strong>
                        {currentLesson.challenge}
                      </div>

                      <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-slate-800/80">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setShowHint(!showHint)}
                            className="px-3 py-1 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 transition-all flex items-center gap-1"
                          >
                            <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
                            <span>{showHint ? 'Hide Hint' : 'Show Hint'}</span>
                          </button>

                          <button
                            onClick={() => setShowSolution(!showSolution)}
                            className="px-3 py-1 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 transition-all flex items-center gap-1"
                          >
                            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                            <span>{showSolution ? 'Hide Solution' : 'View Solution'}</span>
                          </button>
                        </div>

                        <button
                          onClick={() => markLessonComplete(currentLesson.id)}
                          className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                            completedLessons.includes(currentLesson.id)
                              ? 'bg-emerald-600/30 text-emerald-300 border border-emerald-500/40 shadow-sm'
                              : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-md shadow-emerald-600/30'
                          }`}
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>{completedLessons.includes(currentLesson.id) ? 'Completed ✓' : 'Mark Completed'}</span>
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
                        <div className="p-3.5 rounded-xl bg-blue-950/40 border border-blue-900/50 space-y-2">
                          <div className="flex items-center justify-between text-xs text-cyan-300 font-bold">
                            <span>Solution Preview:</span>
                            <button
                              onClick={handleInsertSolution}
                              className="px-2.5 py-1 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-[11px] font-bold shadow-sm"
                            >
                              Insert into Editor ➔
                            </button>
                          </div>
                          <pre className="p-2.5 rounded bg-slate-950 text-cyan-300 text-[11px] font-mono overflow-x-auto max-h-36">
                            {currentLesson.solution}
                          </pre>
                        </div>
                      )}
                    </div>

                  </div>

                  {/* RIGHT PANE: LIVE SANDBOX WEB PREVIEW */}
                  <div className="flex flex-col bg-slate-950 border border-slate-800/90 rounded-3xl overflow-hidden shadow-2xl min-h-[520px]">
                    
                    {/* Browser Simulator Top Bar */}
                    <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900/90 border-b border-slate-800">
                      <div className="flex items-center gap-2">
                        <span className="p-1 rounded bg-slate-800 text-slate-400">
                          <Globe className="w-3.5 h-3.5 text-emerald-400" />
                        </span>
                        <span className="text-xs font-mono text-slate-400 truncate max-w-[180px] sm:max-w-xs">
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
                          title="Desktop View"
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
                          title="Mobile Phone View"
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
                        {showUrdu && (
                          <span className="font-urdu text-[11px] text-rose-200 hidden sm:inline" dir="rtl">
                            {validation.errors[0].urdu}
                          </span>
                        )}
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
                      <div className={`transition-all duration-300 bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-700/80 ${
                        previewDevice === 'mobile'
                          ? 'w-[320px] h-[520px] ring-8 ring-slate-800'
                          : 'w-full h-full min-h-[420px]'
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
                    <div className="px-4 py-2.5 bg-slate-900/90 border-t border-slate-800 text-xs text-slate-400 flex items-center justify-between">
                      <div className="flex items-center gap-3 font-mono text-[11px]">
                        <span className="text-emerald-400 font-bold flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />
                          Live Sandbox Active
                        </span>
                        <span>Elements: <strong className="text-slate-200">{validation.stats.tagsCount}</strong></span>
                      </div>
                      <div className="text-[11px] text-slate-500 font-mono">
                        D.TEN HTML Engine
                      </div>
                    </div>

                  </div>

                </div>

                {/* Bottom Navigation */}
                <div className="flex items-center justify-between p-3.5 sm:p-4 rounded-2xl bg-slate-950/90 border border-slate-800/90 shadow-lg">
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
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                      activeLessonIndex === 0 && activeModuleId === 1
                        ? 'bg-slate-900/60 text-slate-600 border border-slate-800/80 cursor-not-allowed'
                        : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'
                    }`}
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>Previous Lesson</span>
                  </button>

                  <button
                    onClick={() => setLessonMode('slides')}
                    className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 flex items-center gap-1.5 transition-all"
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>Review Slides</span>
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
                    className="px-5 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white shadow-md shadow-blue-600/30 transition-all flex items-center gap-1.5"
                  >
                    <span>{activeLessonIndex < 2 ? 'Next Lesson' : (activeModuleId < 7 ? 'Take Module Quiz' : 'Final Exam')}</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

              </div>
            )}

          </div>
        )}

      </main>

      {/* ─────────────────────────────────────────────────────────────
          4. CERTIFICATE MODAL POPUP
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
