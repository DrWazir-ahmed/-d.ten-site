import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GraduationCap, Mail, Lock, User, ArrowRight, AlertCircle, CheckCircle2, Sparkles, Clock } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const Register = () => {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [accountType, setAccountType] = useState('student'); // 'student' | 'course_creator'
  const [agreeTerms, setAgreeTerms] = useState(false);
  
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (password !== confirmPassword) {
      setErrorMsg("Passwords do not match. Please verify.");
      return;
    }

    if (password.length < 6) {
      setErrorMsg("Password must be at least 6 characters long.");
      return;
    }

    if (!agreeTerms) {
      setErrorMsg("Please agree to the Terms of Service to continue.");
      return;
    }

    setLoading(true);

    try {
      // 1. Create Firebase Auth account
      // 2. Create Firestore user document (role='student', requestedRole, creatorApprovalStatus)
      // 3. If course creator, user is a free member until approved by Admin/Super Admin
      await register(name, email, password, accountType);
      if (accountType === 'course_creator') {
        navigate('/dashboard/free?creator_pending=1');
      } else {
        navigate('/dashboard/free');
      }
    } catch (err) {
      setErrorMsg(err.message || 'Registration failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        
        {/* Header */}
        <div className="text-center">
          <Link to="/" className="inline-flex items-center gap-2 mb-4 group">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-brand-600 to-purple flex items-center justify-center text-white shadow-md shadow-brand-500/20 group-hover:scale-105 transition-transform">
              <GraduationCap className="w-7 h-7" />
            </div>
          </Link>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            Create Your Free Account
          </h2>
          <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
            Start tracking course progress, interactive calculators, and test results.
          </p>
        </div>

        {/* Error Alert */}
        {errorMsg && (
          <div className="p-3.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/50 text-rose-700 dark:text-rose-300 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Form */}
        <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Full Name */}
            <div>
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1.5">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ahmed Khan"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ahmed@example.com"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1.5">
                Password (min 6 characters)
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1.5">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
              </div>
            </div>

            {/* Account Role / Type Selection */}
            <div>
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1.5">
                Registering As
              </label>
              <div className="grid grid-cols-2 gap-2.5">
                <button
                  type="button"
                  onClick={() => setAccountType('student')}
                  className={`p-3 rounded-2xl border text-left transition flex flex-col justify-between ${
                    accountType === 'student'
                      ? 'border-brand-600 bg-brand-50/70 dark:bg-brand-950/40 ring-2 ring-brand-500/20'
                      : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <GraduationCap className={`w-4 h-4 ${accountType === 'student' ? 'text-brand-600 dark:text-brand-400' : 'text-slate-400'}`} />
                    {accountType === 'student' && <CheckCircle2 className="w-3.5 h-3.5 text-brand-600 dark:text-brand-400" />}
                  </div>
                  <div>
                    <p className="font-bold text-xs text-slate-900 dark:text-white">Student / Learner</p>
                    <p className="text-[10px] text-slate-400">Free access to courses, tools & tests</p>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setAccountType('course_creator')}
                  className={`p-3 rounded-2xl border text-left transition flex flex-col justify-between ${
                    accountType === 'course_creator'
                      ? 'border-indigo-600 bg-indigo-50/70 dark:bg-indigo-950/40 ring-2 ring-indigo-500/20'
                      : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <Sparkles className={`w-4 h-4 ${accountType === 'course_creator' ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-400'}`} />
                    {accountType === 'course_creator' && <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />}
                  </div>
                  <div>
                    <p className="font-bold text-xs text-slate-900 dark:text-white">Course Creator</p>
                    <p className="text-[10px] text-slate-400">Author courses (Admin approval req.)</p>
                  </div>
                </button>
              </div>

              {/* Course creator pending approval explanation */}
              {accountType === 'course_creator' && (
                <div className="mt-2.5 p-3 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/40 text-[11px] text-amber-800 dark:text-amber-300 space-y-1 animate-fadeIn">
                  <p className="font-bold flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                    <span>Admin Approval Notice</span>
                  </p>
                  <p className="leading-relaxed">
                    Course Creator accounts require verification and approval by an Admin or Super Admin before course & content publishing tools are unlocked.
                  </p>
                  <p className="leading-relaxed font-semibold">
                    Until approved, you will have immediate full access as a Free Member.
                  </p>
                </div>
              )}
            </div>

            {/* Terms checkbox */}
            <div className="pt-1">
              <label className="flex items-start gap-2.5 cursor-pointer text-xs text-slate-600 dark:text-slate-400">
                <input
                  type="checkbox"
                  required
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  className="rounded border-slate-300 text-brand-600 focus:ring-brand-500 mt-0.5"
                />
                <span>
                  I agree to the <Link to="/terms" className="text-brand-600 dark:text-brand-400 font-semibold underline">Terms of Service</Link> and <Link to="/privacy" className="text-brand-600 dark:text-brand-400 font-semibold underline">Privacy Policy</Link>.
                </span>
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs shadow-md shadow-brand-500/25 transition flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? 'Creating Account & Firestore Profile...' : 'Complete Registration'}
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-800 text-center text-xs text-slate-500">
            Already registered?{' '}
            <Link to="/login" className="font-bold text-brand-600 dark:text-brand-400 hover:underline">
              Sign in to account
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};
