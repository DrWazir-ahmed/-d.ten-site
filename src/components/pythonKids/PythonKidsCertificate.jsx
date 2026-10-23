import React, { useState, useRef } from 'react';
import { 
  Award, 
  Download, 
  Printer, 
  Upload, 
  Sparkles, 
  CheckCircle2, 
  User, 
  Calendar, 
  ShieldCheck, 
  Image as ImageIcon,
  RotateCcw,
  Star
} from 'lucide-react';

export const PythonKidsCertificate = ({
  studentName = 'Young Coder',
  score = 100,
  completionDate = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }),
  onBackToCourse
}) => {
  const [name, setName] = useState(studentName);
  const [withPhoto, setWithPhoto] = useState(false);
  const [photoUrl, setPhotoUrl] = useState(null);
  const [selectedAvatar, setSelectedAvatar] = useState('coder-girl');
  const fileInputRef = useRef(null);

  const certId = 'DTEN-PYK-' + Math.floor(100000 + Math.random() * 900000);

  // Pre-made friendly avatars if user doesn't upload a personal photo
  const avatars = [
    { id: 'coder-boy', label: 'Boy Coder', icon: '👦' },
    { id: 'coder-girl', label: 'Girl Coder', icon: '👧' },
    { id: 'super-hero', label: 'Super Coder', icon: '🦸' },
    { id: 'astronaut', label: 'Space Explorer', icon: '🧑‍🚀' },
    { id: 'robot-friend', label: 'PyBot Friend', icon: '🤖' }
  ];

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setPhotoUrl(event.target.result);
        setWithPhoto(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fadeIn py-6">
      
      {/* Configuration Controls Bar */}
      <div className="no-print p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-500" />
              Customize Your D.TEN Certificate
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Personalize your name, add your picture, and print your verified official diploma!
            </p>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={handlePrint}
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 active:scale-95 text-white font-bold text-xs shadow-md shadow-brand-600/30 transition-all"
            >
              <Printer className="w-4 h-4" />
              <span>Print Certificate</span>
            </button>
            {onBackToCourse && (
              <button
                onClick={onBackToCourse}
                className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-bold"
              >
                Back
              </button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t border-slate-100 dark:border-slate-800 text-xs">
          {/* Name Input */}
          <div className="space-y-1.5">
            <label className="font-bold text-slate-600 dark:text-slate-300">
              Student Full Name:
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter student name (e.g. Muhammad Ali / Fatima Ahmed)"
              className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 font-bold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
          </div>

          {/* Photo Toggle */}
          <div className="space-y-1.5">
            <label className="font-bold text-slate-600 dark:text-slate-300 flex items-center justify-between">
              <span>Photo Option:</span>
              <span className="text-brand-600 dark:text-brand-400 font-semibold cursor-pointer" onClick={() => setWithPhoto(!withPhoto)}>
                {withPhoto ? '✓ With Picture' : 'Without Picture'} (Click to toggle)
              </span>
            </label>
            
            <div className="flex items-center gap-3">
              <button
                onClick={() => setWithPhoto(!withPhoto)}
                className={`px-3 py-2 rounded-xl font-bold border transition-all ${
                  withPhoto
                    ? 'bg-emerald-50 text-emerald-700 border-emerald-300 dark:bg-emerald-950/40'
                    : 'bg-slate-100 text-slate-600 border-slate-200 dark:bg-slate-800 dark:text-slate-400'
                }`}
              >
                {withPhoto ? 'Photo Included' : 'No Photo (Official Seal)'}
              </button>

              {withPhoto && (
                <>
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-brand-50 hover:bg-brand-100 dark:bg-brand-950/60 text-brand-600 dark:text-brand-300 font-bold border border-brand-200"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload Picture</span>
                  </button>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileUpload}
                    accept="image/*"
                    className="hidden"
                  />
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          PRINTABLE DIPLOMA / CERTIFICATE CANVAS
          ───────────────────────────────────────────────────────────── */}
      <div 
        id="dten-certificate-canvas"
        className="relative mx-auto rounded-3xl bg-gradient-to-br from-amber-50 via-white to-amber-50/40 text-slate-900 p-8 sm:p-12 shadow-2xl border-8 border-double border-amber-600/60 overflow-hidden font-serif"
        style={{
          boxShadow: '0 25px 50px -12px rgba(217, 119, 6, 0.25)'
        }}
      >
        {/* Background Watermark Crest */}
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.04] pointer-events-none select-none">
          <div className="text-[280px] font-black text-amber-900">D.TEN</div>
        </div>

        {/* Certificate Decorative Corners */}
        <div className="absolute top-4 left-4 w-12 h-12 border-t-4 border-l-4 border-amber-600/70" />
        <div className="absolute top-4 right-4 w-12 h-12 border-t-4 border-r-4 border-amber-600/70" />
        <div className="absolute bottom-4 left-4 w-12 h-12 border-b-4 border-l-4 border-amber-600/70" />
        <div className="absolute bottom-4 right-4 w-12 h-12 border-b-4 border-r-4 border-amber-600/70" />

        <div className="relative z-10 flex flex-col items-center text-center space-y-6">
          
          {/* Header Branding */}
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 text-xs font-sans font-extrabold uppercase tracking-widest text-amber-800 bg-amber-100/80 px-4 py-1 rounded-full border border-amber-300">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              D.TEN Academy of Future Technologies • Pakistan
            </div>
            <h1 className="text-3xl sm:text-5xl font-black tracking-wider text-slate-900 uppercase pt-2">
              Certificate of Achievement
            </h1>
            <p className="text-sm font-sans font-bold text-amber-700 tracking-wide">
              جونیئر پائتھن پروگرامر سرٹیفکیٹ • JUNIOR PYTHON CODE MASTER
            </p>
          </div>

          {/* Photo or Gold Crest Emblem */}
          <div className="pt-2">
            {withPhoto ? (
              <div className="relative">
                <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl border-4 border-amber-500 shadow-xl overflow-hidden bg-slate-100 mx-auto">
                  {photoUrl ? (
                    <img src={photoUrl} alt="Student" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-tr from-amber-200 to-amber-100 text-amber-800 font-sans">
                      <span className="text-4xl">🦸</span>
                      <span className="text-[10px] font-bold mt-1">Super Coder</span>
                    </div>
                  )}
                </div>
                <div className="absolute -bottom-2 -right-2 bg-amber-500 text-white rounded-full p-1.5 shadow-md">
                  <Star className="w-4 h-4 fill-white" />
                </div>
              </div>
            ) : (
              <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-amber-600 via-amber-400 to-amber-600 p-1 shadow-xl mx-auto flex items-center justify-center">
                <div className="w-full h-full bg-amber-50 rounded-full flex flex-col items-center justify-center border-2 border-dashed border-amber-700">
                  <Trophy className="w-10 h-10 text-amber-700" />
                  <span className="text-[9px] font-sans font-black text-amber-900 tracking-tighter">EXCELLENCE</span>
                </div>
              </div>
            )}
          </div>

          {/* Certificate Body Text */}
          <div className="space-y-3 max-w-2xl">
            <p className="text-sm sm:text-base font-sans italic text-slate-600">
              This is proudly presented to verify that
            </p>

            {/* Student Name */}
            <div className="py-2 border-b-2 border-amber-700/40 inline-block min-w-[280px] sm:min-w-[420px]">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-serif">
                {name || 'Young Coder'}
              </h2>
            </div>

            <p className="text-xs sm:text-sm font-sans text-slate-700 leading-relaxed px-4 pt-1">
              has successfully completed all 7 modules, programming playgrounds, and the comprehensive 
              assessment exam of the interactive course:
            </p>

            <div className="py-1">
              <span className="text-lg sm:text-2xl font-black text-brand-700 font-sans">
                Python for Kids: Junior Code Master (Ages 6-12)
              </span>
            </div>

            <p className="text-xs font-sans text-slate-500 max-w-xl mx-auto">
              Demonstrated practical competence in Python syntax, variables, conditional decisions, 
              loops, lists, and building interactive mini games with honors.
            </p>
          </div>

          {/* Signatures & Seal Footer */}
          <div className="pt-6 w-full max-w-3xl border-t border-amber-300 flex flex-col sm:flex-row items-center justify-between gap-6 font-sans">
            {/* Date & ID */}
            <div className="text-left space-y-1 text-xs">
              <div className="flex items-center gap-1.5 text-slate-600">
                <Calendar className="w-3.5 h-3.5 text-amber-700" />
                <span>Date: <strong>{completionDate}</strong></span>
              </div>
              <div className="flex items-center gap-1.5 text-slate-600">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>ID: <strong className="font-mono">{certId}</strong></span>
              </div>
            </div>

            {/* Official Stamp */}
            <div className="text-center">
              <div className="w-16 h-16 rounded-full border-2 border-amber-700/60 p-1 flex items-center justify-center mx-auto opacity-80">
                <div className="w-full h-full rounded-full border border-dashed border-amber-700 flex flex-col items-center justify-center text-[8px] font-bold text-amber-900 leading-tight">
                  <span>D.TEN</span>
                  <span>VERIFIED</span>
                  <span>🇵🇰</span>
                </div>
              </div>
            </div>

            {/* Director Signature */}
            <div className="text-right space-y-1 text-xs">
              <div className="font-serif italic text-base text-slate-800 font-bold border-b border-slate-400 pb-0.5">
                Dr. Wazir Ahmed & Faculty
              </div>
              <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                Lead Mentor, D.TEN Academy
              </div>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
};
