import React, { useState, useEffect } from 'react';
import { Award, Download, Printer } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { getUserCertificates } from '../../services/firebaseService';
import { EmptyState } from '../../components/common/EmptyState';

export const CertificatesPage = () => {
  const { currentUser } = useAuth();
  const [certs, setCerts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      if (currentUser?.uid) {
        setLoading(true);
        const data = await getUserCertificates(currentUser.uid);
        setCerts(data);
        setLoading(false);
      }
    };
    load();
  }, [currentUser]);

  return (
    <DashboardLayout 
      title="Course Completion Certificates" 
      subtitle="Official verified credentials awarded upon 100% course syllabus completion."
    >
      <div className="space-y-6">
        {certs.length === 0 ? (
          <EmptyState
            icon={Award}
            title="No certificates earned yet"
            description="Complete all lessons and quizzes in a course with a passing score to unlock your official digital certificate."
            actionLabel="Browse Courses"
            actionLink="/courses"
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {certs.map(cert => (
              <div 
                key={cert.id}
                className="p-8 rounded-3xl bg-gradient-to-br from-amber-50 via-white to-amber-50/60 dark:from-slate-900 dark:via-slate-900 dark:to-slate-850 border-2 border-amber-400/40 shadow-md flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-amber-600 font-bold uppercase tracking-wider mb-3">
                    <span className="flex items-center gap-1.5">
                      <Award className="w-4 h-4" /> Official Credential
                    </span>
                    <span>Issued: {cert.issuedDate}</span>
                  </div>

                  <h3 className="text-xl font-black text-slate-900 dark:text-white mb-2">
                    {cert.courseTitle}
                  </h3>

                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    This certifies that <strong className="text-slate-900 dark:text-white">{cert.studentName}</strong> has demonstrated verified academic mastery in this curriculum.
                  </p>

                  <div className="mt-4 p-3 bg-white/70 dark:bg-slate-800/60 rounded-xl border border-amber-200/60 dark:border-slate-700/60 text-[11px] text-slate-500 font-mono">
                    Certificate ID: {cert.certificateNumber}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-amber-200 dark:border-slate-800 flex items-center justify-between">
                  <span className="text-xs font-semibold text-emerald-600">{cert.grade}</span>
                  <button
                    onClick={() => window.print()}
                    className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs shadow-md transition flex items-center gap-1.5"
                  >
                    <Printer className="w-3.5 h-3.5" /> Print / Save PDF
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};
