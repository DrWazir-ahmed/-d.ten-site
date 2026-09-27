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
  VolumeX,
  Settings, 
  Clock, 
  Share2, 
  Presentation,
  CheckCircle2,
  ArrowRight,
  Bookmark,
  Radio,
  Edit3,
  Trash2,
  RotateCcw,
  Monitor,
  Layout,
  ExternalLink,
  BookOpen
} from 'lucide-react';
import { parsePptxFile } from '../../utils/pptxParser';
import { getPresentationDeck, savePresentationDeck } from '../../utils/presentationStorage';

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
    return {
      title: presentation?.title || 'PowerPoint Presentation',
      subtitle: presentation?.description || '',
      author: presentation?.author || 'Dr Wazir Ahmed',
      aspectRatio: presentation?.aspectRatio || '16:9',
      format: presentation?.format || 'pptx',
      slides: [
        {
          id: 1,
          slideNumber: 1,
          layout: 'title',
          title: presentation?.title || 'Presentation Overview',
          subtitle: presentation?.description || '',
          bullets: [
            presentation?.description || 'Presentation content'
          ],
          notes: 'Speaker notes for this presentation.'
        }
      ]
    };
  });

  const [cachedFileBlob, setCachedFileBlob] = useState(null);

  // Try to load any cached high-res deck from IndexedDB
  useEffect(() => {
    if (presentation?.id) {
      getPresentationDeck(presentation.id).then(cached => {
        if (cached?.deckData?.slides?.length > 0) {
          setDeck(cached.deckData);
        }
        if (cached?.originalFileBlob) {
          setCachedFileBlob(cached.originalFileBlob);
        }
      });
    }
  }, [presentation?.id]);

  const [currentSlideIndex, setCurrentSlideIndex] = useState(
    Math.max(0, Math.min(initialSlide - 1, (deck.slides?.length || 1) - 1))
  );

  // View Modes: 'stage' (normal slideshow), 'presenter' (dual screen with stopwatch), 'handout' (scrollable notes)
  const [viewMode, setViewMode] = useState('stage');
  const [useCloudEmbed, setUseCloudEmbed] = useState(false);

  // Settings & Toggles
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showNotes, setShowNotes] = useState(false);
  const [showGrid, setShowGrid] = useState(false);
  const [aspectRatio, setAspectRatio] = useState(deck.aspectRatio || '16:9'); // '16:9' or '4:3'
  const [laserPointer, setLaserPointer] = useState(false);
  const [laserPos, setLaserPos] = useState({ x: 0, y: 0, visible: false });
  const [isBlackout, setIsBlackout] = useState(false);
  const [autoPlay, setAutoPlay] = useState(false);
  const [autoPlayInterval, setAutoPlayInterval] = useState(5); // seconds
  const [theme, setTheme] = useState(deck.theme || 'navy'); // 'navy', 'emerald', 'violet', 'dark', 'light', 'amber'
  const [transitionEffect, setTransitionEffect] = useState('fade'); // 'fade', 'slide', 'zoom', 'none'
  
  // Drawing / Annotation Pen Tool
  const [penMode, setPenMode] = useState('off'); // 'off', 'pen', 'highlighter'
  const [penColor, setPenColor] = useState('#ef4444'); // red, gold, cyan, white
  const [isDrawing, setIsDrawing] = useState(false);
  const canvasRef = useRef(null);
  const slideDrawings = useRef({}); // slideIndex -> dataUrl

  // Presenter Stopwatch / Timer
  const [stopwatchSeconds, setStopwatchSeconds] = useState(0);
  const [stopwatchRunning, setStopwatchRunning] = useState(true);

  // Text-To-Speech (TTS) Narration
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Local File Uploading State
  const [parsingFile, setParsingFile] = useState(false);
  const [parseError, setParseError] = useState(null);
  const [parseSuccessMsg, setParseSuccessMsg] = useState('');

  const containerRef = useRef(null);
  const slideAreaRef = useRef(null);
  const autoPlayTimerRef = useRef(null);
  const stopwatchTimerRef = useRef(null);
  const fileInputRef = useRef(null);

  const slides = deck.slides || [];
  const currentSlide = slides[currentSlideIndex] || slides[0] || {};
  const nextSlide = slides[currentSlideIndex + 1] || null;
  const totalSlides = slides.length;

  // Next / Prev slide handlers
  const goToNextSlide = useCallback(() => {
    setCurrentSlideIndex(prev => {
      if (prev < totalSlides - 1) {
        saveCurrentCanvasDrawing(prev);
        return prev + 1;
      }
      return prev;
    });
  }, [totalSlides]);

  const goToPrevSlide = useCallback(() => {
    setCurrentSlideIndex(prev => {
      if (prev > 0) {
        saveCurrentCanvasDrawing(prev);
        return prev - 1;
      }
      return prev;
    });
  }, []);

  const goToSlide = (idx) => {
    if (idx >= 0 && idx < totalSlides) {
      saveCurrentCanvasDrawing(currentSlideIndex);
      setCurrentSlideIndex(idx);
      setShowGrid(false);
    }
  };

  // Canvas drawing save/restore across slides
  const saveCurrentCanvasDrawing = (idx) => {
    if (canvasRef.current) {
      slideDrawings.current[idx] = canvasRef.current.toDataURL();
    }
  };

  const restoreCanvasDrawing = useCallback((idx) => {
    if (!canvasRef.current) return;
    const ctx = canvasRef.current.getContext('2d');
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    if (slideDrawings.current[idx]) {
      const img = new Image();
      img.onload = () => {
        ctx.drawImage(img, 0, 0);
      };
      img.src = slideDrawings.current[idx];
    }
  }, []);

  useEffect(() => {
    restoreCanvasDrawing(currentSlideIndex);
  }, [currentSlideIndex, restoreCanvasDrawing]);

  // Stopwatch timer
  useEffect(() => {
    if (stopwatchRunning) {
      stopwatchTimerRef.current = setInterval(() => {
        setStopwatchSeconds(prev => prev + 1);
      }, 1000);
    } else {
      if (stopwatchTimerRef.current) clearInterval(stopwatchTimerRef.current);
    }
    return () => {
      if (stopwatchTimerRef.current) clearInterval(stopwatchTimerRef.current);
    };
  }, [stopwatchRunning]);

  const formatStopwatch = (totalSec) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
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
        case 'p':
        case 'P':
          e.preventDefault();
          setViewMode(prev => prev === 'presenter' ? 'stage' : 'presenter');
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
          else if (penMode !== 'off') setPenMode('off');
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goToNextSlide, goToPrevSlide, showGrid, isBlackout, penMode, totalSlides]);

  // Auto-play timer
  useEffect(() => {
    if (autoPlay) {
      autoPlayTimerRef.current = setInterval(() => {
        setCurrentSlideIndex(prev => {
          if (prev < totalSlides - 1) {
            return prev + 1;
          } else {
            setAutoPlay(false);
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

  // Canvas drawing handlers
  const startDrawing = (e) => {
    if (penMode === 'off' || !canvasRef.current) return;
    setIsDrawing(true);
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const ctx = canvas.getContext('2d');
    ctx.beginPath();
    ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
  };

  const drawOnCanvas = (e) => {
    if (!isDrawing || penMode === 'off' || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const ctx = canvas.getContext('2d');

    if (penMode === 'highlighter') {
      ctx.strokeStyle = penColor;
      ctx.lineWidth = 18;
      ctx.globalAlpha = 0.35;
      ctx.lineCap = 'square';
    } else {
      ctx.strokeStyle = penColor;
      ctx.lineWidth = 3;
      ctx.globalAlpha = 1.0;
      ctx.lineCap = 'round';
    }

    ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
    ctx.stroke();
  };

  const stopDrawing = () => {
    if (isDrawing) {
      setIsDrawing(false);
      saveCurrentCanvasDrawing(currentSlideIndex);
    }
  };

  const clearCanvas = () => {
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d');
      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      slideDrawings.current[currentSlideIndex] = null;
    }
  };

  // Text-To-Speech (TTS) Narration
  const speakSlide = () => {
    if (!window.speechSynthesis) {
      alert('Speech synthesis not supported in this browser.');
      return;
    }

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    const textToRead = [
      currentSlide.title,
      currentSlide.subtitle,
      ...(currentSlide.bullets || [])
    ].filter(Boolean).join('. ');

    const utterance = new SpeechSynthesisUtterance(textToRead);
    utterance.rate = 0.95;
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
    setIsSpeaking(true);
  };

  useEffect(() => {
    return () => {
      if (window.speechSynthesis) window.speechSynthesis.cancel();
    };
  }, []);

  // Handle local .PPTX or .PPT file selection
  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setParsingFile(true);
    setParseError(null);
    setParseSuccessMsg('');

    try {
      const result = await parsePptxFile(file);
      if (result.success && result.slides?.length > 0) {
        const newDeck = {
          title: result.title || file.name.replace(/\.[^/.]+$/, ''),
          subtitle: `Imported from ${file.name} (${result.totalSlides} slides)`,
          author: 'Uploaded Presentation',
          format: result.format || 'pptx',
          aspectRatio: result.aspectRatio || '16:9',
          slides: result.slides
        };
        setDeck(newDeck);
        if (result.aspectRatio) setAspectRatio(result.aspectRatio);
        setCurrentSlideIndex(0);

        setCachedFileBlob(file);

        // Cache in IndexedDB
        if (presentation?.id) {
          await savePresentationDeck(presentation.id, newDeck, file);
        }

        setParseSuccessMsg(`Loaded ${result.totalSlides} slides from "${file.name}"!`);
        setTimeout(() => setParseSuccessMsg(''), 4500);
      } else {
        setParseError(result.error || 'Could not parse PowerPoint file.');
      }
    } catch (err) {
      setParseError(err.message || 'Error parsing PowerPoint file.');
    } finally {
      setParsingFile(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  // Download slide deck as original file or formatted Handout
  const handleDownloadOriginalFile = () => {
    if (cachedFileBlob) {
      const url = URL.createObjectURL(cachedFileBlob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${deck.title.replace(/\s+/g, '_')}.${deck.format || 'pptx'}`;
      a.click();
      URL.revokeObjectURL(url);
    } else if (presentation?.presentationUrl || presentation?.downloadUrl || presentation?.fileUrl) {
      window.open(presentation.presentationUrl || presentation.downloadUrl || presentation.fileUrl, '_blank');
    } else {
      handleDownloadHandout();
    }
  };

  // Download slide deck as JSON / Text Handout
  const handleDownloadHandout = () => {
    const lines = [
      `# ${deck.title}`,
      `Author: ${deck.author || 'Dr Wazir Ahmed'}`,
      `Total Slides: ${totalSlides}`,
      `----------------------------------------\n`
    ];

    slides.forEach((s, idx) => {
      lines.push(`## Slide ${idx + 1}: ${s.title}`);
      if (s.subtitle) lines.push(`*${s.subtitle}*`);
      if (s.bullets && s.bullets.length > 0) {
        s.bullets.forEach(b => lines.push(`- ${b}`));
      }
      if (s.notes) {
        lines.push(`\n[Speaker Notes]: ${s.notes}`);
      }
      lines.push(`\n----------------------------------------\n`);
    });

    const blob = new Blob([lines.join('\n')], { type: 'text/markdown;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${deck.title.replace(/\s+/g, '_')}_Handout.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Theme styling
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
      case 'amber':
        return {
          bg: 'bg-gradient-to-br from-slate-950 via-slate-900 to-amber-950 text-slate-100',
          accent: 'text-amber-400',
          accentBg: 'bg-amber-500/20 border-amber-500/30 text-amber-300',
          cardBg: 'bg-slate-900/60 border-slate-700/60 backdrop-blur-sm',
          progress: 'bg-amber-500'
        };
      case 'dark':
        return {
          bg: 'bg-slate-950 text-slate-100',
          accent: 'text-cyan-400',
          accentBg: 'bg-cyan-500/20 border-cyan-500/30 text-cyan-300',
          cardBg: 'bg-slate-900/80 border-slate-800',
          progress: 'bg-cyan-500'
        };
      case 'light':
        return {
          bg: 'bg-white text-slate-900',
          accent: 'text-brand-600',
          accentBg: 'bg-brand-50 border-brand-200 text-brand-700',
          cardBg: 'bg-slate-50 border-slate-200 shadow-sm',
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

  // Cloud Office URL if present
  const cloudViewerUrl = presentation?.presentationUrl 
    ? (presentation.presentationUrl.includes('docs.google.com') 
        ? presentation.presentationUrl 
        : `https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(presentation.presentationUrl)}`)
    : null;

  return (
    <div 
      ref={containerRef}
      className={`fixed inset-0 z-50 flex flex-col bg-slate-950 select-none overflow-hidden font-sans ${isFullscreen ? 'p-0' : 'p-2 sm:p-4'}`}
    >
      <input 
        ref={fileInputRef}
        type="file" 
        accept=".pptx,.ppt,.ppsx,application/vnd.ms-powerpoint,application/vnd.openxmlformats-officedocument.presentationml.presentation"
        onChange={handleFileUpload}
        className="hidden" 
      />

      <div className={`relative flex-1 flex flex-col w-full h-full ${isFullscreen ? '' : 'rounded-3xl border border-slate-800 shadow-2xl'} overflow-hidden bg-slate-950`}>
        
        {/* Top Control Bar */}
        <div className="h-14 bg-slate-900/95 border-b border-slate-800 px-3 sm:px-5 flex items-center justify-between z-30 shrink-0">
          
          {/* Deck branding */}
          <div className="flex items-center gap-2 sm:gap-3 truncate pr-2">
            <span className="p-1.5 rounded-lg bg-orange-500/20 text-orange-400 font-bold text-xs flex items-center gap-1.5 border border-orange-500/30 shrink-0">
              <Presentation className="w-4 h-4" />
              <span className="hidden sm:inline font-mono">PPTX RUNNER</span>
            </span>
            <div className="truncate">
              <h2 className="text-xs sm:text-sm font-bold text-white truncate max-w-[180px] sm:max-w-xs md:max-w-md">
                {deck.title}
              </h2>
            </div>
            {aspectRatio && (
              <span className="hidden lg:inline-block px-2 py-0.5 rounded-md text-[10px] font-mono font-bold bg-slate-800 text-slate-400 border border-slate-700">
                {aspectRatio}
              </span>
            )}
          </div>

          {/* Action Toolbar */}
          <div className="flex items-center gap-1 sm:gap-2 text-xs">
            
            {/* View Mode Toggle: Stage vs Presenter vs Handout */}
            <div className="hidden md:flex items-center bg-slate-800 p-0.5 rounded-xl border border-slate-700">
              <button
                onClick={() => setViewMode('stage')}
                className={`px-2.5 py-1 rounded-lg font-bold text-[11px] transition ${
                  viewMode === 'stage' ? 'bg-cyan-500 text-slate-950 shadow-sm' : 'text-slate-400 hover:text-white'
                }`}
                title="Standard Slideshow Stage"
              >
                Stage
              </button>
              <button
                onClick={() => setViewMode('presenter')}
                className={`px-2.5 py-1 rounded-lg font-bold text-[11px] transition ${
                  viewMode === 'presenter' ? 'bg-cyan-500 text-slate-950 shadow-sm' : 'text-slate-400 hover:text-white'
                }`}
                title="Presenter Dual Screen with Timer & Notes (P)"
              >
                Presenter Mode
              </button>
              <button
                onClick={() => setViewMode('handout')}
                className={`px-2.5 py-1 rounded-lg font-bold text-[11px] transition ${
                  viewMode === 'handout' ? 'bg-cyan-500 text-slate-950 shadow-sm' : 'text-slate-400 hover:text-white'
                }`}
                title="Full Handout Document"
              >
                Handout
              </button>
            </div>

            {/* Cloud Embed Toggle if available */}
            {cloudViewerUrl && (
              <button
                onClick={() => setUseCloudEmbed(prev => !prev)}
                className={`p-2 rounded-xl transition ${useCloudEmbed ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-300 hover:text-white'}`}
                title="Toggle Native Office 365 Cloud Viewer"
              >
                <Monitor className="w-4 h-4" />
              </button>
            )}

            {/* Open / Upload PPTX button */}
            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={parsingFile}
              className="px-2.5 py-1.5 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-bold flex items-center gap-1.5 transition shadow-sm"
              title="Open and run any .pptx or .ppt file from your computer"
            >
              <Upload className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{parsingFile ? 'Parsing...' : 'Upload .PPTX'}</span>
            </button>

            {/* Download Presentation / Handout button */}
            <button
              onClick={handleDownloadOriginalFile}
              className="px-2.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white font-bold flex items-center gap-1.5 transition border border-slate-700 shadow-sm"
              title="Download PowerPoint presentation or slide notes"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden xl:inline">Download</span>
            </button>

            {/* Annotation Drawing Pen Mode */}
            <div className="relative flex items-center">
              <button
                onClick={() => setPenMode(prev => prev === 'off' ? 'pen' : prev === 'pen' ? 'highlighter' : 'off')}
                className={`p-2 rounded-xl transition ${
                  penMode !== 'off' ? 'bg-rose-500/20 text-rose-400 border border-rose-500/40' : 'bg-slate-800 text-slate-300 hover:text-white'
                }`}
                title={`Live Drawing Tool (${penMode === 'off' ? 'Off' : penMode})`}
              >
                <Edit3 className="w-4 h-4" />
              </button>

              {penMode !== 'off' && (
                <div className="absolute top-12 right-0 bg-slate-900 border border-slate-700 p-2 rounded-2xl shadow-xl flex items-center gap-2 z-50">
                  {['#ef4444', '#eab308', '#06b6d4', '#10b981', '#ffffff'].map(c => (
                    <button
                      key={c}
                      onClick={() => setPenColor(c)}
                      className={`w-5 h-5 rounded-full border-2 transition ${penColor === c ? 'scale-125 border-white' : 'border-transparent'}`}
                      style={{ backgroundColor: c }}
                    />
                  ))}
                  <button
                    onClick={clearCanvas}
                    className="p-1 rounded-lg bg-slate-800 hover:bg-rose-900/60 text-slate-400 hover:text-rose-300 text-xs ml-1"
                    title="Clear current slide drawings"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>

            {/* Laser Pointer */}
            <button
              onClick={() => setLaserPointer(prev => !prev)}
              className={`p-2 rounded-xl transition ${laserPointer ? 'bg-rose-500/20 text-rose-400 border border-rose-500/40' : 'bg-slate-800 text-slate-300 hover:text-white'}`}
              title="Laser Pointer (L)"
            >
              <Radio className="w-4 h-4" />
            </button>

            {/* Text to Speech Narration */}
            <button
              onClick={speakSlide}
              className={`p-2 rounded-xl transition ${isSpeaking ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 animate-pulse' : 'bg-slate-800 text-slate-300 hover:text-white'}`}
              title="Read Slide Aloud (Narration)"
            >
              {isSpeaking ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>

            {/* Slide Overview Grid */}
            <button
              onClick={() => setShowGrid(prev => !prev)}
              className={`p-2 rounded-xl transition ${showGrid ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40' : 'bg-slate-800 text-slate-300 hover:text-white'}`}
              title="Slide Overview Grid (G)"
            >
              <Layers className="w-4 h-4" />
            </button>

            {/* Speaker Notes */}
            <button
              onClick={() => setShowNotes(prev => !prev)}
              className={`p-2 rounded-xl transition ${showNotes ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' : 'bg-slate-800 text-slate-300 hover:text-white'}`}
              title="Speaker Notes (N)"
            >
              <FileText className="w-4 h-4" />
            </button>

            {/* Blackout */}
            <button
              onClick={() => setIsBlackout(prev => !prev)}
              className={`p-2 rounded-xl transition ${isBlackout ? 'bg-indigo-500 text-white' : 'bg-slate-800 text-slate-300 hover:text-white'}`}
              title="Blackout Screen (B)"
            >
              {isBlackout ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
            </button>

            {/* Aspect Ratio Switcher */}
            <button
              onClick={() => setAspectRatio(prev => prev === '16:9' ? '4:3' : '16:9')}
              className="hidden lg:flex p-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white transition font-mono text-[11px]"
              title="Toggle Aspect Ratio (16:9 ↔ 4:3)"
            >
              {aspectRatio}
            </button>

            {/* Theme Selector */}
            <select
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
              className="hidden xl:block bg-slate-800 text-slate-300 text-[11px] font-semibold py-1.5 px-2 rounded-xl border border-slate-700"
            >
              <option value="navy">Navy Theme</option>
              <option value="emerald">Emerald Theme</option>
              <option value="violet">Violet Theme</option>
              <option value="amber">Sunset Amber</option>
              <option value="dark">OLED Dark</option>
              <option value="light">Academic Light</option>
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
          <div className="absolute top-16 left-1/2 -translate-x-1/2 z-50 bg-emerald-500 text-white text-xs font-bold py-2 px-4 rounded-full shadow-xl flex items-center gap-2">
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
          
          {/* Cloud Viewer Embed Mode */}
          {useCloudEmbed && cloudViewerUrl ? (
            <div className="flex-1 w-full h-full bg-slate-900">
              <iframe
                src={cloudViewerUrl}
                title="Office PowerPoint Viewer"
                className="w-full h-full border-0"
                allowFullScreen
              />
            </div>
          ) : viewMode === 'handout' ? (
            /* Continuous Handout Study Mode */
            <div className="flex-1 overflow-y-auto p-4 sm:p-8 space-y-8 bg-slate-900 max-w-5xl mx-auto w-full">
              <div className="text-center pb-6 border-b border-slate-800">
                <h1 className="text-2xl sm:text-3xl font-black text-white">{deck.title}</h1>
                <p className="text-sm text-slate-400 mt-1">Academic Slide Handout & Study Guide • {totalSlides} Slides</p>
                <div className="flex flex-wrap justify-center gap-2 mt-4">
                  {(cachedFileBlob || presentation?.presentationUrl || presentation?.downloadUrl || presentation?.fileUrl) && (
                    <button
                      onClick={handleDownloadOriginalFile}
                      className="px-4 py-2 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs flex items-center gap-1.5 shadow"
                    >
                      <Download className="w-4 h-4" /> Download Original (.PPTX)
                    </button>
                  )}
                  <button
                    onClick={() => window.print()}
                    className="px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow"
                  >
                    <Printer className="w-4 h-4" /> Print Handout
                  </button>
                  <button
                    onClick={handleDownloadHandout}
                    className="px-4 py-2 rounded-xl border border-slate-700 hover:bg-slate-800 text-white font-bold text-xs flex items-center gap-1.5"
                  >
                    <Download className="w-4 h-4" /> Save Markdown Notes
                  </button>
                </div>
              </div>

              {slides.map((s, idx) => (
                <div key={s.id || idx} className="rounded-2xl border border-slate-800 bg-slate-950 p-6 space-y-4 shadow-lg">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <span className="font-mono text-xs font-bold text-cyan-400">SLIDE #{idx + 1}</span>
                    {s.badge && <span className="text-[10px] font-bold text-slate-400 uppercase">{s.badge}</span>}
                  </div>
                  <h3 className="text-xl font-bold text-white">{s.title}</h3>
                  {s.subtitle && <p className="text-sm text-cyan-300 font-medium">{s.subtitle}</p>}
                  
                  {s.bullets && s.bullets.length > 0 && (
                    <ul className="space-y-2 pt-2 text-sm text-slate-200">
                      {s.bullets.map((b, bIdx) => (
                        <li key={bIdx} className="flex items-start gap-2.5">
                          <span className="w-2 h-2 rounded-full bg-cyan-400 shrink-0 mt-2" />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {s.notes && (
                    <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-200 text-xs mt-3">
                      <strong>Speaker Notes:</strong> {s.notes}
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : viewMode === 'presenter' ? (
            /* Presenter Mode (Dual-Screen style) */
            <div className="flex-1 flex flex-col lg:flex-row overflow-hidden p-3 sm:p-6 gap-4 bg-slate-950">
              
              {/* Left / Main Current Slide */}
              <div className="flex-1 flex flex-col justify-center items-center">
                <div className={`w-full max-w-3xl ${aspectRatio === '4:3' ? 'aspect-[4/3]' : 'aspect-video'} rounded-2xl p-6 shadow-2xl flex flex-col justify-between border border-slate-700/60 ${themeStyle.bg}`}>
                  <div className="flex justify-between items-center text-xs text-slate-400 border-b border-white/10 pb-2">
                    <span className="font-bold text-white">LIVE PRESENTATION</span>
                    <span className="font-mono">SLIDE {currentSlideIndex + 1} / {totalSlides}</span>
                  </div>
                  <div className="my-auto space-y-3">
                    <h2 className="text-xl sm:text-2xl font-black text-white">{currentSlide.title}</h2>
                    {currentSlide.subtitle && <p className={`text-xs sm:text-sm ${themeStyle.accent}`}>{currentSlide.subtitle}</p>}
                    <div className="space-y-1.5 pt-2">
                      {currentSlide.bullets?.slice(0, 6).map((b, idx) => (
                        <div key={idx} className="text-xs sm:text-sm text-slate-100 flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0 mt-1.5" />
                          <span>{b}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="text-[10px] text-slate-400 border-t border-white/10 pt-2 flex justify-between">
                    <span>{deck.title}</span>
                    <span>Audience View</span>
                  </div>
                </div>
              </div>

              {/* Right / Next Slide & Presenter Teleprompter */}
              <div className="w-full lg:w-96 flex flex-col gap-3 shrink-0 overflow-y-auto">
                
                {/* Live Stopwatch & Presentation Clock */}
                <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Elapsed Time</span>
                    <span className="font-mono text-2xl font-black text-emerald-400">{formatStopwatch(stopwatchSeconds)}</span>
                  </div>
                  <div className="flex gap-1.5">
                    <button
                      onClick={() => setStopwatchRunning(prev => !prev)}
                      className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs"
                      title={stopwatchRunning ? 'Pause Stopwatch' : 'Resume Stopwatch'}
                    >
                      {stopwatchRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-white" />}
                    </button>
                    <button
                      onClick={() => setStopwatchSeconds(0)}
                      className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs"
                      title="Reset Stopwatch"
                    >
                      <RotateCcw className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Next Slide Preview */}
                <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center justify-between">
                    <span>Coming Next</span>
                    <span>Slide {currentSlideIndex + 2}</span>
                  </span>
                  {nextSlide ? (
                    <div 
                      onClick={goToNextSlide}
                      className="p-3 rounded-xl bg-slate-950 border border-slate-800 cursor-pointer hover:border-cyan-500/50 transition"
                    >
                      <h4 className="font-bold text-xs text-white truncate">{nextSlide.title}</h4>
                      <p className="text-[11px] text-slate-400 line-clamp-2 mt-1">{nextSlide.subtitle || nextSlide.bullets?.[0] || 'No notes'}</p>
                    </div>
                  ) : (
                    <div className="p-3 rounded-xl bg-slate-950 text-slate-500 text-xs italic">
                      End of Presentation Deck
                    </div>
                  )}
                </div>

                {/* Current Slide Notes */}
                <div className="flex-1 p-4 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col overflow-hidden">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-800 mb-2">
                    <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                      <FileText className="w-3.5 h-3.5" /> Presenter Talking Points
                    </span>
                  </div>
                  <div className="flex-1 overflow-y-auto text-xs sm:text-sm text-slate-200 leading-relaxed whitespace-pre-line">
                    {currentSlide.notes || 'No speaker notes written for this slide. Keep speech smooth and engaged with audience.'}
                  </div>
                </div>

              </div>
            </div>
          ) : (
            /* Normal Stage Mode (The 16:9 / 4:3 Slide Canvas) */
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
                /* The Slide Canvas */
                <div 
                  className={`w-full max-w-5xl ${aspectRatio === '4:3' ? 'aspect-[4/3]' : 'aspect-video'} rounded-2xl p-6 sm:p-10 md:p-12 shadow-2xl flex flex-col justify-between relative transition-all duration-300 border border-slate-700/40 overflow-hidden ${themeStyle.bg}`}
                >
                  {/* Drawing Canvas Overlay */}
                  <canvas
                    ref={canvasRef}
                    width={1024}
                    height={aspectRatio === '4:3' ? 768 : 576}
                    onMouseDown={startDrawing}
                    onMouseMove={drawOnCanvas}
                    onMouseUp={stopDrawing}
                    onMouseLeave={stopDrawing}
                    className={`absolute inset-0 w-full h-full z-20 ${penMode !== 'off' ? 'cursor-crosshair pointer-events-auto' : 'pointer-events-none'}`}
                  />

                  {/* Top header on slide */}
                  <div className="flex items-center justify-between border-b border-white/10 pb-3 z-10">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-orange-400 animate-pulse" />
                      <span className="text-[11px] font-bold tracking-wider uppercase text-slate-400 truncate max-w-xs sm:max-w-md">
                        {deck.title}
                      </span>
                    </div>
                    <span className="text-[11px] font-mono text-slate-400 bg-white/5 px-2 py-0.5 rounded-md border border-white/10 shrink-0">
                      SLIDE {currentSlideIndex + 1} / {totalSlides}
                    </span>
                  </div>

                  {/* Slide Content Layouts */}
                  <div className="flex-1 my-auto py-4 sm:py-6 flex flex-col justify-center z-10 overflow-y-auto">
                    
                    {/* 1. Title Slide Layout */}
                    {currentSlide.layout === 'title' ? (
                      <div className="text-center space-y-4 max-w-3xl mx-auto">
                        <div className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-orange-500/20 text-orange-400 border border-orange-500/30">
                          {currentSlide.badge || 'Master PowerPoint Presentation'}
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
                    ) : currentSlide.layout === 'table' && currentSlide.table ? (
                      /* 2. Table Layout */
                      <div className="space-y-4 max-w-4xl mx-auto w-full">
                        <div>
                          <h2 className="text-xl sm:text-2xl font-black text-white">{currentSlide.title}</h2>
                          {currentSlide.subtitle && <p className={`text-xs sm:text-sm ${themeStyle.accent}`}>{currentSlide.subtitle}</p>}
                        </div>

                        <div className="overflow-x-auto rounded-xl border border-white/10 bg-black/30">
                          <table className="w-full text-left text-xs sm:text-sm border-collapse">
                            <thead>
                              <tr className="border-b border-white/20 bg-white/5">
                                {currentSlide.table.headers.map((h, hIdx) => (
                                  <th key={hIdx} className="p-3 font-bold text-white">{h}</th>
                                ))}
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-white/10">
                              {currentSlide.table.rows.map((row, rIdx) => (
                                <tr key={rIdx} className="hover:bg-white/5">
                                  {row.map((cell, cIdx) => (
                                    <td key={cIdx} className="p-3 text-slate-200">{cell}</td>
                                  ))}
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    ) : currentSlide.layout === 'comparison' && currentSlide.columns ? (
                      /* 3. Two-Column Comparison Layout */
                      <div className="space-y-4">
                        <div>
                          <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-white">{currentSlide.title}</h2>
                          {currentSlide.subtitle && <p className={`text-xs sm:text-sm ${themeStyle.accent}`}>{currentSlide.subtitle}</p>}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                          {currentSlide.columns.map((col, cIdx) => (
                            <div key={cIdx} className={`p-4 rounded-2xl border ${themeStyle.cardBg} space-y-2`}>
                              <h4 className="font-bold text-xs uppercase tracking-wider text-cyan-300">
                                Column {cIdx + 1}
                              </h4>
                              <div className="space-y-2 text-xs sm:text-sm text-slate-100">
                                {col.map((line, lIdx) => (
                                  <div key={lIdx} className="flex items-start gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0 mt-1.5" />
                                    <span>{line}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : currentSlide.layout === 'conclusion' ? (
                      /* 4. Conclusion / Summary Layout */
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
                      /* 5. Standard Content Slide */
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

                        {/* Slide Embedded Images */}
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

                        {/* Bullets */}
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
                  <div className="flex items-center justify-between border-t border-white/10 pt-3 text-[11px] text-slate-400 z-10">
                    <span>Author: {deck.author || 'Dr Wazir Ahmed'}</span>
                    <span>PowerPoint Format • D.TEN Presentation Engine</span>
                  </div>
                </div>
              )}

              {/* Floating Left / Right Chevrons */}
              {currentSlideIndex > 0 && (
                <button
                  onClick={goToPrevSlide}
                  className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-slate-900/80 hover:bg-slate-800 text-white flex items-center justify-center backdrop-blur-md border border-slate-700/60 shadow-xl transition-all hover:scale-110 active:scale-95 z-30"
                  title="Previous Slide"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
              )}

              {currentSlideIndex < totalSlides - 1 && (
                <button
                  onClick={goToNextSlide}
                  className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-slate-900/80 hover:bg-slate-800 text-white flex items-center justify-center backdrop-blur-md border border-slate-700/60 shadow-xl transition-all hover:scale-110 active:scale-95 z-30"
                  title="Next Slide"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              )}
            </div>
          )}

          {/* Speaker Notes Drawer (Right Sidebar in stage mode) */}
          {showNotes && viewMode === 'stage' && (
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
                    Slide {currentSlideIndex + 1}
                  </h4>
                  <div className="text-sm font-semibold text-white">
                    {currentSlide.title}
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800 text-xs sm:text-sm text-slate-300 leading-relaxed whitespace-pre-line">
                  {currentSlide.notes || 'No speaker notes written for this slide.'}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800 text-[11px] text-slate-500 flex justify-between">
                <span>Presenter Mode Active</span>
                <span>Keyboard: [N]</span>
              </div>
            </div>
          )}

          {/* Slide Overview Grid Drawer */}
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

        {/* Bottom Navigation & Timeline Bar */}
        <div className="h-16 bg-slate-900 border-t border-slate-800 px-4 sm:px-6 flex items-center justify-between z-30 shrink-0">
          
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

            {/* Auto Play toggle */}
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

            {autoPlay && (
              <select
                value={autoPlayInterval}
                onChange={(e) => setAutoPlayInterval(Number(e.target.value))}
                className="bg-slate-800 text-white text-xs font-semibold px-2 py-1.5 rounded-xl border border-slate-700"
              >
                <option value={3}>3s</option>
                <option value={5}>5s</option>
                <option value={10}>10s</option>
                <option value={15}>15s</option>
                <option value={30}>30s</option>
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

          {/* Center: Slide timeline progress */}
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
              onClick={handleDownloadHandout}
              className="hidden md:flex px-3 py-1.5 rounded-xl border border-slate-700 hover:bg-slate-800 text-slate-300 text-xs font-semibold items-center gap-1.5 transition"
              title="Download Markdown Handout"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Handout</span>
            </button>

            <button
              onClick={() => window.print()}
              className="hidden md:flex px-3 py-1.5 rounded-xl border border-slate-700 hover:bg-slate-800 text-slate-300 text-xs font-semibold items-center gap-1.5 transition"
              title="Print Slides / Handout"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print</span>
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
