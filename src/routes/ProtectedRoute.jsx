import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

/**
 * ProtectedRoute
 *
 * Props:
 *   requireSuperAdmin  — only super_admin may enter
 *   requireAdmin       — admin or super_admin may enter
 *   requirePremium     — premium membership required
 */
export const ProtectedRoute = ({
  children,
  requireSuperAdmin = false,
  requireAdmin      = false,
  requirePremium    = false,
}) => {
  const { currentUser, userProfile, loading, isAdmin, isSuperAdmin, isPremium } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
        <div className="w-8 h-8 border-4 border-brand-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // ── Not authenticated ──────────────────────────────────────────────────
  if (!currentUser) {
    return <Navigate to={`/login?redirect=${encodeURIComponent(location.pathname)}`} replace />;
  }

  // ── Super Admin gate ───────────────────────────────────────────────────
  if (requireSuperAdmin && !isSuperAdmin) {
    return <Navigate to="/admin" replace />;
  }

  // ── Admin gate (admin OR super_admin) ──────────────────────────────────
  if (requireAdmin && !isAdmin) {
    return <Navigate to="/dashboard/free" replace />;
  }

  // ── Premium gate ───────────────────────────────────────────────────────
  if (requirePremium && !isPremium) {
    return <Navigate to="/pricing?reason=premium-required" replace />;
  }

  return children;
};
