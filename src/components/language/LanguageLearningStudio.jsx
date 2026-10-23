import React, { useState, useEffect, useMemo, useRef } from 'react';
import { 
  Languages, 
  ArrowLeftRight, 
  Volume2, 
  VolumeX, 
  Download, 
  Search, 
  Sparkles, 
  BookOpen, 
  MessageSquare, 
  Layers, 
  CheckCircle2, 
  Copy, 
  Check, 
  ChevronLeft, 
  ChevronRight, 
  Shuffle, 
  RotateCcw,
  Eye, 
  EyeOff, 
  Filter, 
  FileSpreadsheet,
  Trophy,
  Award,
  ChevronDown,
  X,
  Compass,
  Play,
  ArrowRight,
  GraduationCap,
  Bookmark,
  CheckCircle
} from 'lucide-react';
import { 
  SUPPORTED_LANGUAGES, 
  COURSE_MODULES,
  VOCABULARY_CATEGORIES, 
  SENTENCE_CATEGORIES 
} from '../../data/languagesData';
import { LanguageAssessmentTest } from './LanguageAssessmentTest';
import { speakUrduFahad, stopUrduSpeech } from '../../services/urduVoiceService';

export const LanguageLearningStudio = ({ 
  initialNative = 'ur', 
  initialTarget = 'en',
  standalone = false 
}) => {
  // Languages state
  const [nativeCode, setNativeCode] = useState(initialNative);
  const [targetCode, setTargetCode] = useState(initialTarget);
  const [showLanguagePicker, setShowLanguagePicker] = useState(false);

  // Active view mode: 'course' (sequential step-by-step) | 'grid' | 'flashcards' | 'test'
  const [activeMode, setActiveMode] = useState('course');
  
  // Current Active Module (1 - 10)
  const [activeModuleId, setActiveModuleId] = useState(1);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  // Filter & Search
  const [contentFilter, setContentFilter] = useState('all'); // 'all' | 'vocab' | 'sentences'
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [searchQuery, setSearchQuery] = useState('');

  // Dataset state
  const [dataset, setDataset] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Learned items tracking (saved in localStorage)
  const [learnedIds, setLearnedIds] = useState(() => {
    try {
      const saved = localStorage.getItem(`dt_polyglot_learned_${initialNative}_${initialTarget}`);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Flashcards state
  const [flashcardIndex, setFlashcardIndex] = useState(0);
  const [isRevealed, setIsRevealed] = useState(false);
  const [autoPlayAudio, setAutoPlayAudio] = useState(true);

  // Audio Speech state
  const [speakingId, setSpeakingId] = useState(null);
  const [copiedId, setCopiedId] = useState(null);

  // Load dataset JSON
  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    fetch('/data/languages/language_learning_20.json')
      .then(res => {
        if (!res.ok) throw new Error(`HTTP error ${res.status}`);
        return res.json();
      })
      .then(data => {
        if (isMounted) {
          setDataset(data);
          setLoading(false);
        }
      })
      .catch(err => {
        console.error('Error fetching language dataset:', err);
        if (isMounted) {
          setError('Failed to load language course dataset. Please ensure the file exists.');
          setLoading(false);
        }
      });

    return () => { 
      isMounted = false; 
      stopUrduSpeech();
    };
  }, []);

  // Update learned items on language pair switch
  useEffect(() => {
    try {
      const saved = localStorage.getItem(`dt_polyglot_learned_${nativeCode}_${targetCode}`);
      setLearnedIds(saved ? JSON.parse(saved) : []);
    } catch {
      setLearnedIds([]);
    }
  }, [nativeCode, targetCode]);

  // Persist learned items
  const toggleLearned = (uniqueKey) => {
    setLearnedIds(prev => {
      const exists = prev.includes(uniqueKey);
      const next = exists ? prev.filter(k => k !== uniqueKey) : [...prev, uniqueKey];
      try {
        localStorage.setItem(`dt_polyglot_learned_${nativeCode}_${targetCode}`, JSON.stringify(next));
      } catch (e) {
        console.warn('Storage save failed:', e);
      }
      return next;
    });
  };

  // Language objects
  const nativeLang = useMemo(() => {
    return SUPPORTED_LANGUAGES.find(l => l.code === nativeCode) || SUPPORTED_LANGUAGES[0];
  }, [nativeCode]);

  const targetLang = useMemo(() => {
    return SUPPORTED_LANGUAGES.find(l => l.code === targetCode) || SUPPORTED_LANGUAGES[1];
  }, [targetCode]);

  // Swap Languages Handler
  const handleSwapLanguages = () => {
    setNativeCode(targetCode);
    setTargetCode(nativeCode);
    setShowLanguagePicker(false);
  };

  // Current Active Module Definition
  const currentModule = useMemo(() => {
    return COURSE_MODULES.find(m => m.id === activeModuleId) || COURSE_MODULES[0];
  }, [activeModuleId]);

  // Module items: 50 vocab + 30 sentences
  const moduleItems = useMemo(() => {
    if (!dataset) return [];
    const vocabs = (dataset.vocabulary || [])
      .filter(v => v.id >= currentModule.vocabRange[0] && v.id <= currentModule.vocabRange[1])
      .map(v => ({ ...v, itemType: 'vocab', uniqueKey: `v-${v.id}` }));

    const sents = (dataset.sentences || [])
      .filter(s => s.id >= currentModule.sentenceRange[0] && s.id <= currentModule.sentenceRange[1])
      .map(s => ({ ...s, itemType: 'sentence', uniqueKey: `s-${s.id}` }));

    if (contentFilter === 'vocab') return vocabs;
    if (contentFilter === 'sentences') return sents;
    return [...vocabs, ...sents];
  }, [dataset, currentModule, contentFilter]);

  // Reset step index if out of bounds
  useEffect(() => {
    if (currentStepIndex >= moduleItems.length) {
      setCurrentStepIndex(0);
    }
  }, [moduleItems.length, currentStepIndex]);

  // Active step item for sequential mode
  const currentStepItem = moduleItems[currentStepIndex] || moduleItems[0];

  // All combined items for grid and search
  const allCourseItems = useMemo(() => {
    if (!dataset) return [];
    const vocabs = (dataset.vocabulary || []).map(v => ({ ...v, itemType: 'vocab', uniqueKey: `v-${v.id}` }));
    const sents = (dataset.sentences || []).map(s => ({ ...s, itemType: 'sentence', uniqueKey: `s-${s.id}` }));
    return [...vocabs, ...sents];
  }, [dataset]);

  // Filtered items for Grid view
  const filteredGridItems = useMemo(() => {
    if (!allCourseItems) return [];
    return allCourseItems.filter(item => {
      if (contentFilter === 'vocab' && item.itemType !== 'vocab') return false;
      if (contentFilter === 'sentences' && item.itemType !== 'sentence') return false;
      if (selectedCategory !== 'All Categories' && item.category !== selectedCategory) return false;

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const nativeTrans = item.translations[nativeCode];
        const targetTrans = item.translations[targetCode];

        const matchNative = nativeTrans?.text?.toLowerCase().includes(q) || 
                            nativeTrans?.pronunciation?.toLowerCase().includes(q);
        const matchTarget = targetTrans?.text?.toLowerCase().includes(q) || 
                            targetTrans?.pronunciation?.toLowerCase().includes(q);
        const matchCat = item.category?.toLowerCase().includes(q);
        return matchNative || matchTarget || matchCat;
      }
      return true;
    });
  }, [allCourseItems, contentFilter, selectedCategory, searchQuery, nativeCode, targetCode]);

  // Total Course Progress Calculation (out of 800)
  const totalCourseCount = 800;
  const totalLearnedCount = learnedIds.length;
  const courseProgressPercent = Math.min(100, Math.round((totalLearnedCount / totalCourseCount) * 100));

  // Current Module Progress Calculation
  const moduleLearnedCount = useMemo(() => {
    if (!moduleItems.length) return 0;
    return moduleItems.filter(item => learnedIds.includes(item.uniqueKey)).length;
  }, [moduleItems, learnedIds]);

  const moduleProgressPercent = moduleItems.length 
    ? Math.min(100, Math.round((moduleLearnedCount / moduleItems.length) * 100))
    : 0;

  // Web Speech API / Fahad Urdu Text-to-Speech
  const speakText = (text, langObj, idKey) => {
    stopUrduSpeech();

    // If Urdu is requested, use Fahad Motivational Speaker voice service
    if (langObj?.id === 'ur' || langObj?.speechCode?.toLowerCase().startsWith('ur')) {
      setSpeakingId(idKey);
      speakUrduFahad({
        text,
        onStart: () => setSpeakingId(idKey),
        onEnd: () => setSpeakingId(null),
        onError: () => setSpeakingId(null),
      });
      return;
    }

    if (!window.speechSynthesis) {
      alert('Speech Synthesis is not supported in this browser.');
      return;
    }

    try {
      window.speechSynthesis.cancel();
      setSpeakingId(idKey);

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = langObj?.speechCode || 'en-US';
      utterance.rate = 0.88;
      utterance.pitch = 1.0;

      utterance.onend = () => setSpeakingId(null);
      utterance.onerror = () => setSpeakingId(null);

      window.speechSynthesis.speak(utterance);
    } catch (e) {
      console.warn('Speech error:', e);
      setSpeakingId(null);
    }
  };

  // Copy to clipboard
  const handleCopy = (text, idKey) => {
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedId(idKey);
      setTimeout(() => setCopiedId(null), 1800);
    }
  };

  // Sequential Step Controls
  const handleNextStep = (markAsDone = false) => {
    if (markAsDone && currentStepItem) {
      if (!learnedIds.includes(currentStepItem.uniqueKey)) {
        toggleLearned(currentStepItem.uniqueKey);
      }
    }
    if (currentStepIndex < moduleItems.length - 1) {
      setCurrentStepIndex(prev => prev + 1);
    } else if (activeModuleId < COURSE_MODULES.length) {
      // Advance to next module
      setActiveModuleId(prev => prev + 1);
      setCurrentStepIndex(0);
    }
  };

  const handlePrevStep = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(prev => prev - 1);
    } else if (activeModuleId > 1) {
      setActiveModuleId(prev => prev - 1);
      setCurrentStepIndex(0);
    }
  };

  // Flashcards controls
  const activeFlashcardItem = filteredGridItems[flashcardIndex] || filteredGridItems[0];
  const handleNextFlashcard = () => {
    setIsRevealed(false);
    setFlashcardIndex(prev => (prev + 1) % filteredGridItems.length);
  };
  const handlePrevFlashcard = () => {
    setIsRevealed(false);
    setFlashcardIndex(prev => (prev - 1 + filteredGridItems.length) % filteredGridItems.length);
  };

  // Auto-speak on flashcard reveal
  useEffect(() => {
    if (isRevealed && autoPlayAudio && activeFlashcardItem) {
      const targetText = activeFlashcardItem.translations[targetCode]?.text;
      if (targetText) {
        speakText(targetText, targetLang, `fc-${activeFlashcardItem.id}`);
      }
    }
  }, [isRevealed]);

  if (loading) {
    return (
      <div className="py-20 flex flex-col items-center justify-center space-y-4">
        <div className="w-12 h-12 border-4 border-brand-500 border-t-transparent rounded-full animate-spin" />
        <p className="text-sm font-medium text-slate-600 dark:text-slate-300">
          Loading 20-Language Learning Engine (500 Words + 300 Sentences)...
        </p>
      </div>
    );
  }

  if (error || !dataset) {
    return (
      <div className="p-8 my-6 rounded-2xl bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-800 text-center space-y-4">
        <p className="text-rose-600 dark:text-rose-400 font-medium">{error || 'Failed to load dataset.'}</p>
        <button 
          onClick={() => window.location.reload()} 
          className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-sm font-semibold transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  // ASSESSMENT TEST MODE VIEW
  if (activeMode === 'test') {
    return (
      <div className={`space-y-6 ${standalone ? 'max-w-7xl mx-auto px-4 py-8' : ''}`}>
        <LanguageAssessmentTest 
          nativeLang={nativeLang}
          targetLang={targetLang}
          dataset={dataset}
          speakText={speakText}
          onExitTest={() => setActiveMode('course')}
        />
      </div>
    );
  }

  const isUrduOrArabicTarget = targetLang.code === 'ur' || targetLang.code === 'ar';
  const isUrduOrArabicNative = nativeLang.code === 'ur' || nativeLang.code === 'ar';

  return (
    <div className={`space-y-6 ${standalone ? 'max-w-7xl mx-auto px-4 py-8' : ''}`}>
      
      {/* ─────────────────────────────────────────────────────────────
          1. FOCUSED ACTIVE LANGUAGE TOPBAR (Other options disappear!)
          ───────────────────────────────────────────────────────────── */}
      <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Active Language Pair Display */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 p-1.5 px-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-100 text-xs sm:text-sm font-bold">
            <span className="text-lg">{nativeLang.flag}</span>
            <span>{nativeLang.name}</span>
            <span className="text-[10px] text-slate-500 font-medium">({nativeLang.nativeName})</span>
          </div>

          <button
            onClick={handleSwapLanguages}
            title="Swap Languages (⇄)"
            className="p-2 rounded-xl bg-brand-50 hover:bg-brand-100 dark:bg-brand-950/60 dark:hover:bg-brand-900 text-brand-600 dark:text-brand-300 border border-brand-200 dark:border-brand-800 transition-all active:scale-95 hover:rotate-180 duration-300"
          >
            <ArrowLeftRight className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-2 p-1.5 px-3 rounded-xl bg-brand-500/10 border border-brand-500/30 text-brand-600 dark:text-brand-300 text-xs sm:text-sm font-bold">
            <span className="text-lg">{targetLang.flag}</span>
            <span>Learning: {targetLang.name}</span>
            <span className="text-[10px] opacity-80 font-medium">({targetLang.nativeName})</span>
          </div>
        </div>

        {/* Change Language Button & Test Trigger */}
        <div className="flex items-center gap-2 w-full md:w-auto justify-end">
          <button
            onClick={() => setShowLanguagePicker(prev => !prev)}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold transition-all"
          >
            <Languages className="w-4 h-4 text-brand-500" />
            <span>{showLanguagePicker ? 'Close Picker' : 'Change Language'}</span>
            <ChevronDown className={`w-3.5 h-3.5 transition-transform ${showLanguagePicker ? 'rotate-180' : ''}`} />
          </button>

          <button
            onClick={() => setActiveMode('test')}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-brand-600 hover:from-amber-400 hover:to-brand-500 text-white text-xs font-extrabold shadow-sm transition-all active:scale-95"
          >
            <Trophy className="w-4 h-4 text-amber-200" />
            <span>Take Test</span>
          </button>

          <a
            href="/data/languages/Global_Language_Learning_20_Languages.xlsx"
            download="Global_Language_Learning_20_Languages.xlsx"
            className="p-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 transition-colors"
            title="Download Full Excel Workbook (500 Words + 300 Sentences)"
          >
            <Download className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          2. COLLAPSIBLE LANGUAGE PICKER MODAL / DRAWER
          (Only opens when user clicks "Change Language", disappears otherwise!)
          ───────────────────────────────────────────────────────────── */}
      {showLanguagePicker && (
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border-2 border-brand-500/30 shadow-xl animate-fadeIn space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Compass className="w-5 h-5 text-brand-500" />
                Select Your Languages
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Choose your native language and the target language you wish to master.
              </p>
            </div>
            <button 
              onClick={() => setShowLanguagePicker(false)}
              className="p-2 text-slate-400 hover:text-slate-600 rounded-xl"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Native Selector */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                1. Select Native Language (Known)
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-56 overflow-y-auto pr-1">
                {SUPPORTED_LANGUAGES.map(lang => {
                  const isSelected = nativeCode === lang.code;
                  return (
                    <button
                      key={`nat-pick-${lang.code}`}
                      onClick={() => setNativeCode(lang.code)}
                      className={`p-2.5 rounded-xl text-left text-xs font-semibold flex items-center gap-2 transition-all border ${
                        isSelected 
                          ? 'bg-slate-800 text-white border-slate-900 shadow-sm'
                          : 'bg-slate-50 hover:bg-slate-100 dark:bg-slate-800/60 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                      }`}
                    >
                      <span className="text-base">{lang.flag}</span>
                      <span className="truncate">{lang.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Target Selector */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400">
                2. Select Target Language (To Learn)
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-56 overflow-y-auto pr-1">
                {SUPPORTED_LANGUAGES.map(lang => {
                  const isSelected = targetCode === lang.code;
                  return (
                    <button
                      key={`tgt-pick-${lang.code}`}
                      onClick={() => {
                        setTargetCode(lang.code);
                        setShowLanguagePicker(false); // Auto-collapse to disappear
                      }}
                      className={`p-2.5 rounded-xl text-left text-xs font-bold flex items-center gap-2 transition-all border ${
                        isSelected 
                          ? 'bg-brand-600 text-white border-brand-700 shadow-sm'
                          : 'bg-brand-50/50 hover:bg-brand-100/50 dark:bg-slate-800/60 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 border-brand-200/60 dark:border-slate-700'
                      }`}
                    >
                      <span className="text-base">{lang.flag}</span>
                      <span className="truncate">{lang.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="pt-2 text-center">
            <button
              onClick={() => setShowLanguagePicker(false)}
              className="px-6 py-2.5 rounded-xl bg-brand-600 text-white font-bold text-xs hover:bg-brand-500 shadow-sm"
            >
              Start Course in {targetLang.name}
            </button>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          3. COURSE OVERALL PROGRESS BAR & METRICS
          ───────────────────────────────────────────────────────────── */}
      <div className="p-5 sm:p-6 rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border border-slate-800 text-white shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-brand-400" />
              <span className="text-xs font-bold uppercase tracking-wider text-brand-300">
                {targetLang.name} Mastery Course
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-white/10 text-slate-300">
                500 Words • 300 Sentences
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white">
              {currentModule.title}
            </h2>
          </div>

          <div className="text-right">
            <div className="text-2xl sm:text-3xl font-black text-emerald-400">
              {courseProgressPercent}%
            </div>
            <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              {totalLearnedCount} of {totalCourseCount} Mastered
            </div>
          </div>
        </div>

        {/* Dual Progress Bars */}
        <div className="space-y-2">
          {/* Overall Progress */}
          <div className="space-y-1">
            <div className="flex justify-between text-[11px] text-slate-400 font-medium">
              <span>Overall Course Completion</span>
              <span>{totalLearnedCount} / {totalCourseCount} Items</span>
            </div>
            <div className="w-full bg-slate-800/80 h-2.5 rounded-full overflow-hidden p-0.5 border border-white/10">
              <div 
                className="bg-gradient-to-r from-brand-500 via-indigo-400 to-emerald-400 h-full rounded-full transition-all duration-500 shadow-sm"
                style={{ width: `${courseProgressPercent}%` }}
              />
            </div>
          </div>

          {/* Module Progress */}
          <div className="space-y-1 pt-1">
            <div className="flex justify-between text-[11px] text-brand-300 font-medium">
              <span>Current Module Progress</span>
              <span>{moduleLearnedCount} / {moduleItems.length} Items ({moduleProgressPercent}%)</span>
            </div>
            <div className="w-full bg-slate-800/80 h-2 rounded-full overflow-hidden border border-white/5">
              <div 
                className="bg-emerald-400 h-full rounded-full transition-all duration-500"
                style={{ width: `${moduleProgressPercent}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          4. MODULE CAROUSEL SELECTOR (10 Modules)
          ───────────────────────────────────────────────────────────── */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider px-1">
          <span>Course Modules (10 Units)</span>
          <span className="text-brand-600 dark:text-brand-400">Select Unit</span>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {COURSE_MODULES.map((mod) => {
            const isSelected = activeModuleId === mod.id;
            return (
              <button
                key={`module-tab-${mod.id}`}
                onClick={() => {
                  setActiveModuleId(mod.id);
                  setCurrentStepIndex(0);
                }}
                className={`p-3 rounded-2xl text-left flex-shrink-0 transition-all border ${
                  isSelected
                    ? 'bg-brand-600 text-white border-brand-700 shadow-md shadow-brand-500/20 scale-102'
                    : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/70 border-slate-200 dark:border-slate-800'
                }`}
                style={{ minWidth: '160px' }}
              >
                <div className="text-[10px] font-bold uppercase tracking-wider opacity-75">
                  Unit {mod.id}
                </div>
                <div className="text-xs font-bold truncate mt-0.5">
                  {mod.shortTitle}
                </div>
                <div className="text-[10px] opacity-75 mt-1">
                  80 items • {mod.badge.split('•')[1] || 'Core'}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          5. VIEW MODE SWITCHER & SUB-FILTERS
          ───────────────────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        {/* Mode Buttons */}
        <div className="flex items-center p-1 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800">
          <button
            onClick={() => setActiveMode('course')}
            className={`flex-1 sm:flex-initial flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeMode === 'course'
                ? 'bg-white dark:bg-slate-800 text-brand-600 dark:text-brand-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Play className="w-3.5 h-3.5" />
            <span>Sequential Step-by-Step</span>
          </button>
          
          <button
            onClick={() => setActiveMode('grid')}
            className={`flex-1 sm:flex-initial flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeMode === 'grid'
                ? 'bg-white dark:bg-slate-800 text-brand-600 dark:text-brand-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Browse All (800)</span>
          </button>

          <button
            onClick={() => setActiveMode('flashcards')}
            className={`flex-1 sm:flex-initial flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeMode === 'flashcards'
                ? 'bg-white dark:bg-slate-800 text-brand-600 dark:text-brand-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Flashcards</span>
          </button>
        </div>

        {/* Content Type Filter */}
        <div className="flex items-center gap-1.5">
          {['all', 'vocab', 'sentences'].map((f) => (
            <button
              key={`filter-${f}`}
              onClick={() => {
                setContentFilter(f);
                setCurrentStepIndex(0);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold capitalize transition-all ${
                contentFilter === f
                  ? 'bg-brand-600 text-white shadow-sm'
                  : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800'
              }`}
            >
              {f === 'all' ? 'All (Vocab + Sentences)' : f === 'vocab' ? 'Vocab Only' : 'Sentences Only'}
            </button>
          ))}
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          6. PRIMARY VIEW: SEQUENTIAL ONE-BY-ONE CARD
          ───────────────────────────────────────────────────────────── */}
      {activeMode === 'course' && currentStepItem && (
        <div className="max-w-3xl mx-auto space-y-6">
          
          {/* Step Indicator Header */}
          <div className="flex items-center justify-between text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider px-2">
            <span>
              {currentStepItem.itemType === 'vocab' ? 'Vocabulary Word' : 'Conversational Sentence'} • Item {currentStepIndex + 1} of {moduleItems.length}
            </span>
            <span className="text-brand-600 dark:text-brand-400">
              {currentStepItem.category}
            </span>
          </div>

          {/* Focal Card */}
          <div className="rounded-3xl bg-white dark:bg-slate-900 border-2 border-slate-200/80 dark:border-slate-800 p-8 sm:p-10 shadow-lg relative overflow-hidden space-y-8">
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-500/5 rounded-full blur-3xl pointer-events-none" />

            {/* Top Row: Category & Learned Marker */}
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-brand-50 dark:bg-brand-950/60 text-brand-700 dark:text-brand-300 border border-brand-200 dark:border-brand-800">
                Unit {activeModuleId}: {currentModule.shortTitle}
              </span>

              <button
                onClick={() => toggleLearned(currentStepItem.uniqueKey)}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold transition-all border ${
                  learnedIds.includes(currentStepItem.uniqueKey)
                    ? 'bg-emerald-500 text-white border-emerald-600 shadow-sm'
                    : 'bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                }`}
              >
                <Check className="w-3.5 h-3.5" />
                <span>{learnedIds.includes(currentStepItem.uniqueKey) ? 'Learned ✓' : 'Mark Learned'}</span>
              </button>
            </div>

            {/* Prompt (Native Language) */}
            <div className="space-y-2 text-center pb-6 border-b border-slate-100 dark:border-slate-800">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                In your language ({nativeLang.name} {nativeLang.flag}):
              </span>
              <div 
                dir={nativeLang.dir}
                className={`text-xl sm:text-2xl font-bold text-slate-800 dark:text-slate-200 ${
                  isUrduOrArabicNative ? 'font-urdu leading-[2.2]' : ''
                }`}
              >
                {currentStepItem.translations[nativeCode]?.text}
              </div>
              {currentStepItem.translations[nativeCode]?.pronunciation && (
                <div className="text-xs text-slate-400 font-mono">
                  /{currentStepItem.translations[nativeCode]?.pronunciation}/
                </div>
              )}
            </div>

            {/* Target Language (Big & Bold with Audio Button) */}
            <div className="space-y-4 text-center">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400">
                Say it in {targetLang.name} {targetLang.flag}:
              </span>

              <div className="flex items-center justify-center gap-4">
                <div 
                  dir={targetLang.dir}
                  className={`text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 dark:text-white ${
                    isUrduOrArabicTarget ? 'font-urdu leading-[2.3]' : ''
                  }`}
                >
                  {currentStepItem.translations[targetCode]?.text}
                </div>

                {/* Speaker Button */}
                <button
                  onClick={() => speakText(
                    currentStepItem.translations[targetCode]?.text,
                    targetLang,
                    `step-${currentStepItem.uniqueKey}`
                  )}
                  className="p-3.5 rounded-2xl bg-brand-600 hover:bg-brand-500 text-white shadow-lg shadow-brand-600/30 transition-all active:scale-90"
                  title="Listen pronunciation"
                >
                  <Volume2 className={`w-6 h-6 ${speakingId === `step-${currentStepItem.uniqueKey}` ? 'animate-bounce' : ''}`} />
                </button>
              </div>

              {/* Phonetic Romanization */}
              {currentStepItem.translations[targetCode]?.pronunciation && (
                <div className="inline-block px-4 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-mono text-sm">
                  Pronounce: <strong className="text-brand-600 dark:text-brand-400">{currentStepItem.translations[targetCode]?.pronunciation}</strong>
                </div>
              )}
            </div>

            {/* Bottom Controls: Previous / Next / Quick Jump */}
            <div className="pt-6 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-3">
              <button
                onClick={handlePrevStep}
                disabled={currentStepIndex === 0 && activeModuleId === 1}
                className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-sm font-bold disabled:opacity-30 disabled:cursor-not-allowed transition-all"
              >
                <ChevronLeft className="w-5 h-5" />
                <span className="hidden sm:inline">Previous</span>
              </button>

              {/* Step counter dots / slider info */}
              <div className="text-center text-xs font-semibold text-slate-500">
                Card {currentStepIndex + 1} of {moduleItems.length}
              </div>

              <button
                onClick={() => handleNextStep(true)}
                className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-brand-600 hover:bg-brand-500 text-white text-sm font-bold shadow-md shadow-brand-600/25 transition-all active:scale-95"
              >
                <span>{learnedIds.includes(currentStepItem.uniqueKey) ? 'Next Card' : 'Learned & Next'}</span>
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          7. SECONDARY VIEW: GRID BROWSE (All 800 items)
          ───────────────────────────────────────────────────────────── */}
      {activeMode === 'grid' && (
        <div className="space-y-4">
          {/* Search bar inside grid */}
          <div className="relative max-w-md">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search words, sentences, or phonetics..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 shadow-sm"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredGridItems.map((item) => {
              const isLearned = learnedIds.includes(item.uniqueKey);
              return (
                <div
                  key={item.uniqueKey}
                  className={`p-5 rounded-2xl border transition-all space-y-3 bg-white dark:bg-slate-900 ${
                    isLearned ? 'border-emerald-400/60 dark:border-emerald-800' : 'border-slate-200 dark:border-slate-800'
                  }`}
                >
                  <div className="flex items-center justify-between text-[11px] text-slate-400 font-bold uppercase tracking-wider">
                    <span>{item.category}</span>
                    <button
                      onClick={() => toggleLearned(item.uniqueKey)}
                      className={`p-1 rounded-lg ${isLearned ? 'text-emerald-500' : 'text-slate-300 hover:text-slate-600'}`}
                    >
                      <CheckCircle className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Native */}
                  <div>
                    <div className="text-xs text-slate-400 font-medium">{nativeLang.name}:</div>
                    <div 
                      dir={nativeLang.dir}
                      className={`text-base font-semibold text-slate-800 dark:text-slate-200 ${
                        isUrduOrArabicNative ? 'font-urdu leading-[2.0]' : ''
                      }`}
                    >
                      {item.translations[nativeCode]?.text}
                    </div>
                  </div>

                  {/* Target */}
                  <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
                    <div className="flex items-center justify-between">
                      <div className="text-xs text-brand-600 dark:text-brand-400 font-bold">{targetLang.name}:</div>
                      <button
                        onClick={() => speakText(item.translations[targetCode]?.text, targetLang, item.uniqueKey)}
                        className="p-1.5 text-slate-500 hover:text-brand-600 rounded-lg"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                    </div>
                    <div 
                      dir={targetLang.dir}
                      className={`text-lg font-bold text-slate-900 dark:text-white ${
                        isUrduOrArabicTarget ? 'font-urdu leading-[2.1]' : ''
                      }`}
                    >
                      {item.translations[targetCode]?.text}
                    </div>
                    {item.translations[targetCode]?.pronunciation && (
                      <div className="text-[11px] font-mono text-slate-400 mt-0.5">
                        /{item.translations[targetCode]?.pronunciation}/
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          8. FLASHCARDS MODE
          ───────────────────────────────────────────────────────────── */}
      {activeMode === 'flashcards' && activeFlashcardItem && (
        <div className="max-w-xl mx-auto space-y-6">
          <div className="text-center text-xs font-bold text-slate-400 uppercase tracking-wider">
            Card {flashcardIndex + 1} of {filteredGridItems.length}
          </div>

          <div
            onClick={() => setIsRevealed(prev => !prev)}
            className="p-10 rounded-3xl bg-white dark:bg-slate-900 border-2 border-brand-500/30 text-center min-h-[260px] flex flex-col justify-center items-center shadow-xl cursor-pointer hover:border-brand-500 transition-all select-none space-y-4"
          >
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              {activeFlashcardItem.category}
            </div>

            <div 
              dir={nativeLang.dir}
              className={`text-2xl font-bold text-slate-800 dark:text-slate-100 ${
                isUrduOrArabicNative ? 'font-urdu leading-[2.2]' : ''
              }`}
            >
              {activeFlashcardItem.translations[nativeCode]?.text}
            </div>

            {isRevealed ? (
              <div className="space-y-2 pt-4 border-t border-slate-100 dark:border-slate-800 animate-fadeIn">
                <div 
                  dir={targetLang.dir}
                  className={`text-3xl font-black text-brand-600 dark:text-brand-400 ${
                    isUrduOrArabicTarget ? 'font-urdu leading-[2.2]' : ''
                  }`}
                >
                  {activeFlashcardItem.translations[targetCode]?.text}
                </div>
                <div className="text-xs font-mono text-slate-400">
                  /{activeFlashcardItem.translations[targetCode]?.pronunciation}/
                </div>
              </div>
            ) : (
              <p className="text-xs font-semibold text-slate-400 mt-4">
                Click anywhere to reveal answer in {targetLang.name}
              </p>
            )}
          </div>

          {/* Flashcard Nav */}
          <div className="flex items-center justify-between gap-3">
            <button
              onClick={handlePrevFlashcard}
              className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-bold"
            >
              Previous
            </button>
            <button
              onClick={() => setIsRevealed(prev => !prev)}
              className="px-4 py-2 rounded-xl bg-brand-50 text-brand-600 text-xs font-bold"
            >
              {isRevealed ? 'Hide Answer' : 'Show Answer'}
            </button>
            <button
              onClick={handleNextFlashcard}
              className="px-4 py-2 rounded-xl bg-brand-600 text-white text-xs font-bold"
            >
              Next
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
