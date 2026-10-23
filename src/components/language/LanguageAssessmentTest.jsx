import React, { useState, useEffect, useMemo } from 'react';
import { 
  Award, 
  CheckCircle2, 
  XCircle, 
  RotateCcw, 
  ArrowRight, 
  Volume2, 
  Sparkles, 
  Trophy, 
  HelpCircle,
  BookOpen,
  ArrowLeft,
  Share2,
  Printer
} from 'lucide-react';

export const LanguageAssessmentTest = ({
  nativeLang,
  targetLang,
  dataset,
  onExitTest,
  speakText
}) => {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [testComplete, setTestComplete] = useState(false);
  const [answersHistory, setAnswersHistory] = useState([]);

  // Generate 15 diverse questions whenever test initializes
  useEffect(() => {
    if (!dataset) return;
    const vocabPool = dataset.vocabulary || [];
    const sentencePool = dataset.sentences || [];

    // Shuffle helper
    const shuffle = (arr) => [...arr].sort(() => Math.random() - 0.5);

    // Pick 9 vocabulary items and 6 conversational sentences
    const pickedVocab = shuffle(vocabPool).slice(0, 9);
    const pickedSentences = shuffle(sentencePool).slice(0, 6);
    const combined = shuffle([...pickedVocab, ...pickedSentences]);

    const generated = combined.map((item, qIdx) => {
      const isReverse = qIdx % 3 === 0; // Every 3rd question: target to native
      const promptLang = isReverse ? targetLang : nativeLang;
      const answerLang = isReverse ? nativeLang : targetLang;

      const correctAnswerText = item.translations[answerLang.code]?.text || '';
      const promptText = item.translations[promptLang.code]?.text || '';
      const promptPron = item.translations[promptLang.code]?.pronunciation || '';
      const targetPron = item.translations[targetLang.code]?.pronunciation || '';

      // Create distractors from other items in the same pool
      const pool = item.id <= 500 && vocabPool.includes(item) ? vocabPool : sentencePool;
      const potentialDistractors = pool.filter(x => x.id !== item.id);
      const chosenDistractors = shuffle(potentialDistractors).slice(0, 3).map(d => {
        return d.translations[answerLang.code]?.text || 'Option';
      });

      const options = shuffle([correctAnswerText, ...chosenDistractors]);

      return {
        id: item.id,
        category: item.category,
        isReverse,
        promptLang,
        answerLang,
        promptText,
        promptPron,
        targetPron,
        correctAnswerText,
        options,
        originalItem: item
      };
    });

    setQuestions(generated);
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setTestComplete(false);
    setAnswersHistory([]);
  }, [dataset, nativeLang, targetLang]);

  const currentQ = questions[currentIndex];

  const handleSelectOption = (opt) => {
    if (isAnswered) return;
    setSelectedOption(opt);
    setIsAnswered(true);

    const isCorrect = opt === currentQ.correctAnswerText;
    if (isCorrect) {
      setScore(prev => prev + 1);
    }

    setAnswersHistory(prev => [
      ...prev,
      {
        question: currentQ.promptText,
        selected: opt,
        correct: currentQ.correctAnswerText,
        isCorrect
      }
    ]);
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setTestComplete(true);
    }
  };

  const handleRestart = () => {
    // Regenerate
    window.location.hash = ''; // clear if any
    setTestComplete(false);
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setAnswersHistory([]);
    // re-trigger effect by shallow copy
    setQuestions(prev => [...prev].sort(() => Math.random() - 0.5));
  };

  if (!questions || questions.length === 0) {
    return (
      <div className="py-16 text-center">
        <div className="w-10 h-10 border-4 border-brand-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-slate-500 text-sm">Preparing Language Mastery Test...</p>
      </div>
    );
  }

  // TEST COMPLETE SCREEN
  if (testComplete) {
    const percentage = Math.round((score / questions.length) * 100);
    let title = "Proficiency Certificate";
    let badge = "Polyglot Apprentice";
    let badgeColor = "from-amber-500 to-orange-500";

    if (percentage >= 90) {
      title = "Master Polyglot Certification";
      badge = "Distinguished Fluency (A+)";
      badgeColor = "from-emerald-500 to-teal-600";
    } else if (percentage >= 75) {
      title = "Advanced Speaker Certificate";
      badge = "High Competence (Grade A)";
      badgeColor = "from-blue-500 to-indigo-600";
    } else if (percentage >= 50) {
      title = "Intermediate Certificate";
      badge = "Good Working Knowledge";
      badgeColor = "from-purple-500 to-indigo-600";
    }

    return (
      <div className="max-w-2xl mx-auto space-y-6 animate-fadeIn">
        {/* Certificate Card */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 border-2 border-brand-500/40 p-8 text-white shadow-2xl text-center space-y-6">
          <div className="absolute top-0 right-0 w-72 h-72 bg-brand-500/10 rounded-full blur-3xl pointer-events-none" />

          {/* Icon Badge */}
          <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-brand-600 to-emerald-400 p-0.5 mx-auto shadow-lg shadow-brand-500/20">
            <div className="w-full h-full bg-slate-900 rounded-[22px] flex items-center justify-center">
              <Trophy className="w-10 h-10 text-amber-400 animate-bounce" />
            </div>
          </div>

          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-white/10 text-brand-300 border border-white/20">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              Official Assessment Result
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
              {title}
            </h3>
            <p className="text-sm text-slate-300">
              Assessment for {nativeLang.name} {nativeLang.flag} to {targetLang.name} {targetLang.flag}
            </p>
          </div>

          {/* Score Display */}
          <div className="py-4 px-6 rounded-2xl bg-white/5 border border-white/10 max-w-sm mx-auto flex items-center justify-around">
            <div>
              <div className="text-3xl font-black text-emerald-400">{score} / {questions.length}</div>
              <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Correct Answers</div>
            </div>
            <div className="w-px h-10 bg-slate-700" />
            <div>
              <div className="text-3xl font-black text-brand-400">{percentage}%</div>
              <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Accuracy Score</div>
            </div>
          </div>

          {/* Badge */}
          <div className="inline-block px-4 py-1.5 rounded-full text-sm font-bold bg-gradient-to-r from-brand-500 to-emerald-500 text-white shadow-md">
            ★ {badge} ★
          </div>

          <p className="text-xs text-slate-400 max-w-md mx-auto leading-relaxed">
            You demonstrated impressive command over authentic vocabulary, conversational phrasing, and sentence meanings. Keep practicing to maintain fluency!
          </p>

          {/* Action Buttons */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={handleRestart}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm transition-all border border-white/20"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Retake Test</span>
            </button>
            <button
              onClick={onExitTest}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-bold text-sm shadow-lg shadow-brand-600/30 transition-all"
            >
              <BookOpen className="w-4 h-4" />
              <span>Back to Course</span>
            </button>
          </div>
        </div>

        {/* Answers Review */}
        <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 space-y-4">
          <h4 className="text-sm font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
            Questions Review ({answersHistory.length})
          </h4>
          <div className="space-y-2.5 max-h-80 overflow-y-auto pr-1">
            {answersHistory.map((ans, aIdx) => (
              <div 
                key={`ans-${aIdx}`}
                className={`p-3 rounded-xl border text-xs flex items-start gap-3 ${
                  ans.isCorrect 
                    ? 'bg-emerald-50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800 text-slate-800 dark:text-slate-200' 
                    : 'bg-rose-50 dark:bg-rose-950/20 border-rose-200 dark:border-rose-800 text-slate-800 dark:text-slate-200'
                }`}
              >
                <div className="flex-shrink-0 mt-0.5">
                  {ans.isCorrect ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  ) : (
                    <XCircle className="w-4 h-4 text-rose-600 dark:text-rose-400" />
                  )}
                </div>
                <div className="flex-1 space-y-1">
                  <div className="font-semibold">{aIdx + 1}. {ans.question}</div>
                  <div className="flex flex-wrap items-center gap-2 text-[11px]">
                    <span>Your answer: <strong className={ans.isCorrect ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}>{ans.selected}</strong></span>
                    {!ans.isCorrect && (
                      <span className="text-slate-500">Correct: <strong className="text-emerald-600 dark:text-emerald-400">{ans.correct}</strong></span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // IN-PROGRESS QUESTION VIEW
  const isUrduOrArabicPrompt = currentQ.promptLang.code === 'ur' || currentQ.promptLang.code === 'ar';
  const isUrduOrArabicTarget = currentQ.answerLang.code === 'ur' || currentQ.answerLang.code === 'ar';

  return (
    <div className="max-w-2xl mx-auto space-y-6 animate-fadeIn">
      {/* Top Header Bar */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
        <button
          onClick={onExitTest}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Exit Test</span>
        </button>

        {/* Progress & Score */}
        <div className="flex items-center gap-3">
          <div className="px-3 py-1 rounded-full bg-brand-50 dark:bg-brand-950/60 border border-brand-200 dark:border-brand-800 text-xs font-bold text-brand-700 dark:text-brand-300">
            Question {currentIndex + 1} of {questions.length}
          </div>
          <div className="px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-xs font-bold text-emerald-700 dark:text-emerald-300">
            Score: {score}
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-slate-200 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
        <div 
          className="bg-gradient-to-r from-brand-600 to-emerald-500 h-full rounded-full transition-all duration-300"
          style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
        />
      </div>

      {/* Question Card */}
      <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm space-y-6">
        
        {/* Category & Mode Badge */}
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
            {currentQ.category}
          </span>
          <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
            {currentQ.isReverse ? `Translate to ${nativeLang.name}` : `Translate to ${targetLang.name}`}
          </span>
        </div>

        {/* Prompt Question */}
        <div className="text-center space-y-3 py-4">
          <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
            Select the correct translation:
          </p>

          <div className="flex items-center justify-center gap-3">
            <h3 
              dir={currentQ.promptLang.dir}
              className={`text-2xl sm:text-3xl font-black text-slate-900 dark:text-white ${
                isUrduOrArabicPrompt ? 'font-urdu leading-[2.2]' : ''
              }`}
            >
              {currentQ.promptText}
            </h3>
            
            <button
              onClick={() => speakText(currentQ.promptText, currentQ.promptLang, `q-${currentQ.id}`)}
              className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition-colors"
              title="Listen pronunciation"
            >
              <Volume2 className="w-5 h-5" />
            </button>
          </div>

          {currentQ.promptPron && (
            <p className="text-xs font-mono text-slate-400">
              /{currentQ.promptPron}/
            </p>
          )}
        </div>

        {/* 4 Options Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {currentQ.options.map((option, oIdx) => {
            const isSelected = selectedOption === option;
            const isCorrect = option === currentQ.correctAnswerText;

            let btnStyle = "bg-slate-50 hover:bg-slate-100 dark:bg-slate-800/80 dark:hover:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100";
            
            if (isAnswered) {
              if (isCorrect) {
                btnStyle = "bg-emerald-500 text-white border-emerald-600 shadow-lg shadow-emerald-500/20";
              } else if (isSelected && !isCorrect) {
                btnStyle = "bg-rose-500 text-white border-rose-600 shadow-lg shadow-rose-500/20";
              } else {
                btnStyle = "opacity-40 bg-slate-100 dark:bg-slate-800/50 border-slate-200 dark:border-slate-800 text-slate-500";
              }
            }

            return (
              <button
                key={`opt-${oIdx}`}
                disabled={isAnswered}
                onClick={() => handleSelectOption(option)}
                dir={currentQ.answerLang.dir}
                className={`p-4 rounded-2xl border-2 text-left font-bold text-sm sm:text-base transition-all flex items-center justify-between gap-3 ${btnStyle} ${
                  isUrduOrArabicTarget ? 'font-urdu leading-[2.0]' : ''
                }`}
              >
                <span>{option}</span>
                {isAnswered && isCorrect && (
                  <CheckCircle2 className="w-5 h-5 text-white flex-shrink-0" />
                )}
                {isAnswered && isSelected && !isCorrect && (
                  <XCircle className="w-5 h-5 text-white flex-shrink-0" />
                )}
              </button>
            );
          })}
        </div>

        {/* Feedback & Continue */}
        {isAnswered && (
          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 animate-fadeIn">
            <div className="text-sm font-semibold">
              {selectedOption === currentQ.correctAnswerText ? (
                <span className="text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5 font-bold">
                  <CheckCircle2 className="w-4 h-4" /> Correct Answer! Great job!
                </span>
              ) : (
                <span className="text-rose-600 dark:text-rose-400 flex items-center gap-1.5 font-bold">
                  <XCircle className="w-4 h-4" /> Correct answer is: <strong>{currentQ.correctAnswerText}</strong>
                </span>
              )}
            </div>

            <button
              onClick={handleNext}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-bold text-sm shadow-md transition-all active:scale-95"
            >
              <span>{currentIndex < questions.length - 1 ? 'Next Question' : 'View Results'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
