export default function DashboardCards({ summary }) {
  const cards = [
    {
      title: 'Daily Target',
      value: summary.targetCalories,
      unit: 'kcal',
      icon: '🎯',
      color: 'from-emerald-500/20 to-emerald-600/10',
      border: 'border-emerald-500/30',
      text: 'text-emerald-400',
    },
    {
      title: 'Consumed Today',
      value: summary.consumedCalories,
      unit: 'kcal',
      icon: '🔥',
      color: 'from-orange-500/20 to-amber-600/10',
      border: 'border-orange-500/30',
      text: 'text-orange-400',
    },
    {
      title: 'Remaining',
      value: summary.remainingCalories,
      unit: 'kcal',
      icon: summary.remainingCalories >= 0 ? '✅' : '⚠️',
      color: summary.remainingCalories >= 0
        ? 'from-cyan-500/20 to-blue-600/10'
        : 'from-red-500/20 to-red-600/10',
      border: summary.remainingCalories >= 0
        ? 'border-cyan-500/30'
        : 'border-red-500/30',
      text: summary.remainingCalories >= 0
        ? 'text-cyan-400'
        : 'text-red-400',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {cards.map((card) => (
        <div
          key={card.title}
          className={`glass-card bg-gradient-to-br ${card.color} ${card.border} p-6 animate-slide-up hover:scale-[1.02] transition-transform duration-300`}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-slate-400 uppercase tracking-wider">
              {card.title}
            </h3>
            <span className="text-2xl">{card.icon}</span>
          </div>
          <p className={`text-4xl font-bold ${card.text}`}>
            {card.value.toLocaleString()}
          </p>
          <p className="text-sm text-slate-500 mt-1">{card.unit}</p>
        </div>
      ))}
    </div>
  );
}
