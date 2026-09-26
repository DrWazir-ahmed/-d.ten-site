import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, X, Check, Lock } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { PaymentCheckoutModal } from './PaymentCheckoutModal';

export const PremiumGateModal = ({ isOpen, onClose, resourceTitle = "this premium resource" }) => {
  const navigate = useNavigate();
  const { currentUser, isGuest } = useAuth();
  const [checkoutOpen, setCheckoutOpen] = useState(false);

  if (!isOpen) return null;

  const handleUpgradeClick = () => {
    if (isGuest) {
      onClose();
      navigate('/register?redirect=pricing');
    } else {
      setCheckoutOpen(true);
    }
  };

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
        <div 
          className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl border border-amber-500/30 shadow-2xl p-6 sm:p-8 text-center overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Glow decoration */}
          <div className="absolute -top-24 -left-24 w-48 h-48 bg-amber-500/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-purple/20 rounded-full blur-3xl pointer-events-none" />

          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 dark:hover:text-white rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-500 flex items-center justify-center shadow-inner">
            <Sparkles className="w-8 h-8 fill-amber-500" />
          </div>

          <span className="inline-block px-3 py-1 text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 bg-amber-500/10 rounded-full mb-3 border border-amber-500/20">
            Exclusive Premium Access
          </span>

          <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-2">
            Unlock Full Curriculum &amp; Tools
          </h2>

          <p className="text-slate-600 dark:text-slate-400 text-sm mb-6 leading-relaxed">
            {resourceTitle ? `"${resourceTitle}"` : "This resource"} is reserved for <strong className="text-slate-900 dark:text-white">Premium Members</strong>. Upgrade to unlock all advanced courses, AI tools, verified certificates, and downloadable lesson notes.
          </p>

          <div className="bg-slate-50 dark:bg-slate-800/60 rounded-2xl p-4 mb-6 text-left border border-slate-200/80 dark:border-slate-800 space-y-2.5">
            <div className="flex items-center gap-2 text-xs font-medium text-slate-700 dark:text-slate-300">
              <Check className="w-4 h-4 text-emerald-500 flex-shrink-0" />
              <span>Unrestricted access to all 12 tenses &amp; advanced grammar modules</span>
            </div>
            <div className="flex items-center gap-2 text-xs font-medium text-slate-700 dark:text-slate-300">
              <Check className="w-4 h-4 text-emerald-500 flex-shrink-0" />
              <span>AI Quiz &amp; MCQ Generator studios</span>
            </div>
            <div className="flex items-center gap-2 text-xs font-medium text-slate-700 dark:text-slate-300">
              <Check className="w-4 h-4 text-emerald-500 flex-shrink-0" />
              <span>Official digital completion certificates issued by Dr Wazir Ahmed</span>
            </div>
            <div className="flex items-center gap-2 text-xs font-medium text-slate-700 dark:text-slate-300">
              <Check className="w-4 h-4 text-emerald-500 flex-shrink-0" />
              <span>Downloadable formula sheets &amp; practice exercise worksheets</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleUpgradeClick}
              className="flex-1 py-3 px-5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold text-sm shadow-lg shadow-amber-500/25 transition-all transform active:scale-95"
            >
              Buy Premium Pass
            </button>
            <button
              onClick={onClose}
              className="flex-1 py-3 px-5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-semibold text-sm transition"
            >
              Continue Free
            </button>
          </div>
        </div>
      </div>

      {/* Embedded Checkout */}
      <PaymentCheckoutModal
        isOpen={checkoutOpen}
        onClose={() => {
          setCheckoutOpen(false);
          onClose();
        }}
      />
    </>
  );
};
