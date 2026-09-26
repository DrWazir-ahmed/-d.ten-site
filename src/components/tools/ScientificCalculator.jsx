import React, { useState } from 'react';
import { Calculator, Delete } from 'lucide-react';

export const ScientificCalculator = () => {
  const [display, setDisplay] = useState('0');
  const [memory, setMemory] = useState(0);

  const handleInput = (val) => {
    setDisplay(prev => {
      if (prev === '0' || prev === 'Error') return val;
      return prev + val;
    });
  };

  const handleClear = () => setDisplay('0');

  const handleDelete = () => {
    setDisplay(prev => {
      if (prev.length <= 1 || prev === 'Error') return '0';
      return prev.slice(0, -1);
    });
  };

  const handleScientific = (op) => {
    try {
      const val = parseFloat(display) || 0;
      let res;
      switch (op) {
        case 'sin': res = Math.sin((val * Math.PI) / 180); break;
        case 'cos': res = Math.cos((val * Math.PI) / 180); break;
        case 'tan': res = Math.tan((val * Math.PI) / 180); break;
        case 'sqrt': res = Math.sqrt(val); break;
        case 'sq': res = Math.pow(val, 2); break;
        case 'log': res = Math.log10(val); break;
        case 'ln': res = Math.log(val); break;
        case 'inv': res = 1 / val; break;
        default: return;
      }
      setDisplay(Number.isFinite(res) ? String(parseFloat(res.toFixed(8))) : 'Error');
    } catch {
      setDisplay('Error');
    }
  };

  const handleCalculate = () => {
    try {
      // Safe sanitized eval for basic arithmetic
      const sanitized = display.replace(/×/g, '*').replace(/÷/g, '/');
      if (!/^[0-9+\-*/().\s]+$/.test(sanitized)) {
        setDisplay('Error');
        return;
      }
      // eslint-disable-next-line no-eval
      const result = Function(`'use strict'; return (${sanitized})`)();
      setDisplay(String(parseFloat(result.toFixed(8))));
    } catch {
      setDisplay('Error');
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm max-w-md mx-auto">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold">
          <Calculator className="w-5 h-5" />
        </div>
        <div>
          <h3 className="font-bold text-slate-900 dark:text-white text-lg">Scientific Calculator</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">Trigonometry, roots, powers & algebra</p>
        </div>
      </div>

      {/* Screen */}
      <div className="p-4 mb-4 rounded-xl bg-slate-900 text-right text-white font-mono text-2xl tracking-wider overflow-x-auto select-all shadow-inner border border-slate-800">
        {display}
      </div>

      {/* Buttons Grid */}
      <div className="grid grid-cols-5 gap-2 text-xs font-semibold">
        {/* Sci row 1 */}
        <button onClick={() => handleScientific('sin')} className="p-2.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700">sin</button>
        <button onClick={() => handleScientific('cos')} className="p-2.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700">cos</button>
        <button onClick={() => handleScientific('tan')} className="p-2.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700">tan</button>
        <button onClick={handleClear} className="p-2.5 rounded-lg bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 hover:bg-rose-100">C</button>
        <button onClick={handleDelete} className="p-2.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 flex items-center justify-center"><Delete className="w-4 h-4" /></button>

        {/* Sci row 2 */}
        <button onClick={() => handleScientific('sqrt')} className="p-2.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200">√x</button>
        <button onClick={() => handleScientific('sq')} className="p-2.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200">x²</button>
        <button onClick={() => handleInput('(')} className="p-2.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200">(</button>
        <button onClick={() => handleInput(')')} className="p-2.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200">)</button>
        <button onClick={() => handleInput('÷')} className="p-2.5 rounded-lg bg-brand-50 dark:bg-brand-950/40 text-brand-600 font-bold hover:bg-brand-100">÷</button>

        {/* Numpad row 1 */}
        <button onClick={() => handleScientific('log')} className="p-2.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200">log</button>
        <button onClick={() => handleInput('7')} className="p-3 rounded-lg bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-sm hover:bg-slate-50">7</button>
        <button onClick={() => handleInput('8')} className="p-3 rounded-lg bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-sm hover:bg-slate-50">8</button>
        <button onClick={() => handleInput('9')} className="p-3 rounded-lg bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-sm hover:bg-slate-50">9</button>
        <button onClick={() => handleInput('×')} className="p-2.5 rounded-lg bg-brand-50 dark:bg-brand-950/40 text-brand-600 font-bold hover:bg-brand-100">×</button>

        {/* Numpad row 2 */}
        <button onClick={() => handleScientific('ln')} className="p-2.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200">ln</button>
        <button onClick={() => handleInput('4')} className="p-3 rounded-lg bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-sm hover:bg-slate-50">4</button>
        <button onClick={() => handleInput('5')} className="p-3 rounded-lg bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-sm hover:bg-slate-50">5</button>
        <button onClick={() => handleInput('6')} className="p-3 rounded-lg bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-sm hover:bg-slate-50">6</button>
        <button onClick={() => handleInput('-')} className="p-2.5 rounded-lg bg-brand-50 dark:bg-brand-950/40 text-brand-600 font-bold hover:bg-brand-100">-</button>

        {/* Numpad row 3 */}
        <button onClick={() => handleScientific('inv')} className="p-2.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200">1/x</button>
        <button onClick={() => handleInput('1')} className="p-3 rounded-lg bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-sm hover:bg-slate-50">1</button>
        <button onClick={() => handleInput('2')} className="p-3 rounded-lg bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-sm hover:bg-slate-50">2</button>
        <button onClick={() => handleInput('3')} className="p-3 rounded-lg bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-sm hover:bg-slate-50">3</button>
        <button onClick={() => handleInput('+')} className="p-2.5 rounded-lg bg-brand-50 dark:bg-brand-950/40 text-brand-600 font-bold hover:bg-brand-100">+</button>

        {/* Bottom row */}
        <button onClick={() => handleInput('3.14159')} className="p-2.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200">π</button>
        <button onClick={() => handleInput('0')} className="p-3 rounded-lg bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-sm hover:bg-slate-50">0</button>
        <button onClick={() => handleInput('.')} className="p-3 rounded-lg bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-sm hover:bg-slate-50">.</button>
        <button onClick={handleCalculate} className="col-span-2 p-3 rounded-lg bg-brand-600 hover:bg-brand-700 text-white font-bold text-base shadow-sm">=</button>
      </div>
    </div>
  );
};
