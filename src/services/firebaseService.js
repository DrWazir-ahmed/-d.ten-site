import { 
  db, 
  collection, 
  doc, 
  getDoc, 
  setDoc, 
  updateDoc, 
  deleteDoc, 
  getDocs, 
  query, 
  where, 
  orderBy, 
  serverTimestamp,
  isFirebaseConfigured 
} from '../config/firebase';
import { 
  INITIAL_COURSES, 
  INITIAL_APPS, 
  INITIAL_TOOLS, 
  INITIAL_CONTENT, 
  INITIAL_CATEGORIES 
} from '../data/seedData';

// Storage keys for offline / fallback / development simulation mode
const STORAGE_PREFIX = 'dten_lms_';
const getKey = (name) => `${STORAGE_PREFIX}${name}`;

const getLocal = (key, fallback) => {
  try {
    const data = localStorage.getItem(getKey(key));
    return data ? JSON.parse(data) : fallback;
  } catch (e) {
    return fallback;
  }
};

const setLocal = (key, data) => {
  try {
    localStorage.setItem(getKey(key), JSON.stringify(data));
  } catch (e) {
    console.error("Storage error:", e);
  }
};

// Initialize fallback local storage with seed data if not present
export const initializeLocalStore = () => {
  const existingCourses = getLocal('courses', null);
  if (!existingCourses) {
    setLocal('courses', INITIAL_COURSES);
  } else {
    // Helper to sanitize any slide markers from text
    const cleanSlideMarkers = (text) => {
      if (!text || typeof text !== 'string') return text;
      return text.replace(/(#{1,4}\s*)Slide\s*\d+\s*[:.-]\s*/gi, '$1')
                 .replace(/^Slide\s*\d+\s*[:.-]\s*/gim, '');
    };

    const cleanLesson = (les) => ({
      ...les,
      title: cleanSlideMarkers(les.title),
      content: cleanSlideMarkers(les.content)
    });

    const cleanModule = (mod) => ({
      ...mod,
      title: cleanSlideMarkers(mod.title),
      topics: (mod.topics || []).map(cleanLesson),
      submodules: (mod.submodules || []).map(sm => ({
        ...sm,
        title: cleanSlideMarkers(sm.title),
        topics: (sm.topics || []).map(cleanLesson)
      }))
    });

    // Synchronize instructor name, remove slide numbers, and ensure structured modules are available
    const updatedCourses = existingCourses.map(course => {
      // Sync complete curriculum for AI course to guarantee slide numbers are removed and curriculum is fresh
      if (course.id === 'course-8' || course.title === 'Introduction to Artificial Intelligence') {
        const seedAi = INITIAL_COURSES.find(c => c.id === 'course-8');
        if (seedAi) {
          return {
            ...course,
            ...seedAi,
            lessons: (seedAi.lessons || []).map(cleanLesson),
            modules: (seedAi.modules || []).map(cleanModule),
            instructor: course.instructor || "Dr Wazir Ahmed"
          };
        }
      }

      let modules = course.modules;
      if (!modules || modules.length === 0) {
        if (course.lessons && course.lessons.length > 0) {
          const half = Math.ceil(course.lessons.length / 2);
          if (course.lessons.length >= 4) {
            modules = [
              {
                id: `${course.id}-mod-1`,
                title: 'Module 1: Foundations & Core Concepts',
                description: 'Key principles, baseline frameworks, and conceptual definitions.',
                topics: course.lessons.slice(0, half)
              },
              {
                id: `${course.id}-mod-2`,
                title: 'Module 2: Advanced Application & Mastery',
                description: 'Practical drills, scenarios, and end-of-module assessments.',
                topics: course.lessons.slice(half)
              }
            ];
          } else {
            modules = [
              {
                id: `${course.id}-mod-1`,
                title: 'Module 1: Comprehensive Course Curriculum',
                description: 'All core learning units and topics for this course.',
                topics: course.lessons
              }
            ];
          }
        }
      }

      return {
        ...course,
        instructor: course.instructor ? "Dr Wazir Ahmed" : course.instructor,
        lessons: (course.lessons || []).map(cleanLesson),
        modules: (modules || []).map(cleanModule)
      };
    });

    // Make sure newly added courses in INITIAL_COURSES (like English Tenses Orientation, course-13) are present and fresh
    INITIAL_COURSES.forEach(seedCourse => {
      const idx = updatedCourses.findIndex(c => c.id === seedCourse.id || c.title === seedCourse.title);
      if (idx === -1) {
        updatedCourses.push(seedCourse);
      } else if (seedCourse.id === 'course-13' || seedCourse.title === 'English Tenses Orientation' || seedCourse.id === 'course-14' || seedCourse.title === 'Active and Passive Voice Mastery') {
        updatedCourses[idx] = {
          ...updatedCourses[idx],
          ...seedCourse,
          instructor: "Dr Wazir Ahmed"
        };
      }
    });

    setLocal('courses', updatedCourses);
  }

  if (!getLocal('apps', null)) setLocal('apps', INITIAL_APPS);
  if (!getLocal('tools', null)) setLocal('tools', INITIAL_TOOLS);

  const existingContent = getLocal('content', null);
  if (!existingContent) {
    setLocal('content', INITIAL_CONTENT);
  } else {
    const existingIds = new Set(existingContent.map(item => item.id));
    const missingItems = INITIAL_CONTENT.filter(item => !existingIds.has(item.id));
    const updatedContent = [
      ...existingContent.map(item => ({
        ...item,
        author: item.author ? "Dr Wazir Ahmed" : item.author
      })),
      ...missingItems
    ];
    setLocal('content', updatedContent);
  }

  const existingCategories = getLocal('categories', null);
  if (!existingCategories) {
    setLocal('categories', INITIAL_CATEGORIES);
  } else {
    // ensure new category options exist
    const mergedContentCats = Array.from(new Set([...(existingCategories.content || []), ...(INITIAL_CATEGORIES.content || [])]));
    setLocal('categories', {
      ...existingCategories,
      content: mergedContentCats
    });
  }
  const existingUsers = getLocal('users', null);
  if (!existingUsers) {
    setLocal('users', [
      {
        uid: "demo-free-user",
        name: "Ahmed Khan",
        email: "ahmed@example.com",
        role: "user",
        membership: "free",
        status: "active",
        createdAt: "2025-01-10T10:00:00.000Z",
        lastLogin: new Date().toISOString()
      },
      {
        uid: "demo-premium-user",
        name: "Elena Rostova",
        email: "elena@example.com",
        role: "user",
        membership: "premium",
        status: "active",
        createdAt: "2025-01-05T09:00:00.000Z",
        lastLogin: new Date().toISOString()
      },
      {
        uid: "demo-admin-user",
        name: "Dr Wazir Ahmed",
        email: "admin@dten.edu",
        role: "admin",
        membership: "premium",
        status: "active",
        createdAt: "2024-12-01T08:00:00.000Z",
        lastLogin: new Date().toISOString()
      }
    ]);
  } else {
    const updatedUsers = existingUsers.map(u => 
      u.role === 'admin' ? { ...u, name: "Dr Wazir Ahmed" } : u
    );
    setLocal('users', updatedUsers);
  }
  if (!getLocal('enrollments', null)) {
    // Free member default demo stats: 4 courses enrolled, 2 completed, 68% progress
    setLocal('enrollments', [
      {
        id: "enr-1",
        userId: "demo-free-user",
        courseId: "course-1",
        courseTitle: "English Grammar Fundamentals",
        enrolledAt: "2025-01-15T10:00:00.000Z",
        completedLessons: ["les-1-1", "les-1-2", "les-1-3", "les-1-4", "les-1-5"],
        totalLessons: 6,
        progress: 83,
        completed: false,
        lastAccessed: new Date().toISOString()
      },
      {
        id: "enr-2",
        userId: "demo-free-user",
        courseId: "course-2",
        courseTitle: "Spoken English for Beginners",
        enrolledAt: "2025-01-20T10:00:00.000Z",
        completedLessons: ["les-2-1", "les-2-2", "les-2-3", "les-2-4", "les-2-5"],
        totalLessons: 5,
        progress: 100,
        completed: true,
        completedAt: "2025-01-28T14:30:00.000Z",
        lastAccessed: "2025-01-28T14:30:00.000Z"
      },
      {
        id: "enr-3",
        userId: "demo-free-user",
        courseId: "course-3",
        courseTitle: "Mathematics Fundamentals",
        enrolledAt: "2025-01-22T10:00:00.000Z",
        completedLessons: ["les-3-1", "les-3-2", "les-3-3"],
        totalLessons: 6,
        progress: 50,
        completed: false,
        lastAccessed: new Date().toISOString()
      },
      {
        id: "enr-4",
        userId: "demo-free-user",
        courseId: "course-9",
        courseTitle: "Study Skills & Time Management",
        enrolledAt: "2025-02-01T10:00:00.000Z",
        completedLessons: ["les-9-1", "les-9-2", "les-9-3", "les-9-4"],
        totalLessons: 4,
        progress: 100,
        completed: true,
        completedAt: "2025-02-10T12:00:00.000Z",
        lastAccessed: "2025-02-10T12:00:00.000Z"
      }
    ]);
  }
  if (!getLocal('certificates', null)) {
    setLocal('certificates', [
      {
        id: "cert-1",
        userId: "demo-free-user",
        courseId: "course-2",
        courseTitle: "Spoken English for Beginners",
        studentName: "Ahmed Khan",
        issuedDate: "2025-01-28",
        certificateNumber: "DTEN-2025-8491",
        grade: "Excellence (94%)"
      },
      {
        id: "cert-2",
        userId: "demo-free-user",
        courseId: "course-9",
        courseTitle: "Study Skills & Time Management",
        studentName: "Ahmed Khan",
        issuedDate: "2025-02-10",
        certificateNumber: "DTEN-2025-9204",
        grade: "High Honors (98%)"
      }
    ]);
  }
  if (!getLocal('quizResults', null)) {
    setLocal('quizResults', [
      {
        id: "qr-1",
        userId: "demo-free-user",
        courseId: "course-2",
        courseTitle: "Spoken English for Beginners",
        quizTitle: "Spoken English Practice Quiz",
        score: 100,
        passed: true,
        date: "2025-01-28"
      },
      {
        id: "qr-2",
        userId: "demo-free-user",
        courseId: "course-9",
        courseTitle: "Study Skills & Time Management",
        quizTitle: "Study Methods Quiz",
        score: 100,
        passed: true,
        date: "2025-02-10"
      },
      {
        id: "qr-3",
        userId: "demo-free-user",
        courseId: "course-3",
        courseTitle: "Mathematics Fundamentals",
        quizTitle: "Math Fundamentals Test",
        score: 85,
        passed: true,
        date: "2025-02-14"
      }
    ]);
  }
  if (!getLocal('notifications', null)) {
    setLocal('notifications', [
      {
        id: "notif-1",
        userId: "demo-free-user",
        title: "Welcome to D.TEN Academy!",
        message: "Your learning journey begins here. Explore 12+ free courses, interactive tools, and study materials.",
        type: "welcome",
        read: true,
        createdAt: "2025-01-15T08:00:00.000Z"
      },
      {
        id: "notif-2",
        userId: "demo-free-user",
        title: "Course 80% Complete",
        message: "You're almost there! English Grammar Fundamentals is 83% completed.",
        type: "progress",
        read: false,
        createdAt: new Date().toISOString()
      },
      {
        id: "notif-3",
        userId: "demo-free-user",
        title: "Certificate Earned",
        message: "Congratulations! You completed Spoken English for Beginners and your verified certificate is ready.",
        type: "certificate",
        read: true,
        createdAt: "2025-01-28T14:35:00.000Z"
      }
    ]);
  }
  if (!getLocal('bookmarks', null)) {
    setLocal('bookmarks', [
      { id: "bm-1", userId: "demo-free-user", itemType: "tool", itemId: "tool-1", title: "Percentage Calculator" },
      { id: "bm-2", userId: "demo-free-user", itemType: "content", itemId: "content-1", title: "20 Most Common Prepositions" }
    ]);
  }
};

// Call initialization
initializeLocalStore();

/* =========================================================================
   COURSES SERVICE
   ========================================================================= */

export const getCourses = async () => {
  let list = [];
  if (isFirebaseConfigured && db) {
    try {
      const q = query(collection(db, "courses"));
      const snapshot = await getDocs(q);
      if (!snapshot.empty) {
        list = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      }
    } catch (err) {
      console.warn("Firestore fetch failed, using local store:", err);
    }
  }
  if (!list || list.length === 0) {
    list = getLocal('courses', INITIAL_COURSES) || [];
  }

  // Ensure newly added seed courses are always present in the course catalog
  const existingIds = new Set(list.map(c => c.id));
  INITIAL_COURSES.forEach(seed => {
    if (!existingIds.has(seed.id)) {
      list.push(seed);
    }
  });

  return list;
};

export const getCourseById = async (id) => {
  let course = null;
  if (isFirebaseConfigured && db) {
    try {
      const docRef = doc(db, "courses", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        course = { id: docSnap.id, ...docSnap.data() };
      }
    } catch (err) {
      console.warn("Firestore fetch failed, using local store:", err);
    }
  }
  if (!course) {
    const courses = getLocal('courses', INITIAL_COURSES);
    course = (courses || []).find(c => c.id === id) || null;
  }
  // Robust fallback: if still not found in cache, check INITIAL_COURSES directly
  if (!course) {
    course = INITIAL_COURSES.find(c => c.id === id) || null;
  }

  if (course) {
    // Ensure comprehensive courses have complete curriculum
    if (course.id === 'course-8' || course.title === 'Introduction to Artificial Intelligence') {
      const seedAi = INITIAL_COURSES.find(c => c.id === 'course-8');
      if (seedAi) {
        course = {
          ...course,
          ...seedAi,
          instructor: course.instructor || "Dr Wazir Ahmed"
        };
      }
    }

    if (course.id === 'course-13' || course.title === 'English Tenses Orientation') {
      const seedTenses = INITIAL_COURSES.find(c => c.id === 'course-13');
      if (seedTenses && (!course.lessons || course.lessons.length === 0)) {
        course = {
          ...course,
          ...seedTenses,
          instructor: "Dr Wazir Ahmed"
        };
      }
    }

    if (course.id === 'course-14' || course.title === 'Active and Passive Voice Mastery') {
      const seedAp = INITIAL_COURSES.find(c => c.id === 'course-14');
      if (seedAp) {
        course = {
          ...course,
          ...seedAp,
          instructor: "Dr Wazir Ahmed"
        };
      }
    }

    const cleanSlideMarkers = (text) => {
      if (!text || typeof text !== 'string') return text;
      return text.replace(/(#{1,4}\s*)Slide\s*\d+\s*[:.-]\s*/gi, '$1')
                 .replace(/^Slide\s*\d+\s*[:.-]\s*/gim, '');
    };

    const cleanLesson = (les) => ({
      ...les,
      title: cleanSlideMarkers(les.title),
      content: cleanSlideMarkers(les.content)
    });

    course = {
      ...course,
      lessons: (course.lessons || []).map(cleanLesson),
      modules: (course.modules || []).map(mod => ({
        ...mod,
        title: cleanSlideMarkers(mod.title),
        topics: (mod.topics || []).map(cleanLesson),
        submodules: (mod.submodules || []).map(sm => ({
          ...sm,
          title: cleanSlideMarkers(sm.title),
          topics: (sm.topics || []).map(cleanLesson)
        }))
      }))
    };
  }

  return course;
};

export const createCourse = async (courseData) => {
  const newCourse = {
    ...courseData,
    id: courseData.id || `course-${Date.now()}`,
    createdDate: new Date().toISOString().split('T')[0],
    rating: courseData.rating || 5.0,
    reviewsCount: courseData.reviewsCount || 0,
    status: courseData.status || 'published'
  };

  if (isFirebaseConfigured && db) {
    try {
      await setDoc(doc(db, "courses", newCourse.id), newCourse);
    } catch (err) {
      console.warn("Firestore save error:", err);
    }
  }

  const courses = getLocal('courses', INITIAL_COURSES);
  const updated = [newCourse, ...courses];
  setLocal('courses', updated);
  return newCourse;
};

export const updateCourse = async (id, courseData) => {
  if (isFirebaseConfigured && db) {
    try {
      await updateDoc(doc(db, "courses", id), courseData);
    } catch (err) {
      console.warn("Firestore update error:", err);
    }
  }

  const courses = getLocal('courses', INITIAL_COURSES);
  const updated = courses.map(c => c.id === id ? { ...c, ...courseData } : c);
  setLocal('courses', updated);
  return updated.find(c => c.id === id);
};

export const deleteCourse = async (id) => {
  if (isFirebaseConfigured && db) {
    try {
      await deleteDoc(doc(db, "courses", id));
    } catch (err) {
      console.warn("Firestore delete error:", err);
    }
  }

  const courses = getLocal('courses', INITIAL_COURSES);
  const updated = courses.filter(c => c.id !== id);
  setLocal('courses', updated);
  return true;
};

/* =========================================================================
   APPS SERVICE
   ========================================================================= */

export const getApps = async () => {
  if (isFirebaseConfigured && db) {
    try {
      const q = query(collection(db, "apps"));
      const snapshot = await getDocs(q);
      if (!snapshot.empty) {
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      }
    } catch (err) {
      console.warn("Firestore getApps failed, using local store:", err);
    }
  }
  return getLocal('apps', INITIAL_APPS);
};

export const createApp = async (appData) => {
  const newApp = {
    ...appData,
    id: appData.id || `app-${Date.now()}`,
    status: appData.status || 'published'
  };

  if (isFirebaseConfigured && db) {
    try {
      await setDoc(doc(db, "apps", newApp.id), newApp);
    } catch (err) {
      console.warn("Firestore createApp error:", err);
    }
  }

  const apps = getLocal('apps', INITIAL_APPS);
  const updated = [newApp, ...apps];
  setLocal('apps', updated);
  return newApp;
};

export const updateApp = async (id, appData) => {
  if (isFirebaseConfigured && db) {
    try {
      await updateDoc(doc(db, "apps", id), appData);
    } catch (err) {
      console.warn("Firestore updateApp error:", err);
    }
  }

  const apps = getLocal('apps', INITIAL_APPS);
  const updated = apps.map(a => a.id === id ? { ...a, ...appData } : a);
  setLocal('apps', updated);
  return updated.find(a => a.id === id);
};

export const deleteApp = async (id) => {
  if (isFirebaseConfigured && db) {
    try {
      await deleteDoc(doc(db, "apps", id));
    } catch (err) {
      console.warn("Firestore deleteApp error:", err);
    }
  }

  const apps = getLocal('apps', INITIAL_APPS);
  const updated = apps.filter(a => a.id !== id);
  setLocal('apps', updated);
  return true;
};

/* =========================================================================
   TOOLS SERVICE
   ========================================================================= */

export const getTools = async () => {
  if (isFirebaseConfigured && db) {
    try {
      const q = query(collection(db, "tools"));
      const snapshot = await getDocs(q);
      if (!snapshot.empty) {
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      }
    } catch (err) {
      console.warn("Firestore getTools failed, using local store:", err);
    }
  }
  return getLocal('tools', INITIAL_TOOLS);
};

export const createTool = async (toolData) => {
  const newTool = {
    ...toolData,
    id: toolData.id || `tool-${Date.now()}`,
    status: toolData.status || 'published'
  };

  if (isFirebaseConfigured && db) {
    try {
      await setDoc(doc(db, "tools", newTool.id), newTool);
    } catch (err) {
      console.warn("Firestore createTool error:", err);
    }
  }

  const tools = getLocal('tools', INITIAL_TOOLS);
  const updated = [newTool, ...tools];
  setLocal('tools', updated);
  return newTool;
};

export const updateTool = async (id, toolData) => {
  if (isFirebaseConfigured && db) {
    try {
      await updateDoc(doc(db, "tools", id), toolData);
    } catch (err) {
      console.warn("Firestore updateTool error:", err);
    }
  }

  const tools = getLocal('tools', INITIAL_TOOLS);
  const updated = tools.map(t => t.id === id ? { ...t, ...toolData } : t);
  setLocal('tools', updated);
  return updated.find(t => t.id === id);
};

export const deleteTool = async (id) => {
  if (isFirebaseConfigured && db) {
    try {
      await deleteDoc(doc(db, "tools", id));
    } catch (err) {
      console.warn("Firestore deleteTool error:", err);
    }
  }

  const tools = getLocal('tools', INITIAL_TOOLS);
  const updated = tools.filter(t => t.id !== id);
  setLocal('tools', updated);
  return true;
};

/* =========================================================================
   EDUCATIONAL CONTENT SERVICE
   ========================================================================= */

export const getContent = async () => {
  if (isFirebaseConfigured && db) {
    try {
      const q = query(collection(db, "content"));
      const snapshot = await getDocs(q);
      if (!snapshot.empty) {
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      }
    } catch (err) {
      console.warn("Firestore getContent failed, using local store:", err);
    }
  }
  const localItems = getLocal('content', INITIAL_CONTENT);
  const localIds = new Set(localItems.map(item => item.id));
  const missing = INITIAL_CONTENT.filter(item => !localIds.has(item.id));
  if (missing.length > 0) {
    const merged = [...localItems, ...missing];
    setLocal('content', merged);
    return merged;
  }
  return localItems;
};

export const createContent = async (itemData) => {
  const newItem = {
    ...itemData,
    id: itemData.id || `content-${Date.now()}`,
    publishDate: itemData.publishDate || new Date().toISOString().split('T')[0],
    status: itemData.status || 'published'
  };

  if (isFirebaseConfigured && db) {
    try {
      await setDoc(doc(db, "content", newItem.id), newItem);
    } catch (err) {
      console.warn("Firestore createContent error:", err);
    }
  }

  const content = getLocal('content', INITIAL_CONTENT);
  const updated = [newItem, ...content];
  setLocal('content', updated);
  return newItem;
};

export const updateContent = async (id, itemData) => {
  if (isFirebaseConfigured && db) {
    try {
      await updateDoc(doc(db, "content", id), itemData);
    } catch (err) {
      console.warn("Firestore updateContent error:", err);
    }
  }

  const content = getLocal('content', INITIAL_CONTENT);
  const updated = content.map(c => c.id === id ? { ...c, ...itemData } : c);
  setLocal('content', updated);
  return updated.find(c => c.id === id);
};

export const deleteContent = async (id) => {
  if (isFirebaseConfigured && db) {
    try {
      await deleteDoc(doc(db, "content", id));
    } catch (err) {
      console.warn("Firestore deleteContent error:", err);
    }
  }

  const content = getLocal('content', INITIAL_CONTENT);
  const updated = content.filter(c => c.id !== id);
  setLocal('content', updated);
  return true;
};

/* =========================================================================
   CATEGORIES SERVICE
   ========================================================================= */

export const getCategories = async () => {
  if (isFirebaseConfigured && db) {
    try {
      const docRef = doc(db, "settings", "categories");
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return docSnap.data();
      }
    } catch (err) {
      console.warn("Firestore getCategories failed:", err);
    }
  }
  return getLocal('categories', INITIAL_CATEGORIES);
};

export const updateCategories = async (categoriesData) => {
  if (isFirebaseConfigured && db) {
    try {
      await setDoc(doc(db, "settings", "categories"), categoriesData);
    } catch (err) {
      console.warn("Firestore updateCategories error:", err);
    }
  }
  setLocal('categories', categoriesData);
  return categoriesData;
};

/* =========================================================================
   PAYMENTS & REVENUE SERVICE (DIRECT ACCOUNT INTEGRATION)
   ========================================================================= */

export const DEFAULT_PAYMENT_CONFIG = {
  accountTitle: "Dr Wazir Ahmed",
  bankName: "Meezan Bank Limited",
  accountNumber: "01020304050607",
  iban: "PK00MEZN0000000102030405",
  jazzCashNumber: "0300-1234567",
  jazzCashTitle: "Dr Wazir Ahmed",
  easyPaisaNumber: "0300-1234567",
  easyPaisaTitle: "Dr Wazir Ahmed",
  raastId: "03001234567",
  stripePaymentLink: "",
  monthlyPricePKR: 2500,
  monthlyPriceUSD: 14,
  annualPricePKR: 18000,
  annualPriceUSD: 108,
  instructions: "Transfer the subscription fee using any method below. Enter your Transaction Reference (TID) to activate your Premium Membership immediately.",
  activeMethods: {
    bankTransfer: true,
    jazzCash: true,
    easyPaisa: true,
    raast: true,
    cardOnline: false
  }
};

export const getPaymentConfig = async () => {
  if (isFirebaseConfigured && db) {
    try {
      const docRef = doc(db, "settings", "payment_config");
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return { ...DEFAULT_PAYMENT_CONFIG, ...docSnap.data() };
      }
    } catch (err) {
      console.warn("Firestore getPaymentConfig failed:", err);
    }
  }
  return getLocal('payment_config', DEFAULT_PAYMENT_CONFIG);
};

export const updatePaymentConfig = async (config) => {
  const merged = { ...DEFAULT_PAYMENT_CONFIG, ...config, updatedAt: new Date().toISOString() };
  if (isFirebaseConfigured && db) {
    try {
      await setDoc(doc(db, "settings", "payment_config"), merged);
    } catch (err) {
      console.warn("Firestore updatePaymentConfig error:", err);
    }
  }
  setLocal('payment_config', merged);
  return merged;
};

export const getAllPayments = async () => {
  if (isFirebaseConfigured && db) {
    try {
      const q = query(collection(db, "payments"));
      const snapshot = await getDocs(q);
      if (!snapshot.empty) {
        const list = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
        list.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
        return list;
      }
    } catch (err) {
      console.warn("Firestore getAllPayments error:", err);
    }
  }
  return getLocal('payments', []);
};

export const recordPaymentAndUpgrade = async (paymentData) => {
  const paymentId = `pay-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
  const record = {
    id: paymentId,
    ...paymentData,
    status: paymentData.status || 'verified',
    createdAt: new Date().toISOString()
  };

  // 1. Record transaction in Firestore
  if (isFirebaseConfigured && db) {
    try {
      await setDoc(doc(db, "payments", paymentId), record);
      // Upgrade user's membership to premium in Firestore
      if (paymentData.userId) {
        await updateDoc(doc(db, "users", paymentData.userId), {
          membership: 'premium',
          premiumSince: new Date().toISOString(),
          lastPaymentId: paymentId
        });
      }
    } catch (err) {
      console.warn("Firestore recordPaymentAndUpgrade error:", err);
    }
  }

  // 2. Local fallback sync
  const existingPayments = getLocal('payments', []);
  setLocal('payments', [record, ...existingPayments]);

  if (paymentData.userId) {
    const users = getLocal('users', []);
    const updatedUsers = users.map(u => u.uid === paymentData.userId ? { ...u, membership: 'premium' } : u);
    setLocal('users', updatedUsers);

    await createNotification(
      paymentData.userId,
      `🎉 Payment of ${paymentData.currency} ${paymentData.amount} received! Your Premium Membership is now active.`,
      "completion"
    );
  }

  return record;
};

export const updatePaymentStatus = async (paymentId, status) => {
  if (isFirebaseConfigured && db) {
    try {
      await updateDoc(doc(db, "payments", paymentId), { status });
    } catch (err) {
      console.warn("Firestore updatePaymentStatus error:", err);
    }
  }
  const payments = getLocal('payments', []);
  const updated = payments.map(p => p.id === paymentId ? { ...p, status } : p);
  setLocal('payments', updated);
  return true;
};


/* =========================================================================
   USER ENROLLMENT & PROGRESS SERVICE
   ========================================================================= */

export const getUserEnrollments = async (userId) => {
  if (!userId) return [];
  if (isFirebaseConfigured && db) {
    try {
      const q = query(collection(db, "enrollments"), where("userId", "==", userId));
      const snapshot = await getDocs(q);
      if (!snapshot.empty) {
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      }
    } catch (err) {
      console.warn("Firestore getUserEnrollments failed:", err);
    }
  }
  const enrollments = getLocal('enrollments', []);
  return enrollments.filter(e => e.userId === userId);
};

export const enrollInCourse = async (userId, course) => {
  const existing = await getUserEnrollments(userId);
  const alreadyEnrolled = existing.find(e => e.courseId === course.id);
  if (alreadyEnrolled) return alreadyEnrolled;

  const newEnrollment = {
    id: `enr-${Date.now()}`,
    userId,
    courseId: course.id,
    courseTitle: course.title,
    enrolledAt: new Date().toISOString(),
    completedLessons: [],
    totalLessons: course.lessonCount || course.lessons?.length || 1,
    progress: 0,
    completed: false,
    lastAccessed: new Date().toISOString()
  };

  if (isFirebaseConfigured && db) {
    try {
      await setDoc(doc(db, "enrollments", newEnrollment.id), newEnrollment);
    } catch (err) {
      console.warn("Firestore enroll error:", err);
    }
  }

  const all = getLocal('enrollments', []);
  setLocal('enrollments', [newEnrollment, ...all]);

  // Create notification
  await createNotification(userId, `You successfully enrolled in "${course.title}". Start your first lesson!`, "enrollment");

  return newEnrollment;
};

export const updateLessonProgress = async (userId, courseId, lessonId, isCompleted = true) => {
  const allEnrollments = getLocal('enrollments', []);
  const index = allEnrollments.findIndex(e => e.userId === userId && e.courseId === courseId);
  
  if (index === -1) return null;

  const enrollment = { ...allEnrollments[index] };
  let completedLessons = Array.isArray(enrollment.completedLessons) ? [...enrollment.completedLessons] : [];

  if (isCompleted && !completedLessons.includes(lessonId)) {
    completedLessons.push(lessonId);
  } else if (!isCompleted && completedLessons.includes(lessonId)) {
    completedLessons = completedLessons.filter(id => id !== lessonId);
  }

  const progress = Math.min(100, Math.round((completedLessons.length / (enrollment.totalLessons || 1)) * 100));
  const isNowCompleted = progress >= 100;

  enrollment.completedLessons = completedLessons;
  enrollment.progress = progress;
  enrollment.lastAccessed = new Date().toISOString();

  if (isNowCompleted && !enrollment.completed) {
    enrollment.completed = true;
    enrollment.completedAt = new Date().toISOString();
  }

  allEnrollments[index] = enrollment;
  setLocal('enrollments', allEnrollments);

  if (isFirebaseConfigured && db) {
    try {
      await updateDoc(doc(db, "enrollments", enrollment.id), {
        completedLessons,
        progress,
        completed: enrollment.completed,
        completedAt: enrollment.completedAt || null,
        lastAccessed: enrollment.lastAccessed
      });
    } catch (err) {
      console.warn("Firestore updateLessonProgress error:", err);
    }
  }

  // Check notifications
  if (isNowCompleted) {
    await createNotification(userId, `Congratulations! You have completed 100% of "${enrollment.courseTitle}"!`, "completion");
  } else if (progress >= 80 && progress < 90) {
    await createNotification(userId, `Great momentum! Your course "${enrollment.courseTitle}" is ${progress}% complete.`, "progress");
  }

  return enrollment;
};

/* =========================================================================
   QUIZZES & RESULTS SERVICE
   ========================================================================= */

export const recordQuizResult = async (userId, courseId, courseTitle, quizTitle, score, passed) => {
  const newResult = {
    id: `qr-${Date.now()}`,
    userId,
    courseId,
    courseTitle,
    quizTitle,
    score,
    passed,
    date: new Date().toISOString().split('T')[0]
  };

  if (isFirebaseConfigured && db) {
    try {
      await setDoc(doc(db, "quizResults", newResult.id), newResult);
    } catch (err) {
      console.warn("Firestore quiz result error:", err);
    }
  }

  const results = getLocal('quizResults', []);
  setLocal('quizResults', [newResult, ...results]);

  await createNotification(
    userId, 
    `You scored ${score}% on "${quizTitle}" (${passed ? 'Passed 🎉' : 'Needs Review'}).`, 
    "quiz"
  );

  return newResult;
};

export const getUserQuizResults = async (userId) => {
  if (!userId) return [];
  if (isFirebaseConfigured && db) {
    try {
      const q = query(collection(db, "quizResults"), where("userId", "==", userId));
      const snapshot = await getDocs(q);
      if (!snapshot.empty) {
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      }
    } catch (err) {
      console.warn("Firestore getUserQuizResults error:", err);
    }
  }
  const results = getLocal('quizResults', []);
  return results.filter(r => r.userId === userId);
};

/* =========================================================================
   CERTIFICATES SERVICE
   ========================================================================= */

export const getUserCertificates = async (userId) => {
  if (!userId) return [];
  if (isFirebaseConfigured && db) {
    try {
      const q = query(collection(db, "certificates"), where("userId", "==", userId));
      const snapshot = await getDocs(q);
      if (!snapshot.empty) {
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      }
    } catch (err) {
      console.warn("Firestore getUserCertificates error:", err);
    }
  }
  const certs = getLocal('certificates', []);
  return certs.filter(c => c.userId === userId);
};

export const issueCertificate = async (userId, courseId, courseTitle, studentName, grade = "Verified Completion (95%)") => {
  const certs = getLocal('certificates', []);
  const existing = certs.find(c => c.userId === userId && c.courseId === courseId);
  if (existing) return existing;

  const newCert = {
    id: `cert-${Date.now()}`,
    userId,
    courseId,
    courseTitle,
    studentName: studentName || "Student",
    issuedDate: new Date().toISOString().split('T')[0],
    certificateNumber: `DTEN-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
    grade
  };

  if (isFirebaseConfigured && db) {
    try {
      await setDoc(doc(db, "certificates", newCert.id), newCert);
    } catch (err) {
      console.warn("Firestore issueCertificate error:", err);
    }
  }

  setLocal('certificates', [newCert, ...certs]);
  await createNotification(userId, `Official Certificate issued for "${courseTitle}". View & download from your dashboard!`, "certificate");

  return newCert;
};

/* =========================================================================
   BOOKMARKS / SAVED ITEMS SERVICE
   ========================================================================= */

export const getUserBookmarks = async (userId) => {
  if (!userId) return [];
  const bookmarks = getLocal('bookmarks', []);
  return bookmarks.filter(b => b.userId === userId);
};

export const toggleBookmark = async (userId, item) => {
  const bookmarks = getLocal('bookmarks', []);
  const exists = bookmarks.find(b => b.userId === userId && b.itemId === item.id);

  let updated;
  if (exists) {
    updated = bookmarks.filter(b => !(b.userId === userId && b.itemId === item.id));
  } else {
    const newBm = {
      id: `bm-${Date.now()}`,
      userId,
      itemId: item.id,
      itemType: item.itemType || 'course',
      title: item.title || item.name,
      category: item.category || 'General',
      addedAt: new Date().toISOString()
    };
    updated = [newBm, ...bookmarks];
  }

  setLocal('bookmarks', updated);
  return !exists; // returns true if now bookmarked, false if removed
};

/* =========================================================================
   NOTIFICATIONS SERVICE
   ========================================================================= */

export const getUserNotifications = async (userId) => {
  if (!userId) return [];
  const notifs = getLocal('notifications', []);
  return notifs.filter(n => n.userId === userId);
};

export const createNotification = async (userId, message, type = "info") => {
  const newNotif = {
    id: `notif-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
    userId,
    title: type === 'welcome' ? 'Welcome to D.TEN Academy!' :
           type === 'completion' ? 'Course Completed! 🎓' :
           type === 'certificate' ? 'New Certificate Issued 📜' :
           type === 'quiz' ? 'Quiz Assessment Update' :
           type === 'enrollment' ? 'Course Enrolled' : 'Update',
    message,
    type,
    read: false,
    createdAt: new Date().toISOString()
  };

  const notifs = getLocal('notifications', []);
  setLocal('notifications', [newNotif, ...notifs]);
  return newNotif;
};

export const markNotificationRead = async (id) => {
  const notifs = getLocal('notifications', []);
  const updated = notifs.map(n => n.id === id ? { ...n, read: true } : n);
  setLocal('notifications', updated);
  return true;
};

/* =========================================================================
   USER MANAGEMENT & ADMIN SERVICE
   ========================================================================= */

export const getAllUsers = async () => {
  if (isFirebaseConfigured && db) {
    try {
      const q = query(collection(db, "users"));
      const snapshot = await getDocs(q);
      if (!snapshot.empty) {
        return snapshot.docs.map(doc => ({ uid: doc.id, ...doc.data() }));
      }
    } catch (err) {
      console.warn("Firestore getAllUsers error:", err);
    }
  }
  return getLocal('users', []);
};

export const updateUserRole = async (userId, role) => {
  if (isFirebaseConfigured && db) {
    try {
      await updateDoc(doc(db, "users", userId), { role });
    } catch (err) {
      console.warn("Firestore updateUserRole error:", err);
    }
  }
  const users = getLocal('users', []);
  const updated = users.map(u => u.uid === userId ? { ...u, role } : u);
  setLocal('users', updated);
  return true;
};

export const updateUserMembership = async (userId, membership) => {
  if (isFirebaseConfigured && db) {
    try {
      await updateDoc(doc(db, "users", userId), { membership });
    } catch (err) {
      console.warn("Firestore updateUserMembership error:", err);
    }
  }
  const users = getLocal('users', []);
  const updated = users.map(u => u.uid === userId ? { ...u, membership } : u);
  setLocal('users', updated);
  return true;
};

export const toggleUserStatus = async (userId, currentStatus) => {
  const newStatus = currentStatus === 'active' ? 'suspended' : 'active';
  if (isFirebaseConfigured && db) {
    try {
      await updateDoc(doc(db, "users", userId), { status: newStatus });
    } catch (err) {
      console.warn("Firestore toggleUserStatus error:", err);
    }
  }
  const users = getLocal('users', []);
  const updated = users.map(u => u.uid === userId ? { ...u, status: newStatus } : u);
  setLocal('users', updated);
  return newStatus;
};

export const deleteUserRecord = async (userId) => {
  if (isFirebaseConfigured && db) {
    try {
      await deleteDoc(doc(db, "users", userId));
    } catch (err) {
      console.warn("Firestore deleteUserRecord error:", err);
    }
  }
  const users = getLocal('users', []);
  const updated = users.filter(u => u.uid !== userId);
  setLocal('users', updated);
  return true;
};

/**
 * Create a new admin account.
 * Only callable from the Super Admin panel — does NOT use Firebase Auth
 * (avoids switching the current user session). Instead writes directly
 * to Firestore so the new admin can self-register with the given email.
 *
 * For full Firebase Auth creation the caller should use a Cloud Function
 * or the Firebase Admin SDK. Here we create the Firestore profile and
 * use createUserWithEmailAndPassword via a secondary import to avoid
 * session switching.
 */
export const inviteAdmin = async ({ email, name, password }) => {
  if (!isFirebaseConfigured || !db) {
    throw new Error('Firebase is not configured.');
  }

  try {
    // Store invite record — AuthContext promotes this email to admin on first sign-in / registration
    await setDoc(doc(db, 'admin_invites', email.toLowerCase()), {
      email:     email.toLowerCase(),
      name,
      role:      'admin',
      createdAt: new Date().toISOString(),
    });
    return { success: true };
  } catch (err) {
    console.error('inviteAdmin error:', err);
    throw new Error(err.message || 'Failed to create admin invitation.');
  }
};





/* =========================================================================
   SEED INITIAL DATA TO FIRESTORE / LOCAL
   ========================================================================= */

export const seedDatabase = async () => {
  setLocal('courses', INITIAL_COURSES);
  setLocal('apps', INITIAL_APPS);
  setLocal('tools', INITIAL_TOOLS);
  setLocal('content', INITIAL_CONTENT);
  setLocal('categories', INITIAL_CATEGORIES);

  if (isFirebaseConfigured && db) {
    try {
      // Seed courses
      for (const course of INITIAL_COURSES) {
        await setDoc(doc(db, "courses", course.id), course);
      }
      // Seed apps
      for (const appItem of INITIAL_APPS) {
        await setDoc(doc(db, "apps", appItem.id), appItem);
      }
      // Seed tools
      for (const tool of INITIAL_TOOLS) {
        await setDoc(doc(db, "tools", tool.id), tool);
      }
      // Seed content
      for (const item of INITIAL_CONTENT) {
        await setDoc(doc(db, "content", item.id), item);
      }
      // Seed categories
      await setDoc(doc(db, "settings", "categories"), INITIAL_CATEGORIES);
      return { success: true, message: "Database seeded to Firebase Firestore successfully!" };
    } catch (err) {
      console.error("Firebase seed error:", err);
      return { success: false, message: `Firebase error: ${err.message}. Local store updated.` };
    }
  }

  return { success: true, message: "Local demo store reset to fresh initial seed data!" };
};
