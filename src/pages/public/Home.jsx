import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Sparkles, 
  ArrowRight, 
  BookOpen, 
  Layers, 
  Wrench, 
  FileText, 
  CheckCircle2, 
  Clock, 
  Star, 
  ShieldCheck, 
  Award, 
  TrendingUp, 
  Laptop, 
  PlayCircle,
  HelpCircle,
  Zap,
  Users
} from 'lucide-react';
import { getCourses, getApps, getTools, getContent } from '../../services/firebaseService';
import { Badge } from '../../components/common/Badge';
import { useAuth } from '../../context/AuthContext';
import { PremiumGateModal } from '../../components/common/PremiumGateModal';

export const Home = () => {
  const navigate = useNavigate();
  const { isGuest, isPremium } = useAuth();
  const [courses, setCourses] = useState([]);
  const [apps, setApps] = useState([]);
  const [tools, setTools] = useState([]);
  const [content, setContent] = useState([]);
  const [gateOpen, setGateOpen] = useState(false);
  const [selectedResource, setSelectedResource] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const [c, a, t, cnt] = await Promise.all([
        getCourses(),
        getApps(),
        getTools(),
        getContent()
      ]);
      setCourses(c.filter(course => course.status === 'published' || !course.status).slice(0, 6));
      setApps(a.slice(0, 4));
      setTools(t.slice(0, 4));
      const sortedContent = [...cnt]
        .filter(item => item.status === 'published' || !item.status)
        .sort((a, b) => new Date(b.publishDate || 0) - new Date(a.publishDate || 0));
      setContent(sortedContent.slice(0, 4));
    };
    fetchData();
  }, []);

  const handleResourceClick = (item, defaultPath) => {
    if (item.membership === 'premium' && !isPremium) {
      setSelectedResource(item.title || item.name);
      setGateOpen(true);
    } else {
      navigate(defaultPath);
    }
  };

  return (
    <div className="space-y-16 sm:space-y-24 pb-20">
      
      {/* Hero Section */}
      <section className="relative pt-12 sm:pt-20 lg:pt-28 pb-12 overflow-hidden">
        {/* Ambient lighting glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-brand-500/20 via-purple/20 to-pink-500/10 blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative text-center">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-50 dark:bg-brand-950/60 border border-brand-200 dark:border-brand-800 text-brand-600 dark:text-brand-300 text-xs font-bold uppercase tracking-wider mb-6 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 fill-brand-600" />
            Modern Educational Learning Hub
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-slate-900 dark:text-white tracking-tight leading-[1.1] mb-6 max-w-4xl mx-auto">
            Learn. Practice. Track.{' '}
            <span className="bg-gradient-to-r from-brand-600 via-purple to-pink-500 bg-clip-text text-transparent">
              Achieve.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto mb-10 leading-relaxed font-normal">
            Explore courses, educational apps, interactive tools and learning resources designed to help you learn smarter.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto mb-12">
            <Link
              to="/courses"
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-sm shadow-lg shadow-brand-500/25 hover:shadow-brand-500/40 transition-all flex items-center justify-center gap-2 group"
            >
              <span>Explore Free Courses</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>

            {isGuest ? (
              <Link
                to="/register"
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700/80 text-slate-800 dark:text-white font-bold text-sm border border-slate-200 dark:border-slate-700 shadow-sm transition-all"
              >
                Join Free
              </Link>
            ) : null}

            <Link
              to="/pricing"
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold text-sm shadow-lg shadow-amber-500/20 transition-all flex items-center justify-center gap-1.5"
            >
              <Sparkles className="w-4 h-4 fill-white" />
              <span>Go Premium</span>
            </Link>
          </div>

          {/* Guest Prompt Banner if not registered */}
          {isGuest && (
            <div className="max-w-xl mx-auto p-3.5 rounded-2xl bg-brand-500/10 border border-brand-500/20 text-brand-700 dark:text-brand-300 text-xs font-semibold flex items-center justify-center gap-2">
              <Sparkles className="w-4 h-4 text-brand-600 dark:text-brand-400 flex-shrink-0" />
              <span>Sign up free to track your learning progress, quiz attempts, and save courses.</span>
            </div>
          )}

          {/* Platform Stat Highlights */}
          <div className="mt-14 pt-10 border-t border-slate-200/80 dark:border-slate-800 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto text-center">
            <div>
              <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">12+</div>
              <div className="text-xs text-slate-500 font-medium">Core Courses</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-black text-brand-600 dark:text-brand-400">10+</div>
              <div className="text-xs text-slate-500 font-medium">Interactive Tools</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-black text-purple">8+</div>
              <div className="text-xs text-slate-500 font-medium">Educational Apps</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-black text-emerald-600 dark:text-emerald-400">100%</div>
              <div className="text-xs text-slate-500 font-medium">Self-Paced Learning</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Courses Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 text-brand-600 dark:text-brand-400 text-xs font-bold uppercase tracking-wider mb-2">
              <BookOpen className="w-4 h-4" /> Academic Excellence
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
              Featured Courses
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              Curated curricula covering languages, mathematics, computer science, and safety.
            </p>
          </div>
          <Link
            to="/courses"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-brand-600 dark:text-brand-400 hover:text-brand-700 group"
          >
            <span>View All Courses</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <div
              key={course.id}
              className="group bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col"
            >
              {/* Thumbnail */}
              <div className="relative aspect-video overflow-hidden bg-slate-100">
                <img
                  src={course.thumbnail}
                  alt={course.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3">
                  <Badge type={course.membership} />
                </div>
                <div className="absolute top-3 right-3 px-2 py-1 rounded-md bg-black/60 backdrop-blur-sm text-white text-[11px] font-semibold flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {course.duration}
                </div>
              </div>

              {/* Body */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                    <span className="font-semibold text-brand-600 dark:text-brand-400">{course.category}</span>
                    <span className="flex items-center gap-1 font-bold text-slate-700 dark:text-slate-300">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      {course.rating}
                    </span>
                  </div>

                  <h3 className="font-bold text-base text-slate-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400 transition mb-2">
                    {course.title}
                  </h3>

                  <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mb-4 leading-relaxed">
                    {course.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <span className="text-xs text-slate-500">
                    {course.lessonCount || course.lessons?.length || 4} Lessons • {course.level}
                  </span>
                  <button
                    onClick={() => handleResourceClick(course, `/courses/${course.id}`)}
                    className="px-3.5 py-1.5 rounded-lg bg-brand-50 dark:bg-brand-950/60 hover:bg-brand-600 text-brand-600 dark:text-brand-400 hover:text-white font-bold text-xs transition"
                  >
                    View Course
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Learning Apps Showcase */}
      <section className="bg-slate-100/70 dark:bg-slate-900/40 py-16 border-y border-slate-200/80 dark:border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <div className="flex items-center gap-2 text-purple text-xs font-bold uppercase tracking-wider mb-2">
                <Layers className="w-4 h-4" /> Gamified Experiences
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
                Interactive Learning Apps
              </h2>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                Gamified apps built to train mental arithmetic, vocabulary retention, and road safety.
              </p>
            </div>
            <Link
              to="/apps"
              className="inline-flex items-center gap-1.5 text-sm font-bold text-purple hover:underline group"
            >
              <span>Explore All Apps</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {apps.map((app) => (
              <div
                key={app.id}
                onClick={() => handleResourceClick(app, `/apps`)}
                className="group p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 hover:shadow-lg hover:border-purple/40 transition-all cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-purple/10 text-purple flex items-center justify-center font-bold group-hover:scale-110 transition-transform">
                      <Layers className="w-6 h-6" />
                    </div>
                    <Badge type={app.membership} size="xs" />
                  </div>
                  <h3 className="font-bold text-base text-slate-900 dark:text-white mb-2 group-hover:text-purple transition">
                    {app.name}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-3 leading-relaxed mb-4">
                    {app.description}
                  </p>
                </div>
                <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800">
                  <span>{app.category}</span>
                  <span className="text-purple font-bold">Launch App →</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Educational Tools Preview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 text-brand-600 dark:text-brand-400 text-xs font-bold uppercase tracking-wider mb-2">
              <Wrench className="w-4 h-4" /> Academic Productivity
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
              Practical Educational Tools
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              Real functional calculators, word counters, GPA calculators, and AI quiz generators.
            </p>
          </div>
          <Link
            to="/tools"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-brand-600 dark:text-brand-400 hover:text-brand-700 group"
          >
            <span>Open Tools Studio</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {tools.map((tool) => (
            <div
              key={tool.id}
              onClick={() => handleResourceClick(tool, `/tools`)}
              className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 hover:shadow-md hover:border-brand-500/40 transition cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-xl bg-brand-50 dark:bg-brand-950/60 text-brand-600 dark:text-brand-400 flex items-center justify-center">
                    <Wrench className="w-5 h-5" />
                  </div>
                  <Badge type={tool.membership} size="xs" />
                </div>
                <h4 className="font-bold text-sm text-slate-900 dark:text-white mb-1.5">
                  {tool.name}
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
                  {tool.description}
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 text-xs font-bold text-brand-600 dark:text-brand-400">
                Use Tool →
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Latest Educational Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 text-xs font-bold uppercase tracking-wider mb-2">
              <FileText className="w-4 h-4" /> Knowledge Library
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
              Latest Educational Content
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              Articles, study notes, formula sheets, and worksheets prepared by top educators.
            </p>
          </div>
          <Link
            to="/content"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-emerald-600 dark:text-emerald-400 hover:underline group"
          >
            <span>Browse Library</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {content.map((item) => (
            <div
              key={item.id}
              onClick={() => handleResourceClick(item, `/content`)}
              className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-md transition cursor-pointer flex flex-col justify-between"
            >
              <div className="relative aspect-video overflow-hidden">
                <img src={item.thumbnail} alt="" className="w-full h-full object-cover" />
                <div className="absolute top-2.5 left-2.5">
                  <Badge type={item.membership} size="xs" />
                </div>
              </div>
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-[11px] font-bold text-brand-600 dark:text-brand-400 uppercase tracking-wider">
                    {item.contentType}
                  </span>
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white mt-1 mb-2 line-clamp-1">
                    {item.title}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mb-3">
                    {item.description}
                  </p>
                </div>
                <div className="text-[11px] text-slate-400 pt-2 border-t border-slate-100 dark:border-slate-800 flex justify-between">
                  <span>By {item.author.split(',')[0]}</span>
                  <span>{item.publishDate}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="bg-gradient-to-b from-brand-50/50 via-white to-slate-50 dark:from-slate-900/60 dark:via-slate-900/20 dark:to-slate-950 py-16 sm:py-20 border-y border-slate-200/80 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400">
              Why Choose D.TEN Academy
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white mt-2 mb-4">
              Engineered for Modern, Mastery-Based Learning
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              A comprehensive educational platform designed from the ground up for measurable skill mastery.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Clock,
                title: "Learn at Your Own Pace",
                desc: "No strict deadlines. Access self-paced video and text lessons whenever and wherever you study best."
              },
              {
                icon: TrendingUp,
                title: "Track Your Progress",
                desc: "Real-time persistent progress tracking across lessons, quiz attempts, and average grade completion."
              },
              {
                icon: Zap,
                title: "Interactive Learning",
                desc: "Engage with real-time calculators, gamified math challenges, and instant-graded knowledge checks."
              },
              {
                icon: BookOpen,
                title: "Free Resources",
                desc: "Access foundational English, Mathematics, and Computer Science courses without paying a dime."
              },
              {
                icon: Sparkles,
                title: "Premium Resources",
                desc: "Advanced curricula, AI Quiz & MCQ Generators, printable formula cheat sheets, and priority support."
              },
              {
                icon: Award,
                title: "Verifiable Certificates",
                desc: "Earn digital, shareable completion certificates for every course you successfully conquer."
              },
              {
                icon: Laptop,
                title: "Accessible Anywhere",
                desc: "Fully responsive layout seamlessly optimized for desktop, tablet, and mobile devices."
              },
              {
                icon: ShieldCheck,
                title: "Firebase Security",
                desc: "Secured by enterprise Firebase Authentication and Firestore Security Rules for peace of mind."
              },
              {
                icon: Users,
                title: "Instructor Guidance",
                desc: "Curricula structured by certified educators, collegiate professors, and industry practitioners."
              }
            ].map((f, i) => (
              <div
                key={i}
                className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow transition"
              >
                <div className="w-12 h-12 rounded-xl bg-brand-50 dark:bg-brand-950/60 text-brand-600 dark:text-brand-400 flex items-center justify-center mb-4">
                  <f.icon className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-base text-slate-900 dark:text-white mb-2">
                  {f.title}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Free vs Premium Plan Comparison */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-500">
            Compare Access
          </span>
          <h2 className="text-3xl font-black text-slate-900 dark:text-white mt-2 mb-3">
            Free vs Premium Membership
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Transparent breakdown of learning capabilities across free and pro tiers.
          </p>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40">
                  <th className="py-4 px-6 font-bold text-slate-900 dark:text-white">Feature</th>
                  <th className="py-4 px-6 font-bold text-slate-900 dark:text-white text-center">Free Member</th>
                  <th className="py-4 px-6 font-bold text-amber-600 dark:text-amber-400 text-center">
                    <span className="inline-flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 fill-amber-500" /> Premium Member
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-xs sm:text-sm">
                {[
                  { feature: "Access to Foundational Courses", free: true, premium: true },
                  { feature: "Public Educational Content & Notes", free: true, premium: true },
                  { feature: "Standard Calculators (Percentage, GPA, Grade)", free: true, premium: true },
                  { feature: "Personal Dashboard & Enrollment Tracking", free: true, premium: true },
                  { feature: "Basic Quizzes & Knowledge Checks", free: true, premium: true },
                  { feature: "Advanced & Specialized Courses (AI, Algebra, Writing)", free: false, premium: true },
                  { feature: "AI Quiz & MCQ Generator Tools", free: false, premium: true },
                  { feature: "Official Verifiable Course Certificates", free: false, premium: true },
                  { feature: "Downloadable Worksheets & Formula PDFs", free: false, premium: true },
                  { feature: "Advanced Progress Analytics & Learning Streak", free: false, premium: true },
                  { feature: "Priority Support & Notifications", free: false, premium: true }
                ].map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/20">
                    <td className="py-3.5 px-6 font-medium text-slate-800 dark:text-slate-200">
                      {row.feature}
                    </td>
                    <td className="py-3.5 px-6 text-center">
                      {row.free ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-500 mx-auto" />
                      ) : (
                        <span className="text-slate-300 dark:text-slate-600 text-base font-bold">—</span>
                      )}
                    </td>
                    <td className="py-3.5 px-6 text-center bg-amber-500/5">
                      <CheckCircle2 className="w-5 h-5 text-amber-500 mx-auto" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="p-6 bg-slate-50 dark:bg-slate-800/40 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-slate-500">
              Ready to accelerate your educational journey? Start free or elevate with Pro.
            </div>
            <div className="flex items-center gap-3">
              <Link
                to="/register"
                className="px-4 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-800 dark:text-white hover:bg-slate-50"
              >
                Create Free Account
              </Link>
              <Link
                to="/pricing"
                className="px-5 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-xs font-bold text-white shadow-md shadow-amber-500/20 hover:from-amber-600 hover:to-amber-700"
              >
                Upgrade to Premium
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Premium Gate Modal */}
      <PremiumGateModal
        isOpen={gateOpen}
        onClose={() => setGateOpen(false)}
        resourceTitle={selectedResource}
      />
    </div>
  );
};
