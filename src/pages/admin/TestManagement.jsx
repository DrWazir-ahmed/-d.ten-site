import React, { useState, useEffect, useMemo } from 'react';
import { 
  ClipboardCheck, 
  Plus, 
  Search, 
  Edit2, 
  Trash2, 
  X, 
  CheckCircle2, 
  Play, 
  Clock, 
  HelpCircle, 
  Award, 
  GraduationCap, 
  HeartHandshake, 
  Code2, 
  Globe2, 
  Atom, 
  BrainCircuit,
  Eye,
  Sparkles
} from 'lucide-react';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { getTests, createTest, updateTest, deleteTest } from '../../services/firebaseService';
import { Badge } from '../../components/common/Badge';
import { TestBuilderModal } from '../../components/course/TestBuilderModal';
import { StandardTestPlayer } from '../../components/course/StandardTestPlayer';

export const TestManagement = () => {
  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [builderOpen, setBuilderOpen] = useState(false);
  const [editingTest, setEditingTest] = useState(null);
  const [previewTest, setPreviewTest] = useState(null);
  const [notice, setNotice] = useState('');

  const CATEGORIES = [
    'All',
    'Academic',
    'Life Skill',
    'Technical',
    'Current Affairs',
    'Everyday Science',
    'General & Aptitude',
    'Other'
  ];

  const loadData = async () => {
    setLoading(true);
    try {
      const data = await getTests();
      setTests(data || []);
    } catch (err) {
      console.error('Error fetching tests:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleOpenCreate = () => {
    setEditingTest(null);
    setBuilderOpen(true);
  };

  const handleOpenEdit = (test) => {
    setEditingTest(test);
    setBuilderOpen(true);
  };

  const handleSaveTest = async (savedData) => {
    try {
      if (editingTest && editingTest.id) {
        await updateTest(editingTest.id, {
          ...editingTest,
          ...savedData,
          updatedAt: new Date().toISOString()
        });
        setNotice(`Test "${savedData.title}" updated successfully.`);
      } else {
        await createTest({
          ...savedData,
          status: savedData.status || 'published',
          membership: savedData.membership || 'free',
          createdAt: new Date().toISOString()
        });
        setNotice(`New test "${savedData.title}" created successfully.`);
      }
      setBuilderOpen(false);
      setEditingTest(null);
      await loadData();
      setTimeout(() => setNotice(''), 3500);
    } catch (err) {
      console.error('Failed to save test:', err);
      alert('Error saving test: ' + err.message);
    }
  };

  const handleDelete = async (id, title) => {
    if (window.confirm(`Are you sure you want to permanently delete the test "${title}"?`)) {
      try {
        await deleteTest(id);
        setTests(tests.filter(t => t.id !== id));
        setNotice(`Test "${title}" deleted.`);
        setTimeout(() => setNotice(''), 3000);
      } catch (err) {
        console.error('Failed to delete test:', err);
        alert('Error deleting test.');
      }
    }
  };

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

      return matchesSearch && matchesCat;
    });
  }, [tests, searchTerm, selectedCategory]);

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'Academic': return <GraduationCap className="w-4 h-4 text-indigo-500" />;
      case 'Life Skill': return <HeartHandshake className="w-4 h-4 text-emerald-500" />;
      case 'Technical': return <Code2 className="w-4 h-4 text-blue-500" />;
      case 'Current Affairs': return <Globe2 className="w-4 h-4 text-amber-500" />;
      case 'Everyday Science': return <Atom className="w-4 h-4 text-purple-500" />;
      case 'General & Aptitude': return <BrainCircuit className="w-4 h-4 text-teal-500" />;
      default: return <ClipboardCheck className="w-4 h-4 text-brand-500" />;
    }
  };

  return (
    <DashboardLayout
      title="Standard Tests & Assessments"
      subtitle="Create, configure, and manage comprehensive tests across all platform subject categories."
    >
      <div className="space-y-6">
        
        {/* Toast / Notification Notice */}
        {notice && (
          <div className="flex items-center gap-2 p-4 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-500/30 text-emerald-800 dark:text-emerald-200 rounded-2xl text-xs font-bold animate-fadeIn">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{notice}</span>
          </div>
        )}

        {/* Action Header & Filtering */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-4 sm:p-5 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
          
          {/* Search bar */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search tests by title or subject..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleOpenCreate}
              className="py-2.5 px-4 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-black text-xs sm:text-sm shadow-md shadow-brand-500/25 transition-all flex items-center justify-center gap-2 whitespace-nowrap"
            >
              <Plus className="w-4 h-4" />
              <span>Create New Test</span>
            </button>
          </div>
        </div>

        {/* Categories Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                selectedCategory === cat
                  ? 'bg-brand-600 text-white shadow-sm'
                  : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Tests Table */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50/75 dark:bg-slate-800/50 text-[11px] font-black text-slate-400 uppercase tracking-wider">
                  <th className="py-4 px-5">Test Details</th>
                  <th className="py-4 px-4">Category</th>
                  <th className="py-4 px-4 text-center">Questions</th>
                  <th className="py-4 px-4 text-center">Time Limit</th>
                  <th className="py-4 px-4 text-center">Passing</th>
                  <th className="py-4 px-4 text-center">Access</th>
                  <th className="py-4 px-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-xs">
                {loading ? (
                  <tr>
                    <td colSpan="7" className="py-12 text-center text-slate-400 font-bold">
                      Loading tests...
                    </td>
                  </tr>
                ) : filteredTests.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="py-12 text-center text-slate-400">
                      No tests found matching your criteria.
                    </td>
                  </tr>
                ) : (
                  filteredTests.map((test) => {
                    const qCount = (test.questions || []).length;
                    const time = test.timeLimit || test.settings?.timeLimit || 0;
                    const pass = test.passingScore || test.settings?.passingScore || 70;
                    
                    return (
                      <tr 
                        key={test.id} 
                        className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40 transition-colors"
                      >
                        {/* Test Info */}
                        <td className="py-4 px-5">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center shrink-0 overflow-hidden">
                              {test.thumbnail ? (
                                <img src={test.thumbnail} alt="" className="w-full h-full object-cover" />
                              ) : (
                                getCategoryIcon(test.category)
                              )}
                            </div>
                            <div className="min-w-0">
                              <h4 className="font-bold text-slate-900 dark:text-white truncate max-w-xs sm:max-w-md">
                                {test.title}
                              </h4>
                              <p className="text-[11px] text-slate-400 truncate max-w-xs">
                                {test.description || 'Standardized evaluation module'}
                              </p>
                            </div>
                          </div>
                        </td>

                        {/* Category */}
                        <td className="py-4 px-4 whitespace-nowrap">
                          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-[11px]">
                            {getCategoryIcon(test.category)}
                            <span>{test.category || 'General'}</span>
                          </div>
                        </td>

                        {/* Questions Count */}
                        <td className="py-4 px-4 text-center font-bold text-slate-700 dark:text-slate-300">
                          <span className="inline-flex items-center gap-1">
                            <HelpCircle className="w-3.5 h-3.5 text-brand-500" />
                            {qCount}
                          </span>
                        </td>

                        {/* Time Limit */}
                        <td className="py-4 px-4 text-center font-bold text-slate-700 dark:text-slate-300 whitespace-nowrap">
                          <span className="inline-flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5 text-amber-500" />
                            {time > 0 ? `${time} mins` : 'Untimed'}
                          </span>
                        </td>

                        {/* Passing Score */}
                        <td className="py-4 px-4 text-center font-bold text-slate-700 dark:text-slate-300 whitespace-nowrap">
                          <span className="inline-flex items-center gap-1">
                            <Award className="w-3.5 h-3.5 text-emerald-500" />
                            {pass}%
                          </span>
                        </td>

                        {/* Membership Access */}
                        <td className="py-4 px-4 text-center whitespace-nowrap">
                          <Badge variant={test.membership === 'premium' ? 'warning' : 'success'}>
                            {test.membership === 'premium' ? 'Premium' : 'Free'}
                          </Badge>
                        </td>

                        {/* Actions */}
                        <td className="py-4 px-5 text-right whitespace-nowrap">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => setPreviewTest(test)}
                              className="p-2 rounded-xl text-slate-500 hover:text-brand-600 hover:bg-brand-50 dark:hover:bg-brand-950/40 transition"
                              title="Preview / Take Test"
                            >
                              <Play className="w-4 h-4 fill-current" />
                            </button>
                            <button
                              onClick={() => handleOpenEdit(test)}
                              className="p-2 rounded-xl text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 transition"
                              title="Edit Test & Questions"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDelete(test.id, test.title)}
                              className="p-2 rounded-xl text-slate-500 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition"
                              title="Delete Test"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Test Builder Studio Modal */}
      {builderOpen && (
        <TestBuilderModal
          isOpen={builderOpen}
          onClose={() => {
            setBuilderOpen(false);
            setEditingTest(null);
          }}
          onSave={handleSaveTest}
          initialTest={editingTest}
        />
      )}

      {/* Live Test Preview Modal */}
      {previewTest && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-sm p-3 sm:p-6 flex items-center justify-center animate-fadeIn">
          <div className="relative w-full max-w-4xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden max-h-[92vh] flex flex-col">
            
            <div className="px-5 py-3.5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50/80 dark:bg-slate-800/50">
              <div className="flex items-center gap-2.5">
                <span className="p-1.5 rounded-xl bg-brand-500/10 text-brand-600 dark:text-brand-400">
                  <ClipboardCheck className="w-5 h-5" />
                </span>
                <div>
                  <h3 className="text-sm font-black text-slate-900 dark:text-white">
                    {previewTest.title}
                  </h3>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                    {previewTest.category} &bull; Administrative Test Runner Preview
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setPreviewTest(null)}
                className="p-1.5 rounded-xl hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-400 hover:text-slate-600 dark:hover:text-white transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 sm:p-6 overflow-y-auto flex-1">
              <StandardTestPlayer
                testData={previewTest}
                isCourseContext={false}
                onClose={() => setPreviewTest(null)}
              />
            </div>
          </div>
        </div>
      )}

    </DashboardLayout>
  );
};

export default TestManagement;
