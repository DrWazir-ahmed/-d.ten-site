import React, { useState, useEffect, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Search, 
  Filter, 
  BookOpen, 
  Clock, 
  Star, 
  Sparkles, 
  CheckCircle2, 
  PlayCircle,
  ArrowRight,
  SlidersHorizontal
} from 'lucide-react';
import { getCourses, getUserEnrollments } from '../../services/firebaseService';
import { Badge } from '../../components/common/Badge';
import { ProgressBar } from '../../components/common/ProgressBar';
import { useAuth } from '../../context/AuthContext';
import { PremiumGateModal } from '../../components/common/PremiumGateModal';

export const Courses = () => {
  const navigate = useNavigate();
  const { currentUser, isPremium } = useAuth();

  const [courses, setCourses] = useState([]);
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedLevel, setSelectedLevel] = useState('All');
  const [selectedMembership, setSelectedMembership] = useState('All'); // All, free, premium
  const [sortBy, setSortBy] = useState('popular'); // popular, newest, rating

  const [gateOpen, setGateOpen] = useState(false);
  const [selectedResource, setSelectedResource] = useState('');

  useEffect(() => {
    const loadCoursesAndEnrollments = async () => {
      setLoading(true);
      const data = await getCourses();
      setCourses(data);

      if (currentUser?.uid) {
        const userEnrs = await getUserEnrollments(currentUser.uid);
        setEnrollments(userEnrs);
      }
      setLoading(false);
    };
    loadCoursesAndEnrollments();
  }, [currentUser]);

  // Extract unique categories
  const categories = useMemo(() => {
    const set = new Set(courses.map(c => c.category).filter(Boolean));
    return ['All', ...Array.from(set)];
  }, [courses]);

  // Filtered & sorted courses
  const filteredCourses = useMemo(() => {
    return courses
      .filter(c => {
        const matchesSearch = 
          c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          c.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          c.instructor.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesCat = selectedCategory === 'All' || c.category === selectedCategory;
        const matchesLevel = selectedLevel === 'All' || c.level === selectedLevel;
        const matchesMem = selectedMembership === 'All' || c.membership === selectedMembership;

        return matchesSearch && matchesCat && matchesLevel && matchesMem;
      })
      .sort((a, b) => {
        if (sortBy === 'rating') return (b.rating || 0) - (a.rating || 0);
        if (sortBy === 'newest') return new Date(b.createdDate || 0) - new Date(a.createdDate || 0);
        return (b.reviewsCount || 0) - (a.reviewsCount || 0);
      });
  }, [courses, searchTerm, selectedCategory, selectedLevel, selectedMembership, sortBy]);

  const getEnrollment = (courseId) => {
    return enrollments.find(e => e.courseId === courseId);
  };

  const handleCourseAction = (course) => {
    if (course.membership === 'premium' && !isPremium) {
      setSelectedResource(course.title);
      setGateOpen(true);
      return;
    }
    navigate(`/courses/${course.id}`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 dark:bg-brand-950/60 text-brand-600 dark:text-brand-400 text-xs font-bold uppercase tracking-wider mb-3">
          <BookOpen className="w-3.5 h-3.5" /> Full Curriculum Catalog
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white">
          Explore Courses
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 max-w-2xl">
          From English Grammar to Linear Algebra, Computer Science, and Artificial Intelligence. Browse and learn with interactive lessons and quizzes.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 sm:p-5 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row gap-3">
          
          {/* Search box */}
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search by course title, instructor, or topic..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
          </div>

          {/* Level Filter */}
          <div className="flex items-center gap-2">
            <select
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
              className="px-3 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-semibold text-slate-700 dark:text-slate-300"
            >
              <option value="All">All Levels</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>

            {/* Access filter */}
            <select
              value={selectedMembership}
              onChange={(e) => setSelectedMembership(e.target.value)}
              className="px-3 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-semibold text-slate-700 dark:text-slate-300"
            >
              <option value="All">All Tiers (Free & Pro)</option>
              <option value="free">Free Courses Only</option>
              <option value="premium">Premium Courses Only</option>
            </select>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-semibold text-slate-700 dark:text-slate-300"
            >
              <option value="popular">Most Popular</option>
              <option value="rating">Top Rated</option>
              <option value="newest">Newest First</option>
            </select>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 pt-1 text-xs">
          <span className="text-slate-400 font-semibold mr-1 flex-shrink-0">Category:</span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl font-semibold whitespace-nowrap transition ${
                selectedCategory === cat
                  ? 'bg-brand-600 text-white shadow-sm'
                  : 'bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Courses Grid */}
      {loading ? (
        <div className="py-20 text-center text-slate-400">Loading courses...</div>
      ) : filteredCourses.length === 0 ? (
        <div className="p-12 text-center bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
          <BookOpen className="w-12 h-12 mx-auto text-slate-400 mb-3" />
          <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1">No courses match your filter</h3>
          <p className="text-xs text-slate-500 mb-4">Try clearing filters or changing your search keywords.</p>
          <button
            onClick={() => { setSearchTerm(''); setSelectedCategory('All'); setSelectedLevel('All'); setSelectedMembership('All'); }}
            className="px-4 py-2 bg-brand-600 text-white text-xs font-bold rounded-xl"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => {
            const enrollment = getEnrollment(course.id);
            const isEnrolled = Boolean(enrollment);

            return (
              <div
                key={course.id}
                className="group bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Thumbnail & Badges */}
                  <div className="relative aspect-video overflow-hidden bg-slate-100 dark:bg-slate-800">
                    {course.thumbnail ? (
                      <img
                        src={course.thumbnail}
                        alt={course.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        onError={(e) => { e.target.style.display = 'none'; }}
                      />
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-brand-50 via-indigo-50 to-blue-100 dark:from-brand-950/40 dark:via-indigo-950/40 dark:to-blue-950/40 flex items-center justify-center">
                        <BookOpen className="w-10 h-10 text-brand-300 dark:text-brand-700" />
                      </div>
                    )}
                    <div className="absolute top-3 left-3">
                      <Badge type={course.membership} />
                    </div>
                    <div className="absolute top-3 right-3 px-2 py-1 rounded-md bg-black/60 backdrop-blur-sm text-white text-[11px] font-semibold flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {course.duration}
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-5">
                    <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                      <span className="font-semibold text-brand-600 dark:text-brand-400">{course.category}</span>
                      <span className="flex items-center gap-1 font-bold text-slate-700 dark:text-slate-300">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        {course.rating} ({course.reviewsCount || 100})
                      </span>
                    </div>

                    <h3 className="font-bold text-base text-slate-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400 transition mb-2">
                      {course.title}
                    </h3>

                    <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed mb-4">
                      {course.description}
                    </p>

                    <div className="text-[11px] text-slate-400 mb-3 flex items-center gap-2">
                      <span>Instructor: <strong className="text-slate-600 dark:text-slate-300">{course.instructor}</strong></span>
                    </div>

                    {/* Show Progress bar if user is enrolled! */}
                    {isEnrolled && (
                      <div className="mb-4 p-3 bg-brand-50/50 dark:bg-slate-800/60 rounded-xl border border-brand-100 dark:border-slate-700">
                        <ProgressBar progress={enrollment.progress} size="sm" />
                      </div>
                    )}
                  </div>
                </div>

                {/* Footer Action */}
                <div className="p-5 pt-0">
                  <button
                    onClick={() => handleCourseAction(course)}
                    className={`w-full py-2.5 px-4 rounded-xl font-bold text-xs transition flex items-center justify-center gap-2 shadow-sm ${
                      isEnrolled
                        ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                        : course.membership === 'premium' && !isPremium
                        ? 'bg-amber-500 hover:bg-amber-600 text-white shadow-amber-500/20'
                        : 'bg-brand-600 hover:bg-brand-700 text-white'
                    }`}
                  >
                    {isEnrolled ? (
                      <>
                        <PlayCircle className="w-4 h-4" />
                        <span>Continue Learning</span>
                      </>
                    ) : course.membership === 'premium' && !isPremium ? (
                      <>
                        <Sparkles className="w-4 h-4 fill-white" />
                        <span>Unlock Premium Course</span>
                      </>
                    ) : (
                      <>
                        <span>Start Course</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Premium Gate Modal */}
      <PremiumGateModal
        isOpen={gateOpen}
        onClose={() => setGateOpen(false)}
        resourceTitle={selectedResource}
      />
    </div>
  );
};
