import { useState, useEffect } from 'react';
import api from '../api/axios';
import FoodTable from '../components/FoodTable';
import FoodForm from '../components/FoodForm';

export default function FoodsPage() {
  const [foods, setFoods] = useState([]);
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchFoods = async () => {
    try {
      const { data } = await api.get('/foods');
      setFoods(data);
    } catch (err) {
      console.error('Failed to fetch foods:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchFoods(); }, []);

  const handleAdd = async (food) => {
    try {
      await api.post('/foods', food);
      fetchFoods();
      setShowForm(false);
    } catch (err) {
      alert(err.response?.data?.error || 'Failed to add food.');
    }
  };

  const handleUpdate = async (food) => {
    try {
      await api.put(`/foods/${editing.id}`, food);
      fetchFoods();
      setEditing(null);
    } catch (err) {
      alert(err.response?.data?.error || 'Failed to update food.');
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this food?')) return;
    try {
      await api.delete(`/foods/${id}`);
      fetchFoods();
    } catch (err) {
      alert(err.response?.data?.error || 'Failed to delete food.');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-10 w-10 border-2 border-emerald-400 border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-100">Food Database</h1>
          <p className="text-slate-400 mt-1">Manage your food items</p>
        </div>
        {!showForm && !editing && (
          <button
            onClick={() => setShowForm(true)}
            className="px-5 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-medium transition-colors cursor-pointer"
          >
            + Add Food
          </button>
        )}
      </div>

      {showForm && (
        <FoodForm onSubmit={handleAdd} onCancel={() => setShowForm(false)} />
      )}

      {editing && (
        <FoodForm food={editing} onSubmit={handleUpdate} onCancel={() => setEditing(null)} />
      )}

      <FoodTable foods={foods} onEdit={setEditing} onDelete={handleDelete} />
    </div>
  );
}
