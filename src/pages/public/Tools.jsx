import React, { useState, useEffect } from 'react';
import { 
  Wrench, 
  Search, 
  Sparkles, 
  Calculator, 
  Award, 
  GraduationCap, 
  ArrowRightLeft, 
  Calendar, 
  FileText, 
  Target, 
  CheckSquare, 
  Copy,
  ArrowRight
} from 'lucide-react';
import { getTools } from '../../services/firebaseService';
import { Badge } from '../../components/common/Badge';
import { useAuth } from '../../context/AuthContext';
import { PremiumGateModal } from '../../components/common/PremiumGateModal';

// Interactive Tool Components
import { PercentageCalculator } from '../../components/tools/PercentageCalculator';
import { GradeCalculator } from '../../components/tools/GradeCalculator';
import { GpaCalculator } from '../../components/tools/GpaCalculator';
import { ScientificCalculator } from '../../components/tools/ScientificCalculator';
import { UnitConverter } from '../../components/tools/UnitConverter';
import { StudyPlanner } from '../../components/tools/StudyPlanner';
import { WordCounter } from '../../components/tools/WordCounter';
import { LearningProgressCalculator } from '../../components/tools/LearningProgressCalculator';
import { QuizGeneratorTool } from '../../components/tools/QuizGeneratorTool';
import { McqGeneratorTool } from '../../components/tools/McqGeneratorTool';

export const Tools = () => {
  const { isPremium } = useAuth();
  const [tools, setTools] = useState([]);
  const [activeToolId, setActiveToolId] = useState('tool-1');
  const [membershipFilter, setMembershipFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [gateOpen, setGateOpen] = useState(false);
  const [selectedResource, setSelectedResource] = useState('');

  useEffect(() => {
    const load = async () => {
      const data = await getTools();
      setTools(data);
    };
    load();
  }, []);

  const handleToolClick = (tool) => {
    if (tool.membership === 'premium' && !isPremium) {
      setSelectedResource(tool.name);
      setGateOpen(true);
      return;
    }
    setActiveToolId(tool.id);
    window.scrollTo({ top: 380, behavior: 'smooth' });
  };

  const filteredTools = tools.filter(t => {
    const matchesSearch = 
      t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesMem = membershipFilter === 'all' || t.membership === membershipFilter;
    return matchesSearch && matchesMem;
  });

  const renderActiveToolComponent = () => {
    switch (activeToolId) {
      case 'tool-1': return <PercentageCalculator />;
      case 'tool-2': return <GradeCalculator />;
      case 'tool-3': return <GpaCalculator />;
      case 'tool-4': return <ScientificCalculator />;
      case 'tool-5': return <UnitConverter />;
      case 'tool-6': return <QuizGeneratorTool />;
      case 'tool-7': return <McqGeneratorTool />;
      case 'tool-8': return <StudyPlanner />;
      case 'tool-9': return <WordCounter />;
      case 'tool-10': return <LearningProgressCalculator />;
      default: return <PercentageCalculator />;
    }
  };

  const activeTool = tools.find(t => t.id === activeToolId);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 dark:bg-brand-950/60 text-brand-600 dark:text-brand-400 text-xs font-bold uppercase tracking-wider mb-3">
          <Wrench className="w-3.5 h-3.5" /> Interactive Academic Utilities
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white">
          Educational Tools Studio
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 max-w-2xl">
          Practical calculators, study planners, word metrics, and AI quiz synthesis tools designed for students, teachers, and professionals.
        </p>
      </div>

      {/* Filter Toolbar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search tools..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
          />
        </div>

        <div className="flex items-center gap-1.5 self-end sm:self-auto text-xs font-semibold">
          <span className="text-slate-400 mr-1">Show:</span>
          {['all', 'free', 'premium'].map(type => (
            <button
              key={type}
              onClick={() => setMembershipFilter(type)}
              className={`px-3 py-1.5 rounded-lg capitalize transition ${
                membershipFilter === type
                  ? 'bg-brand-600 text-white shadow-sm'
                  : 'bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Tool Selector Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
        {filteredTools.map((tool) => {
          const isSelected = tool.id === activeToolId;
          return (
            <div
              key={tool.id}
              onClick={() => handleToolClick(tool)}
              className={`p-4 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between ${
                isSelected
                  ? 'bg-brand-50/80 dark:bg-brand-950/60 border-brand-600 ring-2 ring-brand-500/20 shadow-md'
                  : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 shadow-sm'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <Badge type={tool.membership} size="xs" />
                  {isSelected && <span className="w-2 h-2 rounded-full bg-brand-600" />}
                </div>
                <h4 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white mb-1 line-clamp-1">
                  {tool.name}
                </h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2">
                  {tool.description}
                </p>
              </div>

              <div className="mt-3 pt-2 border-t border-slate-100 dark:border-slate-800 text-[10px] font-bold text-brand-600 dark:text-brand-400 flex items-center justify-between">
                <span>{tool.category}</span>
                <span>Select →</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Active Interactive Tool Workspace */}
      <div className="mt-6">
        <div className="flex items-center justify-between mb-3 px-1">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Active Workspace: <strong className="text-slate-700 dark:text-slate-200">{activeTool?.name || "Calculator"}</strong>
          </div>
          <Badge type={activeTool?.membership || 'free'} size="xs" />
        </div>

        {/* Dynamic Tool Renderer */}
        <div className="transition-all duration-200">
          {renderActiveToolComponent()}
        </div>
      </div>

      {/* Premium Gate */}
      <PremiumGateModal
        isOpen={gateOpen}
        onClose={() => setGateOpen(false)}
        resourceTitle={selectedResource}
      />
    </div>
  );
};
