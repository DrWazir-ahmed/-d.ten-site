import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';

// Layout
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { GlobalSearchModal } from './components/common/GlobalSearchModal';
import { ProtectedRoute } from './routes/ProtectedRoute';

// Public Pages
import { Home } from './pages/public/Home';
import { Courses } from './pages/public/Courses';
import { CourseDetails } from './pages/public/CourseDetails';
import { CoursePlayer } from './pages/public/CoursePlayer';
import { Apps } from './pages/public/Apps';
import { Tools } from './pages/public/Tools';
import { ContentHub } from './pages/public/ContentHub';
import { Pricing } from './pages/public/Pricing';
import { About } from './pages/public/About';
import { Contact } from './pages/public/Contact';

// Auth Pages
import { Login } from './pages/auth/Login';
import { Register } from './pages/auth/Register';
import { ForgotPassword } from './pages/auth/ForgotPassword';

// Member Dashboards
import { FreeDashboard } from './pages/dashboard/FreeDashboard';
import { PremiumDashboard } from './pages/dashboard/PremiumDashboard';
import { MyCourses } from './pages/dashboard/MyCourses';
import { SavedItems } from './pages/dashboard/SavedItems';
import { QuizResults } from './pages/dashboard/QuizResults';
import { CertificatesPage } from './pages/dashboard/CertificatesPage';
import { Profile } from './pages/dashboard/Profile';
import { Settings } from './pages/dashboard/Settings';
import { NotificationsPage } from './pages/dashboard/NotificationsPage';

// Admin Dashboards
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { UserManagement } from './pages/admin/UserManagement';
import { CourseManagement } from './pages/admin/CourseManagement';
import { AppManagement } from './pages/admin/AppManagement';
import { ToolManagement } from './pages/admin/ToolManagement';
import { ContentManagement } from './pages/admin/ContentManagement';
import { CategoryManagement } from './pages/admin/CategoryManagement';
import { PaymentManagement } from './pages/admin/PaymentManagement';


const AppContent = () => {
  const location = useLocation();
  const [searchOpen, setSearchOpen] = useState(false);

  // Check if current route is a dedicated dashboard or player view (which have their own custom layouts)
  const isDashboardView = location.pathname.startsWith('/dashboard') || 
                          location.pathname.startsWith('/admin') ||
                          location.pathname === '/profile' ||
                          location.pathname === '/settings' ||
                          location.pathname === '/notifications';

  const isPlayerView = location.pathname.startsWith('/learn');

  const showPublicHeaderFooter = !isDashboardView && !isPlayerView;

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] dark:bg-slate-950 text-[#0F172A] dark:text-slate-100 transition-colors">
      {showPublicHeaderFooter && <Navbar onOpenSearch={() => setSearchOpen(true)} />}

      <div className="flex-1">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/courses/:id" element={<CourseDetails />} />
          <Route path="/apps" element={<Apps />} />
          <Route path="/tools" element={<Tools />} />
          <Route path="/content" element={<ContentHub />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/contact" element={<Contact />} />

          {/* Authentication Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />

          {/* Interactive Learning Player */}
          <Route 
            path="/learn/:id" 
            element={
              <ProtectedRoute>
                <CoursePlayer />
              </ProtectedRoute>
            } 
          />

          {/* Student Dashboards */}
          <Route 
            path="/dashboard/free" 
            element={
              <ProtectedRoute>
                <FreeDashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/dashboard/premium" 
            element={
              <ProtectedRoute requirePremium={true}>
                <PremiumDashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/dashboard/my-courses" 
            element={
              <ProtectedRoute>
                <MyCourses />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/dashboard/saved" 
            element={
              <ProtectedRoute>
                <SavedItems />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/dashboard/quiz-results" 
            element={
              <ProtectedRoute>
                <QuizResults />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/dashboard/certificates" 
            element={
              <ProtectedRoute requirePremium={true}>
                <CertificatesPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/profile" 
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/settings" 
            element={
              <ProtectedRoute>
                <Settings />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/notifications" 
            element={
              <ProtectedRoute>
                <NotificationsPage />
              </ProtectedRoute>
            } 
          />

          {/* Admin Routes */}
          <Route 
            path="/admin" 
            element={
              <ProtectedRoute requireAdmin={true}>
                <AdminDashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin/users" 
            element={
              <ProtectedRoute requireAdmin={true}>
                <UserManagement />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin/courses" 
            element={
              <ProtectedRoute requireAdmin={true}>
                <CourseManagement />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin/apps" 
            element={
              <ProtectedRoute requireAdmin={true}>
                <AppManagement />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin/tools" 
            element={
              <ProtectedRoute requireAdmin={true}>
                <ToolManagement />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin/content" 
            element={
              <ProtectedRoute requireAdmin={true}>
                <ContentManagement />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin/categories" 
            element={
              <ProtectedRoute requireAdmin={true}>
                <CategoryManagement />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin/payments" 
            element={
              <ProtectedRoute requireAdmin={true}>
                <PaymentManagement />
              </ProtectedRoute>
            } 
          />


          {/* Fallback */}
          <Route path="*" element={<Home />} />
        </Routes>
      </div>

      {showPublicHeaderFooter && <Footer />}

      {/* Global Command / Search Palette */}
      <GlobalSearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </div>
  );
};

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <AppContent />
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}
