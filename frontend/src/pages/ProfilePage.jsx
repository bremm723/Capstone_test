import { useState, useEffect } from 'react';
import api from '../api/axios';

const ACTIVITY_OPTIONS = [
  { value: 'sedentary',   label: 'Sedentary (little/no exercise)',        multiplier: '1.2' },
  { value: 'light',       label: 'Light (1–3 days/week)',                 multiplier: '1.375' },
  { value: 'moderate',    label: 'Moderate (3–5 days/week)',              multiplier: '1.55' },
  { value: 'active',      label: 'Active (6–7 days/week)',               multiplier: '1.725' },
  { value: 'very_active', label: 'Very Active (intense daily exercise)', multiplier: '1.9' },
];

export default function ProfilePage() {
  const [form, setForm] = useState({
    age: '', height: '', weight: '', gender: '', activity_level: '',
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await api.get('/user/profile');
        setForm({
          age:            data.age ?? '',
          height:         data.height ?? '',
          weight:         data.weight ?? '',
          gender:         data.gender ?? '',
          activity_level: data.activity_level ?? '',
        });
      } catch {
        setMessage({ type: 'error', text: 'Failed to load profile.' });
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage({ type: '', text: '' });
    try {
      await api.put('/user/profile', {
        age:            Number(form.age) || null,
        height:         Number(form.height) || null,
        weight:         Number(form.weight) || null,
        gender:         form.gender || null,
        activity_level: form.activity_level || null,
      });
      setMessage({ type: 'success', text: 'Profile updated successfully! 🎉' });
    } catch {
      setMessage({ type: 'error', text: 'Failed to update profile.' });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-10 w-10 border-2 border-emerald-400 border-t-transparent" />
      </div>
    );
  }

  const inputClass =
    'w-full px-4 py-3 rounded-lg bg-slate-800/80 border border-slate-600/50 text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all';

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-100">Profile</h1>
        <p className="text-slate-400 mt-1">Update your health info to calculate calorie needs</p>
      </div>

      <div className="glass-card p-8 animate-slide-up">
        {message.text && (
          <div
            className={`mb-6 p-3 rounded-lg text-sm ${
              message.type === 'success'
                ? 'bg-emerald-500/20 border border-emerald-500/30 text-emerald-400'
                : 'bg-red-500/20 border border-red-500/30 text-red-400'
            }`}
          >
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm text-slate-400 mb-1.5">Age</label>
              <input
                name="age"
                type="number"
                value={form.age}
                onChange={handleChange}
                placeholder="e.g. 25"
                className={inputClass}
              />
            </div>
            <div>
              <label className="block text-sm text-slate-400 mb-1.5">Gender</label>
              <select
                name="gender"
                value={form.gender}
                onChange={handleChange}
                className={inputClass}
              >
                <option value="">Select gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-slate-400 mb-1.5">Height (cm)</label>
              <input
                name="height"
                type="number"
                step="0.1"
                value={form.height}
                onChange={handleChange}
                placeholder="e.g. 175"
                className={inputClass}
              />
            </div>
            <div>
              <label className="block text-sm text-slate-400 mb-1.5">Weight (kg)</label>
              <input
                name="weight"
                type="number"
                step="0.1"
                value={form.weight}
                onChange={handleChange}
                placeholder="e.g. 70"
                className={inputClass}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm text-slate-400 mb-1.5">Activity Level</label>
            <select
              name="activity_level"
              value={form.activity_level}
              onChange={handleChange}
              className={inputClass}
            >
              <option value="">Select activity level</option>
              {ACTIVITY_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label} (×{opt.multiplier})
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            disabled={saving}
            className="w-full py-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-semibold transition-colors cursor-pointer"
          >
            {saving ? 'Saving…' : 'Save Profile'}
          </button>
        </form>
      </div>
    </div>
  );
}
