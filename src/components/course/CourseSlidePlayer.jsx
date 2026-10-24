import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Play, 
  Pause, 
  Maximize, 
  Minimize, 
  BookOpen, 
  Presentation, 
  Volume2, 
  VolumeX, 
  RotateCcw, 
  CheckCircle2, 
  Sparkles, 
  ArrowRight,
  Monitor,
  Check,
  Tv
} from 'lucide-react';
import { FormattedText } from '../common/FormattedText';

/**
 * Utility: Splits markdown lesson content into distinct slides
 * using horizontal rules (---, ___, ***) or heading sections
 */
export const parseLessonToSlides = (content, lessonTitle = 'Slide') => {
  if (!content || typeof content !== 'string') {
    return [
      {
        id: 1,
        slideNumber: 1,
        title: lessonTitle,
        content: content || 'No slide content available.'
      }
    ];
  }

  // Split by markdown horizontal rules (---, ___, ***) on their own line
  const rawParts = content
    .split(/\n\s*(?:---|___|\*\*\*)\s*\n/)
    .map(p => p.trim())
    .filter(Boolean);

  if (rawParts.length <= 1) {
    // Fallback: If no horizontal rules, check if there are 2 or more H2/H3 headings
    const headingSections = content.split(/\n(?=###?\s+)/).map(p => p.trim()).filter(Boolean);
    if (headingSections.length >= 2) {
      return headingSections.map((sec, idx) => {
        const titleMatch = sec.match(/^###?\s+(.+)$/m);
        const title = titleMatch 
          ? titleMatch[1].replace(/[*_#]/g, '').trim() 
          : `${lessonTitle} - Part ${idx + 1}`;
        return {
          id: idx + 1,
          slideNumber: idx + 1,
          title,
          content: sec
        };
      });
    }

    return [
      {
        id: 1,
        slideNumber: 1,
        title: lessonTitle,
        content: content
      }
    ];
  }

  return rawParts.map((part, idx) => {
    const headingMatch = part.match(/^#{1,4}\s+(.+)$/m);
    const title = headingMatch 
      ? headingMatch[1].replace(/[*_#]/g, '').trim() 
      : (idx === 0 && lessonTitle ? lessonTitle : `Slide ${idx + 1}`);

    return {
      id: idx + 1,
      slideNumber: idx + 1,
      title,
      content: part
    };
  });
};

/**
 * CourseSlidePlayer: Modern, interactive presentation runner for lesson slide decks
 */
export const CourseSlidePlayer = ({
  content,
  lessonTitle = '',
  courseTitle = '',
  lessonIndex = 0,
  totalLessons = 1,
  onComplete,
  isCompleted = false,
  hasPracticeQuestions = false,
  onScrollToPractice,
  onNextLesson,
  onPreviousLesson,
  hasMasterDeck = false,
  onOpenMasterDeck
}) => {
  const containerRef = useRef(null);

  // Parse slides
  const slides = useMemo(() => {
    return parseLessonToSlides(content, lessonTitle);
  }, [content, lessonTitle]);

  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [viewMode, setViewMode] = useState('slides'); // 'slides' | 'reading'
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [autoPlaySeconds, setAutoPlaySeconds] = useState(9);
  const [timeLeft, setTimeLeft] = useState(9);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [speakingLanguage, setSpeakingLanguage] = useState('en'); // 'en' | 'ur'

  // Reset active slide when lesson changes
  useEffect(() => {
    setActiveSlideIndex(0);
    setIsPlaying(false);
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    setIsSpeaking(false);
  }, [lessonTitle, content]);

  const currentSlide = slides[activeSlideIndex] || slides[0] || {
    id: 1,
    slideNumber: 1,
    title: lessonTitle,
    content: ''
  };

  const totalSlides = slides.length;
  const progressPercent = Math.round(((activeSlideIndex + 1) / totalSlides) * 100);

  // Navigation handlers
  const handlePrev = useCallback(() => {
    setActiveSlideIndex(prev => Math.max(0, prev - 1));
    setTimeLeft(autoPlaySeconds);
  }, [autoPlaySeconds]);

  const handleNext = useCallback(() => {
    if (activeSlideIndex < totalSlides - 1) {
      setActiveSlideIndex(prev => prev + 1);
      setTimeLeft(autoPlaySeconds);
    } else {
      setIsPlaying(false);
      if (onComplete) onComplete();
      if (hasPracticeQuestions && onScrollToPractice) {
        onScrollToPractice();
      } else if (onNextLesson) {
        onNextLesson();
      }
    }
  }, [activeSlideIndex, totalSlides, autoPlaySeconds, onComplete, hasPracticeQuestions, onScrollToPractice, onNextLesson]);

  // Fullscreen toggle
  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(() => {
        setIsFullscreen(!isFullscreen);
      });
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {
        setIsFullscreen(false);
      });
      setIsFullscreen(false);
    }
  };

  // Sync fullscreen change with Esc key
  useEffect(() => {
    const handleFsChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };
    document.addEventListener('fullscreenchange', handleFsChange);
    return () => document.removeEventListener('fullscreenchange', handleFsChange);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Ignore if user is inside an input or textarea
      if (['INPUT', 'TEXTAREA'].includes(e.target.tagName)) return;

      if (e.key === 'ArrowRight' || e.key === 'PageDown') {
        e.preventDefault();
        handleNext();
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        e.preventDefault();
        handlePrev();
      } else if (e.key === ' ' && viewMode === 'slides') {
        e.preventDefault();
        handleNext();
      } else if (e.key.toLowerCase() === 'f') {
        e.preventDefault();
        toggleFullscreen();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handlePrev, viewMode]);

  // Auto-play timer
  useEffect(() => {
    if (!isPlaying) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          if (activeSlideIndex < totalSlides - 1) {
            setActiveSlideIndex(i => i + 1);
            return autoPlaySeconds;
          } else {
            setIsPlaying(false);
            return autoPlaySeconds;
          }
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isPlaying, activeSlideIndex, totalSlides, autoPlaySeconds]);

  // Text-to-speech for the active slide
  const handleToggleSpeech = (lang = 'en') => {
    if (!('speechSynthesis' in window)) {
      alert('Speech synthesis is not supported in this browser.');
      return;
    }

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    // Prepare clean text without markdown tags
    const cleanText = currentSlide.content
      .replace(/#{1,6}\s+/g, '')
      .replace(/[*_`~>]/g, '')
      .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
      .replace(/\|/g, ' ')
      .trim();

    if (!cleanText) return;

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.rate = 0.95;
    utterance.pitch = 1.0;

    const voices = window.speechSynthesis.getVoices();
    if (lang === 'ur') {
      const urduVoice = voices.find(v => v.lang.startsWith('ur') || v.name.toLowerCase().includes('urdu'));
      if (urduVoice) utterance.voice = urduVoice;
      utterance.lang = 'ur-PK';
      setSpeakingLanguage('ur');
    } else {
      const engVoice = voices.find(v => v.lang.startsWith('en') && (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('David')));
      if (engVoice) utterance.voice = engVoice;
      utterance.lang = 'en-US';
      setSpeakingLanguage('en');
    }

    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
    setIsSpeaking(true);
  };

  // Stop speaking when unmounting or changing slides
  useEffect(() => {
    return () => {
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, [activeSlideIndex]);

  return (
    <div 
      ref={containerRef}
      className={`course-slide-player flex flex-col transition-all duration-300 ${
        isFullscreen 
          ? 'fixed inset-0 z-50 bg-slate-950 p-4 sm:p-8 overflow-y-auto' 
          : 'relative w-full rounded-3xl bg-gradient-to-b from-white via-slate-50/50 to-white dark:from-slate-900 dark:via-slate-900/90 dark:to-slate-950 border border-slate-200/90 dark:border-slate-800 shadow-xl overflow-hidden'
      }`}
    >
      {/* Top Deck Control Header */}
      <div className="px-4 py-3 sm:px-6 sm:py-4 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3 sticky top-0 z-20">
        {/* Left: View Mode Toggle & Masterclass Trigger */}
        <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
          {/* Segmented View Mode Switcher */}
          <div className="inline-flex items-center p-1 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700/80 text-xs font-semibold">
            <button
              type="button"
              onClick={() => setViewMode('slides')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
                viewMode === 'slides'
                  ? 'bg-brand-600 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Presentation className="w-3.5 h-3.5" />
              <span>Slides ({totalSlides})</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode('reading')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
                viewMode === 'reading'
                  ? 'bg-brand-600 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Full Text</span>
            </button>
          </div>

          {/* Masterclass Deck Launcher Button if available */}
          {hasMasterDeck && onOpenMasterDeck && (
            <button
              type="button"
              onClick={onOpenMasterDeck}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-sm hover:from-amber-600 hover:to-orange-600 transition-all hover:scale-[1.02]"
              title="Launch Full Masterclass PowerPoint (.PPTX) Deck"
            >
              <Tv className="w-3.5 h-3.5" />
              <span>Masterclass Deck</span>
            </button>
          )}
        </div>

        {/* Right: Audio, Auto-play, Fullscreen Controls */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Slide Voice Buttons */}
          <button
            type="button"
            onClick={() => handleToggleSpeech('en')}
            className={`p-2 rounded-xl text-xs font-semibold border transition-all flex items-center gap-1.5 ${
              isSpeaking && speakingLanguage === 'en'
                ? 'bg-brand-600 text-white border-brand-500 animate-pulse'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
            title="Read Current Slide in English"
          >
            {isSpeaking && speakingLanguage === 'en' ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-brand-500" />}
            <span className="hidden sm:inline">English Voice</span>
          </button>

          <button
            type="button"
            onClick={() => handleToggleSpeech('ur')}
            className={`p-2 rounded-xl text-xs font-semibold border transition-all flex items-center gap-1.5 ${
              isSpeaking && speakingLanguage === 'ur'
                ? 'bg-emerald-600 text-white border-emerald-500 animate-pulse'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
            title="اُردو آواز میں سنیں"
          >
            <span className="text-xs">🎙️ اُردو آواز</span>
          </button>

          {/* Auto-play Slideshow (only in slide mode) */}
          {viewMode === 'slides' && totalSlides > 1 && (
            <button
              type="button"
              onClick={() => {
                setIsPlaying(!isPlaying);
                setTimeLeft(autoPlaySeconds);
              }}
              className={`p-2 rounded-xl text-xs font-semibold border transition-all flex items-center gap-1.5 ${
                isPlaying
                  ? 'bg-amber-500 text-white border-amber-400'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
              title={isPlaying ? `Auto-playing (${timeLeft}s)` : "Start Auto-play Slideshow"}
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 text-amber-500" />}
              <span className="hidden md:inline">{isPlaying ? `${timeLeft}s` : "Auto"}</span>
            </button>
          )}

          {/* Fullscreen Button */}
          <button
            type="button"
            onClick={toggleFullscreen}
            className="p-2 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all"
            title={isFullscreen ? "Exit Fullscreen (Esc)" : "Full Presentation Mode (F)"}
          >
            {isFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Slide Navigation Stepper Bar (Only in Slide Mode) */}
      {viewMode === 'slides' && totalSlides > 1 && (
        <div className="px-4 py-3 sm:px-6 bg-slate-50/80 dark:bg-slate-900/60 border-b border-slate-200/60 dark:border-slate-800/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          {/* Active Slide Counter & Title */}
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-black uppercase tracking-wider bg-brand-100 dark:bg-brand-950/80 text-brand-700 dark:text-brand-300 border border-brand-200 dark:border-brand-800">
              Slide {activeSlideIndex + 1} / {totalSlides}
            </span>
            <h4 className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200 truncate max-w-xs sm:max-w-md">
              {currentSlide.title}
            </h4>
          </div>

          {/* Horizontal Slide Stepper Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto max-w-full pb-1 sm:pb-0 scrollbar-thin">
            {slides.map((s, idx) => {
              const isCurrent = idx === activeSlideIndex;
              const isPast = idx < activeSlideIndex;

              return (
                <button
                  key={s.id || idx}
                  type="button"
                  onClick={() => {
                    setActiveSlideIndex(idx);
                    setTimeLeft(autoPlaySeconds);
                  }}
                  className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg text-xs font-bold flex items-center justify-center transition-all ${
                    isCurrent
                      ? 'bg-brand-600 text-white shadow-md ring-2 ring-brand-400 scale-105'
                      : isPast
                      ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border border-emerald-300 dark:border-emerald-800'
                      : 'bg-white dark:bg-slate-800 text-slate-500 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700'
                  }`}
                  title={`${idx + 1}. ${s.title}`}
                >
                  {isPast ? <Check className="w-3.5 h-3.5" /> : idx + 1}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Main Slide Stage Body */}
      {viewMode === 'slides' ? (
        <div className="flex-1 p-5 sm:p-8 md:p-10 flex flex-col justify-between min-h-[420px]">
          {/* Active Slide Card */}
          <div className="space-y-6 max-w-4xl mx-auto w-full">
            {/* Slide Title Banner */}
            <div className="pb-3 border-b border-slate-200/80 dark:border-slate-800 flex items-center justify-between gap-3">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  {courseTitle ? `${courseTitle} • ` : ''}Lesson {lessonIndex + 1}
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mt-0.5 tracking-tight">
                  {currentSlide.title}
                </h3>
              </div>
              <span className="hidden sm:inline-flex px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                {progressPercent}% Completed
              </span>
            </div>

            {/* Slide Rich Content */}
            <div className="slide-content-stage text-slate-800 dark:text-slate-200 leading-relaxed text-sm sm:text-base">
              <FormattedText content={currentSlide.content} />
            </div>
          </div>

          {/* Bottom Slide Navigation Bar */}
          <div className="mt-8 pt-6 border-t border-slate-200/80 dark:border-slate-800 max-w-4xl mx-auto w-full flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Previous Button */}
            <button
              type="button"
              onClick={handlePrev}
              disabled={activeSlideIndex === 0}
              className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${
                activeSlideIndex === 0
                  ? 'opacity-40 cursor-not-allowed bg-slate-100 dark:bg-slate-800 text-slate-400'
                  : 'bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-slate-700 shadow-sm hover:-translate-x-0.5'
              }`}
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Previous Slide</span>
            </button>

            {/* Mini Progress Indicator with keyboard hint */}
            <div className="flex flex-col items-center gap-1.5 w-full sm:w-64">
              <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden border border-slate-200/60 dark:border-slate-700/60">
                <div 
                  className="h-full bg-gradient-to-r from-brand-600 to-indigo-500 rounded-full transition-all duration-300"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
              <span className="text-[11px] text-slate-400 font-medium hidden sm:inline">
                Use <kbd className="px-1 py-0.5 rounded bg-slate-200 dark:bg-slate-700 font-mono text-[10px]">←</kbd> <kbd className="px-1 py-0.5 rounded bg-slate-200 dark:bg-slate-700 font-mono text-[10px]">→</kbd> keys to flip
              </span>
            </div>

            {/* Next / Completion Button */}
            <button
              type="button"
              onClick={handleNext}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-500 hover:to-indigo-500 text-white shadow-md hover:shadow-brand-500/20 transition-all hover:translate-x-0.5"
            >
              {activeSlideIndex < totalSlides - 1 ? (
                <>
                  <span>Next Slide</span>
                  <ChevronRight className="w-4 h-4" />
                </>
              ) : hasPracticeQuestions ? (
                <>
                  <span>Take Knowledge Check</span>
                  <Sparkles className="w-4 h-4" />
                </>
              ) : onNextLesson ? (
                <>
                  <span>Finish & Next Lesson</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              ) : (
                <>
                  <span>Complete Lesson</span>
                  <CheckCircle2 className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </div>
      ) : (
        /* Reading Document Mode (All content displayed linearly) */
        <div className="p-6 sm:p-10 max-w-4xl mx-auto w-full space-y-6">
          <div className="p-4 rounded-2xl bg-brand-50 dark:bg-brand-950/40 border border-brand-200 dark:border-brand-800 flex items-center justify-between gap-4">
            <div>
              <h4 className="text-sm font-bold text-brand-700 dark:text-brand-300">
                Full Reading Mode Active
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                You are reading all {totalSlides} slides as a single continuous document.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setViewMode('slides')}
              className="px-3 py-1.5 rounded-xl text-xs font-bold bg-brand-600 text-white hover:bg-brand-500 transition-all"
            >
              Switch to Slides
            </button>
          </div>

          <div className="text-slate-800 dark:text-slate-200 leading-relaxed text-sm sm:text-base space-y-8">
            <FormattedText content={content} />
          </div>

          {/* Bottom Action in reading mode */}
          <div className="pt-6 border-t border-slate-200 dark:border-slate-800 flex justify-end">
            <button
              type="button"
              onClick={() => {
                if (onComplete) onComplete();
                if (hasPracticeQuestions && onScrollToPractice) {
                  onScrollToPractice();
                } else if (onNextLesson) {
                  onNextLesson();
                }
              }}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold bg-brand-600 hover:bg-brand-500 text-white shadow-md transition-all"
            >
              <span>{hasPracticeQuestions ? "Take Knowledge Check" : "Complete Lesson"}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
