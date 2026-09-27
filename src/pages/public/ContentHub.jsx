import React, { useState, useEffect, useMemo } from 'react';
import { 
  FileText, 
  Search, 
  Download, 
  BookOpen, 
  Sparkles, 
  Calendar, 
  User, 
  X, 
  Eye, 
  Printer,
  Edit3
} from 'lucide-react';
import { getContent } from '../../services/firebaseService';
import { Badge } from '../../components/common/Badge';
import { useAuth } from '../../context/AuthContext';
import { PremiumGateModal } from '../../components/common/PremiumGateModal';
import { IslamiatVocabViewer } from '../../components/common/IslamiatVocabViewer';
import { EnglishPdfViewer } from '../../components/common/EnglishPdfViewer';
import { EnglishWorksheetViewer } from '../../components/common/EnglishWorksheetViewer';
import { FBISE_ISLAMIAT_9_VOCAB } from '../../data/fbiseIslamiatVocab';

export const ContentHub = () => {
  const { isPremium } = useAuth();
  const [content, setContent] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [membershipFilter, setMembershipFilter] = useState('all');

  const [activeReadingItem, setActiveReadingItem] = useState(null);
  const [gateOpen, setGateOpen] = useState(false);
  const [selectedResource, setSelectedResource] = useState('');

  useEffect(() => {
    const load = async () => {
      const data = await getContent();
      const sorted = [...data].sort((a, b) => new Date(b.publishDate || 0) - new Date(a.publishDate || 0));
      setContent(sorted);
    };
    load();
  }, []);

  const types = useMemo(() => {
    const set = new Set(content.map(c => c.contentType).filter(Boolean));
    return ['All', ...Array.from(set)];
  }, [content]);

  const categories = useMemo(() => {
    const set = new Set(content.map(c => c.category).filter(Boolean));
    return ['All', ...Array.from(set)];
  }, [content]);

  const filteredContent = useMemo(() => {
    return content.filter(item => {
      // Only show published educational content on public hub (pending items await admin approval)
      const isPublished = item.status === 'published' || !item.status;
      if (!isPublished) return false;

      const matchesSearch = 
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.category.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = selectedType === 'All' || item.contentType === selectedType;
      const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
      const matchesMem = membershipFilter === 'all' || item.membership === membershipFilter;
      return matchesSearch && matchesType && matchesCategory && matchesMem;
    });
  }, [content, searchTerm, selectedType, selectedCategory, membershipFilter]);

  const handleRead = (item) => {
    if (item.membership === 'premium' && !isPremium) {
      setSelectedResource(item.title);
      setGateOpen(true);
      return;
    }
    setActiveReadingItem(item);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-bold uppercase tracking-wider mb-3">
          <FileText className="w-3.5 h-3.5" /> Curated Knowledge Library
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white">
          Educational Content & Guides
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 max-w-2xl">
          High-yield reference guides, formula sheets, worksheets, exam preparation roadmaps, and academic articles.
        </p>
      </div>

      {/* Filter Toolbar */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 sm:p-5 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search content by title, topic, or keyword..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div className="flex items-center gap-2">
            <select
              value={membershipFilter}
              onChange={(e) => setMembershipFilter(e.target.value)}
              className="px-3 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-semibold text-slate-700 dark:text-slate-300"
            >
              <option value="all">All Tiers (Free & Pro)</option>
              <option value="free">Free Resources Only</option>
              <option value="premium">Premium Resources Only</option>
            </select>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs border-b border-slate-100 dark:border-slate-800/80">
          <span className="text-slate-400 font-semibold mr-1">Category:</span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl font-semibold whitespace-nowrap transition ${
                selectedCategory === cat
                  ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-sm'
                  : 'bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Content Type Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
          <span className="text-slate-400 font-semibold mr-1">Type:</span>
          {types.map((type) => (
            <button
              key={type}
              onClick={() => setSelectedType(type)}
              className={`px-3 py-1.5 rounded-xl font-semibold whitespace-nowrap transition ${
                selectedType === type
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredContent.map((item) => (
          <div
            key={item.id}
            className="group bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-xl hover:border-emerald-500/40 transition-all flex flex-col justify-between"
          >
            <div>
              {/* Thumbnail */}
              <div className="relative aspect-video overflow-hidden bg-slate-100 dark:bg-slate-800">
                {item.thumbnail ? (
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling?.classList.remove('hidden'); }}
                  />
                ) : null}
                {/* Gradient fallback shown when no thumbnail or img fails */}
                {!item.thumbnail && (
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-100 dark:from-emerald-950/40 dark:via-teal-950/40 dark:to-cyan-950/40 flex items-center justify-center">
                    <FileText className="w-10 h-10 text-emerald-300 dark:text-emerald-700" />
                  </div>
                )}
                <div className="absolute top-3 left-3">
                  <Badge type={item.membership} size="xs" />
                </div>
                <div className="absolute bottom-3 left-3 px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-sm text-white text-[10px] font-semibold uppercase tracking-wider flex items-center gap-1.5">
                  <span>{item.contentType}</span>
                  {item.category === 'Islamiat' && (
                    <span className="text-amber-300 font-bold">• 80 Words</span>
                  )}
                  {item.isWorksheet && (
                    <span className="text-amber-300 font-bold">• A4 Fillable Worksheet</span>
                  )}
                  {(item.isEnglishPdf || item.contentType === 'PDFs') && !item.isWorksheet && (
                    <span className="text-amber-300 font-bold">• A4 Printable Chart</span>
                  )}
                </div>
              </div>

              {/* Body */}
              <div className="p-5">
                <div className="flex items-center justify-between text-[11px] text-slate-400 mb-2">
                  <span className="font-semibold text-emerald-600 dark:text-emerald-400">{item.category}</span>
                  <span>{item.publishDate}</span>
                </div>

                <h3 className={`font-bold text-base text-slate-900 dark:text-white mb-2 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition ${item.category === 'Islamiat' ? 'font-serif' : ''}`}>
                  {item.title}
                </h3>

                <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-3 leading-relaxed mb-4">
                  {item.description}
                </p>

                <div className="text-[11px] text-slate-400">
                  Author: <strong className="text-slate-700 dark:text-slate-300">{item.author}</strong>
                </div>
              </div>
            </div>

            {/* Action */}
            <div className="p-5 pt-0">
              <button
                onClick={() => handleRead(item)}
                className={`w-full py-2.5 px-4 rounded-xl font-bold text-xs transition flex items-center justify-center gap-2 shadow-sm ${
                  item.membership === 'premium' && !isPremium
                    ? 'bg-amber-500 hover:bg-amber-600 text-white'
                    : 'bg-emerald-600 hover:bg-emerald-700 text-white'
                }`}
              >
                {item.membership === 'premium' && !isPremium ? (
                  <>
                    <Sparkles className="w-3.5 h-3.5 fill-white" />
                    <span>Unlock Guide</span>
                  </>
                ) : item.isWorksheet ? (
                  <>
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>Practice & Print Worksheet</span>
                  </>
                ) : item.isEnglishPdf || item.contentType === 'PDFs' ? (
                  <>
                    <Printer className="w-3.5 h-3.5" />
                    <span>View & Print PDF Chart</span>
                  </>
                ) : (
                  <>
                    <Eye className="w-3.5 h-3.5" />
                    <span>Read Guide</span>
                  </>
                )}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Reading Modal */}
      {activeReadingItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md">
          <div className={`relative w-full ${
            activeReadingItem.isWorksheet ||
            activeReadingItem.worksheetType ||
            activeReadingItem.isEnglishPdf || 
            activeReadingItem.contentType === 'PDFs' || 
            activeReadingItem.pdfType ||
            activeReadingItem.isVocabGuide || 
            activeReadingItem.id === 'content-fbise-islamiat-9-vocab'
              ? 'max-w-5xl' 
              : 'max-w-3xl'
          } max-h-[92vh] bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col overflow-hidden`}>
            
            {/* Header */}
            <div className="p-5 sm:p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Badge type={activeReadingItem.membership} size="xs" />
                  <span className="text-xs text-slate-400 font-semibold">
                    {activeReadingItem.contentType} • {activeReadingItem.category}
                  </span>
                  {activeReadingItem.isWorksheet && (
                    <span className="text-[11px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold">
                      A4 Fillable Worksheet • 2 Pages • Free
                    </span>
                  )}
                  {(activeReadingItem.isEnglishPdf || activeReadingItem.contentType === 'PDFs') && !activeReadingItem.isWorksheet && (
                    <span className="text-[11px] px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 font-bold">
                      A4 Printable PDF • 2 Pages • Free
                    </span>
                  )}
                  {(activeReadingItem.isVocabGuide || activeReadingItem.id === 'content-fbise-islamiat-9-vocab') && (
                    <span className="text-[11px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold">
                      80 Words • FBISE 9th
                    </span>
                  )}
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                  {activeReadingItem.title}
                </h2>
              </div>
              <button
                onClick={() => setActiveReadingItem(null)}
                className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-white rounded-full hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Reading Body */}
            {activeReadingItem.isWorksheet || activeReadingItem.worksheetType ? (
              <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-slate-50 dark:bg-slate-950/60">
                <EnglishWorksheetViewer 
                  worksheetType={activeReadingItem.worksheetType || 'active-passive'}
                  onPrint={() => window.print()}
                />
              </div>
            ) : activeReadingItem.isEnglishPdf || activeReadingItem.contentType === 'PDFs' || activeReadingItem.pdfType ? (
              <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-slate-50 dark:bg-slate-950/60">
                <EnglishPdfViewer 
                  pdfType={activeReadingItem.pdfType || 'active-passive'}
                  onPrint={() => window.print()}
                />
              </div>
            ) : activeReadingItem.isVocabGuide || activeReadingItem.id === 'content-fbise-islamiat-9-vocab' ? (
              <div className="flex-1 overflow-y-auto p-4 sm:p-6">
                <IslamiatVocabViewer 
                  vocabList={activeReadingItem.vocabData || FBISE_ISLAMIAT_9_VOCAB}
                  onPrint={() => window.print()}
                />
              </div>
            ) : (
              <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-4">
                <div className="flex items-center justify-between text-xs text-slate-400 pb-4 border-b border-slate-100 dark:border-slate-800">
                  <span>Author: <strong className="text-slate-700 dark:text-slate-300">{activeReadingItem.author}</strong></span>
                  <span>Published: {activeReadingItem.publishDate}</span>
                </div>

                <div className="prose dark:prose-invert max-w-none text-slate-800 dark:text-slate-200 text-sm sm:text-base whitespace-pre-line leading-relaxed">
                  {activeReadingItem.body || activeReadingItem.description}
                </div>
              </div>
            )}

            {/* Footer */}
            <div className="p-4 bg-slate-50 dark:bg-slate-800/60 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <span className="text-xs text-slate-400">D.TEN Verified Academic Document</span>
              <div className="flex gap-2">
                <button
                  onClick={() => window.print()}
                  className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5 hover:bg-white dark:hover:bg-slate-800"
                >
                  <Printer className="w-3.5 h-3.5" /> Print
                </button>
                <button
                  onClick={() => setActiveReadingItem(null)}
                  className="px-4 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 dark:bg-slate-700 text-xs font-bold text-slate-800 dark:text-white"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Premium Gate */}
      <PremiumGateModal
        isOpen={gateOpen}
        onClose={() => setGateOpen(false)}
        resourceTitle={selectedResource}
      />
    </div>
  );
};
