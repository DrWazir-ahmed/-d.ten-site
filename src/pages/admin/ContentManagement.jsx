import React, { useState, useEffect } from 'react';
import { FileText, Plus, Search, Edit2, Trash2, X, Save, CheckCircle2 } from 'lucide-react';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { getContent, createContent, updateContent, deleteContent } from '../../services/firebaseService';
import { Badge } from '../../components/common/Badge';
import { RichTextarea } from '../../components/common/RichTextarea';

export const ContentManagement = () => {
  const [content, setContent] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [notice, setNotice] = useState('');

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    contentType: 'Study Notes',
    category: 'English',
    author: 'Dr Wazir Ahmed',
    thumbnail: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=600&q=80',
    membership: 'free',
    status: 'published',
    body: ''
  });

  const load = async () => {
    const data = await getContent();
    setContent(data);
  };

  useEffect(() => {
    load();
  }, []);

  const handleOpenAdd = () => {
    setEditingItem(null);
    setFormData({
      title: '',
      description: '',
      contentType: 'Study Notes',
      category: 'English',
      author: 'Dr Wazir Ahmed',
      thumbnail: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=600&q=80',
      membership: 'free',
      status: 'published',
      body: ''
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (item) => {
    setEditingItem(item);
    setFormData({
      title: item.title || '',
      description: item.description || '',
      contentType: item.contentType || 'Study Notes',
      category: item.category || 'English',
      author: item.author || '',
      thumbnail: item.thumbnail || '',
      membership: item.membership || 'free',
      status: item.status || 'published',
      body: item.body || ''
    });
    setModalOpen(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (editingItem) {
      await updateContent(editingItem.id, formData);
      setNotice(`Resource "${formData.title}" updated.`);
    } else {
      await createContent(formData);
      setNotice(`New resource "${formData.title}" published.`);
    }
    setModalOpen(false);
    await load();
    setTimeout(() => setNotice(''), 3000);
  };

  const handleDelete = async (id, title) => {
    if (window.confirm(`Delete content "${title}"?`)) {
      await deleteContent(id);
      setContent(content.filter(c => c.id !== id));
      setNotice(`Content "${title}" deleted.`);
      setTimeout(() => setNotice(''), 3000);
    }
  };

  const filteredContent = content.filter(c => 
    c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <DashboardLayout 
      title="Educational Content Management" 
      subtitle="Author, categorize, edit, and publish articles, study notes, worksheets, and PDFs."
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
              placeholder="Search guides & notes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 text-xs text-slate-900 dark:text-white"
            />
          </div>

          <button
            onClick={handleOpenAdd}
            className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs shadow-md transition flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" /> Add Article / Note
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredContent.map(item => (
            <div key={item.id} className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <Badge type={item.membership} size="xs" />
                  <span className="text-[10px] text-slate-400 font-bold uppercase">{item.contentType}</span>
                </div>
                <h4 className="font-bold text-base text-slate-900 dark:text-white mb-1">{item.title}</h4>
                <p className="text-xs text-slate-500 line-clamp-2">{item.description}</p>
                <div className="text-[11px] text-slate-400 mt-2">{item.category} • {item.author}</div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-end gap-2">
                <button
                  onClick={() => handleOpenEdit(item)}
                  className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 text-xs"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => handleDelete(item.id, item.title)}
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
            <div className="w-full max-w-2xl max-h-[90vh] bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-2xl flex flex-col overflow-hidden">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-lg">{editingItem ? 'Edit Resource' : 'Add New Content'}</h3>
                <button onClick={() => setModalOpen(false)}><X className="w-5 h-5 text-slate-400" /></button>
              </div>
              <form onSubmit={handleSave} className="flex-1 overflow-y-auto space-y-3 text-xs sm:text-sm">
                <div>
                  <label className="font-semibold block mb-1">Title</label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900"
                  />
                </div>
                <RichTextarea
                  label="Summary Description"
                  rows={2}
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Summary overview of the resource..."
                />
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="font-semibold block mb-1">Content Type</label>
                    <input
                      type="text"
                      value={formData.contentType}
                      onChange={(e) => setFormData({ ...formData, contentType: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900"
                    />
                  </div>
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
                    <label className="font-semibold block mb-1">Access Tier</label>
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
                <RichTextarea
                  label="Body Text / Study Material"
                  rows={6}
                  value={formData.body}
                  onChange={(e) => setFormData({ ...formData, body: e.target.value })}
                  placeholder="Enter complete educational guide text or study notes..."
                />
                <div className="flex justify-end gap-2 pt-3">
                  <button type="button" onClick={() => setModalOpen(false)} className="px-4 py-2 bg-slate-100 rounded-xl">Cancel</button>
                  <button type="submit" className="px-5 py-2 bg-amber-500 text-white font-bold rounded-xl">Save Content</button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </DashboardLayout>
  );
};
