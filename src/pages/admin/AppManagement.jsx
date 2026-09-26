import React, { useState, useEffect } from 'react';
import { Layers, Plus, Search, Edit2, Trash2, X, Save, CheckCircle2 } from 'lucide-react';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { getApps, createApp, updateApp, deleteApp } from '../../services/firebaseService';
import { Badge } from '../../components/common/Badge';

export const AppManagement = () => {
  const [apps, setApps] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingApp, setEditingApp] = useState(null);
  const [notice, setNotice] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: 'Learning Apps',
    platform: 'Web / Mobile',
    icon: 'Sparkles',
    url: '/apps',
    membership: 'free',
    status: 'published'
  });

  const load = async () => {
    const data = await getApps();
    setApps(data);
  };

  useEffect(() => {
    load();
  }, []);

  const handleOpenAdd = () => {
    setEditingApp(null);
    setFormData({
      name: '',
      description: '',
      category: 'Learning Apps',
      platform: 'Web / Mobile',
      icon: 'Gamepad2',
      url: '/apps',
      membership: 'free',
      status: 'published'
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (app) => {
    setEditingApp(app);
    setFormData({
      name: app.name || '',
      description: app.description || '',
      category: app.category || 'Learning Apps',
      platform: app.platform || 'Web / Mobile',
      icon: app.icon || 'Gamepad2',
      url: app.url || '/apps',
      membership: app.membership || 'free',
      status: app.status || 'published'
    });
    setModalOpen(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (editingApp) {
      await updateApp(editingApp.id, formData);
      setNotice(`App "${formData.name}" updated.`);
    } else {
      await createApp(formData);
      setNotice(`App "${formData.name}" created.`);
    }
    setModalOpen(false);
    await load();
    setTimeout(() => setNotice(''), 3000);
  };

  const handleDelete = async (id, name) => {
    if (window.confirm(`Delete application "${name}"?`)) {
      await deleteApp(id);
      setApps(apps.filter(a => a.id !== id));
      setNotice(`App "${name}" deleted.`);
      setTimeout(() => setNotice(''), 3000);
    }
  };

  const filteredApps = apps.filter(a => 
    a.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    a.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <DashboardLayout 
      title="Learning App Management" 
      subtitle="Manage gamified and interactive applications in the platform catalog."
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
              placeholder="Search apps..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 text-xs text-slate-900 dark:text-white"
            />
          </div>

          <button
            onClick={handleOpenAdd}
            className="px-4 py-2 rounded-xl bg-purple hover:bg-purple/90 text-white font-bold text-xs shadow-md transition flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" /> Add Application
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredApps.map(a => (
            <div key={a.id} className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <Badge type={a.membership} size="xs" />
                  <span className="text-[10px] text-slate-400">{a.platform}</span>
                </div>
                <h4 className="font-bold text-base text-slate-900 dark:text-white mb-1">{a.name}</h4>
                <p className="text-xs text-slate-500 line-clamp-2">{a.description}</p>
                <div className="text-[11px] text-purple font-semibold mt-2">{a.category}</div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-end gap-2">
                <button
                  onClick={() => handleOpenEdit(a)}
                  className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 text-xs"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => handleDelete(a.id, a.name)}
                  className="p-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-600 text-xs"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Modal */}
        {modalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
            <div className="w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-2xl">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-lg">{editingApp ? 'Edit App' : 'Add New App'}</h3>
                <button onClick={() => setModalOpen(false)}><X className="w-5 h-5 text-slate-400" /></button>
              </div>
              <form onSubmit={handleSave} className="space-y-3 text-xs sm:text-sm">
                <div>
                  <label className="font-semibold block mb-1">App Name</label>
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
                <div className="flex justify-end gap-2 pt-3">
                  <button type="button" onClick={() => setModalOpen(false)} className="px-4 py-2 bg-slate-100 rounded-xl">Cancel</button>
                  <button type="submit" className="px-5 py-2 bg-purple text-white font-bold rounded-xl">Save App</button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </DashboardLayout>
  );
};
