import React, { useState, useEffect } from 'react';
import {
  CreditCard,
  Building2,
  Smartphone,
  Sparkles,
  CheckCircle2,
  Clock,
  Search,
  Filter,
  Save,
  DollarSign,
  TrendingUp,
  AlertCircle,
  ExternalLink,
  ShieldCheck,
  RefreshCw,
  Users
} from 'lucide-react';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { 
  getAllPayments, 
  getPaymentConfig, 
  updatePaymentConfig, 
  updatePaymentStatus 
} from '../../services/firebaseService';
import { useAuth } from '../../context/AuthContext';

export const PaymentManagement = () => {
  const { isSuperAdmin } = useAuth();

  const [activeTab, setActiveTab] = useState('transactions'); // 'transactions' | 'settings'
  const [payments, setPayments] = useState([]);
  const [paymentConfig, setPaymentConfig] = useState(null);
  const [loading, setLoading] = useState(true);
  const [savingSettings, setSavingSettings] = useState(false);
  const [notice, setNotice] = useState({ msg: '', type: 'ok' });
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const showNotice = (msg, type = 'ok') => {
    setNotice({ msg, type });
    setTimeout(() => setNotice({ msg: '', type: 'ok' }), 4000);
  };

  const loadData = async () => {
    setLoading(true);
    const [pList, cfg] = await Promise.all([
      getAllPayments(),
      getPaymentConfig()
    ]);
    setPayments(pList);
    setPaymentConfig(cfg);
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleSaveSettings = async (e) => {
    e.preventDefault();
    if (!isSuperAdmin) {
      showNotice("Only Super Admin can update payment receiving accounts.", "err");
      return;
    }
    setSavingSettings(true);
    try {
      await updatePaymentConfig(paymentConfig);
      showNotice("Payment receiving account details saved to Firestore successfully!");
    } catch (err) {
      showNotice(err.message || "Failed to save settings.", "err");
    } finally {
      setSavingSettings(false);
    }
  };

  const handleToggleStatus = async (paymentId, currentStatus) => {
    const next = currentStatus === 'verified' ? 'pending' : 'verified';
    await updatePaymentStatus(paymentId, next);
    setPayments(payments.map(p => p.id === paymentId ? { ...p, status: next } : p));
    showNotice(`Transaction status updated to ${next}.`);
  };

  // Calculations
  const totalRevenuePKR = payments
    .filter(p => p.status === 'verified')
    .reduce((sum, p) => sum + (Number(p.amount) || 0), 0);

  const totalTransactions = payments.length;
  const verifiedCount = payments.filter(p => p.status === 'verified').length;
  const pendingCount = payments.filter(p => p.status === 'pending').length;

  const filteredPayments = payments.filter(p => {
    const q = searchTerm.toLowerCase();
    const matchesSearch = 
      (p.userName || '').toLowerCase().includes(q) ||
      (p.userEmail || '').toLowerCase().includes(q) ||
      (p.transactionId || '').toLowerCase().includes(q);
    const matchesStatus = statusFilter === 'all' || p.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <DashboardLayout
      title="Payment & Revenue Management"
      subtitle="View all incoming student subscription payments, transaction IDs, and configure your receiving bank accounts."
    >
      <div className="space-y-6">

        {/* Notice alert */}
        {notice.msg && (
          <div className={`p-3.5 rounded-2xl border text-xs font-bold flex items-center gap-2 ${
            notice.type === 'err'
              ? 'bg-rose-50 dark:bg-rose-950/40 border-rose-200 dark:border-rose-900/50 text-rose-700 dark:text-rose-300'
              : 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500/30 text-emerald-800 dark:text-emerald-200'
          }`}>
            {notice.type === 'err' ? <AlertCircle className="w-4 h-4" /> : <CheckCircle2 className="w-4 h-4 text-emerald-500" />}
            {notice.msg}
          </div>
        )}

        {/* Top KPI Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-slate-500 font-medium">Total Revenue</span>
              <DollarSign className="w-5 h-5 text-emerald-500" />
            </div>
            <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400">
              Rs {totalRevenuePKR.toLocaleString()}
            </div>
            <span className="text-[10px] text-slate-400">All-time verified payments</span>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-slate-500 font-medium">Total Orders</span>
              <CreditCard className="w-5 h-5 text-brand-600" />
            </div>
            <div className="text-2xl font-black text-slate-900 dark:text-white">
              {totalTransactions}
            </div>
            <span className="text-[10px] text-slate-400">Subscription upgrades</span>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-slate-500 font-medium">Verified Active</span>
              <CheckCircle2 className="w-5 h-5 text-emerald-500" />
            </div>
            <div className="text-2xl font-black text-slate-900 dark:text-white">
              {verifiedCount}
            </div>
            <span className="text-[10px] text-emerald-600 font-semibold">Active subscribers</span>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-slate-500 font-medium">Pending Review</span>
              <Clock className="w-5 h-5 text-amber-500" />
            </div>
            <div className="text-2xl font-black text-amber-500">
              {pendingCount}
            </div>
            <span className="text-[10px] text-slate-400">Need manual verification</span>
          </div>
        </div>

        {/* Tab Selection */}
        <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2">
          <button
            onClick={() => setActiveTab('transactions')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
              activeTab === 'transactions'
                ? 'bg-brand-600 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <CreditCard className="w-4 h-4" /> Received Payments ({payments.length})
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
              activeTab === 'settings'
                ? 'bg-brand-600 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <Building2 className="w-4 h-4" /> Receiving Bank &amp; Account Settings
          </button>
        </div>

        {/* ── TAB 1: TRANSACTIONS LIST ──────────────────────────────────────── */}
        {activeTab === 'transactions' && (
          <div className="space-y-4">
            {/* Filter toolbar */}
            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row gap-3 items-center justify-between">
              <div className="relative w-full sm:w-80">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search student, email, or Transaction ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs text-slate-700 dark:text-slate-300 font-semibold"
                >
                  <option value="all">All Statuses</option>
                  <option value="verified">Verified</option>
                  <option value="pending">Pending</option>
                </select>

                <button
                  onClick={loadData}
                  className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-500 hover:text-brand-600 transition"
                  title="Refresh"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Table */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead className="bg-slate-50 dark:bg-slate-800/50 text-slate-400 text-[11px] uppercase tracking-wider font-bold">
                    <tr>
                      <th className="py-3.5 px-5">Student</th>
                      <th className="py-3.5 px-5">Plan</th>
                      <th className="py-3.5 px-5">Amount</th>
                      <th className="py-3.5 px-5">Method</th>
                      <th className="py-3.5 px-5">Transaction Ref (TID)</th>
                      <th className="py-3.5 px-5 text-center">Status</th>
                      <th className="py-3.5 px-5 text-right">Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    {loading ? (
                      <tr><td colSpan={7} className="py-12 text-center text-slate-400 text-xs">Loading payments...</td></tr>
                    ) : filteredPayments.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="py-12 text-center text-slate-400 text-xs">
                          No payment records found. When students purchase Premium, their payments and Transaction IDs will appear here.
                        </td>
                      </tr>
                    ) : (
                      filteredPayments.map((p) => (
                        <tr key={p.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition">
                          <td className="py-3.5 px-5">
                            <div className="font-bold text-slate-900 dark:text-white">{p.userName || 'Student'}</div>
                            <div className="text-[10px] text-slate-400 font-mono">{p.userEmail}</div>
                          </td>
                          <td className="py-3.5 px-5 capitalize font-semibold text-slate-700 dark:text-slate-300">
                            {p.plan === 'annual' ? '⭐ Annual Pass' : 'Monthly Pass'}
                          </td>
                          <td className="py-3.5 px-5 font-black text-slate-900 dark:text-white">
                            Rs {Number(p.amount).toLocaleString()}
                          </td>
                          <td className="py-3.5 px-5">
                            <span className="font-semibold text-xs text-slate-800 dark:text-slate-200 block">
                              {p.method === 'card_direct_debit' && '💳 Card (Direct Debit)'}
                              {p.method === 'easypaisa_in_app' && '🟢 EasyPaisa (In-App)'}
                              {p.method === 'jazzcash_mpin' && '🔴 JazzCash (MPIN Prompt)'}
                              {(!p.method || (p.method !== 'card_direct_debit' && p.method !== 'easypaisa_in_app' && p.method !== 'jazzcash_mpin')) && (p.method?.replace(/_/g, ' ') || 'Direct Debit')}
                            </span>
                            {(p.cardLast4 || p.mobileNumber) && (
                              <span className="text-[10px] text-slate-400 font-mono block">
                                {p.cardLast4 ? `Card ending in ${p.cardLast4}` : p.mobileNumber}
                              </span>
                            )}
                          </td>
                          <td className="py-3.5 px-5 font-mono text-xs font-bold text-brand-600 dark:text-brand-400">
                            {p.transactionId || '—'}
                          </td>

                          <td className="py-3.5 px-5 text-center">
                            <button
                              onClick={() => handleToggleStatus(p.id, p.status)}
                              className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase transition ${
                                p.status === 'verified'
                                  ? 'bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/20'
                                  : 'bg-amber-500/10 text-amber-600 hover:bg-amber-500/20'
                              }`}
                              title="Click to toggle status"
                            >
                              {p.status || 'verified'}
                            </button>
                          </td>
                          <td className="py-3.5 px-5 text-right text-xs text-slate-400">
                            {p.createdAt ? new Date(p.createdAt).toLocaleDateString() : '—'}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ── TAB 2: RECEIVING ACCOUNT SETTINGS ──────────────────────────────── */}
        {activeTab === 'settings' && paymentConfig && (
          <form onSubmit={handleSaveSettings} className="space-y-6 max-w-4xl">
            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
              
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
                <div>
                  <h3 className="font-black text-slate-900 dark:text-white text-base">
                    Receiving Account &amp; Bank Settings
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    When students click "Upgrade to Premium", these details are shown so their money transfers directly to you.
                  </p>
                </div>
                <div className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 text-xs font-bold flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5" /> Super Admin Protected
                </div>
              </div>

              {/* Bank Details */}
              <div>
                <h4 className="font-bold text-xs uppercase tracking-wider text-brand-600 dark:text-brand-400 mb-3 flex items-center gap-2">
                  <Building2 className="w-4 h-4" /> Primary Bank Account Details
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                      Account Title (Your Name)
                    </label>
                    <input
                      type="text"
                      required
                      value={paymentConfig.accountTitle || ''}
                      onChange={(e) => setPaymentConfig({ ...paymentConfig, accountTitle: e.target.value })}
                      placeholder="e.g. Dr Wazir Ahmed"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                      Bank Name
                    </label>
                    <input
                      type="text"
                      required
                      value={paymentConfig.bankName || ''}
                      onChange={(e) => setPaymentConfig({ ...paymentConfig, bankName: e.target.value })}
                      placeholder="e.g. Meezan Bank / HBL / Bank Alfalah"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                      Account Number
                    </label>
                    <input
                      type="text"
                      required
                      value={paymentConfig.accountNumber || ''}
                      onChange={(e) => setPaymentConfig({ ...paymentConfig, accountNumber: e.target.value })}
                      placeholder="e.g. 01020304050607"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono text-slate-900 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                      IBAN / Raast ID
                    </label>
                    <input
                      type="text"
                      value={paymentConfig.iban || ''}
                      onChange={(e) => setPaymentConfig({ ...paymentConfig, iban: e.target.value })}
                      placeholder="e.g. PK00MEZN0000000102030405"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono text-slate-900 dark:text-white"
                    />
                  </div>
                </div>
              </div>

              {/* Mobile Wallets */}
              <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
                <h4 className="font-bold text-xs uppercase tracking-wider text-brand-600 dark:text-brand-400 mb-3 flex items-center gap-2">
                  <Smartphone className="w-4 h-4" /> Mobile Wallets (JazzCash &amp; EasyPaisa)
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                      JazzCash Mobile Number
                    </label>
                    <input
                      type="text"
                      value={paymentConfig.jazzCashNumber || ''}
                      onChange={(e) => setPaymentConfig({ ...paymentConfig, jazzCashNumber: e.target.value })}
                      placeholder="e.g. 0300-1234567"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono text-slate-900 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                      EasyPaisa Mobile Number
                    </label>
                    <input
                      type="text"
                      value={paymentConfig.easyPaisaNumber || ''}
                      onChange={(e) => setPaymentConfig({ ...paymentConfig, easyPaisaNumber: e.target.value })}
                      placeholder="e.g. 0300-1234567"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono text-slate-900 dark:text-white"
                    />
                  </div>
                </div>
              </div>

              {/* Pricing in PKR & USD */}
              <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
                <h4 className="font-bold text-xs uppercase tracking-wider text-brand-600 dark:text-brand-400 mb-3 flex items-center gap-2">
                  <DollarSign className="w-4 h-4" /> Subscription Pricing
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
                  <div>
                    <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">Monthly (PKR)</label>
                    <input
                      type="number"
                      required
                      value={paymentConfig.monthlyPricePKR || 2500}
                      onChange={(e) => setPaymentConfig({ ...paymentConfig, monthlyPricePKR: Number(e.target.value) })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold"
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">Monthly (USD)</label>
                    <input
                      type="number"
                      required
                      value={paymentConfig.monthlyPriceUSD || 14}
                      onChange={(e) => setPaymentConfig({ ...paymentConfig, monthlyPriceUSD: Number(e.target.value) })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold"
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">Annual (PKR)</label>
                    <input
                      type="number"
                      required
                      value={paymentConfig.annualPricePKR || 18000}
                      onChange={(e) => setPaymentConfig({ ...paymentConfig, annualPricePKR: Number(e.target.value) })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold"
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">Annual (USD)</label>
                    <input
                      type="number"
                      required
                      value={paymentConfig.annualPriceUSD || 108}
                      onChange={(e) => setPaymentConfig({ ...paymentConfig, annualPriceUSD: Number(e.target.value) })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold"
                    />
                  </div>
                </div>
              </div>

              {/* Stripe Payment Link (Optional) */}
              <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                  Online Stripe Checkout Link (Optional)
                </label>
                <input
                  type="url"
                  value={paymentConfig.stripePaymentLink || ''}
                  onChange={(e) => setPaymentConfig({ ...paymentConfig, stripePaymentLink: e.target.value })}
                  placeholder="https://buy.stripe.com/..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs text-slate-900 dark:text-white"
                />
                <p className="text-[10px] text-slate-400 mt-1">
                  Optional: If you have a Stripe Payment Link, paste it here so international students can pay via card.
                </p>
              </div>

              {/* Submit button */}
              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-end">
                <button
                  type="submit"
                  disabled={savingSettings}
                  className="px-6 py-3 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs shadow-md transition flex items-center gap-2 disabled:opacity-50"
                >
                  <Save className="w-4 h-4" />
                  {savingSettings ? 'Saving Settings...' : 'Save Receiving Account Details'}
                </button>
              </div>
            </div>
          </form>
        )}

      </div>
    </DashboardLayout>
  );
};
