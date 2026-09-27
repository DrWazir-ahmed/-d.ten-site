/**
 * High-Capacity IndexedDB & Memory Store for Presentations (.PPTX / .PPT)
 * Prevents LocalStorage QuotaExceededError and Firestore 1MB document size limit crashes.
 */

const DB_NAME = 'dten_presentation_store';
const STORE_NAME = 'decks';
const DB_VERSION = 1;

let dbPromise = null;

function getDb() {
  if (!dbPromise) {
    dbPromise = new Promise((resolve, reject) => {
      if (typeof window === 'undefined' || !window.indexedDB) {
        resolve(null);
        return;
      }
      const req = indexedDB.open(DB_NAME, DB_VERSION);
      req.onupgradeneeded = (e) => {
        const db = e.target.result;
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          db.createObjectStore(STORE_NAME, { keyPath: 'id' });
        }
      };
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => {
        console.warn('IndexedDB presentation store open error:', req.error);
        resolve(null);
      };
    });
  }
  return dbPromise;
}

// In-memory fallback cache
const memoryCache = new Map();

/**
 * Save presentation deck and original file blob to IndexedDB
 */
export async function savePresentationDeck(id, deckData, originalFileBlob = null) {
  if (!id) return false;
  
  // Cache in memory immediately
  memoryCache.set(id, {
    deckData,
    originalFileBlob,
    savedAt: Date.now()
  });

  try {
    const db = await getDb();
    if (!db) return true;

    return new Promise((resolve) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      const record = {
        id,
        deckData,
        originalFileBlob,
        updatedAt: Date.now()
      };
      const req = store.put(record);
      req.onsuccess = () => resolve(true);
      req.onerror = () => {
        console.warn('Failed to store deck in IndexedDB:', req.error);
        resolve(false);
      };
    });
  } catch (err) {
    console.warn('IndexedDB write error:', err);
    return false;
  }
}

/**
 * Retrieve presentation deck by id from memory or IndexedDB
 */
export async function getPresentationDeck(id) {
  if (!id) return null;

  // Check memory cache first
  if (memoryCache.has(id)) {
    return memoryCache.get(id);
  }

  try {
    const db = await getDb();
    if (!db) return null;

    return new Promise((resolve) => {
      const tx = db.transaction(STORE_NAME, 'readonly');
      const store = tx.objectStore(STORE_NAME);
      const req = store.get(id);
      req.onsuccess = () => {
        if (req.result) {
          memoryCache.set(id, req.result);
          resolve(req.result);
        } else {
          resolve(null);
        }
      };
      req.onerror = () => resolve(null);
    });
  } catch (err) {
    console.warn('IndexedDB read error:', err);
    return null;
  }
}

/**
 * Sanitize presentation payload for safe LocalStorage and Firestore persistence
 * Strips huge base64 image strings from the sync metadata, keeping text, structure,
 * and thumbnails lightweight.
 */
export function sanitizeDeckForSync(deckData) {
  if (!deckData || !deckData.slides) return deckData;

  const sanitizedSlides = deckData.slides.map(slide => {
    // Keep slide structure, bullets, text, notes
    const s = { ...slide };
    if (s.images && Array.isArray(s.images)) {
      // Keep image count/names, but strip huge base64 strings if over 50KB each
      s.images = s.images.map(img => ({
        id: img.id,
        name: img.name,
        // Only keep if dataUrl is small; otherwise indicate available in local cache
        dataUrl: (img.dataUrl && img.dataUrl.length < 50000) ? img.dataUrl : ''
      }));
    }
    return s;
  });

  return {
    ...deckData,
    slides: sanitizedSlides
  };
}
