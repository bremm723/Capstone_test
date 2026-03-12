export default function FoodTable({ foods, onEdit, onDelete }) {
  if (foods.length === 0) {
    return (
      <div className="glass-card p-8 text-center animate-fade-in">
        <p className="text-slate-400 text-lg">No foods found. Add your first food above! 🍽️</p>
      </div>
    );
  }

  return (
    <div className="glass-card overflow-hidden animate-fade-in">
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-slate-700/50">
              <th className="px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Name</th>
              <th className="px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Calories</th>
              <th className="px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider hidden sm:table-cell">Protein</th>
              <th className="px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider hidden sm:table-cell">Carbs</th>
              <th className="px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider hidden sm:table-cell">Fat</th>
              <th className="px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {foods.map((food) => (
              <tr
                key={food.id}
                className="border-b border-slate-700/30 hover:bg-slate-700/30 transition-colors"
              >
                <td className="px-6 py-4 font-medium text-slate-200">{food.name}</td>
                <td className="px-6 py-4 text-orange-400 font-semibold">{food.calories} kcal</td>
                <td className="px-6 py-4 text-slate-400 hidden sm:table-cell">{food.protein}g</td>
                <td className="px-6 py-4 text-slate-400 hidden sm:table-cell">{food.carbs}g</td>
                <td className="px-6 py-4 text-slate-400 hidden sm:table-cell">{food.fat}g</td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => onEdit(food)}
                      className="px-3 py-1.5 rounded-md text-xs font-medium bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 transition-colors cursor-pointer"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => onDelete(food.id)}
                      className="px-3 py-1.5 rounded-md text-xs font-medium bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-colors cursor-pointer"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
