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
  Terminal as TerminalIcon, 
  Check, 
  Copy, 
  Lightbulb, 
  HelpCircle,
  Star,
  Compass,
  ArrowRight,
  GraduationCap,
  Sparkle
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { PYTHON_KIDS_COURSE } from '../../data/pythonKidsCourseData';
import { PythonKidInterpreter } from './PythonInterpreter';
import { PythonKidsCertificate } from './PythonKidsCertificate';
import { speakUrduFahad, stopUrduSpeech, FAHAD_VOICE_CONFIG } from '../../services/urduVoiceService';

export const PythonKidsStudio = ({ standalone = false }) => {
  // Navigation State
  const [activeModuleId, setActiveModuleId] = useState(1);
  const [activeLessonIndex, setActiveLessonIndex] = useState(0);
  const [viewMode, setViewMode] = useState('lesson'); // 'lesson' | 'module_quiz' | 'final_exam' | 'certificate'

  // Code Playground State
  const [userCode, setUserCode] = useState('');
  const [terminalOutput, setTerminalOutput] = useState([]);
  const [terminalError, setTerminalError] = useState(null);
  const [isRunning, setIsRunning] = useState(false);

  // Audio Speech State
  const [speakingLanguage, setSpeakingLanguage] = useState(null); // 'en' | 'ur' | null

  // Progress tracking in localStorage
  const [completedLessons, setCompletedLessons] = useState(() => {
    try {
      const saved = localStorage.getItem('dten_python_kids_completed');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Quiz state
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizScore, setQuizScore] = useState(null);
  const [examAnswers, setExamAnswers] = useState({});
  const [examScore, setExamScore] = useState(null);
  const [studentName, setStudentName] = useState('Fatima Ahmed');

  // Active module & lesson objects
  const currentModule = useMemo(() => {
    return PYTHON_KIDS_COURSE.modules.find(m => m.id === activeModuleId) || PYTHON_KIDS_COURSE.modules[0];
  }, [activeModuleId]);

  const currentLesson = useMemo(() => {
    return currentModule.lessons[activeLessonIndex] || currentModule.lessons[0];
  }, [currentModule, activeLessonIndex]);

  // Load starter code when lesson changes
  useEffect(() => {
    if (currentLesson) {
      setUserCode(currentLesson.starterCode || '');
      setTerminalOutput(['Click "▶ Run Code" to execute this program!']);
      setTerminalError(null);
      stopSpeaking();
    }
  }, [currentLesson?.id]);

  // Save lesson completion
  const markLessonCompleted = (lessonId) => {
    setCompletedLessons(prev => {
      if (prev.includes(lessonId)) return prev;
      const next = [...prev, lessonId];
      try {
        localStorage.setItem('dten_python_kids_completed', JSON.stringify(next));
      } catch (e) {
        console.warn(e);
      }
      return next;
    });
  };

  // Python Interpreter instance
  const interpreter = useMemo(() => {
    return new PythonKidInterpreter({
      onInput: async (promptMsg) => {
        return window.prompt(`🤖 PyBot asks:\n${promptMsg || 'Enter your input:'}`) || '';
      }
    });
  }, []);

  // Run Code Handler
  const handleRunCode = async () => {
    setIsRunning(true);
    setTerminalOutput(['Running code... ⏳']);
    setTerminalError(null);

    // Give UI a moment to show running state
    setTimeout(async () => {
      const result = await interpreter.run(userCode);
      setIsRunning(false);
      setTerminalOutput(result.output);
      setTerminalError(result.error);

      if (result.success) {
        markLessonCompleted(currentLesson.id);
        // Play small celebration if first time
        confetti({
          particleCount: 25,
          spread: 60,
          origin: { y: 0.8 }
        });
      }
    }, 150);
  };

  // Text to Speech for English and Fahad Motivational Urdu voice
  const speakText = (text, langCode) => {
    stopSpeaking();

    if (langCode === 'ur') {
      setSpeakingLanguage('ur');
      speakUrduFahad({
        text,
        lessonId: currentLesson?.id,
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
    setTerminalOutput(['Code reset to lesson example. Click Run!']);
    setTerminalError(null);
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

    if (score >= Math.ceil(questions.length * 0.6)) {
      confetti({
        particleCount: 75,
        spread: 80,
        origin: { y: 0.6 }
      });
    }
  };

  // Final Exam Submission
  const handleExamAnswer = (qId, optIdx) => {
    setExamAnswers(prev => ({ ...prev, [qId]: optIdx }));
  };

  const submitFinalExam = () => {
    let correctCount = 0;
    const questions = PYTHON_KIDS_COURSE.finalExam.questions;
    questions.forEach(q => {
      if (examAnswers[q.id] === q.answer) {
        correctCount++;
      }
    });
    const percent = Math.round((correctCount / questions.length) * 100);
    setExamScore(percent);

    if (percent >= PYTHON_KIDS_COURSE.finalExam.passingScore) {
      confetti({
        particleCount: 150,
        spread: 100,
        origin: { y: 0.5 }
      });
    }
  };

  // Progress metrics
  const totalLessonsCount = PYTHON_KIDS_COURSE.totalLessons;
  const progressPercent = Math.min(100, Math.round((completedLessons.length / totalLessonsCount) * 100));

  return (
    <div className={`space-y-6 ${standalone ? 'max-w-7xl mx-auto px-4 py-8' : ''}`}>
      
      {/* ─────────────────────────────────────────────────────────────
          1. FUN KIDS COURSE BANNER WITH MASCOT PYBOT
          ───────────────────────────────────────────────────────────── */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-900 via-brand-950 to-purple-950 text-white p-6 sm:p-8 shadow-2xl border-2 border-indigo-700/50">
        <div className="absolute top-0 right-0 w-80 h-80 bg-brand-500/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-brand-500/20 text-brand-300 border border-brand-400/30">
              <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-spin" />
              Junior Code Master • Ages 6-12 Years • 🇵🇰 Pakistan
            </div>

            <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-white flex items-center gap-3">
              <span>Python for Kids</span>
              <span className="text-xl sm:text-2xl font-urdu text-amber-300 font-bold">
                (جونیئر پائتھن ماسٹر)
              </span>
            </h1>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Learn real Python programming through playful Pakistani stories, cricket scores, Eid money calculators, 
              interactive terminal coding, and friendly voice explanations in English and Urdu!
            </p>
          </div>

          {/* Quick Certificate & Exam Trigger */}
          <div className="flex-shrink-0 flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={() => setViewMode('final_exam')}
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-900 font-black text-xs shadow-lg shadow-amber-500/30 transition-all active:scale-95"
            >
              <Trophy className="w-4 h-4 text-slate-950" />
              <span>Final Exam & Certificate</span>
            </button>
          </div>
        </div>

        {/* Course Progress Bar */}
        <div className="mt-6 pt-5 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-3 w-full sm:w-2/3">
            <span className="font-bold text-slate-300 whitespace-nowrap">
              Course Progress: {progressPercent}%
            </span>
            <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden border border-white/10">
              <div 
                className="bg-gradient-to-r from-brand-400 via-emerald-400 to-amber-400 h-full rounded-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
          <div className="font-bold text-emerald-400 whitespace-nowrap">
            {completedLessons.length} of {totalLessonsCount} Lessons Mastered ⭐
          </div>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          2. MODULE SELECTOR CAROUSEL (1 - 7 Modules)
          ───────────────────────────────────────────────────────────── */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider px-1">
          <span>7 Fun Adventure Modules</span>
          <span className="text-brand-600 dark:text-brand-400">Step-by-Step Learning</span>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {PYTHON_KIDS_COURSE.modules.map((mod) => {
            const isSelected = activeModuleId === mod.id && viewMode === 'lesson';
            return (
              <button
                key={`mod-pill-${mod.id}`}
                onClick={() => {
                  setActiveModuleId(mod.id);
                  setActiveLessonIndex(0);
                  setViewMode('lesson');
                }}
                className={`p-3 rounded-2xl text-left flex-shrink-0 transition-all border ${
                  isSelected
                    ? 'bg-brand-600 text-white border-brand-700 shadow-md scale-102'
                    : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/80 border-slate-200 dark:border-slate-800'
                }`}
                style={{ minWidth: '170px' }}
              >
                <div className="text-[10px] font-bold uppercase tracking-wider opacity-75">
                  Unit {mod.id} • {mod.badge.split('•')[1] || 'Kids'}
                </div>
                <div className="text-xs font-black truncate mt-0.5">
                  {mod.title.split(':')[1] || mod.title}
                </div>
                <div className="text-[10px] font-urdu opacity-80 mt-1 truncate">
                  {mod.urduTitle.split(':')[1] || mod.urduTitle}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          VIEW: CERTIFICATE VIEW
          ───────────────────────────────────────────────────────────── */}
      {viewMode === 'certificate' && (
        <PythonKidsCertificate
          studentName={studentName}
          onBackToCourse={() => setViewMode('lesson')}
        />
      )}

      {/* ─────────────────────────────────────────────────────────────
          VIEW: FINAL EXAM
          ───────────────────────────────────────────────────────────── */}
      {viewMode === 'final_exam' && (
        <div className="max-w-3xl mx-auto space-y-6 animate-fadeIn">
          <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-xl space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
              <div>
                <span className="text-xs font-black uppercase tracking-wider text-amber-600 dark:text-amber-400">
                  Official Certification Challenge
                </span>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                  {PYTHON_KIDS_COURSE.finalExam.title}
                </h2>
              </div>
              <button
                onClick={() => setViewMode('lesson')}
                className="px-3.5 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-bold text-slate-600 dark:text-slate-300"
              >
                Back to Lessons
              </button>
            </div>

            {/* Questions List */}
            <div className="space-y-6">
              {PYTHON_KIDS_COURSE.finalExam.questions.map((q, idx) => (
                <div key={q.id} className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-800 space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <span className="w-6 h-6 rounded-full bg-brand-600 text-white font-bold text-xs flex items-center justify-center flex-shrink-0">
                      {idx + 1}
                    </span>
                    <div className="flex-1 space-y-1">
                      <div className="font-bold text-sm sm:text-base text-slate-900 dark:text-white">
                        {q.question}
                      </div>
                      <div className="font-urdu text-sm text-slate-600 dark:text-slate-300" dir="rtl">
                        {q.urduQuestion}
                      </div>
                    </div>
                  </div>

                  {/* 4 Options */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                    {q.options.map((opt, optIdx) => {
                      const isSelected = examAnswers[q.id] === optIdx;
                      return (
                        <button
                          key={`exam-opt-${optIdx}`}
                          onClick={() => handleExamAnswer(q.id, optIdx)}
                          className={`p-3 rounded-xl border text-left text-xs font-bold transition-all flex items-center justify-between ${
                            isSelected
                              ? 'bg-brand-600 text-white border-brand-700 shadow-sm'
                              : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100'
                          }`}
                        >
                          <span>{opt}</span>
                          {isSelected && <Check className="w-4 h-4 text-white" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            {/* Submit Exam Button */}
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-slate-500">
                Passing Grade: 70% • Questions Answered: {Object.keys(examAnswers).length} of 10
              </div>

              <button
                onClick={submitFinalExam}
                className="w-full sm:w-auto px-8 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black text-sm shadow-md transition-all active:scale-95"
              >
                Submit Exam & Get Certificate 🎓
              </button>
            </div>

            {/* Exam Result Display */}
            {examScore !== null && (
              <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-900 to-indigo-950 text-white text-center space-y-4 animate-fadeIn">
                <Trophy className="w-12 h-12 text-amber-400 mx-auto" />
                <h3 className="text-2xl font-black">
                  {examScore >= 70 ? '🎉 MUBARAK! YOU PASSED!' : 'Keep Practicing!'}
                </h3>
                <p className="text-sm text-slate-300">
                  Your Final Score: <strong className="text-emerald-400 text-xl">{examScore}%</strong>
                </p>

                {examScore >= 70 ? (
                  <div className="pt-2">
                    <button
                      onClick={() => setViewMode('certificate')}
                      className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-sm shadow-lg transition-all"
                    >
                      🏆 View & Print Official D.TEN Certificate 🏆
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setExamScore(null)}
                    className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs"
                  >
                    Try Exam Again
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          VIEW: MODULE QUIZ
          ───────────────────────────────────────────────────────────── */}
      {viewMode === 'module_quiz' && (
        <div className="max-w-2xl mx-auto space-y-6 animate-fadeIn">
          <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-xl space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <h2 className="text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
                <Trophy className="w-5 h-5 text-amber-500" />
                {currentModule.quiz.title}
              </h2>
              <button
                onClick={() => setViewMode('lesson')}
                className="text-xs font-bold text-slate-500 hover:text-slate-900 dark:hover:text-white"
              >
                Back to Lessons
              </button>
            </div>

            {/* Questions */}
            <div className="space-y-5">
              {currentModule.quiz.questions.map((q, qIdx) => (
                <div key={`mq-${qIdx}`} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-800 space-y-3">
                  <div className="font-bold text-sm text-slate-900 dark:text-white">
                    {qIdx + 1}. {q.q}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {q.options.map((opt, optIdx) => {
                      const isSelected = quizAnswers[qIdx] === optIdx;
                      return (
                        <button
                          key={`mq-opt-${optIdx}`}
                          onClick={() => handleQuizAnswer(qIdx, optIdx)}
                          className={`p-3 rounded-xl border text-left text-xs font-bold transition-all ${
                            isSelected
                              ? 'bg-brand-600 text-white border-brand-700 shadow-sm'
                              : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100'
                          }`}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-2 flex items-center justify-between">
              <button
                onClick={submitModuleQuiz}
                className="px-6 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-bold text-xs shadow-md transition-all"
              >
                Submit Answers
              </button>

              {quizScore !== null && (
                <div className="font-bold text-xs text-emerald-600 dark:text-emerald-400">
                  Score: {quizScore} / {currentModule.quiz.questions.length} Correct!
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          VIEW: MAIN INTERACTIVE LESSON + PLAYGROUND
          ───────────────────────────────────────────────────────────── */}
      {viewMode === 'lesson' && (
        <div className="space-y-6">
          
          {/* Lesson Sub-Nav: 3 Lessons in this module */}
          <div className="flex items-center justify-between p-2 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-1.5 overflow-x-auto">
              {currentModule.lessons.map((les, lIdx) => {
                const isSelected = activeLessonIndex === lIdx;
                const isDone = completedLessons.includes(les.id);
                return (
                  <button
                    key={les.id}
                    onClick={() => setActiveLessonIndex(lIdx)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all whitespace-nowrap ${
                      isSelected
                        ? 'bg-white dark:bg-slate-800 text-brand-600 dark:text-brand-400 shadow-sm'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                    }`}
                  >
                    {isDone ? (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                    ) : (
                      <span className="w-4 h-4 rounded-full bg-slate-200 dark:bg-slate-700 text-[10px] flex items-center justify-center font-bold">
                        {lIdx + 1}
                      </span>
                    )}
                    <span>{les.title.split(':')[0]}</span>
                  </button>
                );
              })}
            </div>

            <button
              onClick={() => {
                setQuizAnswers({});
                setQuizScore(null);
                setViewMode('module_quiz');
              }}
              className="flex-shrink-0 px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs shadow-sm transition-all"
            >
              Take Unit Quiz 🏆
            </button>
          </div>

          {/* Lesson Story Card with Dual Voice Buttons */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="space-y-1">
                <span className="text-xs font-extrabold uppercase tracking-wider text-brand-600 dark:text-brand-400">
                  Unit {activeModuleId} • {currentLesson.title.split(':')[0]}
                </span>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                  {currentLesson.title.split(':')[1] || currentLesson.title}
                </h2>
                <h3 className="text-base sm:text-lg font-urdu text-amber-600 dark:text-amber-400 font-bold" dir="rtl">
                  {currentLesson.urduTitle}
                </h3>
              </div>

              {/* Dual Voice Audio Buttons */}
              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={() => speakingLanguage === 'ur' ? stopSpeaking() : speakText(currentLesson.urduVoice, 'ur')}
                  className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all border ${
                    speakingLanguage === 'ur'
                      ? 'bg-emerald-600 text-white border-emerald-700 shadow-md ring-2 ring-emerald-400 animate-pulse'
                      : 'bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-200 border-emerald-300 dark:border-emerald-700'
                  }`}
                  title="سبق سنیں (اُردو آواز)"
                >
                  <Volume2 className={`w-4 h-4 ${speakingLanguage === 'ur' ? 'animate-bounce text-yellow-300' : 'text-emerald-600'}`} />
                  <span className="font-urdu text-xs">
                    {speakingLanguage === 'ur' ? 'روکیں (Stop)' : '🎙️ اُردو آواز'}
                  </span>
                </button>

                <button
                  onClick={() => speakingLanguage === 'en' ? stopSpeaking() : speakText(currentLesson.englishVoice, 'en')}
                  className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all border ${
                    speakingLanguage === 'en'
                      ? 'bg-brand-600 text-white border-brand-700 shadow-md ring-2 ring-brand-400 animate-pulse'
                      : 'bg-brand-50 hover:bg-brand-100 dark:bg-brand-950/40 text-brand-600 dark:text-brand-300 border-brand-200 dark:border-brand-800'
                  }`}
                  title="Listen in English"
                >
                  <Volume2 className={`w-4 h-4 ${speakingLanguage === 'en' ? 'animate-bounce' : ''}`} />
                  <span>{speakingLanguage === 'en' ? 'Stop Audio' : '🔊 English Voice'}</span>
                </button>
              </div>
            </div>

            {/* Concept Explanation (Bilingual English + Urdu) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-blue-50/60 dark:bg-slate-800/60 border border-blue-200/60 dark:border-slate-700 text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed space-y-1">
                <div className="font-bold text-brand-700 dark:text-brand-400 text-xs uppercase tracking-wider">
                  How It Works (English):
                </div>
                <p>{currentLesson.concept}</p>
                {currentLesson.pakistaniContext && (
                  <p className="text-xs text-indigo-700 dark:text-indigo-300 font-semibold pt-1">
                    🇵🇰 Example: {currentLesson.pakistaniContext}
                  </p>
                )}
              </div>

              <div className="p-4 rounded-2xl bg-amber-50/60 dark:bg-slate-800/60 border border-amber-200/60 dark:border-slate-700 text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed space-y-1 font-urdu" dir="rtl">
                <div className="font-sans font-bold text-amber-700 dark:text-amber-400 text-xs uppercase tracking-wider" dir="ltr">
                  آسان اردو میں سمجھیں:
                </div>
                <p className="leading-[2.0]">{currentLesson.urduConcept}</p>
              </div>
            </div>

            {/* Fun Fact / PyBot Tip */}
            {currentLesson.funFact && (
              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs flex items-center gap-3">
                <span className="text-xl">🤖</span>
                <span className="text-slate-600 dark:text-slate-300 font-medium">
                  <strong>PyBot Tip:</strong> {currentLesson.funFact}
                </span>
              </div>
            )}
          </div>

          {/* ─────────────────────────────────────────────────────────────
              LIVE CODE PLAYGROUND & TERMINAL (Space to enter code & see error)
              ───────────────────────────────────────────────────────────── */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Left: Code Editor Sandbox */}
            <div className="rounded-3xl bg-slate-900 border-2 border-slate-800 text-white shadow-xl overflow-hidden flex flex-col">
              {/* Sandbox Header */}
              <div className="p-3.5 bg-slate-950/80 border-b border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-500" />
                  <div className="w-3 h-3 rounded-full bg-amber-500" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500" />
                  <span className="text-xs font-mono font-bold text-slate-400 ml-2">
                    main.py • Interactive Editor
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleResetCode}
                    className="p-1.5 text-slate-400 hover:text-white rounded-lg transition-colors text-xs flex items-center gap-1"
                    title="Reset to starter example"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Reset</span>
                  </button>

                  <button
                    onClick={handleRunCode}
                    disabled={isRunning}
                    className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 active:scale-95 text-slate-950 font-black text-xs shadow-md shadow-emerald-500/30 transition-all disabled:opacity-50"
                  >
                    <Play className="w-3.5 h-3.5 fill-slate-950" />
                    <span>{isRunning ? 'Running...' : 'Run Code ▶'}</span>
                  </button>
                </div>
              </div>

              {/* Code Textarea */}
              <div className="relative flex-1 p-4 font-mono text-xs sm:text-sm leading-relaxed min-h-[260px] bg-slate-900">
                <textarea
                  value={userCode}
                  onChange={(e) => setUserCode(e.target.value)}
                  placeholder="# Write your Python code here..."
                  spellCheck="false"
                  className="w-full h-full bg-transparent text-emerald-400 focus:outline-none resize-none font-mono selection:bg-brand-500/40"
                  style={{ minHeight: '260px' }}
                />
              </div>

              {/* Challenge Banner at bottom of editor */}
              {currentLesson.challenge && (
                <div className="p-3.5 bg-slate-950/60 border-t border-slate-800 text-xs flex items-start gap-2.5">
                  <span className="text-base">🎯</span>
                  <div className="flex-1">
                    <strong className="text-amber-400">Mini Challenge: </strong>
                    <span className="text-slate-300">{currentLesson.challenge}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Right: Interactive Terminal & Error Diagnostics */}
            <div className="rounded-3xl bg-slate-950 border-2 border-slate-800 text-white shadow-xl overflow-hidden flex flex-col">
              {/* Terminal Header */}
              <div className="p-3.5 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <TerminalIcon className="w-4 h-4 text-emerald-400" />
                  <span className="text-xs font-mono font-bold text-slate-300">
                    Terminal Output
                  </span>
                </div>
                <div className="text-[11px] font-mono text-slate-500">
                  Python 3.12 (Interactive)
                </div>
              </div>

              {/* Terminal Logs Window */}
              <div className="p-4 flex-1 font-mono text-xs sm:text-sm space-y-1.5 min-h-[160px] max-h-[220px] overflow-y-auto">
                {terminalOutput.map((out, idx) => (
                  <div key={`out-${idx}`} className="text-slate-100 leading-relaxed whitespace-pre-wrap">
                    {out}
                  </div>
                ))}
              </div>

              {/* Error Diagnostics Card (Friendly in English & Urdu) */}
              {terminalError && (
                <div className="p-4 bg-rose-950/40 border-t-2 border-rose-600 text-xs space-y-2 animate-fadeIn">
                  <div className="flex items-center gap-2 text-rose-400 font-bold">
                    <AlertCircle className="w-4 h-4 text-rose-500" />
                    <span>Oopsie on Line {terminalError.line || 1}! {terminalError.type}</span>
                  </div>

                  <p className="text-slate-200">{terminalError.message}</p>
                  
                  {terminalError.urduMessage && (
                    <p className="font-urdu text-amber-300 text-xs leading-[2.0]" dir="rtl">
                      {terminalError.urduMessage}
                    </p>
                  )}

                  {terminalError.hint && (
                    <div className="p-2 rounded-lg bg-black/40 text-emerald-300 font-mono text-[11px]">
                      💡 <strong>Hint:</strong> {terminalError.hint}
                    </div>
                  )}
                </div>
              )}

              {/* Next Lesson Bar */}
              <div className="p-3 bg-slate-900 border-t border-slate-800 flex items-center justify-between text-xs">
                <button
                  onClick={() => {
                    if (activeLessonIndex > 0) {
                      setActiveLessonIndex(prev => prev - 1);
                    } else if (activeModuleId > 1) {
                      setActiveModuleId(prev => prev - 1);
                      setActiveLessonIndex(0);
                    }
                  }}
                  disabled={activeLessonIndex === 0 && activeModuleId === 1}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Previous</span>
                </button>

                <button
                  onClick={() => {
                    markLessonCompleted(currentLesson.id);
                    if (activeLessonIndex < currentModule.lessons.length - 1) {
                      setActiveLessonIndex(prev => prev + 1);
                    } else if (activeModuleId < PYTHON_KIDS_COURSE.modules.length) {
                      setActiveModuleId(prev => prev + 1);
                      setActiveLessonIndex(0);
                    } else {
                      setViewMode('final_exam');
                    }
                  }}
                  className="flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-bold shadow-md shadow-brand-600/30 active:scale-95 transition-all"
                >
                  <span>Next Lesson</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
