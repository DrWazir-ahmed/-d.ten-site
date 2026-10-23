import React, { useState, useEffect, useMemo, useRef } from 'react';
import { 
  ClipboardCheck, 
  Sparkles, 
  Search, 
  Clock, 
  HelpCircle, 
  Award, 
  CheckCircle2, 
  ShieldAlert, 
  GraduationCap, 
  HeartHandshake, 
  Code2, 
  Globe2, 
  Atom, 
  BrainCircuit, 
  Play, 
  X, 
  Filter, 
  Flame, 
  ArrowRight,
  Layers,
  BookOpen
} from 'lucide-react';
import { getTests } from '../../services/firebaseService';
import { getCurriculumIndex, searchCurriculumTests } from '../../services/curriculumService';
import { Badge } from '../../components/common/Badge';
import { useAuth } from '../../context/AuthContext';
import { PremiumGateModal } from '../../components/common/PremiumGateModal';
import { StandardTestPlayer } from '../../components/course/StandardTestPlayer';
import { CurriculumSystemExplorer } from '../../components/tests/CurriculumSystemExplorer';
import { ChapterTestModal } from '../../components/tests/ChapterTestModal';
import { useSEO } from '../../hooks/useSEO';

export const Tests = () => {
  const { isPremium } = useAuth();
  const [activeViewTab, setActiveViewTab] = useState('curriculum'); // 'curriculum' (default) or 'standalone'
  const [tests, setTests] = useState([]);
  const [curriculumIndex, setCurriculumIndex] = useState({ systems: [] });
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [instantSearchQuery, setInstantSearchQuery] = useState('');
  const [activeCurriculumTest, setActiveCurriculumTest] = useState(null);
  const searchContainerRef = useRef(null);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [membershipFilter, setMembershipFilter] = useState('all');

  const [activeTestModal, setActiveTestModal] = useState(null);
  const [gateOpen, setGateOpen] = useState(false);
  const [selectedResource, setSelectedResource] = useState('');

  // Primary categories requested by user
  const STANDARD_CATEGORIES = [
    'All',
    'Academic',
    'Life Skill',
    'Technical',
    'Current Affairs',
    'Everyday Science',
    'General & Aptitude',
    'Other'
  ];

  // Dynamic SEO when on standalone view
  useSEO(activeViewTab === 'standalone' ? {
    title: 'Standard Skill Tests & Assessments | D.TEN Academy',
    description: 'Explore comprehensive standard skill tests with instant evaluation, passing threshold metrics, and detailed question breakdowns.'
  } : {});

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const [testsData, curData] = await Promise.all([
          getTests(),
          getCurriculumIndex()
        ]);
        setTests(testsData || []);
        setCurriculumIndex(curData || { systems: [] });
      } catch (err) {
        console.error('Error loading standard tests or curriculum:', err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  // Close instant search dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target)) {
        setInstantSearchQuery('');
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Instant Curriculum Tests Search computation
  const curriculumSearchResults = useMemo(() => {
    if (!instantSearchQuery || instantSearchQuery.trim().length < 2) return [];
    return searchCurriculumTests(curriculumIndex.systems || [], instantSearchQuery, 50);
  }, [curriculumIndex.systems, instantSearchQuery]);

  const filteredTests = useMemo(() => {
    return tests.filter(test => {
      const q = searchTerm.toLowerCase();
      const matchesSearch = 
        (test.title || '').toLowerCase().includes(q) ||
        (test.description || '').toLowerCase().includes(q) ||
        (test.category || '').toLowerCase().includes(q);
      
      const matchesCat = 
        selectedCategory === 'All' 
          ? true 
          : selectedCategory === 'Other'
          ? !['Academic', 'Life Skill', 'Technical', 'Current Affairs', 'Everyday Science', 'General & Aptitude'].includes(test.category)
          : test.category === selectedCategory;

      const matchesDiff = selectedDifficulty === 'all' || (test.difficulty || '').toLowerCase() === selectedDifficulty.toLowerCase();
      const matchesMem = membershipFilter === 'all' || test.membership === membershipFilter;

      return matchesSearch && matchesCat && matchesDiff && matchesMem;
    });
  }, [tests, searchTerm, selectedCategory, selectedDifficulty, membershipFilter]);

  const handleLaunch = (test) => {
    if (test.membership === 'premium' && !isPremium) {
      setSelectedResource(test.title);
      setGateOpen(true);
      return;
    }
    setActiveTestModal(test);
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'Academic': return <GraduationCap className="w-5 h-5 text-indigo-500" />;
      case 'Life Skill': return <HeartHandshake className="w-5 h-5 text-emerald-500" />;
      case 'Technical': return <Code2 className="w-5 h-5 text-blue-500" />;
      case 'Current Affairs': return <Globe2 className="w-5 h-5 text-amber-500" />;
      case 'Everyday Science': return <Atom className="w-5 h-5 text-purple-500" />;
      case 'General & Aptitude': return <BrainCircuit className="w-5 h-5 text-teal-500" />;
      default: return <ClipboardCheck className="w-5 h-5 text-brand-500" />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6 animate-fadeIn">
      
      {/* ─────────────────────────────────────────────────────────────
          UNIFIED HALF-SIZE HEADER WITH INTEGRATED INSTANT TEST SEARCH
          ───────────────────────────────────────────────────────────── */}
      <header className="relative rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-3.5 sm:p-4 shadow-lg border border-slate-800">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          
          {/* Left: Branding & Core Meta */}
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 to-indigo-600 flex items-center justify-center shrink-0 shadow-md shadow-brand-500/20">
              <ClipboardCheck className="w-5 h-5 text-white" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-base sm:text-lg font-black tracking-tight text-white leading-tight">
                  Assessments & Tests Hub
                </h1>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 text-[10px] font-black uppercase tracking-wider">
                  62,900+ MCQs
                </span>
              </div>
              <p className="text-[11px] text-slate-300 truncate mt-0.5">
                Instant chapter tests across 🇬🇧 Cambridge &bull; 🇮🇳 CBSE &bull; 🇺🇸 US &bull; 🇵🇰 FBISE &bull; 🌐 Universal
              </p>
            </div>
          </div>

          {/* Right: Instant Search Bar (Finds tests instantly by country, class, subject) */}
          <div ref={searchContainerRef} className="relative w-full md:w-80 lg:w-96 shrink-0">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
              <input
                type="text"
                value={instantSearchQuery}
                onChange={(e) => setInstantSearchQuery(e.target.value)}
                placeholder="Search test by subject, class, unit..."
                className="w-full pl-9 pr-8 py-2 rounded-xl bg-white/10 hover:bg-white/15 focus:bg-slate-900 border border-white/15 focus:border-brand-500 text-xs text-white placeholder-slate-400 focus:outline-none transition shadow-inner"
              />
              {instantSearchQuery && (
                <button
                  onClick={() => setInstantSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white p-0.5"
                  title="Clear search"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Instant Search Results Dropdown Panel */}
            {instantSearchQuery.trim().length >= 2 && (
              <div className="absolute right-0 left-0 md:left-auto md:w-[480px] mt-2 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl z-50 max-h-[420px] overflow-y-auto p-2.5 space-y-2 animate-fadeIn text-slate-900 dark:text-slate-100">
                <div className="flex items-center justify-between px-2 py-1 border-b border-slate-100 dark:border-slate-800 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  <span>Found {curriculumSearchResults.length} {curriculumSearchResults.length === 1 ? 'Test' : 'Tests'}</span>
                  <button 
                    onClick={() => setInstantSearchQuery('')}
                    className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-xs font-semibold"
                  >
                    Close ✕
                  </button>
                </div>

                {curriculumSearchResults.length === 0 ? (
                  <div className="p-6 text-center text-xs text-slate-400 space-y-1">
                    <p className="font-bold text-slate-700 dark:text-slate-300">No matching tests found</p>
                    <p>Try searching for a subject like "Physics", "Math", "Tenses", "Biology" or a class like "Class 9".</p>
                  </div>
                ) : (
                  curriculumSearchResults.map((item) => (
                    <div
                      key={item.id}
                      className="group p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/70 hover:bg-brand-50/50 dark:hover:bg-brand-950/40 border border-slate-200/80 dark:border-slate-700/80 hover:border-brand-500/50 transition-all flex items-center justify-between gap-3"
                    >
                      <div className="min-w-0 flex-1 space-y-1">
                        {/* Meta Row: Country, Class, Subject */}
                        <div className="flex items-center gap-1.5 flex-wrap text-[10px] font-bold">
                          {/* Country */}
                          <span className="px-1.5 py-0.5 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 flex items-center gap-1 text-slate-700 dark:text-slate-300 shadow-2xs">
                            <span>{item.flag}</span>
                            <span>{item.country}</span>
                          </span>

                          {/* Class */}
                          <span className="px-1.5 py-0.5 rounded bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
                            {item.className}
                          </span>

                          {/* Subject */}
                          <span className="px-1.5 py-0.5 rounded bg-teal-50 dark:bg-teal-950/60 text-teal-700 dark:text-teal-300 border border-teal-200 dark:border-teal-800">
                            {item.subjectName}
                          </span>
                        </div>

                        {/* Chapter Title */}
                        <h4 className="text-xs font-bold text-slate-900 dark:text-white truncate group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                          Chapter {item.chapterNo}: {item.chapterTitle}
                        </h4>
                      </div>

                      {/* Instant Action: Take Test */}
                      <button
                        onClick={() => {
                          setActiveCurriculumTest({
                            system: item.system,
                            className: item.classItem,
                            subject: item.subject,
                            chapter: item.chapter
                          });
                          setInstantSearchQuery('');
                        }}
                        className="px-3 py-1.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-black text-xs transition shadow-sm hover:scale-105 shrink-0 flex items-center gap-1 cursor-pointer"
                      >
                        <Play className="w-3 h-3 fill-white" />
                        <span>Take Test</span>
                      </button>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        </div>

        {/* Integrated View Tabs Row */}
        <div className="mt-3 pt-2.5 border-t border-white/10 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 p-1 bg-black/20 rounded-xl border border-white/10">
            <button
              onClick={() => setActiveViewTab('curriculum')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
                activeViewTab === 'curriculum'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <Layers className="w-3.5 h-3.5 text-brand-600" />
              <span>Curriculum & Universal Systems</span>
              <span className="px-1.5 py-0.2 rounded-md bg-brand-500/10 text-brand-600 font-mono text-[10px]">
                62,900+
              </span>
            </button>

            <button
              onClick={() => setActiveViewTab('standalone')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
                activeViewTab === 'standalone'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>General & Standalone Tests</span>
            </button>
          </div>

          <div className="hidden sm:flex items-center gap-3 text-[11px] font-semibold text-slate-300">
            <span className="flex items-center gap-1 text-emerald-400">
              <CheckCircle2 className="w-3.5 h-3.5" /> Instant Feedback
            </span>
            <span className="flex items-center gap-1 text-cyan-400">
              <CheckCircle2 className="w-3.5 h-3.5" /> 10 MCQs Random Pool
            </span>
          </div>
        </div>
      </header>

      {/* VIEW 1: CURRICULUM SYSTEMS EXPLORER (Requested Excel Sheet1 Drill-Down) */}
      {activeViewTab === 'curriculum' ? (
        <CurriculumSystemExplorer />
      ) : (
        /* VIEW 2: GENERAL STANDALONE TESTS CATALOG */
        <div className="space-y-6 animate-fadeIn">
          {/* Filter and Search Bar */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-5 sm:p-6 shadow-sm space-y-5">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search tests by title, topic, or question keywords..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
              </div>

              <div className="flex items-center gap-2">
                <select
                  value={selectedDifficulty}
                  onChange={(e) => setSelectedDifficulty(e.target.value)}
                  className="px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500"
                >
                  <option value="all">All Difficulties</option>
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </select>

                <select
                  value={membershipFilter}
                  onChange={(e) => setMembershipFilter(e.target.value)}
                  className="px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500"
                >
                  <option value="all">All Access</option>
                  <option value="free">Free Only</option>
                  <option value="premium">Premium Only</option>
                </select>
              </div>
            </div>

            {/* Category Pill Filters */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
              {STANDARD_CATEGORIES.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                    selectedCategory === cat
                      ? 'bg-brand-600 text-white shadow-md shadow-brand-500/25'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Tests Grid */}
          {loading ? (
            <div className="py-20 text-center space-y-3">
              <div className="w-10 h-10 border-4 border-brand-500 border-t-transparent rounded-full animate-spin mx-auto" />
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Loading Standard Tests...</p>
            </div>
          ) : filteredTests.length === 0 ? (
            <div className="text-center py-16 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 space-y-3">
              <ClipboardCheck className="w-12 h-12 text-slate-300 mx-auto" />
              <h3 className="text-base font-bold text-slate-800 dark:text-white">No Tests Found</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Try adjusting your search keywords, category filters, or access permissions.
              </p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('All');
                  setSelectedDifficulty('all');
                  setMembershipFilter('all');
                }}
                className="text-xs font-bold text-brand-600 dark:text-brand-400 hover:underline pt-2"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTests.map((test) => {
                const isLocked = test.membership === 'premium' && !isPremium;
                const questionCount = (test.questions || []).length;
                const timeLimit = test.timeLimit || test.settings?.timeLimit || 0;
                const passingScore = test.passingScore || test.settings?.passingScore || 70;
                const negativeMarking = test.negativeMarking || test.settings?.negativeMarking || 0;

                return (
                  <div 
                    key={test.id}
                    className="group flex flex-col bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-lg hover:border-brand-500/40 transition-all duration-300"
                  >
                    {/* Thumbnail / Header Visual */}
                    <div className="relative h-32 w-full bg-slate-100 dark:bg-slate-800 overflow-hidden border-b border-slate-100 dark:border-slate-800">
                      {test.thumbnail ? (
                        <img 
                          src={test.thumbnail} 
                          alt={test.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                        />
                      ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center p-4 bg-gradient-to-br from-slate-100 via-indigo-50/50 to-brand-50/40 dark:from-slate-800 dark:via-slate-800/80 dark:to-brand-950/20">
                          <div className="w-10 h-10 rounded-xl bg-white dark:bg-slate-700 shadow-sm flex items-center justify-center text-brand-600 dark:text-brand-400 group-hover:scale-110 transition-transform">
                            {getCategoryIcon(test.category)}
                          </div>
                          <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 dark:text-slate-500 mt-1.5">
                            {test.category || 'Standard Test'}
                          </span>
                        </div>
                      )}

                      <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                        <span className="px-2 py-0.5 rounded-lg bg-white/95 dark:bg-slate-900/95 backdrop-blur-md text-[9px] font-black uppercase tracking-wider text-slate-800 dark:text-white border border-slate-200 dark:border-slate-700 flex items-center gap-1 shadow-xs">
                          {getCategoryIcon(test.category)}
                          {test.category || 'General'}
                        </span>
                        <span className="px-2 py-0.5 rounded-lg bg-white/95 dark:bg-slate-900/95 backdrop-blur-md text-[10px] font-bold text-slate-800 dark:text-white border border-slate-200 dark:border-slate-700 flex items-center gap-1 shadow-xs">
                          <span>{test.countryFlag || '🌐'}</span>
                          <span>{test.country || 'Global'}</span>
                        </span>
                        {test.difficulty && (
                          <span className="px-1.5 py-0.5 rounded-lg bg-slate-900/80 backdrop-blur-md text-[9px] font-bold uppercase text-white shadow-xs">
                            {test.difficulty}
                          </span>
                        )}
                      </div>

                      <div className="absolute top-2.5 right-2.5">
                        <Badge variant={test.membership === 'premium' ? 'warning' : 'success'}>
                          {test.membership === 'premium' ? 'Premium' : 'Free'}
                        </Badge>
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
                      <div className="space-y-1">
                        <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors line-clamp-1">
                          {test.title}
                        </h3>
                        <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                          {test.description || 'Comprehensive evaluation covering multiple question items.'}
                        </p>
                      </div>

                      {/* Standard Test Meta Metrics */}
                      <div className="grid grid-cols-3 gap-1.5 py-2 border-y border-slate-100 dark:border-slate-800 text-center">
                        <div>
                          <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Questions</span>
                          <span className="text-xs font-black text-slate-800 dark:text-slate-200 flex items-center justify-center gap-1 mt-0.5">
                            <HelpCircle className="w-3 h-3 text-brand-500" />
                            {questionCount}
                          </span>
                        </div>
                        <div>
                          <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Duration</span>
                          <span className="text-xs font-black text-slate-800 dark:text-slate-200 flex items-center justify-center gap-1 mt-0.5">
                            <Clock className="w-3 h-3 text-amber-500" />
                            {timeLimit > 0 ? `${timeLimit}m` : 'Untimed'}
                          </span>
                        </div>
                        <div>
                          <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Passing</span>
                          <span className="text-xs font-black text-slate-800 dark:text-slate-200 flex items-center justify-center gap-1 mt-0.5">
                            <Award className="w-3 h-3 text-emerald-500" />
                            {passingScore}%
                          </span>
                        </div>
                      </div>

                      {negativeMarking > 0 && (
                        <div className="flex items-center gap-1.5 text-[9px] font-bold text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 px-2 py-1 rounded-lg">
                          <ShieldAlert className="w-3 h-3" />
                          <span>-{negativeMarking} pt penalty for wrong answers</span>
                        </div>
                      )}

                      {/* Launch Action */}
                      <button
                        onClick={() => handleLaunch(test)}
                        className={`w-full py-2 px-3 rounded-xl text-xs font-black flex items-center justify-center gap-1.5 transition-all shadow-xs ${
                          isLocked
                            ? 'bg-amber-50 hover:bg-amber-100 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300 border border-amber-200 dark:border-amber-800'
                            : 'bg-brand-600 hover:bg-brand-700 text-white shadow-brand-500/20'
                        }`}
                      >
                        <Play className="w-3.5 h-3.5 fill-current" />
                        <span>{isLocked ? 'Unlock Assessment' : 'Take Test Now'}</span>
                        <ArrowRight className="w-3.5 h-3.5 ml-auto" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Standalone Interactive Test Modal Player */}
      {activeTestModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-sm p-3 sm:p-6 flex items-center justify-center animate-fadeIn">
          <div className="relative w-full max-w-4xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden max-h-[92vh] flex flex-col">
            <div className="px-5 py-3.5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50/80 dark:bg-slate-800/50">
              <div className="flex items-center gap-2.5 min-w-0">
                <span className="p-1.5 rounded-xl bg-brand-500/10 text-brand-600 dark:text-brand-400">
                  <ClipboardCheck className="w-5 h-5" />
                </span>
                <div className="min-w-0">
                  <h3 className="text-sm font-black text-slate-900 dark:text-white truncate">
                    {activeTestModal.title}
                  </h3>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                    {activeTestModal.category} &bull; Standard Assessment Player
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setActiveTestModal(null)}
                className="p-1.5 rounded-xl hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-400 hover:text-slate-600 dark:hover:text-white transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 sm:p-6 overflow-y-auto flex-1">
              <StandardTestPlayer
                testData={activeTestModal}
                isCourseContext={false}
                onClose={() => setActiveTestModal(null)}
              />
            </div>
          </div>
        </div>
      )}

      {/* Instant Search Direct Chapter Test Modal */}
      {activeCurriculumTest && (
        <ChapterTestModal
          isOpen={Boolean(activeCurriculumTest)}
          onClose={() => setActiveCurriculumTest(null)}
          system={activeCurriculumTest.system}
          className={activeCurriculumTest.className}
          subject={activeCurriculumTest.subject}
          chapter={activeCurriculumTest.chapter}
        />
      )}

      {/* Premium Gate Modal */}
      <PremiumGateModal
        isOpen={gateOpen}
        onClose={() => setGateOpen(false)}
        resourceName={selectedResource}
      />
    </div>
  );
};
