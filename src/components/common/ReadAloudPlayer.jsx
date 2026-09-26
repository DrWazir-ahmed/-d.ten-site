import React, { useState, useEffect, useRef, useMemo } from 'react';
import { 
  Volume2, 
  VolumeX, 
  Play, 
  Pause, 
  Square, 
  RotateCcw, 
  Headphones, 
  Sparkles,
  ChevronDown,
  Gauge
} from 'lucide-react';

/**
 * Strips markdown and special characters to convert educational content
 * into smooth, natural spoken sentences for students.
 */
const cleanMarkdownForSpeech = (markdownText, titleText = '') => {
  if (!markdownText && !titleText) return [];

  let raw = '';
  if (titleText) {
    raw += `${titleText}. \n\n`;
  }
  raw += markdownText || '';

  // Clean markdown syntax
  const cleaned = raw
    .replace(/```[\s\S]*?```/g, ' Code snippet omitted. ') // Code blocks
    .replace(/`([^`]+)`/g, '$1')                           // Inline code
    .replace(/!\[([^\]]*)\]\([^)]*\)/g, ' Image: $1. ')    // Images
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')               // Links
    .replace(/\|.*?\|/g, ' ')                              // Tables
    .replace(/[-*]\s*\[[ xX]\]/g, ' Checkpoint: ')         // Checklists
    .replace(/^#{1,6}\s+/gm, '')                           // Headings
    .replace(/(\*\*|__)(.*?)\1/g, '$2')                    // Bold
    .replace(/(\*|_)(.*?)\1/g, '$2')                       // Italic
    .replace(/^>\s+/gm, ' Quote: ')                        // Blockquotes
    .replace(/^[-*•]\s+/gm, ' Note: ')                     // Bullets
    .replace(/^\d+\.\s+/gm, ' ')                           // Ordered lists
    .replace(/&[a-z]+;/gi, ' ')                            // HTML entities
    .replace(/\s+/g, ' ')                                  // Collapse whitespace
    .trim();

  if (!cleaned) return [];

  // Split into sentence chunks (~100-200 chars max) to avoid browser TTS timeout bugs
  const sentenceRegex = /[^.!?]+[.!?]+|\s*[^.!?]+$/g;
  const matches = cleaned.match(sentenceRegex) || [cleaned];

  return matches
    .map(s => s.trim())
    .filter(s => s.length > 0 && !/^[:\s.,;?!]+$/.test(s));
};

export const ReadAloudPlayer = ({
  text = '',
  title = '',
  subtitle = 'Read Aloud for Students',
  className = '',
  compact = false
}) => {
  const [supported, setSupported] = useState(true);
  const [status, setStatus] = useState('idle'); // 'idle' | 'playing' | 'paused'
  const [currentSentenceIndex, setCurrentSentenceIndex] = useState(0);
  const [rate, setRate] = useState(1.0); // 0.8, 1.0, 1.25, 1.5, 2.0
  const [voices, setVoices] = useState([]);
  const [selectedVoiceIndex, setSelectedVoiceIndex] = useState(0);
  const [showVoiceSelect, setShowVoiceSelect] = useState(false);

  // References to keep state synced across speech callbacks
  const sentenceIndexRef = useRef(0);
  const isPlayingRef = useRef(false);
  const keepAliveTimerRef = useRef(null);

  // Parse sentences
  const sentences = useMemo(() => {
    return cleanMarkdownForSpeech(text, title);
  }, [text, title]);

  const totalSentences = sentences.length;

  // Initialize Web Speech API & load voices
  useEffect(() => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      setSupported(false);
      return;
    }

    const loadVoices = () => {
      const allVoices = window.speechSynthesis.getVoices() || [];
      if (allVoices.length > 0) {
        // Prioritize English voices (US, GB, or natural voices)
        const englishVoices = allVoices.filter(v => v.lang && v.lang.toLowerCase().startsWith('en'));
        const availableVoices = englishVoices.length > 0 ? englishVoices : allVoices;
        setVoices(availableVoices);

        // Try to pick a natural or high quality voice
        const preferredIdx = availableVoices.findIndex(v => 
          v.name.includes('Natural') || 
          v.name.includes('Google') || 
          v.name.includes('Samantha') || 
          v.name.includes('David') || 
          v.name.includes('Zira')
        );
        setSelectedVoiceIndex(preferredIdx !== -1 ? preferredIdx : 0);
      }
    };

    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;

    return () => {
      stopSpeech();
      if (window.speechSynthesis) {
        window.speechSynthesis.onvoiceschanged = null;
      }
    };
  }, []);

  // Whenever text or title changes (e.g. student navigates to another lesson), reset speech
  useEffect(() => {
    stopSpeech();
    setCurrentSentenceIndex(0);
    sentenceIndexRef.current = 0;
  }, [text, title]);

  // Keep-alive workaround for Chromium bug (speechSynthesis drops after ~15s pause)
  const startKeepAlive = () => {
    clearInterval(keepAliveTimerRef.current);
    keepAliveTimerRef.current = setInterval(() => {
      if (window.speechSynthesis && window.speechSynthesis.speaking && !window.speechSynthesis.paused) {
        window.speechSynthesis.pause();
        window.speechSynthesis.resume();
      }
    }, 10000);
  };

  const clearKeepAlive = () => {
    if (keepAliveTimerRef.current) {
      clearInterval(keepAliveTimerRef.current);
      keepAliveTimerRef.current = null;
    }
  };

  // Speak a specific sentence index
  const speakSentence = (index) => {
    if (!window.speechSynthesis || index >= sentences.length) {
      // Finished all sentences
      setStatus('idle');
      isPlayingRef.current = false;
      sentenceIndexRef.current = 0;
      setCurrentSentenceIndex(0);
      clearKeepAlive();
      return;
    }

    window.speechSynthesis.cancel();

    const sentence = sentences[index];
    const utterance = new SpeechSynthesisUtterance(sentence);
    utterance.rate = rate;

    if (voices[selectedVoiceIndex]) {
      utterance.voice = voices[selectedVoiceIndex];
      utterance.lang = voices[selectedVoiceIndex].lang || 'en-US';
    }

    utterance.onstart = () => {
      sentenceIndexRef.current = index;
      setCurrentSentenceIndex(index);
      setStatus('playing');
      isPlayingRef.current = true;
    };

    utterance.onend = () => {
      if (isPlayingRef.current) {
        const nextIndex = index + 1;
        if (nextIndex < sentences.length) {
          speakSentence(nextIndex);
        } else {
          // Completed reading
          setStatus('idle');
          isPlayingRef.current = false;
          sentenceIndexRef.current = 0;
          setCurrentSentenceIndex(0);
          clearKeepAlive();
        }
      }
    };

    utterance.onerror = (e) => {
      if (e.error === 'interrupted' || e.error === 'canceled') return;
      console.warn('Speech synthesis notice:', e.error);
      setStatus('idle');
      isPlayingRef.current = false;
      clearKeepAlive();
    };

    startKeepAlive();
    window.speechSynthesis.speak(utterance);
  };

  const handlePlay = () => {
    if (!sentences.length) return;

    if (status === 'paused') {
      window.speechSynthesis.resume();
      setStatus('playing');
      isPlayingRef.current = true;
      startKeepAlive();
    } else {
      isPlayingRef.current = true;
      speakSentence(currentSentenceIndex);
    }
  };

  const handlePause = () => {
    if (window.speechSynthesis) {
      window.speechSynthesis.pause();
    }
    setStatus('paused');
    isPlayingRef.current = false;
    clearKeepAlive();
  };

  const stopSpeech = () => {
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    clearKeepAlive();
    setStatus('idle');
    isPlayingRef.current = false;
  };

  const handleStop = () => {
    stopSpeech();
    setCurrentSentenceIndex(0);
    sentenceIndexRef.current = 0;
  };

  const handleRestart = () => {
    stopSpeech();
    setCurrentSentenceIndex(0);
    sentenceIndexRef.current = 0;
    setTimeout(() => {
      isPlayingRef.current = true;
      speakSentence(0);
    }, 100);
  };

  const handleRateChange = (newRate) => {
    setRate(newRate);
    if (status === 'playing') {
      // Re-speak current sentence with new rate
      stopSpeech();
      setTimeout(() => {
        isPlayingRef.current = true;
        speakSentence(sentenceIndexRef.current);
      }, 50);
    }
  };

  if (!supported) {
    return null; // Gracefully hide if browser has no speech synthesis
  }

  if (sentences.length === 0) {
    return null; // Nothing to read
  }

  // Speed options
  const speeds = [0.8, 1.0, 1.25, 1.5];

  // Compact Pill Mode (e.g. for quick header placement)
  if (compact) {
    return (
      <div className={`inline-flex items-center gap-1.5 p-1 px-2.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold ${className}`}>
        {status === 'playing' ? (
          <>
            <button
              onClick={handlePause}
              className="p-1 rounded-full hover:bg-brand-100 dark:hover:bg-brand-900/50 text-brand-600 dark:text-brand-400 transition"
              title="Pause reading"
            >
              <Pause className="w-3.5 h-3.5 fill-current" />
            </button>
            <button
              onClick={handleStop}
              className="p-1 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500 transition"
              title="Stop reading"
            >
              <Square className="w-3 h-3 fill-current" />
            </button>
            <span className="text-[11px] text-brand-600 dark:text-brand-400 flex items-center gap-1 font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Reading ({currentSentenceIndex + 1}/{totalSentences})
            </span>
          </>
        ) : (
          <button
            onClick={handlePlay}
            className="flex items-center gap-1.5 hover:text-brand-600 dark:hover:text-brand-400 transition py-0.5"
            title="Read aloud this lesson"
          >
            <Volume2 className="w-3.5 h-3.5 text-brand-600 dark:text-brand-400" />
            <span>Read Aloud</span>
          </button>
        )}
      </div>
    );
  }

  // Full Interactive Learning Audio Player Card
  return (
    <div className={`rounded-2xl border border-brand-200/80 dark:border-brand-900/50 bg-gradient-to-r from-brand-50/70 via-indigo-50/40 to-white dark:from-slate-800/90 dark:via-slate-850 dark:to-slate-900 p-3.5 sm:p-4 shadow-xs transition-all ${className}`}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        
        {/* Left Info: Icon, Title & Animated Equalizer */}
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
            status === 'playing'
              ? 'bg-brand-600 text-white shadow-md shadow-brand-500/25 scale-105'
              : 'bg-brand-100 dark:bg-brand-950/80 text-brand-600 dark:text-brand-400'
          }`}>
            {status === 'playing' ? (
              <Headphones className="w-5 h-5 animate-pulse" />
            ) : (
              <Volume2 className="w-5 h-5" />
            )}
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                {subtitle}
                {status === 'playing' && (
                  <span className="inline-flex items-center gap-0.5 ml-1">
                    <span className="w-1 h-3 bg-brand-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-1 h-4 bg-brand-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-1 h-2.5 bg-brand-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </span>
                )}
              </span>
              <span className="text-[10px] uppercase font-black px-1.5 py-0.5 rounded bg-brand-100 dark:bg-brand-900/60 text-brand-700 dark:text-brand-300">
                AI Voice
              </span>
            </div>
            
            <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate max-w-xs sm:max-w-md">
              {status === 'playing' 
                ? `Listening: sentence ${currentSentenceIndex + 1} of ${totalSentences}` 
                : status === 'paused'
                ? `Paused at sentence ${currentSentenceIndex + 1} of ${totalSentences}`
                : `Listen to this lesson narrated with natural text-to-speech audio`
              }
            </p>
          </div>
        </div>

        {/* Right Controls: Play/Pause, Stop, Restart, Speed */}
        <div className="flex flex-wrap items-center gap-2 self-start sm:self-auto">
          
          {/* Main Play / Pause Button */}
          {status === 'playing' ? (
            <button
              onClick={handlePause}
              className="px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs flex items-center gap-1.5 shadow-xs transition"
              title="Pause Narration"
            >
              <Pause className="w-3.5 h-3.5 fill-current" />
              <span>Pause</span>
            </button>
          ) : status === 'paused' ? (
            <button
              onClick={handlePlay}
              className="px-3 py-1.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-xs transition"
              title="Resume Narration"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Resume</span>
            </button>
          ) : (
            <button
              onClick={handlePlay}
              className="px-3.5 py-1.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-xs transition group"
              title="Listen to this lesson"
            >
              <Play className="w-3.5 h-3.5 fill-current group-hover:scale-110 transition-transform" />
              <span>Listen Now</span>
            </button>
          )}

          {/* Stop / Reset Button (visible when active) */}
          {(status === 'playing' || status === 'paused' || currentSentenceIndex > 0) && (
            <>
              <button
                onClick={handleStop}
                className="p-1.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-750 transition"
                title="Stop Audio"
              >
                <Square className="w-3.5 h-3.5 fill-current" />
              </button>
              <button
                onClick={handleRestart}
                className="p-1.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-750 transition"
                title="Start from Beginning"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </>
          )}

          {/* Speed Selector */}
          <div className="flex items-center rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-0.5 text-xs font-semibold">
            {speeds.map((s) => (
              <button
                key={s}
                onClick={() => handleRateChange(s)}
                className={`px-2 py-1 rounded-lg text-[11px] transition ${
                  rate === s
                    ? 'bg-brand-600 text-white font-bold shadow-2xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
                title={`Playback Speed ${s}x`}
              >
                {s}x
              </button>
            ))}
          </div>

          {/* Voice Selector Dropdown (if multiple voices available) */}
          {voices.length > 1 && (
            <div className="relative">
              <select
                value={selectedVoiceIndex}
                onChange={(e) => {
                  const idx = parseInt(e.target.value, 10);
                  setSelectedVoiceIndex(idx);
                  if (status === 'playing') {
                    stopSpeech();
                    setTimeout(() => {
                      isPlayingRef.current = true;
                      speakSentence(sentenceIndexRef.current);
                    }, 50);
                  }
                }}
                className="text-[11px] font-medium py-1 px-2 pr-6 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-1 focus:ring-brand-500 cursor-pointer max-w-[110px] truncate"
                title="Select Voice"
              >
                {voices.map((v, i) => (
                  <option key={i} value={i}>
                    {v.name.replace(/Microsoft|Google|Apple/g, '').trim()} ({v.lang})
                  </option>
                ))}
              </select>
            </div>
          )}

        </div>
      </div>

      {/* Progress Bar during playback */}
      {(status === 'playing' || status === 'paused' || currentSentenceIndex > 0) && (
        <div className="mt-3 pt-2.5 border-t border-brand-200/50 dark:border-slate-800/80">
          <div className="w-full bg-slate-200 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
            <div 
              className="bg-brand-600 h-full rounded-full transition-all duration-300 ease-out"
              style={{ width: `${Math.round(((currentSentenceIndex + 1) / totalSentences) * 100)}%` }}
            />
          </div>
          <div className="flex justify-between items-center text-[10px] text-slate-400 mt-1">
            <span>Progress: {Math.round(((currentSentenceIndex + 1) / totalSentences) * 100)}%</span>
            <span>{totalSentences - (currentSentenceIndex + 1)} sentences remaining</span>
          </div>
        </div>
      )}
    </div>
  );
};
