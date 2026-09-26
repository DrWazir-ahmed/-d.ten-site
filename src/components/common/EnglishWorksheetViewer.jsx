import React, { useState } from 'react';
import { 
  Printer, 
  Download, 
  Eye, 
  EyeOff, 
  RotateCcw, 
  Sparkles, 
  CheckCircle2,
  FileSpreadsheet,
  Edit3
} from 'lucide-react';
import { WORKSHEET_ROWS } from '../../data/worksheetsData';

export const EnglishWorksheetViewer = ({ worksheetType = 'active-passive', onPrint }) => {
  const [activePage, setActivePage] = useState('both'); // 'page1' | 'page2' | 'both'
  const [showAnswers, setShowAnswers] = useState(false);

  // Student Header State
  const [studentInfo, setStudentInfo] = useState({
    name: '',
    rollNo: '',
    date: new Date().toISOString().split('T')[0],
    totalMarks: '36',
    obtainedMarks: '',
    subject: worksheetType === 'active-passive' ? 'Ali' : 'He',
    verb: worksheetType === 'active-passive' ? 'Help' : 'Write',
    object: worksheetType === 'active-passive' ? 'Them' : 'A letter'
  });

  // User input answers map: { [id_col]: string }
  const [userAnswers, setUserAnswers] = useState({});

  const isActivePassive = worksheetType === 'active-passive';

  const handleInputChange = (id, col, val) => {
    setUserAnswers(prev => ({
      ...prev,
      [`${id}_${col}`]: val
    }));
  };

  const handleClearAll = () => {
    setUserAnswers({});
    setStudentInfo(prev => ({
      ...prev,
      name: '',
      rollNo: '',
      obtainedMarks: ''
    }));
  };

  const page1Rows = WORKSHEET_ROWS.filter(r => r.page === 1);
  const page2Rows = WORKSHEET_ROWS.filter(r => r.page === 2);

  const handleDownloadOfflineHTML = () => {
    const title = isActivePassive 
      ? 'Active/Passive Voice Worksheet' 
      : 'English Tense Worksheet';
    
    const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>${title} | D.TEN</title>
<style>
  @page { size: A4 landscape; margin: 10mm; }
  * { box-sizing: border-box; }
  body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif; margin: 0; padding: 15px; color: #000; background: #fff; }
  .page { page-break-after: always; max-width: 1050px; margin: 0 auto 30px auto; position: relative; }
  .watermark { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; pointer-events: none; opacity: 0.05; transform: rotate(-25deg); font-size: 55px; font-weight: 900; }
  .header-title { text-align: center; font-size: 19px; font-weight: 800; text-decoration: underline; margin-bottom: 12px; }
  .meta-grid { display: flex; flex-wrap: wrap; justify-content: space-between; font-size: 13px; font-weight: 700; margin-bottom: 8px; line-height: 1.8; }
  table { width: 100%; border-collapse: collapse; font-size: 12px; margin-top: 8px; }
  th, td { border: 1px solid #000; padding: 6px 8px; }
  th { background: #ffe600; font-weight: 800; text-align: left; }
  .sign-footer { display: flex; justify-content: space-between; font-size: 13px; font-weight: 700; margin-top: 25px; padding-top: 10px; }
  @media print { body { padding: 0; } }
</style>
</head>
<body>
  <!-- PAGE 1 -->
  <div class="page">
    <div class="watermark">Deesu Training &amp; Education Network (D.TEN)</div>
    <div class="header-title">${title} (A4 Page size Printable)</div>
    <div class="meta-grid">
      ${isActivePassive 
        ? '<div>Name _________________________ &nbsp;&nbsp; Roll#___________ &nbsp;&nbsp; Date____-____-________ &nbsp;&nbsp; Total Marks ____ &nbsp;&nbsp; Obtained Marks______</div><div style="width:100%; margin-top:4px;">Subject ______________________ &nbsp;&nbsp; Verb ______________________ &nbsp;&nbsp; Object _________________________</div>' 
        : '<div>Name _____________________________________________ &nbsp;&nbsp; Date_________________________</div><div style="width:100%; margin-top:4px;">Subject ______________________ &nbsp;&nbsp; Verb ______________________ &nbsp;&nbsp; Object _________________________</div>'
      }
    </div>
    <table>
      <thead>
        <tr>
          <th style="width: 28%;">Tense Type</th>
          <th style="width: 36%;">${isActivePassive ? 'Active Voice' : 'English Sentence'}</th>
          <th style="width: 36%;">${isActivePassive ? 'Passive Voice' : 'Urdu Sentence'}</th>
        </tr>
      </thead>
      <tbody>
        ${page1Rows.map(r => `
          <tr>
            <td><strong>${r.tense}</strong></td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
          </tr>
        `).join('')}
      </tbody>
    </table>
  </div>

  <!-- PAGE 2 -->
  <div class="page">
    <div class="watermark">Deesu Training &amp; Education Network (D.TEN)</div>
    <table>
      <thead>
        <tr>
          <th style="width: 28%;">Tense Type</th>
          <th style="width: 36%;">${isActivePassive ? 'Active Voice' : 'English Sentence'}</th>
          <th style="width: 36%;">${isActivePassive ? 'Passive Voice' : 'Urdu Sentence'}</th>
        </tr>
      </thead>
      <tbody>
        ${page2Rows.map(r => `
          <tr>
            <td><strong>${r.tense}</strong></td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
          </tr>
        `).join('')}
      </tbody>
    </table>
    <div class="sign-footer">
      <div>Teacher Sign: ____________________</div>
      <div>Parents Sign: ____________________________</div>
    </div>
  </div>
</body>
</html>`;

    const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${isActivePassive ? 'Active_Passive_Worksheet' : 'English_Tenses_Worksheet'}_D.TEN.html`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const renderTableSection = (rows, isSecondPage = false) => (
    <div className="relative bg-white text-slate-900 rounded-3xl border border-slate-300 shadow-xl p-6 sm:p-8 max-w-5xl mx-auto print:max-w-none print:shadow-none print:border-0 print:p-0 print:m-0 print:rounded-none page-break-after">
      
      {/* Watermark matching original PDF */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.035] select-none rotate-[-22deg]">
        <span className="text-4xl sm:text-6xl font-black text-slate-900 tracking-wider text-center">
          Deesu Training & Education Network (D.TEN)
        </span>
      </div>

      <div className="relative z-10 space-y-4">
        {/* Header on Page 1 */}
        {!isSecondPage && (
          <div className="space-y-3 pb-2 border-b border-slate-300">
            <h1 className="text-center font-serif text-lg sm:text-2xl font-black tracking-tight underline decoration-slate-400 underline-offset-4">
              {isActivePassive ? 'Active/Passive Voice Worksheet' : 'English Tense Worksheet'}{' '}
              <span className="text-xs sm:text-sm font-normal text-slate-500 no-underline inline-block">
                (A4 Page size Printable)
              </span>
            </h1>

            {/* Student metadata fields */}
            {isActivePassive ? (
              <div className="space-y-2 text-xs sm:text-sm font-semibold text-slate-800">
                <div className="flex flex-wrap items-center justify-between gap-y-2 gap-x-4">
                  <div className="flex items-center gap-1.5 flex-1 min-w-[200px]">
                    <span>Name</span>
                    <input
                      type="text"
                      placeholder="Student Name"
                      value={studentInfo.name}
                      onChange={(e) => setStudentInfo(prev => ({ ...prev, name: e.target.value }))}
                      className="flex-1 border-b border-slate-400 bg-transparent px-2 py-0.5 text-xs sm:text-sm font-bold focus:outline-none focus:border-brand-600"
                    />
                  </div>
                  <div className="flex items-center gap-1.5 w-28">
                    <span>Roll#</span>
                    <input
                      type="text"
                      placeholder="101"
                      value={studentInfo.rollNo}
                      onChange={(e) => setStudentInfo(prev => ({ ...prev, rollNo: e.target.value }))}
                      className="w-full border-b border-slate-400 bg-transparent px-1 py-0.5 text-xs sm:text-sm font-bold focus:outline-none focus:border-brand-600"
                    />
                  </div>
                  <div className="flex items-center gap-1.5 w-36">
                    <span>Date</span>
                    <input
                      type="text"
                      value={studentInfo.date}
                      onChange={(e) => setStudentInfo(prev => ({ ...prev, date: e.target.value }))}
                      className="w-full border-b border-slate-400 bg-transparent px-1 py-0.5 text-xs sm:text-sm font-bold focus:outline-none focus:border-brand-600"
                    />
                  </div>
                  <div className="flex items-center gap-1.5 w-28">
                    <span>Total Marks</span>
                    <input
                      type="text"
                      value={studentInfo.totalMarks}
                      onChange={(e) => setStudentInfo(prev => ({ ...prev, totalMarks: e.target.value }))}
                      className="w-full border-b border-slate-400 bg-transparent px-1 py-0.5 text-xs sm:text-sm font-bold focus:outline-none focus:border-brand-600"
                    />
                  </div>
                  <div className="flex items-center gap-1.5 w-32">
                    <span>Obtained Marks</span>
                    <input
                      type="text"
                      placeholder="____"
                      value={studentInfo.obtainedMarks}
                      onChange={(e) => setStudentInfo(prev => ({ ...prev, obtainedMarks: e.target.value }))}
                      className="w-full border-b border-slate-400 bg-transparent px-1 py-0.5 text-xs sm:text-sm font-bold focus:outline-none focus:border-brand-600"
                    />
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-y-2 gap-x-4 pt-1">
                  <div className="flex items-center gap-1.5 flex-1 min-w-[150px]">
                    <span>Subject</span>
                    <input
                      type="text"
                      value={studentInfo.subject}
                      onChange={(e) => setStudentInfo(prev => ({ ...prev, subject: e.target.value }))}
                      className="flex-1 border-b border-slate-400 bg-transparent px-2 py-0.5 text-xs sm:text-sm font-bold focus:outline-none focus:border-brand-600"
                    />
                  </div>
                  <div className="flex items-center gap-1.5 flex-1 min-w-[150px]">
                    <span>Verb</span>
                    <input
                      type="text"
                      value={studentInfo.verb}
                      onChange={(e) => setStudentInfo(prev => ({ ...prev, verb: e.target.value }))}
                      className="flex-1 border-b border-slate-400 bg-transparent px-2 py-0.5 text-xs sm:text-sm font-bold focus:outline-none focus:border-brand-600"
                    />
                  </div>
                  <div className="flex items-center gap-1.5 flex-1 min-w-[150px]">
                    <span>Object</span>
                    <input
                      type="text"
                      value={studentInfo.object}
                      onChange={(e) => setStudentInfo(prev => ({ ...prev, object: e.target.value }))}
                      className="flex-1 border-b border-slate-400 bg-transparent px-2 py-0.5 text-xs sm:text-sm font-bold focus:outline-none focus:border-brand-600"
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-2 text-xs sm:text-sm font-semibold text-slate-800">
                <div className="flex flex-wrap items-center justify-between gap-y-2 gap-x-4">
                  <div className="flex items-center gap-1.5 flex-1 min-w-[250px]">
                    <span>Name</span>
                    <input
                      type="text"
                      placeholder="Student Name"
                      value={studentInfo.name}
                      onChange={(e) => setStudentInfo(prev => ({ ...prev, name: e.target.value }))}
                      className="flex-1 border-b border-slate-400 bg-transparent px-2 py-0.5 text-xs sm:text-sm font-bold focus:outline-none focus:border-brand-600"
                    />
                  </div>
                  <div className="flex items-center gap-1.5 w-44">
                    <span>Date</span>
                    <input
                      type="text"
                      value={studentInfo.date}
                      onChange={(e) => setStudentInfo(prev => ({ ...prev, date: e.target.value }))}
                      className="w-full border-b border-slate-400 bg-transparent px-1 py-0.5 text-xs sm:text-sm font-bold focus:outline-none focus:border-brand-600"
                    />
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-y-2 gap-x-4 pt-1">
                  <div className="flex items-center gap-1.5 flex-1 min-w-[150px]">
                    <span>Subject</span>
                    <input
                      type="text"
                      value={studentInfo.subject}
                      onChange={(e) => setStudentInfo(prev => ({ ...prev, subject: e.target.value }))}
                      className="flex-1 border-b border-slate-400 bg-transparent px-2 py-0.5 text-xs sm:text-sm font-bold focus:outline-none focus:border-brand-600"
                    />
                  </div>
                  <div className="flex items-center gap-1.5 flex-1 min-w-[150px]">
                    <span>Verb</span>
                    <input
                      type="text"
                      value={studentInfo.verb}
                      onChange={(e) => setStudentInfo(prev => ({ ...prev, verb: e.target.value }))}
                      className="flex-1 border-b border-slate-400 bg-transparent px-2 py-0.5 text-xs sm:text-sm font-bold focus:outline-none focus:border-brand-600"
                    />
                  </div>
                  <div className="flex items-center gap-1.5 flex-1 min-w-[150px]">
                    <span>Object</span>
                    <input
                      type="text"
                      value={studentInfo.object}
                      onChange={(e) => setStudentInfo(prev => ({ ...prev, object: e.target.value }))}
                      className="flex-1 border-b border-slate-400 bg-transparent px-2 py-0.5 text-xs sm:text-sm font-bold focus:outline-none focus:border-brand-600"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-slate-900 text-xs sm:text-[13px]">
            <thead>
              <tr className="bg-[#ffe600] text-slate-950 font-bold border-b border-slate-900">
                <th className="border border-slate-900 py-2 px-3 text-left w-[28%] font-extrabold">
                  Tense Type
                </th>
                <th className="border border-slate-900 py-2 px-3 text-left w-[36%] font-extrabold">
                  {isActivePassive ? 'Active Voice' : 'English Sentence'}
                </th>
                <th className="border border-slate-900 py-2 px-3 text-left w-[36%] font-extrabold">
                  {isActivePassive ? 'Passive Voice' : 'Urdu Sentence'}
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => {
                const col1Val = userAnswers[`${row.id}_col1`] || '';
                const col2Val = userAnswers[`${row.id}_col2`] || '';
                const sample1 = isActivePassive ? row.activeAnswer : row.englishAnswer;
                const sample2 = isActivePassive ? row.passiveAnswer : row.urduAnswer;

                return (
                  <tr key={row.id} className="hover:bg-amber-50/40 transition-colors">
                    <td className="border border-slate-900 py-1.5 px-2.5 font-bold text-slate-900 bg-slate-50/50">
                      {row.tense}
                    </td>

                    {/* Column 1 */}
                    <td className="border border-slate-900 py-1 px-2 relative">
                      <input
                        type="text"
                        value={col1Val}
                        onChange={(e) => handleInputChange(row.id, 'col1', e.target.value)}
                        placeholder={showAnswers ? sample1 : ''}
                        className="w-full bg-transparent border-0 p-1 text-xs sm:text-[13px] text-slate-900 placeholder:text-emerald-700/60 placeholder:font-semibold focus:outline-none focus:bg-amber-50/50"
                      />
                    </td>

                    {/* Column 2 */}
                    <td className={`border border-slate-900 py-1 px-2 relative ${!isActivePassive ? 'text-right' : ''}`} dir={!isActivePassive ? 'rtl' : 'ltr'}>
                      <input
                        type="text"
                        value={col2Val}
                        onChange={(e) => handleInputChange(row.id, 'col2', e.target.value)}
                        placeholder={showAnswers ? sample2 : ''}
                        dir={!isActivePassive ? 'rtl' : 'ltr'}
                        className={`w-full bg-transparent border-0 p-1 text-xs sm:text-[13px] text-slate-900 placeholder:text-emerald-700/60 placeholder:font-semibold focus:outline-none focus:bg-amber-50/50 ${!isActivePassive ? 'font-serif text-right' : ''}`}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Footer for Page 2 */}
        {isSecondPage && (
          <div className="pt-6 mt-4 flex items-center justify-between text-xs sm:text-sm font-bold text-slate-800">
            <div>Teacher Sign: ____________________</div>
            <div>Parents Sign: ____________________________</div>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Control Toolbar */}
      <div className="no-print bg-white dark:bg-slate-900 rounded-2xl p-4 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
        <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
          
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
              Page 1 (Rows 1–17)
            </button>
            <button
              onClick={() => setActivePage('page2')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                activePage === 'page2'
                  ? 'bg-white dark:bg-slate-900 text-emerald-600 dark:text-emerald-400 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              Page 2 (Rows 18–36)
            </button>
          </div>

          {/* Practice & Helper Controls */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setShowAnswers(!showAnswers)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 border ${
                showAnswers
                  ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 text-emerald-700 dark:text-emerald-300'
                  : 'bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
              }`}
              title="Show sample solutions / answer key"
            >
              {showAnswers ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
              <span>{showAnswers ? 'Hide Answer Key' : 'Show Answer Key'}</span>
            </button>

            <button
              onClick={handleClearAll}
              className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-bold transition flex items-center gap-1.5"
              title="Clear entered inputs"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Clear</span>
            </button>

            <button
              onClick={handleDownloadOfflineHTML}
              className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-bold transition flex items-center gap-1.5"
              title="Download offline HTML worksheet"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Offline HTML</span>
            </button>

            <button
              onClick={() => onPrint ? onPrint() : window.print()}
              className="px-4 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition flex items-center gap-1.5 shadow-sm"
              title="Print official A4 worksheet"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print A4 Worksheet</span>
            </button>
          </div>
        </div>
      </div>

      {/* RENDER PAGES */}
      <div className="space-y-8 print:space-y-0">
        {(activePage === 'both' || activePage === 'page1') && (
          renderTableSection(page1Rows, false)
        )}
        {(activePage === 'both' || activePage === 'page2') && (
          renderTableSection(page2Rows, true)
        )}
      </div>
    </div>
  );
};
