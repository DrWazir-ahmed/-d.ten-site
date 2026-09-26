import React, { useState } from 'react';
import { FileText, Copy, Check } from 'lucide-react';

export const WordCounter = () => {
  const [text, setText] = useState("D.TEN Academy provides modern educational resources, interactive learning tools, and comprehensive curriculum materials designed to empower learners worldwide.");
  const [copied, setCopied] = useState(false);

  const trimmed = text.trim();
  const words = trimmed ? trimmed.split(/\s+/).length : 0;
  const chars = text.length;
  const charsNoSpaces = text.replace(/\s+/g, '').length;
  const sentences = trimmed ? (text.match(/[^.!?]+[.!?]+/g) || [text]).length : 0;
  const paragraphs = trimmed ? text.split(/\n+/).filter(Boolean).length : 0;
  
  // Reading time (~200 wpm) & Speaking time (~130 wpm)
  const readingTimeMin = (words / 200).toFixed(1);
  const speakingTimeMin = (words / 130).toFixed(1);

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-teal-500/10 text-teal-600 dark:text-teal-400 flex items-center justify-center font-bold">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 dark:text-white text-lg">Real-Time Word Counter</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">Words, characters, readability & speaking duration</p>
          </div>
        </div>

        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 transition"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
          {copied ? 'Copied' : 'Copy Text'}
        </button>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
        <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 text-center">
          <div className="text-2xl font-black text-brand-600 dark:text-brand-400">{words}</div>
          <div className="text-xs font-medium text-slate-500">Words</div>
        </div>
        <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 text-center">
          <div className="text-2xl font-black text-slate-900 dark:text-white">{chars}</div>
          <div className="text-xs font-medium text-slate-500">Characters</div>
        </div>
        <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 text-center">
          <div className="text-2xl font-black text-purple">{sentences}</div>
          <div className="text-xs font-medium text-slate-500">Sentences</div>
        </div>
        <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 text-center">
          <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400">{readingTimeMin}m</div>
          <div className="text-xs font-medium text-slate-500">Reading Time</div>
        </div>
      </div>

      <textarea
        rows={6}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Paste or type your text here to analyze..."
        className="w-full p-4 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-brand-500 focus:outline-none"
      />

      <div className="mt-3 flex flex-wrap gap-4 text-xs text-slate-500 dark:text-slate-400">
        <span>Characters (no spaces): <strong className="text-slate-700 dark:text-slate-300">{charsNoSpaces}</strong></span>
        <span>Paragraphs: <strong className="text-slate-700 dark:text-slate-300">{paragraphs}</strong></span>
        <span>Speaking Time: <strong className="text-slate-700 dark:text-slate-300">~{speakingTimeMin} mins</strong></span>
      </div>
    </div>
  );
};
