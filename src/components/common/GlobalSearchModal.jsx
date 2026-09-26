import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, BookOpen, Layers, Wrench, FileText, Sparkles, ArrowRight } from 'lucide-react';
import { getCourses, getApps, getTools, getContent } from '../../services/firebaseService';
import { Badge } from './Badge';

export const GlobalSearchModal = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('all'); // all, courses, apps, tools, content
  const [membershipFilter, setMembershipFilter] = useState('all'); // all, free, premium

  const [courses, setCourses] = useState([]);
  const [apps, setApps] = useState([]);
  const [tools, setTools] = useState([]);
  const [content, setContent] = useState([]);

  useEffect(() => {
    if (isOpen) {
      const loadData = async () => {
        const [c, a, t, cnt] = await Promise.all([
          getCourses(),
          getApps(),
          getTools(),
          getContent()
        ]);
        setCourses(c);
        setApps(a);
        setTools(t);
        setContent(cnt);
      };
      loadData();
    }
  }, [isOpen]);

  const results = useMemo(() => {
    if (!searchTerm.trim()) return { courses: [], apps: [], tools: [], content: [], total: 0 };
    const query = searchTerm.toLowerCase();

    const filterItem = (item) => {
      const matchesText = 
        (item.title || item.name || '').toLowerCase().includes(query) ||
        (item.description || '').toLowerCase().includes(query) ||
        (item.category || '').toLowerCase().includes(query);

      const matchesMembership = 
        membershipFilter === 'all' || item.membership === membershipFilter;

      return matchesText && matchesMembership;
    };

    const filteredCourses = activeTab === 'all' || activeTab === 'courses' ? courses.filter(filterItem) : [];
    const filteredApps = activeTab === 'all' || activeTab === 'apps' ? apps.filter(filterItem) : [];
    const filteredTools = activeTab === 'all' || activeTab === 'tools' ? tools.filter(filterItem) : [];
    const filteredContent = activeTab === 'all' || activeTab === 'content' ? content.filter(filterItem) : [];

    const total = filteredCourses.length + filteredApps.length + filteredTools.length + filteredContent.length;

    return {
      courses: filteredCourses,
      apps: filteredApps,
      tools: filteredTools,
      content: filteredContent,
      total
    };
  }, [searchTerm, activeTab, membershipFilter, courses, apps, tools, content]);

  if (!isOpen) return null;

  const handleSelect = (url) => {
    onClose();
    navigate(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-150">
      <div 
        className="w-full max-w-2xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col max-h-[80vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-slate-200 dark:border-slate-800 gap-3">
          <Search className="w-5 h-5 text-slate-400" />
          <input
            type="text"
            placeholder="Search across courses, apps, tools, and content..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            autoFocus
            className="flex-1 bg-transparent text-slate-900 dark:text-white placeholder-slate-400 text-base focus:outline-none"
          />
          {searchTerm && (
            <button 
              onClick={() => setSearchTerm('')} 
              className="p-1 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <kbd className="hidden sm:inline-block px-2 py-0.5 text-xs font-mono bg-slate-100 dark:bg-slate-800 text-slate-500 rounded border border-slate-300 dark:border-slate-700">
            ESC
          </kbd>
          <button 
            onClick={onClose}
            className="sm:hidden p-1 text-slate-400 hover:text-slate-600 dark:hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab & Membership Filter Bar */}
        <div className="flex items-center justify-between px-4 py-2 bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800 text-xs overflow-x-auto gap-2">
          <div className="flex items-center gap-1">
            {[
              { id: 'all', label: 'All' },
              { id: 'courses', label: 'Courses' },
              { id: 'apps', label: 'Apps' },
              { id: 'tools', label: 'Tools' },
              { id: 'content', label: 'Content' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3 py-1 rounded-lg font-medium transition ${
                  activeTab === tab.id 
                    ? 'bg-brand-600 text-white shadow-sm' 
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-1 flex-shrink-0">
            <span className="text-slate-400 mr-1 hidden sm:inline">Access:</span>
            {['all', 'free', 'premium'].map(type => (
              <button
                key={type}
                onClick={() => setMembershipFilter(type)}
                className={`px-2 py-1 rounded capitalize font-medium transition ${
                  membershipFilter === type 
                    ? 'bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-white font-semibold' 
                    : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* Results Container */}
        <div className="overflow-y-auto flex-1 p-4 divide-y divide-slate-100 dark:divide-slate-800">
          {!searchTerm.trim() ? (
            <div className="text-center py-10 text-slate-400">
              <Search className="w-10 h-10 mx-auto mb-2 opacity-40" />
              <p className="text-sm">Type any keyword to search courses, tools, apps, and articles...</p>
              <div className="mt-4 flex flex-wrap justify-center gap-2">
                <span className="text-xs text-slate-500 self-center">Popular:</span>
                {['Grammar', 'Algebra', 'Calculators', 'AI', 'Safety', 'Word Counter'].map(tag => (
                  <button
                    key={tag}
                    onClick={() => setSearchTerm(tag)}
                    className="text-xs px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-brand-600 dark:text-brand-400 hover:bg-brand-50"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          ) : results.total === 0 ? (
            <div className="text-center py-10 text-slate-400">
              <p className="text-base font-semibold text-slate-700 dark:text-slate-300">No results found for "{searchTerm}"</p>
              <p className="text-xs text-slate-500 mt-1">Try another keyword or change your filter.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Courses */}
              {results.courses.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                    <BookOpen className="w-3.5 h-3.5" /> Courses ({results.courses.length})
                  </div>
                  <div className="space-y-1">
                    {results.courses.map(course => (
                      <div
                        key={course.id}
                        onClick={() => handleSelect(`/courses/${course.id}`)}
                        className="group flex items-center justify-between p-2.5 rounded-xl hover:bg-brand-50/60 dark:hover:bg-slate-800/80 cursor-pointer transition"
                      >
                        <div className="flex items-center gap-3">
                          <img src={course.thumbnail} alt="" className="w-10 h-10 rounded-lg object-cover" />
                          <div>
                            <div className="font-semibold text-sm text-slate-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400">
                              {course.title}
                            </div>
                            <div className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1">
                              {course.category} • {course.level} • {course.duration}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge type={course.membership} size="xs" />
                          <ArrowRight className="w-4 h-4 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tools */}
              {results.tools.length > 0 && (
                <div className="pt-3">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                    <Wrench className="w-3.5 h-3.5" /> Tools ({results.tools.length})
                  </div>
                  <div className="space-y-1">
                    {results.tools.map(tool => (
                      <div
                        key={tool.id}
                        onClick={() => handleSelect(`/tools`)}
                        className="group flex items-center justify-between p-2.5 rounded-xl hover:bg-brand-50/60 dark:hover:bg-slate-800/80 cursor-pointer transition"
                      >
                        <div>
                          <div className="font-semibold text-sm text-slate-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400">
                            {tool.name}
                          </div>
                          <div className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1">
                            {tool.description}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge type={tool.membership} size="xs" />
                          <ArrowRight className="w-4 h-4 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Apps */}
              {results.apps.length > 0 && (
                <div className="pt-3">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                    <Layers className="w-3.5 h-3.5" /> Apps ({results.apps.length})
                  </div>
                  <div className="space-y-1">
                    {results.apps.map(app => (
                      <div
                        key={app.id}
                        onClick={() => handleSelect(`/apps`)}
                        className="group flex items-center justify-between p-2.5 rounded-xl hover:bg-brand-50/60 dark:hover:bg-slate-800/80 cursor-pointer transition"
                      >
                        <div>
                          <div className="font-semibold text-sm text-slate-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400">
                            {app.name}
                          </div>
                          <div className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1">
                            {app.description}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge type={app.membership} size="xs" />
                          <ArrowRight className="w-4 h-4 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Content */}
              {results.content.length > 0 && (
                <div className="pt-3">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                    <FileText className="w-3.5 h-3.5" /> Content ({results.content.length})
                  </div>
                  <div className="space-y-1">
                    {results.content.map(item => (
                      <div
                        key={item.id}
                        onClick={() => handleSelect(`/content`)}
                        className="group flex items-center justify-between p-2.5 rounded-xl hover:bg-brand-50/60 dark:hover:bg-slate-800/80 cursor-pointer transition"
                      >
                        <div>
                          <div className="font-semibold text-sm text-slate-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400">
                            {item.title}
                          </div>
                          <div className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1">
                            {item.contentType} • {item.category}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge type={item.membership} size="xs" />
                          <ArrowRight className="w-4 h-4 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
