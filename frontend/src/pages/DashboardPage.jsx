import { useState, useEffect } from 'react';
import api from '../api/axios';
import DashboardCards from '../components/DashboardCards';
import WeeklyChart from '../components/WeeklyChart';

export default function DashboardPage() {
  const [summary, setSummary] = useState(null);
  const [weekly, setWeekly] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [sumRes, weekRes] = await Promise.all([
          api.get('/dashboard/summary'),
          api.get('/dashboard/weekly-progress'),
        ]);
        setSummary(sumRes.data);
        setWeekly(weekRes.data);
      } catch (err) {
        setError(err.response?.data?.error || 'Failed to load dashboard data.');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-10 w-10 border-2 border-emerald-400 border-t-transparent" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="glass-card p-8 text-center">
          <span className="text-4xl">👤</span>
          <h2 className="text-xl font-semibold text-slate-200 mt-4">Profile Incomplete</h2>
          <p className="text-slate-400 mt-2">{error}</p>
          <a
            href="/profile"
            className="inline-block mt-4 px-6 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-medium transition-colors"
          >
            Complete Profile
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-100">Dashboard</h1>
        <p className="text-slate-400 mt-1">Your daily nutrition overview</p>
      </div>

      {summary && <DashboardCards summary={summary} />}

      {/* Progress bar */}
      {summary && (
        <div className="glass-card p-6 animate-slide-up">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-slate-400">Daily Progress</span>
            <span className="text-sm font-semibold text-emerald-400">
              {Math.min(100, Math.round((summary.consumedCalories / summary.targetCalories) * 100))}%
            </span>
          </div>
          <div className="w-full h-3 rounded-full bg-slate-700/60 overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-700 ease-out"
              style={{
                width: `${Math.min(100, (summary.consumedCalories / summary.targetCalories) * 100)}%`,
                background:
                  summary.consumedCalories > summary.targetCalories
                    ? 'linear-gradient(90deg, #ef4444, #dc2626)'
                    : 'linear-gradient(90deg, #10b981, #06b6d4)',
              }}
            />
          </div>
        </div>
      )}

      {weekly.length > 0 && (
        <WeeklyChart data={weekly} target={summary?.targetCalories} />
      )}
    </div>
  );
}
