import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  PlayCircle, 
  CheckCircle2, 
  ChevronRight, 
  ChevronLeft, 
  Award, 
  ArrowLeft, 
  HelpCircle, 
  Clock, 
  RotateCcw, 
  Sparkles, 
  Download, 
  Layers,
  CheckCircle,
  XCircle,
  AlertCircle,
  Lock
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { 
  getCourseById, 
  getUserEnrollments, 
  enrollInCourse, 
  updateLessonProgress, 
  recordQuizResult, 
  issueCertificate 
} from '../../services/firebaseService';
import { useAuth } from '../../context/AuthContext';
import { ProgressBar } from '../../components/common/ProgressBar';
import { Badge } from '../../components/common/Badge';
import { FormattedText } from '../../components/common/FormattedText';
import { ReadAloudPlayer } from '../../components/common/ReadAloudPlayer';
import { StandardTestPlayer } from '../../components/course/StandardTestPlayer';

export const CoursePlayer = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentUser, userProfile } = useAuth();

  const [course, setCourse] = useState(null);
  const [enrollment, setEnrollment] = useState(null);
  const [activeLessonIndex, setActiveLessonIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  // Quiz state inside player
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizScore, setQuizScore] = useState(0);

  // In-lesson practice questions state (for lessons with 5 questions requirement)
  const [practiceAnswers, setPracticeAnswers] = useState({});
  const [practiceSubmitted, setPracticeSubmitted] = useState(false);
  const [practiceFeedbackMsg, setPracticeFeedbackMsg] = useState('');

  // Completion modal state
  const [showCompletionModal, setShowCompletionModal] = useState(false);
  const [issuedCert, setIssuedCert] = useState(null);

  useEffect(() => {
    const initPlayer = async () => {
      if (!currentUser?.uid) {
        navigate(`/login?redirect=/learn/${id}`);
        return;
      }

      setLoading(true);
      const c = await getCourseById(id);
      if (!c) {
        navigate('/courses');
        return;
      }
      setCourse(c);

      let enrs = await getUserEnrollments(currentUser.uid);
      let enr = enrs.find(e => e.courseId === c.id);

      if (!enr) {
        enr = await enrollInCourse(currentUser.uid, c);
      }
      setEnrollment(enr);

      // Restore last incomplete lesson or default 0
      if (enr?.completedLessons && c.lessons) {
        const firstIncomplete = c.lessons.findIndex(l => !enr.completedLessons.includes(l.id));
        if (firstIncomplete !== -1) {
          setActiveLessonIndex(firstIncomplete);
        }
      }

      setLoading(false);
    };

    initPlayer();
  }, [id, currentUser, navigate]);

  const currentLesson = course?.lessons?.[activeLessonIndex] || {
    id: 'placeholder',
    title: 'Welcome',
    type: 'text',
    content: 'Welcome to the course.'
  };

  // Convert current lesson material to readable text for speech synthesis
  const readableLessonText = useMemo(() => {
    if (!course) return '';
    if (currentLesson?.type === 'quiz' && course.quiz) {
      const qText = course.quiz.questions?.map((q, idx) => `Question ${idx + 1}: ${q.question}`).join('. ');
      return `${course.quiz.title}. Passing score required: ${course.quiz.passingScore} percent. ${qText || ''}`;
    }
    const rawText = currentLesson?.content || '';
    return rawText.replace(/(#{1,4}\s*)Slide\s*\d+\s*[:.-]\s*/gi, '')
                  .replace(/Slide\s*\d+\s*[:.-]\s*/gi, '');
  }, [currentLesson?.content, currentLesson?.type, course]);

  const isCompleted = enrollment?.completedLessons?.includes(currentLesson.id) || false;
  const hasPracticeQuestions = Array.isArray(currentLesson?.questions) && currentLesson.questions.length > 0;
  
  // Reset quiz and practice state whenever active lesson changes
  useEffect(() => {
    setQuizSubmitted(false);
    setQuizAnswers({});
    setPracticeAnswers({});
    setPracticeSubmitted(false);
    setPracticeFeedbackMsg('');
  }, [activeLessonIndex]);

  // A lesson with practice questions cannot be marked complete manually until the questions are solved
  const isPracticeSolved = useMemo(() => {
    if (!hasPracticeQuestions) return true;
    const questions = currentLesson?.questions || [];
    return questions.every((q, idx) => practiceAnswers[idx] !== undefined);
  }, [hasPracticeQuestions, currentLesson?.questions, practiceAnswers]);

  if (loading || !course) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white">
        <div className="text-center space-y-3">
          <div className="w-10 h-10 border-4 border-brand-500 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-sm text-slate-400">Loading learning environment...</p>
        </div>
      </div>
    );
  }

  const handlePracticeAnswer = (qIdx, optIdx) => {
    if (practiceSubmitted) return;
    setPracticeAnswers(prev => ({ ...prev, [qIdx]: optIdx }));
    setPracticeFeedbackMsg('');
  };

  const handlePracticeSubmit = async () => {
    const questions = currentLesson.questions || [];
    const answeredCount = Object.keys(practiceAnswers).length;
    if (answeredCount < questions.length) {
      setPracticeFeedbackMsg(`Please answer all ${questions.length} questions before submitting.`);
      return;
    }

    let correct = 0;
    questions.forEach((q, idx) => {
      if (practiceAnswers[idx] === q.correctAnswer) correct++;
    });

    setPracticeSubmitted(true);
    const scorePct = Math.round((correct / questions.length) * 100);

    if (scorePct >= 60) {
      setPracticeFeedbackMsg(`Great job! You scored ${correct}/${questions.length} (${scorePct}%). You can now mark this lesson complete.`);
      if (!isCompleted) {
        handleToggleComplete(true);
      }
    } else {
      setPracticeFeedbackMsg(`You scored ${correct}/${questions.length} (${scorePct}%). Review the explanations below and retake to complete.`);
    }
  };

  const handleResetPractice = () => {
    setPracticeAnswers({});
    setPracticeSubmitted(false);
    setPracticeFeedbackMsg('');
  };

  const handleToggleComplete = async (forceComplete = false) => {
    if (!enrollment) return;

    // Enforce question solving requirement:
    if (!forceComplete && !isCompleted && hasPracticeQuestions && !practiceSubmitted) {
      setPracticeFeedbackMsg(`⚠️ Please solve the 5 practice questions at the end of the lesson before marking complete.`);
      // Smooth scroll to questions section
      const qSection = document.getElementById('lesson-practice-section');
      if (qSection) {
        qSection.scrollIntoView({ behavior: 'smooth' });
      }
      return;
    }

    const updated = await updateLessonProgress(
      currentUser.uid, 
      course.id, 
      currentLesson.id, 
      forceComplete ? true : !isCompleted
    );

    setEnrollment(updated);

    if (updated?.completed) {
      triggerCourseCelebration();
    }
  };

  const triggerCourseCelebration = async () => {
    confetti({
      particleCount: 120,
      spread: 70,
      origin: { y: 0.6 }
    });

    const cert = await issueCertificate(
      currentUser.uid,
      course.id,
      course.title,
      userProfile?.name || currentUser.displayName || "Student"
    );
    setIssuedCert(cert);
    setShowCompletionModal(true);
  };

  // Quiz submission inside course player
  const handleQuizAnswer = (qIdx, optIdx) => {
    if (quizSubmitted) return;
    setQuizAnswers({ ...quizAnswers, [qIdx]: optIdx });
  };

  const handleQuizSubmit = async () => {
    const questions = course.quiz?.questions || [];
    let correct = 0;
    questions.forEach((q, idx) => {
      if (quizAnswers[idx] === q.correctAnswer) correct++;
    });

    const calculatedScore = Math.round((correct / (questions.length || 1)) * 100);
    const passed = calculatedScore >= (course.quiz?.passingScore || 70);

    setQuizScore(calculatedScore);
    setQuizSubmitted(true);

    await recordQuizResult(
      currentUser.uid,
      course.id,
      course.title,
      course.quiz?.title || "Assessment",
      calculatedScore,
      passed
    );

    if (passed && !isCompleted) {
      handleToggleComplete(true);
    }
  };

  const handleTestComplete = async ({ passed, score, earnedPoints, totalPoints }) => {
    setQuizScore(score);
    setQuizSubmitted(true);

    await recordQuizResult(
      currentUser.uid,
      course.id,
      course.title,
      currentLesson.title || "Course Assessment",
      score,
      passed
    );

    if (passed && !isCompleted) {
      handleToggleComplete(true);
    }
  };

  const resetLessonState = () => {
    setQuizSubmitted(false);
    setQuizAnswers({});
    setPracticeAnswers({});
    setPracticeSubmitted(false);
    setPracticeFeedbackMsg('');
  };

  const handleNextLesson = () => {
    if (activeLessonIndex < (course.lessons?.length || 1) - 1) {
      setActiveLessonIndex(prev => prev + 1);
      resetLessonState();
    }
  };

  const handlePrevLesson = () => {
    if (activeLessonIndex > 0) {
      setActiveLessonIndex(prev => prev - 1);
      resetLessonState();
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 flex flex-col">
      
      {/* Top Learning Bar */}
      <header className="h-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-4 sm:px-6 flex items-center justify-between gap-4 sticky top-0 z-30">
        <div className="flex items-center gap-3">
          <Link
            to={`/courses/${course.id}`}
            className="p-2 rounded-xl text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition"
            title="Exit Course"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div className="overflow-hidden">
            <h1 className="text-sm font-bold text-slate-900 dark:text-white truncate max-w-sm sm:max-w-md">
              {course.title}
            </h1>
            <p className="text-[11px] text-slate-400 truncate">
              Lesson {activeLessonIndex + 1} of {course.lessons?.length || 1}: {currentLesson.title}
            </p>
          </div>
        </div>

        {/* Progress Tracker Pill */}
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="hidden sm:block w-36">
            <ProgressBar progress={enrollment?.progress || 0} size="sm" showLabel={false} />
          </div>
          <span className="text-xs font-bold text-brand-600 dark:text-brand-400 whitespace-nowrap">
            {enrollment?.progress || 0}% Done
          </span>
          <button
            onClick={() => handleToggleComplete(false)}
            title={hasPracticeQuestions && !isCompleted && !practiceSubmitted ? "Solve the 5 practice questions at the bottom to mark complete" : ""}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow-sm ${
              isCompleted
                ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                : hasPracticeQuestions && !practiceSubmitted
                  ? 'bg-amber-100 hover:bg-amber-200 dark:bg-amber-950/60 dark:hover:bg-amber-900/60 text-amber-800 dark:text-amber-200 border border-amber-300 dark:border-amber-800'
                  : 'bg-slate-200 hover:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200'
            }`}
          >
            {isCompleted ? (
              <>
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Completed</span>
              </>
            ) : hasPracticeQuestions && !practiceSubmitted ? (
              <>
                <Lock className="w-3.5 h-3.5" />
                <span>Solve 5 Qs to Complete</span>
              </>
            ) : (
              <>
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Mark Complete</span>
              </>
            )}
          </button>
        </div>
      </header>

      {/* Main Learning Grid */}
      <div className="flex-1 flex flex-col lg:flex-row max-w-7xl w-full mx-auto p-4 sm:p-6 gap-6">
        
        {/* Left: Lesson Content / Video Player / Quiz */}
        <div className="flex-1 flex flex-col bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
          
          {/* Main Content Area */}
          <div className="flex-1 p-6 sm:p-8 overflow-y-auto">
            
            {/* Header info */}
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-100 dark:border-slate-800">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-brand-50 dark:bg-brand-950/60 text-brand-600 dark:text-brand-400 border border-brand-200 dark:border-brand-800 uppercase tracking-wider">
                Module {activeLessonIndex + 1} • {currentLesson.type}
              </span>
              <div className="flex items-center gap-1 text-xs text-slate-400">
                <Clock className="w-3.5 h-3.5" />
                <span>{currentLesson.duration || "15 mins"}</span>
              </div>
            </div>

            {/* Lesson Title */}
            <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-4">
              {currentLesson.title}
            </h2>

            {/* Read Aloud Audio Bar for Students */}
            {readableLessonText && (
              <ReadAloudPlayer 
                text={readableLessonText}
                title={currentLesson.title}
                subtitle="Read Aloud for Students"
                className="mb-6"
              />
            )}

            {/* Dynamic Lesson Type Display */}
            {currentLesson.type === 'video' ? (
              <div className="space-y-6">
                <div className="aspect-video w-full rounded-2xl overflow-hidden bg-slate-950 shadow-inner flex items-center justify-center relative">
                  <div className="text-center p-6 space-y-3">
                    <div className="w-16 h-16 rounded-full bg-brand-600/30 text-brand-400 flex items-center justify-center mx-auto shadow-lg backdrop-blur-sm">
                      <PlayCircle className="w-10 h-10 fill-brand-600 text-white" />
                    </div>
                    <p className="text-sm font-semibold text-white">Video Lecture Player</p>
                    <p className="text-xs text-slate-400 max-w-xs mx-auto">
                      High definition multimedia lecture with synchronized transcript and practical code walkthrough.
                    </p>
                  </div>
                </div>

                {currentLesson.content && (
                  <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-800">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                      Lesson Notes & Highlights
                    </h4>
                    <FormattedText content={currentLesson.content} />
                  </div>
                )}
              </div>
            ) : currentLesson.type === 'quiz' || currentLesson.type === 'test' || currentLesson.testData || course.quiz ? (
              /* Standard Testing System Assessment Player (MCQs, True/False, Matching Column, Sequential Ordering) */
              <div className="space-y-6">
                <StandardTestPlayer
                  testData={currentLesson.testData || (currentLesson.type === 'quiz' && course.quiz ? course.quiz : {
                    title: currentLesson.title,
                    questions: currentLesson.questions || course.quiz?.questions || []
                  })}
                  courseId={course.id}
                  courseTitle={course.title}
                  lessonTitle={currentLesson.title}
                  isCompleted={isCompleted}
                  onComplete={handleTestComplete}
                  onNextLesson={activeLessonIndex < (course.lessons?.length || 1) - 1 ? handleNextLesson : null}
                />
              </div>
            ) : (
              /* Reading / Text Lesson */
              <div className="max-w-none text-slate-800 dark:text-slate-200 text-sm sm:text-base leading-relaxed space-y-6">
                <FormattedText content={currentLesson.content} />

                {/* Interactive End-of-Lesson Practice Questions (Required for completion) */}
                {hasPracticeQuestions && (
                  <div id="lesson-practice-section" className="mt-10 pt-8 border-t-2 border-dashed border-slate-200 dark:border-slate-800 space-y-6">
                    <div className="p-5 rounded-2xl bg-gradient-to-r from-brand-50 to-indigo-50/60 dark:from-brand-950/40 dark:to-indigo-950/20 border border-brand-200 dark:border-brand-800/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-brand-600 text-white">
                            Mandatory Check
                          </span>
                          <h4 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                            Lesson Knowledge Check (5 Questions)
                          </h4>
                        </div>
                        <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                          Solve all 5 questions below to unlock lesson completion and advance your progress.
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        {practiceSubmitted ? (
                          <button
                            onClick={handleResetPractice}
                            className="px-3.5 py-1.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-semibold hover:bg-slate-50 transition flex items-center gap-1.5 text-slate-700 dark:text-slate-300"
                          >
                            <RotateCcw className="w-3.5 h-3.5" /> Retake
                          </button>
                        ) : (
                          <span className="text-xs font-bold text-brand-600 dark:text-brand-400 bg-white/80 dark:bg-slate-900/80 px-3 py-1.5 rounded-xl border border-brand-200 dark:border-brand-800 shadow-2xs">
                            {Object.keys(practiceAnswers).length} / {currentLesson.questions.length} Answered
                          </span>
                        )}
                      </div>
                    </div>

                    {practiceFeedbackMsg && (
                      <div className={`p-4 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2.5 ${
                        practiceFeedbackMsg.startsWith('Great job')
                          ? 'bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200'
                          : 'bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-800 text-amber-900 dark:text-amber-200'
                      }`}>
                        {practiceFeedbackMsg.startsWith('Great job') ? (
                          <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                        ) : (
                          <AlertCircle className="w-4 h-4 text-amber-500 shrink-0" />
                        )}
                        <span>{practiceFeedbackMsg}</span>
                      </div>
                    )}

                    <div className="space-y-4">
                      {currentLesson.questions.map((q, qIdx) => {
                        const isAnswered = practiceAnswers[qIdx] !== undefined;
                        const isCorrect = practiceAnswers[qIdx] === q.correctAnswer;

                        return (
                          <div 
                            key={q.id || qIdx}
                            className={`p-4 sm:p-5 rounded-2xl border transition ${
                              practiceSubmitted
                                ? isCorrect
                                  ? 'bg-emerald-50/40 dark:bg-emerald-950/20 border-emerald-300 dark:border-emerald-800/80'
                                  : 'bg-rose-50/40 dark:bg-rose-950/20 border-rose-300 dark:border-rose-800/80'
                                : 'bg-slate-50/70 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800'
                            }`}
                          >
                            <div className="flex items-start justify-between gap-3 mb-3">
                              <p className="font-semibold text-xs sm:text-sm text-slate-900 dark:text-white">
                                <span className="font-mono text-brand-600 dark:text-brand-400 font-bold mr-1.5">
                                  Q{qIdx + 1}.
                                </span>
                                {q.question}
                              </p>
                              {practiceSubmitted && (
                                isCorrect ? (
                                  <span className="shrink-0 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-700 dark:bg-emerald-900/60 dark:text-emerald-300 flex items-center gap-1">
                                    <CheckCircle className="w-3 h-3" /> Correct
                                  </span>
                                ) : (
                                  <span className="shrink-0 px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-100 text-rose-700 dark:bg-rose-900/60 dark:text-rose-300 flex items-center gap-1">
                                    <XCircle className="w-3 h-3" /> Incorrect
                                  </span>
                                )
                              )}
                            </div>

                            <div className="grid grid-cols-1 gap-2">
                              {q.options.map((opt, optIdx) => {
                                const isSelected = practiceAnswers[qIdx] === optIdx;
                                const isOptionCorrect = optIdx === q.correctAnswer;
                                let btnStyle = "border-slate-200 dark:border-slate-700/80 hover:bg-white dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300";

                                if (practiceSubmitted) {
                                  if (isOptionCorrect) {
                                    btnStyle = "border-emerald-500 bg-emerald-100/70 dark:bg-emerald-900/40 text-emerald-900 dark:text-emerald-200 font-bold";
                                  } else if (isSelected) {
                                    btnStyle = "border-rose-500 bg-rose-100/70 dark:bg-rose-900/40 text-rose-900 dark:text-rose-200";
                                  }
                                } else if (isSelected) {
                                  btnStyle = "border-brand-600 bg-brand-100/60 dark:bg-brand-950/60 text-brand-700 dark:text-brand-300 font-semibold ring-2 ring-brand-500/20";
                                }

                                return (
                                  <div
                                    key={optIdx}
                                    onClick={() => handlePracticeAnswer(qIdx, optIdx)}
                                    className={`p-3 rounded-xl border text-xs sm:text-sm transition cursor-pointer flex items-center justify-between ${btnStyle}`}
                                  >
                                    <div className="flex items-center gap-2.5">
                                      <span className={`w-5 h-5 rounded-full text-[11px] font-bold flex items-center justify-center shrink-0 ${
                                        isSelected 
                                          ? 'bg-brand-600 text-white' 
                                          : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                                      }`}>
                                        {String.fromCharCode(65 + optIdx)}
                                      </span>
                                      <span>{opt}</span>
                                    </div>
                                    {practiceSubmitted && isOptionCorrect && (
                                      <CheckCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                                    )}
                                  </div>
                                );
                              })}
                            </div>

                            {practiceSubmitted && q.explanation && (
                              <div className="mt-3 p-3 rounded-xl bg-amber-50/80 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/40 text-xs text-amber-900 dark:text-amber-200">
                                <strong className="font-bold">Explanation:</strong> {q.explanation}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>

                    {!practiceSubmitted ? (
                      <button
                        onClick={handlePracticeSubmit}
                        className="w-full py-3.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-sm shadow-md hover:shadow-lg transition flex items-center justify-center gap-2"
                      >
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Submit 5 Practice Questions to Unlock Completion</span>
                      </button>
                    ) : (
                      <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/80 flex items-center justify-between gap-4">
                        <div className="flex items-center gap-2.5 text-emerald-800 dark:text-emerald-200 text-xs sm:text-sm font-bold">
                          <CheckCircle className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                          <span>Questions solved! This lesson is eligible for completion.</span>
                        </div>
                        <button
                          onClick={() => handleToggleComplete(true)}
                          className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition shadow-sm shrink-0"
                        >
                          {isCompleted ? 'Marked Complete ✓' : 'Mark Lesson Complete'}
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Bottom Lesson Navigation Bar */}
          <div className="p-4 sm:p-5 bg-slate-50 dark:bg-slate-800/60 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <button
              onClick={handlePrevLesson}
              disabled={activeLessonIndex === 0}
              className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-900 disabled:opacity-40 transition flex items-center gap-1.5"
            >
              <ChevronLeft className="w-4 h-4" /> Previous Lesson
            </button>

            <button
              onClick={handleNextLesson}
              disabled={activeLessonIndex === (course.lessons?.length || 1) - 1}
              className="px-5 py-2 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold disabled:opacity-40 transition flex items-center gap-1.5 shadow-sm"
            >
              Next Lesson <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Right: Sticky Lesson Syllabus Drawer */}
        <div className="w-full lg:w-80 flex-shrink-0 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm flex flex-col">
          <h3 className="font-bold text-sm text-slate-900 dark:text-white mb-3 flex items-center justify-between">
            <span>Course Outline</span>
            <span className="text-xs text-slate-400 font-normal">
              {enrollment?.completedLessons?.length || 0} / {course.lessons?.length || 1} Done
            </span>
          </h3>

          <div className="space-y-3 flex-1 overflow-y-auto">
            {course.modules && course.modules.length > 0 ? (
              course.modules.map((mod, modIdx) => (
                <div key={mod.id || modIdx} className="space-y-1">
                  <div className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider px-2 py-1 bg-slate-50 dark:bg-slate-800/60 rounded-lg flex items-center justify-between">
                    <span className="truncate">{mod.title}</span>
                    <span className="text-[10px] text-slate-400 shrink-0 font-normal">
                      {(mod.topics || mod.lessons || []).length + ((mod.submodules || []).reduce((acc, sm) => acc + (sm.topics || []).length, 0))}
                    </span>
                  </div>

                  {/* Direct Topics */}
                  {(mod.topics || mod.lessons || []).length > 0 && (
                    <div className="space-y-1 pl-1">
                      {(mod.topics || mod.lessons || []).map((les) => {
                        const idx = course.lessons?.findIndex(l => l.id === les.id) ?? -1;
                        const active = idx !== -1 ? idx === activeLessonIndex : false;
                        const completed = enrollment?.completedLessons?.includes(les.id);

                        return (
                          <div
                            key={les.id}
                            onClick={() => {
                              if (idx !== -1) {
                                setActiveLessonIndex(idx);
                                setQuizSubmitted(false);
                                setQuizAnswers({});
                              }
                            }}
                            className={`p-2.5 rounded-xl cursor-pointer transition flex items-center justify-between text-xs ${
                              active
                                ? 'bg-brand-50 dark:bg-brand-950/60 border border-brand-200 dark:border-brand-800 text-brand-700 dark:text-brand-300 font-bold'
                                : 'hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium'
                            }`}
                          >
                            <div className="flex items-center gap-2 truncate pr-2">
                              {completed ? (
                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                              ) : les.type === 'quiz' || les.type === 'test' || les.testData ? (
                                <Award className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                              ) : (
                                <span className="w-3.5 h-3.5 rounded-full border border-slate-300 dark:border-slate-600 text-[9px] flex items-center justify-center shrink-0">
                                  •
                                </span>
                              )}
                              <span className="truncate">{les.title}</span>
                            </div>
                            <span className="text-[10px] text-slate-400 capitalize shrink-0">
                              {les.duration}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {/* Nested Sub-modules */}
                  {mod.submodules && mod.submodules.length > 0 && (
                    <div className="space-y-2 mt-1.5 pl-2">
                      {mod.submodules.map((submod, subIdx) => (
                        <div key={submod.id || subIdx} className="space-y-1">
                          <div className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider px-2 py-0.5 bg-indigo-50/60 dark:bg-indigo-950/40 rounded flex items-center justify-between">
                            <span className="truncate flex items-center gap-1.5">
                              <Layers className="w-3 h-3 text-indigo-500 shrink-0" />
                              <span className="truncate">{submod.title}</span>
                            </span>
                            <span className="text-[9px] text-slate-400 font-normal shrink-0">
                              {(submod.topics || []).length}
                            </span>
                          </div>

                          <div className="space-y-1 pl-1">
                            {(submod.topics || []).map((les) => {
                              const idx = course.lessons?.findIndex(l => l.id === les.id) ?? -1;
                              const active = idx !== -1 ? idx === activeLessonIndex : false;
                              const completed = enrollment?.completedLessons?.includes(les.id);

                              return (
                                <div
                                  key={les.id}
                                  onClick={() => {
                                    if (idx !== -1) {
                                      setActiveLessonIndex(idx);
                                      setQuizSubmitted(false);
                                      setQuizAnswers({});
                                    }
                                  }}
                                  className={`p-2 rounded-xl cursor-pointer transition flex items-center justify-between text-xs ${
                                    active
                                      ? 'bg-brand-50 dark:bg-brand-950/60 border border-brand-200 dark:border-brand-800 text-brand-700 dark:text-brand-300 font-bold'
                                      : 'hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium'
                                  }`}
                                >
                                  <div className="flex items-center gap-2 truncate pr-2">
                                    {completed ? (
                                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                                    ) : les.type === 'quiz' || les.type === 'test' || les.testData ? (
                                      <Award className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                                    ) : (
                                      <span className="w-3.5 h-3.5 rounded-full border border-slate-300 dark:border-slate-600 text-[9px] flex items-center justify-center shrink-0">
                                        •
                                      </span>
                                    )}
                                    <span className="truncate">{les.title}</span>
                                    {(les.type === 'quiz' || les.type === 'test' || les.testData) && (
                                      <span className="px-1.5 py-0.5 rounded bg-amber-100 dark:bg-amber-950/60 text-[9px] text-amber-600 dark:text-amber-400 font-bold shrink-0">
                                        Test
                                      </span>
                                    )}
                                  </div>
                                  <span className="text-[10px] text-slate-400 capitalize shrink-0">
                                    {les.duration}
                                  </span>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))
            ) : (
              course.lessons?.map((les, idx) => {
                const active = idx === activeLessonIndex;
                const completed = enrollment?.completedLessons?.includes(les.id);
                const isTest = les.type === 'quiz' || les.type === 'test' || les.testData;

                return (
                  <div
                    key={les.id}
                    onClick={() => {
                      setActiveLessonIndex(idx);
                      setQuizSubmitted(false);
                      setQuizAnswers({});
                    }}
                    className={`p-3 rounded-xl cursor-pointer transition flex items-center justify-between text-xs ${
                      active
                        ? 'bg-brand-50 dark:bg-brand-950/60 border border-brand-200 dark:border-brand-800 text-brand-700 dark:text-brand-300 font-bold'
                        : 'hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 truncate pr-2">
                      {completed ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                      ) : isTest ? (
                        <Award className="w-4 h-4 text-amber-500 flex-shrink-0" />
                      ) : (
                        <span className="w-4 h-4 rounded-full border border-slate-300 dark:border-slate-600 text-[10px] flex items-center justify-center flex-shrink-0">
                          {idx + 1}
                        </span>
                      )}
                      <span className="truncate">{les.title}</span>
                      {isTest && (
                        <span className="px-1.5 py-0.5 rounded bg-amber-100 dark:bg-amber-950/60 text-[9px] text-amber-600 dark:text-amber-400 font-bold shrink-0">
                          Test
                        </span>
                      )}
                    </div>
                    <span className="text-[10px] text-slate-400 capitalize flex-shrink-0">
                      {les.duration}
                    </span>
                  </div>
                );
              })
            )}
          </div>

          {/* Certificate unlock card */}
          {enrollment?.completed && (
            <div className="mt-4 p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/50 text-center">
              <Award className="w-8 h-8 text-amber-500 mx-auto mb-2" />
              <div className="font-bold text-xs text-slate-900 dark:text-white">Certificate Unlocked!</div>
              <button
                onClick={() => setShowCompletionModal(true)}
                className="mt-2 w-full py-1.5 bg-amber-500 hover:bg-amber-600 text-white rounded-lg text-xs font-bold transition shadow-sm"
              >
                View Certificate
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Course Completion & Certificate Modal */}
      {showCompletionModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl border border-amber-500/30 shadow-2xl p-6 sm:p-8 text-center">
            
            <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-500 flex items-center justify-center mx-auto mb-4">
              <Award className="w-8 h-8" />
            </div>

            <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-1">
              Congratulations!
            </h3>
            <p className="text-xs text-slate-500 mb-6">
              You have officially completed 100% of <br />
              <strong className="text-slate-800 dark:text-slate-200">{course.title}</strong>
            </p>

            {/* Certificate Preview Card */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-amber-50 via-white to-amber-50/50 dark:from-slate-800 dark:via-slate-800 dark:to-slate-900 border-2 border-amber-400/40 text-left shadow-md mb-6 relative overflow-hidden">
              <div className="text-[10px] uppercase font-bold tracking-widest text-amber-600 dark:text-amber-400 mb-1">
                Certificate of Completion
              </div>
              <h4 className="text-lg font-black text-slate-900 dark:text-white mb-2">
                D.TEN ACADEMY
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 mb-4">
                This certifies that <strong className="text-slate-900 dark:text-white font-bold">{userProfile?.name || 'Ahmed Khan'}</strong> has demonstrated mastery in <strong className="text-slate-900 dark:text-white font-bold">{course.title}</strong>.
              </p>
              <div className="flex justify-between items-end text-[11px] text-slate-500 border-t border-amber-200 dark:border-slate-700 pt-3">
                <div>Cert ID: {issuedCert?.certificateNumber || 'DTEN-2025-8491'}</div>
                <div>Grade: {issuedCert?.grade || 'Verified (95%)'}</div>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => window.print()}
                className="flex-1 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs shadow-md transition flex items-center justify-center gap-1.5"
              >
                <Download className="w-4 h-4" /> Download / Print
              </button>
              <button
                onClick={() => setShowCompletionModal(false)}
                className="flex-1 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold text-xs transition"
              >
                Close Window
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
