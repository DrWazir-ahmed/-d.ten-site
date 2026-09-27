import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  Play, 
  Pause, 
  ChevronLeft, 
  ChevronRight, 
  Maximize, 
  Minimize, 
  FileText, 
  Layers, 
  Sparkles, 
  Upload, 
  Download, 
  Printer, 
  X, 
  Tv, 
  Check, 
  HelpCircle, 
  Eye, 
  EyeOff, 
  Volume2, 
  Settings, 
  Clock, 
  Share2, 
  Presentation,
  CheckCircle2,
  ArrowRight,
  Bookmark,
  Radio
} from 'lucide-react';
import { parsePptxFile } from '../../utils/pptxParser';

export const PresentationRunner = ({
  presentation,
  initialSlide = 1,
  onClose,
  readOnly = false
}) => {
  // Active Deck State
  const [deck, setDeck] = useState(() => {
    if (presentation?.presentationData) {
      return presentation.presentationData;
    }
    if (presentation?.slides && Array.isArray(presentation.slides)) {
      return presentation;
    }
    // Default fallback single slide
    return {
      title: presentation?.title || 'Presentation',
      subtitle: presentation?.description || '',
      author: presentation?.author || 'Dr Wazir Ahmed',
      slides: [
        {
          id: 1,
          slideNumber: 1,
          title: presentation?.title || 'Overview',
          subtitle: presentation?.description || '',
          bullets: [
            presentation?.description || 'Presentation content'
          ],
          notes: 'Speaker notes for this presentation.'
        }
      ]
    };
  });

  const [currentSlideIndex, setCurrentSlideIndex] = useState(
    Math.max(0, Math.min(initialSlide - 1, (deck.slides?.length || 1) - 1))
  );

  // Runner Settings & Modes
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showNotes, setShowNotes] = useState(false);
  const [showGrid, setShowGrid] = useState(false);
  const [laserPointer, setLaserPointer] = useState(false);
  const [laserPos, setLaserPos] = useState({ x: 0, y: 0, visible: false });
  const [isBlackout, setIsBlackout] = useState(false);
  const [autoPlay, setAutoPlay] = useState(false);
  const [autoPlayInterval, setAutoPlayInterval] = useState(5); // seconds
  const [theme, setTheme] = useState(deck.theme || 'navy'); // 'navy', 'emerald', 'violet', 'dark', 'light'
  const [fontSize, setFontSize] = useState('normal'); // 'normal', 'large'
  const [parsingFile, setParsingFile] = useState(false);
  const [parseError, setParseError] = useState(null);
  const [parseSuccessMsg, setParseSuccessMsg] = useState('');

  const containerRef = useRef(null);
  const slideAreaRef = useRef(null);
  const autoPlayTimerRef = useRef(null);
  const fileInputRef = useRef(null);

  const slides = deck.slides || [];
  const currentSlide = slides[currentSlideIndex] || slides[0] || {};
  const totalSlides = slides.length;

  // Next / Prev slide handlers
  const goToNextSlide = useCallback(() => {
    setCurrentSlideIndex(prev => (prev < totalSlides - 1 ? prev + 1 : prev));
  }, [totalSlides]);

  const goToPrevSlide = useCallback(() => {
    setCurrentSlideIndex(prev => (prev > 0 ? prev - 1 : prev));
  }, []);

  const goToSlide = (idx) => {
    if (idx >= 0 && idx < totalSlides) {
      setCurrentSlideIndex(idx);
      setShowGrid(false);
    }
  };

  // Fullscreen toggle
  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(err => {
        console.warn('Fullscreen request failed:', err);
      });
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(err => {
        console.warn('Exit fullscreen failed:', err);
      });
      setIsFullscreen(false);
    }
  };

  // Listen for fullscreen change event (e.g. user presses Esc)
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
      // Don't intercept if user is typing in an input
      if (['INPUT', 'TEXTAREA'].includes(e.target.tagName)) return;

      switch (e.key) {
        case 'ArrowRight':
        case 'PageDown':
        case ' ':
        case 'Enter':
          e.preventDefault();
          goToNextSlide();
          break;
        case 'ArrowLeft':
        case 'PageUp':
        case 'Backspace':
          e.preventDefault();
          goToPrevSlide();
          break;
        case 'f':
        case 'F':
          e.preventDefault();
          toggleFullscreen();
          break;
        case 'n':
        case 'N':
          e.preventDefault();
          setShowNotes(prev => !prev);
          break;
        case 'b':
        case 'B':
          e.preventDefault();
          setIsBlackout(prev => !prev);
          break;
        case 'l':
        case 'L':
          e.preventDefault();
          setLaserPointer(prev => !prev);
          break;
        case 'g':
        case 'G':
          e.preventDefault();
          setShowGrid(prev => !prev);
          break;
        case 'Home':
          e.preventDefault();
          goToSlide(0);
          break;
        case 'End':
          e.preventDefault();
          goToSlide(totalSlides - 1);
          break;
        case 'Escape':
          if (showGrid) setShowGrid(false);
          else if (isBlackout) setIsBlackout(false);
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goToNextSlide, goToPrevSlide, showGrid, isBlackout, totalSlides]);

  // Auto-play timer
  useEffect(() => {
    if (autoPlay) {
      autoPlayTimerRef.current = setInterval(() => {
        setCurrentSlideIndex(prev => {
          if (prev < totalSlides - 1) {
            return prev + 1;
          } else {
            setAutoPlay(false); // Stop at end of deck
            return prev;
          }
        });
      }, autoPlayInterval * 1000);
    } else {
      if (autoPlayTimerRef.current) clearInterval(autoPlayTimerRef.current);
    }
    return () => {
      if (autoPlayTimerRef.current) clearInterval(autoPlayTimerRef.current);
    };
  }, [autoPlay, autoPlayInterval, totalSlides]);

  // Laser Pointer tracking
  const handleMouseMove = (e) => {
    if (!laserPointer || !slideAreaRef.current) return;
    const rect = slideAreaRef.current.getBoundingClientRect();
    setLaserPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      visible: true
    });
  };

  const handleMouseLeave = () => {
    if (laserPointer) {
      setLaserPos(prev => ({ ...prev, visible: false }));
    }
  };

  // Handle local .PPTX file selection
  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setParsingFile(true);
    setParseError(null);
    setParseSuccessMsg('');

    try {
      const result = await parsePptxFile(file);
      if (result.success && result.slides?.length > 0) {
        setDeck({
          title: result.title || file.name.replace(/\.[^/.]+$/, ''),
          subtitle: `Loaded from local file (${result.totalSlides} slides)`,
          author: 'Imported Deck',
          format: 'pptx',
          slides: result.slides
        });
        setCurrentSlideIndex(0);
        setParseSuccessMsg(`Successfully loaded ${result.totalSlides} slides from "${file.name}"!`);
        setTimeout(() => setParseSuccessMsg(''), 4500);
      } else {
        setParseError(result.error || 'Could not parse PPTX. Please make sure this is a valid .pptx PowerPoint file.');
      }
    } catch (err) {
      setParseError(err.message || 'Error reading PPTX file.');
    } finally {
      setParsingFile(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  // Theme style classes
  const getThemeClasses = () => {
    switch (theme) {
      case 'emerald':
        return {
          bg: 'bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950 text-slate-100',
          accent: 'text-emerald-400',
          accentBg: 'bg-emerald-500/20 border-emerald-500/30 text-emerald-300',
          cardBg: 'bg-slate-900/60 border-slate-700/60 backdrop-blur-sm',
          progress: 'bg-emerald-500'
        };
      case 'violet':
        return {
          bg: 'bg-gradient-to-br from-slate-950 via-slate-900 to-purple-950 text-slate-100',
          accent: 'text-purple-400',
          accentBg: 'bg-purple-500/20 border-purple-500/30 text-purple-300',
          cardBg: 'bg-slate-900/60 border-slate-700/60 backdrop-blur-sm',
          progress: 'bg-purple-500'
        };
      case 'dark':
        return {
          bg: 'bg-slate-950 text-slate-100',
          accent: 'text-amber-400',
          accentBg: 'bg-amber-500/20 border-amber-500/30 text-amber-300',
          cardBg: 'bg-slate-900/80 border-slate-800',
          progress: 'bg-amber-500'
        };
      case 'light':
        return {
          bg: 'bg-slate-50 text-slate-900',
          accent: 'text-brand-600',
          accentBg: 'bg-brand-50 border-brand-200 text-brand-700',
          cardBg: 'bg-white border-slate-200 shadow-sm',
          progress: 'bg-brand-600'
        };
      case 'navy':
      default:
        return {
          bg: 'bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 text-slate-100',
          accent: 'text-cyan-400',
          accentBg: 'bg-cyan-500/20 border-cyan-500/30 text-cyan-300',
          cardBg: 'bg-slate-900/70 border-slate-700/60 backdrop-blur-sm',
          progress: 'bg-cyan-400'
        };
    }
  };

  const themeStyle = getThemeClasses();
  const progressPercent = totalSlides > 0 ? ((currentSlideIndex + 1) / totalSlides) * 100 : 0;

  return (
    <div 
      ref={containerRef}
      className={`fixed inset-0 z-50 flex flex-col bg-slate-950 select-none overflow-hidden font-sans ${isFullscreen ? 'p-0' : 'p-2 sm:p-4'}`}
    >
      {/* Hidden file input for uploading .pptx */}
      <input 
        ref={fileInputRef}
        type="file" 
        accept=".pptx,application/vnd.openxmlformats-officedocument.presentationml.presentation"
        onChange={handleFileUpload}
        className="hidden" 
      />

      {/* Main Runner Container */}
      <div className={`relative flex-1 flex flex-col w-full h-full ${isFullscreen ? '' : 'rounded-3xl border border-slate-800 shadow-2xl'} overflow-hidden bg-slate-950`}>
        
        {/* Top Control Bar */}
        <div className="h-14 bg-slate-900/90 border-b border-slate-800 px-4 flex items-center justify-between z-20 shrink-0">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-orange-500/20 text-orange-400 font-bold text-xs flex items-center gap-1.5 border border-orange-500/30">
                <Presentation className="w-4 h-4" />
                <span className="hidden sm:inline">.PPTX RUNNER</span>
              </span>
              <h2 className="text-xs sm:text-sm font-bold text-white truncate max-w-[200px] sm:max-w-md">
                {deck.title}
              </h2>
            </div>
            {currentSlide.badge && (
              <span className="hidden md:inline-block px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-800 text-slate-300 border border-slate-700">
                {currentSlide.badge}
              </span>
            )}
          </div>

          {/* Action Toolbar */}
          <div className="flex items-center gap-1.5 sm:gap-2 text-xs">
            {/* Run local PPTX button */}
            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={parsingFile}
              className="px-2.5 py-1.5 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-bold flex items-center gap-1.5 transition shadow-sm"
              title="Open and run any .pptx file from your computer"
            >
              <Upload className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{parsingFile ? 'Reading PPTX...' : 'Open .PPTX'}</span>
            </button>

            {/* Slide Grid / Overview */}
            <button
              onClick={() => setShowGrid(prev => !prev)}
              className={`p-2 rounded-xl transition ${showGrid ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40' : 'bg-slate-800 text-slate-300 hover:text-white'}`}
              title="Slide Overview Grid (G)"
            >
              <Layers className="w-4 h-4" />
            </button>

            {/* Presenter Notes */}
            <button
              onClick={() => setShowNotes(prev => !prev)}
              className={`p-2 rounded-xl transition ${showNotes ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' : 'bg-slate-800 text-slate-300 hover:text-white'}`}
              title="Speaker Notes (N)"
            >
              <FileText className="w-4 h-4" />
            </button>

            {/* Laser Pointer */}
            <button
              onClick={() => setLaserPointer(prev => !prev)}
              className={`p-2 rounded-xl transition ${laserPointer ? 'bg-rose-500/20 text-rose-400 border border-rose-500/40' : 'bg-slate-800 text-slate-300 hover:text-white'}`}
              title="Laser Pointer (L)"
            >
              <Radio className="w-4 h-4" />
            </button>

            {/* Blackout */}
            <button
              onClick={() => setIsBlackout(prev => !prev)}
              className={`p-2 rounded-xl transition ${isBlackout ? 'bg-indigo-500 text-white' : 'bg-slate-800 text-slate-300 hover:text-white'}`}
              title="Blackout Screen (B)"
            >
              {isBlackout ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
            </button>

            {/* Theme Selector */}
            <select
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
              className="hidden lg:block bg-slate-800 text-slate-300 text-[11px] font-semibold py-1.5 px-2 rounded-xl border border-slate-700"
            >
              <option value="navy">Navy Theme</option>
              <option value="emerald">Emerald Theme</option>
              <option value="violet">Violet Theme</option>
              <option value="dark">Dark Theme</option>
              <option value="light">Light Theme</option>
            </select>

            {/* Fullscreen Button */}
            <button
              onClick={toggleFullscreen}
              className="p-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition"
              title="Toggle Fullscreen (F)"
            >
              {isFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
            </button>

            {/* Close Button */}
            {onClose && (
              <button
                onClick={onClose}
                className="p-2 rounded-xl bg-slate-800/80 hover:bg-rose-600 text-slate-300 hover:text-white transition ml-1"
                title="Exit Presentation"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Success / Error notification toasts */}
        {parseSuccessMsg && (
          <div className="absolute top-16 left-1/2 -translate-x-1/2 z-50 bg-emerald-500 text-white text-xs font-bold py-2 px-4 rounded-full shadow-xl flex items-center gap-2 animate-bounce">
            <CheckCircle2 className="w-4 h-4" /> {parseSuccessMsg}
          </div>
        )}
        {parseError && (
          <div className="absolute top-16 left-1/2 -translate-x-1/2 z-50 bg-rose-600 text-white text-xs font-bold py-2 px-4 rounded-full shadow-xl flex items-center gap-2">
            <span>⚠️ {parseError}</span>
            <button onClick={() => setParseError(null)} className="ml-1 text-white hover:text-rose-200">✕</button>
          </div>
        )}

        {/* Center Presentation Stage & Sidebar */}
        <div className="flex-1 flex overflow-hidden relative">
          
          {/* Slide Stage Area */}
          <div 
            ref={slideAreaRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className={`flex-1 flex items-center justify-center p-3 sm:p-6 md:p-8 relative overflow-hidden transition-all duration-300 ${isBlackout ? 'bg-black' : 'bg-slate-950'}`}
          >
            {/* Laser pointer dot */}
            {laserPointer && laserPos.visible && !isBlackout && (
              <div 
                className="absolute pointer-events-none z-50 -translate-x-1/2 -translate-y-1/2"
                style={{ left: laserPos.x, top: laserPos.y }}
              >
                <div className="w-4 h-4 rounded-full bg-rose-500 shadow-[0_0_16px_4px_rgba(244,63,94,0.9)] animate-pulse" />
                <div className="w-1.5 h-1.5 rounded-full bg-white absolute inset-0 m-auto" />
              </div>
            )}

            {/* Blackout curtain */}
            {isBlackout ? (
              <div className="text-center text-slate-600 text-sm">
                <p>Screen paused for speaker discussion.</p>
                <p className="text-xs mt-1 text-slate-700">Press 'B' or click eye icon to resume slides.</p>
              </div>
            ) : (
              /* The 16:9 Slide Canvas */
              <div 
                className={`w-full max-w-5xl aspect-video rounded-2xl p-6 sm:p-10 md:p-12 shadow-2xl flex flex-col justify-between relative transition-all duration-300 border border-slate-700/40 ${themeStyle.bg}`}
              >
                {/* Top header on slide */}
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-orange-400 animate-pulse" />
                    <span className="text-[11px] font-bold tracking-wider uppercase text-slate-400">
                      D.TEN ACADEMIC • {deck.title}
                    </span>
                  </div>
                  <span className="text-[11px] font-mono text-slate-400 bg-white/5 px-2 py-0.5 rounded-md border border-white/10">
                    SLIDE {currentSlideIndex + 1} / {totalSlides}
                  </span>
                </div>

                {/* Slide Body */}
                <div className="flex-1 my-auto py-6 sm:py-8 flex flex-col justify-center">
                  
                  {/* Title Slide Layout */}
                  {currentSlide.layout === 'title' ? (
                    <div className="text-center space-y-4 max-w-3xl mx-auto">
                      <div className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-orange-500/20 text-orange-400 border border-orange-500/30">
                        {currentSlide.badge || 'Executive Presentation'}
                      </div>
                      <h1 className="text-2xl sm:text-4xl md:text-5xl font-black tracking-tight text-white leading-tight">
                        {currentSlide.title}
                      </h1>
                      {currentSlide.subtitle && (
                        <p className={`text-sm sm:text-lg font-medium max-w-2xl mx-auto ${themeStyle.accent}`}>
                          {currentSlide.subtitle}
                        </p>
                      )}
                      {currentSlide.bullets && currentSlide.bullets.length > 0 && (
                        <div className="pt-4 flex flex-wrap justify-center gap-2">
                          {currentSlide.bullets.map((b, idx) => (
                            <span 
                              key={idx} 
                              className="px-3 py-1.5 rounded-xl bg-white/10 backdrop-blur-md text-xs sm:text-sm text-slate-200 border border-white/10 font-medium"
                            >
                              {b}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : currentSlide.layout === 'conclusion' ? (
                    /* Conclusion Layout */
                    <div className="space-y-4 max-w-3xl mx-auto text-center">
                      <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white">
                        {currentSlide.title}
                      </h2>
                      {currentSlide.subtitle && (
                        <p className={`text-xs sm:text-sm font-semibold uppercase tracking-wider ${themeStyle.accent}`}>
                          {currentSlide.subtitle}
                        </p>
                      )}
                      <div className="grid grid-cols-1 gap-2.5 pt-4 text-left max-w-2xl mx-auto">
                        {currentSlide.bullets?.map((bullet, idx) => (
                          <div 
                            key={idx} 
                            className={`p-3 rounded-xl border flex items-start gap-3 ${themeStyle.cardBg}`}
                          >
                            <CheckCircle2 className={`w-4 h-4 shrink-0 mt-0.5 ${themeStyle.accent}`} />
                            <span className="text-xs sm:text-sm text-slate-200 leading-relaxed">{bullet}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    /* Standard Content Slide */
                    <div className="space-y-4">
                      <div>
                        {currentSlide.badge && (
                          <span className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider mb-2 border ${themeStyle.accentBg}`}>
                            {currentSlide.badge}
                          </span>
                        )}
                        <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-white tracking-tight">
                          {currentSlide.title}
                        </h2>
                        {currentSlide.subtitle && (
                          <p className={`text-xs sm:text-sm mt-1 font-medium ${themeStyle.accent}`}>
                            {currentSlide.subtitle}
                          </p>
                        )}
                      </div>

                      {/* Slide Embedded Images (if parsed from PPTX) */}
                      {currentSlide.images && currentSlide.images.length > 0 && (
                        <div className="flex gap-3 overflow-x-auto py-2">
                          {currentSlide.images.map((img, iIdx) => (
                            <img 
                              key={iIdx} 
                              src={img.dataUrl} 
                              alt={img.name || 'Slide graphic'} 
                              className="max-h-40 rounded-xl object-contain border border-white/10 bg-black/40"
                            />
                          ))}
                        </div>
                      )}

                      {/* Bullets / Content lines */}
                      <div className="space-y-2.5 pt-2">
                        {currentSlide.bullets?.map((bullet, bIdx) => {
                          const isSubItem = bullet.startsWith('•') || bullet.startsWith('-');
                          const cleanBullet = isSubItem ? bullet.replace(/^[•-]\s*/, '') : bullet;
                          return (
                            <div 
                              key={bIdx}
                              className={`flex items-start gap-3 text-xs sm:text-sm md:text-base leading-relaxed ${isSubItem ? 'ml-4 text-slate-300 font-normal' : 'text-slate-100 font-medium'}`}
                            >
                              <span className={`w-2 h-2 rounded-full shrink-0 mt-2 ${isSubItem ? 'bg-slate-400' : themeStyle.progress}`} />
                              <span>{cleanBullet}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                </div>

                {/* Slide Footer */}
                <div className="flex items-center justify-between border-t border-white/10 pt-3 text-[11px] text-slate-400">
                  <span>Author: {deck.author || 'Dr Wazir Ahmed'}</span>
                  <span>PowerPoint OpenXML (.PPTX) Format</span>
                </div>
              </div>
            )}

            {/* Left / Right Large Floating Chevron Arrows */}
            {currentSlideIndex > 0 && (
              <button
                onClick={goToPrevSlide}
                className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-slate-900/80 hover:bg-slate-800 text-white flex items-center justify-center backdrop-blur-md border border-slate-700/60 shadow-xl transition-all hover:scale-110 active:scale-95 z-30"
                title="Previous Slide (Left Arrow)"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
            )}

            {currentSlideIndex < totalSlides - 1 && (
              <button
                onClick={goToNextSlide}
                className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-slate-900/80 hover:bg-slate-800 text-white flex items-center justify-center backdrop-blur-md border border-slate-700/60 shadow-xl transition-all hover:scale-110 active:scale-95 z-30"
                title="Next Slide (Right Arrow / Space)"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            )}
          </div>

          {/* Speaker Notes Drawer (Right Sidebar) */}
          {showNotes && (
            <div className="w-80 sm:w-96 bg-slate-900 border-l border-slate-800 p-4 sm:p-5 flex flex-col justify-between overflow-y-auto shrink-0 z-20">
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase tracking-wider">
                    <FileText className="w-4 h-4" /> Speaker / Presenter Notes
                  </div>
                  <button 
                    onClick={() => setShowNotes(false)}
                    className="p-1 text-slate-400 hover:text-white rounded"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div>
                  <h4 className="text-xs font-bold text-slate-300 uppercase mb-1">
                    Slide {currentSlideIndex + 1} Focus
                  </h4>
                  <div className="text-sm font-semibold text-white">
                    {currentSlide.title}
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800 text-xs sm:text-sm text-slate-300 leading-relaxed whitespace-pre-line">
                  {currentSlide.notes || 'No speaker notes specified for this slide. Click next to proceed.'}
                </div>

                <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs flex items-start gap-2">
                  <Clock className="w-4 h-4 shrink-0 mt-0.5 text-amber-400" />
                  <span>Target pacing: 1-2 minutes per slide during live presentation.</span>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800 text-[11px] text-slate-500 flex justify-between">
                <span>Presenter Mode Active</span>
                <span>Keyboard: [N]</span>
              </div>
            </div>
          )}

          {/* Slide Overview Grid Modal / Drawer */}
          {showGrid && (
            <div className="absolute inset-0 bg-slate-950/95 backdrop-blur-md z-40 p-6 overflow-y-auto flex flex-col">
              <div className="flex items-center justify-between mb-6 max-w-6xl mx-auto w-full">
                <div className="flex items-center gap-2">
                  <Layers className="w-5 h-5 text-cyan-400" />
                  <h3 className="font-bold text-lg text-white">Slide Deck Overview ({totalSlides} Slides)</h3>
                </div>
                <button
                  onClick={() => setShowGrid(false)}
                  className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 max-w-6xl mx-auto w-full">
                {slides.map((s, idx) => {
                  const isActive = idx === currentSlideIndex;
                  return (
                    <div
                      key={s.id || idx}
                      onClick={() => goToSlide(idx)}
                      className={`cursor-pointer rounded-2xl p-3 border transition-all flex flex-col justify-between aspect-video ${
                        isActive
                          ? 'border-cyan-400 bg-cyan-950/40 shadow-lg shadow-cyan-500/20 scale-105'
                          : 'border-slate-800 bg-slate-900/60 hover:border-slate-700 hover:bg-slate-800'
                      }`}
                    >
                      <div className="flex items-center justify-between text-[10px] text-slate-400 mb-1">
                        <span className="font-bold font-mono">#{idx + 1}</span>
                        {isActive && <span className="text-cyan-400 font-bold">• Active</span>}
                      </div>
                      <div className="text-xs font-bold text-white line-clamp-2 my-auto">
                        {s.title}
                      </div>
                      <div className="text-[9px] text-slate-400 truncate mt-1">
                        {s.badge || (s.bullets ? `${s.bullets.length} points` : 'Slide')}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

        </div>

        {/* Bottom Navigation & Pacing Bar */}
        <div className="h-16 bg-slate-900 border-t border-slate-800 px-4 sm:px-6 flex items-center justify-between z-20 shrink-0">
          
          {/* Left: Quick controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={goToPrevSlide}
              disabled={currentSlideIndex === 0}
              className="p-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white disabled:opacity-40 disabled:cursor-not-allowed transition"
              title="Previous Slide"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Auto Play / Slideshow toggle */}
            <button
              onClick={() => setAutoPlay(prev => !prev)}
              className={`px-3 py-1.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition ${
                autoPlay 
                  ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-500/30' 
                  : 'bg-slate-800 text-slate-300 hover:text-white'
              }`}
              title="Toggle Auto Slideshow"
            >
              {autoPlay ? (
                <>
                  <Pause className="w-3.5 h-3.5 fill-white" />
                  <span>Pause ({autoPlayInterval}s)</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 fill-white" />
                  <span>Auto-Play</span>
                </>
              )}
            </button>

            {/* Timer interval selector when auto-playing */}
            {autoPlay && (
              <select
                value={autoPlayInterval}
                onChange={(e) => setAutoPlayInterval(Number(e.target.value))}
                className="bg-slate-800 text-white text-xs font-semibold px-2 py-1.5 rounded-xl border border-slate-700"
              >
                <option value={3}>3 sec</option>
                <option value={5}>5 sec</option>
                <option value={10}>10 sec</option>
                <option value={15}>15 sec</option>
              </select>
            )}

            <button
              onClick={goToNextSlide}
              disabled={currentSlideIndex === totalSlides - 1}
              className="p-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white disabled:opacity-40 disabled:cursor-not-allowed transition"
              title="Next Slide"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Center: Interactive Slide Timeline / Progress Bar */}
          <div className="flex-1 max-w-md mx-4 hidden sm:flex flex-col items-center gap-1">
            <div className="w-full flex items-center justify-between text-[11px] text-slate-400 font-mono">
              <span>SLIDE {currentSlideIndex + 1} OF {totalSlides}</span>
              <span>{Math.round(progressPercent)}% COMPLETE</span>
            </div>
            <div 
              onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const clickPos = (e.clientX - rect.left) / rect.width;
                const targetIdx = Math.floor(clickPos * totalSlides);
                goToSlide(targetIdx);
              }}
              className="w-full h-2 rounded-full bg-slate-800 cursor-pointer overflow-hidden relative group"
            >
              <div 
                className={`h-full transition-all duration-300 ${themeStyle.progress}`} 
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => window.print()}
              className="hidden md:flex px-3 py-1.5 rounded-xl border border-slate-700 hover:bg-slate-800 text-slate-300 text-xs font-semibold items-center gap-1.5 transition"
              title="Print Slides / Handout"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Handout</span>
            </button>

            <span className="text-xs text-slate-400 font-mono sm:hidden">
              {currentSlideIndex + 1}/{totalSlides}
            </span>
          </div>

        </div>

      </div>
    </div>
  );
};
