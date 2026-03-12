import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function WeeklyChart({ data, target }) {
  const labels = data.map((d) => {
    const date = new Date(d.date + 'T00:00:00');
    return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  });
  const calories = data.map((d) => d.calories);

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Calories Consumed',
        data: calories,
        backgroundColor: calories.map((c) =>
          c > (target || Infinity)
            ? 'rgba(239, 68, 68, 0.7)'   // red if over target
            : 'rgba(16, 185, 129, 0.7)'  // emerald
        ),
        borderColor: calories.map((c) =>
          c > (target || Infinity)
            ? 'rgba(239, 68, 68, 1)'
            : 'rgba(16, 185, 129, 1)'
        ),
        borderWidth: 1,
        borderRadius: 6,
        borderSkipped: false,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        text: 'Weekly Calorie Progress',
        color: '#f1f5f9',
        font: { size: 16, weight: '600', family: 'Inter' },
        padding: { bottom: 20 },
      },
      tooltip: {
        backgroundColor: '#1e293b',
        titleColor: '#f1f5f9',
        bodyColor: '#94a3b8',
        borderColor: '#334155',
        borderWidth: 1,
        cornerRadius: 8,
        callbacks: {
          label: (ctx) => `${ctx.parsed.y.toLocaleString()} kcal`,
        },
      },
    },
    scales: {
      x: {
        ticks: { color: '#94a3b8', font: { size: 12 } },
        grid: { display: false },
        border: { color: '#334155' },
      },
      y: {
        ticks: {
          color: '#94a3b8',
          font: { size: 12 },
          callback: (v) => v.toLocaleString(),
        },
        grid: { color: 'rgba(51, 65, 85, 0.4)' },
        border: { display: false },
      },
    },
  };

  return (
    <div className="glass-card p-6 animate-slide-up" style={{ height: '380px' }}>
      <Bar data={chartData} options={options} />
    </div>
  );
}
