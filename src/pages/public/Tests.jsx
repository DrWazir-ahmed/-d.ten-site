import React, { useState, useEffect, useMemo } from 'react';
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
import { Badge } from '../../components/common/Badge';
import { useAuth } from '../../context/AuthContext';
import { PremiumGateModal } from '../../components/common/PremiumGateModal';
import { StandardTestPlayer } from '../../components/course/StandardTestPlayer';
import { CurriculumSystemExplorer } from '../../components/tests/CurriculumSystemExplorer';
import { useSEO } from '../../hooks/useSEO';

export const Tests = () => {
  const { isPremium } = useAuth();
  const [activeViewTab, setActiveViewTab] = useState('curriculum'); // 'curriculum' (default) or 'standalone'
  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
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
        const data = await getTests();
        setTests(data || []);
      } catch (err) {
        console.error('Error loading standard tests:', err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 animate-fadeIn">
      
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-brand-900 via-indigo-950 to-slate-900 text-white p-8 sm:p-12 shadow-2xl border border-brand-800/50">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-80 h-80 rounded-full bg-brand-500/10 blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-brand-300 text-xs font-black uppercase tracking-wider border border-white/10">
            <ClipboardCheck className="w-4 h-4 text-brand-400" />
            Standard Testing & Evaluation System
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
            Comprehensive Tests & Skill Assessments
          </h1>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl">
            Take chapter-wise 10 MCQs tests with options & feedback across Cambridge (UK 🇬🇧), India CBSE (🇮🇳), US High School (🇺🇸), and Pakistan FBISE (🇵🇰: Matric, English, Math), 
            or practice general standardized skill assessments.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2 text-xs font-bold text-slate-300">
            <span className="flex items-center gap-1.5 bg-black/30 px-3 py-1.5 rounded-xl border border-white/5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" /> 62,900+ Standard MCQs
            </span>
            <span className="flex items-center gap-1.5 bg-black/30 px-3 py-1.5 rounded-xl border border-white/5">
              <CheckCircle2 className="w-4 h-4 text-cyan-400" /> 10 MCQs Chapter Tests
            </span>
            <span className="flex items-center gap-1.5 bg-black/30 px-3 py-1.5 rounded-xl border border-white/5">
              <CheckCircle2 className="w-4 h-4 text-purple-400" /> Instant Options & Explanations
            </span>
            <span className="flex items-center gap-1.5 bg-black/30 px-3 py-1.5 rounded-xl border border-white/5">
              <CheckCircle2 className="w-4 h-4 text-amber-400" /> Automated Scoring & History
            </span>
          </div>
        </div>
      </div>

      {/* Main Testing System Switcher Tabs */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 p-2 bg-slate-100 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button
            onClick={() => setActiveViewTab('curriculum')}
            className={`flex-1 sm:flex-none py-2.5 px-5 rounded-xl font-black text-xs sm:text-sm transition flex items-center justify-center gap-2 ${
              activeViewTab === 'curriculum'
                ? 'bg-white dark:bg-slate-900 text-brand-600 dark:text-brand-400 shadow-sm border border-slate-200/60 dark:border-slate-700'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Curriculum Systems (🇬🇧 Cambridge &bull; 🇮🇳 CBSE &bull; 🇺🇸 US &bull; 🇵🇰 FBISE)</span>
            <span className="px-2 py-0.5 rounded-md bg-brand-500/10 text-brand-600 dark:text-brand-400 font-mono text-[10px]">
              62,900+ MCQs
            </span>
          </button>

          <button
            onClick={() => setActiveViewTab('standalone')}
            className={`flex-1 sm:flex-none py-2.5 px-5 rounded-xl font-black text-xs sm:text-sm transition flex items-center justify-center gap-2 ${
              activeViewTab === 'standalone'
                ? 'bg-white dark:bg-slate-900 text-brand-600 dark:text-brand-400 shadow-sm border border-slate-200/60 dark:border-slate-700'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>General & Standalone Tests</span>
          </button>
        </div>
      </div>

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
                    className="group flex flex-col bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-xl hover:border-brand-500/40 transition-all duration-300"
                  >
                    {/* Thumbnail / Header Visual */}
                    <div className="relative h-44 w-full bg-slate-100 dark:bg-slate-800 overflow-hidden border-b border-slate-100 dark:border-slate-800">
                      {test.thumbnail ? (
                        <img 
                          src={test.thumbnail} 
                          alt={test.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                        />
                      ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center p-6 bg-gradient-to-br from-slate-100 via-indigo-50/50 to-brand-50/40 dark:from-slate-800 dark:via-slate-800/80 dark:to-brand-950/20">
                          <div className="w-14 h-14 rounded-2xl bg-white dark:bg-slate-700 shadow-md flex items-center justify-center text-brand-600 dark:text-brand-400 group-hover:scale-110 transition-transform">
                            {getCategoryIcon(test.category)}
                          </div>
                          <span className="text-[11px] font-black uppercase tracking-wider text-slate-400 dark:text-slate-500 mt-2">
                            {test.category || 'Standard Test'}
                          </span>
                        </div>
                      )}

                      <div className="absolute top-3 left-3 flex items-center gap-1.5">
                        <span className="px-2.5 py-1 rounded-xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-md text-[10px] font-black uppercase tracking-wider text-slate-800 dark:text-white border border-slate-200 dark:border-slate-700 flex items-center gap-1 shadow-sm">
                          {getCategoryIcon(test.category)}
                          {test.category || 'General'}
                        </span>
                        <span className="px-2 py-0.5 rounded-xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-md text-xs font-bold text-slate-800 dark:text-white border border-slate-200 dark:border-slate-700 flex items-center gap-1 shadow-sm">
                          <span>{test.countryFlag || '🌐'}</span>
                          <span className="text-[10px] font-bold">{test.country || 'Global'}</span>
                        </span>
                        {test.difficulty && (
                          <span className="px-2 py-1 rounded-xl bg-slate-900/80 backdrop-blur-md text-[10px] font-bold uppercase text-white shadow-sm">
                            {test.difficulty}
                          </span>
                        )}
                      </div>

                      <div className="absolute top-3 right-3">
                        <Badge variant={test.membership === 'premium' ? 'warning' : 'success'}>
                          {test.membership === 'premium' ? 'Premium' : 'Free'}
                        </Badge>
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
                      <div className="space-y-2">
                        <h3 className="font-black text-lg text-slate-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors line-clamp-1">
                          {test.title}
                        </h3>
                        <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                          {test.description || 'Comprehensive evaluation covering multiple question items.'}
                        </p>
                      </div>

                      {/* Standard Test Meta Metrics */}
                      <div className="grid grid-cols-3 gap-2 py-3 border-y border-slate-100 dark:border-slate-800 text-center">
                        <div>
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Questions</span>
                          <span className="text-xs font-black text-slate-800 dark:text-slate-200 flex items-center justify-center gap-1 mt-0.5">
                            <HelpCircle className="w-3.5 h-3.5 text-brand-500" />
                            {questionCount}
                          </span>
                        </div>
                        <div>
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Duration</span>
                          <span className="text-xs font-black text-slate-800 dark:text-slate-200 flex items-center justify-center gap-1 mt-0.5">
                            <Clock className="w-3.5 h-3.5 text-amber-500" />
                            {timeLimit > 0 ? `${timeLimit}m` : 'Untimed'}
                          </span>
                        </div>
                        <div>
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Passing</span>
                          <span className="text-xs font-black text-slate-800 dark:text-slate-200 flex items-center justify-center gap-1 mt-0.5">
                            <Award className="w-3.5 h-3.5 text-emerald-500" />
                            {passingScore}%
                          </span>
                        </div>
                      </div>

                      {negativeMarking > 0 && (
                        <div className="flex items-center gap-1.5 text-[10px] font-bold text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 px-2.5 py-1 rounded-lg">
                          <ShieldAlert className="w-3 h-3" />
                          <span>Negative marking of -{negativeMarking} pt per incorrect answer</span>
                        </div>
                      )}

                      {/* Launch Action */}
                      <button
                        onClick={() => handleLaunch(test)}
                        className={`w-full py-2.5 px-4 rounded-xl text-xs font-black flex items-center justify-center gap-2 transition-all shadow-sm ${
                          isLocked
                            ? 'bg-amber-50 hover:bg-amber-100 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300 border border-amber-200 dark:border-amber-800'
                            : 'bg-brand-600 hover:bg-brand-700 text-white shadow-brand-500/20 hover:shadow-brand-500/30'
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

      {/* Premium Gate Modal */}
      <PremiumGateModal
        isOpen={gateOpen}
        onClose={() => setGateOpen(false)}
        resourceName={selectedResource}
      />
    </div>
  );
};
