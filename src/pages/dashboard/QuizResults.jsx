import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CheckSquare, CheckCircle2, XCircle, RotateCcw } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { getUserQuizResults } from '../../services/firebaseService';
import { EmptyState } from '../../components/common/EmptyState';

export const QuizResults = () => {
  const { currentUser } = useAuth();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      if (currentUser?.uid) {
        setLoading(true);
        const data = await getUserQuizResults(currentUser.uid);
        setResults(data);
        setLoading(false);
      }
    };
    load();
  }, [currentUser]);

  return (
    <DashboardLayout 
      title="Quiz & Assessment Results" 
      subtitle="Review past test scores, mastery evaluations, and passing criteria."
    >
      <div className="space-y-6">
        {results.length === 0 ? (
          <EmptyState
            icon={CheckSquare}
            title="No quiz results recorded"
            description="Take quizzes inside your enrolled courses to assess your learning retention."
            actionLabel="Start a Course"
            actionLink="/courses"
          />
        ) : (
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 text-xs text-slate-500 uppercase tracking-wider font-bold">
                    <th className="py-3.5 px-6">Assessment Title</th>
                    <th className="py-3.5 px-6">Course</th>
                    <th className="py-3.5 px-6 text-center">Score</th>
                    <th className="py-3.5 px-6 text-center">Status</th>
                    <th className="py-3.5 px-6">Date</th>
                    <th className="py-3.5 px-6 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-xs sm:text-sm">
                  {results.map((r) => (
                    <tr key={r.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                      <td className="py-4 px-6 font-bold text-slate-900 dark:text-white">
                        {r.quizTitle}
                      </td>
                      <td className="py-4 px-6 text-slate-500">
                        {r.courseTitle}
                      </td>
                      <td className="py-4 px-6 text-center font-black">
                        <span className={r.score >= 70 ? 'text-emerald-600' : 'text-rose-600'}>
                          {r.score}%
                        </span>
                      </td>
                      <td className="py-4 px-6 text-center">
                        <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold ${
                          r.passed 
                            ? 'bg-emerald-500/10 text-emerald-600' 
                            : 'bg-rose-500/10 text-rose-600'
                        }`}>
                          {r.passed ? <CheckCircle2 className="w-3.5 h-3.5" /> : <XCircle className="w-3.5 h-3.5" />}
                          {r.passed ? 'Passed' : 'Needs Review'}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-xs text-slate-400">
                        {r.date}
                      </td>
                      <td className="py-4 px-6 text-right">
                        <Link
                          to={`/learn/${r.courseId}`}
                          className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 text-xs font-semibold inline-flex items-center gap-1 transition"
                        >
                          <RotateCcw className="w-3 h-3" /> Retake
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};
