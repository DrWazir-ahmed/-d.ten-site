import React from 'react';
import { 
  GraduationCap, 
  Target, 
  Users, 
  ShieldCheck, 
  Heart, 
  Award, 
  ArrowRight,
  Sparkles,
  UserCheck
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { PersonCard } from '../../components/about/PersonCard';

export const About = () => {
  const leadershipTeam = [
    {
      id: 'dr-wazir-ahmed',
      name: 'Dr. Wazir Ahmed',
      badge: 'Founder & CEO • D.TEN',
      title: 'Ph.D. Educational Psychology • Training Manager & Qualitative Researcher',
      location: 'Karachi, Pakistan',
      avatar: 'https://drwazir.deesu.org/dr-wazir-ahmed.jpg',
      accentGradient: 'from-sky-500 via-indigo-500 to-purple-600',
      stats: [
        { label: 'Academic Level', value: 'Ph.D. Education' },
        { label: 'Leadership', value: '12+ Yrs Exp.' },
        { label: 'Key Domain', value: 'Aviation Safety' }
      ],
      quote: 'Building better learning systems through education, educational psychology, training, research and technology.',
      bio: 'Accomplished educational psychologist, educator, and training manager with extensive experience in aviation safety training, curriculum architecture, procedural SOP development, and qualitative educational research. Former Training Manager & Evaluator at the Aviation Training Department (Karachi).',
      tags: [
        'Educational Psychology',
        'Aviation Safety Training',
        'Curriculum Architecture',
        'Qualitative Research',
        'LMS Engineering'
      ],
      expertiseList: [
        {
          title: 'Aviation Safety & Operations Training',
          desc: 'Directed pre-service programs, on-the-job training (OJT), and continuous professional development (CPD) in rigorous aviation environments.'
        },
        {
          title: 'Curriculum & Instructional Design',
          desc: 'Architected technical SOPs, standard operating manuals, lesson presentations, and objective-based assessment frameworks.'
        },
        {
          title: 'Qualitative Research Supervision',
          desc: 'Expertise in qualitative research methodologies, thematic coding, postgraduate supervision, and literature synthesis.'
        },
        {
          title: 'Training Evaluation & Defect Analysis',
          desc: 'Engineered multi-level evaluation frameworks covering program efficacy, instructor command, and defect trend analysis.'
        }
      ],
      email: 'deesonama@gmail.com',
      phone: '+92 312 3351994',
      whatsapp: 'https://wa.me/+923123351994',
      linkedin: 'https://www.linkedin.com/in/dr-wazir-ahmed-6b273b89/',
      portfolio: 'https://drwazir.deesu.org/'
    },
    {
      id: 'muhammad-hamza-fazal',
      name: 'Muhammad Hamza Fazal',
      badge: 'CTO • D.TEN',
      title: 'Chief Technology Officer • Android Developer & Full-Stack Architect',
      location: 'Islamabad / Rawalpindi, Pakistan',
      avatar: 'https://hamzafazal.deesu.org/hamza-hero-pro.jpg',
      accentGradient: 'from-emerald-500 via-teal-500 to-cyan-500',
      stats: [
        { label: 'Engineering Stack', value: 'Android & Next.js' },
        { label: 'Mobile Apps', value: 'Play Store Live' },
        { label: 'Active Since', value: '2022' }
      ],
      quote: 'Building digital products that turn ideas into real-world experiences.',
      bio: 'Software Engineering practitioner specializing in native Android application development with Java & MVVM, high-performance Next.js and React web platforms, and data-driven SEO growth marketing. Creator of published Play Store apps and digital business tools.',
      tags: [
        'Native Android (Java)',
        'Next.js & React',
        'MVVM & Room DB',
        'Firebase Realtime',
        'SEO Growth'
      ],
      expertiseList: [
        {
          title: 'Native Android App Development',
          desc: 'Custom Android apps engineered with Java, XML, MVVM architecture, Room Database, and full Google Play Store lifecycle publishing.'
        },
        {
          title: 'Full-Stack Web Development',
          desc: 'Fast, responsive, modern web platforms and LMS portals built with Next.js, React, Tailwind CSS, and cloud backends.'
        },
        {
          title: 'Firebase & Backend Integration',
          desc: 'Cloud authentication, realtime databases, push notifications, and secure asset storage for web and mobile.'
        },
        {
          title: 'Digital Marketing & Technical SEO',
          desc: 'Search engine optimization strategies, content architecture, and organic discovery systems for digital products.'
        }
      ],
      email: 'hhhdeveloper125@gmail.com',
      phone: '+92 323 5391724',
      whatsapp: 'https://wa.me/+923235391724',
      linkedin: 'https://www.linkedin.com/in/hamzafazal-developer/',
      github: 'https://github.com/hamzafazal',
      portfolio: 'https://hamzafazal.deesu.org/'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-20">
      
      {/* Hero */}
      <div className="text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-50 dark:bg-brand-950/60 text-brand-600 dark:text-brand-400 text-xs font-bold uppercase tracking-wider mb-3">
          <GraduationCap className="w-3.5 h-3.5" /> Our Mission & Vision
        </div>
        <h1 className="text-4xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
          Democratizing Interactive, Mastery-Based Education
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mt-4 text-base sm:text-lg leading-relaxed">
          D.TEN Academy was founded on a simple conviction: learning should be practical, self-paced, and seamlessly integrated with modern digital tools.
        </p>
      </div>

      {/* Leadership & Engineering Section */}
      <div className="space-y-10">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 text-xs font-bold uppercase tracking-wider">
            <UserCheck className="w-3.5 h-3.5" /> Platform Leadership & Engineering
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
            Meet the Minds Behind D.TEN
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm leading-relaxed">
            Combining deep expertise in educational psychology, aviation-grade training systems, native mobile engineering, and cloud platforms.
          </p>
        </div>

        {/* 2 Advanced Info & Contact Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {leadershipTeam.map((person) => (
            <PersonCard key={person.id} person={person} />
          ))}
        </div>
      </div>

      {/* 3 Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="w-12 h-12 rounded-2xl bg-brand-50 dark:bg-brand-950/60 text-brand-600 dark:text-brand-400 flex items-center justify-center font-bold mb-4">
            <Target className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Outcome-Driven</h3>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
            Every course and tool is engineered to produce demonstrable, real-world competence—from solving complex algebraic models to de-escalating team friction.
          </p>
        </div>

        <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="w-12 h-12 rounded-2xl bg-purple/10 text-purple flex items-center justify-center font-bold mb-4">
            <Users className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Universal Access</h3>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
            Foundational literacy, computer science, and safety courses remain permanently free to students worldwide, eliminating socioeconomic learning barriers.
          </p>
        </div>

        <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold mb-4">
            <Award className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Verified Mastery</h3>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
            Certificates are issued only upon genuine 100% curriculum completion and passing score verification on end-of-course assessments.
          </p>
        </div>
      </div>

      {/* Tech Architecture Overview */}
      <div className="p-8 sm:p-12 rounded-3xl bg-slate-900 text-white border border-slate-800 space-y-6">
        <div className="max-w-2xl">
          <span className="text-xs font-bold text-brand-400 uppercase tracking-wider">Enterprise Architecture</span>
          <h2 className="text-2xl sm:text-3xl font-black mt-2 mb-3">Modern Cloud-Native LMS Foundation</h2>
          <p className="text-sm text-slate-400 leading-relaxed">
            Built with modern React, Tailwind CSS, Firebase Authentication, and Firestore document databases. Structured for instantaneous response times, secure role-based access, and unlimited content scalability.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-slate-800 text-xs font-semibold">
          <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/60">
            <div className="text-brand-400 font-bold mb-1">Frontend</div>
            <div className="text-slate-200">React 18+, Tailwind, Vite</div>
          </div>
          <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/60">
            <div className="text-emerald-400 font-bold mb-1">Auth & DB</div>
            <div className="text-slate-200">Firebase Auth & Firestore</div>
          </div>
          <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/60">
            <div className="text-purple-400 font-bold mb-1">Hosting</div>
            <div className="text-slate-200">Firebase Hosting / Vercel</div>
          </div>
          <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/60">
            <div className="text-amber-400 font-bold mb-1">Security</div>
            <div className="text-slate-200">Firestore Security Rules</div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="text-center py-6">
        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
          Ready to experience the platform?
        </h3>
        <Link
          to="/courses"
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-sm shadow-md transition"
        >
          Explore Courses <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
};
