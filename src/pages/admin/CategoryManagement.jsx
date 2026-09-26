import React, { useState, useEffect } from 'react';
import { FolderTree, Plus, Trash2, Save, CheckCircle2 } from 'lucide-react';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { getCategories, updateCategories } from '../../services/firebaseService';

export const CategoryManagement = () => {
  const [categories, setCategories] = useState({
    courses: [],
    apps: [],
    tools: [],
    content: []
  });

  const [newCatInputs, setNewCatInputs] = useState({
    courses: '',
    apps: '',
    tools: '',
    content: ''
  });

  const [notice, setNotice] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const data = await getCategories();
      setCategories(data);
      setLoading(false);
    };
    load();
  }, []);

  const handleAdd = async (section) => {
    const val = newCatInputs[section].trim();
    if (!val) return;
    if (categories[section].includes(val)) {
      alert("Category already exists in this section.");
      return;
    }

    const updated = {
      ...categories,
      [section]: [...categories[section], val]
    };

    setCategories(updated);
    setNewCatInputs({ ...newCatInputs, [section]: '' });
    await updateCategories(updated);
    setNotice(`Added category "${val}" to ${section}.`);
    setTimeout(() => setNotice(''), 2500);
  };

  const handleRemove = async (section, catName) => {
    const updated = {
      ...categories,
      [section]: categories[section].filter(c => c !== catName)
    };
    setCategories(updated);
    await updateCategories(updated);
    setNotice(`Removed category "${catName}".`);
    setTimeout(() => setNotice(''), 2500);
  };

  const sections = [
    { key: 'courses', title: 'Course Categories', color: 'brand' },
    { key: 'apps', title: 'App Categories', color: 'purple' },
    { key: 'tools', title: 'Tool Categories', color: 'emerald' },
    { key: 'content', title: 'Educational Content Categories', color: 'amber' }
  ];

  return (
    <DashboardLayout 
      title="Category Management" 
      subtitle="Edit and customize taxonomy categories for courses, apps, tools, and content."
    >
      <div className="space-y-6">
        
        {notice && (
          <div className="p-3.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-500/30 text-emerald-800 dark:text-emerald-200 text-xs font-bold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            <span>{notice}</span>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {sections.map(sec => (
            <div 
              key={sec.key} 
              className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4"
            >
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                  <FolderTree className="w-4 h-4 text-brand-600" /> {sec.title}
                </h3>
                <span className="text-xs text-slate-400 font-semibold">
                  {categories[sec.key]?.length || 0} Categories
                </span>
              </div>

              {/* Add Input */}
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="New category name..."
                  value={newCatInputs[sec.key]}
                  onChange={(e) => setNewCatInputs({ ...newCatInputs, [sec.key]: e.target.value })}
                  onKeyDown={(e) => { if (e.key === 'Enter') handleAdd(sec.key); }}
                  className="flex-1 px-3 py-1.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 text-xs text-slate-900 dark:text-white"
                />
                <button
                  onClick={() => handleAdd(sec.key)}
                  className="px-3.5 py-1.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs flex items-center gap-1 shadow-sm transition"
                >
                  <Plus className="w-3.5 h-3.5" /> Add
                </button>
              </div>

              {/* Tags List */}
              <div className="flex flex-wrap gap-2 pt-2">
                {categories[sec.key]?.map((cat, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold border border-slate-200/80 dark:border-slate-700"
                  >
                    <span>{cat}</span>
                    <button
                      onClick={() => handleRemove(sec.key, cat)}
                      className="p-0.5 hover:text-rose-500 rounded transition"
                      title="Remove"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </DashboardLayout>
  );
};
