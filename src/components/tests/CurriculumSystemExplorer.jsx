import React, { useState, useEffect, useMemo } from 'react';
import { 
  GraduationCap, 
  BookOpen, 
  Layers, 
  ArrowRight, 
  ChevronRight, 
  Search, 
  Play, 
  HelpCircle, 
  CheckCircle2, 
  Award, 
  ArrowLeft,
  Sparkles,
  Atom,
  Code2,
  Globe2,
  FileText,
  Compass
} from 'lucide-react';
import { getCurriculumIndex } from '../../services/curriculumService';
import { ChapterTestModal } from './ChapterTestModal';
import { Badge } from '../common/Badge';

export const CurriculumSystemExplorer = () => {
  const [indexData, setIndexData] = useState({ systems: [] });
  const [loading, setLoading] = useState(true);

  // Drill-down navigation state
  const [selectedSystem, setSelectedSystem] = useState(null);
  const [selectedClass, setSelectedClass] = useState(null);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [activeChapterForTest, setActiveChapterForTest] = useState(null);

  // Search states for subjects and chapters
  const [subjectSearch, setSubjectSearch] = useState('');
  const [chapterSearch, setChapterSearch] = useState('');

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const data = await getCurriculumIndex();
      setIndexData(data);
      setLoading(false);
    };
    load();
  }, []);

  const handleSelectSystem = (sys) => {
    setSelectedSystem(sys);
    setSelectedClass(null);
    setSelectedSubject(null);
    setSubjectSearch('');
    setChapterSearch('');
  };

  const handleSelectClass = (cls) => {
    setSelectedClass(cls);
    setSelectedSubject(null);
    setSubjectSearch('');
    setChapterSearch('');
  };

  const handleSelectSubject = (sub) => {
    setSelectedSubject(sub);
    setChapterSearch('');
  };

  const handleResetToSystems = () => {
    setSelectedSystem(null);
    setSelectedClass(null);
    setSelectedSubject(null);
    setSubjectSearch('');
    setChapterSearch('');
  };

  // Filtered subjects
  const filteredSubjects = useMemo(() => {
    if (!selectedClass) return [];
    const q = subjectSearch.toLowerCase().trim();
    if (!q) return selectedClass.subjects || [];
    return (selectedClass.subjects || []).filter(sub => 
      sub.name.toLowerCase().includes(q)
    );
  }, [selectedClass, subjectSearch]);

  // Filtered chapters
  const filteredChapters = useMemo(() => {
    if (!selectedSubject) return [];
    const q = chapterSearch.toLowerCase().trim();
    if (!q) return selectedSubject.chapters || [];
    return (selectedSubject.chapters || []).filter(c => 
      String(c.no).includes(q) || c.title.toLowerCase().includes(q)
    );
  }, [selectedSubject, chapterSearch]);

  const getSystemIcon = (name) => {
    switch (name) {
      case 'Cambridge': return <GraduationCap className="w-6 h-6 text-indigo-500" />;
      case 'India CBSE': return <BookOpen className="w-6 h-6 text-emerald-500" />;
      case 'US High School': return <Compass className="w-6 h-6 text-blue-500" />;
      default: return <Layers className="w-6 h-6 text-brand-500" />;
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      
      {/* Interactive Breadcrumb Navigation Bar */}
      <div className="flex flex-wrap items-center gap-2 p-3 sm:p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs sm:text-sm font-bold shadow-sm">
        <button
          onClick={handleResetToSystems}
          className={`px-3 py-1.5 rounded-xl transition flex items-center gap-1.5 ${
            !selectedSystem 
              ? 'bg-brand-600 text-white shadow-sm' 
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          <span>Curriculum Systems</span>
        </button>

        {selectedSystem && (
          <>
            <ChevronRight className="w-4 h-4 text-slate-400" />
            <button
              onClick={() => {
                setSelectedClass(null);
                setSelectedSubject(null);
              }}
              className={`px-3 py-1.5 rounded-xl transition flex items-center gap-1.5 ${
                selectedSystem && !selectedClass
                  ? 'bg-brand-600 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <span>{selectedSystem.name}</span>
            </button>
          </>
        )}

        {selectedClass && (
          <>
            <ChevronRight className="w-4 h-4 text-slate-400" />
            <button
              onClick={() => setSelectedSubject(null)}
              className={`px-3 py-1.5 rounded-xl transition flex items-center gap-1.5 ${
                selectedClass && !selectedSubject
                  ? 'bg-brand-600 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <span>{selectedClass.name}</span>
            </button>
          </>
        )}

        {selectedSubject && (
          <>
            <ChevronRight className="w-4 h-4 text-slate-400" />
            <span className="px-3 py-1.5 rounded-xl bg-brand-50 dark:bg-brand-950/60 text-brand-600 dark:text-brand-400 border border-brand-200 dark:border-brand-800">
              {selectedSubject.name}
            </span>
          </>
        )}
      </div>

      {loading ? (
        <div className="py-20 text-center space-y-3 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800">
          <div className="w-10 h-10 border-4 border-brand-500 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Loading Curriculum Frameworks...
          </p>
        </div>
      ) : (
        <>
          {/* ─────────────────────────────────────────────────────────────
              LEVEL 1: SYSTEM NAMES (1st COLUMN FROM EXCEL)
              ───────────────────────────────────────────────────────────── */}
          {!selectedSystem && (
            <div className="space-y-4 animate-fadeIn">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-brand-600" />
                    <span>Select Curriculum System</span>
                  </h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    Select a national or international education system from the master consolidated bank (41,900+ Standard MCQs).
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {indexData.systems.map(sys => {
                  const totalClasses = sys.classes?.length || 0;
                  const totalSubjects = sys.classes?.reduce((sum, c) => sum + (c.subjects?.length || 0), 0);
                  const totalQuestions = sys.classes?.reduce((sum, c) => 
                    sum + (c.subjects?.reduce((sSum, s) => sSum + s.questionCount, 0) || 0), 0
                  );

                  return (
                    <div
                      key={sys.id}
                      onClick={() => handleSelectSystem(sys)}
                      className="group p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-brand-500 hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col justify-between space-y-5"
                    >
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="w-14 h-14 rounded-2xl bg-brand-50 dark:bg-brand-950/60 border border-brand-200 dark:border-brand-800 flex items-center justify-center group-hover:scale-110 transition-transform">
                            {getSystemIcon(sys.name)}
                          </div>
                          <span className="px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-brand-100 dark:bg-brand-900/40 text-brand-700 dark:text-brand-300">
                            {totalClasses} Classes
                          </span>
                        </div>

                        <div>
                          <h3 className="text-xl font-black text-slate-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                            {sys.name}
                          </h3>
                          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                            Includes {sys.classes.map(c => c.name).join(', ')} curriculum standards with chapter-wise 10 MCQs tests.
                          </p>
                        </div>
                      </div>

                      <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                        <div className="text-[11px] font-bold text-slate-400">
                          <span className="text-slate-900 dark:text-white font-black">{totalSubjects}</span> Subjects &bull; <span className="text-brand-600 font-black">{totalQuestions.toLocaleString()}</span> MCQs
                        </div>
                        <span className="w-8 h-8 rounded-xl bg-brand-50 group-hover:bg-brand-600 text-brand-600 group-hover:text-white flex items-center justify-center transition-colors">
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ─────────────────────────────────────────────────────────────
              LEVEL 2: CLASS CARDS (WHEN SYSTEM IS CLICKED)
              ───────────────────────────────────────────────────────────── */}
          {selectedSystem && !selectedClass && (
            <div className="space-y-5 animate-fadeIn">
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400">
                    <button onClick={handleResetToSystems} className="hover:underline flex items-center gap-1">
                      <ArrowLeft className="w-3.5 h-3.5" /> Back to Systems
                    </button>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mt-1">
                    {selectedSystem.name}: Select Class
                  </h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    Choose your academic grade or level to browse subjects and chapters.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {(selectedSystem.classes || []).map(cls => {
                  const subjectCount = cls.subjects?.length || 0;
                  const chapterCount = cls.subjects?.reduce((sum, s) => sum + s.chapterCount, 0) || 0;
                  const totalQuestions = cls.subjects?.reduce((sum, s) => sum + s.questionCount, 0) || 0;

                  return (
                    <div
                      key={cls.id}
                      onClick={() => handleSelectClass(cls)}
                      className="group p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-brand-500 hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col justify-between space-y-4"
                    >
                      <div className="space-y-3">
                        <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold group-hover:scale-110 transition-transform">
                          <GraduationCap className="w-6 h-6" />
                        </div>

                        <div>
                          <h3 className="text-lg font-black text-slate-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                            {cls.name}
                          </h3>
                          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                            {subjectCount} Subjects available with full chapter tests.
                          </p>
                        </div>
                      </div>

                      <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                        <span className="font-bold text-slate-500 dark:text-slate-400">
                          {chapterCount} Chapters &bull; {totalQuestions.toLocaleString()} MCQs
                        </span>
                        <span className="text-brand-600 dark:text-brand-400 font-bold group-hover:translate-x-1 transition-transform flex items-center gap-1">
                          View Subjects →
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ─────────────────────────────────────────────────────────────
              LEVEL 3: SUBJECTS (WHEN CLASS IS CLICKED)
              ───────────────────────────────────────────────────────────── */}
          {selectedClass && !selectedSubject && (
            <div className="space-y-5 animate-fadeIn">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <button 
                    onClick={() => setSelectedClass(null)} 
                    className="text-xs font-bold text-slate-400 hover:text-brand-600 transition flex items-center gap-1"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" /> Back to Classes ({selectedSystem?.name})
                  </button>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mt-1">
                    {selectedClass.name} Subjects
                  </h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Select a subject to view chapter titles and take 10 MCQs tests.
                  </p>
                </div>

                {/* Subject search input */}
                <div className="relative max-w-xs w-full">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search subjects..."
                    value={subjectSearch}
                    onChange={(e) => setSubjectSearch(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs focus:outline-none focus:ring-2 focus:ring-brand-500"
                  />
                </div>
              </div>

              {filteredSubjects.length === 0 ? (
                <div className="py-12 text-center bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 space-y-2">
                  <BookOpen className="w-10 h-10 text-slate-300 mx-auto" />
                  <p className="text-sm font-bold text-slate-700 dark:text-slate-300">No subjects matched "{subjectSearch}"</p>
                  <button onClick={() => setSubjectSearch('')} className="text-xs text-brand-600 font-bold hover:underline">
                    Clear Search
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {filteredSubjects.map(sub => (
                    <div
                      key={sub.id}
                      onClick={() => handleSelectSubject(sub)}
                      className="group p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-brand-500 hover:shadow-lg transition-all cursor-pointer flex flex-col justify-between space-y-3"
                    >
                      <div className="space-y-2">
                        <div className="w-10 h-10 rounded-xl bg-brand-50 dark:bg-brand-950/60 border border-brand-200 dark:border-brand-800 text-brand-600 dark:text-brand-400 flex items-center justify-center font-bold group-hover:scale-110 transition-transform">
                          <BookOpen className="w-5 h-5" />
                        </div>
                        <h4 className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors line-clamp-1">
                          {sub.name}
                        </h4>
                      </div>

                      <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] font-bold text-slate-400">
                        <span>{sub.chapterCount} Chapters</span>
                        <span className="text-brand-600 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                          Tests →
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ─────────────────────────────────────────────────────────────
              LEVEL 4: CHAPTER NO WITH TITLE (WHEN SUBJECT IS CLICKED)
              ───────────────────────────────────────────────────────────── */}
          {selectedSubject && (
            <div className="space-y-5 animate-fadeIn">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <button 
                    onClick={() => setSelectedSubject(null)} 
                    className="text-xs font-bold text-slate-400 hover:text-brand-600 transition flex items-center gap-1"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" /> Back to Subjects ({selectedClass?.name})
                  </button>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mt-1">
                    {selectedSubject.name}: Chapters & 10 MCQs Tests
                  </h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Click any chapter to conduct a 10 MCQs assessment with instant options evaluation and feedback.
                  </p>
                </div>

                {/* Chapter search filter */}
                <div className="relative max-w-xs w-full">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search chapter title or no..."
                    value={chapterSearch}
                    onChange={(e) => setChapterSearch(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs focus:outline-none focus:ring-2 focus:ring-brand-500"
                  />
                </div>
              </div>

              {filteredChapters.length === 0 ? (
                <div className="py-12 text-center bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 space-y-2">
                  <FileText className="w-10 h-10 text-slate-300 mx-auto" />
                  <p className="text-sm font-bold text-slate-700 dark:text-slate-300">No chapters matching "{chapterSearch}"</p>
                  <button onClick={() => setChapterSearch('')} className="text-xs text-brand-600 font-bold hover:underline">
                    Clear Search
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredChapters.map(chap => (
                    <div
                      key={chap.no}
                      className="group p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-brand-500/50 hover:shadow-md transition-all flex flex-col justify-between space-y-3"
                    >
                      <div className="flex items-start gap-3">
                        <span className="w-10 h-10 rounded-xl bg-brand-50 dark:bg-brand-950/60 border border-brand-200 dark:border-brand-800 text-brand-600 dark:text-brand-400 font-black text-sm flex items-center justify-center shrink-0">
                          {chap.no}
                        </span>
                        <div className="min-w-0 flex-1">
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                            Chapter {chap.no}
                          </span>
                          <h4 className="font-bold text-sm text-slate-900 dark:text-white leading-snug">
                            {chap.title}
                          </h4>
                        </div>
                      </div>

                      <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2">
                        <span className="text-[11px] font-semibold text-slate-400">
                          {chap.count} MCQs in pool &bull; 10 Selected
                        </span>

                        <button
                          onClick={() => setActiveChapterForTest(chap)}
                          className="py-2 px-3.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-black text-xs transition flex items-center gap-1.5 shadow-sm shadow-brand-500/20 group-hover:scale-105"
                        >
                          <Play className="w-3.5 h-3.5 fill-current" />
                          <span>Conduct 10 MCQs Test</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </>
      )}

      {/* ─────────────────────────────────────────────────────────────
          LEVEL 5: CONDUCT 10 MCQS TEST WITH FEEDBACK MODAL
          ───────────────────────────────────────────────────────────── */}
      {activeChapterForTest && (
        <ChapterTestModal
          isOpen={Boolean(activeChapterForTest)}
          onClose={() => setActiveChapterForTest(null)}
          system={selectedSystem}
          className={selectedClass}
          subject={selectedSubject}
          chapter={activeChapterForTest}
        />
      )}

    </div>
  );
};
