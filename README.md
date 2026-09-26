# D.TEN Academy | Modern Educational Web App & LMS Platform

A complete, production-ready, responsive **Educational Web Application and Learning Management System (LMS)** designed with modern web architecture, Firebase Authentication, Cloud Firestore, and role-based access control.

---

## 🌟 Key Architecture & Capabilities

1. **4 Distinct User Experiences**:
   - **Guest Users**: Browse public courses, learning apps, interactive tools, search catalog, preview course curriculum, view free guides, and see premium-gated badges with custom conversion modals.
   - **Free Members**: Dedicated student dashboard with enrolled courses, live progress tracking, quiz scores, saved bookmarks, free calculators/apps, and an upgrade prompt.
   - **Premium Members**: Exclusive dashboard featuring Advanced courses (AI, Linear Algebra, Technical Writing), AI Quiz & MCQ Generator studios, 14-day learning streak tracking, verifiable digital completion certificates with print/PDF export, and downloadable formula reference sheets.
   - **Super Administrators**: Complete administrative control center managing users, courses, lessons, quizzes, apps, calculators, educational articles, and system taxonomy categories.

2. **Full Firebase Integration with Intelligent Development Fallback**:
   - Firebase Authentication (Email/Password registration, sign in, sign out, password reset, profile update, session persistence).
   - Cloud Firestore document collections (`users`, `courses`, `enrollments`, `quizResults`, `certificates`, `apps`, `tools`, `content`, `settings`, `notifications`).
   - `firestore.rules` containing role and membership security rules preventing unauthorized client writes.
   - Out-of-the-box local sync simulation layer: The app functions seamlessly for instant review even before Firebase keys are added, and seamlessly switches to live Firebase once `.env` credentials are supplied.

3. **10 Real Working Interactive Tools**:
   - **Percentage Calculator**: Proportions, percentage increase/decrease, reverse percentages.
   - **Weighted Grade Calculator**: Course weighted grading and target forecast.
   - **College GPA Calculator**: 4.0 weighted GPA scale calculation.
   - **Scientific Calculator**: Trigonometric functions, roots, powers, logarithms, and factorials.
   - **Unit Converter**: Length, mass/weight, and digital storage.
   - **AI Quiz Generator (Premium)**: Knowledge domain assessment generator with explanation rationale.
   - **MCQ Generator & Print Studio (Premium)**: 4-option MCQs with full answer keys and printable layout.
   - **Intelligent Study Planner**: Pacing calculator and timetable generator based on target exam dates.
   - **Real-Time Word Counter**: Words, characters, reading time, and speaking duration.
   - **Learning Progress Calculator**: Course completion forecaster based on daily pacing.

4. **12 Complete Seed Courses**:
   1. English Grammar Fundamentals (Free)
   2. Spoken English for Beginners (Free)
   3. Mathematics Fundamentals (Free)
   4. Algebra Essentials (Premium)
   5. English Vocabulary Builder (Free)
   6. Advanced English Grammar (Premium)
   7. Basic Computer Skills (Free)
   8. Introduction to Artificial Intelligence (Premium)
   9. Study Skills & Time Management (Free)
   10. Professional Communication Skills (Premium)
   11. Workplace Safety Fundamentals (Free)
   12. Technical Writing Essentials (Premium)

5. **Gamified Apps & Curated Content Library**:
   - 8 Educational Apps (Grammar Gamified, CrossMath, Safety 24/7, AI Hub, etc.)
   - 12 Educational Content Items (Prepositions, Tenses, Formula Sheets, Safety Checklists, etc.)

---

## 🚀 Quick Start Guide

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Local Development Server
```bash
npm run dev
```

### 3. Build for Production
```bash
npm run build
```

---

## ⚡ Instant Role Evaluation (Demo Switcher)

For instant testing of all four user experiences without needing to re-register:
1. Click the **Demo Roles** pill in the top navigation bar, or use the quick buttons on the **/login** page.
2. Select:
   - **Free Member**: Logs in as Ahmed Khan (4 enrolled courses, 68% progress).
   - **Premium Member**: Logs in as Elena Rostova (Pro badge, streak tracker, certificates, AI generators).
   - **Super Admin**: Logs in as Dr. Admin Sarah (Direct access to `/admin` management panels).
   - Or browse logged out as a **Guest**.

---

## 🔥 Firebase Setup & Production Configuration

