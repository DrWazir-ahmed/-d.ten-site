import React, { useState } from 'react';
import { Sparkles, CheckCircle2, Copy, Check, Printer } from 'lucide-react';
import { Badge } from '../common/Badge';

export const McqGeneratorTool = () => {
  const [topic, setTopic] = useState('Algebra & Mathematics');
  const [difficulty, setDifficulty] = useState('Medium');
  const [copied, setCopied] = useState(false);

  const samples = {
    'Algebra & Mathematics': [
      {
        q: 'If 2^(2x + 1) = 32, what is the value of x?',
        options: ['A) 1', 'B) 2', 'C) 3', 'D) 4'],
        answer: 'B) 2',
        solution: 'Since 32 = 2^5, we equate exponents: 2x + 1 = 5 => 2x = 4 => x = 2.'
      },
      {
        q: 'Find the vertex of the parabola defined by f(x) = x² - 6x + 14.',
        options: ['A) (3, 5)', 'B) (-3, 5)', 'C) (3, -5)', 'D) (6, 14)'],
        answer: 'A) (3, 5)',
        solution: 'x = -b / (2a) = 6 / 2 = 3. f(3) = 9 - 18 + 14 = 5. Therefore the vertex is (3, 5).'
      }
    ],
    'Technical Writing': [
      {
        q: 'Which characteristic is paramount in API error responses for developer documentation?',
        options: [
          'A) Poetic narrative prose',
          'B) Actionable error codes, clear root causes, and corrective remedy links',
          'C) Obfuscation of internal system names',
          'D) Pure hexadecimal memory offsets without human text'
        ],
        answer: 'B) Actionable error codes, clear root causes, and corrective remedy links',
        solution: 'Developers need explicit reasons for client or server failure and exact steps to resolve them.'
      }
    ]
  };

  const currentQuestions = samples[topic] || samples['Algebra & Mathematics'];

  const copyToClipboard = () => {
    const text = currentQuestions.map((item, idx) => 
      `Question ${idx + 1}: ${item.q}\n` +
      item.options.join('\n') +
      `\nCorrect Answer: ${item.answer}\nSolution: ${item.solution}\n\n`
    ).join('-------------------------\n');

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-amber-500/30 p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center font-bold">
            <Sparkles className="w-5 h-5 fill-amber-500" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-slate-900 dark:text-white text-lg">MCQ Generator & Print Studio</h3>
              <Badge type="premium" size="xs" />
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">Generate printable 4-option MCQs with full answer keys</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={copyToClipboard}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 text-xs font-semibold"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? 'Copied' : 'Copy All'}
          </button>
          <button
            onClick={() => window.print()}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 text-xs font-semibold"
          >
            <Printer className="w-3.5 h-3.5" /> Print
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800">
        <div>
          <label className="text-xs font-semibold text-slate-500 block mb-1">Subject Area</label>
          <select
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm font-semibold"
          >
            <option value="Algebra & Mathematics">Algebra & Mathematics</option>
            <option value="Technical Writing">Technical Writing</option>
          </select>
        </div>

        <div>
          <label className="text-xs font-semibold text-slate-500 block mb-1">Difficulty Tier</label>
          <select
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
            className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm font-semibold"
          >
            <option value="Standard">Standard</option>
            <option value="Medium">Medium (Conceptual)</option>
            <option value="Challenging">Challenging (Olympiad/Cert)</option>
          </select>
        </div>
      </div>

      <div className="space-y-4">
        {currentQuestions.map((item, idx) => (
          <div key={idx} className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
            <div className="font-bold text-sm text-slate-900 dark:text-white mb-2">
              Q{idx + 1}: {item.q}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-3">
              {item.options.map((opt, oIdx) => (
                <div key={oIdx} className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 text-xs font-medium border border-slate-200/80 dark:border-slate-700">
                  {opt}
                </div>
              ))}
            </div>
            <div className="p-3 rounded-lg bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/40 text-xs text-emerald-900 dark:text-emerald-200 space-y-1">
              <div><strong className="font-bold">Correct Key:</strong> {item.answer}</div>
              <div><strong className="font-bold">Rationale:</strong> {item.solution}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
