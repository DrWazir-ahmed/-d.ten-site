import React, { useState, useEffect } from 'react';
import { 
  X, 
  Plus, 
  Trash2, 
  CheckCircle2, 
  HelpCircle, 
  Clock, 
  Award, 
  Shuffle, 
  Settings, 
  Eye, 
  Sparkles, 
  ArrowUp, 
  ArrowDown, 
  Copy, 
  Columns, 
  ListOrdered, 
  AlertCircle,
  Check,
  RotateCcw
} from 'lucide-react';
import { Badge } from '../common/Badge';

export const DEFAULT_TEST_SETTINGS = {
  passingScore: 70,
  timeLimit: 15, // in minutes; 0 = unlimited
  attemptsAllowed: 0, // 0 = unlimited, or 1, 2, 3
  shuffleQuestions: false,
  shuffleOptions: false,
  showInstantFeedback: false,
  requirePassingToProceed: true,
  instructions: 'Answer all questions carefully before submitting. You need to meet the passing score to complete this assessment.'
};

export const createSampleQuestions = () => [
  {
    id: `q-${Date.now()}-1`,
    type: 'mcq',
    question: 'Which of the following is a primary part of speech that names a person, place, thing, or concept?',
    options: ['Verb', 'Noun', 'Adjective', 'Preposition'],
    correctAnswer: 1, // 'Noun'
    explanation: 'A noun is a naming word representing a person, place, thing, or abstract idea.',
    points: 1
  },
  {
    id: `q-${Date.now()}-2`,
    type: 'true_false',
    question: 'In English grammar, an adverb can only modify a verb and cannot modify an adjective.',
    correctAnswer: false,
    explanation: 'Adverbs modify verbs, adjectives, and other adverbs (e.g., "very quickly").',
    points: 1
  },
  {
    id: `q-${Date.now()}-3`,
    type: 'matching',
    question: 'Match each literary and grammatical term with its correct definition:',
    pairs: [
      { id: 'p1', left: 'Metaphor', right: 'Direct comparison without using "like" or "as"' },
      { id: 'p2', left: 'Simile', right: 'Comparison between two items using "like" or "as"' },
      { id: 'p3', left: 'Syntax', right: 'The arrangement of words and phrases to form valid sentences' },
      { id: 'p4', left: 'Oxymoron', right: 'Figure of speech pairing contradictory terms' }
    ],
    explanation: 'Correct terminology associations reinforce language comprehension and analytical reading skills.',
    points: 2
  },
  {
    id: `q-${Date.now()}-4`,
    type: 'ordering',
    question: 'Arrange the standard stages of the writing and essay formulation process in correct sequential order:',
    items: [
      '1. Brainstorming & Topic Selection',
      '2. Creating an Outline & Thesis Statement',
      '3. Drafting the Initial Manuscript',
      '4. Editing, Proofreading & Final Revision'
    ],
    explanation: 'Following the iterative writing sequence ensures structured coherence and logical idea progression.',
    points: 2
  }
];