### Step 1: Create a Firebase Project
1. Navigate to the [Firebase Console](https://console.firebase.google.com/).
2. Click **Add Project** and name it (e.g. `d-ten-academy`).
3. Disable or enable Google Analytics according to your preference, then click **Create Project**.

### Step 2: Enable Firebase Authentication
1. In the Firebase Console left sidebar, click **Build > Authentication**.
2. Click **Get Started**.
3. Under **Sign-in method**, enable **Email/Password** and click **Save**.

### Step 3: Create Cloud Firestore Database
1. In the left sidebar, click **Build > Firestore Database**.
2. Click **Create Database**.
3. Choose your database location and select **Start in production mode** (or test mode).
4. Deploy the security rules from `firestore.rules` included in this repository.

### Step 4: Configure Environment Credentials
1. In Firebase Console, click the Gear icon (Project Settings) > **General**.
2. Scroll to **Your apps**, click the **Web (`</>`)** icon to register a web app.
3. Copy the configuration values into a `.env` file in the root of this project:

```env
VITE_FIREBASE_API_KEY=AIzaSyYourActualKeyHere
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789012
VITE_FIREBASE_APP_ID=1:123456789012:web:abcdef123456
```

### Step 5: Seed Firestore with Platform Data
1. Log in to the application and navigate to the **Admin Dashboard** (`/admin`).
2. Click the **"Seed / Reset Initial Data"** button at the top.
3. This will automatically batch-write all 12 courses, 8 apps, 10 tools, 12 content items, and categories directly into your live Firestore collections!

---

## 🛡️ Creating the First Super Admin

To safely designate an initial administrative user:
1. Register a new account via the `/register` page with your desired email.
2. In the **Firebase Console**, navigate to **Firestore Database > users collection**.
3. Locate your user document (matched by your user's UID).
4. Update the `role` field value from `"user"` to `"admin"`.
5. Update the `membership` field to `"premium"`.
6. Refresh your application session. Your account will immediately have administrative access to `/admin`.

*(Alternatively, while testing in development, open `/profile` and use the direct role switcher dropdown).*

---

## 🌐 Deploying to Firebase Hosting

This project is pre-configured with `firebase.json` for single-page app (SPA) hosting with URL rewrites:

```bash
# 1. Install Firebase CLI globally (if not already installed)
npm install -g firebase-tools

# 2. Log in to Firebase
firebase login

# 3. Initialize hosting (select existing project and 'dist' directory)
firebase init hosting

# 4. Build the production assets
npm run build

# 5. Deploy to Firebase
firebase deploy --only hosting,firestore:rules
```

---

## 📁 Project Directory Structure

```
├── .env.example              # Environment variables template
├── firebase.json             # Firebase Hosting & Firestore configuration
├── firestore.rules           # Production security rules
├── index.html                # Application root HTML with Plus Jakarta Sans & Inter
├── src/
│   ├── components/
│   │   ├── common/           # Badge, ProgressBar, EmptyState, GlobalSearchModal, PremiumGateModal
│   │   ├── layout/           # Navbar, Footer, DashboardLayout
│   │   └── tools/            # 10 executable interactive tools & calculators
│   ├── config/
│   │   └── firebase.js       # Firebase SDK configuration with live & demo sync fallback
│   ├── context/
│   │   ├── AuthContext.jsx   # Authentication listener, user roles, membership state
│   │   └── ThemeContext.jsx  # Dark/Light theme mode manager
│   ├── data/
│   │   └── seedData.js       # 12 courses, 8 apps, 10 tools, 12 articles, taxonomy categories
│   ├── pages/
│   │   ├── admin/            # AdminDashboard, UserManagement, CourseManagement, AppManagement, ToolManagement, ContentManagement, CategoryManagement
│   │   ├── auth/             # Login, Register, ForgotPassword
│   │   ├── dashboard/        # FreeDashboard, PremiumDashboard, MyCourses, SavedItems, QuizResults, CertificatesPage, Profile, Settings, NotificationsPage
│   │   └── public/           # Home, Courses, CourseDetails, CoursePlayer, Apps, Tools, ContentHub, Pricing, About, Contact
│   ├── routes/
│   │   └── ProtectedRoute.jsx# Role & membership route guards
│   ├── services/
│   │   └── firebaseService.js# Unified Firestore and local store API
│   ├── App.jsx               # Application router
│   ├── index.css             # Tailwind CSS & custom styles
│   └── main.jsx              # React entrypoint
```

---

## 🔒 Security Highlights

- **No hardcoded admin passwords**: All access control is enforced via Firebase Authentication tokens, user document claims, and Firestore security rules.
- **Client & Server Isolation**: Firestore rules prevent users from altering their own `role` or `membership` fields directly.
- **Content Protection**: Premium resources are verified against user membership credentials both in the UI and via database security rules.
