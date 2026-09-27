import React, { useState, useEffect } from 'react';
import { 
  BookOpen, 
  Plus, 
  Search, 
  Edit2, 
  Trash2, 
  Sparkles, 
  CheckCircle2, 
  Eye, 
  X, 
  Save, 
  Layers, 
  Clock,
  FolderPlus,
  PlayCircle,
  FileText,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  AlertCircle
} from 'lucide-react';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { 
  getCourses, 
  createCourse, 
  updateCourse, 
  deleteCourse, 
  getCategories 
} from '../../services/firebaseService';
import { Badge } from '../../components/common/Badge';
import { RichTextarea } from '../../components/common/RichTextarea';
import { ThumbnailUpload } from '../../components/common/ThumbnailUpload';

export const CourseManagement = () => {
  const [courses, setCourses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  // Editor modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);
  const [modalTab, setModalTab] = useState('general'); // 'general' | 'curriculum'
  const [expandedModules, setExpandedModules] = useState({});
  const [expandedSubmodules, setExpandedSubmodules] = useState({});
  const [expandedTopicDetails, setExpandedTopicDetails] = useState({});
  
  // Form fields
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'English',
    level: 'Beginner',
    membership: 'free',
    instructor: 'Dr Wazir Ahmed',
    duration: '4 hours',
    lessonCount: 5,
    thumbnail: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=800&q=80',
    status: 'published',
    modules: []
  });

  const [notice, setNotice] = useState('');

  const loadCourses = async () => {
    const data = await getCourses();
    setCourses(data);
    const catData = await getCategories();
    setCategories(['All', ...(catData.courses || [])]);
  };

  useEffect(() => {
    loadCourses();
  }, []);

  const handleOpenAdd = () => {
    setEditingCourse(null);
    setModalTab('general');
    const defaultModId = `mod-${Date.now()}`;
    setFormData({
      title: '',
      description: '',
      category: 'English',
      level: 'Beginner',
      membership: 'free',
      instructor: 'Dr Wazir Ahmed',
      duration: '4 hours',
      lessonCount: 2,
      thumbnail: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=800&q=80',
      status: 'published',
      modules: [
        {
          id: defaultModId,
          title: 'Module 1: Foundations & Core Concepts',
          description: 'Key introductory principles and baseline knowledge.',
          topics: [
            {
              id: `top-${Date.now()}-1`,
              title: 'Introduction & Course Orientation',
              duration: '15 mins',
              type: 'video',
              content: 'Welcome to the course. Here we introduce foundational principles, curriculum roadmap, and expected competencies.',
              videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
            },
            {
              id: `top-${Date.now()}-2`,
              title: 'Fundamental Theory & Case Examples',
              duration: '20 mins',
              type: 'text',
              content: 'Key theories, definitions, and real-world applied scenarios.',
              videoUrl: ''
            }
          ],
          submodules: []
        }
      ]
    });
    setExpandedModules({ [defaultModId]: true });
    setExpandedSubmodules({});
    setModalOpen(true);
  };

  const handleOpenEdit = (course) => {
    setEditingCourse(course);
    setModalTab('general');

    // Normalize modules: if course already has structured modules, preserve them.
    // Otherwise, convert legacy flat lessons into initial structured modules.
    let initialModules = [];
    if (course.modules && Array.isArray(course.modules) && course.modules.length > 0) {
      initialModules = course.modules.map((m, mIdx) => ({
        id: m.id || `mod-${mIdx + 1}`,
        title: m.title || `Module ${mIdx + 1}: Section`,
        description: m.description || '',
        topics: (m.topics || m.lessons || []).map((t, tIdx) => ({
          id: t.id || `top-${mIdx + 1}-${tIdx + 1}`,
          title: t.title || `Topic ${tIdx + 1}`,
          duration: t.duration || '15 mins',
          type: t.type || 'text',
          content: t.content || '',
          videoUrl: t.videoUrl || ''
        })),
        submodules: (m.submodules || []).map((sm, smIdx) => ({
          id: sm.id || `submod-${mIdx + 1}-${smIdx + 1}`,
          title: sm.title || `Sub-module ${mIdx + 1}.${smIdx + 1}`,
          description: sm.description || '',
          topics: (sm.topics || []).map((st, stIdx) => ({
            id: st.id || `top-${mIdx + 1}-${smIdx + 1}-${stIdx + 1}`,
            title: st.title || `Topic ${stIdx + 1}`,
            duration: st.duration || '15 mins',
            type: st.type || 'text',
            content: st.content || '',
            videoUrl: st.videoUrl || ''
          }))
        }))
      }));
    } else if (course.lessons && Array.isArray(course.lessons) && course.lessons.length > 0) {
      initialModules = [
        {
          id: 'mod-1',
          title: 'Module 1: Comprehensive Course Curriculum',
          description: 'All core learning units and topics for this course.',
          topics: course.lessons.map((l, lIdx) => ({
            id: l.id || `les-${lIdx + 1}`,
            title: l.title || `Lesson ${lIdx + 1}`,
            duration: l.duration || '15 mins',
            type: l.type || 'text',
            content: l.content || '',
            videoUrl: l.videoUrl || ''
          })),
          submodules: []
        }
      ];
    } else {
      const defaultModId = `mod-${Date.now()}`;
      initialModules = [
        {
          id: defaultModId,
          title: 'Module 1: Foundations & Core Concepts',
          description: 'Key introductory principles and baseline knowledge.',
          topics: [
            {
              id: `top-${Date.now()}-1`,
              title: 'Introduction & Course Orientation',
              duration: '15 mins',
              type: 'video',
              content: 'Welcome to this course curriculum.',
              videoUrl: ''
            }
          ],
          submodules: []
        }
      ];
    }

    // Auto-expand all modules and submodules
    const expandedMap = {};
    const subExpandedMap = {};
    initialModules.forEach(m => {
      expandedMap[m.id] = true;
      (m.submodules || []).forEach(sm => {
        subExpandedMap[sm.id] = true;
      });
    });
    setExpandedModules(expandedMap);
    setExpandedSubmodules(subExpandedMap);

    setFormData({
      title: course.title || '',
      description: course.description || '',
      category: course.category || 'English',
      level: course.level || 'Beginner',
      membership: course.membership || 'free',
      instructor: course.instructor || 'Dr Wazir Ahmed',
      duration: course.duration || '4 hours',
      lessonCount: course.lessonCount || course.lessons?.length || 5,
      thumbnail: course.thumbnail || '',
      status: course.status || 'published',
      modules: initialModules
    });
    setModalOpen(true);
  };

  // --- Curriculum Hierarchy Handlers (Modules, Sub-modules & Topics) ---

  const handleAddModule = () => {
    const newModId = `mod-${Date.now()}`;
    const nextNumber = (formData.modules?.length || 0) + 1;
    const newModule = {
      id: newModId,
      title: `Module ${nextNumber}: New Section`,
      description: '',
      topics: [
        {
          id: `top-${Date.now()}-1`,
          title: `Topic ${nextNumber}.1: Key Topic`,
          duration: '15 mins',
          type: 'video',
          content: 'Detailed explanation and practical study notes.',
          videoUrl: ''
        }
      ],
      submodules: []
    };

    setFormData(prev => ({
      ...prev,
      modules: [...(prev.modules || []), newModule]
    }));
    setExpandedModules(prev => ({ ...prev, [newModId]: true }));
  };

  const handleDeleteModule = (modIdx) => {
    const mod = formData.modules[modIdx];
    if (window.confirm(`Delete module "${mod.title}" and all its contained topics?`)) {
      setFormData(prev => ({
        ...prev,
        modules: prev.modules.filter((_, i) => i !== modIdx)
      }));
    }
  };

  const handleUpdateModule = (modIdx, field, val) => {
    setFormData(prev => {
      const nextMods = [...prev.modules];
      nextMods[modIdx] = { ...nextMods[modIdx], [field]: val };
      return { ...prev, modules: nextMods };
    });
  };

  const toggleModuleExpand = (modId) => {
    setExpandedModules(prev => ({
      ...prev,
      [modId]: !prev[modId]
    }));
  };

  // --- Sub-module Handlers ---

  const handleAddSubmodule = (modIdx) => {
    const mod = formData.modules[modIdx];
    const newSubmodId = `submod-${Date.now()}`;
    const submodNumber = (mod.submodules?.length || 0) + 1;
    const newSubmodule = {
      id: newSubmodId,
      title: `Sub-module ${modIdx + 1}.${submodNumber}: Specialized Focus`,
      description: '',
      topics: [
        {
          id: `top-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
          title: `Topic ${modIdx + 1}.${submodNumber}.1: Key Concept`,
          duration: '15 mins',
          type: 'text',
          content: '',
          videoUrl: ''
        }
      ]
    };

    setFormData(prev => {
      const nextMods = [...prev.modules];
      nextMods[modIdx] = {
        ...nextMods[modIdx],
        submodules: [...(nextMods[modIdx].submodules || []), newSubmodule]
      };
      return { ...prev, modules: nextMods };
    });
    setExpandedSubmodules(prev => ({ ...prev, [newSubmodId]: true }));
    setExpandedModules(prev => ({ ...prev, [mod.id]: true }));
  };

  const handleDeleteSubmodule = (modIdx, submodIdx) => {
    const submod = formData.modules[modIdx].submodules[submodIdx];
    if (window.confirm(`Delete sub-module "${submod.title}" and all its contained topics?`)) {
      setFormData(prev => {
        const nextMods = [...prev.modules];
        nextMods[modIdx] = {
          ...nextMods[modIdx],
          submodules: nextMods[modIdx].submodules.filter((_, i) => i !== submodIdx)
        };
        return { ...prev, modules: nextMods };
      });
    }
  };

  const handleUpdateSubmodule = (modIdx, submodIdx, field, val) => {
    setFormData(prev => {
      const nextMods = [...prev.modules];
      const submodules = [...(nextMods[modIdx].submodules || [])];
      submodules[submodIdx] = { ...submodules[submodIdx], [field]: val };
      nextMods[modIdx] = { ...nextMods[modIdx], submodules };
      return { ...prev, modules: nextMods };
    });
  };

  const toggleSubmoduleExpand = (submodId) => {
    setExpandedSubmodules(prev => ({
      ...prev,
      [submodId]: !prev[submodId]
    }));
  };

  const handleAddSubmoduleTopic = (modIdx, submodIdx) => {
    const submod = formData.modules[modIdx].submodules[submodIdx];
    const topNumber = (submod.topics?.length || 0) + 1;
    const newTopic = {
      id: `top-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      title: `Topic ${modIdx + 1}.${submodIdx + 1}.${topNumber}: New Topic Title`,
      duration: '15 mins',
      type: 'text',
      content: '',
      videoUrl: ''
    };

    setFormData(prev => {
      const nextMods = [...prev.modules];
      const submodules = [...(nextMods[modIdx].submodules || [])];
      submodules[submodIdx] = {
        ...submodules[submodIdx],
        topics: [...(submodules[submodIdx].topics || []), newTopic]
      };
      nextMods[modIdx] = { ...nextMods[modIdx], submodules };
      return { ...prev, modules: nextMods };
    });
  };

  const handleDeleteSubmoduleTopic = (modIdx, submodIdx, topIdx) => {
    setFormData(prev => {
      const nextMods = [...prev.modules];
      const submodules = [...(nextMods[modIdx].submodules || [])];
      submodules[submodIdx] = {
        ...submodules[submodIdx],
        topics: submodules[submodIdx].topics.filter((_, i) => i !== topIdx)
      };
      nextMods[modIdx] = { ...nextMods[modIdx], submodules };
      return { ...prev, modules: nextMods };
    });
  };

  const handleUpdateSubmoduleTopic = (modIdx, submodIdx, topIdx, field, val) => {
    setFormData(prev => {
      const nextMods = [...prev.modules];
      const submodules = [...(nextMods[modIdx].submodules || [])];
      const topics = [...submodules[submodIdx].topics];
      topics[topIdx] = { ...topics[topIdx], [field]: val };
      submodules[submodIdx] = { ...submodules[submodIdx], topics };
      nextMods[modIdx] = { ...nextMods[modIdx], submodules };
      return { ...prev, modules: nextMods };
    });
  };

  // --- Direct Topic Handlers ---

  const handleAddTopic = (modIdx) => {
    const mod = formData.modules[modIdx];
    const topNumber = (mod.topics?.length || 0) + 1;
    const newTopic = {
      id: `top-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      title: `Topic ${modIdx + 1}.${topNumber}: New Topic Title`,
      duration: '20 mins',
      type: 'text',
      content: '',
      videoUrl: ''
    };

    setFormData(prev => {
      const nextMods = [...prev.modules];
      nextMods[modIdx] = {
        ...nextMods[modIdx],
        topics: [...(nextMods[modIdx].topics || []), newTopic]
      };
      return { ...prev, modules: nextMods };
    });
  };

  const handleDeleteTopic = (modIdx, topIdx) => {
    setFormData(prev => {
      const nextMods = [...prev.modules];
      nextMods[modIdx] = {
        ...nextMods[modIdx],
        topics: nextMods[modIdx].topics.filter((_, i) => i !== topIdx)
      };
      return { ...prev, modules: nextMods };
    });
  };

  const handleUpdateTopic = (modIdx, topIdx, field, val) => {
    setFormData(prev => {
      const nextMods = [...prev.modules];
      const topics = [...nextMods[modIdx].topics];
      topics[topIdx] = { ...topics[topIdx], [field]: val };
      nextMods[modIdx] = { ...nextMods[modIdx], topics };
      return { ...prev, modules: nextMods };
    });
  };

  const toggleTopicDetails = (topicId) => {
    setExpandedTopicDetails(prev => ({
      ...prev,
      [topicId]: !prev[topicId]
    }));
  };

  // --- Save & Form Submission ---

  const handleSave = async (e) => {
    e.preventDefault();

    // Flatten all topics across all modules & submodules to preserve full backward compatibility with lessons
    const flattenedLessons = (formData.modules || []).flatMap((mod, modIdx) => {
      const direct = (mod.topics || []).map((top, topIdx) => ({
        ...top,
        moduleId: mod.id,
        moduleTitle: mod.title,
        order: (modIdx + 1) * 1000 + (topIdx + 1)
      }));
      const fromSubmodules = (mod.submodules || []).flatMap((submod, subIdx) =>
        (submod.topics || []).map((top, topIdx) => ({
          ...top,
          moduleId: mod.id,
          moduleTitle: mod.title,
          submoduleId: submod.id,
          submoduleTitle: submod.title,
          order: (modIdx + 1) * 1000 + (subIdx + 1) * 100 + (topIdx + 1)
        }))
      );
      return [...direct, ...fromSubmodules];
    });

    const totalTopicsCount = flattenedLessons.length;
    const totalSubmodulesCount = (formData.modules || []).reduce(
      (acc, m) => acc + (m.submodules?.length || 0),
      0
    );

    const payload = {
      ...formData,
      modules: formData.modules,
      lessons: flattenedLessons,
      lessonCount: totalTopicsCount || formData.lessonCount || 1
    };

    if (editingCourse) {
      await updateCourse(editingCourse.id, payload);
      setNotice(`Course "${formData.title}" updated (${formData.modules.length} modules, ${totalSubmodulesCount} sub-modules, ${totalTopicsCount} topics).`);
    } else {
      await createCourse(payload);
      setNotice(`New course "${formData.title}" created with ${formData.modules.length} modules.`);
    }

    setModalOpen(false);
    await loadCourses();
    setTimeout(() => setNotice(''), 4000);
  };

  const handleDelete = async (courseId, title) => {
    if (window.confirm(`Are you sure you want to delete course "${title}"?`)) {
      await deleteCourse(courseId);
      setCourses(courses.filter(c => c.id !== courseId));
      setNotice(`Course "${title}" removed.`);
      setTimeout(() => setNotice(''), 3000);
    }
  };

  const handleTogglePublish = async (course) => {
    const newStatus = course.status === 'published' ? 'draft' : 'published';
    await updateCourse(course.id, { status: newStatus });
    setCourses(courses.map(c => c.id === course.id ? { ...c, status: newStatus } : c));
  };

  const filteredCourses = courses.filter(c => {
    const matchesSearch = c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.instructor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat = selectedCategory === 'All' || c.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  const totalTopicsInForm = (formData.modules || []).reduce((acc, m) => {
    const directTopics = (m.topics || []).length;
    const subTopics = (m.submodules || []).reduce((sAcc, sm) => sAcc + (sm.topics || []).length, 0);
    return acc + directTopics + subTopics;
  }, 0);

  const totalSubmodulesInForm = (formData.modules || []).reduce(
    (acc, m) => acc + (m.submodules?.length || 0),
    0
  );

  return (
    <DashboardLayout 
      title="Course Management" 
      subtitle="Create, edit, publish/unpublish, and configure free and premium academic curricula."
    >
      <div className="space-y-6">
        
        {notice && (
          <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 flex items-center gap-3 text-xs sm:text-sm font-semibold animate-fadeIn">
            <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
            <span>{notice}</span>
          </div>
        )}

        {/* Top Controls Bar */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-stretch sm:items-center">
          <div className="flex flex-1 gap-3 items-center max-w-lg">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search courses or instructor..."
                className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
            </div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs sm:text-sm font-medium"
            >
              {categories.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          <button
            onClick={handleOpenAdd}
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs sm:text-sm shadow-md transition whitespace-nowrap"
          >
            <Plus className="w-4 h-4" /> Add Academic Course
          </button>
        </div>

        {/* Courses Table View */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-slate-50 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 text-[11px] font-bold uppercase tracking-wider border-b border-slate-200 dark:border-slate-800">
                <tr>
                  <th className="px-6 py-4">Course Info</th>
                  <th className="px-6 py-4">Category</th>
                  <th className="px-6 py-4">Structure</th>
                  <th className="px-6 py-4">Tier</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {filteredCourses.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center text-slate-400">
                      No courses match your search criteria.
                    </td>
                  </tr>
                ) : filteredCourses.map((c) => (
                  <tr key={c.id} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img 
                          src={c.thumbnail} 
                          alt="" 
                          className="w-12 h-12 rounded-xl object-cover shrink-0 border border-slate-200 dark:border-slate-800"
                        />
                        <div className="min-w-0">
                          <p className="font-bold text-slate-900 dark:text-white truncate max-w-xs">{c.title}</p>
                          <p className="text-[11px] text-slate-400 truncate">{c.instructor}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-medium text-slate-600 dark:text-slate-300">{c.category}</span>
                      <div className="text-[10px] text-slate-400">{c.level}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-slate-700 dark:text-slate-300 font-semibold flex items-center gap-1.5">
                        <Layers className="w-3.5 h-3.5 text-brand-600 dark:text-brand-400" />
                        <span>{c.modules?.length || 1} Modules</span>
                      </div>
                      <div className="text-[10px] text-slate-400">
                        {c.lessonCount || c.lessons?.length || 0} Topics • {c.duration}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <Badge type={c.membership || 'free'} size="xs" />
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleTogglePublish(c)}
                        className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border transition ${
                          c.status === 'published'
                            ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800'
                            : 'bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-800'
                        }`}
                      >
                        {c.status || 'published'}
                      </button>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <a
                          href={`/courses/${c.id}`}
                          target="_blank"
                          rel="noreferrer"
                          title="Preview public course page"
                          className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                        >
                          <Eye className="w-4 h-4" />
                        </a>
                        <button
                          onClick={() => handleOpenEdit(c)}
                          title="Edit course and curriculum"
                          className="p-2 text-brand-600 dark:text-brand-400 rounded-lg hover:bg-brand-50 dark:hover:bg-brand-950/40 transition"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(c.id, c.title)}
                          title="Delete course"
                          className="p-2 text-red-500 rounded-lg hover:bg-red-50 dark:hover:bg-red-950/40 transition"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Course Add / Edit Comprehensive Modal */}
        {modalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md">
            <div className="relative w-full max-w-4xl max-h-[92vh] bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col overflow-hidden">
              
              {/* Modal Header */}
              <div className="p-5 sm:p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-800/30">
                <div>
                  <h3 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-brand-600 dark:text-brand-400" />
                    <span>{editingCourse ? 'Edit Course & Curriculum' : 'Add New Academic Course'}</span>
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    Configure course metadata, and add or delete modules/sections and topics.
                  </p>
                </div>
                <button
                  onClick={() => setModalOpen(false)}
                  className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-white rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 transition"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Tab Navigation */}
              <div className="flex border-b border-slate-200 dark:border-slate-800 px-6 bg-white dark:bg-slate-900 text-xs sm:text-sm font-bold">
                <button
                  type="button"
                  onClick={() => setModalTab('general')}
                  className={`py-3 px-4 border-b-2 transition flex items-center gap-2 ${
                    modalTab === 'general'
                      ? 'border-brand-600 text-brand-600 dark:text-brand-400'
                      : 'border-transparent text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200'
                  }`}
                >
                  <BookOpen className="w-4 h-4" />
                  <span>General Information</span>
                </button>

                <button
                  type="button"
                  onClick={() => setModalTab('curriculum')}
                  className={`py-3 px-4 border-b-2 transition flex items-center gap-2 ${
                    modalTab === 'curriculum'
                      ? 'border-brand-600 text-brand-600 dark:text-brand-400'
                      : 'border-transparent text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200'
                  }`}
                >
                  <Layers className="w-4 h-4" />
                  <span>Curriculum Architecture</span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] bg-brand-100 dark:bg-brand-950 text-brand-700 dark:text-brand-300">
                    {formData.modules?.length || 0} Sections • {totalSubmodulesInForm > 0 ? `${totalSubmodulesInForm} Sub-modules • ` : ''}{totalTopicsInForm} Topics
                  </span>
                </button>
              </div>

              {/* Form Body */}
              <form onSubmit={handleSave} className="flex-1 overflow-y-auto flex flex-col">
                
                {/* TAB 1: General Details */}
                {modalTab === 'general' && (
                  <div className="p-6 space-y-4 text-xs sm:text-sm">
                    <div>
                      <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                        Course Title *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        placeholder="e.g. English Grammar Fundamentals"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-semibold text-slate-900 dark:text-white"
                      />
                    </div>

                    <RichTextarea
                      label="Course Description *"
                      rows={3}
                      required
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      placeholder="Detailed course overview, learning outcomes, and core competencies..."
                    />

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">Category</label>
                        <input
                          type="text"
                          required
                          value={formData.category}
                          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900"
                        />
                      </div>
                      <div>
                        <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">Level</label>
                        <select
                          value={formData.level}
                          onChange={(e) => setFormData({ ...formData, level: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-semibold"
                        >
                          <option value="Beginner">Beginner</option>
                          <option value="Intermediate">Intermediate</option>
                          <option value="Advanced">Advanced</option>
                        </select>
                      </div>
                      <div>
                        <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">Tier Access</label>
                        <select
                          value={formData.membership}
                          onChange={(e) => setFormData({ ...formData, membership: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-semibold"
                        >
                          <option value="free">Free</option>
                          <option value="premium">Premium</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">Instructor Name</label>
                        <input
                          type="text"
                          required
                          value={formData.instructor}
                          onChange={(e) => setFormData({ ...formData, instructor: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900"
                        />
                      </div>
                      <div>
                        <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">Estimated Duration</label>
                        <input
                          type="text"
                          required
                          value={formData.duration}
                          onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900"
                        />
                      </div>
                    </div>

                    <ThumbnailUpload
                      label="Course Cover Thumbnail"
                      value={formData.thumbnail}
                      onChange={(val) => setFormData({ ...formData, thumbnail: val })}
                      placeholder="https://images.unsplash.com/photo-..."
                      aspectRatio="16/9"
                      maxSizeMB={2}
                    />
                  </div>
                )}

                {/* TAB 2: Curriculum Architecture (Modules / Sections & Topics) */}
                {modalTab === 'curriculum' && (
                  <div className="p-6 space-y-6">
                    
                    {/* Header Action Bar */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-2xl bg-brand-50/70 dark:bg-brand-950/40 border border-brand-200 dark:border-brand-800">
                      <div>
                        <h4 className="font-black text-sm text-slate-900 dark:text-white flex items-center gap-2">
                          <Layers className="w-4 h-4 text-brand-600 dark:text-brand-400" />
                          <span>Curriculum Builder</span>
                        </h4>
                        <p className="text-xs text-slate-600 dark:text-slate-300">
                          Add or remove modules/sections, and populate each with individual lesson topics.
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={handleAddModule}
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs transition shadow-sm self-start sm:self-auto"
                      >
                        <FolderPlus className="w-4 h-4" />
                        <span>Add Section / Module</span>
                      </button>
                    </div>

                    {/* Modules List */}
                    {(!formData.modules || formData.modules.length === 0) ? (
                      <div className="p-12 text-center border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-3xl space-y-3">
                        <AlertCircle className="w-8 h-8 text-slate-400 mx-auto" />
                        <p className="text-sm font-bold text-slate-700 dark:text-slate-300">
                          No modules or sections created yet.
                        </p>
                        <p className="text-xs text-slate-400 max-w-sm mx-auto">
                          Click the button below to add your first module and begin structuring topics.
                        </p>
                        <button
                          type="button"
                          onClick={handleAddModule}
                          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-brand-600 text-white font-bold text-xs shadow-sm"
                        >
                          <FolderPlus className="w-4 h-4" /> Add First Module
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {formData.modules.map((mod, modIdx) => {
                          const isExpanded = expandedModules[mod.id] !== false;
                          const topicsCount = mod.topics?.length || 0;

                          return (
                            <div 
                              key={mod.id || modIdx} 
                              className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 overflow-hidden shadow-xs"
                            >
                              {/* Module Card Top Header */}
                              <div className="p-4 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                                
                                <div className="flex-1 flex items-center gap-3">
                                  <button
                                    type="button"
                                    onClick={() => toggleModuleExpand(mod.id)}
                                    className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                                  >
                                    {isExpanded ? (
                                      <ChevronUp className="w-4 h-4" />
                                    ) : (
                                      <ChevronDown className="w-4 h-4" />
                                    )}
                                  </button>

                                  <div className="flex-1">
                                    <input
                                      type="text"
                                      required
                                      value={mod.title}
                                      onChange={(e) => handleUpdateModule(modIdx, 'title', e.target.value)}
                                      placeholder={`Module ${modIdx + 1} Title`}
                                      className="w-full px-2.5 py-1 text-sm font-bold text-slate-900 dark:text-white bg-transparent border-b border-dashed border-slate-300 dark:border-slate-700 focus:border-brand-500 focus:outline-none"
                                    />
                                    <input
                                      type="text"
                                      value={mod.description || ''}
                                      onChange={(e) => handleUpdateModule(modIdx, 'description', e.target.value)}
                                      placeholder="Brief section description (optional)"
                                      className="w-full px-2.5 py-0.5 text-xs text-slate-500 dark:text-slate-400 bg-transparent border-none focus:outline-none"
                                    />
                                  </div>
                                </div>

                                {/* Module Action Buttons */}
                                <div className="flex items-center gap-2 self-end sm:self-auto">
                                  <span className="text-[11px] font-semibold text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full">
                                    {(mod.submodules?.length || 0) > 0 ? `${mod.submodules.length} sub-mod • ` : ''}{topicsCount + ((mod.submodules || []).reduce((acc, sm) => acc + (sm.topics || []).length, 0))} topics
                                  </span>

                                  <button
                                    type="button"
                                    onClick={() => handleAddSubmodule(modIdx)}
                                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-950/60 dark:hover:bg-indigo-900/60 text-indigo-700 dark:text-indigo-300 font-bold text-xs transition"
                                    title="Add sub-module to this section"
                                  >
                                    <FolderPlus className="w-3.5 h-3.5" />
                                    <span>+ Sub-module</span>
                                  </button>

                                  <button
                                    type="button"
                                    onClick={() => handleAddTopic(modIdx)}
                                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-brand-50 hover:bg-brand-100 dark:bg-brand-950/60 dark:hover:bg-brand-900/60 text-brand-700 dark:text-brand-300 font-bold text-xs transition"
                                    title="Add direct topic to this section"
                                  >
                                    <Plus className="w-3.5 h-3.5" />
                                    <span>+ Topic</span>
                                  </button>

                                  <button
                                    type="button"
                                    onClick={() => handleDeleteModule(modIdx)}
                                    className="p-1.5 text-slate-400 hover:text-red-600 dark:hover:text-red-400 rounded-lg hover:bg-red-50 dark:hover:bg-red-950/40 transition"
                                    title="Delete entire section/module"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                </div>
                              </div>

                              {/* Topics & Sub-modules Container (Expanded) */}
                              {isExpanded && (
                                <div className="p-4 space-y-5">
                                  
                                  {/* Section 1: Direct Topics */}
                                  <div className="space-y-3">
                                    <div className="flex items-center justify-between">
                                      <h5 className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                                        <BookOpen className="w-3.5 h-3.5 text-brand-600" />
                                        <span>Direct Module Topics ({(mod.topics || []).length})</span>
                                      </h5>
                                      <button
                                        type="button"
                                        onClick={() => handleAddTopic(modIdx)}
                                        className="text-[11px] font-bold text-brand-600 dark:text-brand-400 hover:underline flex items-center gap-1"
                                      >
                                        <Plus className="w-3 h-3" /> Add Topic
                                      </button>
                                    </div>

                                    {(!mod.topics || mod.topics.length === 0) ? (
                                      <div className="py-3 text-center text-xs text-slate-400 border border-dashed border-slate-200 dark:border-slate-800 rounded-xl">
                                        <span>No direct topics in this section. </span>
                                        <button
                                          type="button"
                                          onClick={() => handleAddTopic(modIdx)}
                                          className="text-brand-600 dark:text-brand-400 font-bold hover:underline ml-1"
                                        >
                                          + Add Topic
                                        </button>
                                      </div>
                                    ) : (
                                      <div className="space-y-2.5">
                                        {mod.topics.map((top, topIdx) => {
                                          const isDetailsOpen = expandedTopicDetails[top.id];

                                          return (
                                            <div 
                                              key={top.id || topIdx}
                                              className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2.5 shadow-2xs"
                                            >
                                              {/* Primary Topic Row */}
                                              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                                                
                                                {/* Index & Type Icon */}
                                                <div className="flex items-center gap-2">
                                                  <span className="w-6 h-6 rounded-md bg-slate-100 dark:bg-slate-800 text-[10px] font-bold text-slate-500 flex items-center justify-center shrink-0">
                                                    {modIdx + 1}.{topIdx + 1}
                                                  </span>
                                                  <select
                                                    value={top.type || 'video'}
                                                    onChange={(e) => handleUpdateTopic(modIdx, topIdx, 'type', e.target.value)}
                                                    className="px-2 py-1 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-semibold"
                                                  >
                                                    <option value="video">Video</option>
                                                    <option value="text">Text Note</option>
                                                    <option value="quiz">Quiz / Test</option>
                                                  </select>
                                                </div>

                                                {/* Topic Title */}
                                                <input
                                                  type="text"
                                                  required
                                                  value={top.title}
                                                  onChange={(e) => handleUpdateTopic(modIdx, topIdx, 'title', e.target.value)}
                                                  placeholder="Topic title..."
                                                  className="flex-1 px-3 py-1.5 text-xs font-semibold text-slate-900 dark:text-white bg-slate-50 dark:bg-slate-800/60 rounded-lg border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-1 focus:ring-brand-500"
                                                />

                                                {/* Duration */}
                                                <input
                                                  type="text"
                                                  value={top.duration || '15 mins'}
                                                  onChange={(e) => handleUpdateTopic(modIdx, topIdx, 'duration', e.target.value)}
                                                  placeholder="Duration"
                                                  className="w-24 px-2.5 py-1.5 text-xs text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-800/60 rounded-lg border border-slate-200 dark:border-slate-700 text-center"
                                                />

                                                {/* Toggle notes & Delete button */}
                                                <div className="flex items-center gap-1 justify-end">
                                                  <button
                                                    type="button"
                                                    onClick={() => toggleTopicDetails(top.id)}
                                                    className={`px-2 py-1 text-[11px] font-bold rounded-lg border transition ${
                                                      isDetailsOpen
                                                        ? 'bg-brand-50 dark:bg-brand-950 text-brand-600 border-brand-200'
                                                        : 'text-slate-500 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800'
                                                    }`}
                                                  >
                                                    {isDetailsOpen ? 'Hide Content' : 'Edit Content'}
                                                  </button>

                                                  <button
                                                    type="button"
                                                    onClick={() => handleDeleteTopic(modIdx, topIdx)}
                                                    className="p-1.5 text-slate-400 hover:text-red-500 rounded-lg hover:bg-red-50 dark:hover:bg-red-950/40 transition"
                                                    title="Delete this topic"
                                                  >
                                                    <Trash2 className="w-3.5 h-3.5" />
                                                  </button>
                                                </div>
                                              </div>

                                              {/* Expandable Topic Notes / Video URL */}
                                              {isDetailsOpen && (
                                                <div className="p-3 bg-slate-50/80 dark:bg-slate-800/50 rounded-xl space-y-2 border border-slate-200/80 dark:border-slate-700/80 text-xs animate-fadeIn">
                                                  {top.type === 'video' && (
                                                    <div>
                                                      <label className="font-semibold text-slate-600 dark:text-slate-300 block mb-1">
                                                        Video Embed URL:
                                                      </label>
                                                      <input
                                                        type="text"
                                                        value={top.videoUrl || ''}
                                                        onChange={(e) => handleUpdateTopic(modIdx, topIdx, 'videoUrl', e.target.value)}
                                                        placeholder="https://www.youtube.com/embed/..."
                                                        className="w-full px-2.5 py-1.5 text-xs bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700 font-mono"
                                                      />
                                                    </div>
                                                  )}

                                                  <RichTextarea
                                                    label="Lesson Notes & Learning Text:"
                                                    rows={4}
                                                    value={top.content || ''}
                                                    onChange={(e) => handleUpdateTopic(modIdx, topIdx, 'content', e.target.value)}
                                                    placeholder="Detailed notes, study points, code snippets, or instructions for this topic..."
                                                  />
                                                </div>
                                              )}
                                            </div>
                                          );
                                        })}
                                      </div>
                                    )}
                                  </div>

                                  {/* Section 2: Sub-modules */}
                                  <div className="space-y-3 pt-2 border-t border-slate-200/80 dark:border-slate-800">
                                    <div className="flex items-center justify-between">
                                      <h5 className="text-[11px] font-bold uppercase tracking-wider text-indigo-700 dark:text-indigo-400 flex items-center gap-1.5">
                                        <Layers className="w-3.5 h-3.5" />
                                        <span>Sub-modules ({(mod.submodules || []).length})</span>
                                      </h5>
                                      <button
                                        type="button"
                                        onClick={() => handleAddSubmodule(modIdx)}
                                        className="text-[11px] font-bold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
                                      >
                                        <FolderPlus className="w-3.5 h-3.5" /> Add Sub-module
                                      </button>
                                    </div>

                                    {(!mod.submodules || mod.submodules.length === 0) ? (
                                      <div className="py-3 px-4 text-center text-xs text-slate-400 border border-dashed border-indigo-200/60 dark:border-indigo-900/40 rounded-xl bg-indigo-50/20 dark:bg-indigo-950/10">
                                        <span>No sub-modules added to this module yet. </span>
                                        <button
                                          type="button"
                                          onClick={() => handleAddSubmodule(modIdx)}
                                          className="text-indigo-600 dark:text-indigo-400 font-bold hover:underline ml-1"
                                        >
                                          + Add Sub-module
                                        </button>
                                      </div>
                                    ) : (
                                      <div className="space-y-3">
                                        {mod.submodules.map((submod, submodIdx) => {
                                          const isSubExpanded = expandedSubmodules[submod.id] !== false;
                                          const subTopicsCount = submod.topics?.length || 0;

                                          return (
                                            <div
                                              key={submod.id || submodIdx}
                                              className="rounded-xl border border-indigo-200/80 dark:border-indigo-900/60 bg-white dark:bg-slate-900/90 overflow-hidden shadow-2xs"
                                            >
                                              {/* Sub-module Header */}
                                              <div className="p-3 bg-indigo-50/60 dark:bg-indigo-950/40 border-b border-indigo-100 dark:border-indigo-900/50 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                                                <div className="flex-1 flex items-center gap-2">
                                                  <button
                                                    type="button"
                                                    onClick={() => toggleSubmoduleExpand(submod.id)}
                                                    className="p-1 text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-300 rounded hover:bg-white dark:hover:bg-slate-800 transition"
                                                  >
                                                    {isSubExpanded ? (
                                                      <ChevronUp className="w-3.5 h-3.5" />
                                                    ) : (
                                                      <ChevronDown className="w-3.5 h-3.5" />
                                                    )}
                                                  </button>

                                                  <div className="flex-1">
                                                    <input
                                                      type="text"
                                                      required
                                                      value={submod.title}
                                                      onChange={(e) => handleUpdateSubmodule(modIdx, submodIdx, 'title', e.target.value)}
                                                      placeholder={`Sub-module ${modIdx + 1}.${submodIdx + 1} Title`}
                                                      className="w-full px-2 py-0.5 text-xs font-bold text-slate-900 dark:text-white bg-transparent border-b border-dashed border-indigo-200 dark:border-indigo-800 focus:border-indigo-500 focus:outline-none"
                                                    />
                                                    <input
                                                      type="text"
                                                      value={submod.description || ''}
                                                      onChange={(e) => handleUpdateSubmodule(modIdx, submodIdx, 'description', e.target.value)}
                                                      placeholder="Brief sub-module description (optional)"
                                                      className="w-full px-2 py-0.5 text-[11px] text-slate-500 dark:text-slate-400 bg-transparent border-none focus:outline-none"
                                                    />
                                                  </div>
                                                </div>

                                                <div className="flex items-center gap-1.5 self-end sm:self-auto">
                                                  <span className="text-[10px] font-semibold text-indigo-600 dark:text-indigo-400 bg-white dark:bg-slate-800 px-2 py-0.5 rounded-full border border-indigo-200 dark:border-indigo-800">
                                                    {subTopicsCount} {subTopicsCount === 1 ? 'topic' : 'topics'}
                                                  </span>

                                                  <button
                                                    type="button"
                                                    onClick={() => handleAddSubmoduleTopic(modIdx, submodIdx)}
                                                    className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-[11px] transition shadow-2xs"
                                                    title="Add topic to this sub-module"
                                                  >
                                                    <Plus className="w-3 h-3" />
                                                    <span>Add Topic</span>
                                                  </button>

                                                  <button
                                                    type="button"
                                                    onClick={() => handleDeleteSubmodule(modIdx, submodIdx)}
                                                    className="p-1 text-slate-400 hover:text-red-600 dark:hover:text-red-400 rounded hover:bg-red-50 dark:hover:bg-red-950/40 transition"
                                                    title="Delete sub-module"
                                                  >
                                                    <Trash2 className="w-3.5 h-3.5" />
                                                  </button>
                                                </div>
                                              </div>

                                              {/* Sub-module Topics */}
                                              {isSubExpanded && (
                                                <div className="p-3 space-y-2 bg-slate-50/40 dark:bg-slate-950/20">
                                                  {(!submod.topics || submod.topics.length === 0) ? (
                                                    <div className="py-2.5 text-center text-[11px] text-slate-400 border border-dashed border-slate-200 dark:border-slate-800 rounded-lg">
                                                      <span>No topics in this sub-module. </span>
                                                      <button
                                                        type="button"
                                                        onClick={() => handleAddSubmoduleTopic(modIdx, submodIdx)}
                                                        className="text-indigo-600 dark:text-indigo-400 font-bold hover:underline"
                                                      >
                                                        + Add topic
                                                      </button>
                                                    </div>
                                                  ) : (
                                                    <div className="space-y-2">
                                                      {submod.topics.map((top, topIdx) => {
                                                        const isDetailsOpen = expandedTopicDetails[top.id];

                                                        return (
                                                          <div
                                                            key={top.id || topIdx}
                                                            className="p-2.5 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 space-y-2 shadow-2xs"
                                                          >
                                                            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                                                              <div className="flex items-center gap-1.5">
                                                                <span className="w-5 h-5 rounded bg-indigo-50 dark:bg-indigo-950/60 text-[9px] font-bold text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
                                                                  {modIdx + 1}.{submodIdx + 1}.{topIdx + 1}
                                                                </span>
                                                                <select
                                                                  value={top.type || 'text'}
                                                                  onChange={(e) => handleUpdateSubmoduleTopic(modIdx, submodIdx, topIdx, 'type', e.target.value)}
                                                                  className="px-1.5 py-1 text-[11px] rounded border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-semibold"
                                                                >
                                                                  <option value="video">Video</option>
                                                                  <option value="text">Text Note</option>
                                                                  <option value="quiz">Quiz / Test</option>
                                                                </select>
                                                              </div>

                                                              <input
                                                                type="text"
                                                                required
                                                                value={top.title}
                                                                onChange={(e) => handleUpdateSubmoduleTopic(modIdx, submodIdx, topIdx, 'title', e.target.value)}
                                                                placeholder="Topic title..."
                                                                className="flex-1 px-2.5 py-1 text-xs font-semibold text-slate-900 dark:text-white bg-slate-50 dark:bg-slate-800/60 rounded border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                                                              />

                                                              <input
                                                                type="text"
                                                                value={top.duration || '15 mins'}
                                                                onChange={(e) => handleUpdateSubmoduleTopic(modIdx, submodIdx, topIdx, 'duration', e.target.value)}
                                                                placeholder="Duration"
                                                                className="w-20 px-2 py-1 text-xs text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-800/60 rounded border border-slate-200 dark:border-slate-700 text-center"
                                                              />

                                                              <div className="flex items-center gap-1 justify-end">
                                                                <button
                                                                  type="button"
                                                                  onClick={() => toggleTopicDetails(top.id)}
                                                                  className={`px-2 py-1 text-[10px] font-bold rounded border transition ${
                                                                    isDetailsOpen
                                                                      ? 'bg-indigo-50 dark:bg-indigo-950 text-indigo-600 border-indigo-200'
                                                                      : 'text-slate-500 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800'
                                                                  }`}
                                                                >
                                                                  {isDetailsOpen ? 'Hide Content' : 'Edit Content'}
                                                                </button>

                                                                <button
                                                                  type="button"
                                                                  onClick={() => handleDeleteSubmoduleTopic(modIdx, submodIdx, topIdx)}
                                                                  className="p-1 text-slate-400 hover:text-red-500 rounded hover:bg-red-50 dark:hover:bg-red-950/40 transition"
                                                                  title="Delete this topic"
                                                                >
                                                                  <Trash2 className="w-3.5 h-3.5" />
                                                                </button>
                                                              </div>
                                                            </div>

                                                            {/* Expandable Topic Notes / Video URL */}
                                                            {isDetailsOpen && (
                                                              <div className="p-2.5 bg-slate-50/80 dark:bg-slate-800/50 rounded-lg space-y-2 border border-slate-200/80 dark:border-slate-700/80 text-xs animate-fadeIn">
                                                                {top.type === 'video' && (
                                                                  <div>
                                                                    <label className="font-semibold text-slate-600 dark:text-slate-300 block mb-1 text-[11px]">
                                                                      Video Embed URL:
                                                                    </label>
                                                                    <input
                                                                      type="text"
                                                                      value={top.videoUrl || ''}
                                                                      onChange={(e) => handleUpdateSubmoduleTopic(modIdx, submodIdx, topIdx, 'videoUrl', e.target.value)}
                                                                      placeholder="https://www.youtube.com/embed/..."
                                                                      className="w-full px-2 py-1 text-xs bg-white dark:bg-slate-900 rounded border border-slate-200 dark:border-slate-700 font-mono"
                                                                    />
                                                                  </div>
                                                                )}

                                                                <RichTextarea
                                                                  label="Lesson Notes & Learning Text:"
                                                                  rows={3}
                                                                  value={top.content || ''}
                                                                  onChange={(e) => handleUpdateSubmoduleTopic(modIdx, submodIdx, topIdx, 'content', e.target.value)}
                                                                  placeholder="Detailed notes, study points, code snippets, or instructions..."
                                                                />
                                                              </div>
                                                            )}
                                                          </div>
                                                        );
                                                      })}
                                                    </div>
                                                  )}
                                                </div>
                                              )}
                                            </div>
                                          );
                                        })}
                                      </div>
                                    )}
                                  </div>

                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                )}

                {/* Modal Sticky Bottom Action Footer */}
                <div className="p-4 sm:p-6 bg-slate-50/80 dark:bg-slate-800/40 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
                  <div className="text-xs text-slate-500 dark:text-slate-400">
                    <span className="font-bold text-slate-700 dark:text-slate-200">Total Curriculum:</span>{' '}
                    {formData.modules?.length || 0} Modules, {totalSubmodulesInForm > 0 ? `${totalSubmodulesInForm} Sub-modules, ` : ''}{totalTopicsInForm} Topics
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setModalOpen(false)}
                      className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold transition"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs shadow-md transition flex items-center gap-1.5"
                    >
                      <Save className="w-4 h-4" /> Save Course & Curriculum
                    </button>
                  </div>
                </div>

              </form>

            </div>
          </div>
        )}

      </div>
    </DashboardLayout>
  );
};
