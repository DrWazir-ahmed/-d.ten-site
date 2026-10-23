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
  Compass,
  Calculator,
  Languages,
  Landmark,
  Cpu,
  Palette,
  Briefcase,
  Flame,
  ShieldCheck,
  TrendingUp,
  X
} from 'lucide-react';
import { getCurriculumIndex } from '../../services/curriculumService';
import { ChapterTestModal } from './ChapterTestModal';
import { useSEO } from '../../hooks/useSEO';

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

  // Dynamic SEO title & description generation
  const seoConfig = useMemo(() => {
    if (selectedSubject) {
      return {
        title: `${selectedSubject.name} Chapter Tests & 10 MCQs - ${selectedClass?.name} (${selectedSystem?.name})`,
        description: `Practice chapter-wise 10 MCQs tests with instant explanations in ${selectedSubject.name} for ${selectedClass?.name} (${selectedSystem?.name}). Total ${selectedSubject.chapterCount} chapters and ${selectedSubject.questionCount} standard questions.`
      };
    }
    if (selectedClass) {
      return {
        title: `${selectedClass.name} Subjects & Chapter Tests - ${selectedSystem?.name}`,
        description: `Browse all subjects and chapter tests in ${selectedClass.name} under ${selectedSystem?.name} curriculum with automated 10 MCQs assessments and feedback.`
      };
    }
    if (selectedSystem) {
      return {
        title: `${selectedSystem.name} Standard Tests & MCQs Catalog`,
        description: `Explore ${selectedSystem.name} curriculum tests with chapter-wise 10 MCQs across all classes and subjects.`
      };
    }
    return {
      title: 'Standard Curriculum Tests & 62,900+ MCQs (Cambridge, CBSE, US, FBISE Pakistan)',
      description: 'Comprehensive chapter-wise 10 MCQs testing system with options feedback across Cambridge (UK), India CBSE, US High School, and Pakistan FBISE (Matric, English, Math) syllabi.'
    };
  }, [selectedSystem, selectedClass, selectedSubject]);

  // Apply SEO
  useSEO(seoConfig);

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

  // System Aesthetic Theme Provider
  const getSystemTheme = (sys) => {
    const name = typeof sys === 'string' ? sys : sys?.name || '';
    const id = sys?.id || '';

    if (id === 'Cambridge' || name === 'Cambridge') {
      return {
        flag: '🇬🇧',
        country: 'United Kingdom',
        gradient: 'from-indigo-600 via-blue-600 to-indigo-900',
        accent: 'text-indigo-600 dark:text-indigo-400',
        badgeBg: 'bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 border-indigo-500/20',
        glow: 'group-hover:border-indigo-500/50 group-hover:shadow-indigo-500/10',
        icon: <GraduationCap className="w-7 h-7 text-white" />,
        subtitle: 'International General Certificate of Secondary Education & Advanced Level',
        tag: 'Cambridge Assessment International Education'
      };
    }
    if (id === 'India_CBSE' || name === 'India CBSE') {
      return {
        flag: '🇮🇳',
        country: 'India',
        gradient: 'from-amber-600 via-orange-600 to-emerald-900',
        accent: 'text-emerald-600 dark:text-emerald-400',
        badgeBg: 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-500/20',
        glow: 'group-hover:border-emerald-500/50 group-hover:shadow-emerald-500/10',
        icon: <BookOpen className="w-7 h-7 text-white" />,
        subtitle: 'Central Board of Secondary Education Curriculum Standards',
        tag: 'NCERT / CBSE Aligned Syllabi'
      };
    }
    if (id === 'US_High_School' || name === 'US High School') {
      return {
        flag: '🇺🇸',
        country: 'United States',
        gradient: 'from-blue-600 via-purple-600 to-blue-950',
        accent: 'text-blue-600 dark:text-blue-400',
        badgeBg: 'bg-blue-500/10 text-blue-700 dark:text-blue-300 border-blue-500/20',
        glow: 'group-hover:border-blue-500/50 group-hover:shadow-blue-500/10',
        icon: <Compass className="w-7 h-7 text-white" />,
        subtitle: 'US Secondary High School Core Curriculum & Elective Tracks',
        tag: 'Standardized US High School Framework'
      };
    }
    if (id === 'FBISE_Matric' || name.includes('Matric')) {
      return {
        flag: '🇵🇰',
        country: 'Pakistan',
        gradient: 'from-emerald-700 via-green-600 to-slate-900',
        accent: 'text-emerald-600 dark:text-emerald-400',
        badgeBg: 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-500/20',
        glow: 'group-hover:border-emerald-500/50 group-hover:shadow-emerald-500/10',
        icon: <GraduationCap className="w-7 h-7 text-white" />,
        subtitle: 'Federal Board SSC Part-I & Part-II (Classes 9 & 10) Science and Humanities Syllabi',
        tag: 'FBISE Pakistan National Curriculum'
      };
    }
    if (id === 'FBISE_English' || name.includes('English')) {
      return {
        flag: '🇵🇰',
        country: 'Pakistan',
        gradient: 'from-teal-700 via-emerald-600 to-cyan-950',
        accent: 'text-teal-600 dark:text-teal-400',
        badgeBg: 'bg-teal-500/10 text-teal-700 dark:text-teal-300 border-teal-500/20',
        glow: 'group-hover:border-teal-500/50 group-hover:shadow-teal-500/10',
        icon: <Languages className="w-7 h-7 text-white" />,
        subtitle: 'FBISE English Grammar, Tenses, Parts of Speech, Active/Passive & Direct/Indirect Voice',
        tag: 'FBISE Pakistan English Syllabus'
      };
    }
    if (id === 'FBISE_Math' || name.includes('Math')) {
      return {
        flag: '🇵🇰',
        country: 'Pakistan',
        gradient: 'from-green-700 via-emerald-700 to-slate-950',
        accent: 'text-green-600 dark:text-green-400',
        badgeBg: 'bg-green-500/10 text-green-700 dark:text-green-300 border-green-500/20',
        glow: 'group-hover:border-green-500/50 group-hover:shadow-green-500/10',
        icon: <Calculator className="w-7 h-7 text-white" />,
        subtitle: 'FBISE Secondary Mathematics: Algebra, Geometry, Arithmetic, Statistics & Probability',
        tag: 'FBISE Pakistan Mathematics Syllabus'
      };
    }
    return {
      flag: sys?.flag || '🌐',
      country: sys?.country || 'Curriculum',
      gradient: 'from-brand-600 via-indigo-600 to-brand-900',
      accent: 'text-brand-600 dark:text-brand-400',
      badgeBg: 'bg-brand-500/10 text-brand-700 dark:text-brand-300 border-brand-500/20',
      glow: 'group-hover:border-brand-500/50 group-hover:shadow-brand-500/10',
      icon: <Layers className="w-7 h-7 text-white" />,
      subtitle: 'Standardized Educational Curriculum',
      tag: 'Curriculum Framework'
    };
  };

  // Subject Category Categorizer for visual badges & icons
  const getSubjectVisuals = (subjectName) => {
    const s = subjectName.toLowerCase();
    if (s.includes('math') || s.includes('algebra') || s.includes('geometry') || s.includes('statistics')) {
      return {
        category: 'Mathematics',
        icon: <Calculator className="w-4 h-4" />,
        badgeColor: 'bg-indigo-50 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800'
      };
    }
    if (s.includes('physic') || s.includes('chem') || s.includes('bio') || s.includes('science')) {
      return {
        category: 'Sciences',
        icon: <Atom className="w-4 h-4" />,
        badgeColor: 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800'
      };
    }
    if (s.includes('comput') || s.includes('coding') || s.includes('ai') || s.includes('technol') || s.includes('robot') || s.includes('stem')) {
      return {
        category: 'Tech & Computing',
        icon: <Cpu className="w-4 h-4" />,
        badgeColor: 'bg-cyan-50 dark:bg-cyan-950/50 text-cyan-700 dark:text-cyan-300 border-cyan-200 dark:border-cyan-800'
      };
    }
    if (s.includes('english') || s.includes('hindi') || s.includes('urdu') || s.includes('sanskrit') || s.includes('french') || s.includes('german') || s.includes('spanish') || s.includes('arabic') || s.includes('chinese') || s.includes('language')) {
      return {
        category: 'Languages & Literature',
        icon: <Languages className="w-4 h-4" />,
        badgeColor: 'bg-rose-50 dark:bg-rose-950/50 text-rose-700 dark:text-rose-300 border-rose-200 dark:border-rose-800'
      };
    }
    if (s.includes('history') || s.includes('geography') || s.includes('econom') || s.includes('law') || s.includes('psychol') || s.includes('sociol')) {
      return {
        category: 'Humanities & Social',
        icon: <Landmark className="w-4 h-4" />,
        badgeColor: 'bg-amber-50 dark:bg-amber-950/50 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800'
      };
    }
    if (s.includes('business') || s.includes('account') || s.includes('commerce') || s.includes('finance') || s.includes('entrepreneur')) {
      return {
        category: 'Business & Commerce',
        icon: <Briefcase className="w-4 h-4" />,
        badgeColor: 'bg-purple-50 dark:bg-purple-950/50 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800'
      };
    }
    return {
      category: 'General Curriculum',
      icon: <BookOpen className="w-4 h-4" />,
      badgeColor: 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
    };
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      
      {/* ─────────────────────────────────────────────────────────────
          AESTHETIC BREADCRUMB NAVIGATION & STATUS BAR
          ───────────────────────────────────────────────────────────── */}
      <nav aria-label="Curriculum Navigation" className="flex flex-wrap items-center justify-between gap-3 p-3.5 sm:p-4 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-sm backdrop-blur-md">
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-bold">
          
          <button
            onClick={handleResetToSystems}
            className={`px-3.5 py-1.5 rounded-xl transition flex items-center gap-1.5 ${
              !selectedSystem 
                ? 'bg-gradient-to-r from-brand-600 to-indigo-600 text-white shadow-md shadow-brand-500/25' 
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Curriculum Systems</span>
          </button>

          {selectedSystem && (
            <>
              <ChevronRight className="w-4 h-4 text-slate-400 shrink-0" />
              <button
                onClick={() => {
                  setSelectedClass(null);
                  setSelectedSubject(null);
                }}
                className={`px-3.5 py-1.5 rounded-xl transition flex items-center gap-1.5 ${
                  selectedSystem && !selectedClass
                    ? 'bg-gradient-to-r from-brand-600 to-indigo-600 text-white shadow-md shadow-brand-500/25'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <span>{selectedSystem.flag}</span>
                <span>{selectedSystem.name}</span>
              </button>
            </>
          )}

          {selectedClass && (
            <>
              <ChevronRight className="w-4 h-4 text-slate-400 shrink-0" />
              <button
                onClick={() => setSelectedSubject(null)}
                className={`px-3.5 py-1.5 rounded-xl transition flex items-center gap-1.5 ${
                  selectedClass && !selectedSubject
                    ? 'bg-gradient-to-r from-brand-600 to-indigo-600 text-white shadow-md shadow-brand-500/25'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <span>{selectedClass.flag || selectedSystem?.flag}</span>
                <span>{selectedClass.name}</span>
              </button>
            </>
          )}

          {selectedSubject && (
            <>
              <ChevronRight className="w-4 h-4 text-slate-400 shrink-0" />
              <span className="px-3.5 py-1.5 rounded-xl bg-brand-50 dark:bg-brand-950/60 text-brand-600 dark:text-brand-400 border border-brand-200 dark:border-brand-800 font-extrabold flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5" />
                <span>{selectedSubject.flag || selectedSystem?.flag}</span>
                <span>{selectedSubject.name}</span>
              </span>
            </>
          )}
        </div>

        {/* Global pool count */}
        <div className="hidden lg:flex items-center gap-2 text-xs font-semibold text-slate-400">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>{(indexData.totalQuestions || 62943).toLocaleString()}+ Standard MCQs Verified</span>
        </div>
      </nav>

      {loading ? (
        <div className="py-24 text-center space-y-4 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="w-12 h-12 border-4 border-brand-500 border-t-transparent rounded-full animate-spin mx-auto" />
          <h3 className="text-sm font-black text-slate-800 dark:text-white tracking-wider uppercase">
            Loading Curriculum Frameworks...
          </h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            Extracting chapters and standard 10-MCQs question pools.
          </p>
        </div>
      ) : (
        <>
          {/* ─────────────────────────────────────────────────────────────
              LEVEL 1: SYSTEM NAMES (1st COLUMN FROM EXCEL)
              ───────────────────────────────────────────────────────────── */}
          {!selectedSystem && (
            <section aria-labelledby="systems-heading" className="space-y-6 animate-fadeIn">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
                <div>
                  <div className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-brand-600 dark:text-brand-400 mb-1">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Master Curriculum Architecture</span>
                  </div>
                  <h2 id="systems-heading" className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
                    Select Education System
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-2xl leading-relaxed">
                    Choose your curriculum standard below to explore grades, subjects, chapters, and practice chapter-wise 10 MCQs tests with options and feedback.
                  </p>
                </div>
              </div>

              {/* Systems Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                {indexData.systems.map(sys => {
                  const theme = getSystemTheme(sys);
                  const totalClasses = sys.classes?.length || 0;
                  const totalSubjects = sys.classes?.reduce((sum, c) => sum + (c.subjects?.length || 0), 0);
                  const totalChapters = sys.classes?.reduce((sum, c) => 
                    sum + (c.subjects?.reduce((sSum, s) => sSum + s.chapterCount, 0) || 0), 0
                  );
                  const totalQuestions = sys.classes?.reduce((sum, c) => 
                    sum + (c.subjects?.reduce((sSum, s) => sSum + s.questionCount, 0) || 0), 0
                  );

                  return (
                    <article
                      key={sys.id}
                      onClick={() => handleSelectSystem(sys)}
                      className={`group relative rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 sm:p-5 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col justify-between space-y-4 overflow-hidden ${theme.glow}`}
                    >
                      {/* Decorative top gradient accent bar */}
                      <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${theme.gradient}`} />

                      <div className="space-y-3">
                        {/* Header icon + country flag pill + tag */}
                        <div className="flex items-start justify-between gap-2.5">
                          <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${theme.gradient} flex items-center justify-center shadow-md shadow-brand-500/20 group-hover:scale-105 transition-transform shrink-0`}>
                            {React.cloneElement(theme.icon, { className: 'w-5 h-5 text-white' })}
                          </div>
                          <div className="flex flex-col items-end gap-1">
                            <span className="px-2.5 py-0.5 rounded-lg text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-100 border border-slate-200 dark:border-slate-700 flex items-center gap-1.5 shadow-2xs">
                              <span className="text-sm leading-none">{sys.flag || theme.flag}</span>
                              <span className="text-[11px]">{sys.country || theme.country}</span>
                            </span>
                            <span className={`px-2 py-0.5 rounded-md text-[9px] font-black uppercase tracking-wider border ${theme.badgeBg}`}>
                              {totalClasses} {totalClasses === 1 ? 'Class' : 'Classes'}
                            </span>
                          </div>
                        </div>

                        <div>
                          <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block">
                            {theme.tag}
                          </span>
                          <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white mt-0.5 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors flex items-center gap-1.5">
                            <span>{sys.name}</span>
                          </h3>
                          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-snug line-clamp-2">
                            {theme.subtitle}
                          </p>
                        </div>

                        {/* Metric Counter Strip */}
                        <div className="grid grid-cols-3 gap-1.5 p-2 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800/80 text-center">
                          <div>
                            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Subjects</span>
                            <span className="text-xs font-black text-slate-900 dark:text-white mt-0.5 block">
                              {totalSubjects}
                            </span>
                          </div>
                          <div>
                            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Chapters</span>
                            <span className="text-xs font-black text-slate-900 dark:text-white mt-0.5 block">
                              {totalChapters}
                            </span>
                          </div>
                          <div>
                            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Total MCQs</span>
                            <span className="text-xs font-black text-brand-600 dark:text-brand-400 mt-0.5 block font-mono">
                              {totalQuestions.toLocaleString()}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Card Action Link */}
                      <div className="pt-2.5 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-bold">
                        <span className="text-slate-700 dark:text-slate-300 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                          Explore Curriculum
                        </span>
                        <span className="w-6 h-6 rounded-lg bg-slate-100 dark:bg-slate-800 group-hover:bg-brand-600 group-hover:text-white text-slate-600 dark:text-slate-300 flex items-center justify-center transition-all duration-300 group-hover:translate-x-1 shadow-2xs">
                          <ArrowRight className="w-3.5 h-3.5" />
                        </span>
                      </div>
                    </article>
                  );
                })}
              </div>
            </section>
          )}

          {/* ─────────────────────────────────────────────────────────────
              LEVEL 2: CLASS CARDS (WHEN SYSTEM IS CLICKED)
              ───────────────────────────────────────────────────────────── */}
          {selectedSystem && !selectedClass && (
            <section aria-labelledby="classes-heading" className="space-y-5 animate-fadeIn">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2.5">
                <div>
                  <button 
                    onClick={handleResetToSystems} 
                    className="inline-flex items-center gap-1.5 text-xs font-black text-brand-600 dark:text-brand-400 hover:underline mb-1"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Back to All Systems</span>
                  </button>
                  <h2 id="classes-heading" className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2">
                    <span>{selectedSystem.flag}</span>
                    <span>{selectedSystem.name}: Select Class / Grade</span>
                  </h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 max-w-xl">
                    Select your academic tier to view subjects and start chapter assessments.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-lg text-xs font-black bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-100 border border-slate-200 dark:border-slate-700 flex items-center gap-1">
                    <span>{selectedSystem.flag}</span>
                    <span>{selectedSystem.country}</span>
                  </span>
                  <div className="text-xs font-bold text-slate-400 bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-lg border border-slate-200 dark:border-slate-700">
                    {selectedSystem.classes?.length || 0} Academic Levels
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                {(selectedSystem.classes || []).map(cls => {
                  const subjectCount = cls.subjects?.length || 0;
                  const chapterCount = cls.subjects?.reduce((sum, s) => sum + s.chapterCount, 0) || 0;
                  const totalQuestions = cls.subjects?.reduce((sum, s) => sum + s.questionCount, 0) || 0;

                  return (
                    <article
                      key={cls.id}
                      onClick={() => handleSelectClass(cls)}
                      className="group relative p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-brand-500/60 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col justify-between space-y-4 overflow-hidden"
                    >
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 text-indigo-600 dark:text-indigo-400 flex items-center justify-center p-2.5 group-hover:scale-105 transition-transform shadow-2xs">
                            <GraduationCap className="w-5 h-5" />
                          </div>
                          <span className="px-2 py-0.5 rounded-lg text-xs font-bold flex items-center gap-1 bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-100 border border-slate-200 dark:border-slate-700 shadow-2xs">
                            <span className="text-sm leading-none">{cls.flag || selectedSystem.flag}</span>
                            <span>{cls.country || selectedSystem.country}</span>
                          </span>
                        </div>

                        <div>
                          <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors flex items-center gap-1.5">
                            <span>{cls.name}</span>
                          </h3>
                          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-2">
                            Curriculum standard containing comprehensive subjects and chapter tests.
                          </p>
                        </div>

                        {/* Metric Counter */}
                        <div className="grid grid-cols-2 gap-2 p-2 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 text-center">
                          <div>
                            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Subjects</span>
                            <span className="text-xs font-black text-slate-900 dark:text-white mt-0.5 block">
                              {subjectCount}
                            </span>
                          </div>
                          <div>
                            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Available MCQs</span>
                            <span className="text-xs font-black text-brand-600 dark:text-brand-400 mt-0.5 block font-mono">
                              {totalQuestions.toLocaleString()}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="pt-2.5 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300">
                        <span>{chapterCount} Chapters Ready</span>
                        <span className="text-brand-600 dark:text-brand-400 group-hover:translate-x-1 transition-transform flex items-center gap-1 font-black">
                          View Subjects →
                        </span>
                      </div>
                    </article>
                  );
                })}
              </div>
            </section>
          )}

          {/* ─────────────────────────────────────────────────────────────
              LEVEL 3: SUBJECTS (WHEN CLASS IS CLICKED)
              ───────────────────────────────────────────────────────────── */}
          {selectedClass && !selectedSubject && (
            <section aria-labelledby="subjects-heading" className="space-y-5 animate-fadeIn">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-3">
                <div>
                  <button 
                    onClick={() => setSelectedClass(null)} 
                    className="inline-flex items-center gap-1.5 text-xs font-black text-brand-600 dark:text-brand-400 hover:underline mb-1"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Back to Classes ({selectedSystem?.name})</span>
                  </button>
                  <h2 id="subjects-heading" className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2">
                    <span>{selectedClass.flag || selectedSystem?.flag}</span>
                    <span>{selectedClass.name} Subjects</span>
                  </h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 max-w-xl">
                    Select a subject to browse chapters and conduct standard 10 MCQs tests.
                  </p>
                </div>

                {/* Subject search bar with clear button */}
                <div className="relative max-w-sm w-full">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search subject by title..."
                    value={subjectSearch}
                    onChange={(e) => setSubjectSearch(e.target.value)}
                    className="w-full pl-9 pr-8 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs focus:outline-none focus:ring-2 focus:ring-brand-500 shadow-2xs"
                  />
                  {subjectSearch && (
                    <button
                      onClick={() => setSubjectSearch('')}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-white"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>

              {filteredSubjects.length === 0 ? (
                <div className="py-12 text-center bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 space-y-2">
                  <BookOpen className="w-10 h-10 text-slate-300 mx-auto" />
                  <h4 className="text-sm font-bold text-slate-800 dark:text-white">No Subjects Found</h4>
                  <p className="text-xs text-slate-500 max-w-sm mx-auto">
                    We could not find any subjects matching "{subjectSearch}".
                  </p>
                  <button onClick={() => setSubjectSearch('')} className="text-xs text-brand-600 font-bold hover:underline pt-1">
                    Reset Subject Search
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5 sm:gap-4">
                  {filteredSubjects.map(sub => {
                    const visuals = getSubjectVisuals(sub.name);

                    return (
                      <article
                        key={sub.id}
                        onClick={() => handleSelectSubject(sub)}
                        className="group relative p-3.5 sm:p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-brand-500 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 cursor-pointer flex flex-col justify-between space-y-3"
                      >
                        <div className="space-y-2.5">
                          <div className="flex items-center justify-between">
                            <div className="w-8 h-8 rounded-xl bg-brand-50 dark:bg-brand-950/60 border border-brand-200 dark:border-brand-800 text-brand-600 dark:text-brand-400 flex items-center justify-center font-bold group-hover:scale-105 transition-transform">
                              {visuals.icon}
                            </div>
                            <div className="flex items-center gap-1.5">
                              <span className="px-1.5 py-0.5 rounded text-xs font-bold border flex items-center gap-1 bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border-slate-200 dark:border-slate-700 shadow-2xs" title={sub.country || selectedSystem?.country}>
                                <span>{sub.flag || selectedSystem?.flag}</span>
                              </span>
                              <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold border ${visuals.badgeColor}`}>
                                {visuals.category}
                              </span>
                            </div>
                          </div>

                          <div>
                            <h3 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors line-clamp-1" title={sub.name}>
                              {sub.name}
                            </h3>
                            <span className="text-[10px] font-medium text-slate-400 block mt-0.5">
                              {sub.chapterCount} Chapters
                            </span>
                          </div>
                        </div>

                        <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-bold text-slate-500 dark:text-slate-400">
                          <span className="font-mono text-brand-600 dark:text-brand-400 text-xs">
                            {sub.questionCount} MCQs
                          </span>
                          <span className="text-brand-600 dark:text-brand-400 group-hover:translate-x-1 transition-transform flex items-center gap-1 font-black text-[11px]">
                            Take Test →
                          </span>
                        </div>
                      </article>
                    );
                  })}
                </div>
              )}
            </section>
          )}

          {/* ─────────────────────────────────────────────────────────────
              LEVEL 4: CHAPTER NO WITH TITLE (WHEN SUBJECT IS CLICKED)
              ───────────────────────────────────────────────────────────── */}
          {selectedSubject && (
            <section aria-labelledby="chapters-heading" className="space-y-5 animate-fadeIn">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-3">
                <div>
                  <button 
                    onClick={() => setSelectedSubject(null)} 
                    className="inline-flex items-center gap-1.5 text-xs font-black text-brand-600 dark:text-brand-400 hover:underline mb-1"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Back to Subjects ({selectedClass?.name})</span>
                  </button>
                  <h2 id="chapters-heading" className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2">
                    <span>{selectedSubject.flag || selectedSystem?.flag}</span>
                    <span>{selectedSubject.name}: Chapter Assessments</span>
                  </h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 max-w-xl">
                    Select a chapter to practice 10 MCQs with instant options feedback and explanations.
                  </p>
                </div>

                {/* Chapter search filter */}
                <div className="relative max-w-sm w-full">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search chapter title or number..."
                    value={chapterSearch}
                    onChange={(e) => setChapterSearch(e.target.value)}
                    className="w-full pl-9 pr-8 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs focus:outline-none focus:ring-2 focus:ring-brand-500 shadow-2xs"
                  />
                  {chapterSearch && (
                    <button
                      onClick={() => setChapterSearch('')}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-white"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>

              {filteredChapters.length === 0 ? (
                <div className="py-12 text-center bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 space-y-2">
                  <FileText className="w-10 h-10 text-slate-300 mx-auto" />
                  <h4 className="text-sm font-bold text-slate-800 dark:text-white">No Chapters Found</h4>
                  <p className="text-xs text-slate-500 max-w-sm mx-auto">
                    No chapters matching "{chapterSearch}".
                  </p>
                  <button onClick={() => setChapterSearch('')} className="text-xs text-brand-600 font-bold hover:underline pt-1">
                    Clear Chapter Search
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-4">
                  {filteredChapters.map(chap => (
                    <article
                      key={chap.no}
                      className="group p-3.5 sm:p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-brand-500/60 hover:shadow-md transition-all duration-300 flex flex-col justify-between space-y-3"
                    >
                      <div className="flex items-start gap-3">
                        {/* Styled Chapter Number Badge */}
                        <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-600 to-indigo-600 text-white font-black text-xs flex flex-col items-center justify-center shrink-0 shadow-sm shadow-brand-500/20 group-hover:scale-105 transition-transform">
                          <span className="text-[8px] uppercase tracking-wider font-extrabold opacity-80">CH</span>
                          <span className="leading-none">{chap.no < 10 ? `0${chap.no}` : chap.no}</span>
                        </div>

                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-1.5">
                            <span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-[9px] font-black uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1 border border-slate-200 dark:border-slate-700 shadow-2xs">
                              <span>{selectedSystem?.flag}</span>
                              <span>Chapter {chap.no}</span>
                            </span>
                            <span className="text-[10px] font-semibold text-slate-400">
                              {chap.count} MCQs
                            </span>
                          </div>

                          <h3 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white leading-snug mt-1 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors line-clamp-2">
                            {chap.title}
                          </h3>
                        </div>
                      </div>

                      {/* Card Bottom CTA Strip */}
                      <div className="pt-2.5 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2">
                        <div className="flex items-center gap-1 text-[10px] font-bold text-emerald-600 dark:text-emerald-400 truncate">
                          <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                          <span className="truncate">10 MCQs & Feedback</span>
                        </div>

                        <button
                          onClick={() => setActiveChapterForTest(chap)}
                          className="py-1.5 px-3 rounded-lg bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-700 hover:to-indigo-700 text-white font-black text-xs transition-all flex items-center gap-1.5 shadow-sm shadow-brand-500/25 shrink-0"
                        >
                          <Play className="w-3 h-3 fill-current" />
                          <span>Conduct Test</span>
                        </button>
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </section>
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
