import React, { useState, useEffect } from 'react';
import { 
  FileText, 
  Plus, 
  Search, 
  Edit2, 
  Trash2, 
  X, 
  Save, 
  CheckCircle2, 
  ImageIcon, 
  Sparkles, 
  AlertCircle, 
  Check,
  Presentation,
  Upload,
  Play
} from 'lucide-react';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { getContent, createContent, updateContent, deleteContent, approveContent } from '../../services/firebaseService';
import { Badge } from '../../components/common/Badge';
import { RichTextarea } from '../../components/common/RichTextarea';
import { ThumbnailUpload } from '../../components/common/ThumbnailUpload';
import { PresentationRunner } from '../../components/common/PresentationRunner';
import { parsePptxFile } from '../../utils/pptxParser';
import { savePresentationDeck, getPresentationDeck } from '../../utils/presentationStorage';
import { useAuth } from '../../context/AuthContext';

export const ContentManagement = () => {
  const { currentUser, userProfile, isAdmin, isSuperAdmin, isCourseCreator } = useAuth();

  const [content, setContent] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [notice, setNotice] = useState('');
  const [previewPresentation, setPreviewPresentation] = useState(null);
  const [uploadingPptx, setUploadingPptx] = useState(false);
  const [editingSlideIdx, setEditingSlideIdx] = useState(null);
  const uploadedFileBlobRef = useRef(null);

  const defaultThumbnail = '';

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    contentType: 'Study Notes',
    category: 'English',
    author: 'Dr Wazir Ahmed',
    thumbnail: defaultThumbnail,
    membership: 'free',
    status: 'published',
    body: '',
    isPresentation: false,
    format: 'pptx',
    slideCount: 0,
    presentationData: null,
    presentationUrl: ''
  });

  const load = async () => {
    const data = await getContent();
    setContent(data);
  };

  useEffect(() => {
    load();
  }, []);

  const isOwner = (item) => {
    if (!item) return false;
    if (isAdmin) return true;
    return (
      item.creatorId === currentUser?.uid ||
      item.creatorEmail === userProfile?.email ||
      (userProfile?.name && item.author?.toLowerCase() === userProfile?.name?.toLowerCase())
    );
  };

  const handleOpenAdd = () => {
    setEditingItem(null);
    setFormData({
      title: '',
      description: '',
      contentType: 'Study Notes',
      category: 'English',
      author: isCourseCreator && !isAdmin ? (userProfile?.name || 'Course Creator') : 'Dr Wazir Ahmed',
      thumbnail: defaultThumbnail,
      membership: 'free',
      status: isCourseCreator && !isAdmin ? 'pending_approval' : 'published',
      body: '',
      isPresentation: false,
      format: 'pptx',
      slideCount: 0,
      presentationData: null,
      presentationUrl: ''
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (item) => {
    if (isCourseCreator && !isAdmin && !isOwner(item)) {
      setNotice('Access Denied: You can only edit content you authored.');
      setTimeout(() => setNotice(''), 3000);
      return;
    }
    setEditingItem(item);
    setFormData({
      title: item.title || '',
      description: item.description || '',
      contentType: item.contentType || 'Study Notes',
      category: item.category || 'English',
      author: item.author || (isCourseCreator && !isAdmin ? (userProfile?.name || '') : 'Dr Wazir Ahmed'),
      thumbnail: item.thumbnail || '',
      membership: item.membership || 'free',
      status: item.status || 'published',
      body: item.body || '',
      isPresentation: item.contentType === 'Presentation' || item.isPresentation || Boolean(item.presentationData),
      format: item.format || 'pptx',
      slideCount: item.slideCount || item.presentationData?.slides?.length || 0,
      presentationData: item.presentationData || null,
      presentationUrl: item.presentationUrl || ''
    });
    if (item.contentType === 'Presentation' || item.isPresentation) {
      getPresentationDeck(item.id).then(cached => {
        if (cached?.deckData?.slides?.length > 0) {
          setFormData(prev => ({
            ...prev,
            presentationData: cached.deckData
          }));
        }
      });
    }
    setModalOpen(true);
  };

  const handlePptxUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    uploadedFileBlobRef.current = file;
    setUploadingPptx(true);
    try {
      const result = await parsePptxFile(file);
      if (result.success && result.slides?.length > 0) {
        setFormData(prev => ({
          ...prev,
          contentType: 'Presentation',
          isPresentation: true,
          format: result.format || 'pptx',
          slideCount: result.totalSlides,
          title: prev.title || result.title || file.name.replace(/\.[^/.]+$/, ''),
          description: prev.description || `Interactive PowerPoint presentation containing ${result.totalSlides} slides.`,
          presentationData: {
            title: result.title || file.name.replace(/\.[^/.]+$/, ''),
            author: prev.author || 'Dr Wazir Ahmed',
            format: result.format || 'pptx',
            slideCount: result.totalSlides,
            aspectRatio: result.aspectRatio || '16:9',
            slides: result.slides
          }
        }));
        setNotice(`✅ Successfully parsed "${file.name}": ${result.totalSlides} slides extracted!`);
        setTimeout(() => setNotice(''), 4500);
      } else {
        alert(result.error || 'Failed to parse PPTX file. Ensure it is a valid PowerPoint file.');
      }
    } catch (err) {
      alert(`Error reading file: ${err.message}`);
    } finally {
      setUploadingPptx(false);
      e.target.value = '';
    }
  };

  // Slide Deck Management Helpers
  const handleAddSlide = () => {
    const currentSlides = formData.presentationData?.slides || [];
    const newSlideNum = currentSlides.length + 1;
    const newSlide = {
      id: newSlideNum,
      slideNumber: newSlideNum,
      layout: 'content',
      title: `Slide ${newSlideNum}: New Academic Unit`,
      subtitle: 'Key concepts and analytical overview',
      bullets: [
        'Core point 1: Define baseline principles.',
        'Core point 2: Practical applications and methodology.'
      ],
      notes: 'Presenter talking points for this slide.'
    };
    const updatedSlides = [...currentSlides, newSlide];
    setFormData(prev => ({
      ...prev,
      slideCount: updatedSlides.length,
      presentationData: {
        ...(prev.presentationData || { title: prev.title, author: prev.author, format: 'pptx' }),
        slides: updatedSlides,
        slideCount: updatedSlides.length
      }
    }));
  };

  const handleDeleteSlide = (idx) => {
    const currentSlides = formData.presentationData?.slides || [];
    if (currentSlides.length <= 1) {
      alert('A presentation must have at least one slide.');
      return;
    }
    const updatedSlides = currentSlides.filter((_, i) => i !== idx).map((s, i) => ({
      ...s,
      id: i + 1,
      slideNumber: i + 1
    }));
    setFormData(prev => ({
      ...prev,
      slideCount: updatedSlides.length,
      presentationData: {
        ...prev.presentationData,
        slides: updatedSlides,
        slideCount: updatedSlides.length
      }
    }));
    if (editingSlideIdx === idx) setEditingSlideIdx(null);
  };

  const handleMoveSlide = (idx, direction) => {
    const currentSlides = [...(formData.presentationData?.slides || [])];
    const targetIdx = idx + direction;
    if (targetIdx < 0 || targetIdx >= currentSlides.length) return;
    const temp = currentSlides[idx];
    currentSlides[idx] = currentSlides[targetIdx];
    currentSlides[targetIdx] = temp;
    const renumbered = currentSlides.map((s, i) => ({ ...s, id: i + 1, slideNumber: i + 1 }));
    setFormData(prev => ({
      ...prev,
      presentationData: {
        ...prev.presentationData,
        slides: renumbered
      }
    }));
  };

  const handleUpdateSlideField = (idx, field, value) => {
    const currentSlides = [...(formData.presentationData?.slides || [])];
    if (!currentSlides[idx]) return;
    currentSlides[idx] = {
      ...currentSlides[idx],
      [field]: value
    };
    setFormData(prev => ({
      ...prev,
      presentationData: {
        ...prev.presentationData,
        slides: currentSlides
      }
    }));
  };

  const handleSave = async (e) => {
    e.preventDefault();

    let finalStatus = formData.status || 'published';
    if (isCourseCreator && !isAdmin) {
      finalStatus = 'pending_approval'; // Always wait for admin approval on create/edit
    }

    const payload = {
      ...formData,
      status: finalStatus,
      creatorId: editingItem?.creatorId || currentUser?.uid,
      creatorEmail: editingItem?.creatorEmail || userProfile?.email,
      author: isCourseCreator && !isAdmin ? (userProfile?.name || formData.author) : formData.author
    };

    let savedItem = null;
    if (editingItem) {
      savedItem = await updateContent(editingItem.id, payload);
      setNotice(isCourseCreator && !isAdmin
        ? `Content "${formData.title}" saved and submitted for Admin approval before updating on site.`
        : `Resource "${formData.title}" updated.`
      );
    } else {
      savedItem = await createContent(payload);
      setNotice(isCourseCreator && !isAdmin
        ? `New content "${formData.title}" submitted for Admin review. Waiting for approval to launch on site.`
        : `New resource "${formData.title}" published.`
      );
    }

    if (payload.isPresentation && payload.presentationData) {
      const targetId = editingItem?.id || savedItem?.id || payload.id;
      if (targetId) {
        await savePresentationDeck(targetId, payload.presentationData, uploadedFileBlobRef.current);
      }
    }

    setModalOpen(false);
    await load();
    setTimeout(() => setNotice(''), 4500);
  };

  const handleApproveAndLaunch = async (item) => {
    await approveContent(item.id);
    setContent(content.map(c => c.id === item.id ? { ...c, status: 'published' } : c));
    setNotice(`Content "${item.title}" approved and published live on site!`);
    setTimeout(() => setNotice(''), 4000);
  };

  const handleDelete = async (id, title, itemObj) => {
    if (isCourseCreator && !isAdmin && !isOwner(itemObj)) {
      setNotice('Access Denied: You cannot delete content authored by other users.');
      setTimeout(() => setNotice(''), 3000);
      return;
    }
    if (window.confirm(`Delete content "${title}"?`)) {
      await deleteContent(id);
      setContent(content.filter(c => c.id !== id));
      setNotice(`Content "${title}" deleted.`);
      setTimeout(() => setNotice(''), 3000);
    }
  };

  const filteredContent = content.filter(c => {
    // Role isolation: Course Creators can ONLY view and edit their own authored content
    if (isCourseCreator && !isAdmin && !isOwner(c)) {
      return false;
    }
    return (
      c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (c.author && c.author.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  });

  const pendingContent = content.filter(c => c.status === 'pending_approval');

  return (
    <DashboardLayout
      title={isCourseCreator && !isAdmin ? "My Authored Educational Content" : "Educational Content Management"}
      subtitle={isCourseCreator && !isAdmin 
        ? "Create, edit, and organize study notes, worksheets, and resources. Submissions wait for Admin approval before launching." 
        : "Author, categorize, edit, review creator submissions, and publish articles, study notes, and worksheets."
      }
    >
      <div className="space-y-6">
        {notice && (
          <div className="p-3.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-500/30 text-emerald-800 dark:text-emerald-200 text-xs font-bold flex items-center gap-2 animate-fadeIn">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
            <span>{notice}</span>
          </div>
        )}

        {/* Creator Studio Info Banner */}
        {isCourseCreator && !isAdmin && (
          <div className="p-4 rounded-2xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800 text-indigo-900 dark:text-indigo-200 flex items-start gap-3">
            <Sparkles className="w-5 h-5 text-indigo-500 shrink-0 mt-0.5" />
            <div className="text-xs sm:text-sm">
              <div className="font-bold text-indigo-950 dark:text-indigo-100 mb-0.5">Course Creator Content Studio</div>
              <p className="text-indigo-700 dark:text-indigo-300">
                You have full authoring privileges to write and edit your own educational articles, notes, and study resources.
                All newly created or edited items enter <span className="font-bold underline">Pending Review</span> status and will be published live on site once approved by an Admin or Super Admin.
              </p>
            </div>
          </div>
        )}

        {/* Admin Pending Approvals Alert Banner */}
        {isAdmin && pendingContent.length > 0 && (
          <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-700 text-amber-900 dark:text-amber-200 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-amber-600 shrink-0" />
              <div className="text-xs sm:text-sm">
                <span className="font-bold">{pendingContent.length} pending educational resource{pendingContent.length > 1 ? 's' : ''}</span> waiting for your verification & launch approval.
              </div>
            </div>
            <div className="text-xs font-bold px-3 py-1 rounded-full bg-amber-200 dark:bg-amber-800/60 text-amber-900 dark:text-amber-100 shrink-0">
              Action Required
            </div>
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
            <div key={item.id} className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col overflow-hidden">
              {/* Thumbnail */}
              {item.thumbnail ? (
                <div className="w-full aspect-video bg-slate-100 dark:bg-slate-800 overflow-hidden relative">
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="w-full h-full object-cover"
                    onError={(e) => { e.target.style.display = 'none'; }}
                  />
                  {item.status === 'pending_approval' && (
                    <div className="absolute top-2 right-2">
                      <Badge type="pending" label="Pending Review" size="xs" />
                    </div>
                  )}
                </div>
              ) : (
                <div className="w-full aspect-video bg-gradient-to-br from-amber-50 to-orange-100 dark:from-amber-950/40 dark:to-orange-950/40 flex items-center justify-center relative">
                  <ImageIcon className="w-8 h-8 text-amber-300 dark:text-amber-700" />
                  {item.status === 'pending_approval' && (
                    <div className="absolute top-2 right-2">
                      <Badge type="pending" label="Pending Review" size="xs" />
                    </div>
                  )}
                </div>
              )}

              <div className="p-5 flex flex-col flex-1 justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <Badge type={item.membership} size="xs" />
                      {(item.contentType === 'Presentation' || item.isPresentation || item.presentationData) && (
                        <span className="text-[10px] font-bold text-orange-600 dark:text-orange-400 bg-orange-100 dark:bg-orange-950/60 px-2 py-0.5 rounded-full flex items-center gap-1">
                          <Presentation className="w-3 h-3" /> PPTX • {item.slideCount || item.presentationData?.slides?.length || 0} Slides
                        </span>
                      )}
                      {item.status === 'pending_approval' && (
                        <span className="text-[10px] font-bold text-amber-600 dark:text-amber-400 bg-amber-100 dark:bg-amber-950/60 px-2 py-0.5 rounded-full">
                          Pending Approval
                        </span>
                      )}
                    </div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase">{item.contentType}</span>
                  </div>
                  <h4 className="font-bold text-base text-slate-900 dark:text-white mb-1">{item.title}</h4>
                  <p className="text-xs text-slate-500 line-clamp-2">{item.description}</p>
                  <div className="text-[11px] text-slate-400 mt-2">{item.category} • {item.author}</div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5">
                    {isAdmin && item.status === 'pending_approval' && (
                      <button
                        onClick={() => handleApproveAndLaunch(item)}
                        className="px-2.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1 shadow-sm transition"
                        title="Approve & Launch live on site"
                      >
                        <Check className="w-3.5 h-3.5" /> Approve
                      </button>
                    )}
                    {(item.contentType === 'Presentation' || item.isPresentation || item.presentationData) && (
                      <button
                        onClick={() => setPreviewPresentation(item)}
                        className="px-2.5 py-1.5 rounded-lg bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold flex items-center gap-1 shadow-sm transition"
                        title="Run Presentation in live player"
                      >
                        <Presentation className="w-3.5 h-3.5" /> Run Deck
                      </button>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleOpenEdit(item)}
                      className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 text-xs"
                      title="Edit"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDelete(item.id, item.title, item)}
                      className="p-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-600 text-xs"
                      title="Delete"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal */}
        {modalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
            <div className="w-full max-w-2xl max-h-[92vh] bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-2xl flex flex-col overflow-hidden">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-lg">{editingItem ? 'Edit Resource' : 'Add New Content'}</h3>
                <button onClick={() => setModalOpen(false)}><X className="w-5 h-5 text-slate-400" /></button>
              </div>

              {isCourseCreator && !isAdmin && (
                <div className="mb-4 p-3 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-300 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 text-amber-600" />
                  <span>Notice: Saving this resource will submit it to Admin & Super Admin for review before launching publicly on site.</span>
                </div>
              )}

              <form onSubmit={handleSave} className="flex-1 overflow-y-auto space-y-4 text-xs sm:text-sm">
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
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="font-semibold block mb-1">Content Type</label>
                    <select
                      value={formData.contentType}
                      onChange={(e) => setFormData({ 
                        ...formData, 
                        contentType: e.target.value,
                        isPresentation: e.target.value === 'Presentation'
                      })}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-semibold"
                    >
                      <option value="Presentation">Presentation (.PPTX)</option>
                      <option value="Study Notes">Study Notes</option>
                      <option value="PDFs">PDFs / Charts</option>
                      <option value="Worksheets">Worksheets</option>
                      <option value="Educational Guides">Educational Guides</option>
                      <option value="Articles">Articles</option>
                      <option value="Exam Resources">Exam Resources</option>
                      <option value="Vocabulary Guides">Vocabulary Guides</option>
                    </select>
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

                {/* Presentation Studio Controls */}
                {(formData.contentType === 'Presentation' || formData.isPresentation) && (
                  <div className="p-4 rounded-2xl bg-orange-50/70 dark:bg-orange-950/20 border border-orange-200 dark:border-orange-800/60 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Presentation className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                        <div>
                          <h4 className="font-bold text-xs sm:text-sm text-orange-950 dark:text-orange-200">
                            PowerPoint (.PPTX) Presentation Studio
                          </h4>
                          <p className="text-[11px] text-slate-500 dark:text-slate-400">
                            Upload any .pptx file from your computer or link a cloud slide deck.
                          </p>
                        </div>
                      </div>
                      {formData.presentationData && (
                        <span className="px-2.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 font-bold text-[11px] flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          {formData.presentationData.slides?.length || formData.slideCount || 0} Slides Loaded
                        </span>
                      )}
                    </div>

                    {/* File upload input & quick actions */}
                    <div className="flex flex-wrap items-center gap-3">
                      <label className="px-4 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs flex items-center justify-center gap-2 cursor-pointer shadow-sm transition">
                        <Upload className="w-4 h-4" />
                        <span>{uploadingPptx ? 'Parsing PowerPoint...' : 'Upload PowerPoint (.PPTX / .PPT)'}</span>
                        <input
                          type="file"
                          accept=".pptx,.ppt,.ppsx,application/vnd.ms-powerpoint,application/vnd.openxmlformats-officedocument.presentationml.presentation"
                          onChange={handlePptxUpload}
                          className="hidden"
                          disabled={uploadingPptx}
                        />
                      </label>

                      {formData.presentationData && (
                        <>
                          <button
                            type="button"
                            onClick={() => setPreviewPresentation({
                              title: formData.title || 'Presentation Preview',
                              presentationData: formData.presentationData
                            })}
                            className="px-4 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 transition shadow-sm"
                          >
                            <Play className="w-3.5 h-3.5 fill-current" />
                            <span>Preview in Runner</span>
                          </button>

                          <button
                            type="button"
                            onClick={handleAddSlide}
                            className="px-3 py-2 rounded-xl border border-orange-300 dark:border-orange-700 hover:bg-orange-100 dark:hover:bg-orange-900/40 text-orange-800 dark:text-orange-200 font-bold text-xs flex items-center gap-1"
                          >
                            <Plus className="w-3.5 h-3.5" />
                            <span>Add Slide</span>
                          </button>
                        </>
                      )}
                    </div>

                    {/* Slide Deck Inspector & Editor */}
                    {formData.presentationData?.slides && formData.presentationData.slides.length > 0 && (
                      <div className="space-y-2 pt-2 border-t border-orange-200 dark:border-orange-800/60">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                            <Layers className="w-4 h-4 text-orange-500" />
                            <span>Slide Deck Structure ({formData.presentationData.slides.length} Slides)</span>
                          </span>
                          <span className="text-[11px] text-slate-400">Click to expand & edit slide details</span>
                        </div>

                        <div className="max-h-60 overflow-y-auto space-y-2 pr-1">
                          {formData.presentationData.slides.map((s, idx) => (
                            <div 
                              key={idx} 
                              className="p-3 rounded-xl border border-orange-200/80 dark:border-orange-900/40 bg-white dark:bg-slate-900 space-y-2"
                            >
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                  <span className="w-5 h-5 rounded-full bg-orange-100 dark:bg-orange-950 text-orange-700 dark:text-orange-300 text-[10px] font-bold flex items-center justify-center font-mono">
                                    {idx + 1}
                                  </span>
                                  <input
                                    type="text"
                                    value={s.title || ''}
                                    onChange={(e) => handleUpdateSlideField(idx, 'title', e.target.value)}
                                    placeholder="Slide Title"
                                    className="font-bold text-xs px-2 py-1 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white w-48 sm:w-64"
                                  />
                                </div>

                                <div className="flex items-center gap-1">
                                  <select
                                    value={s.layout || 'content'}
                                    onChange={(e) => handleUpdateSlideField(idx, 'layout', e.target.value)}
                                    className="text-[10px] px-2 py-1 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
                                  >
                                    <option value="title">Title Layout</option>
                                    <option value="content">Content Layout</option>
                                    <option value="comparison">Two-Column</option>
                                    <option value="table">Table Layout</option>
                                    <option value="conclusion">Summary Layout</option>
                                  </select>

                                  <button
                                    type="button"
                                    onClick={() => handleMoveSlide(idx, -1)}
                                    disabled={idx === 0}
                                    className="p-1 rounded text-slate-400 hover:text-white disabled:opacity-30 text-xs"
                                    title="Move Up"
                                  >
                                    ↑
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => handleMoveSlide(idx, 1)}
                                    disabled={idx === formData.presentationData.slides.length - 1}
                                    className="p-1 rounded text-slate-400 hover:text-white disabled:opacity-30 text-xs"
                                    title="Move Down"
                                  >
                                    ↓
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => handleDeleteSlide(idx)}
                                    className="p-1 rounded text-rose-500 hover:text-rose-700 text-xs ml-1"
                                    title="Delete Slide"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              </div>

                              <input
                                type="text"
                                value={s.subtitle || ''}
                                onChange={(e) => handleUpdateSlideField(idx, 'subtitle', e.target.value)}
                                placeholder="Subtitle / Context phrase (optional)"
                                className="w-full text-[11px] px-2 py-1 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
                              />

                              <textarea
                                rows={2}
                                value={(s.bullets || []).join('\n')}
                                onChange={(e) => handleUpdateSlideField(idx, 'bullets', e.target.value.split('\n'))}
                                placeholder="Slide bullet points (one per line)..."
                                className="w-full text-xs p-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-mono"
                              />

                              <input
                                type="text"
                                value={s.notes || ''}
                                onChange={(e) => handleUpdateSlideField(idx, 'notes', e.target.value)}
                                placeholder="Speaker talking notes for presenter..."
                                className="w-full text-[10px] px-2 py-1 rounded-lg border border-amber-200 dark:border-amber-900/50 bg-amber-50/50 dark:bg-amber-950/20 text-amber-900 dark:text-amber-300"
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Fallback Cloud link / Embed URL */}
                    <div>
                      <label className="font-semibold block mb-1 text-[11px] text-slate-600 dark:text-slate-400">
                        Optional: Online Embed Link (Google Slides / OneDrive / Office 365)
                      </label>
                      <input
                        type="url"
                        value={formData.presentationUrl || ''}
                        onChange={(e) => setFormData({ ...formData, presentationUrl: e.target.value })}
                        placeholder="https://docs.google.com/presentation/d/.../embed"
                        className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs"
                      />
                    </div>
                  </div>
                )}

                {isAdmin && (
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="font-semibold block mb-1">Author Name</label>
                      <input
                        type="text"
                        value={formData.author}
                        onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900"
                      />
                    </div>
                    <div>
                      <label className="font-semibold block mb-1">Status</label>
                      <select
                        value={formData.status}
                        onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900"
                      >
                        <option value="published">Published</option>
                        <option value="draft">Draft</option>
                        <option value="pending_approval">Pending Approval</option>
                      </select>
                    </div>
                  </div>
                )}

                {/* Thumbnail Upload */}
                <ThumbnailUpload
                  label="Thumbnail Image"
                  value={formData.thumbnail}
                  onChange={(val) => setFormData({ ...formData, thumbnail: val })}
                  placeholder="https://example.com/image.jpg"
                  aspectRatio="16/9"
                  maxSizeMB={2}
                />

                <RichTextarea
                  label="Body Text / Study Material"
                  rows={6}
                  value={formData.body}
                  onChange={(e) => setFormData({ ...formData, body: e.target.value })}
                  placeholder="Enter complete educational guide text or study notes..."
                />
                <div className="flex justify-end gap-2 pt-3">
                  <button type="button" onClick={() => setModalOpen(false)} className="px-4 py-2 bg-slate-100 rounded-xl">Cancel</button>
                  <button type="submit" className="px-5 py-2 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-xl shadow-md transition">
                    {isCourseCreator && !isAdmin ? 'Submit for Review' : 'Save Content'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Presentation Live Preview Runner */}
        {previewPresentation && (
          <PresentationRunner
            presentation={previewPresentation}
            onClose={() => setPreviewPresentation(null)}
          />
        )}

      </div>
    </DashboardLayout>
  );
};
