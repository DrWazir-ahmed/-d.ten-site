import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Printer, 
  BookOpen, 
  Layers, 
  CheckCircle2, 
  Copy, 
  Check, 
  RotateCcw, 
  Sparkles,
  Volume2,
  HelpCircle,
  FileSpreadsheet
} from 'lucide-react';
import { FBISE_ISLAMIAT_9_VOCAB } from '../../data/fbiseIslamiatVocab';

export const IslamiatVocabViewer = ({ vocabList = FBISE_ISLAMIAT_9_VOCAB, onPrint }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('table'); // 'table' | 'cards' | 'quiz'
  const [rangeFilter, setRangeFilter] = useState('all');
  const [revealedCards, setRevealedCards] = useState({});
  const [copiedId, setCopiedId] = useState(null);

  // Quiz state
  const [quizIndex, setQuizIndex] = useState(0);
  const [quizRevealed, setQuizRevealed] = useState(false);
  const [quizScore, setQuizScore] = useState({ known: 0, review: 0 });

  // Filter words
  const filteredList = useMemo(() => {
    return vocabList.filter(item => {
      // Range filter
      if (rangeFilter === '1-20' && (item.id < 1 || item.id > 20)) return false;
      if (rangeFilter === '21-40' && (item.id < 21 || item.id > 40)) return false;
      if (rangeFilter === '41-60' && (item.id < 41 || item.id > 60)) return false;
      if (rangeFilter === '61-80' && (item.id < 61 || item.id > 80)) return false;

      // Search filter (number, arabic word or urdu meaning)
      if (!searchTerm.trim()) return true;
      const term = searchTerm.trim().toLowerCase();
      const idMatch = item.id.toString() === term;
      const wordMatch = item.word.toLowerCase().includes(term);
      const meaningMatch = item.meaning.toLowerCase().includes(term);
      return idMatch || wordMatch || meaningMatch;
    });
  }, [vocabList, rangeFilter, searchTerm]);

  const toggleCard = (id) => {
    setRevealedCards(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const revealAllCards = () => {
    const all = {};
    vocabList.forEach(item => { all[item.id] = true; });
    setRevealedCards(all);
  };

  const hideAllCards = () => {
    setRevealedCards({});
  };

  const handleCopyWord = (id, text) => {
    navigator.clipboard?.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1500);
  };

  const speakArabic = (text) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'ar-SA';
      utterance.rate = 0.85;
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleNextQuiz = (known) => {
    setQuizScore(prev => ({
      known: known ? prev.known + 1 : prev.known,
      review: !known ? prev.review + 1 : prev.review
    }));
    setQuizRevealed(false);
    setQuizIndex(prev => (prev + 1) % vocabList.length);
  };

  const resetQuiz = () => {
    setQuizIndex(0);
    setQuizRevealed(false);
    setQuizScore({ known: 0, review: 0 });
  };

  const currentQuizWord = vocabList[quizIndex];

  return (
    <div className="space-y-6">
      {/* Aesthetic Hero Header */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#16382b] via-[#1f4d3d] to-[#0f281e] text-white p-6 sm:p-8 shadow-xl border border-emerald-900/40">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-60 h-60 bg-emerald-400/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-60 h-60 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-200 text-xs font-semibold backdrop-blur-md border border-emerald-500/30">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>FBISE فیڈرل بورڈ — جماعت نہم نصاب</span>
            </div>
            <h1 
              dir="rtl" 
              className="text-3xl sm:text-4xl md:text-5xl font-black text-amber-100 tracking-wide font-urdu leading-relaxed"
            >
              الفاظ و معانی — جماعت نہم (اسلامیات)
            </h1>
            <p className="text-emerald-100/80 text-sm sm:text-base font-medium max-w-xl">
              Class 9 Islamiat — Complete 80 Textbook Words & Meanings with verified Arabic diacritics (اعراب) and Urdu translations.
            </p>
          </div>

          <div className="flex flex-wrap sm:flex-nowrap items-center gap-2">
            <button
              onClick={() => onPrint ? onPrint() : window.print()}
              className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition flex items-center gap-2 border border-white/15 backdrop-blur-sm shadow-sm"
              title="Print official study sheet"
            >
              <Printer className="w-4 h-4 text-amber-300" />
              <span>Print Handout</span>
            </button>
            <div className="px-4 py-2 rounded-xl bg-black/30 backdrop-blur-md border border-white/10 text-center">
              <div className="text-lg font-black text-amber-300">80</div>
              <div className="text-[10px] uppercase font-bold text-emerald-200 tracking-wider">Total Words</div>
            </div>
          </div>
        </div>
      </div>

      {/* Control Bar: Search & View Modes */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
          
          {/* Search bar */}
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="تلاش کریں: کوئی بھی لفظ، معنی یا نمبر لکھیں... (Search word, meaning, or #)"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            {searchTerm && (
              <button 
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 px-1.5 py-0.5 rounded"
              >
                Clear
              </button>
            )}
          </div>

          {/* Mode Switcher */}
          <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl self-start md:self-auto">
            <button
              onClick={() => setViewMode('table')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                viewMode === 'table'
                  ? 'bg-white dark:bg-slate-900 text-emerald-600 dark:text-emerald-400 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              <FileSpreadsheet className="w-3.5 h-3.5" />
              <span>جدول (Table)</span>
            </button>

            <button
              onClick={() => setViewMode('cards')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                viewMode === 'cards'
                  ? 'bg-white dark:bg-slate-900 text-emerald-600 dark:text-emerald-400 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>فلیش کارڈ (Flashcards)</span>
            </button>

            <button
              onClick={() => setViewMode('quiz')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                viewMode === 'quiz'
                  ? 'bg-white dark:bg-slate-900 text-emerald-600 dark:text-emerald-400 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>یادداشت ٹیسٹ (Quiz)</span>
            </button>
          </div>
        </div>

        {/* Range Segment Tabs */}
        {viewMode !== 'quiz' && (
          <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-100 dark:border-slate-800/80">
            <div className="flex items-center gap-1.5 overflow-x-auto text-xs">
              <span className="text-slate-400 font-medium mr-1 text-[11px]">حد (Range):</span>
              {[
                { id: 'all', label: 'تمام (1-80)' },
                { id: '1-20', label: '1 - 20' },
                { id: '21-40', label: '21 - 40' },
                { id: '41-60', label: '41 - 60' },
                { id: '61-80', label: '61 - 80' },
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setRangeFilter(tab.id)}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition ${
                    rangeFilter === tab.id
                      ? 'bg-emerald-600 text-white shadow-sm'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">
              دکھائے جا رہے ہیں: <strong className="text-emerald-600 dark:text-emerald-400 font-bold">{filteredList.length}</strong> الفاظ
            </div>
          </div>
        )}
      </div>

      {/* VIEW 1: TABLE VIEW (Official FBISE Styling) */}
      {viewMode === 'table' && (
        <div className="bg-[#fffdf8] dark:bg-slate-900 rounded-2xl border border-[#e6ddc9] dark:border-slate-800 shadow-sm overflow-hidden" dir="rtl">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-[#1f4d3d] text-[#fdf6e3] border-b border-[#16382b]">
                  <th className="py-3.5 px-3 text-center text-sm font-bold w-14 font-sans">#</th>
                  <th className="py-3.5 px-6 text-center text-lg font-bold w-1/3 font-serif">لفظ (قرآنی عربی)</th>
                  <th className="py-3.5 px-6 text-right text-lg font-bold font-serif">معنیٰ (اردو مفہوم)</th>
                  <th className="py-3.5 px-3 text-center text-xs font-medium w-24 no-print">کارروائی</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#e6ddc9] dark:divide-slate-800/80">
                {filteredList.map((item, idx) => (
                  <tr 
                    key={item.id} 
                    className={`transition-colors hover:bg-emerald-50/60 dark:hover:bg-slate-800/60 ${
                      idx % 2 === 0 ? 'bg-white dark:bg-slate-900' : 'bg-[#fbf8f0] dark:bg-slate-800/30'
                    }`}
                  >
                    {/* Number */}
                    <td className="py-3 px-3 text-center text-xs sm:text-sm font-bold text-[#a0937a] dark:text-slate-400 font-mono">
                      {item.id}
                    </td>

                    {/* Arabic Word */}
                    <td className="py-3.5 px-6 text-center bg-[#f6f1e3]/70 dark:bg-emerald-950/20 border-x border-[#e6ddc9] dark:border-slate-800">
                      <div className="flex items-center justify-center gap-2">
                        <span className="font-serif text-2xl sm:text-3xl font-bold text-[#1f2d3d] dark:text-amber-100 tracking-wide select-text">
                          {item.word}
                        </span>
                        <button
                          onClick={() => speakArabic(item.word)}
                          className="p-1 rounded-md text-emerald-700/60 hover:text-emerald-700 hover:bg-emerald-100/50 dark:text-emerald-400 dark:hover:bg-slate-800 transition no-print"
                          title="Listen pronunciation"
                        >
                          <Volume2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>

                    {/* Urdu Meaning */}
                    <td className="py-3.5 px-6 text-right text-[#33291d] dark:text-slate-200 text-lg sm:text-xl font-medium leading-relaxed font-serif">
                      {item.meaning}
                    </td>

                    {/* Actions */}
                    <td className="py-3 px-3 text-center no-print">
                      <button
                        onClick={() => handleCopyWord(item.id, `${item.word} — ${item.meaning}`)}
                        className="inline-flex items-center gap-1 px-2 py-1 rounded text-[11px] font-semibold text-slate-500 hover:text-emerald-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                        title="Copy pair"
                      >
                        {copiedId === item.id ? (
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredList.length === 0 && (
            <div className="text-center py-12 text-slate-500">
              <BookOpen className="w-10 h-10 mx-auto text-slate-300 mb-2" />
              <p className="text-sm font-medium">کوئی لفظ نہیں ملا (No matching word found)</p>
            </div>
          )}

          <div className="p-3 bg-[#f6f1e3]/60 dark:bg-slate-800/40 text-center text-xs text-[#8a8072] dark:text-slate-400 border-t border-[#e6ddc9] dark:border-slate-800">
            D.TEN Academy — Federal Board (FBISE) Class 9 Islamiat Curriculum Reference
          </div>
        </div>
      )}

      {/* VIEW 2: FLASHCARD / GRID MODE */}
      {viewMode === 'cards' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between px-1">
            <span className="text-xs text-slate-500">
              کارڈ پر کلک کر کے معنی دیکھیں یا چھپائیں (Click card to reveal/hide meaning)
            </span>
            <div className="flex gap-2">
              <button 
                onClick={revealAllCards}
                className="text-xs text-emerald-600 dark:text-emerald-400 font-bold hover:underline"
              >
                سب دکھائیں (Show All)
              </button>
              <span className="text-slate-300">|</span>
              <button 
                onClick={hideAllCards}
                className="text-xs text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 font-medium"
              >
                سب چھپائیں (Hide All)
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4" dir="rtl">
            {filteredList.map((item) => {
              const isRevealed = revealedCards[item.id];
              return (
                <div
                  key={item.id}
                  onClick={() => toggleCard(item.id)}
                  className={`cursor-pointer rounded-2xl border p-5 transition-all duration-300 select-none flex flex-col justify-between min-h-[170px] ${
                    isRevealed
                      ? 'bg-white dark:bg-slate-900 border-emerald-500/40 shadow-md'
                      : 'bg-[#fcfaf5] dark:bg-slate-800/50 border-[#e6ddc9] dark:border-slate-800 hover:border-emerald-500/30 hover:shadow-sm'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                    <span className="font-mono font-bold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                      #{item.id}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        speakArabic(item.word);
                      }}
                      className="p-1 rounded-md hover:bg-emerald-50 dark:hover:bg-slate-800 text-emerald-700 dark:text-emerald-400"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="my-auto text-center py-2">
                    <div className="font-serif text-3xl font-black text-[#1f2d3d] dark:text-amber-100 mb-2">
                      {item.word}
                    </div>

                    {isRevealed ? (
                      <div className="text-emerald-700 dark:text-emerald-300 font-serif text-xl font-bold pt-2 border-t border-slate-100 dark:border-slate-800 animate-fadeIn">
                        {item.meaning}
                      </div>
                    ) : (
                      <div className="text-xs text-slate-400 font-medium py-1.5 px-3 rounded-lg bg-slate-100/80 dark:bg-slate-800/80 inline-block">
                        معنی دیکھنے کیلئے کلک کریں (Tap to reveal)
                      </div>
                    )}
                  </div>

                  <div className="text-[10px] text-center text-slate-400 mt-2">
                    {isRevealed ? 'چھپانے کے لیے کلک کریں' : 'FBISE Class 9 Islamiat'}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* VIEW 3: INTERACTIVE SELF-QUIZ */}
      {viewMode === 'quiz' && currentQuizWord && (
        <div className="max-w-xl mx-auto bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-xl text-center space-y-6">
          <div className="flex items-center justify-between text-xs text-slate-400 pb-3 border-b border-slate-100 dark:border-slate-800">
            <span className="font-bold">
              لفظ: {quizIndex + 1} / {vocabList.length}
            </span>
            <div className="flex items-center gap-3">
              <span className="text-emerald-600 dark:text-emerald-400 font-semibold">یاد ہے: {quizScore.known}</span>
              <span className="text-amber-600 dark:text-amber-400 font-semibold">دوبارہ دیکھنا ہے: {quizScore.review}</span>
            </div>
          </div>

          <div className="py-6 space-y-4">
            <div className="inline-block px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 text-xs font-bold font-mono">
              Word #{currentQuizWord.id}
            </div>
            <div 
              dir="rtl" 
              className="text-5xl font-black text-slate-900 dark:text-amber-100 font-serif py-4"
            >
              {currentQuizWord.word}
            </div>

            {quizRevealed ? (
              <div 
                dir="rtl" 
                className="p-5 rounded-2xl bg-[#f6f1e3]/80 dark:bg-emerald-950/30 border border-[#e6ddc9] dark:border-emerald-800 text-2xl font-bold font-serif text-emerald-900 dark:text-emerald-200 animate-fadeIn"
              >
                {currentQuizWord.meaning}
              </div>
            ) : (
              <button
                onClick={() => setQuizRevealed(true)}
                className="w-full py-4 rounded-2xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold text-sm transition"
              >
                معنی ظاہر کریں (Show Meaning)
              </button>
            )}
          </div>

          {/* Feedback buttons */}
          {quizRevealed && (
            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                onClick={() => handleNextQuiz(false)}
                className="py-3 px-4 rounded-xl border border-amber-300 dark:border-amber-800 text-amber-700 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-950/30 text-xs font-bold transition flex items-center justify-center gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                <span>دوبارہ دہرائیں (Review Again)</span>
              </button>
              <button
                onClick={() => handleNextQuiz(true)}
                className="py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition flex items-center justify-center gap-2 shadow-sm"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>مجھے یاد ہے (Got It!)</span>
              </button>
            </div>
          )}

          <div className="pt-2">
            <button
              onClick={resetQuiz}
              className="text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 underline"
            >
              ٹیسٹ ری سیٹ کریں (Reset Practice)
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
