import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  auth,
  db,
  isFirebaseConfigured,
  SUPER_ADMIN_EMAIL,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  sendPasswordResetEmail as firebaseSendPasswordReset,
  updateProfile as firebaseUpdateProfile,
  onAuthStateChanged,
  setPersistence,
  browserLocalPersistence,
  browserSessionPersistence,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  serverTimestamp,
} from '../config/firebase';


const AuthContext = createContext(null);

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider');
  return ctx;
};

// ─── Role hierarchy ──────────────────────────────────────────────────────────
// super_admin > admin > student (role='user')
// Super Admin is identified by SUPER_ADMIN_EMAIL and role='super_admin'.
// Nobody (including admins) can change or delete the super_admin account.

export const AuthProvider = ({ children }) => {
  const [currentUser,  setCurrentUser]  = useState(null);
  const [userProfile,  setUserProfile]  = useState(null);
  const [loading,      setLoading]      = useState(true);
  const [error,        setError]        = useState(null);

  // ── Fetch / create user profile in Firestore ────────────────────────────
  const fetchUserProfile = async (uid, defaults = {}) => {
    if (!isFirebaseConfigured || !db) return null;

    const ref  = doc(db, 'users', uid);
    const snap = await getDoc(ref);

    if (snap.exists()) {
      const data = snap.data();
      // Always ensure the super admin email keeps its role
      if (data.email === SUPER_ADMIN_EMAIL && data.role !== 'super_admin') {
        await updateDoc(ref, { role: 'super_admin' });
        data.role = 'super_admin';
      }
      setUserProfile(data);
      return data;
    }

    // ── First time sign-in: check admin_invites for pre-approved admins ──
    let assignedRole = 'student';
    let assignedMembership = 'free';
    const isSuperAdmin = defaults.email === SUPER_ADMIN_EMAIL;

    if (isSuperAdmin) {
      assignedRole       = 'super_admin';
      assignedMembership = 'premium';
    } else {
      // Check if this email was invited as admin
      try {
        const inviteRef  = doc(db, 'admin_invites', (defaults.email || '').toLowerCase());
        const inviteSnap = await getDoc(inviteRef);
        if (inviteSnap.exists()) {
          assignedRole       = 'admin';
          assignedMembership = 'premium';
          // Delete the invite once consumed
          await deleteDoc(inviteRef);

        }
      } catch (_) {}
    }

    const profile = {
      uid,
      name:       defaults.name  || 'User',
      email:      defaults.email || '',
      photoURL:   defaults.photoURL || '',
      role:       assignedRole,
      membership: assignedMembership,
      status:     'active',
      createdAt:  new Date().toISOString(),
      lastLogin:  new Date().toISOString(),
    };

    await setDoc(ref, profile);
    setUserProfile(profile);
    return profile;
  };


  // ── Auth state listener ────────────────────────────────────────────────
  useEffect(() => {
    if (!isFirebaseConfigured || !auth) {
      setLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      if (user) {
        await fetchUserProfile(user.uid, {
          name:     user.displayName,
          email:    user.email,
          photoURL: user.photoURL,
        });
      } else {
        setUserProfile(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  // ── Register ───────────────────────────────────────────────────────────
  const register = async (name, email, password) => {
    setError(null);

    if (!isFirebaseConfigured) {
      throw new Error('Firebase is not configured. Please add your Firebase credentials to the .env file and restart the server.');
    }

    try {
      const { user } = await createUserWithEmailAndPassword(auth, email, password);
      await firebaseUpdateProfile(user, { displayName: name });

      // Determine role — super_admin > admin invite > student
      const emailLower    = email.toLowerCase();
      const isSuperAdmin  = emailLower === SUPER_ADMIN_EMAIL.toLowerCase();
      let assignedRole    = isSuperAdmin ? 'super_admin' : 'student';
      let assignedMem     = isSuperAdmin ? 'premium'     : 'free';

      if (!isSuperAdmin && db) {
        try {
          const inviteRef  = doc(db, 'admin_invites', emailLower);
          const inviteSnap = await getDoc(inviteRef);
          if (inviteSnap.exists()) {
            assignedRole = 'admin';
            assignedMem  = 'premium';
            await deleteDoc(inviteRef);
          }
        } catch (_) {}
      }

      const profile = {
        uid:        user.uid,
        name,
        email:      emailLower,
        photoURL:   '',
        role:       assignedRole,
        membership: assignedMem,
        status:     'active',
        createdAt:  new Date().toISOString(),
        lastLogin:  new Date().toISOString(),
      };

      await setDoc(doc(db, 'users', user.uid), profile);
      setUserProfile(profile);
      return profile;
    } catch (err) {
      const msg = friendlyAuthError(err);
      setError(msg);
      throw new Error(msg);
    }
  };


  // ── Login ──────────────────────────────────────────────────────────────
  const login = async (email, password, rememberMe = true) => {
    setError(null);

    if (!isFirebaseConfigured) {
      throw new Error('Firebase is not configured. Please set up your Firebase credentials first.');
    }

    try {
      if (auth) {
        try {
          await setPersistence(
            auth, 
            rememberMe ? browserLocalPersistence : browserSessionPersistence
          );
        } catch (persistErr) {
          console.warn('Could not set auth persistence:', persistErr);
        }
      }

      const { user }  = await signInWithEmailAndPassword(auth, email, password);
      const profile   = await fetchUserProfile(user.uid, {
        name:  user.displayName,
        email: user.email,
      });

      if (profile?.status === 'suspended') {
        await firebaseSignOut(auth);
        throw new Error('Your account has been suspended. Please contact the platform administrator.');
      }

      // Update lastLogin
      try {
        await updateDoc(doc(db, 'users', user.uid), { lastLogin: new Date().toISOString() });
      } catch (_) {}

      return profile;
    } catch (err) {
      if (err.message.includes('suspended')) throw err;
      const msg = friendlyAuthError(err);
      setError(msg);
      throw new Error(msg);
    }
  };

  // ── Logout ─────────────────────────────────────────────────────────────
  const logout = async () => {
    try {
      if (isFirebaseConfigured && auth) await firebaseSignOut(auth);
      setCurrentUser(null);
      setUserProfile(null);
    } catch (err) {
      console.error('Sign-out error:', err);
    }
  };

  // ── Password Reset ─────────────────────────────────────────────────────
  const resetPassword = async (email) => {
    setError(null);
    try {
      await firebaseSendPasswordReset(auth, email);
      return true;
    } catch (err) {
      const msg = err.code === 'auth/user-not-found'
        ? 'No account found with this email address.'
        : 'Failed to send reset email. Please check the address.';
      setError(msg);
      throw new Error(msg);
    }
  };

  // ── Update own profile (Sanitized: NO self-escalation of role or membership) ──
  const updateUserData = async (updates) => {
    if (!currentUser) return;
    const uid = currentUser.uid;

    // SECURITY: Users CANNOT change their own role, membership, email or UID!
    const safeUpdates = { ...updates };
    delete safeUpdates.role;
    delete safeUpdates.membership;
    delete safeUpdates.email;
    delete safeUpdates.uid;

    const next = { ...userProfile, ...safeUpdates };
    setUserProfile(next);

    if (isFirebaseConfigured && db) {
      try {
        await updateDoc(doc(db, 'users', uid), safeUpdates);
        if (safeUpdates.name && auth?.currentUser) {
          await firebaseUpdateProfile(auth.currentUser, { displayName: safeUpdates.name });
        }
      } catch (err) {
        console.warn('Firestore profile update error:', err);
      }
    }

    return next;
  };

  // ── Authorized Premium Activation (called only through Payment flow) ───────
  const activatePremium = async (paymentDetails = {}) => {
    if (!currentUser || !userProfile) throw new Error("Must be logged in to activate Premium.");
    const uid = currentUser.uid;

    const paymentId = `pay-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
    const paymentRecord = {
      id: paymentId,
      userId: uid,
      userName: userProfile.name,
      userEmail: userProfile.email,
      ...paymentDetails,
      status: paymentDetails.status || 'verified',
      createdAt: new Date().toISOString()
    };

    if (isFirebaseConfigured && db) {
      try {
        await setDoc(doc(db, 'payments', paymentId), paymentRecord);
        await updateDoc(doc(db, 'users', uid), {
          membership: 'premium',
          premiumSince: new Date().toISOString(),
          lastPaymentId: paymentId
        });
      } catch (err) {
        console.warn('Firestore activatePremium error:', err);
      }
    }

    const updatedProfile = { ...userProfile, membership: 'premium' };
    setUserProfile(updatedProfile);
    return paymentRecord;
  };


  // ── Derived role helpers ───────────────────────────────────────────────
  const isSuperAdmin = Boolean(userProfile?.role === 'super_admin');
  const isAdmin      = Boolean(userProfile?.role === 'admin' || userProfile?.role === 'super_admin');
  const isStudent    = Boolean(userProfile && !isAdmin);
  const isPremium    = Boolean(userProfile && (userProfile.membership === 'premium' || isAdmin));
  const isFree       = Boolean(userProfile && userProfile.membership === 'free' && !isAdmin);
  const isGuest      = !currentUser && !userProfile;


  const value = {
    currentUser,
    userProfile,
    loading,
    error,
    setError,
    register,
    login,
    logout,
    resetPassword,
    updateUserData,
    activatePremium,
    isGuest,
    isFree,
    isPremium,
    isAdmin,
    isSuperAdmin,
    isStudent,
    isFirebaseConfigured,
    SUPER_ADMIN_EMAIL,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

// ── Friendly Firebase error messages ─────────────────────────────────────────
function friendlyAuthError(err) {
  switch (err.code) {
    case 'auth/email-already-in-use':
      return 'This email is already registered. Please sign in instead.';
    case 'auth/weak-password':
      return 'Password must be at least 6 characters long.';
    case 'auth/invalid-email':
      return 'Please provide a valid email address.';
    case 'auth/user-not-found':
    case 'auth/wrong-password':
    case 'auth/invalid-credential':
      return 'Invalid email or password. Please check your credentials.';
    case 'auth/too-many-requests':
      return 'Too many failed attempts. Please try again in a few minutes.';
    case 'auth/network-request-failed':
      return 'Network error. Please check your internet connection.';
    default:
      return err.message || 'Authentication failed.';
  }
}
