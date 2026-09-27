import React, { useState, useEffect, useMemo } from 'react';
import { 
  Layers, 
  Sparkles, 
  Search, 
  ExternalLink, 
  Gamepad2, 
  BookOpen, 
  ShieldCheck, 
  Brain, 
  Repeat, 
  Compass, 
  X,
  Play
} from 'lucide-react';
import { getApps } from '../../services/firebaseService';
import { Badge } from '../../components/common/Badge';
import { useAuth } from '../../context/AuthContext';
import { PremiumGateModal } from '../../components/common/PremiumGateModal';

export const Apps = () => {
  const { isPremium } = useAuth();
  const [apps, setApps] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [membershipFilter, setMembershipFilter] = useState('all'); // all, free, premium

  const [activeAppModal, setActiveAppModal] = useState(null);
  const [gateOpen, setGateOpen] = useState(false);
  const [selectedResource, setSelectedResource] = useState('');

  useEffect(() => {
    const load = async () => {
      const data = await getApps();
      setApps(data);
    };
    load();
  }, []);

  const categories = useMemo(() => {
    const set = new Set(apps.map(a => a.category).filter(Boolean));
    return ['All', ...Array.from(set)];
  }, [apps]);

  const filteredApps = useMemo(() => {
    return apps.filter(app => {
      const matchesSearch = 
        app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCat = selectedCategory === 'All' || app.category === selectedCategory;
      const matchesMem = membershipFilter === 'all' || app.membership === membershipFilter;
      return matchesSearch && matchesCat && matchesMem;
    });
  }, [apps, searchTerm, selectedCategory, membershipFilter]);

  const handleLaunch = (app) => {
    if (app.membership === 'premium' && !isPremium) {
      setSelectedResource(app.name);
      setGateOpen(true);
      return;
    }
    setActiveAppModal(app);
  };

  const getIcon = (iconName) => {
    switch (iconName) {
      case 'Gamepad2': return <Gamepad2 className="w-6 h-6" />;
      case 'BookOpen': return <BookOpen className="w-6 h-6" />;
      case 'ShieldCheck': return <ShieldCheck className="w-6 h-6" />;
      case 'Brain': return <Brain className="w-6 h-6" />;
      case 'Repeat': return <Repeat className="w-6 h-6" />;
      case 'Compass': return <Compass className="w-6 h-6" />;
      default: return <Sparkles className="w-6 h-6" />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple/10 text-purple text-xs font-bold uppercase tracking-wider mb-3">
          <Layers className="w-3.5 h-3.5" /> Interactive Learning Applications
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white">
          Learning Apps Catalog
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 max-w-2xl">
          Gamified web apps built for vocabulary drills, cross-math equations, workplace safety, and interactive AI experimentation.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 sm:p-5 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search apps by keyword or feature..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple"
            />
          </div>

          <div className="flex items-center gap-2">
            <select
              value={membershipFilter}
              onChange={(e) => setMembershipFilter(e.target.value)}
              className="px-3 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-semibold text-slate-700 dark:text-slate-300"
            >
              <option value="all">All Tiers (Free & Pro)</option>
              <option value="free">Free Apps Only</option>
              <option value="premium">Premium Apps Only</option>
            </select>
          </div>
        </div>

        {/* Categories */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
          <span className="text-slate-400 font-semibold mr-1">Category:</span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl font-semibold whitespace-nowrap transition ${
                selectedCategory === cat
                  ? 'bg-purple text-white shadow-sm'
                  : 'bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredApps.map((app) => (
          <div
            key={app.id}
            className="group bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl hover:border-purple/40 transition-all flex flex-col overflow-hidden"
          >
            {/* Thumbnail or Icon header */}
            {app.thumbnail ? (
              <div className="w-full aspect-video bg-slate-100 dark:bg-slate-800 overflow-hidden relative">
                <img
                  src={app.thumbnail}
                  alt={app.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  onError={(e) => { e.target.style.display = 'none'; }}
                />
                <div className="absolute top-2 right-2">
                  <Badge type={app.membership} size="xs" />
                </div>
              </div>
            ) : (
              <div className="w-full aspect-video bg-gradient-to-br from-purple-50 to-violet-100 dark:from-purple-950/40 dark:to-violet-950/40 flex items-center justify-center relative">
                <div className="w-14 h-14 rounded-2xl bg-purple/10 text-purple flex items-center justify-center font-bold shadow-sm">
                  {getIcon(app.icon)}
                </div>
                <div className="absolute top-2 right-2">
                  <Badge type={app.membership} size="xs" />
                </div>
              </div>
            )}

            <div className="p-5 flex flex-col flex-1 justify-between">
              <div>
                <h3 className="font-bold text-base text-slate-900 dark:text-white mb-2 group-hover:text-purple transition">
                  {app.name}
                </h3>

                <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-3 leading-relaxed mb-4">
                  {app.description}
                </p>

                <div className="flex items-center gap-2 text-[11px] text-slate-400 mb-4">
                  <span className="bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded font-medium">
                    {app.platform || "Web / Mobile"}
                  </span>
                  <span>•</span>
                  <span className="font-semibold text-slate-500">{app.category}</span>
                </div>
              </div>

              <button
                onClick={() => handleLaunch(app)}
                className={`w-full py-2.5 px-4 rounded-xl font-bold text-xs transition flex items-center justify-center gap-2 shadow-sm ${
                  app.membership === 'premium' && !isPremium
                    ? 'bg-amber-500 hover:bg-amber-600 text-white'
                    : 'bg-purple hover:bg-purple/90 text-white'
                }`}
              >
                {app.membership === 'premium' && !isPremium ? (
                  <>
                    <Sparkles className="w-4 h-4 fill-white" />
                    <span>Unlock App</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5 fill-white" />
                    <span>Launch Application</span>
                  </>
                )}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* App Runner Simulation Modal */}
      {activeAppModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-2xl overflow-hidden">
            <button
              onClick={() => setActiveAppModal(null)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 dark:hover:text-white rounded-full hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-purple/10 text-purple flex items-center justify-center font-bold">
                {getIcon(activeAppModal.icon)}
              </div>
              <div>
                <h3 className="text-xl font-black text-slate-900 dark:text-white">{activeAppModal.name}</h3>
                <p className="text-xs text-slate-500">{activeAppModal.category} • {activeAppModal.platform}</p>
              </div>
            </div>

            {/* Simulated Live App Canvas */}
            <div className="p-8 rounded-2xl bg-slate-950 text-white border border-slate-800 text-center space-y-4 shadow-inner">
              <div className="w-14 h-14 rounded-2xl bg-purple/20 text-purple flex items-center justify-center mx-auto border border-purple/30">
                <Play className="w-8 h-8 fill-purple text-purple ml-1" />
              </div>
              <h4 className="text-base font-bold">
                {activeAppModal.name} is running in interactive mode
              </h4>
              <p className="text-xs text-slate-400 max-w-md mx-auto leading-relaxed">
                {activeAppModal.description}
              </p>
              <div className="pt-2 flex justify-center gap-3">
                <button
                  onClick={() => alert(`Starting session in ${activeAppModal.name}`)}
                  className="px-6 py-2.5 rounded-xl bg-purple hover:bg-purple/90 text-white font-bold text-xs shadow"
                >
                  Start New Session
                </button>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setActiveAppModal(null)}
                className="px-5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300"
              >
                Close App
              </button>
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
