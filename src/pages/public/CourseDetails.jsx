import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  BookOpen, 
  Clock, 
  Star, 
  CheckCircle2, 
  Sparkles, 
  PlayCircle, 
  Award, 
  FileText, 
  ShieldCheck, 
  ArrowLeft,
  Lock,
  Layers,
  HelpCircle,
  Bookmark
} from 'lucide-react';
import { getCourseById, getUserEnrollments, enrollInCourse, toggleBookmark, getUserBookmarks } from '../../services/firebaseService';
import { Badge } from '../../components/common/Badge';
import { ProgressBar } from '../../components/common/ProgressBar';
import { useAuth } from '../../context/AuthContext';
import { PremiumGateModal } from '../../components/common/PremiumGateModal';
import { FormattedText } from '../../components/common/FormattedText';
import { ReadAloudPlayer } from '../../components/common/ReadAloudPlayer';

export const CourseDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentUser, isGuest, isPremium } = useAuth();

  const [course, setCourse] = useState(null);
  const [enrollment, setEnrollment] = useState(null);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [loading, setLoading] = useState(true);
  const [gateOpen, setGateOpen] = useState(false);

  useEffect(() => {
    const loadCourse = async () => {
      setLoading(true);
      const data = await getCourseById(id);
      setCourse(data);

      if (currentUser?.uid && data) {
        const enrs = await getUserEnrollments(currentUser.uid);
        const enr = enrs.find(e => e.courseId === data.id);
        setEnrollment(enr);

        const bms = await getUserBookmarks(currentUser.uid);
        setIsBookmarked(bms.some(b => b.itemId === data.id));
      }
      setLoading(false);
    };
    loadCourse();
  }, [id, currentUser]);

  const handleEnrollOrContinue = async () => {
    if (isGuest) {
      navigate(`/login?redirect=/courses/${id}`);
      return;
    }

    if (course.membership === 'premium' && !isPremium) {
      setGateOpen(true);
      return;
    }

    if (!enrollment) {
      const newEnr = await enrollInCourse(currentUser.uid, course);
      setEnrollment(newEnr);
    }

    navigate(`/learn/${course.id}`);
  };

  const handleToggleBookmark = async () => {
    if (isGuest) {
      navigate('/login');
      return;
    }
    const state = await toggleBookmark(currentUser.uid, {
      id: course.id,
      title: course.title,
      category: course.category,
      itemType: 'course'
    });
    setIsBookmarked(state);
  };

  if (loading) {
    return <div className="max-w-7xl mx-auto px-4 py-20 text-center text-slate-400">Loading course overview...</div>;
  }

  if (!course) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold mb-2">Course Not Found</h2>
        <p className="text-slate-500 mb-4">The course you requested does not exist or has been archived.</p>
        <Link to="/courses" className="px-4 py-2 bg-brand-600 text-white rounded-xl text-sm font-bold">
          Back to Courses
        </Link>
      </div>
    );
  }

  const isEnrolled = Boolean(enrollment);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Back button */}
      <Link
        to="/courses"
        className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-800 dark:hover:text-white transition"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Course Catalog
      </Link>

      {/* Hero Banner Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        
        {/* Left Column: Info */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex flex-wrap items-center gap-2">
            <Badge type={course.membership} />
            <span className="text-xs font-semibold text-brand-600 dark:text-brand-400 bg-brand-50 dark:bg-brand-950/60 px-2.5 py-1 rounded-full border border-brand-200 dark:border-brand-800">
              {course.category}
            </span>
            <span className="text-xs font-semibold text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-full">
              Level: {course.level}
            </span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
              {course.title}
            </h1>
            {course.description && (
              <div className="shrink-0">
                <ReadAloudPlayer 
                  text={course.description} 
                  title={course.title}
                  subtitle="Read Aloud Overview"
                  compact={true}
                />
              </div>
            )}
          </div>

          <div className="text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            <FormattedText content={course.description} />
          </div>

          <div className="flex flex-wrap items-center gap-6 text-xs text-slate-500 dark:text-slate-400 pt-2 border-t border-slate-100 dark:border-slate-800">
            <div>Instructor: <strong className="text-slate-800 dark:text-slate-200">{course.instructor}</strong></div>
            <div className="flex items-center gap-1">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <strong className="text-slate-800 dark:text-slate-200">{course.rating}</strong> ({course.reviewsCount || 120} reviews)
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              <span>{course.duration}</span>
            </div>
            <div>
              <span>{course.lessonCount || course.lessons?.length || 4} Lessons</span>
            </div>
          </div>

          {/* Progress bar if enrolled */}
          {isEnrolled && (
            <div className="p-5 bg-brand-50/70 dark:bg-slate-800/80 rounded-2xl border border-brand-200 dark:border-slate-700 space-y-2">
              <div className="flex justify-between items-center text-xs font-bold text-slate-700 dark:text-slate-200">
                <span>You are enrolled in this course</span>
                <span className="text-brand-600 dark:text-brand-400">{enrollment.progress}% Completed</span>
              </div>
              <ProgressBar progress={enrollment.progress} size="md" />
              <p className="text-[11px] text-slate-500">
                {enrollment.completedLessons?.length || 0} of {enrollment.totalLessons} lessons finished.
              </p>
            </div>
          )}

          {/* Learning Objectives */}
          {course.objectives && course.objectives.length > 0 && (
            <div className="p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
              <h3 className="font-bold text-base text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-500" /> What You Will Learn
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                {course.objectives.map((obj, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                    <span>{obj}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Course Syllabus / Modules & Lessons List */}
          <div className="p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
            <h3 className="font-bold text-base text-slate-900 dark:text-white flex items-center justify-between">
              <span className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-brand-600 dark:text-brand-400" /> Course Syllabus & Curriculum
              </span>
              <span className="text-xs text-slate-400 font-normal">
                {course.modules?.length ? `${course.modules.length} Sections • ` : ''}
                {course.modules?.length 
                  ? course.modules.reduce((acc, m) => acc + (m.topics || m.lessons || []).length + ((m.submodules || []).reduce((sAcc, sm) => sAcc + (sm.topics || []).length, 0)), 0)
                  : course.lessonCount || course.lessons?.length || 0} Topics
              </span>
            </h3>

            {course.modules && course.modules.length > 0 ? (
              <div className="space-y-4">
                {course.modules.map((mod, modIdx) => (
                  <div key={mod.id || modIdx} className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 overflow-hidden">
                    <div className="p-3.5 bg-slate-100/70 dark:bg-slate-800/80 flex items-center justify-between">
                      <div>
                        <div className="font-bold text-xs sm:text-sm text-slate-800 dark:text-slate-200 flex items-center gap-2">
                          <Layers className="w-4 h-4 text-brand-600 dark:text-brand-400" />
                          <span>{mod.title}</span>
                        </div>
                        {mod.description && (
                          <p className="text-[11px] text-slate-400 mt-0.5">{mod.description}</p>
                        )}
                      </div>
                      <span className="text-[10px] font-semibold text-slate-500 bg-white dark:bg-slate-900 px-2 py-0.5 rounded-full border border-slate-200 dark:border-slate-700">
                        {(mod.topics || mod.lessons || []).length + ((mod.submodules || []).reduce((acc, sm) => acc + (sm.topics || []).length, 0))} Topics
                      </span>
                    </div>

                    {(mod.topics || mod.lessons || []).length > 0 && (
                      <div className="divide-y divide-slate-100 dark:divide-slate-800/60 p-2 sm:p-3">
                        {(mod.topics || mod.lessons || []).map((topic, topIdx) => {
                          const isLessonDone = enrollment?.completedLessons?.includes(topic.id);
                          const isTest = topic.type === 'quiz' || topic.type === 'test' || Boolean(topic.testData);
                          return (
                            <div 
                              key={topic.id || topIdx} 
                              onClick={handleEnrollOrContinue}
                              className="py-2.5 px-2 flex items-center justify-between text-xs sm:text-sm hover:bg-white dark:hover:bg-slate-800/50 rounded-lg transition cursor-pointer group"
                            >
                              <div className="flex items-center gap-3">
                                <div className={`w-6 h-6 rounded-md flex items-center justify-center font-bold text-[11px] ${
                                  isLessonDone 
                                    ? 'bg-emerald-500/10 text-emerald-600' 
                                    : isTest
                                    ? 'bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400'
                                    : 'bg-slate-200/70 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                                }`}>
                                  {isLessonDone ? (
                                    <CheckCircle2 className="w-3.5 h-3.5" />
                                  ) : isTest ? (
                                    <Award className="w-3.5 h-3.5" />
                                  ) : (
                                    `${modIdx + 1}.${topIdx + 1}`
                                  )}
                                </div>
                                <div>
                                  <div className="font-semibold text-slate-900 dark:text-white text-xs sm:text-sm flex items-center gap-1.5">
                                    <span>{topic.title}</span>
                                    {isTest && (
                                      <span className="px-1.5 py-0.5 rounded bg-amber-100 dark:bg-amber-950/60 text-[9px] text-amber-600 dark:text-amber-400 font-bold shrink-0">
                                        Test
                                      </span>
                                    )}
                                  </div>
                                  <div className="text-[11px] text-slate-400 capitalize">
                                    {isTest ? (
                                      `${topic.testData?.questions?.length || 'Standard'} Questions • ${topic.testData?.settings?.timeLimit ? `${topic.testData.settings.timeLimit} mins` : (topic.duration || 'Assessment')}`
                                    ) : (
                                      `${topic.type || 'text'} • ${topic.duration || '15 mins'}`
                                    )}
                                  </div>
                                </div>
                              </div>

                              <div>
                                {isEnrolled ? (
                                  <span className={`text-[11px] font-semibold ${isLessonDone ? 'text-emerald-600' : 'text-slate-400'}`}>
                                    {isLessonDone ? 'Completed' : 'Upcoming'}
                                  </span>
                                ) : (
                                  <span className="text-[11px] text-slate-400">
                                    {isTest && topic.testData?.settings?.timeLimit 
                                      ? `${topic.testData.settings.timeLimit} mins` 
                                      : (topic.duration || '15 mins')}
                                  </span>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}

                    {/* Sub-modules inside this module */}
                    {mod.submodules && mod.submodules.length > 0 && (
                      <div className="p-2 sm:p-3 space-y-3 bg-slate-100/50 dark:bg-slate-800/20 border-t border-slate-200/60 dark:border-slate-800/60">
                        {mod.submodules.map((submod, subIdx) => (
                          <div key={submod.id || subIdx} className="rounded-xl border border-indigo-200/60 dark:border-indigo-900/40 bg-white dark:bg-slate-900 overflow-hidden shadow-2xs">
                            <div className="p-3 bg-indigo-50/50 dark:bg-indigo-950/40 flex items-center justify-between">
                              <div>
                                <div className="font-bold text-xs text-indigo-900 dark:text-indigo-200 flex items-center gap-1.5">
                                  <Layers className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
                                  <span>{submod.title}</span>
                                </div>
                                {submod.description && (
                                  <p className="text-[10px] text-slate-400 mt-0.5">{submod.description}</p>
                                )}
                              </div>
                              <span className="text-[9px] font-semibold text-indigo-600 dark:text-indigo-400 bg-white dark:bg-slate-800 px-2 py-0.5 rounded-full border border-indigo-200 dark:border-indigo-800 shrink-0">
                                {(submod.topics || []).length} Topics
                              </span>
                            </div>

                            <div className="divide-y divide-slate-100 dark:divide-slate-800/60 p-2">
                              {(submod.topics || []).map((topic, topIdx) => {
                                const isLessonDone = enrollment?.completedLessons?.includes(topic.id);
                                const isTest = topic.type === 'quiz' || topic.type === 'test' || Boolean(topic.testData);
                                return (
                                  <div 
                                    key={topic.id || topIdx} 
                                    onClick={handleEnrollOrContinue}
                                    className="py-2 px-2 flex items-center justify-between text-xs hover:bg-slate-50 dark:hover:bg-slate-800/50 rounded-lg transition cursor-pointer group"
                                  >
                                    <div className="flex items-center gap-2.5">
                                      <div className={`w-5 h-5 rounded-md flex items-center justify-center font-bold text-[10px] ${
                                        isLessonDone 
                                          ? 'bg-emerald-500/10 text-emerald-600' 
                                          : isTest
                                          ? 'bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400'
                                          : 'bg-indigo-100/70 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300'
                                      }`}>
                                        {isLessonDone ? (
                                          <CheckCircle2 className="w-3 h-3" />
                                        ) : isTest ? (
                                          <Award className="w-3 h-3" />
                                        ) : (
                                          `${modIdx + 1}.${subIdx + 1}.${topIdx + 1}`
                                        )}
                                      </div>
                                      <div>
                                        <div className="font-semibold text-slate-900 dark:text-white text-xs flex items-center gap-1.5">
                                          <span>{topic.title}</span>
                                          {isTest && (
                                            <span className="px-1.5 py-0.5 rounded bg-amber-100 dark:bg-amber-950/60 text-[9px] text-amber-600 dark:text-amber-400 font-bold shrink-0">
                                              Test
                                            </span>
                                          )}
                                        </div>
                                        <div className="text-[10px] text-slate-400 capitalize">
                                          {isTest ? (
                                            `${topic.testData?.questions?.length || 'Standard'} Questions • ${topic.testData?.settings?.timeLimit ? `${topic.testData.settings.timeLimit} mins` : (topic.duration || 'Assessment')}`
                                          ) : (
                                            `${topic.type || 'text'} • ${topic.duration || '15 mins'}`
                                          )}
                                        </div>
                                      </div>
                                    </div>

                                    <div>
                                      {isEnrolled ? (
                                        <span className={`text-[10px] font-semibold ${isLessonDone ? 'text-emerald-600' : 'text-slate-400'}`}>
                                          {isLessonDone ? 'Completed' : 'Upcoming'}
                                        </span>
                                      ) : (
                                        <span className="text-[10px] text-slate-400">
                                          {isTest && topic.testData?.settings?.timeLimit 
                                            ? `${topic.testData.settings.timeLimit} mins` 
                                            : (topic.duration || '15 mins')}
                                        </span>
                                      )}
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="divide-y divide-slate-100 dark:divide-slate-800">
                {course.lessons?.map((lesson, idx) => {
                  const isLessonDone = enrollment?.completedLessons?.includes(lesson.id);
                  const isTest = lesson.type === 'quiz' || lesson.type === 'test' || Boolean(lesson.testData);
                  return (
                    <div key={lesson.id} className="py-3.5 flex items-center justify-between text-xs sm:text-sm">
                      <div className="flex items-center gap-3">
                        <div className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs ${
                          isLessonDone 
                            ? 'bg-emerald-500/10 text-emerald-600' 
                            : isTest
                            ? 'bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400'
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
                        }`}>
                          {isLessonDone ? (
                            <CheckCircle2 className="w-4 h-4" />
                          ) : isTest ? (
                            <Award className="w-4 h-4" />
                          ) : (
                            idx + 1
                          )}
                        </div>
                        <div>
                          <div className="font-semibold text-slate-900 dark:text-white flex items-center gap-1.5">
                            <span>{lesson.title}</span>
                            {isTest && (
                              <span className="px-1.5 py-0.5 rounded bg-amber-100 dark:bg-amber-950/60 text-[9px] text-amber-600 dark:text-amber-400 font-bold shrink-0">
                                Test
                              </span>
                            )}
                          </div>
                          <div className="text-[11px] text-slate-400 capitalize">
                            {isTest ? (
                              `${lesson.testData?.questions?.length || 'Standard'} Questions • ${lesson.testData?.settings?.timeLimit ? `${lesson.testData.settings.timeLimit} mins` : (lesson.duration || 'Assessment')}`
                            ) : (
                              `${lesson.type || 'text'} • ${lesson.duration || '15 mins'}`
                            )}
                          </div>
                        </div>
                      </div>

                      <div>
                        {isEnrolled ? (
                          <span className={`text-xs font-semibold ${isLessonDone ? 'text-emerald-600' : 'text-slate-400'}`}>
                            {isLessonDone ? 'Completed' : 'Upcoming'}
                          </span>
                        ) : (
                          <span className="text-xs text-slate-400">
                            {isTest && lesson.testData?.settings?.timeLimit 
                              ? `${lesson.testData.settings.timeLimit} mins` 
                              : (lesson.duration || `Topic ${idx + 1}`)}
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Prerequisites */}
          {course.requirements && (
            <div className="p-5 bg-slate-50 dark:bg-slate-800/40 rounded-2xl border border-slate-200 dark:border-slate-800">
              <h4 className="font-bold text-xs uppercase tracking-wider text-slate-500 mb-2">
                Prerequisites & Requirements
              </h4>
              <ul className="list-disc list-inside text-xs text-slate-600 dark:text-slate-400 space-y-1">
                {course.requirements.map((req, i) => (
                  <li key={i}>{req}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Right Column: Sticky Enrollment Card */}
        <div className="lg:col-span-1 sticky top-24 space-y-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-lg p-6 space-y-6">
            
            <div className="relative aspect-video rounded-2xl overflow-hidden bg-slate-100">
              <img src={course.thumbnail} alt="" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-white/90 text-brand-600 flex items-center justify-center shadow-lg">
                  <PlayCircle className="w-6 h-6 fill-brand-600 text-white ml-0.5" />
                </div>
              </div>
            </div>

            <div>
              <div className="text-2xl font-black text-slate-900 dark:text-white">
                {course.membership === 'free' ? 'Free Access' : 'Premium Membership'}
              </div>
              <p className="text-xs text-slate-500 mt-1">
                {course.membership === 'free' 
                  ? 'Includes all lectures, interactive practice, and knowledge checks.' 
                  : 'Includes full curriculum, AI generator tools, and verifiable certificate.'}
              </p>
            </div>

            <div className="space-y-3">
              <button
                onClick={handleEnrollOrContinue}
                className={`w-full py-3.5 px-6 rounded-xl font-bold text-sm shadow-md transition flex items-center justify-center gap-2 ${
                  isEnrolled
                    ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                    : course.membership === 'premium' && !isPremium
                    ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-amber-500/20'
                    : 'bg-brand-600 hover:bg-brand-700 text-white shadow-brand-500/25'
                }`}
              >
                {isEnrolled ? (
                  <>
                    <PlayCircle className="w-5 h-5" />
                    <span>Continue Learning</span>
                  </>
                ) : course.membership === 'premium' && !isPremium ? (
                  <>
                    <Sparkles className="w-5 h-5 fill-white" />
                    <span>Unlock Course with Premium</span>
                  </>
                ) : (
                  <>
                    <BookOpen className="w-5 h-5" />
                    <span>Enroll Now (Free)</span>
                  </>
                )}
              </button>

              <button
                onClick={handleToggleBookmark}
                className="w-full py-2.5 px-4 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold text-xs flex items-center justify-center gap-1.5 transition"
              >
                <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-brand-600 text-brand-600' : ''}`} />
                <span>{isBookmarked ? 'Saved to Bookmarks' : 'Save / Bookmark Course'}</span>
              </button>
            </div>

            {/* Inclusions */}
            <div className="space-y-2.5 pt-4 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Full lifetime access
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Self-paced video & readings
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Interactive chapter quizzes
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-amber-500" /> Certificate upon 100% completion
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Premium Gate Modal */}
      <PremiumGateModal
        isOpen={gateOpen}
        onClose={() => setGateOpen(false)}
        resourceTitle={course.title}
      />
    </div>
  );
};
