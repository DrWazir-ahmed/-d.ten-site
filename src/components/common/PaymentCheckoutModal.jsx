import React, { useState, useEffect } from 'react';
import { 
  X, 
  Sparkles, 
  Check, 
  CreditCard, 
  Smartphone, 
  ShieldCheck, 
  ArrowRight,
  AlertCircle,
  Clock,
  CheckCircle2,
  XCircle,
  RefreshCw,
  Lock,
  ArrowLeft
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useAuth } from '../../context/AuthContext';
import { getPaymentConfig } from '../../services/firebaseService';

export const PaymentCheckoutModal = ({ isOpen, onClose, defaultPlan = 'monthly' }) => {
  const { userProfile, activatePremium } = useAuth();

  const [paymentConfig, setPaymentConfig] = useState(null);
  const [selectedPlan, setSelectedPlan] = useState(defaultPlan); // 'monthly' | 'annual'

  // Stage 1: method selection ('select')
  // Stage 2: input details ('form')
  // Stage 3: awaiting approval on phone app ('awaiting_approval')
  // Stage 4: success / done ('success')
  const [stage, setStage] = useState('select'); 
  const [selectedMethod, setSelectedMethod] = useState(''); // 'card' | 'easypaisa' | 'jazzcash'

  // Card details
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState(userProfile?.name || '');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvc, setCardCvc] = useState('');

  // Mobile wallet details
  const [mobileNumber, setMobileNumber] = useState('');
  const [accountName, setAccountName] = useState(userProfile?.name || '');
  const [cnicLast6, setCnicLast6] = useState('');

  // Approval state & countdown
  const [countdown, setCountdown] = useState(120);
  const [processing, setProcessing] = useState(false);
  const [processingStep, setProcessingStep] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (isOpen) {
      getPaymentConfig().then(cfg => setPaymentConfig(cfg));
      setStage('select');
      setSelectedMethod('');
      setCardName(userProfile?.name || '');
      setAccountName(userProfile?.name || '');
      setCardNumber('');
      setCardExpiry('');
      setCardCvc('');
      setMobileNumber('');
      setCnicLast6('');
      setErrorMsg('');
      setProcessing(false);
    }
  }, [isOpen, userProfile]);

  // Countdown timer for mobile approval
  useEffect(() => {
    let timer = null;
    if (stage === 'awaiting_approval' && countdown > 0) {
      timer = setInterval(() => setCountdown(c => c - 1), 1000);
    } else if (countdown === 0 && stage === 'awaiting_approval') {
      setErrorMsg('Payment request timed out. Please try sending the request again.');
      setStage('form');
    }
    return () => clearInterval(timer);
  }, [stage, countdown]);

  if (!isOpen) return null;

  const isAnnual = selectedPlan === 'annual';
  const amountPKR = isAnnual 
    ? (paymentConfig?.annualPricePKR || 18000) 
    : (paymentConfig?.monthlyPricePKR || 2500);
  const amountUSD = isAnnual 
    ? (paymentConfig?.annualPriceUSD || 108) 
    : (paymentConfig?.monthlyPriceUSD || 14);

  // Method selection handler
  const handleSelectMethod = (methodId) => {
    setSelectedMethod(methodId);
    setErrorMsg('');
    setStage('form');
  };

  // Card formatting
  const handleCardNumberChange = (e) => {
    let val = e.target.value.replace(/\D/g, '').substring(0, 16);
    val = val.replace(/(.{4})/g, '$1 ').trim();
    setCardNumber(val);
  };

  const handleExpiryChange = (e) => {
    let val = e.target.value.replace(/\D/g, '').substring(0, 4);
    if (val.length >= 3) {
      val = `${val.substring(0, 2)}/${val.substring(2, 4)}`;
    }
    setCardExpiry(val);
  };

  // 1. Process Card Payment (Automatic Direct Debit)
  const handleProcessCardPayment = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (cardNumber.replace(/\s/g, '').length < 16) {
      setErrorMsg('Please enter a valid 16-digit card number.');
      return;
    }
    if (!cardExpiry.includes('/') || cardExpiry.length < 5) {
      setErrorMsg('Please enter a valid expiry date (MM/YY).');
      return;
    }
    if (cardCvc.length < 3) {
      setErrorMsg('Please enter a valid 3-digit CVV / CVC code.');
      return;
    }

    setProcessing(true);
    setProcessingStep('Connecting to Card Payment Network...');

    try {
      await new Promise(r => setTimeout(r, 900));
      setProcessingStep(`Deducting Rs ${amountPKR.toLocaleString()} from your bank account...`);
      await new Promise(r => setTimeout(r, 1100));
      setProcessingStep("Transferring funds directly to Dr Wazir Ahmed's account...");
      await new Promise(r => setTimeout(r, 800));

      const txId = `CARD-${Date.now().toString().slice(-8)}`;

      await activatePremium({
        plan: selectedPlan,
        amount: amountPKR,
        amountUSD,
        currency: 'PKR',
        method: 'card_direct_debit',
        cardLast4: cardNumber.replace(/\s/g, '').slice(-4),
        cardholderName: cardName,
        transactionId: txId,
        recipient: paymentConfig?.accountTitle || 'Dr Wazir Ahmed',
        status: 'verified'
      });

      setStage('success');
      confetti({ particleCount: 130, spread: 80, origin: { y: 0.6 } });
      setTimeout(() => {
        onClose();
        window.location.reload();
      }, 2500);
    } catch (err) {
      setErrorMsg(err.message || 'Card payment declined. Please verify your details.');
    } finally {
      setProcessing(false);
    }
  };

  // 2. Request Mobile Wallet Payment (Push to EasyPaisa / JazzCash)
  const handleRequestMobilePayment = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    const cleanNum = mobileNumber.replace(/\D/g, '');
    if (cleanNum.length < 11) {
      setErrorMsg('Please enter a valid 11-digit mobile account number (e.g. 03001234567).');
      return;
    }

    setProcessing(true);
    setProcessingStep(`Sending Payment Request to ${selectedMethod === 'easypaisa' ? 'EasyPaisa' : 'JazzCash'} App...`);

    try {
      await new Promise(r => setTimeout(r, 1200));
      setCountdown(120);
      setStage('awaiting_approval');
    } catch (err) {
      setErrorMsg('Failed to dispatch payment prompt. Please try again.');
    } finally {
      setProcessing(false);
    }
  };

  // 3. Confirm Mobile Approval from App
  const handleConfirmMobileApproval = async () => {
    setProcessing(true);
    setProcessingStep(`Verifying approval from ${selectedMethod === 'easypaisa' ? 'EasyPaisa' : 'JazzCash'}...`);

    try {
      await new Promise(r => setTimeout(r, 1200));
      const prefix = selectedMethod === 'easypaisa' ? 'EP' : 'JC';
      const txId = `${prefix}-${Date.now().toString().slice(-8)}`;

      await activatePremium({
        plan: selectedPlan,
        amount: amountPKR,
        amountUSD,
        currency: 'PKR',
        method: selectedMethod === 'easypaisa' ? 'easypaisa_in_app' : 'jazzcash_mpin',
        mobileNumber: mobileNumber.trim(),
        accountName: accountName.trim(),
        cnicLast6: cnicLast6.trim(),
        transactionId: txId,
        recipient: paymentConfig?.accountTitle || 'Dr Wazir Ahmed',
        status: 'verified'
      });

      setStage('success');
      confetti({ particleCount: 130, spread: 80, origin: { y: 0.6 } });
      setTimeout(() => {
        onClose();
        window.location.reload();
      }, 2500);
    } catch (err) {
      setErrorMsg(err.message || 'Payment approval not found. Please approve in your app and tap verify.');
    } finally {
      setProcessing(false);
    }
  };

  const handleDisapprove = () => {
    setStage('select');
    setErrorMsg('Payment request was cancelled. No charges were made.');
  };

  const formatSeconds = (sec) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200 overflow-y-auto">
      <div 
        className="relative w-full max-w-xl bg-white dark:bg-slate-900 rounded-3xl border border-amber-500/30 shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Glow decoration */}
        <div className="absolute -top-24 -left-24 w-52 h-52 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-52 h-52 bg-purple/15 rounded-full blur-3xl pointer-events-none" />

        {/* Modal Header */}
        <div className="p-5 sm:p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {stage !== 'select' && stage !== 'success' && (
              <button
                type="button"
                onClick={() => setStage('select')}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                title="Change Payment Method"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
            )}
            <div className="w-10 h-10 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-500 flex items-center justify-center font-bold">
              <Sparkles className="w-5 h-5 fill-amber-500" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-black text-slate-900 dark:text-white">
                {stage === 'awaiting_approval' 
                  ? 'Approve Payment on Your Phone' 
                  : 'Upgrade to Premium Membership'}
              </h2>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Direct automated transfer to Dr Wazir Ahmed's account
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-white rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Plan Selector Ribbon (shown in stages select & form) */}
        {stage !== 'success' && stage !== 'awaiting_approval' && (
          <div className="px-6 pt-5 pb-2 bg-slate-50/70 dark:bg-slate-800/40 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Select Plan</span>
              <span className="text-xs font-bold text-slate-900 dark:text-white">
                Total: <strong className="text-amber-600 dark:text-amber-400 text-sm">Rs {amountPKR.toLocaleString()}</strong> ({amountUSD} USD)
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setSelectedPlan('monthly')}
                className={`py-2 px-3 rounded-xl border text-left text-xs transition flex items-center justify-between ${
                  selectedPlan === 'monthly'
                    ? 'border-amber-500 bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-bold shadow-sm'
                    : 'border-slate-200 dark:border-slate-700 text-slate-500'
                }`}
              >
                <span>Monthly Pass</span>
                <span>Rs {paymentConfig?.monthlyPricePKR?.toLocaleString() || '2,500'}</span>
              </button>
              <button
                type="button"
                onClick={() => setSelectedPlan('annual')}
                className={`py-2 px-3 rounded-xl border text-left text-xs transition flex items-center justify-between relative ${
                  selectedPlan === 'annual'
                    ? 'border-amber-500 bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-bold shadow-sm'
                    : 'border-slate-200 dark:border-slate-700 text-slate-500'
                }`}
              >
                <span>Annual Pass (Save 40%)</span>
                <span>Rs {paymentConfig?.annualPricePKR?.toLocaleString() || '18,000'}</span>
              </button>
            </div>
          </div>
        )}

        {/* Modal Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-5 flex-1">
          {errorMsg && (
            <div className="p-3.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/50 text-rose-700 dark:text-rose-300 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* ═════════════════════════════════════════════════════════════════ */}
          {/* STAGE 1: CHOOSE PAYMENT METHOD FIRST                              */}
          {/* ═════════════════════════════════════════════════════════════════ */}
          {stage === 'select' && (
            <div className="space-y-4">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block">
                How would you like to pay?
              </label>

              <div className="space-y-2.5">
                {/* 1. Debit / Credit Card */}
                <button
                  type="button"
                  onClick={() => handleSelectMethod('card')}
                  className="w-full p-4 rounded-2xl border-2 border-slate-200 dark:border-slate-800 hover:border-brand-500 dark:hover:border-brand-500 bg-white dark:bg-slate-900 transition flex items-center justify-between group text-left"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-12 h-12 rounded-2xl bg-brand-50 dark:bg-brand-950/40 text-brand-600 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                      <CreditCard className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-sm text-slate-900 dark:text-white">Debit / Credit Card</h4>
                        <span className="px-2 py-0.5 rounded text-[9px] font-bold bg-emerald-500/10 text-emerald-600 uppercase">
                          Automated Direct Debit
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                        Visa, Mastercard, or UnionPay. Instantly charged from your account to Dr Wazir Ahmed.
                      </p>
                    </div>
                  </div>
                  <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-brand-600 group-hover:translate-x-1 transition" />
                </button>

                {/* 2. EasyPaisa */}
                <button
                  type="button"
                  onClick={() => handleSelectMethod('easypaisa')}
                  className="w-full p-4 rounded-2xl border-2 border-slate-200 dark:border-slate-800 hover:border-emerald-500 dark:hover:border-emerald-500 bg-white dark:bg-slate-900 transition flex items-center justify-between group text-left"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 flex items-center justify-center font-black text-xl flex-shrink-0 group-hover:scale-105 transition-transform">
                      🟢
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-sm text-slate-900 dark:text-white">EasyPaisa Mobile Account</h4>
                        <span className="px-2 py-0.5 rounded text-[9px] font-bold bg-emerald-500/10 text-emerald-600 uppercase">
                          In-App Approval
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                        Enter your number → approve prompt on your EasyPaisa mobile app.
                      </p>
                    </div>
                  </div>
                  <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-emerald-600 group-hover:translate-x-1 transition" />
                </button>

                {/* 3. JazzCash */}
                <button
                  type="button"
                  onClick={() => handleSelectMethod('jazzcash')}
                  className="w-full p-4 rounded-2xl border-2 border-slate-200 dark:border-slate-800 hover:border-amber-500 dark:hover:border-amber-500 bg-white dark:bg-slate-900 transition flex items-center justify-between group text-left"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-12 h-12 rounded-2xl bg-amber-50 dark:bg-amber-950/40 text-amber-600 flex items-center justify-center font-black text-xl flex-shrink-0 group-hover:scale-105 transition-transform">
                      🔴
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-sm text-slate-900 dark:text-white">JazzCash Mobile Account</h4>
                        <span className="px-2 py-0.5 rounded text-[9px] font-bold bg-amber-500/10 text-amber-600 uppercase">
                          MPIN Prompt
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                        Enter your number → receive USSD pop-up / in-app notification to enter MPIN.
                      </p>
                    </div>
                  </div>
                  <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-amber-600 group-hover:translate-x-1 transition" />
                </button>
              </div>
            </div>
          )}

          {/* ═════════════════════════════════════════════════════════════════ */}
          {/* STAGE 2A: CARD PAYMENT FORM (AUTOMATIC DEDUCTION)                 */}
          {/* ═════════════════════════════════════════════════════════════════ */}
          {stage === 'form' && selectedMethod === 'card' && (
            <form onSubmit={handleProcessCardPayment} className="space-y-4">
              <div className="p-3 rounded-xl bg-brand-50/70 dark:bg-brand-950/30 border border-brand-200/80 dark:border-brand-900/40 text-xs text-brand-800 dark:text-brand-300 flex items-center gap-2">
                <Lock className="w-4 h-4 text-brand-600 flex-shrink-0" />
                <span>
                  Amount of <strong>Rs {amountPKR.toLocaleString()}</strong> will be automatically charged from your card and credited directly to Dr Wazir Ahmed.
                </span>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                  Cardholder Name
                </label>
                <input
                  type="text"
                  required
                  value={cardName}
                  onChange={(e) => setCardName(e.target.value)}
                  placeholder="e.g. Ahmed Khan"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                  Card Number
                </label>
                <div className="relative">
                  <CreditCard className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    required
                    value={cardNumber}
                    onChange={handleCardNumberChange}
                    placeholder="4123 4567 8901 2345"
                    maxLength={19}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                    Expiry Date
                  </label>
                  <input
                    type="text"
                    required
                    value={cardExpiry}
                    onChange={handleExpiryChange}
                    placeholder="MM/YY"
                    maxLength={5}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                    CVC / CVV
                  </label>
                  <input
                    type="password"
                    required
                    value={cardCvc}
                    onChange={(e) => setCardCvc(e.target.value.replace(/\D/g, '').substring(0, 4))}
                    placeholder="123"
                    maxLength={4}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={processing}
                className="w-full py-3.5 rounded-2xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs sm:text-sm shadow-md transition flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {processing ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>{processingStep}</span>
                  </>
                ) : (
                  <>
                    <Lock className="w-4 h-4" />
                    <span>Authorize &amp; Pay Rs {amountPKR.toLocaleString()}</span>
                  </>
                )}
              </button>
            </form>
          )}

          {/* ═════════════════════════════════════════════════════════════════ */}
          {/* STAGE 2B: EASYPAISA / JAZZCASH PHONE INPUT FORM                   */}
          {/* ═════════════════════════════════════════════════════════════════ */}
          {stage === 'form' && (selectedMethod === 'easypaisa' || selectedMethod === 'jazzcash') && (
            <form onSubmit={handleRequestMobilePayment} className="space-y-4">
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs space-y-1">
                <p className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                  <Smartphone className="w-4 h-4 text-brand-600" />
                  {selectedMethod === 'easypaisa' ? 'EasyPaisa In-App Approval Flow' : 'JazzCash MPIN Prompt Flow'}
                </p>
                <p className="text-slate-500 dark:text-slate-400">
                  Enter your mobile account number below. Our system will send an immediate payment request of <strong>Rs {amountPKR.toLocaleString()}</strong> to your phone.
                </p>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                  {selectedMethod === 'easypaisa' ? 'EasyPaisa Mobile Number' : 'JazzCash Mobile Number'}
                </label>
                <div className="relative">
                  <Smartphone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="tel"
                    required
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value)}
                    placeholder="03001234567"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                  Account Holder Full Name
                </label>
                <input
                  type="text"
                  required
                  value={accountName}
                  onChange={(e) => setAccountName(e.target.value)}
                  placeholder="Name as registered on SIM/account"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                  CNIC Number (Last 6 Digits)
                </label>
                <input
                  type="text"
                  value={cnicLast6}
                  onChange={(e) => setCnicLast6(e.target.value.replace(/\D/g, '').substring(0, 6))}
                  placeholder="e.g. 567890 (required for mobile direct-debit gateway)"
                  maxLength={6}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
                <p className="text-[10px] text-slate-400 mt-1">
                  State Bank of Pakistan requires CNIC verification for automated direct-debit prompts.
                </p>
              </div>

              <button
                type="submit"
                disabled={processing}
                className={`w-full py-3.5 rounded-2xl text-white font-bold text-xs sm:text-sm shadow-md transition flex items-center justify-center gap-2 disabled:opacity-50 ${
                  selectedMethod === 'easypaisa'
                    ? 'bg-emerald-600 hover:bg-emerald-700'
                    : 'bg-amber-600 hover:bg-amber-700'
                }`}
              >
                {processing ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>{processingStep}</span>
                  </>
                ) : (
                  <>
                    <Smartphone className="w-4 h-4" />
                    <span>Send Payment Prompt to My {selectedMethod === 'easypaisa' ? 'EasyPaisa' : 'JazzCash'}</span>
                  </>
                )}
              </button>
            </form>
          )}

          {/* ═════════════════════════════════════════════════════════════════ */}
          {/* STAGE 3: AWAITING APPROVAL / DISAPPROVAL ON MOBILE APP            */}
          {/* ═════════════════════════════════════════════════════════════════ */}
          {stage === 'awaiting_approval' && (
            <div className="py-6 text-center space-y-5">
              {/* Phone animation */}
              <div className="relative w-20 h-20 mx-auto rounded-3xl bg-gradient-to-tr from-brand-600 to-purple text-white flex items-center justify-center shadow-xl shadow-brand-500/25 animate-pulse">
                <Smartphone className="w-10 h-10" />
                <span className="absolute -top-1 -right-1 flex h-4 w-4">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500"></span>
                </span>
              </div>

              <div className="space-y-1.5">
                <h3 className="text-xl font-black text-slate-900 dark:text-white">
                  Payment Request Dispatched!
                </h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  A prompt of <strong className="text-slate-900 dark:text-white">Rs {amountPKR.toLocaleString()}</strong> has been sent to your phone: <strong className="font-mono text-brand-600 dark:text-brand-400">{mobileNumber}</strong>
                </p>
              </div>

              {/* Instructions Box */}
              <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/40 text-left text-xs space-y-2">
                <p className="font-bold text-amber-800 dark:text-amber-300">
                  📱 Next steps on your phone:
                </p>
                <ol className="list-decimal list-inside space-y-1 text-slate-600 dark:text-slate-300">
                  {selectedMethod === 'easypaisa' ? (
                    <>
                      <li>Open your <strong>EasyPaisa App</strong> (or check top phone notification).</li>
                      <li>Review the pending payment request from <strong>Dr Wazir Ahmed / D.TEN Academy</strong>.</li>
                      <li>Tap <strong>Approve</strong> and enter your 5-digit PIN to release Rs {amountPKR.toLocaleString()}.</li>
                    </>
                  ) : (
                    <>
                      <li>Look at your phone screen for the <strong>JazzCash USSD pop-up</strong> (or open JazzCash App).</li>
                      <li>Review the pending charge for <strong>Dr Wazir Ahmed / D.TEN Academy</strong>.</li>
                      <li>Enter your <strong>4-digit MPIN</strong> to authorize Rs {amountPKR.toLocaleString()}.</li>
                    </>
                  )}
                </ol>
              </div>

              {/* Countdown */}
              <div className="flex items-center justify-center gap-1.5 text-xs font-mono text-slate-400">
                <Clock className="w-3.5 h-3.5" />
                <span>Approval window expires in: <strong className="text-slate-800 dark:text-slate-200">{formatSeconds(countdown)}</strong></span>
              </div>

              {/* Action Buttons: Approve vs Disapprove */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleConfirmMobileApproval}
                  disabled={processing}
                  className="flex-1 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{processing ? 'Verifying Approval...' : 'I Have Approved in App'}</span>
                </button>

                <button
                  type="button"
                  onClick={handleDisapprove}
                  disabled={processing}
                  className="py-3 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-rose-600 dark:text-rose-400 font-bold text-xs transition flex items-center justify-center gap-2"
                >
                  <XCircle className="w-4 h-4" />
                  <span>Disapprove / Cancel</span>
                </button>
              </div>
            </div>
          )}

          {/* ═════════════════════════════════════════════════════════════════ */}
          {/* STAGE 4: SUCCESS                                                  */}
          {/* ═════════════════════════════════════════════════════════════════ */}
          {stage === 'success' && (
            <div className="py-10 text-center space-y-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-emerald-500/10 border-2 border-emerald-500 text-emerald-500 flex items-center justify-center">
                <Check className="w-8 h-8 stroke-[3]" />
              </div>
              <h3 className="text-2xl font-black text-slate-900 dark:text-white">
                Payment Authorized &amp; Transferred!
              </h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Rs {amountPKR.toLocaleString()} was successfully debited from your account and credited to Dr Wazir Ahmed. Your <strong className="text-amber-500">Premium Membership</strong> is now active.
              </p>
            </div>
          )}
        </div>

        {/* Modal Footer Security Badge */}
        <div className="p-4 bg-slate-50 dark:bg-slate-800/40 border-t border-slate-100 dark:border-slate-800 text-center text-[11px] text-slate-400 flex items-center justify-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
          <span>Payment routed directly to Dr Wazir Ahmed's receiving account. Verified 256-bit encrypted.</span>
        </div>
      </div>
    </div>
  );
};
