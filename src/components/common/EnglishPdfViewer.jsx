import React, { useState, useMemo } from 'react';
import { 
  Printer, 
  Download, 
  Search, 
  Volume2, 
  Copy, 
  Check, 
  FileText, 
  Sparkles,
  Layers,
  Calendar,
  ExternalLink
} from 'lucide-react';
import { 
  ACTIVE_PASSIVE_CHRONOLOGICAL, 
  ACTIVE_PASSIVE_TYPEWISE 
} from '../../data/activePassivePdfData';
import { 
  TENSES_CHRONOLOGICAL, 
  TENSES_TYPEWISE 
} from '../../data/tensesPdfData';

export const EnglishPdfViewer = ({ pdfType = 'active-passive', onPrint }) => {
  const [activePage, setActivePage] = useState('both'); // 'page1' | 'page2' | 'both'
  const [searchTerm, setSearchTerm] = useState('');
  const [copiedText, setCopiedText] = useState(null);

  const isActivePassive = pdfType === 'active-passive';

  // Speech helper
  const speakEnglish = (text) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard?.writeText(text);
    setCopiedText(text);
    setTimeout(() => setCopiedText(null), 1500);
  };

  // Filter chronological data
  const filteredChronological = useMemo(() => {
    const list = isActivePassive ? ACTIVE_PASSIVE_CHRONOLOGICAL : TENSES_CHRONOLOGICAL;
    if (!searchTerm.trim()) return list;
    const term = searchTerm.toLowerCase();
    return list.filter(item => {
      const tenseMatch = item.tense.toLowerCase().includes(term);
      const textMatch = isActivePassive 
        ? (item.active.toLowerCase().includes(term) || item.passive.toLowerCase().includes(term))
        : (item.english.toLowerCase().includes(term) || (item.urdu && item.urdu.includes(term)));
      return tenseMatch || textMatch;
    });
  }, [isActivePassive, searchTerm]);

  // Download Standalone Offline HTML File
  const handleDownloadOfflineHTML = () => {
    const title = isActivePassive 
      ? 'Active/Passive Voice Examplified' 
      : 'Tenses Examplified — English to Urdu';
    
    const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>${title} | D.TEN Academy</title>
<style>
  @import url('https://fonts.googleapis.com/css2?family=Noto+Nastaliq+Urdu:wght@400;700&display=swap');
  @page { size: A4 portrait; margin: 12mm; }
  * { box-sizing: border-box; }
  body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif; margin: 0; padding: 20px; background: #fff; color: #111; }
  .page { max-width: 840px; margin: 0 auto 30px auto; page-break-after: always; }
  .header { display: flex; align-items: center; justify-content: space-between; border-bottom: 2px solid #111; padding-bottom: 8px; margin-bottom: 12px; }
  .logo { width: 50px; height: 50px; object-fit: contain; }
  .title-wrap { text-align: center; flex: 1; }
  h1 { font-size: 20px; margin: 0 0 4px 0; font-weight: 800; }
  .meta-sub { font-size: 13px; font-weight: 600; color: #333; }
  table { width: 100%; border-collapse: collapse; font-size: 12px; margin-top: 10px; }
  th, td { border: 1px solid #333; padding: 5px 8px; vertical-align: middle; }
  th.sec-head { background: #ffe600; font-weight: 800; font-size: 13px; text-align: left; }
  .urdu { font-family: 'Noto Nastaliq Urdu', serif; direction: rtl; text-align: right; font-size: 13px; }
  .footer { display: flex; justify-content: space-between; font-size: 11px; color: #555; margin-top: 12px; padding-top: 6px; border-top: 1px solid #ccc; }
  @media print { body { padding: 0; } }
</style>
</head>
<body>
  <div class="page">
    <div class="header">
      <img src="https://dten.deesu.org/logo.png" class="logo" alt="D.TEN" />
      <div class="title-wrap">
        <h1>${title}</h1>
        ${isActivePassive ? '<div class="meta-sub">Subject: <u>Ali</u> &nbsp;&nbsp; Verb: <u>Help</u> &nbsp;&nbsp; Object: <u>Them</u></div>' : ''}
      </div>
      <img src="https://dten.deesu.org/logo.png" class="logo" alt="D.TEN" />
    </div>
    <table>
      <thead>
        <tr style="background:#ffe600;">
          <th style="width:34%; text-align:left;">Tense Type</th>
          <th style="width:33%; text-align:left;">${isActivePassive ? 'Active Voice' : 'English'}</th>
          <th style="width:33%; text-align:${isActivePassive ? 'left' : 'right'};">${isActivePassive ? 'Passive Voice' : 'Urdu'}</th>
        </tr>
      </thead>
      <tbody>
        ${(isActivePassive ? ACTIVE_PASSIVE_CHRONOLOGICAL : TENSES_CHRONOLOGICAL).map(r => `
          <tr>
            <td><strong>${r.tense}</strong></td>
            <td>${isActivePassive ? r.active : r.english}</td>
            <td class="${isActivePassive ? '' : 'urdu'}">${isActivePassive ? r.passive : r.urdu}</td>
          </tr>
        `).join('')}
      </tbody>
    </table>
    <div class="footer">
      <span>By Dr Wazir Ahmed Deesu</span>
      <span>www.deesu.org/dten</span>
    </div>
  </div>
</body>
</html>`;

    const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${isActivePassive ? 'Active_Passive_Voice_Examplified' : 'Tenses_Examplified'}_D.TEN.html`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Controls Bar */}
      <div className="no-print bg-white dark:bg-slate-900 rounded-2xl p-4 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
        <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
          
          {/* Search Box */}
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder={isActivePassive ? "Filter tenses or voice rules (e.g. 'Continuous', 'helped')..." : "Filter tenses, sentences, or Urdu (e.g. 'Past', 'خط')..."}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            {searchTerm && (
              <button 
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600"
              >
                Clear
              </button>
            )}
          </div>

          {/* Page Tabs */}
          <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
            <button
              onClick={() => setActivePage('both')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                activePage === 'both'
                  ? 'bg-white dark:bg-slate-900 text-emerald-600 dark:text-emerald-400 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              All Pages (1 & 2)
            </button>
            <button
              onClick={() => setActivePage('page1')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                activePage === 'page1'
                  ? 'bg-white dark:bg-slate-900 text-emerald-600 dark:text-emerald-400 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              Page 1: Chronological
            </button>
            <button
              onClick={() => setActivePage('page2')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                activePage === 'page2'
                  ? 'bg-white dark:bg-slate-900 text-emerald-600 dark:text-emerald-400 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              Page 2: Type-Wise
            </button>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleDownloadOfflineHTML}
              className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold transition flex items-center gap-1.5"
              title="Download offline HTML chart"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Offline HTML</span>
            </button>

            <button
              onClick={() => onPrint ? onPrint() : window.print()}
              className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition flex items-center gap-1.5 shadow-sm"
              title="Print official A4 PDF layout"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save PDF</span>
            </button>
          </div>
        </div>
      </div>

      {/* DOCUMENT WRAPPER (A4 SHEET STYLING) */}
      <div className="space-y-8 print:space-y-0">
        
        {/* ================= PAGE 1: CHRONOLOGICAL ================= */}
        {(activePage === 'both' || activePage === 'page1') && (
          <div className="relative bg-white text-slate-900 rounded-3xl border border-slate-300 shadow-xl p-6 sm:p-8 max-w-4xl mx-auto print:max-w-none print:shadow-none print:border-0 print:p-0 print:m-0 print:rounded-none page-break-after">
            
            {/* Watermark */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.035] select-none rotate-[-25deg]">
              <span className="text-6xl sm:text-8xl font-black text-slate-900 uppercase tracking-widest whitespace-nowrap">
                D.TEN Education Network
              </span>
            </div>

            {/* Document Header */}
            <div className="relative z-10 border-b-2 border-slate-900 pb-3 mb-4">
              <div className="flex items-center justify-between">
                <img src="/logo.png" alt="D.TEN Logo" className="w-12 h-12 object-contain" />
                <div className="text-center px-2">
                  <h1 className="text-lg sm:text-2xl font-black text-slate-900 tracking-tight font-serif">
                    {isActivePassive ? 'Active/Passive Voice Examplified' : 'Tenses Examplified'}
                    <span className="text-xs sm:text-sm font-normal text-slate-500 block">
                      (A4 Page size Printable)
                    </span>
                  </h1>
                  {isActivePassive && (
                    <div className="mt-1 text-xs sm:text-sm font-semibold text-slate-700 flex flex-wrap justify-center gap-4">
                      <span>Subject: <strong className="underline decoration-slate-400 underline-offset-2">Ali</strong></span>
                      <span>Verb: <strong className="underline decoration-slate-400 underline-offset-2">Help</strong></span>
                      <span>Object: <strong className="underline decoration-slate-400 underline-offset-2">Them</strong></span>
                    </div>
                  )}
                </div>
                <img src="/logo.png" alt="D.TEN Logo" className="w-12 h-12 object-contain" />
              </div>
            </div>

            {/* Document Table */}
            <div className="relative z-10 overflow-x-auto">
              <table className="w-full border-collapse border border-slate-900 text-xs sm:text-[13px]">
                <thead>
                  <tr className="bg-[#ffe600] text-slate-950 font-bold border-b border-slate-900">
                    <th className="border border-slate-900 py-2 px-3 text-left w-[34%]">
                      {isActivePassive ? 'Tense Type' : 'Present Tenses'}
                    </th>
                    <th className="border border-slate-900 py-2 px-3 text-left w-[33%]">
                      {isActivePassive ? 'Active Voice' : 'English'}
                    </th>
                    <th className="border border-slate-900 py-2 px-3 text-left w-[33%]">
                      {isActivePassive ? 'Passive Voice' : 'Urdu'}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredChronological.map((row, idx) => {
                    const isNewSection = !isActivePassive && (idx === 12 || idx === 24);
                    return (
                      <React.Fragment key={row.id}>
                        {/* If Tenses: Past and Future section headers */}
                        {isNewSection && (
                          <tr className="bg-[#ffe600] text-slate-950 font-bold border-b border-slate-900">
                            <td className="border border-slate-900 py-1.5 px-3">
                              {idx === 12 ? 'Past Tenses' : 'Future Tenses'}
                            </td>
                            <td className="border border-slate-900 py-1.5 px-3">English</td>
                            <td className="border border-slate-900 py-1.5 px-3">Urdu</td>
                          </tr>
                        )}
                        <tr className="hover:bg-amber-50/50 transition-colors">
                          <td className="border border-slate-900 py-1.5 px-2.5 font-medium text-slate-900">
                            {row.tense}
                          </td>
                          <td className="border border-slate-900 py-1.5 px-2.5 text-slate-800">
                            <div className="flex items-center justify-between group">
                              <span>{isActivePassive ? row.active : row.english}</span>
                              <div className="opacity-0 group-hover:opacity-100 transition flex items-center gap-1 no-print">
                                <button
                                  onClick={() => speakEnglish(isActivePassive ? row.active : row.english)}
                                  className="p-1 text-slate-400 hover:text-emerald-600 rounded"
                                  title="Pronounce"
                                >
                                  <Volume2 className="w-3 h-3" />
                                </button>
                                <button
                                  onClick={() => copyToClipboard(isActivePassive ? row.active : row.english)}
                                  className="p-1 text-slate-400 hover:text-emerald-600 rounded"
                                  title="Copy"
                                >
                                  <Copy className="w-3 h-3" />
                                </button>
                              </div>
                            </div>
                          </td>
                          <td className={`border border-slate-900 py-1.5 px-2.5 ${isActivePassive ? 'text-slate-800' : 'text-slate-900 text-right font-serif text-sm'}`} dir={isActivePassive ? 'ltr' : 'rtl'}>
                            <div className="flex items-center justify-between group">
                              <span>{isActivePassive ? row.passive : row.urdu}</span>
                              {isActivePassive && (
                                <div className="opacity-0 group-hover:opacity-100 transition flex items-center gap-1 no-print">
                                  <button
                                    onClick={() => speakEnglish(row.passive)}
                                    className="p-1 text-slate-400 hover:text-emerald-600 rounded"
                                    title="Pronounce"
                                  >
                                    <Volume2 className="w-3 h-3" />
                                  </button>
                                  <button
                                    onClick={() => copyToClipboard(row.passive)}
                                    className="p-1 text-slate-400 hover:text-emerald-600 rounded"
                                    title="Copy"
                                  >
                                    <Copy className="w-3 h-3" />
                                  </button>
                                </div>
                              )}
                            </div>
                          </td>
                        </tr>
                      </React.Fragment>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Document Footer */}
            <div className="relative z-10 border-t border-slate-300 pt-3 mt-4 flex items-center justify-between text-xs text-slate-500 font-medium">
              <span>By Dr Wazir Ahmed Deesu</span>
              <span className="text-[11px] text-slate-400">Page 1 of 2</span>
              <span>www.deesu.org/dten</span>
            </div>
          </div>
        )}

        {/* ================= PAGE 2: TYPE-WISE ================= */}
        {(activePage === 'both' || activePage === 'page2') && (
          <div className="relative bg-white text-slate-900 rounded-3xl border border-slate-300 shadow-xl p-6 sm:p-8 max-w-4xl mx-auto print:max-w-none print:shadow-none print:border-0 print:p-0 print:m-0 print:rounded-none page-break-after">
            
            {/* Watermark */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.035] select-none rotate-[-25deg]">
              <span className="text-6xl sm:text-8xl font-black text-slate-900 uppercase tracking-widest whitespace-nowrap">
                D.TEN Education Network
              </span>
            </div>

            {/* Document Header */}
            <div className="relative z-10 border-b-2 border-slate-900 pb-3 mb-4">
              <div className="flex items-center justify-between">
                <img src="/logo.png" alt="D.TEN Logo" className="w-12 h-12 object-contain" />
                <div className="text-center px-2">
                  <h1 className="text-lg sm:text-2xl font-black text-slate-900 tracking-tight font-serif">
                    {isActivePassive ? 'Type-Wise Tenses' : 'Tenses Type-Wise'}
                  </h1>
                  <span className="text-xs sm:text-sm font-semibold text-slate-500 block">
                    {isActivePassive ? 'Active & Passive Voice (Aspect-Wise Breakdown)' : 'Indefinite, Continuous, Perfect, Perfect Continuous'}
                  </span>
                </div>
                <img src="/logo.png" alt="D.TEN Logo" className="w-12 h-12 object-contain" />
              </div>
            </div>

            {/* Document Table Type-Wise */}
            <div className="relative z-10 overflow-x-auto">
              <table className="w-full border-collapse border border-slate-900 text-xs sm:text-[13px]">
                <tbody>
                  {(isActivePassive ? ACTIVE_PASSIVE_TYPEWISE : TENSES_TYPEWISE).map((group, gIdx) => (
                    <React.Fragment key={gIdx}>
                      {/* Section Header */}
                      <tr className="bg-[#ffe600] text-slate-950 font-bold border-b border-slate-900">
                        <th className="border border-slate-900 py-1.5 px-3 text-left w-[34%]">
                          {group.type}
                        </th>
                        <th className="border border-slate-900 py-1.5 px-3 text-left w-[33%]">
                          {isActivePassive ? 'Active Voice' : 'English'}
                        </th>
                        <th className="border border-slate-900 py-1.5 px-3 text-left w-[33%]">
                          {isActivePassive ? 'Passive Voice' : 'Urdu'}
                        </th>
                      </tr>

                      {/* Section Rows */}
                      {group.rows.map((row, rIdx) => (
                        <tr key={rIdx} className="hover:bg-amber-50/50 transition-colors">
                          <td className="border border-slate-900 py-1.5 px-2.5 font-medium text-slate-900">
                            {row.tense}
                          </td>
                          <td className="border border-slate-900 py-1.5 px-2.5 text-slate-800">
                            <div className="flex items-center justify-between group">
                              <span>{isActivePassive ? row.active : row.english}</span>
                              <div className="opacity-0 group-hover:opacity-100 transition flex items-center gap-1 no-print">
                                <button
                                  onClick={() => speakEnglish(isActivePassive ? row.active : row.english)}
                                  className="p-1 text-slate-400 hover:text-emerald-600 rounded"
                                  title="Pronounce"
                                >
                                  <Volume2 className="w-3 h-3" />
                                </button>
                                <button
                                  onClick={() => copyToClipboard(isActivePassive ? row.active : row.english)}
                                  className="p-1 text-slate-400 hover:text-emerald-600 rounded"
                                  title="Copy"
                                >
                                  <Copy className="w-3 h-3" />
                                </button>
                              </div>
                            </div>
                          </td>
                          <td className={`border border-slate-900 py-1.5 px-2.5 ${isActivePassive ? 'text-slate-800' : 'text-slate-900 text-right font-serif text-sm'}`} dir={isActivePassive ? 'ltr' : 'rtl'}>
                            <div className="flex items-center justify-between group">
                              <span>{isActivePassive ? row.passive : row.urdu}</span>
                              {isActivePassive && (
                                <div className="opacity-0 group-hover:opacity-100 transition flex items-center gap-1 no-print">
                                  <button
                                    onClick={() => speakEnglish(row.passive)}
                                    className="p-1 text-slate-400 hover:text-emerald-600 rounded"
                                    title="Pronounce"
                                  >
                                    <Volume2 className="w-3 h-3" />
                                  </button>
                                  <button
                                    onClick={() => copyToClipboard(row.passive)}
                                    className="p-1 text-slate-400 hover:text-emerald-600 rounded"
                                    title="Copy"
                                  >
                                    <Copy className="w-3 h-3" />
                                  </button>
                                </div>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Document Footer */}
            <div className="relative z-10 border-t border-slate-300 pt-3 mt-4 flex items-center justify-between text-xs text-slate-500 font-medium">
              <span>By Dr Wazir Ahmed Deesu</span>
              <span className="text-[11px] text-slate-400">Page 2 of 2</span>
              <span>www.deesu.org/dten</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
