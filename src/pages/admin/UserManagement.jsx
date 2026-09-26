import React, { useState, useEffect } from 'react';
import {
  Users, Search, Shield, ShieldCheck, ShieldAlert, Sparkles,
  Trash2, UserCheck, UserX, CheckCircle2, AlertCircle,
  Eye, X, UserPlus, ChevronDown, Lock, Crown, GraduationCap,
  RefreshCw, BookOpen
} from 'lucide-react';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import {
  getAllUsers,
  updateUserRole,
  updateUserMembership,
  toggleUserStatus,
  deleteUserRecord,
  getUserEnrollments,
  inviteAdmin,
} from '../../services/firebaseService';
import { useAuth } from '../../context/AuthContext';
import { Badge } from '../../components/common/Badge';

// ── Role badge helper ────────────────────────────────────────────────────────
const RoleBadge = ({ role }) => {
  const map = {
    super_admin: { label: 'Super Admin', icon: Crown,       cls: 'bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300 border-purple-200 dark:border-purple-800' },
    admin:       { label: 'Admin',       icon: ShieldCheck, cls: 'bg-brand-100  text-brand-700  dark:bg-brand-900/40  dark:text-brand-300  border-brand-200  dark:border-brand-800'  },
    student:     { label: 'Student',     icon: GraduationCap, cls: 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300 border-slate-200 dark:border-slate-700'     },
  };
  const cfg = map[role] || map.student;
  const Icon = cfg.icon;
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-bold border ${cfg.cls}`}>
      <Icon className="w-3 h-3" />
      {cfg.label}
    </span>
  );
};

// ── Admin standards config ───────────────────────────────────────────────────
const STUDENT_STANDARDS = {
  free:    { maxCourses: 3,  label: 'Free Member',    color: 'text-slate-600' },
  premium: { maxCourses: 999, label: 'Premium Member', color: 'text-amber-600' },
};

export const UserManagement = () => {
  const { userProfile, isSuperAdmin, SUPER_ADMIN_EMAIL } = useAuth();

  const [users,           setUsers]           = useState([]);
  const [searchTerm,      setSearchTerm]      = useState('');
  const [membershipFilter,setMembershipFilter] = useState('all');
  const [roleFilter,      setRoleFilter]      = useState('all');
  const [selectedUser,    setSelectedUser]    = useState(null);
  const [userEnrollments, setUserEnrollments] = useState([]);
  const [loading,         setLoading]         = useState(true);
  const [notice,          setNotice]          = useState({ msg: '', type: 'ok' });

  // Add-admin modal state
  const [showAddAdmin,   setShowAddAdmin]   = useState(false);
  const [adminEmail,     setAdminEmail]     = useState('');
  const [adminName,      setAdminName]      = useState('');
  const [adminPassword,  setAdminPassword]  = useState('');
  const [addingAdmin,    setAddingAdmin]    = useState(false);

  const showNotice = (msg, type = 'ok') => {
    setNotice({ msg, type });
    setTimeout(() => setNotice({ msg: '', type: 'ok' }), 4000);
  };

  const loadUsers = async () => {
    setLoading(true);
    const data = await getAllUsers();
    setUsers(data);
    setLoading(false);
  };

  useEffect(() => { loadUsers(); }, []);

  // ── Permission guard: can current user modify target user? ────────────────
  const canModify = (targetUser) => {
    if (!targetUser) return false;
    // Nobody touches super_admin except themselves
    if (targetUser.role === 'super_admin') return false;
    // Admins can only touch students (not other admins)
    if (!isSuperAdmin && targetUser.role === 'admin') return false;
    return true;
  };

  // ── Role change ───────────────────────────────────────────────────────────
  const handleRoleChange = async (u, newRole) => {
    if (!canModify(u)) return showNotice('You cannot change this user\'s role.', 'err');
    await updateUserRole(u.uid, newRole);
    setUsers(prev => prev.map(x => x.uid === u.uid ? { ...x, role: newRole } : x));
    showNotice(`${u.name}'s role updated to ${newRole}.`);
  };

  // ── Membership change ─────────────────────────────────────────────────────
  const handleMembershipChange = async (u, mem) => {
    if (!canModify(u)) return showNotice('Cannot modify this user.', 'err');
    await updateUserMembership(u.uid, mem);
    setUsers(prev => prev.map(x => x.uid === u.uid ? { ...x, membership: mem } : x));
    showNotice(`${u.name}'s membership updated to ${mem}.`);
  };

  // ── Suspend / Activate ────────────────────────────────────────────────────
  const handleToggleStatus = async (u) => {
    if (!canModify(u)) return showNotice('Cannot modify this user.', 'err');
    const next = await toggleUserStatus(u.uid, u.status);
    setUsers(prev => prev.map(x => x.uid === u.uid ? { ...x, status: next } : x));
    showNotice(`${u.name} is now ${next}.`);
  };

  // ── Delete ────────────────────────────────────────────────────────────────
  const handleDelete = async (u) => {
    if (!canModify(u)) return showNotice('Cannot delete this user.', 'err');
    if (!window.confirm(`Permanently delete "${u.name}"? This cannot be undone.`)) return;
    await deleteUserRecord(u.uid);
    setUsers(prev => prev.filter(x => x.uid !== u.uid));
    showNotice(`User "${u.name}" deleted.`);
  };

  // ── View enrollments ──────────────────────────────────────────────────────
  const handleViewUser = async (u) => {
    setSelectedUser(u);
    const enrs = await getUserEnrollments(u.uid);
    setUserEnrollments(enrs);
  };

  // ── Add Admin (Super Admin only) ──────────────────────────────────────────
  const handleAddAdmin = async (e) => {
    e.preventDefault();
    if (!isSuperAdmin) return;
    setAddingAdmin(true);
    try {
      await inviteAdmin({ email: adminEmail, name: adminName, password: adminPassword });
      showNotice(`Admin account created for ${adminName}.`);
      setShowAddAdmin(false);
      setAdminEmail(''); setAdminName(''); setAdminPassword('');
      await loadUsers();
    } catch (err) {
      showNotice(err.message || 'Failed to create admin.', 'err');
    } finally {
      setAddingAdmin(false);
    }
  };

  // ── Remove Admin → downgrade to student ──────────────────────────────────
  const handleRemoveAdmin = async (u) => {
    if (!isSuperAdmin) return showNotice('Only Super Admin can remove admins.', 'err');
    if (!window.confirm(`Remove admin privileges from "${u.name}"? They will become a student.`)) return;
    await updateUserRole(u.uid, 'student');
    setUsers(prev => prev.map(x => x.uid === u.uid ? { ...x, role: 'student' } : x));
    showNotice(`${u.name} is now a student.`);
  };

  // ── Filtering ─────────────────────────────────────────────────────────────
  const filtered = users.filter(u => {
    const q = searchTerm.toLowerCase();
    const matchesSearch = (u.name || '').toLowerCase().includes(q) || (u.email || '').toLowerCase().includes(q);
    const matchesMem  = membershipFilter === 'all' || u.membership === membershipFilter;
    const matchesRole = roleFilter       === 'all' || u.role === roleFilter;
    return matchesSearch && matchesMem && matchesRole;
  });

  const counts = {
    total:    users.length,
    students: users.filter(u => u.role === 'student').length,
    admins:   users.filter(u => u.role === 'admin').length,
    premium:  users.filter(u => u.membership === 'premium').length,
  };

  return (
    <DashboardLayout
      title="User Management"
      subtitle="Manage students, admins, memberships, and account standards."
    >
      <div className="space-y-6">

        {/* Notice */}
        {notice.msg && (
          <div className={`p-3.5 rounded-2xl border text-xs font-bold flex items-center gap-2 ${
            notice.type === 'err'
              ? 'bg-rose-50 dark:bg-rose-950/40 border-rose-200 dark:border-rose-900/50 text-rose-700 dark:text-rose-300'
              : 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500/30 text-emerald-800 dark:text-emerald-200'
          }`}>
            {notice.type === 'err'
              ? <AlertCircle className="w-4 h-4" />
              : <CheckCircle2 className="w-4 h-4 text-emerald-500" />}
            {notice.msg}
          </div>
        )}

        {/* Stats row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: 'Total Users',     value: counts.total,    icon: Users,      color: 'text-brand-600'  },
            { label: 'Students',        value: counts.students, icon: GraduationCap, color: 'text-slate-600' },
            { label: 'Admins',          value: counts.admins,   icon: ShieldCheck, color: 'text-purple-600' },
            { label: 'Premium Members', value: counts.premium,  icon: Sparkles,   color: 'text-amber-600'  },
          ].map(s => (
            <div key={s.label} className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-3">
              <s.icon className={`w-5 h-5 ${s.color}`} />
              <div>
                <p className="text-xl font-black text-slate-900 dark:text-white">{s.value}</p>
                <p className="text-[11px] text-slate-400">{s.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Student Standards box */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <h3 className="font-bold text-sm text-slate-800 dark:text-white mb-3 flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-brand-500" />
            Student Standards
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
              <p className="font-bold text-slate-700 dark:text-slate-200 mb-1">🎓 Free Member</p>
              <ul className="text-slate-500 space-y-0.5">
                <li>• Access up to {STUDENT_STANDARDS.free.maxCourses} free courses</li>
                <li>• Progress tracking &amp; quiz results</li>
                <li>• No certificates or premium content</li>
              </ul>
            </div>
            <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/50">
              <p className="font-bold text-amber-700 dark:text-amber-300 mb-1">⭐ Premium Member</p>
              <ul className="text-slate-500 space-y-0.5">
                <li>• Unlimited course access (all tiers)</li>
                <li>• Downloadable certificates</li>
                <li>• Priority content &amp; early access</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Filter bar + Add Admin */}
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row gap-3 items-center justify-between">
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <select
              value={membershipFilter}
              onChange={(e) => setMembershipFilter(e.target.value)}
              className="px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs text-slate-700 dark:text-slate-300"
            >
              <option value="all">All Memberships</option>
              <option value="free">Free</option>
              <option value="premium">Premium</option>
            </select>

            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs text-slate-700 dark:text-slate-300"
            >
              <option value="all">All Roles</option>
              <option value="student">Students</option>
              <option value="admin">Admins</option>
              <option value="super_admin">Super Admin</option>
            </select>

            <button
              onClick={loadUsers}
              className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-500 hover:text-brand-600 transition"
              title="Refresh"
            >
              <RefreshCw className="w-4 h-4" />
            </button>

            {/* Add Admin — Super Admin only */}
            {isSuperAdmin && (
              <button
                onClick={() => setShowAddAdmin(true)}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs shadow-sm shadow-brand-500/20 transition"
              >
                <UserPlus className="w-3.5 h-3.5" />
                Add Admin
              </button>
            )}
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-slate-50 dark:bg-slate-800/50 text-slate-400 text-[11px] uppercase tracking-wider font-bold">
                <tr>
                  <th className="py-3.5 px-5">Name</th>
                  <th className="py-3.5 px-5">Email</th>
                  <th className="py-3.5 px-5">Role</th>
                  <th className="py-3.5 px-5">Membership</th>
                  <th className="py-3.5 px-5 text-center">Status</th>
                  <th className="py-3.5 px-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {loading ? (
                  <tr><td colSpan={6} className="py-12 text-center text-slate-400 text-xs">Loading users…</td></tr>
                ) : filtered.length === 0 ? (
                  <tr><td colSpan={6} className="py-12 text-center text-slate-400 text-xs">No users match your filters.</td></tr>
                ) : filtered.map((u) => {
                  const isMe      = u.uid === userProfile?.uid;
                  const protected_ = !canModify(u);

                  return (
                    <tr key={u.uid} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition">
                      {/* Name */}
                      <td className="py-3.5 px-5">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-full bg-brand-100 dark:bg-brand-900/40 text-brand-700 dark:text-brand-300 font-bold text-sm flex items-center justify-center flex-shrink-0">
                            {(u.name || 'U').charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <p className="font-bold text-slate-900 dark:text-white">
                              {u.name}
                              {isMe && <span className="ml-1.5 text-[10px] text-brand-500 font-semibold">(you)</span>}
                            </p>
                            <p className="text-[10px] text-slate-400">
                              Joined {u.createdAt ? new Date(u.createdAt).toLocaleDateString() : '—'}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Email */}
                      <td className="py-3.5 px-5 text-slate-500 font-mono text-xs">{u.email}</td>

                      {/* Role */}
                      <td className="py-3.5 px-5">
                        {protected_ ? (
                          <RoleBadge role={u.role} />
                        ) : isSuperAdmin && u.role !== 'student' ? (
                          <div className="flex items-center gap-1.5">
                            <RoleBadge role={u.role} />
                            {u.role === 'admin' && (
                              <button
                                onClick={() => handleRemoveAdmin(u)}
                                className="text-[10px] text-rose-500 hover:text-rose-700 font-semibold underline"
                                title="Remove admin privileges"
                              >
                                Remove
                              </button>
                            )}
                          </div>
                        ) : (
                          <select
                            value={u.role}
                            onChange={(e) => handleRoleChange(u, e.target.value)}
                            disabled={protected_}
                            className="px-2 py-1 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-semibold capitalize disabled:opacity-50"
                          >
                            <option value="student">Student</option>
                            {isSuperAdmin && <option value="admin">Admin</option>}
                          </select>
                        )}
                      </td>

                      {/* Membership */}
                      <td className="py-3.5 px-5">
                        {protected_ ? (
                          <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300">
                            {u.membership}
                          </span>
                        ) : (
                          <select
                            value={u.membership || 'free'}
                            onChange={(e) => handleMembershipChange(u, e.target.value)}
                            className="px-2 py-1 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-semibold capitalize"
                          >
                            <option value="free">Free</option>
                            <option value="premium">Premium</option>
                          </select>
                        )}
                      </td>

                      {/* Status */}
                      <td className="py-3.5 px-5 text-center">
                        {protected_ ? (
                          <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-600">
                            Active
                          </span>
                        ) : (
                          <button
                            onClick={() => handleToggleStatus(u)}
                            className={`px-3 py-1 rounded-full text-xs font-bold transition ${
                              u.status === 'active'
                                ? 'bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/20'
                                : 'bg-rose-500/10 text-rose-600 hover:bg-rose-500/20'
                            }`}
                          >
                            {u.status === 'active' ? 'Active' : 'Suspended'}
                          </button>
                        )}
                      </td>

                      {/* Actions */}
                      <td className="py-3.5 px-5 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => handleViewUser(u)}
                            className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300 transition"
                            title="View profile & enrollments"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>
                          {!protected_ && !isMe && (
                            <button
                              onClick={() => handleDelete(u)}
                              className="p-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 transition"
                              title="Delete user"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          )}
                          {protected_ && (
                            <span className="p-1.5 text-slate-300 dark:text-slate-700" title="Protected account">
                              <Lock className="w-3.5 h-3.5" />
                            </span>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* ── Add Admin Modal ────────────────────────────────────────────── */}
        {showAddAdmin && isSuperAdmin && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
            <div className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-2xl">
              <button
                onClick={() => setShowAddAdmin(false)}
                className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 dark:hover:text-white rounded-full hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-brand-50 dark:bg-brand-950/40 flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5 text-brand-600" />
                </div>
                <div>
                  <h3 className="font-black text-slate-900 dark:text-white">Add New Admin</h3>
                  <p className="text-xs text-slate-400">Admin can manage students &amp; course content.</p>
                </div>
              </div>

              <form onSubmit={handleAddAdmin} className="space-y-4">
                <div>
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={adminName}
                    onChange={(e) => setAdminName(e.target.value)}
                    placeholder="Admin Name"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    value={adminEmail}
                    onChange={(e) => setAdminEmail(e.target.value)}
                    placeholder="admin@dten.edu"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">Temporary Password</label>
                  <input
                    type="password"
                    required
                    minLength={8}
                    value={adminPassword}
                    onChange={(e) => setAdminPassword(e.target.value)}
                    placeholder="Min 8 characters"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                  />
                  <p className="text-[10px] text-slate-400 mt-1">
                    Share this with the admin. They should change it after first login.
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-brand-50 dark:bg-brand-950/20 border border-brand-200 dark:border-brand-800/50 text-xs text-brand-700 dark:text-brand-300 space-y-1">
                  <p className="font-bold">Admin Permissions:</p>
                  <p>✅ Manage students (enroll, suspend, upgrade membership)</p>
                  <p>✅ Manage course content &amp; categories</p>
                  <p>❌ Cannot add or remove other admins</p>
                  <p>❌ Cannot access Super Admin settings</p>
                </div>

                <button
                  type="submit"
                  disabled={addingAdmin}
                  className="w-full py-3 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-sm shadow-sm transition disabled:opacity-50"
                >
                  {addingAdmin ? 'Creating Admin Account…' : 'Create Admin Account'}
                </button>
              </form>
            </div>
          </div>
        )}

        {/* ── User Detail / Enrollment Modal ────────────────────────────── */}
        {selectedUser && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
            <div className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-2xl">
              <button
                onClick={() => setSelectedUser(null)}
                className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 dark:hover:text-white rounded-full hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-2xl bg-brand-50 dark:bg-brand-950/40 text-brand-600 flex items-center justify-center font-bold text-2xl">
                  {(selectedUser.name || 'U').charAt(0).toUpperCase()}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">{selectedUser.name}</h3>
                  <p className="text-xs text-slate-500 font-mono">{selectedUser.email}</p>
                  <div className="flex gap-2 mt-1.5">
                    <RoleBadge role={selectedUser.role} />
                    <span className={`px-2 py-0.5 rounded-full text-[11px] font-bold ${
                      selectedUser.membership === 'premium'
                        ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300'
                        : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300'
                    }`}>
                      {selectedUser.membership}
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-5 text-xs">
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700">
                  <p className="text-slate-400 mb-0.5">Joined</p>
                  <p className="font-bold text-slate-800 dark:text-slate-200">
                    {selectedUser.createdAt ? new Date(selectedUser.createdAt).toLocaleDateString() : '—'}
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700">
                  <p className="text-slate-400 mb-0.5">Last Login</p>
                  <p className="font-bold text-slate-800 dark:text-slate-200">
                    {selectedUser.lastLogin ? new Date(selectedUser.lastLogin).toLocaleDateString() : '—'}
                  </p>
                </div>
              </div>

              <h4 className="font-bold text-xs uppercase tracking-wider text-slate-400 mb-3">
                Enrolled Courses ({userEnrollments.length})
              </h4>
              <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                {userEnrollments.length === 0 ? (
                  <p className="text-xs text-slate-400 italic text-center py-4">No courses enrolled yet.</p>
                ) : (
                  userEnrollments.map((enr) => (
                    <div key={enr.id} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 text-xs">
                      <div className="flex items-center justify-between font-bold mb-1">
                        <span className="text-slate-800 dark:text-slate-200">{enr.courseTitle}</span>
                        <span className="text-brand-600">{enr.progress || 0}%</span>
                      </div>
                      <div className="text-[11px] text-slate-400">
                        {enr.completedLessons?.length || 0} of {enr.totalLessons} lessons completed
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}

      </div>
    </DashboardLayout>
  );
};
