import React, { useState, useEffect } from 'react';
import { Wrench, Plus, Search, Edit2, Trash2, X, CheckCircle2, ImageIcon } from 'lucide-react';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { getTools, createTool, updateTool, deleteTool } from '../../services/firebaseService';
import { Badge } from '../../components/common/Badge';
import { ThumbnailUpload } from '../../components/common/ThumbnailUpload';

export const ToolManagement = () => {
  const [tools, setTools] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingTool, setEditingTool] = useState(null);
  const [notice, setNotice] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: 'Calculators',
    thumbnail: '',
    url: '/tools',
    membership: 'free',
    status: 'published'
  });

  const load = async () => {
    const data = await getTools();
    setTools(data);
  };

  useEffect(() => {
    load();
  }, []);

  const handleOpenAdd = () => {
    setEditingTool(null);
    setFormData({
      name: '',
      description: '',
      category: 'Calculators',
      thumbnail: '',
      url: '/tools',
      membership: 'free',
      status: 'published'
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (t) => {
    setEditingTool(t);
    setFormData({
      name: t.name || '',
      description: t.description || '',
      category: t.category || 'Calculators',
      thumbnail: t.thumbnail || '',
      url: t.url || '/tools',
      membership: t.membership || 'free',
      status: t.status || 'published'
    });
    setModalOpen(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (editingTool) {
      await updateTool(editingTool.id, formData);
      setNotice(`Tool "${formData.name}" updated.`);
    } else {
      await createTool(formData);
      setNotice(`Tool "${formData.name}" added.`);
    }
    setModalOpen(false);
    await load();
    setTimeout(() => setNotice(''), 3000);
  };

  const handleDelete = async (id, name) => {
    if (window.confirm(`Delete tool "${name}"?`)) {
      await deleteTool(id);
      setTools(tools.filter(t => t.id !== id));
      setNotice(`Tool "${name}" deleted.`);
      setTimeout(() => setNotice(''), 3000);
    }
  };

  const filteredTools = tools.filter(t =>
    t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <DashboardLayout
      title="Educational Tool Management"
      subtitle="Manage calculators, generators, and learning planners."
    >
      <div className="space-y-6">
        {notice && (
          <div className="p-3.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-500/30 text-emerald-800 dark:text-emerald-200 text-xs font-bold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            <span>{notice}</span>
          </div>
        )}

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between gap-4">
          <div className="relative w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search tools..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 text-xs text-slate-900 dark:text-white"
            />
          </div>

          <button
            onClick={handleOpenAdd}
            className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" /> Add Tool
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredTools.map(t => (
            <div key={t.id} className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col overflow-hidden">
              {/* Thumbnail */}
              {t.thumbnail ? (
                <div className="w-full aspect-video bg-slate-100 dark:bg-slate-800 overflow-hidden">
                  <img
                    src={t.thumbnail}
                    alt={t.name}
                    className="w-full h-full object-cover"
                    onError={(e) => { e.target.style.display = 'none'; }}
                  />
                </div>
              ) : (
                <div className="w-full aspect-video bg-gradient-to-br from-emerald-50 to-teal-100 dark:from-emerald-950/40 dark:to-teal-950/40 flex items-center justify-center">
                  <Wrench className="w-8 h-8 text-emerald-300 dark:text-emerald-700" />
                </div>
              )}

              <div className="p-5 flex flex-col flex-1 justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <Badge type={t.membership} size="xs" />
                    <span className="text-[10px] text-slate-400 font-semibold">{t.category}</span>
                  </div>
                  <h4 className="font-bold text-base text-slate-900 dark:text-white mb-1">{t.name}</h4>
                  <p className="text-xs text-slate-500 line-clamp-2">{t.description}</p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-end gap-2">
                  <button
                    onClick={() => handleOpenEdit(t)}
                    className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 text-xs"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDelete(t.id, t.name)}
                    className="p-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-600 text-xs"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal */}
        {modalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
            <div className="w-full max-w-lg max-h-[92vh] bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-2xl flex flex-col overflow-hidden">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-lg">{editingTool ? 'Edit Tool' : 'Add New Tool'}</h3>
                <button onClick={() => setModalOpen(false)}><X className="w-5 h-5 text-slate-400" /></button>
              </div>
              <form onSubmit={handleSave} className="flex-1 overflow-y-auto space-y-4 text-xs sm:text-sm">
                <div>
                  <label className="font-semibold block mb-1">Tool Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900"
                  />
                </div>
                <div>
                  <label className="font-semibold block mb-1">Description</label>
                  <textarea
                    rows={2}
                    required
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-semibold block mb-1">Category</label>
                    <input
                      type="text"
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900"
                    />
                  </div>
                  <div>
                    <label className="font-semibold block mb-1">Tier</label>
                    <select
                      value={formData.membership}
                      onChange={(e) => setFormData({ ...formData, membership: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900"
                    >
                      <option value="free">Free</option>
                      <option value="premium">Premium</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="font-semibold block mb-1">Tool URL / Route</label>
                  <input
                    type="text"
                    value={formData.url}
                    onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono"
                  />
                </div>

                {/* Thumbnail Upload */}
                <ThumbnailUpload
                  label="Tool Thumbnail / Preview Image"
                  value={formData.thumbnail}
                  onChange={(val) => setFormData({ ...formData, thumbnail: val })}
                  placeholder="https://example.com/tool-preview.jpg"
                  aspectRatio="16/9"
                  maxSizeMB={2}
                />

                <div className="flex justify-end gap-2 pt-3">
                  <button type="button" onClick={() => setModalOpen(false)} className="px-4 py-2 bg-slate-100 rounded-xl">Cancel</button>
                  <button type="submit" className="px-5 py-2 bg-emerald-600 text-white font-bold rounded-xl">Save Tool</button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </DashboardLayout>
  );
};
