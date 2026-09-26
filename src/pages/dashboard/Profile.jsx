import React, { useState } from 'react';
import { 
  User, 
  Mail, 
  Shield, 
  Sparkles, 
  CheckCircle2, 
  Lock, 
  Save, 
  CreditCard,
  Crown,
  GraduationCap,
  ShieldCheck,
  ArrowRight
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { Badge } from '../../components/common/Badge';
import { PaymentCheckoutModal } from '../../components/common/PaymentCheckoutModal';

export const Profile = () => {
  const { userProfile, updateUserData, isPremium, isSuperAdmin, isAdmin } = useAuth();
  
  const [name, setName] = useState(userProfile?.name || 'Student');
  const [email] = useState(userProfile?.email || '');
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    // Only safe profile attributes can be edited by the user
    await updateUserData({
      name: name.trim()
    });
    setLoading(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const roleLabel = isSuperAdmin 
    ? 'Super Administrator' 
    : isAdmin 
    ? 'Platform Administrator' 
    : 'Student (Learner)';

  const roleIcon = isSuperAdmin ? Crown : isAdmin ? ShieldCheck : GraduationCap;
  const RoleIconComponent = roleIcon;

  return (
    <DashboardLayout 
      title="User Profile & Account Credentials" 
      subtitle="Manage your personal information, active subscription status, and credentials."
    >
      <div className="max-w-3xl space-y-8">
        
        {saved && (
          <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-500/30 text-emerald-800 dark:text-emerald-200 text-xs font-bold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            <span>Profile name updated successfully!</span>
          </div>
        )}

        {/* Profile Card Header */}
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-5">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-brand-600 to-purple text-white flex items-center justify-center font-bold text-2xl shadow-md">
            {(name.charAt(0) || 'U').toUpperCase()}
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">{name}</h2>
              <Badge type={userProfile?.role || 'student'} size="xs" />
              <Badge type={userProfile?.membership || 'free'} size="xs" />
            </div>
            <p className="text-xs text-slate-500 font-mono">{email}</p>
            <p className="text-[11px] text-slate-400 mt-1">
              Account Created: {userProfile?.createdAt ? new Date(userProfile.createdAt).toLocaleDateString() : 'Active Member'}
            </p>
          </div>
        </div>

        {/* Membership & Authorization Status Card (Secure & Read-Only) */}
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <h3 className="font-black text-sm text-slate-900 dark:text-white flex items-center gap-2">
            <Shield className="w-4 h-4 text-brand-600" /> Account Authorization &amp; Membership
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* System Role */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80">
              <span className="text-[11px] text-slate-400 font-semibold block mb-1">Assigned System Role</span>
              <div className="flex items-center gap-2 mb-1">
                <RoleIconComponent className="w-4 h-4 text-brand-600" />
                <span className="font-bold text-sm text-slate-900 dark:text-white">{roleLabel}</span>
              </div>
              <p className="text-[10px] text-slate-500 mt-1 flex items-center gap-1">
                <Lock className="w-3 h-3 text-slate-400" /> Roles are managed exclusively by the Super Admin.
              </p>
            </div>

            {/* Membership Tier */}
            <div className={`p-4 rounded-2xl border ${
              isPremium 
                ? 'bg-amber-500/5 dark:bg-amber-950/20 border-amber-500/30' 
                : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700/80'
            }`}>
              <span className="text-[11px] text-slate-400 font-semibold block mb-1">Current Membership Plan</span>
              <div className="flex items-center justify-between mb-1">
                <span className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-1.5">
                  {isPremium ? (
                    <>
                      <Sparkles className="w-4 h-4 text-amber-500 fill-amber-500" />
                      <span className="text-amber-600 dark:text-amber-400">Premium Pro Access</span>
                    </>
                  ) : (
                    <>
                      <GraduationCap className="w-4 h-4 text-slate-500" />
                      <span>Free Member</span>
                    </>
                  )}
                </span>
                {isPremium && (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-600 uppercase">
                    Active
                  </span>
                )}
              </div>

              {isPremium ? (
                <p className="text-[10px] text-slate-500 mt-1">
                  Full unrestricted access to all 12 tenses, AI tools, and certificates.
                </p>
              ) : (
                <div className="mt-3 pt-3 border-t border-slate-200/60 dark:border-slate-700/60">
                  <button
                    type="button"
                    onClick={() => setCheckoutOpen(true)}
                    className="w-full py-2 px-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold text-xs shadow-md shadow-amber-500/20 transition flex items-center justify-center gap-1.5"
                  >
                    <Sparkles className="w-3.5 h-3.5 fill-white" />
                    <span>Upgrade to Premium</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Edit Form */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <h3 className="font-bold text-sm text-slate-900 dark:text-white mb-4">
            Edit Personal Details
          </h3>

          <form onSubmit={handleSave} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs sm:text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-brand-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1.5">
                  Email Address (Primary Firebase UID)
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="email"
                    disabled
                    value={email}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-800/50 text-xs sm:text-sm text-slate-500 cursor-not-allowed"
                  />
                </div>
                <p className="text-[10px] text-slate-400 mt-1">
                  Email is linked to your Firebase Authentication record.
                </p>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs shadow-md transition flex items-center gap-2 disabled:opacity-50"
            >
              <Save className="w-4 h-4" /> {loading ? 'Saving Changes...' : 'Save Profile Changes'}
            </button>
          </form>
        </div>

      </div>

      {/* Payment Checkout Modal */}
      <PaymentCheckoutModal
        isOpen={checkoutOpen}
        onClose={() => setCheckoutOpen(false)}
      />
    </DashboardLayout>
  );
};
