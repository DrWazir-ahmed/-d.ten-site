import React, { useState } from 'react';
import { ArrowRightLeft } from 'lucide-react';

const CONVERSIONS = {
  length: {
    name: 'Length',
    units: {
      meters: 1,
      kilometers: 0.001,
      centimeters: 100,
      millimeters: 1000,
      miles: 0.000621371,
      yards: 1.09361,
      feet: 3.28084,
      inches: 39.3701
    }
  },
  mass: {
    name: 'Mass & Weight',
    units: {
      kilograms: 1,
      grams: 1000,
      milligrams: 1000000,
      pounds: 2.20462,
      ounces: 35.274
    }
  },
  data: {
    name: 'Digital Storage',
    units: {
      megabytes: 1,
      gigabytes: 0.001,
      terabytes: 0.000001,
      kilobytes: 1000,
      bytes: 1000000
    }
  }
};

export const UnitConverter = () => {
  const [category, setCategory] = useState('length');
  const [val, setVal] = useState(10);
  const [fromUnit, setFromUnit] = useState('meters');
  const [toUnit, setToUnit] = useState('feet');

  const catData = CONVERSIONS[category];
  const units = Object.keys(catData.units);

  const calculateResult = () => {
    const num = parseFloat(val) || 0;
    const baseValue = num / catData.units[fromUnit];
    const converted = baseValue * catData.units[toUnit];
    return parseFloat(converted.toFixed(6));
  };

  const handleCategoryChange = (newCat) => {
    setCategory(newCat);
    const newUnits = Object.keys(CONVERSIONS[newCat].units);
    setFromUnit(newUnits[0]);
    setToUnit(newUnits[1]);
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold">
          <ArrowRightLeft className="w-5 h-5" />
        </div>
        <div>
          <h3 className="font-bold text-slate-900 dark:text-white text-lg">Unit Converter</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">Convert length, weight, and digital units</p>
        </div>
      </div>

      {/* Category selector */}
      <div className="flex gap-2 mb-6 border-b border-slate-200 dark:border-slate-800 pb-3">
        {Object.entries(CONVERSIONS).map(([key, data]) => (
          <button
            key={key}
            onClick={() => handleCategoryChange(key)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              category === key 
                ? 'bg-brand-600 text-white shadow-sm' 
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            {data.name}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center mb-6">
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800">
          <label className="text-xs text-slate-400 block mb-1">From Value</label>
          <input
            type="number"
            value={val}
            onChange={(e) => setVal(e.target.value)}
            className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-base font-bold mb-3"
          />
          <select
            value={fromUnit}
            onChange={(e) => setFromUnit(e.target.value)}
            className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm font-medium capitalize"
          >
            {units.map(u => (
              <option key={u} value={u}>{u}</option>
            ))}
          </select>
        </div>

        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800">
          <label className="text-xs text-slate-400 block mb-1">Converted Result</label>
          <div className="w-full px-3 py-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xl font-black mb-3">
            {calculateResult().toLocaleString()}
          </div>
          <select
            value={toUnit}
            onChange={(e) => setToUnit(e.target.value)}
            className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm font-medium capitalize"
          >
            {units.map(u => (
              <option key={u} value={u}>{u}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};
