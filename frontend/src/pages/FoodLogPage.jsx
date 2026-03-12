import { useState, useEffect } from 'react';
import api from '../api/axios';

export default function FoodLogPage() {
  const [logs, setLogs] = useState([]);
  const [foods, setFoods] = useState([]);
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [selectedFood, setSelectedFood] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);

  const fetchLogs = async () => {
    try {
      const { data } = await api.get(`/foodlogs?date=${date}`);
      setLogs(data);
    } catch (err) {
      console.error('Failed to fetch logs:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchFoods = async () => {
    try {
      const { data } = await api.get('/foods');
      setFoods(data);
      if (data.length > 0 && !selectedFood) setSelectedFood(data[0].id);
    } catch (err) {
      console.error('Failed to fetch foods:', err);
    }
  };

  useEffect(() => { fetchFoods(); }, []);
  useEffect(() => { fetchLogs(); }, [date]);

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!selectedFood) return;
    try {
      await api.post('/foodlogs', { food_id: selectedFood, quantity: Number(quantity), date });
      fetchLogs();
    } catch (err) {
      alert(err.response?.data?.error || 'Failed to add log.');
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/foodlogs/${id}`);
      fetchLogs();
    } catch (err) {
      alert(err.response?.data?.error || 'Failed to delete log.');
    }
  };

  const totalCalories = logs.reduce((sum, log) => sum + Number(log.total_calories), 0);

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-100">Food Log</h1>
        <p className="text-slate-400 mt-1">Log what you eat each day</p>
      </div>

      {/* Date Picker & Add Form */}
      <div className="glass-card p-6 animate-slide-up">
        <div className="flex flex-col sm:flex-row gap-4 items-end">
          <div className="flex-1">
            <label className="block text-sm text-slate-400 mb-1.5">Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg bg-slate-800/80 border border-slate-600/50 text-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all"
            />
          </div>
          <div className="flex-[2]">
            <label className="block text-sm text-slate-400 mb-1.5">Food</label>
            <select
              value={selectedFood}
              onChange={(e) => setSelectedFood(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg bg-slate-800/80 border border-slate-600/50 text-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all"
            >
              {foods.length === 0 && <option>No foods available</option>}
              {foods.map((f) => (
                <option key={f.id} value={f.id}>
                  {f.name} ({f.calories} kcal)
                </option>
              ))}
            </select>
          </div>
          <div className="w-28">
            <label className="block text-sm text-slate-400 mb-1.5">Qty</label>
            <input
              type="number"
              step="0.5"
              min="0.5"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg bg-slate-800/80 border border-slate-600/50 text-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all"
            />
          </div>
          <button
            onClick={handleAdd}
            disabled={!selectedFood}
            className="px-6 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-medium transition-colors whitespace-nowrap cursor-pointer"
          >
            + Add Log
          </button>
        </div>
      </div>

      {/* Summary */}
      <div className="glass-card p-4 flex items-center justify-between animate-fade-in">
        <span className="text-slate-400 text-sm font-medium">
          Total for {new Date(date + 'T00:00:00').toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        </span>
        <span className="text-lg font-bold text-orange-400">{Math.round(totalCalories)} kcal</span>
      </div>

      {/* Logs Table */}
      {loading ? (
        <div className="flex items-center justify-center h-32">
          <div className="animate-spin rounded-full h-8 w-8 border-2 border-emerald-400 border-t-transparent" />
        </div>
      ) : logs.length === 0 ? (
        <div className="glass-card p-8 text-center">
          <p className="text-slate-400 text-lg">No food logged for this day. Start logging! 📝</p>
        </div>
      ) : (
        <div className="glass-card overflow-hidden animate-fade-in">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-slate-700/50">
                <th className="px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Food</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Qty</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Calories</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {logs.map((log) => (
                <tr key={log.id} className="border-b border-slate-700/30 hover:bg-slate-700/30 transition-colors">
                  <td className="px-6 py-4 font-medium text-slate-200">{log.name}</td>
                  <td className="px-6 py-4 text-slate-400">{log.quantity}</td>
                  <td className="px-6 py-4 text-orange-400 font-semibold">{Math.round(log.total_calories)} kcal</td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => handleDelete(log.id)}
                      className="px-3 py-1.5 rounded-md text-xs font-medium bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-colors cursor-pointer"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
