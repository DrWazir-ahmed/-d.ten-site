import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Bookmark, Trash2, ExternalLink } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { getUserBookmarks, toggleBookmark } from '../../services/firebaseService';
import { EmptyState } from '../../components/common/EmptyState';
import { Badge } from '../../components/common/Badge';

export const SavedItems = () => {
  const { currentUser } = useAuth();
  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      if (currentUser?.uid) {
        setLoading(true);
        const data = await getUserBookmarks(currentUser.uid);
        setBookmarks(data);
        setLoading(false);
      }
    };
    load();
  }, [currentUser]);

  const handleRemove = async (item) => {
    await toggleBookmark(currentUser.uid, item);
    setBookmarks(bookmarks.filter(b => b.itemId !== item.itemId));
  };

  const getItemLink = (item) => {
    if (item.itemType === 'course') return `/courses/${item.itemId}`;
    if (item.itemType === 'tool') return `/tools`;
    if (item.itemType === 'content') return `/content`;
    return '/courses';
  };

  return (
    <DashboardLayout 
      title="Saved & Bookmarks" 
      subtitle="Quick access to your bookmarked courses, educational tools, and study notes."
    >
      <div className="space-y-6">
        {bookmarks.length === 0 ? (
          <EmptyState
            icon={Bookmark}
            title="No saved resources yet"
            description="Bookmark courses, tools, and guides to build your personal learning library."
            actionLabel="Explore Courses"
            actionLink="/courses"
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {bookmarks.map((bm) => (
              <div 
                key={bm.id}
                className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                    <span className="capitalize font-semibold text-brand-600">{bm.itemType}</span>
                    <button 
                      onClick={() => handleRemove(bm)}
                      className="p-1 hover:text-rose-500 rounded transition"
                      title="Remove Bookmark"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white mb-1">
                    {bm.title}
                  </h4>
                  <p className="text-xs text-slate-500">{bm.category}</p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-end">
                  <Link
                    to={getItemLink(bm)}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-600 dark:text-brand-400 hover:underline"
                  >
                    <span>Open Resource</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};
