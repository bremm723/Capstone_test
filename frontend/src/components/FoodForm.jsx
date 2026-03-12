import { useState, useEffect } from 'react';

export default function FoodForm({ food, onSubmit, onCancel }) {
  const [form, setForm] = useState({
    name: '', calories: '', protein: '', carbs: '', fat: '',
  });

  useEffect(() => {
    if (food) {
      setForm({
        name:     food.name     || '',
        calories: food.calories || '',
        protein:  food.protein  || '',
        carbs:    food.carbs    || '',
        fat:      food.fat      || '',
      });
    }
  }, [food]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      name:     form.name,
      calories: Number(form.calories),
      protein:  Number(form.protein) || 0,
      carbs:    Number(form.carbs) || 0,
      fat:      Number(form.fat) || 0,
    });
    if (!food) setForm({ name: '', calories: '', protein: '', carbs: '', fat: '' });
  };

  const inputClass =
    'w-full px-4 py-2.5 rounded-lg bg-slate-800/80 border border-slate-600/50 text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all';

  return (
    <form onSubmit={handleSubmit} className="glass-card p-6 animate-fade-in">
      <h3 className="text-lg font-semibold mb-4 text-slate-200">
        {food ? 'Edit Food' : 'Add New Food'}
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="sm:col-span-2">
          <label className="block text-sm text-slate-400 mb-1">Food Name *</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="e.g. Chicken Breast"
            required
            className={inputClass}
          />
        </div>
        <div>
          <label className="block text-sm text-slate-400 mb-1">Calories (kcal) *</label>
          <input
            name="calories"
            type="number"
            step="0.1"
            value={form.calories}
            onChange={handleChange}
            placeholder="0"
            required
            className={inputClass}
          />
        </div>
        <div>
          <label className="block text-sm text-slate-400 mb-1">Protein (g)</label>
          <input name="protein" type="number" step="0.1" value={form.protein} onChange={handleChange} placeholder="0" className={inputClass} />
        </div>
        <div>
          <label className="block text-sm text-slate-400 mb-1">Carbs (g)</label>
          <input name="carbs" type="number" step="0.1" value={form.carbs} onChange={handleChange} placeholder="0" className={inputClass} />
        </div>
        <div>
          <label className="block text-sm text-slate-400 mb-1">Fat (g)</label>
          <input name="fat" type="number" step="0.1" value={form.fat} onChange={handleChange} placeholder="0" className={inputClass} />
        </div>
      </div>

      <div className="flex gap-3 mt-6">
        <button
          type="submit"
          className="px-6 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-medium transition-colors cursor-pointer"
        >
          {food ? 'Update' : 'Add Food'}
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-2.5 rounded-lg bg-slate-700 hover:bg-slate-600 text-slate-300 font-medium transition-colors cursor-pointer"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
