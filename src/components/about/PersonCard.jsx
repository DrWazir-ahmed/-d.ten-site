import React, { useState } from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  ExternalLink, 
  Copy, 
  Check, 
  Globe, 
  Award, 
  Sparkles, 
  BookOpen, 
  Smartphone, 
  Code, 
  Briefcase, 
  ShieldCheck, 
  CheckCircle2, 
  MessageSquare,
  GraduationCap
} from 'lucide-react';

export const PersonCard = ({ person }) => {
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'expertise' | 'contact'
  const [copiedField, setCopiedField] = useState(null);

  const handleCopy = (text, field) => {
    navigator.clipboard?.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  return (
    <div className="relative group rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col justify-between">
      {/* Top Accent Gradient Bar */}
      <div className={`h-2.5 w-full bg-gradient-to-r ${person.accentGradient || 'from-brand-600 via-indigo-500 to-sky-400'}`} />

      <div className="p-6 sm:p-8 space-y-6 flex-1">
        {/* Profile Header */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 text-center sm:text-left">
          <div className="relative shrink-0">
            <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl overflow-hidden ring-4 ring-slate-100 dark:ring-slate-800 shadow-lg relative bg-slate-100 dark:bg-slate-800">
              <img 
                src={person.avatar} 
                alt={person.name} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(person.name)}&background=0284c7&color=fff&size=256`;
                }}
              />
            </div>
            {/* Active Status Beacon */}
            <span 
              className="absolute -bottom-1 -right-1 flex items-center justify-center p-1 rounded-full bg-white dark:bg-slate-900 shadow-md ring-2 ring-emerald-500"
              title="Available for Consultations & Collaborations"
            >
              <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
            </span>
          </div>

          <div className="flex-1 space-y-2">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase bg-brand-50 dark:bg-brand-950/60 text-brand-600 dark:text-brand-400 border border-brand-200 dark:border-brand-800">
                {person.badge}
              </span>
              <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800">
                <CheckCircle2 className="w-3 h-3" /> Verified Leader
              </span>
            </div>

            <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
              {person.name}
            </h2>

            <p className="text-xs sm:text-sm font-bold text-brand-600 dark:text-brand-400">
              {person.title}
            </p>

            <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center justify-center sm:justify-start gap-1 font-medium">
              <MapPin className="w-3.5 h-3.5 shrink-0 text-slate-400" />
              {person.location}
            </p>
          </div>
        </div>

        {/* Highlight Stats Pill Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-2">
          {person.stats.map((stat, idx) => (
            <div 
              key={idx} 
              className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-800 text-center"
            >
              <div className="text-[11px] font-black text-slate-900 dark:text-white truncate">
                {stat.value}
              </div>
              <div className="text-[10px] font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider truncate">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Interactive Tab Switcher */}
        <div className="flex border-b border-slate-200 dark:border-slate-800 text-xs font-bold">
          <button
            onClick={() => setActiveTab('overview')}
            className={`flex-1 pb-2.5 text-center transition-colors relative ${
              activeTab === 'overview'
                ? 'text-brand-600 dark:text-brand-400'
                : 'text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200'
            }`}
          >
            Overview
            {activeTab === 'overview' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-600 dark:bg-brand-400 rounded-full" />
            )}
          </button>

          <button
            onClick={() => setActiveTab('expertise')}
            className={`flex-1 pb-2.5 text-center transition-colors relative ${
              activeTab === 'expertise'
                ? 'text-brand-600 dark:text-brand-400'
                : 'text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200'
            }`}
          >
            Expertise & Focus
            {activeTab === 'expertise' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-600 dark:bg-brand-400 rounded-full" />
            )}
          </button>

          <button
            onClick={() => setActiveTab('contact')}
            className={`flex-1 pb-2.5 text-center transition-colors relative ${
              activeTab === 'contact'
                ? 'text-brand-600 dark:text-brand-400'
                : 'text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200'
            }`}
          >
            Contact & Connect
            {activeTab === 'contact' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-600 dark:bg-brand-400 rounded-full" />
            )}
          </button>
        </div>

        {/* Tab Content Display */}
        <div className="min-h-[160px]">
          {activeTab === 'overview' && (
            <div className="space-y-3.5 text-xs sm:text-sm animate-fadeIn">
              <blockquote className="p-3.5 rounded-2xl bg-brand-50/60 dark:bg-brand-950/30 border border-brand-200/60 dark:border-brand-900/40 text-brand-900 dark:text-brand-200 italic font-medium leading-relaxed">
                “{person.quote}”
              </blockquote>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                {person.bio}
              </p>
              <div className="flex flex-wrap items-center gap-1.5 pt-1">
                {person.tags?.map((tag, i) => (
                  <span 
                    key={i} 
                    className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-[11px] font-semibold text-slate-700 dark:text-slate-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'expertise' && (
            <div className="space-y-3 animate-fadeIn">
              <div className="space-y-2.5">
                {person.expertiseList.map((item, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-xs text-slate-700 dark:text-slate-300">
                    <span className="p-1 rounded-md bg-brand-100 dark:bg-brand-950 text-brand-600 dark:text-brand-400 shrink-0 mt-0.5">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    </span>
                    <div>
                      <strong className="text-slate-900 dark:text-white font-bold block">
                        {item.title}
                      </strong>
                      <span className="text-slate-500 dark:text-slate-400 text-[11px] leading-relaxed">
                        {item.desc}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'contact' && (
            <div className="space-y-3 animate-fadeIn text-xs">
              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 space-y-2.5">
                {/* Email row */}
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300 truncate">
                    <Mail className="w-4 h-4 text-brand-600 dark:text-brand-400 shrink-0" />
                    <span className="truncate font-semibold">{person.email}</span>
                  </div>
                  <button
                    onClick={() => handleCopy(person.email, 'email')}
                    className="p-1.5 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400 transition shrink-0"
                    title="Copy Email"
                  >
                    {copiedField === 'email' ? (
                      <Check className="w-3.5 h-3.5 text-emerald-500" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>

                {/* Phone row */}
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300 truncate">
                    <Phone className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                    <span className="truncate font-semibold">{person.phone}</span>
                  </div>
                  <button
                    onClick={() => handleCopy(person.phone, 'phone')}
                    className="p-1.5 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400 transition shrink-0"
                    title="Copy Phone"
                  >
                    {copiedField === 'phone' ? (
                      <Check className="w-3.5 h-3.5 text-emerald-500" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>

                {/* WhatsApp Link */}
                {person.whatsapp && (
                  <div className="pt-1">
                    <a
                      href={person.whatsapp}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold transition shadow-sm"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      Chat on WhatsApp
                    </a>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer Actions & External Social Links */}
      <div className="p-4 sm:p-6 bg-slate-50/80 dark:bg-slate-800/40 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3">
        {/* Quick External Links */}
        <div className="flex items-center gap-2">
          {person.portfolio && (
            <a
              href={person.portfolio}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:text-brand-600 dark:hover:text-brand-400 hover:border-brand-400 transition text-xs font-bold shadow-xs"
              title="Official Portfolio Website"
            >
              <Globe className="w-3.5 h-3.5 text-brand-600 dark:text-brand-400" />
              <span>Portfolio</span>
              <ExternalLink className="w-3 h-3 text-slate-400" />
            </a>
          )}

          {person.linkedin && (
            <a
              href={person.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-blue-600 hover:border-blue-500 transition text-xs shadow-xs"
              title="LinkedIn Profile"
              aria-label="LinkedIn"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
              </svg>
            </a>
          )}

          {person.github && (
            <a
              href={person.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:border-slate-500 transition text-xs shadow-xs"
              title="GitHub Profile"
              aria-label="GitHub"
            >
              <svg className="w-4 h-4 fill-none stroke-current" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/>
                <path d="M9 18c-4.51 2-5-2-7-2"/>
              </svg>
            </a>
          )}
        </div>

        {/* Primary Action Button */}
        <a
          href={`mailto:${person.email}`}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-900 hover:bg-brand-600 dark:bg-white dark:hover:bg-brand-500 text-white dark:text-slate-900 dark:hover:text-white font-bold text-xs transition shadow-sm"
        >
          <Mail className="w-3.5 h-3.5" />
          <span>Send Message</span>
        </a>
      </div>
    </div>
  );
};
