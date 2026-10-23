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
  FileSpreadsheet
} from 'lucide-react';
import { 
  SUPPORTED_LANGUAGES, 
  VOCABULARY_CATEGORIES, 
  SENTENCE_CATEGORIES 
} from '../../data/languagesData';

export const LanguageLearningStudio = ({ 
  initialNative = 'ur', 
  initialTarget = 'en',
  standalone = false 
}) => {
  // Languages state
  const [nativeCode, setNativeCode] = useState(initialNative);
  const [targetCode, setTargetCode] = useState(initialTarget);

  // Content mode: 'vocab' | 'sentences' | 'flashcards'
  const [activeTab, setActiveTab] = useState('vocab');

  // Filter & Search
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [searchQuery, setSearchQuery] = useState('');

  // Dataset state
  const [dataset, setDataset] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

    return () => { isMounted = false; };
  }, []);

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
  };

  // Categories list based on active tab
  const categories = useMemo(() => {
    return activeTab === 'vocab' ? VOCABULARY_CATEGORIES : SENTENCE_CATEGORIES;
  }, [activeTab]);

  // Reset category filter when switching tabs
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setSelectedCategory('All Categories');
    setSearchQuery('');
    setFlashcardIndex(0);
    setIsRevealed(false);
  };

  // Raw items for active mode
  const currentItems = useMemo(() => {
    if (!dataset) return [];
    return activeTab === 'sentences' ? dataset.sentences : dataset.vocabulary;
  }, [dataset, activeTab]);

  // Filtered items based on Category and Search
  const filteredItems = useMemo(() => {
    if (!currentItems) return [];
    return currentItems.filter(item => {
      // Category filter
      if (selectedCategory !== 'All Categories' && item.category !== selectedCategory) {
        return false;
      }
      // Search filter
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
  }, [currentItems, selectedCategory, searchQuery, nativeCode, targetCode]);

  // Web Speech API Text-to-Speech
  const speakText = (text, langObj, idKey) => {
    if (!window.speechSynthesis) {
      alert('Speech Synthesis is not supported in this browser.');
      return;
    }

    try {
      window.speechSynthesis.cancel();
      setSpeakingId(idKey);

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = langObj.speechCode || 'en-US';
      utterance.rate = 0.9; // Slightly slower for language learners
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

  // Flashcards controls
  const activeFlashcardItem = filteredItems[flashcardIndex] || filteredItems[0];

  const handleNextFlashcard = () => {
    setIsRevealed(false);
    setFlashcardIndex(prev => (prev + 1) % filteredItems.length);
  };

  const handlePrevFlashcard = () => {
    setIsRevealed(false);
    setFlashcardIndex(prev => (prev - 1 + filteredItems.length) % filteredItems.length);
  };

  const handleShuffleFlashcards = () => {
    setIsRevealed(false);
    const randomIndex = Math.floor(Math.random() * filteredItems.length);
    setFlashcardIndex(randomIndex);
  };

  // Auto-speak target when flashcard revealed
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
          Loading 20-Language Learning Engine...
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

  return (
    <div className={`space-y-6 ${standalone ? 'max-w-7xl mx-auto px-4 py-8' : ''}`}>
      {/* ─────────────────────────────────────────────────────────────
          1. HEADER & EXCEL DOWNLOAD BANNER
          ───────────────────────────────────────────────────────────── */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-900 via-slate-900 to-brand-950 text-white p-6 sm:p-8 shadow-xl border border-indigo-800/40">
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-brand-500/20 text-brand-300 border border-brand-500/30 backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-brand-400" />
              Comprehensive Polyglot Course • 20 Languages
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
              Global Language Learning Studio
            </h2>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Master essential daily vocabulary & conversational phrases with authentic scripts, 
              phonetic romanizations, and native audio speech synthesis side-by-side.
            </p>
          </div>

          {/* Excel Download Button */}
          <div className="flex-shrink-0 w-full sm:w-auto">
            <a
              href="/data/languages/Global_Language_Learning_20_Languages.xlsx"
              download="Global_Language_Learning_20_Languages.xlsx"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-5 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 active:scale-95 text-white font-bold text-sm shadow-lg shadow-emerald-950/40 transition-all border border-emerald-400/40 group"
            >
              <FileSpreadsheet className="w-5 h-5 text-emerald-100 group-hover:scale-110 transition-transform" />
              <div className="text-left">
                <div className="text-xs font-medium text-emerald-200 uppercase tracking-wider">Complete Dataset</div>
                <div className="text-sm font-bold">Download Course Excel (.xlsx)</div>
              </div>
              <Download className="w-4 h-4 ml-1 opacity-70 group-hover:translate-y-0.5 transition-transform" />
            </a>
          </div>
        </div>

        {/* Course Metric Badges */}
        <div className="mt-6 pt-6 border-t border-slate-700/60 grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="p-3 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
            <div className="text-2xl font-black text-brand-400">20</div>
            <div className="text-xs text-slate-400 font-medium">World Languages</div>
          </div>
          <div className="p-3 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
            <div className="text-2xl font-black text-emerald-400">250</div>
            <div className="text-xs text-slate-400 font-medium">Core Vocabulary Words</div>
          </div>
          <div className="p-3 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
            <div className="text-2xl font-black text-cyan-400">100</div>
            <div className="text-xs text-slate-400 font-medium">Conversational Sentences</div>
          </div>
          <div className="p-3 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
            <div className="text-2xl font-black text-amber-400">100%</div>
            <div className="text-xs text-slate-400 font-medium">Bilingual & Phonetics</div>
          </div>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          2. LANGUAGE SELECTION & SWAP BAR
          ───────────────────────────────────────────────────────────── */}
      <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row items-center gap-4 justify-between">
          
          {/* Native Language ("From") */}
          <div className="w-full md:w-5/12 space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
              <span>My Native Language</span>
              <span className="text-[10px] px-1.5 py-0.2 bg-slate-100 dark:bg-slate-800 rounded font-semibold text-slate-600 dark:text-slate-300">
                Known
              </span>
            </label>
            <div className="relative">
              <select
                value={nativeCode}
                onChange={(e) => setNativeCode(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 font-semibold text-slate-800 dark:text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 appearance-none cursor-pointer pr-10"
              >
                {SUPPORTED_LANGUAGES.map(lang => (
                  <option key={`native-${lang.code}`} value={lang.code}>
                    {lang.flag} {lang.name} — {lang.nativeName}
                  </option>
                ))}
              </select>
              <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 text-xs">
                ▼
              </div>
            </div>
          </div>

          {/* Quick Swap Button */}
          <div className="flex-shrink-0 flex items-center justify-center pt-2 md:pt-5">
            <button
              onClick={handleSwapLanguages}
              title="Swap Languages (⇄)"
              className="p-3 rounded-2xl bg-brand-50 hover:bg-brand-100 dark:bg-brand-950/60 dark:hover:bg-brand-900 text-brand-600 dark:text-brand-300 border border-brand-200 dark:border-brand-800 transition-all transform active:scale-90 hover:rotate-180 duration-300 shadow-sm"
            >
              <ArrowLeftRight className="w-5 h-5" />
            </button>
          </div>

          {/* Target Language ("To") */}
          <div className="w-full md:w-5/12 space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400 flex items-center gap-1.5">
              <span>Language to Learn</span>
              <span className="text-[10px] px-1.5 py-0.2 bg-brand-100 dark:bg-brand-950/80 rounded font-bold text-brand-700 dark:text-brand-300">
                Target
              </span>
            </label>
            <div className="relative">
              <select
                value={targetCode}
                onChange={(e) => setTargetCode(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-brand-50/50 dark:bg-slate-800/80 border border-brand-300 dark:border-brand-700/60 font-semibold text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 appearance-none cursor-pointer pr-10"
              >
                {SUPPORTED_LANGUAGES.map(lang => (
                  <option key={`target-${lang.code}`} value={lang.code}>
                    {lang.flag} {lang.name} — {lang.nativeName}
                  </option>
                ))}
              </select>
              <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 text-xs">
                ▼
              </div>
            </div>
          </div>

        </div>

        {/* Quick Picks Pills */}
        <div className="pt-2 border-t border-slate-100 dark:border-slate-800/80 flex items-center gap-2 overflow-x-auto pb-1 text-xs">
          <span className="text-slate-400 text-[11px] font-semibold uppercase tracking-wider whitespace-nowrap">
            Popular:
          </span>
          {['ur', 'en', 'zh', 'ar', 'es', 'fr', 'hi', 'de', 'ja', 'ru'].map(code => {
            const l = SUPPORTED_LANGUAGES.find(x => x.code === code);
            if (!l) return null;
            const isSelected = targetCode === code;
            return (
              <button
                key={`quick-${code}`}
                onClick={() => setTargetCode(code)}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                  isSelected 
                    ? 'bg-brand-600 text-white shadow-sm' 
                    : 'bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300'
                }`}
              >
                <span>{l.flag}</span>
                <span>{l.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          3. MODE TABS & CONTROLS
          ───────────────────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        {/* Navigation Tabs */}
        <div className="flex items-center p-1.5 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800">
          <button
            onClick={() => handleTabChange('vocab')}
            className={`flex-1 sm:flex-initial flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeTab === 'vocab'
                ? 'bg-white dark:bg-slate-800 text-brand-600 dark:text-brand-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>250 Core Words</span>
          </button>
          
          <button
            onClick={() => handleTabChange('sentences')}
            className={`flex-1 sm:flex-initial flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeTab === 'sentences'
                ? 'bg-white dark:bg-slate-800 text-brand-600 dark:text-brand-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            <span>100 Sentences</span>
          </button>

          <button
            onClick={() => handleTabChange('flashcards')}
            className={`flex-1 sm:flex-initial flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeTab === 'flashcards'
                ? 'bg-white dark:bg-slate-800 text-brand-600 dark:text-brand-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Flashcards</span>
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={`Search ${activeTab === 'sentences' ? 'sentences' : 'words'}, phonetics, or meanings...`}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500 shadow-sm"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          4. CATEGORY FILTER PILLS
          ───────────────────────────────────────────────────────────── */}
      {activeTab !== 'flashcards' && (
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  isSelected
                    ? 'bg-brand-600 text-white shadow-sm shadow-brand-500/20'
                    : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200/80 dark:border-slate-800'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          5. CONTENT VIEWS
          ───────────────────────────────────────────────────────────── */}

      {/* FLASHCARD MODE */}
      {activeTab === 'flashcards' ? (
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="flex items-center justify-between px-2 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
            <span>Card {flashcardIndex + 1} of {filteredItems.length}</span>
            <div className="flex items-center gap-3">
              <label className="flex items-center gap-1.5 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={autoPlayAudio}
                  onChange={(e) => setAutoPlayAudio(e.target.checked)}
                  className="rounded text-brand-600 focus:ring-brand-500 h-3.5 w-3.5"
                />
                <span className="text-[11px] font-medium text-slate-600 dark:text-slate-300">Auto-play Audio</span>
              </label>
              <button
                onClick={handleShuffleFlashcards}
                className="inline-flex items-center gap-1 text-slate-500 hover:text-brand-600 transition-colors"
                title="Shuffle card"
              >
                <Shuffle className="w-3.5 h-3.5" />
                <span>Shuffle</span>
              </button>
            </div>
          </div>

          {activeFlashcardItem ? (
            <div className="relative rounded-3xl bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden p-6 sm:p-10 transition-all flex flex-col justify-between min-h-[380px]">
              
              {/* Category pill */}
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-brand-50 dark:bg-brand-950/50 text-brand-600 dark:text-brand-300 border border-brand-200/60 dark:border-brand-800/40">
                  {activeFlashcardItem.category} • #{activeFlashcardItem.id}
                </span>

                <button
                  onClick={() => {
                    const natText = activeFlashcardItem.translations[nativeCode]?.text;
                    speakText(natText, nativeLang, `fc-nat-${activeFlashcardItem.id}`);
                  }}
                  className="p-2.5 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300 transition-colors"
                  title="Listen Native"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>

              {/* Native Prompt */}
              <div className="my-6 text-center space-y-2">
                <div className="text-xs uppercase font-extrabold tracking-wider text-slate-400">
                  {nativeLang.flag} {nativeLang.name}
                </div>
                <div 
                  className={`text-2xl sm:text-3xl font-black text-slate-900 dark:text-white ${
                    nativeLang.code === 'ur' ? 'font-urdu leading-[2.2]' : ''
                  }`}
                  dir={nativeLang.dir}
                >
                  {activeFlashcardItem.translations[nativeCode]?.text}
                </div>
                {activeFlashcardItem.translations[nativeCode]?.pronunciation && (
                  <div className="text-xs sm:text-sm font-medium text-slate-500 dark:text-slate-400 font-mono italic">
                    /{activeFlashcardItem.translations[nativeCode]?.pronunciation}/
                  </div>
                )}
              </div>

              {/* Revealed Target Side */}
              {isRevealed ? (
                <div className="mt-4 pt-6 border-t border-dashed border-slate-200 dark:border-slate-800 text-center space-y-3 animate-fade-in">
                  <div className="text-xs uppercase font-extrabold tracking-wider text-brand-600 dark:text-brand-400 flex items-center justify-center gap-1.5">
                    <span>{targetLang.flag} {targetLang.name} Translation</span>
                  </div>
                  <div 
                    className={`text-2xl sm:text-3xl font-black text-brand-600 dark:text-brand-400 ${
                      targetLang.code === 'ur' ? 'font-urdu leading-[2.2]' : ''
                    }`}
                    dir={targetLang.dir}
                  >
                    {activeFlashcardItem.translations[targetCode]?.text}
                  </div>
                  <div className="text-xs sm:text-sm font-semibold text-slate-600 dark:text-slate-300 font-mono bg-slate-100 dark:bg-slate-800/60 px-3 py-1.5 rounded-xl inline-block">
                    /{activeFlashcardItem.translations[targetCode]?.pronunciation}/
                  </div>
                  <div className="flex justify-center pt-2">
                    <button
                      onClick={() => {
                        const tgtText = activeFlashcardItem.translations[targetCode]?.text;
                        speakText(tgtText, targetLang, `fc-tgt-${activeFlashcardItem.id}`);
                      }}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-brand-500 hover:bg-brand-600 text-white text-xs font-bold shadow-md transition-all active:scale-95"
                    >
                      <Volume2 className="w-4 h-4" />
                      <span>Listen Pronunciation</span>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="text-center pt-6">
                  <button
                    onClick={() => setIsRevealed(true)}
                    className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-500 hover:to-indigo-500 text-white font-bold text-sm shadow-lg shadow-brand-500/25 transition-all transform active:scale-95"
                  >
                    <Eye className="w-4 h-4" />
                    <span>Reveal Translation & Pronunciation</span>
                  </button>
                </div>
              )}

              {/* Navigation Arrows */}
              <div className="mt-8 pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
                <button
                  onClick={handlePrevFlashcard}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-bold transition-all"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Previous</span>
                </button>

                <button
                  onClick={() => setIsRevealed(!isRevealed)}
                  className="text-xs font-semibold text-slate-400 hover:text-slate-600"
                >
                  {isRevealed ? 'Hide' : 'Peek'}
                </button>

                <button
                  onClick={handleNextFlashcard}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-brand-600 hover:bg-brand-500 text-white text-xs font-bold transition-all"
                >
                  <span>Next Card</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

            </div>
          ) : (
            <div className="p-8 text-center bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
              <p className="text-slate-500">No cards found matching your filter.</p>
            </div>
          )}
        </div>
      ) : (
        /* GRID LIST MODE (VOCABULARY & SENTENCES) */
        <div className="space-y-4">
          <div className="flex items-center justify-between px-1 text-xs text-slate-500 dark:text-slate-400 font-medium">
            <span>
              Showing <strong className="text-slate-800 dark:text-white">{filteredItems.length}</strong> items 
              {selectedCategory !== 'All Categories' && ` in ${selectedCategory}`}
            </span>
            <span>
              {nativeLang.flag} {nativeLang.name} ⇄ {targetLang.flag} {targetLang.name}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredItems.map((item) => {
              const nativeTrans = item.translations[nativeCode] || { text: '', pronunciation: '' };
              const targetTrans = item.translations[targetCode] || { text: '', pronunciation: '' };
              const isTargetSpeaking = speakingId === `tgt-${item.id}`;
              const isNativeSpeaking = speakingId === `nat-${item.id}`;
              const isCopied = copiedId === item.id;

              return (
                <div 
                  key={`item-${item.id}`}
                  className="group rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 p-4 sm:p-5 shadow-sm hover:shadow-md hover:border-brand-300 dark:hover:border-brand-700/60 transition-all flex flex-col justify-between"
                >
                  {/* Card Header: Category & Actions */}
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                    <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800/80">
                      {item.category} • #{item.id}
                    </span>

                    <button
                      onClick={() => handleCopy(`${nativeTrans.text} -> ${targetTrans.text} (${targetTrans.pronunciation})`, item.id)}
                      title="Copy item"
                      className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors p-1"
                    >
                      {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>

                  {/* Bilingual Content */}
                  <div className="py-3 space-y-4">
                    
                    {/* Native Box */}
                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 flex items-center gap-1">
                          <span>{nativeLang.flag}</span>
                          <span>{nativeLang.name}</span>
                        </span>

                        <button
                          onClick={() => speakText(nativeTrans.text, nativeLang, `nat-${item.id}`)}
                          className={`p-1 rounded-md transition-colors ${
                            isNativeSpeaking 
                              ? 'text-brand-600 bg-brand-50 dark:bg-brand-950 animate-pulse' 
                              : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'
                          }`}
                          title="Listen Native"
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div 
                        className={`text-base sm:text-lg font-bold text-slate-800 dark:text-slate-200 ${
                          nativeLang.code === 'ur' ? 'font-urdu leading-[2.2] text-xl' : ''
                        }`}
                        dir={nativeLang.dir}
                      >
                        {nativeTrans.text}
                      </div>

                      {nativeTrans.pronunciation && (
                        <div className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                          /{nativeTrans.pronunciation}/
                        </div>
                      )}
                    </div>

                    {/* Target Box (Highlighted) */}
                    <div className="p-3 rounded-xl bg-gradient-to-br from-brand-50/60 to-indigo-50/40 dark:from-slate-800/60 dark:to-brand-950/20 border border-brand-100 dark:border-brand-900/40 space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-extrabold uppercase tracking-wider text-brand-600 dark:text-brand-400 flex items-center gap-1">
                          <span>{targetLang.flag}</span>
                          <span>{targetLang.name}</span>
                        </span>

                        <button
                          onClick={() => speakText(targetTrans.text, targetLang, `tgt-${item.id}`)}
                          className={`p-1.5 rounded-lg transition-all ${
                            isTargetSpeaking 
                              ? 'bg-brand-600 text-white animate-pulse' 
                              : 'bg-white dark:bg-slate-800 text-brand-600 dark:text-brand-300 hover:bg-brand-600 hover:text-white shadow-xs'
                          }`}
                          title="Listen Pronunciation"
                        >
                          <Volume2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div 
                        className={`text-lg sm:text-xl font-black text-brand-700 dark:text-brand-300 ${
                          targetLang.code === 'ur' ? 'font-urdu leading-[2.2] text-2xl' : ''
                        }`}
                        dir={targetLang.dir}
                      >
                        {targetTrans.text}
                      </div>

                      {targetTrans.pronunciation && (
                        <div className="text-xs font-semibold text-slate-600 dark:text-slate-300 font-mono">
                          🗣️ /{targetTrans.pronunciation}/
                        </div>
                      )}
                    </div>

                  </div>

                </div>
              );
            })}
          </div>

          {filteredItems.length === 0 && (
            <div className="py-16 text-center bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 space-y-3">
              <Languages className="w-10 h-10 text-slate-400 mx-auto" />
              <p className="text-base font-bold text-slate-700 dark:text-slate-200">No items found</p>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                No words or phrases matched your filter "{searchQuery}". Try clearing your search or switching categories.
              </p>
              <button
                onClick={() => { setSearchQuery(''); setSelectedCategory('All Categories'); }}
                className="px-4 py-2 rounded-xl bg-brand-600 text-white text-xs font-semibold"
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