export const TestBuilderModal = ({
  isOpen,
  onClose,
  initialData = null,
  onSave,
  stageTitle = 'Assessment Stage'
}) => {
  const [activeTab, setActiveTab] = useState('questions'); // 'questions' | 'settings' | 'preview'
  const [title, setTitle] = useState('');
  const [settings, setSettings] = useState(DEFAULT_TEST_SETTINGS);
  const [questions, setQuestions] = useState([]);
  const [expandedQuestions, setExpandedQuestions] = useState({});

  // Preview interactive state
  const [previewAnswers, setPreviewAnswers] = useState({});
  const [previewSubmitted, setPreviewSubmitted] = useState(false);
  const [previewScore, setPreviewScore] = useState(0);

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title || 'Course Assessment');
      setSettings({
        ...DEFAULT_TEST_SETTINGS,
        ...(initialData.settings || {})
      });
      if (initialData.questions && initialData.questions.length > 0) {
        setQuestions(initialData.questions);
      } else {
        setQuestions(createSampleQuestions());
      }
    } else {
      setTitle('Course Assessment & Knowledge Check');
      setSettings(DEFAULT_TEST_SETTINGS);
      setQuestions(createSampleQuestions());
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  // Question manipulation handlers
  const handleAddQuestion = (type) => {
    const qId = `q-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`;
    let newQ;

    if (type === 'mcq') {
      newQ = {
        id: qId,
        type: 'mcq',
        question: 'Enter your multiple choice question prompt here...',
        options: ['Option A', 'Option B', 'Option C', 'Option D'],
        correctAnswer: 0,
        explanation: 'Explanation for why this option is correct.',
        points: 1
      };
    } else if (type === 'true_false') {
      newQ = {
        id: qId,
        type: 'true_false',
        question: 'Enter the statement to evaluate as true or false...',
        correctAnswer: true,
        explanation: 'Clarification regarding why this statement is true or false.',
        points: 1
      };
    } else if (type === 'matching') {
      newQ = {
        id: qId,
        type: 'matching',
        question: 'Match the terms in Column A with their corresponding items in Column B:',
        pairs: [
          { id: `p-${Date.now()}-1`, left: 'Term 1', right: 'Matching Definition 1' },
          { id: `p-${Date.now()}-2`, left: 'Term 2', right: 'Matching Definition 2' },
          { id: `p-${Date.now()}-3`, left: 'Term 3', right: 'Matching Definition 3' }
        ],
        explanation: 'Review the foundational relationships between these matched items.',
        points: 2
      };
    } else if (type === 'ordering') {
      newQ = {
        id: qId,
        type: 'ordering',
        question: 'Arrange the following items in the correct sequential or chronological order:',
        items: [
          'Step 1: Initial Preparation',
          'Step 2: Execution & Implementation',
          'Step 3: Verification & Assessment'
        ],
        explanation: 'Logical sequence must follow the procedural steps outlined above.',
        points: 2
      };
    }

    setQuestions([...questions, newQ]);
    setExpandedQuestions(prev => ({ ...prev, [qId]: true }));
  };

  const handleUpdateQuestion = (index, field, value) => {
    const updated = [...questions];
    updated[index] = { ...updated[index], [field]: value };
    setQuestions(updated);
  };

  const handleDeleteQuestion = (index) => {
    if (window.confirm('Delete this question from the test?')) {
      const updated = questions.filter((_, i) => i !== index);
      setQuestions(updated);
    }
  };

  const handleDuplicateQuestion = (index) => {
    const q = questions[index];
    const clone = {
      ...q,
      id: `q-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      question: `${q.question} (Copy)`
    };
    const updated = [...questions];
    updated.splice(index + 1, 0, clone);
    setQuestions(updated);
  };

  const handleMoveQuestion = (index, direction) => {
    const targetIdx = direction === 'up' ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= questions.length) return;
    const updated = [...questions];
    const temp = updated[index];
    updated[index] = updated[targetIdx];
    updated[targetIdx] = temp;
    setQuestions(updated);
  };

  const toggleExpand = (qId) => {
    setExpandedQuestions(prev => ({ ...prev, [qId]: !prev[qId] }));
  };

  // MCQ Option handlers
  const handleUpdateOption = (qIdx, optIdx, val) => {
    const q = questions[qIdx];
    const nextOptions = [...q.options];
    nextOptions[optIdx] = val;
    handleUpdateQuestion(qIdx, 'options', nextOptions);
  };

  const handleAddOption = (qIdx) => {
    const q = questions[qIdx];
    const nextOptions = [...(q.options || []), `Option ${String.fromCharCode(65 + (q.options?.length || 0))}`];
    handleUpdateQuestion(qIdx, 'options', nextOptions);
  };

  const handleDeleteOption = (qIdx, optIdx) => {
    const q = questions[qIdx];
    if (q.options.length <= 2) return alert('An MCQ must have at least 2 options.');
    const nextOptions = q.options.filter((_, i) => i !== optIdx);
    let nextCorrect = q.correctAnswer;
    if (nextCorrect === optIdx) nextCorrect = 0;
    else if (nextCorrect > optIdx) nextCorrect -= 1;
    handleUpdateQuestion(qIdx, 'options', nextOptions);
    handleUpdateQuestion(qIdx, 'correctAnswer', nextCorrect);
  };

  // Matching pair handlers
  const handleUpdatePair = (qIdx, pairIdx, side, val) => {
    const q = questions[qIdx];
    const nextPairs = [...q.pairs];
    nextPairs[pairIdx] = { ...nextPairs[pairIdx], [side]: val };
    handleUpdateQuestion(qIdx, 'pairs', nextPairs);
  };

  const handleAddPair = (qIdx) => {
    const q = questions[qIdx];
    const newPair = {
      id: `p-${Date.now()}-${(q.pairs?.length || 0) + 1}`,
      left: `Item ${(q.pairs?.length || 0) + 1}`,
      right: `Match ${(q.pairs?.length || 0) + 1}`
    };
    handleUpdateQuestion(qIdx, 'pairs', [...(q.pairs || []), newPair]);
  };

  const handleDeletePair = (qIdx, pairIdx) => {
    const q = questions[qIdx];
    if (q.pairs.length <= 2) return alert('Matching questions require at least 2 pairs.');
    handleUpdateQuestion(qIdx, 'pairs', q.pairs.filter((_, i) => i !== pairIdx));
  };

  // Ordering items handlers
  const handleUpdateOrderingItem = (qIdx, itemIdx, val) => {
    const q = questions[qIdx];
    const nextItems = [...q.items];
    nextItems[itemIdx] = val;
    handleUpdateQuestion(qIdx, 'items', nextItems);
  };

  const handleAddOrderingItem = (qIdx) => {
    const q = questions[qIdx];
    const nextItems = [...(q.items || []), `Step ${(q.items?.length || 0) + 1}`];
    handleUpdateQuestion(qIdx, 'items', nextItems);
  };

  const handleDeleteOrderingItem = (qIdx, itemIdx) => {
    const q = questions[qIdx];
    if (q.items.length <= 2) return alert('Ordering questions require at least 2 sequential steps.');
    handleUpdateQuestion(qIdx, 'items', q.items.filter((_, i) => i !== itemIdx));
  };

  const handleMoveOrderingItem = (qIdx, itemIdx, dir) => {
    const q = questions[qIdx];
    const targetIdx = dir === 'up' ? itemIdx - 1 : itemIdx + 1;
    if (targetIdx < 0 || targetIdx >= q.items.length) return;
    const nextItems = [...q.items];
    const temp = nextItems[itemIdx];
    nextItems[itemIdx] = nextItems[targetIdx];
    nextItems[targetIdx] = temp;
    handleUpdateQuestion(qIdx, 'items', nextItems);
  };

  // Total points calculation
  const totalPoints = questions.reduce((sum, q) => sum + (Number(q.points) || 1), 0);

  // Save handler
  const handleSaveTest = () => {
    if (!title.trim()) {
      alert('Please specify a title for this test.');
      return;
    }
    if (questions.length === 0) {
      alert('Please add at least one question before saving.');
      return;
    }

    const testPayload = {
      title,
      settings,
      questions,
      totalPoints,
      questionCount: questions.length,
      passingScore: Number(settings.passingScore) || 70,
      timeLimit: Number(settings.timeLimit) || 0,
      attemptsAllowed: Number(settings.attemptsAllowed) || 0
    };

    onSave(testPayload);
    onClose();
  };

  // Preview grading
  const handlePreviewSubmit = () => {
    let earned = 0;
    questions.forEach((q, idx) => {
      const ans = previewAnswers[q.id];
      if (q.type === 'mcq') {
        if (ans === q.correctAnswer) earned += Number(q.points) || 1;
      } else if (q.type === 'true_false') {
        if (ans === q.correctAnswer) earned += Number(q.points) || 1;
      } else if (q.type === 'matching') {
        // Evaluate pairs
        if (ans && typeof ans === 'object') {
          let pairMatches = 0;
          q.pairs.forEach(p => {
            if (ans[p.id] === p.right) pairMatches++;
          });
          const matchFrac = pairMatches / (q.pairs.length || 1);
          earned += Math.round(matchFrac * (Number(q.points) || 2));
        }
      } else if (q.type === 'ordering') {
        // ans is array of item strings
        if (Array.isArray(ans)) {
          let orderMatches = 0;
          q.items.forEach((item, i) => {
            if (ans[i] === item) orderMatches++;
          });
          const orderFrac = orderMatches / (q.items.length || 1);
          earned += Math.round(orderFrac * (Number(q.points) || 2));
        }
      }
    });

    const pct = totalPoints > 0 ? Math.round((earned / totalPoints) * 100) : 0;
    setPreviewScore(pct);
    setPreviewSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="w-full max-w-5xl max-h-[94vh] bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col overflow-hidden">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-900/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-black text-base sm:text-lg text-slate-900 dark:text-white">
                  Standard Testing Assessment Studio
                </h3>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300">
                  {stageTitle}
                </span>
              </div>
              <p className="text-xs text-slate-400">
                {questions.length} Items • {totalPoints} Total Points • Passing Target: {settings.passingScore}%
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="px-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-white dark:bg-slate-900 text-xs font-semibold">
          <div className="flex items-center gap-1 sm:gap-2">
            <button
              onClick={() => setActiveTab('questions')}
              className={`py-3 px-3.5 border-b-2 font-bold transition flex items-center gap-1.5 ${
                activeTab === 'questions'
                  ? 'border-brand-600 text-brand-600 dark:border-brand-400 dark:text-brand-400'
                  : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <HelpCircle className="w-4 h-4" />
              <span>Questions &amp; Items ({questions.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('settings')}
              className={`py-3 px-3.5 border-b-2 font-bold transition flex items-center gap-1.5 ${
                activeTab === 'settings'
                  ? 'border-brand-600 text-brand-600 dark:border-brand-400 dark:text-brand-400'
                  : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Settings className="w-4 h-4" />
              <span>Options &amp; Settings</span>
            </button>

            <button
              onClick={() => {
                setActiveTab('preview');
                setPreviewSubmitted(false);
                setPreviewAnswers({});
              }}
              className={`py-3 px-3.5 border-b-2 font-bold transition flex items-center gap-1.5 ${
                activeTab === 'preview'
                  ? 'border-brand-600 text-brand-600 dark:border-brand-400 dark:text-brand-400'
                  : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Eye className="w-4 h-4" />
              <span>Student Live Preview</span>
            </button>
          </div>

          <div className="hidden sm:flex items-center gap-2 py-2">
            <button
              onClick={handleSaveTest}
              className="px-4 py-2 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs shadow-sm transition flex items-center gap-1.5"
            >
              <Check className="w-4 h-4" /> Save &amp; Embed Test
            </button>
          </div>
        </div>

        {/* Main Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-slate-50/50 dark:bg-slate-950/40">
          
          {/* TAB 1: QUESTIONS & ITEMS */}
          {activeTab === 'questions' && (
            <div className="space-y-6 max-w-4xl mx-auto">
              
              {/* Test Title Input Card */}
              <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400">
                  Assessment / Test Title
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Module 1 Knowledge Check & Practice Exam"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-bold text-slate-900 dark:text-white text-sm"
                />
              </div>

              {/* Add Question Toolbar */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-brand-50 to-indigo-50 dark:from-brand-950/40 dark:to-indigo-950/30 border border-brand-200 dark:border-brand-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
                <div>
                  <h4 className="font-black text-sm text-slate-900 dark:text-white flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-brand-600" />
                    <span>Insert Question Item at this Stage</span>
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    Select any standard assessment item format to add to this course test:
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleAddQuestion('mcq')}
                    className="px-3 py-1.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 hover:border-brand-500 text-slate-700 dark:text-slate-200 font-bold text-xs shadow-2xs hover:shadow transition flex items-center gap-1.5"
                  >
                    <Plus className="w-3.5 h-3.5 text-brand-600" /> MCQ
                  </button>

                  <button
                    type="button"
                    onClick={() => handleAddQuestion('true_false')}
                    className="px-3 py-1.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 hover:border-emerald-500 text-slate-700 dark:text-slate-200 font-bold text-xs shadow-2xs hover:shadow transition flex items-center gap-1.5"
                  >
                    <Plus className="w-3.5 h-3.5 text-emerald-600" /> True / False
                  </button>

                  <button
                    type="button"
                    onClick={() => handleAddQuestion('matching')}
                    className="px-3 py-1.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 hover:border-purple-500 text-slate-700 dark:text-slate-200 font-bold text-xs shadow-2xs hover:shadow transition flex items-center gap-1.5"
                  >
                    <Columns className="w-3.5 h-3.5 text-purple-600" /> Matching Column
                  </button>

                  <button
                    type="button"
                    onClick={() => handleAddQuestion('ordering')}
                    className="px-3 py-1.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 hover:border-amber-500 text-slate-700 dark:text-slate-200 font-bold text-xs shadow-2xs hover:shadow transition flex items-center gap-1.5"
                  >
                    <ListOrdered className="w-3.5 h-3.5 text-amber-600" /> Sequential Ordering
                  </button>
                </div>
              </div>

              {/* Questions List */}
              <div className="space-y-4">
                {questions.map((q, qIdx) => {
                  const isExpanded = expandedQuestions[q.id] !== false; // default expanded

                  return (
                    <div
                      key={q.id}
                      className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden transition-all"
                    >
                      {/* Question Header Card */}
                      <div className="p-3.5 sm:p-4 bg-slate-50/70 dark:bg-slate-800/40 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between gap-3">
                        <div className="flex items-center gap-2.5 min-w-0 flex-1">
                          <span className="w-6 h-6 rounded-lg bg-slate-200 dark:bg-slate-700 text-xs font-black text-slate-700 dark:text-slate-200 flex items-center justify-center shrink-0">
                            {qIdx + 1}
                          </span>

                          <span className={`px-2.5 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider shrink-0 ${
                            q.type === 'mcq'
                              ? 'bg-blue-100 text-blue-800 dark:bg-blue-950/60 dark:text-blue-300'
                              : q.type === 'true_false'
                              ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300'
                              : q.type === 'matching'
                              ? 'bg-purple-100 text-purple-800 dark:bg-purple-950/60 dark:text-purple-300'
                              : 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300'
                          }`}>
                            {q.type === 'mcq' ? 'MCQ' : q.type === 'true_false' ? 'True / False' : q.type === 'matching' ? 'Matching Column' : 'Sequential Ordering'}
                          </span>

                          <p className="text-xs font-semibold text-slate-800 dark:text-slate-200 truncate flex-1 cursor-pointer" onClick={() => toggleExpand(q.id)}>
                            {q.question || 'Untitled Question Prompt'}
                          </p>
                        </div>

                        <div className="flex items-center gap-1.5 shrink-0">
                          {/* Points Input */}
                          <div className="flex items-center gap-1 text-[11px] text-slate-500 mr-1">
                            <span>Pts:</span>
                            <input
                              type="number"
                              min="1"
                              max="20"
                              value={q.points || 1}
                              onChange={(e) => handleUpdateQuestion(qIdx, 'points', Number(e.target.value))}
                              className="w-12 px-1.5 py-1 text-center font-bold rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs"
                            />
                          </div>

                          <button
                            type="button"
                            onClick={() => handleMoveQuestion(qIdx, 'up')}
                            disabled={qIdx === 0}
                            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 disabled:opacity-30"
                            title="Move Up"
                          >
                            <ArrowUp className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleMoveQuestion(qIdx, 'down')}
                            disabled={qIdx === questions.length - 1}
                            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 disabled:opacity-30"
                            title="Move Down"
                          >
                            <ArrowDown className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDuplicateQuestion(qIdx)}
                            className="p-1 rounded-lg text-slate-400 hover:text-brand-600"
                            title="Duplicate Question"
                          >
                            <Copy className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeleteQuestion(qIdx)}
                            className="p-1 rounded-lg text-slate-400 hover:text-rose-600"
                            title="Delete Question"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      {/* Question Details Form */}
                      {isExpanded && (
                        <div className="p-4 sm:p-5 space-y-4 text-xs">
                          {/* Question Prompt */}
                          <div>
                            <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                              Question Statement / Prompt:
                            </label>
                            <textarea
                              rows={2}
                              value={q.question}
                              onChange={(e) => handleUpdateQuestion(qIdx, 'question', e.target.value)}
                              placeholder="Write your clear question or statement prompt..."
                              className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 text-xs"
                            />
                          </div>

                          {/* 1. MCQ OPTIONS */}
                          {q.type === 'mcq' && (
                            <div className="space-y-2.5">
                              <label className="font-bold text-slate-700 dark:text-slate-300 flex items-center justify-between">
                                <span>Options (Select the correct radio choice):</span>
                                <button
                                  type="button"
                                  onClick={() => handleAddOption(qIdx)}
                                  className="text-[11px] font-bold text-brand-600 hover:underline flex items-center gap-1"
                                >
                                  <Plus className="w-3 h-3" /> Add Choice
                                </button>
                              </label>

                              <div className="space-y-2">
                                {(q.options || []).map((opt, optIdx) => {
                                  const isCorrect = q.correctAnswer === optIdx;
                                  return (
                                    <div
                                      key={optIdx}
                                      className={`p-2.5 rounded-xl border flex items-center gap-2.5 transition ${
                                        isCorrect
                                          ? 'border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/30'
                                          : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900'
                                      }`}
                                    >
                                      <input
                                        type="radio"
                                        name={`correct-${q.id}`}
                                        checked={isCorrect}
                                        onChange={() => handleUpdateQuestion(qIdx, 'correctAnswer', optIdx)}
                                        className="w-4 h-4 text-emerald-600 cursor-pointer"
                                      />
                                      <span className="w-5 text-center font-bold text-slate-400">
                                        {String.fromCharCode(65 + optIdx)}.
                                      </span>
                                      <input
                                        type="text"
                                        value={opt}
                                        onChange={(e) => handleUpdateOption(qIdx, optIdx, e.target.value)}
                                        placeholder={`Option ${String.fromCharCode(65 + optIdx)} text...`}
                                        className="flex-1 px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs"
                                      />
                                      <button
                                        type="button"
                                        onClick={() => handleDeleteOption(qIdx, optIdx)}
                                        className="p-1 text-slate-400 hover:text-rose-500"
                                        title="Remove option"
                                      >
                                        <Trash2 className="w-3.5 h-3.5" />
                                      </button>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          )}

                          {/* 2. TRUE / FALSE OPTIONS */}
                          {q.type === 'true_false' && (
                            <div className="space-y-2">
                              <label className="font-bold text-slate-700 dark:text-slate-300 block">
                                Correct Answer Setting:
                              </label>
                              <div className="grid grid-cols-2 gap-3 max-w-sm">
                                <button
                                  type="button"
                                  onClick={() => handleUpdateQuestion(qIdx, 'correctAnswer', true)}
                                  className={`p-3 rounded-xl border font-bold text-xs flex items-center justify-center gap-2 transition ${
                                    q.correctAnswer === true
                                      ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                                      : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-50'
                                  }`}
                                >
                                  <Check className="w-4 h-4" /> TRUE
                                </button>

                                <button
                                  type="button"
                                  onClick={() => handleUpdateQuestion(qIdx, 'correctAnswer', false)}
                                  className={`p-3 rounded-xl border font-bold text-xs flex items-center justify-center gap-2 transition ${
                                    q.correctAnswer === false
                                      ? 'bg-rose-600 text-white border-rose-600 shadow-sm'
                                      : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-50'
                                  }`}
                                >
                                  <X className="w-4 h-4" /> FALSE
                                </button>
                              </div>
                            </div>
                          )}

                          {/* 3. MATCHING COLUMN PAIRS */}
                          {q.type === 'matching' && (
                            <div className="space-y-3">
                              <div className="flex items-center justify-between">
                                <label className="font-bold text-slate-700 dark:text-slate-300">
                                  Define Column A &amp; Column B Associated Pairs:
                                </label>
                                <button
                                  type="button"
                                  onClick={() => handleAddPair(qIdx)}
                                  className="text-[11px] font-bold text-brand-600 hover:underline flex items-center gap-1"
                                >
                                  <Plus className="w-3 h-3" /> Add Pair
                                </button>
                              </div>

                              <div className="space-y-2">
                                {(q.pairs || []).map((pair, pIdx) => (
                                  <div
                                    key={pair.id || pIdx}
                                    className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800/60 flex items-center gap-2"
                                  >
                                    <span className="w-5 text-center font-bold text-slate-400">{pIdx + 1}.</span>
                                    <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-2">
                                      <input
                                        type="text"
                                        value={pair.left}
                                        onChange={(e) => handleUpdatePair(qIdx, pIdx, 'left', e.target.value)}
                                        placeholder="Column A (Term / Concept)..."
                                        className="px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-xs"
                                      />
                                      <input
                                        type="text"
                                        value={pair.right}
                                        onChange={(e) => handleUpdatePair(qIdx, pIdx, 'right', e.target.value)}
                                        placeholder="Column B (Matching Definition / Answer)..."
                                        className="px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-xs font-medium"
                                      />
                                    </div>
                                    <button
                                      type="button"
                                      onClick={() => handleDeletePair(qIdx, pIdx)}
                                      className="p-1 text-slate-400 hover:text-rose-500"
                                      title="Remove pair"
                                    >
                                      <Trash2 className="w-3.5 h-3.5" />
                                    </button>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* 4. SEQUENTIAL ORDERING */}
                          {q.type === 'ordering' && (
                            <div className="space-y-3">
                              <div className="flex items-center justify-between">
                                <label className="font-bold text-slate-700 dark:text-slate-300">
                                  Input Sequence Items in their CORRECT TARGET ORDER:
                                </label>
                                <button
                                  type="button"
                                  onClick={() => handleAddOrderingItem(qIdx)}
                                  className="text-[11px] font-bold text-brand-600 hover:underline flex items-center gap-1"
                                >
                                  <Plus className="w-3 h-3" /> Add Step
                                </button>
                              </div>

                              <p className="text-[11px] text-slate-400">
                                Enter the items in exact chronological/procedural sequence. The test player will scramble them for the student to rearrange.
                              </p>

                              <div className="space-y-2">
                                {(q.items || []).map((item, itmIdx) => (
                                  <div
                                    key={itmIdx}
                                    className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800/60 flex items-center gap-2"
                                  >
                                    <span className="w-6 h-6 rounded-md bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 text-xs font-black flex items-center justify-center shrink-0">
                                      #{itmIdx + 1}
                                    </span>
                                    <input
                                      type="text"
                                      value={item}
                                      onChange={(e) => handleUpdateOrderingItem(qIdx, itmIdx, e.target.value)}
                                      placeholder={`Sequence Step ${itmIdx + 1}...`}
                                      className="flex-1 px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-xs"
                                    />
                                    <button
                                      type="button"
                                      onClick={() => handleMoveOrderingItem(qIdx, itmIdx, 'up')}
                                      disabled={itmIdx === 0}
                                      className="p-1 text-slate-400 hover:text-slate-600 disabled:opacity-30"
                                      title="Move up in sequence"
                                    >
                                      <ArrowUp className="w-3.5 h-3.5" />
                                    </button>
                                    <button
                                      type="button"
                                      onClick={() => handleMoveOrderingItem(qIdx, itmIdx, 'down')}
                                      disabled={itmIdx === q.items.length - 1}
                                      className="p-1 text-slate-400 hover:text-slate-600 disabled:opacity-30"
                                      title="Move down in sequence"
                                    >
                                      <ArrowDown className="w-3.5 h-3.5" />
                                    </button>
                                    <button
                                      type="button"
                                      onClick={() => handleDeleteOrderingItem(qIdx, itmIdx)}
                                      className="p-1 text-slate-400 hover:text-rose-500"
                                      title="Remove item"
                                    >
                                      <Trash2 className="w-3.5 h-3.5" />
                                    </button>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Educational Explanation */}
                          <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
                            <label className="font-bold text-slate-600 dark:text-slate-300 block mb-1">
                              Explanation &amp; Educational Feedback (Shown after test):
                            </label>
                            <input
                              type="text"
                              value={q.explanation || ''}
                              onChange={(e) => handleUpdateQuestion(qIdx, 'explanation', e.target.value)}
                              placeholder="Explain why this answer is correct to reinforce learning..."
                              className="w-full px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs"
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 2: OPTIONS & SETTINGS */}
          {activeTab === 'settings' && (
            <div className="space-y-6 max-w-3xl mx-auto text-xs sm:text-sm">
              <div className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
                <h4 className="font-black text-sm text-slate-900 dark:text-white flex items-center gap-2">
                  <Award className="w-4 h-4 text-brand-600" />
                  <span>Passing Standards &amp; Scoring Criteria</span>
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                      Minimum Passing Score (%):
                    </label>
                    <div className="flex items-center gap-3">
                      <input
                        type="range"
                        min="50"
                        max="100"
                        step="5"
                        value={settings.passingScore}
                        onChange={(e) => setSettings({ ...settings, passingScore: Number(e.target.value) })}
                        className="flex-1 accent-brand-600"
                      />
                      <span className="w-14 py-1.5 rounded-lg bg-brand-50 dark:bg-brand-950/60 text-brand-700 dark:text-brand-300 font-black text-center border border-brand-200 dark:border-brand-800">
                        {settings.passingScore}%
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 mt-1">
                      Students must achieve this percentage or higher to be awarded completion credit.
                    </p>
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                      Time Limit (Minutes):
                    </label>
                    <select
                      value={settings.timeLimit}
                      onChange={(e) => setSettings({ ...settings, timeLimit: Number(e.target.value) })}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 font-semibold"
                    >
                      <option value="0">No Time Limit (Self-paced)</option>
                      <option value="5">5 Minutes (Quick check)</option>
                      <option value="10">10 Minutes</option>
                      <option value="15">15 Minutes (Standard quiz)</option>
                      <option value="20">20 Minutes</option>
                      <option value="30">30 Minutes (Mid-term test)</option>
                      <option value="45">45 Minutes</option>
                      <option value="60">60 Minutes (Comprehensive exam)</option>
                    </select>
                    <p className="text-[11px] text-slate-400 mt-1">
                      If timed, countdown displays during the test and auto-submits upon expiry.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3 border-t border-slate-100 dark:border-slate-800">
                  <div>
                    <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                      Attempts Allowed:
                    </label>
                    <select
                      value={settings.attemptsAllowed}
                      onChange={(e) => setSettings({ ...settings, attemptsAllowed: Number(e.target.value) })}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 font-semibold"
                    >
                      <option value="0">Unlimited Retakes</option>
                      <option value="1">Single Attempt Only (Strict exam)</option>
                      <option value="2">2 Attempts Allowed</option>
                      <option value="3">3 Attempts Allowed</option>
                      <option value="5">5 Attempts Allowed</option>
                    </select>
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                      Progression Requirement:
                    </label>
                    <label className="flex items-center gap-2 mt-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.requirePassingToProceed}
                        onChange={(e) => setSettings({ ...settings, requirePassingToProceed: e.target.checked })}
                        className="w-4 h-4 rounded text-brand-600 accent-brand-600"
                      />
                      <span className="font-semibold text-slate-700 dark:text-slate-300">
                        Require Passing Score to advance course
                      </span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Shuffling & Feedback Options */}
              <div className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
                <h4 className="font-black text-sm text-slate-900 dark:text-white flex items-center gap-2">
                  <Shuffle className="w-4 h-4 text-purple-600" />
                  <span>Randomization &amp; Examination Security</span>
                </h4>

                <div className="space-y-3">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.shuffleQuestions}
                      onChange={(e) => setSettings({ ...settings, shuffleQuestions: e.target.checked })}
                      className="w-4 h-4 mt-0.5 rounded text-brand-600 accent-brand-600"
                    />
                    <div>
                      <span className="font-bold text-slate-800 dark:text-slate-200 block">
                        Shuffle Question Order
                      </span>
                      <span className="text-[11px] text-slate-400">
                        Presents questions in randomized order for each student attempt to discourage answer copying.
                      </span>
                    </div>
                  </label>

                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.shuffleOptions}
                      onChange={(e) => setSettings({ ...settings, shuffleOptions: e.target.checked })}
                      className="w-4 h-4 mt-0.5 rounded text-brand-600 accent-brand-600"
                    />
                    <div>
                      <span className="font-bold text-slate-800 dark:text-slate-200 block">
                        Shuffle Multiple Choice Options
                      </span>
                      <span className="text-[11px] text-slate-400">
                        Randomizes choices A, B, C, D order on every MCQ test session.
                      </span>
                    </div>
                  </label>
                </div>
              </div>

              {/* Student Instructions */}
              <div className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
                <label className="font-bold text-slate-700 dark:text-slate-300 block">
                  Candidate Orientation &amp; Instructions:
                </label>
                <textarea
                  rows={3}
                  value={settings.instructions}
                  onChange={(e) => setSettings({ ...settings, instructions: e.target.value })}
                  placeholder="Instructions displayed to candidate before commencing assessment..."
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                />
              </div>
            </div>
          )}

          {/* TAB 3: STUDENT PREVIEW */}
          {activeTab === 'preview' && (
            <div className="max-w-3xl mx-auto space-y-6">
              <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-brand-600 dark:text-brand-400">
                    Live Assessment Simulator
                  </span>
                  <h3 className="font-black text-lg text-slate-900 dark:text-white">{title}</h3>
                  <p className="text-xs text-slate-400">
                    {questions.length} Questions • Passing Target: {settings.passingScore}% • Time Limit: {settings.timeLimit ? `${settings.timeLimit} mins` : 'Untimed'}
                  </p>
                </div>

                {previewSubmitted && (
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <span className="text-[10px] text-slate-400 block">Score Achieved:</span>
                      <span className={`text-base font-black ${
                        previewScore >= settings.passingScore ? 'text-emerald-600' : 'text-rose-600'
                      }`}>
                        {previewScore}% {previewScore >= settings.passingScore ? '🎉 Passed' : '⚠️ Need ' + settings.passingScore + '%'}
                      </span>
                    </div>
                    <button
                      onClick={() => {
                        setPreviewSubmitted(false);
                        setPreviewAnswers({});
                      }}
                      className="px-3 py-1.5 rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-bold hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-1"
                    >
                      <RotateCcw className="w-3.5 h-3.5" /> Retake
                    </button>
                  </div>
                )}
              </div>

              {/* Render Questions in Preview */}
              <div className="space-y-4">
                {questions.map((q, idx) => (
                  <div
                    key={q.id}
                    className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-lg bg-brand-50 dark:bg-brand-950/60 text-brand-600 dark:text-brand-400 text-xs font-bold flex items-center justify-center">
                          {idx + 1}
                        </span>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                          {q.type.replace('_', ' ')}
                        </span>
                      </div>
                      <span className="text-xs font-semibold text-slate-400">{q.points || 1} pt</span>
                    </div>

                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">{q.question}</h4>

                    {/* MCQ Interactive Preview */}
                    {q.type === 'mcq' && (
                      <div className="space-y-2 pt-1">
                        {(q.options || []).map((opt, optIdx) => {
                          const isSelected = previewAnswers[q.id] === optIdx;
                          let style = 'border-slate-200 dark:border-slate-800 hover:border-slate-300';
                          if (isSelected) style = 'border-brand-500 bg-brand-50/50 dark:bg-brand-950/30 text-brand-700 dark:text-brand-300';
                          if (previewSubmitted) {
                            if (optIdx === q.correctAnswer) style = 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-200 font-bold';
                            else if (isSelected) style = 'border-rose-500 bg-rose-50 dark:bg-rose-950/40 text-rose-800 dark:text-rose-200';
                          }

                          return (
                            <div
                              key={optIdx}
                              onClick={() => !previewSubmitted && setPreviewAnswers({ ...previewAnswers, [q.id]: optIdx })}
                              className={`p-3 rounded-xl border text-xs cursor-pointer transition flex items-center justify-between ${style}`}
                            >
                              <span>{String.fromCharCode(65 + optIdx)}. {opt}</span>
                              {previewSubmitted && optIdx === q.correctAnswer && (
                                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                              )}
                            </div>
                          );
                        })}
                      </div>
                    )}

                    {/* True / False Interactive Preview */}
                    {q.type === 'true_false' && (
                      <div className="grid grid-cols-2 gap-3 pt-1">
                        {[true, false].map((val) => {
                          const isSelected = previewAnswers[q.id] === val;
                          let style = 'border-slate-200 dark:border-slate-800 hover:border-slate-300';
                          if (isSelected) style = 'border-brand-500 bg-brand-50 dark:bg-brand-950/30 text-brand-700';
                          if (previewSubmitted) {
                            if (val === q.correctAnswer) style = 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 font-bold';
                            else if (isSelected) style = 'border-rose-500 bg-rose-50 dark:bg-rose-950/40 text-rose-800';
                          }

                          return (
                            <button
                              key={String(val)}
                              type="button"
                              onClick={() => !previewSubmitted && setPreviewAnswers({ ...previewAnswers, [q.id]: val })}
                              className={`p-3 rounded-xl border text-xs font-bold transition flex items-center justify-center gap-2 ${style}`}
                            >
                              {val ? 'TRUE' : 'FALSE'}
                              {previewSubmitted && val === q.correctAnswer && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
                            </button>
                          );
                        })}
                      </div>
                    )}

                    {/* Matching Interactive Preview */}
                    {q.type === 'matching' && (
                      <div className="space-y-2 pt-1 text-xs">
                        <p className="text-[11px] text-slate-400">Match each item in Column A with its definition from Column B:</p>
                        {(q.pairs || []).map((pair) => {
                          const currentMatch = previewAnswers[q.id]?.[pair.id] || '';
                          const isCorrectMatch = previewSubmitted && currentMatch === pair.right;

                          return (
                            <div key={pair.id} className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                              <span className="font-bold text-slate-800 dark:text-slate-200">{pair.left}</span>
                              <div className="flex items-center gap-2">
                                <span>➔</span>
                                <select
                                  disabled={previewSubmitted}
                                  value={currentMatch}
                                  onChange={(e) => {
                                    const prevMatchObj = previewAnswers[q.id] || {};
                                    setPreviewAnswers({
                                      ...previewAnswers,
                                      [q.id]: { ...prevMatchObj, [pair.id]: e.target.value }
                                    });
                                  }}
                                  className={`px-3 py-1.5 rounded-lg border text-xs ${
                                    previewSubmitted
                                      ? isCorrectMatch
                                        ? 'border-emerald-500 bg-emerald-50 text-emerald-800'
                                        : 'border-rose-500 bg-rose-50 text-rose-800'
                                      : 'border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800'
                                  }`}
                                >
                                  <option value="">-- Choose Match --</option>
                                  {(q.pairs || []).map((p) => (
                                    <option key={p.id} value={p.right}>{p.right}</option>
                                  ))}
                                </select>
                                {previewSubmitted && (
                                  isCorrectMatch
                                    ? <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                                    : <span className="text-[10px] text-emerald-600 font-bold">Answer: {pair.right}</span>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}

                    {/* Ordering Interactive Preview */}
                    {q.type === 'ordering' && (
                      <div className="space-y-2 pt-1 text-xs">
                        <p className="text-[11px] text-slate-400">Rearrange the steps into the correct sequence using the up/down arrows:</p>
                        {(() => {
                          const currentOrder = previewAnswers[q.id] || q.items || [];
                          return currentOrder.map((step, sIdx) => {
                            const isCorrectPosition = previewSubmitted && step === q.items[sIdx];
                            return (
                              <div
                                key={sIdx}
                                className={`p-2.5 rounded-xl border flex items-center justify-between gap-2 ${
                                  previewSubmitted
                                    ? isCorrectPosition
                                      ? 'border-emerald-500 bg-emerald-50 text-emerald-800'
                                      : 'border-rose-500 bg-rose-50 text-rose-800'
                                    : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800'
                                }`}
                              >
                                <div className="flex items-center gap-2">
                                  <span className="w-5 text-center font-bold text-slate-400">Step {sIdx + 1}:</span>
                                  <span className="font-medium">{step}</span>
                                </div>
                                {!previewSubmitted ? (
                                  <div className="flex items-center gap-1">
                                    <button
                                      type="button"
                                      disabled={sIdx === 0}
                                      onClick={() => {
                                        const next = [...currentOrder];
                                        const temp = next[sIdx];
                                        next[sIdx] = next[sIdx - 1];
                                        next[sIdx - 1] = temp;
                                        setPreviewAnswers({ ...previewAnswers, [q.id]: next });
                                      }}
                                      className="p-1 rounded text-slate-400 hover:text-slate-600 disabled:opacity-30"
                                    >
                                      <ArrowUp className="w-3.5 h-3.5" />
                                    </button>
                                    <button
                                      type="button"
                                      disabled={sIdx === currentOrder.length - 1}
                                      onClick={() => {
                                        const next = [...currentOrder];
                                        const temp = next[sIdx];
                                        next[sIdx] = next[sIdx + 1];
                                        next[sIdx + 1] = temp;
                                        setPreviewAnswers({ ...previewAnswers, [q.id]: next });
                                      }}
                                      className="p-1 rounded text-slate-400 hover:text-slate-600 disabled:opacity-30"
                                    >
                                      <ArrowDown className="w-3.5 h-3.5" />
                                    </button>
                                  </div>
                                ) : (
                                  isCorrectPosition
                                    ? <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                                    : <span className="text-[10px] text-emerald-600 font-bold">Target Step #{sIdx + 1}</span>
                                )}
                              </div>
                            );
                          });
                        })()}
                      </div>
                    )}

                    {/* Feedback & Explanation */}
                    {previewSubmitted && q.explanation && (
                      <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/40 text-xs text-amber-900 dark:text-amber-200">
                        <strong>Explanation:</strong> {q.explanation}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {!previewSubmitted ? (
                <button
                  type="button"
                  onClick={handlePreviewSubmit}
                  className="w-full py-3 rounded-2xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-sm shadow transition"
                >
                  Submit Preview Answers
                </button>
              ) : (
                <div className="p-4 rounded-2xl bg-slate-100 dark:bg-slate-800 text-center space-y-2">
                  <p className="text-xs text-slate-500">
                    Preview testing session completed. Adjust any questions or settings as desired before embedding.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between bg-white dark:bg-slate-900">
          <div className="text-xs text-slate-400">
            {questions.length} question items configured • Passing score: {settings.passingScore}%
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold hover:bg-slate-50 dark:hover:bg-slate-800 transition"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSaveTest}
              className="px-5 py-2 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs shadow-md transition flex items-center gap-1.5"
            >
              <Check className="w-4 h-4" /> Save Test
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
