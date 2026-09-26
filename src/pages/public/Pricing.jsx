import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Sparkles, Check, ArrowRight, ShieldCheck, HelpCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { getPaymentConfig } from '../../services/firebaseService';
import { PaymentCheckoutModal } from '../../components/common/PaymentCheckoutModal';

export const Pricing = () => {
  const navigate = useNavigate();
  const { currentUser, isGuest, isPremium } = useAuth();
  const [billingCycle, setBillingCycle] = useState('monthly'); // 'monthly' | 'annual'
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [paymentConfig, setPaymentConfig] = useState(null);

  useEffect(() => {
    getPaymentConfig().then(cfg => setPaymentConfig(cfg));
  }, []);

  const handleUpgrade = () => {
    if (isGuest) {
      navigate('/register?redirect=pricing');
      return;
    }
    setCheckoutOpen(true);
  };

  const monthlyPKR = paymentConfig?.monthlyPricePKR || 2500;
  const monthlyUSD = paymentConfig?.monthlyPriceUSD || 14;
  const annualPKR = paymentConfig?.annualPricePKR || 18000;
  const annualUSD = paymentConfig?.annualPriceUSD || 108;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      
      {/* Heading */}
      <div className="text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 text-xs font-bold uppercase tracking-wider mb-3">
          <Sparkles className="w-3.5 h-3.5 fill-amber-500" /> Transparent Learning Tiers
        </div>
        <h1 className="text-4xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
          Invest in Your Academic &amp; Professional Growth
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mt-4 text-base">
          Start 100% free with core curricula, or unlock the complete learning suite with advanced modules, AI generators, and verified certificates.
        </p>

        {/* Billing cycle toggle */}
        <div className="mt-8 inline-flex items-center p-1.5 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold">
          <button
            onClick={() => setBillingCycle('monthly')}
            className={`px-4 py-2 rounded-xl transition ${
              billingCycle === 'monthly'
                ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm'
                : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Monthly Billing
          </button>
          <button
            onClick={() => setBillingCycle('annual')}
            className={`px-4 py-2 rounded-xl transition flex items-center gap-1.5 ${
              billingCycle === 'annual'
                ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm'
                : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <span>Annual Billing</span>
            <span className="px-1.5 py-0.5 rounded-md bg-emerald-500/10 text-emerald-600 text-[10px]">Save 40%</span>
          </button>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto items-stretch">
        
        {/* Free Plan Card */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Basic Tier</span>
              <span className="px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-xs font-bold">
                Lifetime Free
              </span>
            </div>

            <h3 className="text-2xl font-black text-slate-900 dark:text-white">Free Member</h3>
            <p className="text-xs text-slate-500 mt-2 mb-6">
              Ideal for independent learners wanting essential foundational skills without commitments.
            </p>

            <div className="mb-6">
              <span className="text-4xl font-black text-slate-900 dark:text-white">Rs 0</span>
              <span className="text-xs text-slate-400 ml-1">($0 forever)</span>
            </div>

            <div className="space-y-3 pt-6 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                <span>Access to foundational grammar &amp; tenses courses</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                <span>Standard calculators (GPA, Grade, Percentage)</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                <span>Free learning apps &amp; interactive practice exercises</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                <span>Personalized student progress dashboard</span>
              </div>
            </div>
          </div>

          <div className="mt-8">
            {isGuest ? (
              <Link
                to="/register"
                className="w-full py-3 rounded-xl border border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-800 dark:text-white font-bold text-xs flex items-center justify-center transition"
              >
                Join Free Today
              </Link>
            ) : (
              <div className="w-full py-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500 text-center font-bold text-xs">
                {isPremium ? 'Included with Your Account' : 'Current Active Plan'}
              </div>
            )}
          </div>
        </div>

        {/* Premium Plan Card */}
        <div className="relative bg-white dark:bg-slate-900 rounded-3xl border-2 border-amber-500 shadow-2xl p-8 flex flex-col justify-between overflow-hidden">
          {/* Top highlight ribbon */}
          <div className="absolute top-0 right-0 px-4 py-1 rounded-bl-xl bg-gradient-to-r from-amber-500 to-amber-600 text-white font-bold text-[10px] uppercase tracking-wider">
            Most Popular
          </div>

          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">Pro Tier</span>
              <span className="px-3 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 text-xs font-bold border border-amber-500/20">
                Full Access
              </span>
            </div>

            <h3 className="text-2xl font-black text-slate-900 dark:text-white">Premium Member</h3>
            <p className="text-xs text-slate-500 mt-2 mb-6">
              Complete mastery: advanced technical courses, AI study tools, and certified credentials.
            </p>

            <div className="mb-6">
              <div className="flex items-baseline gap-2">
                <span className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white">
                  Rs {billingCycle === 'monthly' ? monthlyPKR.toLocaleString() : (annualPKR / 12).toLocaleString()}
                </span>
                <span className="text-xs text-slate-400">/ month</span>
              </div>
              <div className="text-[11px] text-slate-500 mt-1">
                {billingCycle === 'annual' ? (
                  <span className="text-emerald-600 font-semibold">
                    Billed annually: Rs {annualPKR.toLocaleString()} (${annualUSD}/yr)
                  </span>
                ) : (
                  <span>Approx ${monthlyUSD} USD / month</span>
                )}
              </div>
            </div>

            <div className="space-y-3 pt-6 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300">
              <div className="flex items-center gap-2 font-semibold">
                <Check className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                <span>Everything in Free, plus:</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                <span>All Advanced Courses (AI, Voice, Tenses, Writing)</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                <span>AI Quiz &amp; MCQ Question Generator Studio</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                <span>Official Digital Completion Certificates</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                <span>Downloadable formula reference sheets &amp; PDFs</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                <span>Priority notifications &amp; learning streak analytics</span>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <button
              onClick={handleUpgrade}
              disabled={isPremium}
              className={`w-full py-3.5 rounded-xl font-bold text-xs sm:text-sm shadow-lg transition flex items-center justify-center gap-2 ${
                isPremium
                  ? 'bg-emerald-600 text-white cursor-default'
                  : 'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white shadow-amber-500/25'
              }`}
            >
              {isPremium ? (
                <span>You Are Already Premium</span>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 fill-white" />
                  <span>Buy Premium Membership</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </>
              )}
            </button>
          </div>
        </div>

      </div>

      {/* Security badge note */}
      <div className="text-center text-xs text-slate-400 flex items-center justify-center gap-1.5 pt-4">
        <ShieldCheck className="w-4 h-4 text-emerald-500" />
        <span>Direct Bank Transfer • Raast • JazzCash • EasyPaisa • Card • Instant Activation</span>
      </div>

      {/* Payment Checkout Modal */}
      <PaymentCheckoutModal
        isOpen={checkoutOpen}
        onClose={() => setCheckoutOpen(false)}
        defaultPlan={billingCycle}
      />
    </div>
  );
};
