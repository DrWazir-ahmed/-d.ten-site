import React, { useState } from 'react';
import { Sparkles, CheckCircle2, XCircle, RotateCcw, Download } from 'lucide-react';
import { Badge } from '../common/Badge';

const PRESET_TOPICS = {
  'English Grammar': [
    {
      q: 'Which sentence demonstrates correct use of the semicolon?',
      options: [
        'I have a big test tomorrow; I can’t go out tonight.',
        'I have a big test; because I need to study.',
        'Although it rained; we went to the beach.',
        'She likes apples; and oranges.'
      ],
      correct: 0,
      expl: 'A semicolon correctly links two closely related independent clauses.'
    },
    {
      q: 'Identify the misplaced modifier:',
      options: [
        'Walking into the room, the scent of lavender was noticed by Sarah.',
        'Sarah noticed the scent of lavender as she walked into the room.',
        'While walking into the room, Sarah noticed the scent of lavender.',
        'Upon entering the room, Sarah smelled lavender.'
      ],
      correct: 0,
      expl: 'The scent of lavender wasn’t walking into the room; Sarah was.'
    }
  ],
  'Artificial Intelligence': [
    {
      q: 'What is the role of the Softmax activation function in neural network classification?',
      options: [
        'Converts raw logits into a normalized probability distribution summing to 1',
        'Prevents exploding gradients by clamping negative numbers to zero',
        'Compresses weights into binary 0 or 1 values',
        'Computes the square root of Euclidean distance'
      ],
      correct: 0,
      expl: 'Softmax exponentiates logits and divides by the sum of exponentials to output calibrated probabilities.'
    },
    {
      q: 'What does RLHF stand for in LLM alignment?',
      options: [
        'Reinforcement Learning from Human Feedback',
        'Recurrent Linear Hyperparameter Function',
        'Residual Layering for High Frequency',
        'Randomized Learning with Heuristic Filter'
      ],
      correct: 0,
      expl: 'RLHF uses reward models trained on human preferences to steer model completions.'
    }
  ],
  'Workplace Safety': [
    {
      q: 'In the event of an electrical fire (Class C), which extinguisher is safe to use?',
      options: [
        'Water-based pressurized extinguisher',
        'Dry chemical (ABC) or Carbon Dioxide (CO2)',
        'Class K wet chemical foam',
        'Pressurized air mist'
      ],
      correct: 1,
      expl: 'Water conducts electricity and can electrocute the user. Use non-conductive ABC dry chemical or CO2.'
    }
  ]
};

export const QuizGeneratorTool = () => {
  const [topic, setTopic] = useState('English Grammar');
  const [count, setCount] = useState(2);
  const [generated, setGenerated] = useState(PRESET_TOPICS['English Grammar']);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleGenerate = () => {
    setLoading(true);
    setSubmitted(false);
    setAnswers({});
    setTimeout(() => {
      const questions = PRESET_TOPICS[topic] || PRESET_TOPICS['English Grammar'];
      setGenerated(questions.slice(0, count));
      setLoading(false);
    }, 600);
  };

  const handleSelectAnswer = (qIndex, optionIndex) => {
    if (submitted) return;
    setAnswers({ ...answers, [qIndex]: optionIndex });
  };

  const calculateScore = () => {
    let score = 0;
    generated.forEach((q, idx) => {
      if (answers[idx] === q.correct) score++;
    });
    return score;
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
              <h3 className="font-bold text-slate-900 dark:text-white text-lg">AI Quiz Generator</h3>
              <Badge type="premium" size="xs" />
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">Synthesize customized assessments with rationale breakdowns</p>
          </div>
        </div>
      </div>

      {/* Control row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800">
        <div>
          <label className="text-xs font-semibold text-slate-500 block mb-1">Knowledge Domain</label>
          <select
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm font-semibold"
          >
            {Object.keys(PRESET_TOPICS).map(t => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-xs font-semibold text-slate-500 block mb-1">Number of Questions</label>
          <select
            value={count}
            onChange={(e) => setCount(Number(e.target.value))}
            className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm font-semibold"
          >
            <option value={1}>1 Question (Quick Check)</option>
            <option value={2}>2 Questions (Standard)</option>
          </select>
        </div>

        <div className="flex items-end">
          <button
            onClick={handleGenerate}
            disabled={loading}
            className="w-full py-2 px-4 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold text-sm shadow transition"
          >
            {loading ? 'Synthesizing...' : 'Generate New Quiz'}
          </button>
        </div>
      </div>

      {/* Quiz Body */}
      <div className="space-y-6">
        {generated.map((q, qIdx) => (
          <div key={qIdx} className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30">
            <h4 className="font-bold text-sm text-slate-900 dark:text-white mb-3">
              {qIdx + 1}. {q.q}
            </h4>
            <div className="space-y-2">
              {q.options.map((opt, optIdx) => {
                const isSelected = answers[qIdx] === optIdx;
                const isCorrect = optIdx === q.correct;
                let optStyle = 'border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800';

                if (submitted) {
                  if (isCorrect) optStyle = 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-200';
                  else if (isSelected) optStyle = 'border-rose-500 bg-rose-50 dark:bg-rose-950/40 text-rose-800 dark:text-rose-200';
                } else if (isSelected) {
                  optStyle = 'border-brand-600 bg-brand-50 dark:bg-brand-950/40 text-brand-700 dark:text-brand-300';
                }

                return (
                  <div
                    key={optIdx}
                    onClick={() => handleSelectAnswer(qIdx, optIdx)}
                    className={`p-3 rounded-lg border text-xs font-medium cursor-pointer transition flex items-center justify-between ${optStyle}`}
                  >
                    <span>{opt}</span>
                    {submitted && isCorrect && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
                    {submitted && isSelected && !isCorrect && <XCircle className="w-4 h-4 text-rose-600" />}
                  </div>
                );
              })}
            </div>

            {submitted && (
              <div className="mt-3 p-3 rounded-lg bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/40 text-xs text-amber-900 dark:text-amber-200">
                <strong>Explanation:</strong> {q.expl}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Action / Result footer */}
      <div className="mt-6 flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-200 dark:border-slate-800">
        {!submitted ? (
          <button
            onClick={() => setSubmitted(true)}
            disabled={Object.keys(answers).length === 0}
            className="px-6 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 disabled:opacity-50 text-white font-bold text-sm shadow transition"
          >
            Submit Answers & Grade
          </button>
        ) : (
          <div className="flex items-center gap-4">
            <div className="text-sm font-bold text-slate-800 dark:text-white">
              Score: <span className="text-emerald-600 dark:text-emerald-400 font-black">{calculateScore()}</span> / {generated.length}
            </div>
            <button
              onClick={() => { setSubmitted(false); setAnswers({}); }}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 text-xs font-semibold"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Retry Quiz
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
