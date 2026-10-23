import React, { useState, useRef } from 'react';
import { 
  Award, 
  Printer, 
  Download, 
  Camera, 
  CheckCircle2, 
  Sparkles, 
  ShieldCheck, 
  User, 
  X,
  Code2,
  Globe
} from 'lucide-react';

const AVATAR_OPTIONS = [
  { id: 'dev-hoodie', label: 'Tech Coder', emoji: '👨‍💻', bg: 'from-blue-600 to-indigo-700' },
  { id: 'gamer-pro', label: 'Gamer Pro', emoji: '🎧', bg: 'from-purple-600 to-pink-700' },
  { id: 'cyber-agent', label: 'Cyber Shield', emoji: '🛡️', bg: 'from-emerald-600 to-teal-700' },
  { id: 'space-geek', label: 'Space Tech', emoji: '🚀', bg: 'from-amber-600 to-orange-700' },
];

export const HtmlTeensCertificate = ({ 
  defaultStudentName = "Muhammad Ali",
  finalScore = 10,
  totalQuestions = 10,
  onClose
}) => {
  const [studentName, setStudentName] = useState(defaultStudentName);
  const [includePhoto, setIncludePhoto] = useState(true);
  const [customPhotoUrl, setCustomPhotoUrl] = useState(null);
  const [selectedAvatar, setSelectedAvatar] = useState(AVATAR_OPTIONS[0]);
  const [certId] = useState(() => `DTEN-HTML-${Math.floor(100000 + Math.random() * 900000)}`);
  
  const issueDate = new Date().toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setCustomPhotoUrl(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 print:p-0 print:bg-white print:fixed print:inset-0">
      <div className="relative w-full max-w-4xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col print:shadow-none print:border-none print:rounded-none">
        
        {/* Controls Toolbar (Hidden in Print) */}
        <div className="flex flex-wrap items-center justify-between gap-3 p-4 bg-slate-100 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-700 print:hidden">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-blue-600 text-white">
              <Award className="w-5 h-5" />
            </span>
            <div>
              <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100">
                Official D.TEN HTML5 Diploma
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Teen Web Developer (Ages 13–16) • Score: {finalScore}/{totalQuestions}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Student Name Input */}
            <div className="flex items-center gap-1.5 bg-white dark:bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-300 dark:border-slate-700">
              <User className="w-3.5 h-3.5 text-slate-400" />
              <input
                type="text"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                placeholder="Student Full Name"
                className="text-xs font-semibold bg-transparent border-none focus:outline-none text-slate-800 dark:text-slate-200 w-36"
              />
            </div>

            {/* Toggle Photo */}
            <button
              onClick={() => setIncludePhoto(!includePhoto)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${
                includePhoto
                  ? 'bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 border-blue-300 dark:border-blue-700'
                  : 'bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-300 dark:border-slate-700'
              }`}
            >
              {includePhoto ? '✓ With Student Photo' : 'Without Photo'}
            </button>

            {/* Print / Save PDF Button */}
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-md transition-all"
            >
              <Printer className="w-4 h-4" />
              Print / Save PDF
            </button>

            {onClose && (
              <button
                onClick={onClose}
                className="p-1.5 rounded-xl hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>

        {/* Photo Uploader & Avatar Selector Bar (Hidden in Print) */}
        {includePhoto && (
          <div className="px-6 py-3 bg-blue-50/70 dark:bg-blue-950/30 border-b border-blue-100 dark:border-blue-900/40 flex flex-wrap items-center justify-between gap-3 text-xs print:hidden">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-blue-900 dark:text-blue-200">
                Choose Picture Style:
              </span>
              <div className="flex items-center gap-1.5">
                {AVATAR_OPTIONS.map((av) => (
                  <button
                    key={av.id}
                    onClick={() => {
                      setSelectedAvatar(av);
                      setCustomPhotoUrl(null);
                    }}
                    className={`px-2.5 py-1 rounded-lg font-medium transition-all ${
                      !customPhotoUrl && selectedAvatar.id === av.id
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
                    }`}
                  >
                    {av.emoji} {av.label}
                  </button>
                ))}
              </div>
            </div>

            <label className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white dark:bg-slate-800 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 font-semibold cursor-pointer hover:bg-blue-100 transition-all">
              <Camera className="w-3.5 h-3.5" />
              Upload Student Photo
              <input
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>
          </div>
        )}

        {/* THE CERTIFICATE CANVAS (Landscape Letter / A4) */}
        <div className="p-6 sm:p-10 bg-gradient-to-br from-slate-50 via-white to-blue-50/30 dark:from-slate-900 dark:via-slate-900 dark:to-slate-950 flex flex-col justify-between relative print:p-8 print:m-0 print:border-none print:shadow-none min-h-[580px]">
          
          {/* Ornate Outer Border */}
          <div className="absolute inset-3 sm:inset-5 border-4 border-double border-blue-600/30 dark:border-blue-400/20 rounded-2xl pointer-events-none" />
          <div className="absolute inset-5 sm:inset-7 border border-blue-500/20 dark:border-blue-400/10 rounded-xl pointer-events-none" />

          {/* Top Header */}
          <div className="relative z-10 flex items-center justify-between pb-4 border-b border-slate-200/80 dark:border-slate-800">
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-blue-700 to-cyan-500 flex items-center justify-center shadow-lg text-white font-black text-2xl tracking-tighter">
                D.TEN
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 dark:text-white uppercase font-sans">
                  D.TEN Network of Technical Education
                </h1>
                <p className="text-xs font-semibold text-blue-700 dark:text-blue-400 tracking-wide uppercase">
                  National Institute of Coding & Web Engineering • Pakistan 🇵🇰
                </p>
              </div>
            </div>

            <div className="text-right">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-[11px] font-bold text-emerald-700 dark:text-emerald-300">
                <ShieldCheck className="w-3.5 h-3.5" />
                VERIFIED CREDENTIAL
              </div>
              <div className="text-[10px] text-slate-400 font-mono mt-1">
                ID: {certId}
              </div>
            </div>
          </div>

          {/* Main Certificate Body */}
          <div className="relative z-10 py-6 text-center my-auto">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-100/80 dark:bg-blue-900/40 text-blue-800 dark:text-blue-300 font-bold text-xs uppercase tracking-wider mb-3">
              <Code2 className="w-3.5 h-3.5" />
              Certificate of Achievement & Technical Mastery
            </div>

            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 uppercase tracking-widest font-semibold mb-2">
              This is to officially certify that
            </p>

            {/* Recipient Photo & Name Showcase */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 my-2">
              {includePhoto && (
                <div className="relative">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl p-1 bg-gradient-to-tr from-blue-600 to-cyan-400 shadow-xl overflow-hidden">
                    {customPhotoUrl ? (
                      <img
                        src={customPhotoUrl}
                        alt="Student"
                        className="w-full h-full object-cover rounded-xl"
                      />
                    ) : (
                      <div className={`w-full h-full rounded-xl bg-gradient-to-tr ${selectedAvatar.bg} flex items-center justify-center text-4xl shadow-inner`}>
                        {selectedAvatar.emoji}
                      </div>
                    )}
                  </div>
                  <div className="absolute -bottom-2 -right-2 bg-emerald-500 text-white p-1 rounded-full shadow">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                </div>
              )}

              <div className="text-center sm:text-left">
                <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight border-b-2 border-blue-500 pb-1 px-4 inline-block">
                  {studentName || "Young Developer"}
                </h2>
                <div className="text-sm font-urdu font-bold text-blue-700 dark:text-blue-300 mt-1" dir="rtl">
                  جونیئر ایچ ٹی ایم ایل 5 ویب ڈویلپر (عمر 13 تا 16 سال)
                </div>
              </div>
            </div>

            {/* Curriculum Description */}
            <p className="max-w-2xl mx-auto text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mt-4">
              has successfully completed the comprehensive <strong className="text-slate-900 dark:text-white">HTML5 Web Developer Mastery Course</strong> (Ages 13–16), demonstrating technical proficiency in HTML5 semantic document architecture, interactive forms, tables, media embeds, responsive navigation, and modern CSS styling with an exam score of <strong className="text-blue-600 dark:text-blue-400">{finalScore}/{totalQuestions} (Passed)</strong>.
            </p>
          </div>

          {/* Bottom Footer & Seal */}
          <div className="relative z-10 pt-4 border-t border-slate-200/80 dark:border-slate-800 flex items-end justify-between">
            <div className="text-left">
              <div className="text-xs font-bold text-slate-700 dark:text-slate-300">
                {issueDate}
              </div>
              <div className="text-[11px] text-slate-400">Date of Award</div>
            </div>

            {/* Official Gold Seal */}
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-amber-400 via-amber-300 to-yellow-500 border-4 border-amber-200 shadow-xl flex items-center justify-center text-center p-1 relative">
                <div className="w-full h-full rounded-full border border-amber-600/40 flex flex-col items-center justify-center text-amber-950 font-bold leading-none">
                  <Sparkles className="w-4 h-4 mb-0.5 text-amber-900" />
                  <span className="text-[8px] font-black uppercase tracking-tighter">GOLD</span>
                  <span className="text-[7px] font-extrabold">SEAL</span>
                </div>
              </div>
              <span className="text-[10px] font-bold text-amber-700 dark:text-amber-400 mt-1 uppercase tracking-wider">
                Excellence Seal
              </span>
            </div>

            <div className="text-right">
              <div className="font-serif italic font-bold text-base text-blue-900 dark:text-blue-300 tracking-wider">
                Dr. Wazir Ahmed
              </div>
              <div className="w-32 border-b border-slate-400 dark:border-slate-600 ml-auto my-1"></div>
              <div className="text-[11px] text-slate-400 font-medium">
                Academic Director, D.TEN Pakistan
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
