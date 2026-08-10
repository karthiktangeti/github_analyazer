import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';

function LanguageChart({ languageCounts }) {
  const data = Object.entries(languageCounts || {}).map(([name, value]) => ({ name, value }));

  if (!data.length) {
    return <div className="empty-state">No language data available.</div>;
  }

  return (
    <div className="chart-card">
      <ResponsiveContainer width="100%" height={280}>
        <PieChart>
          <Pie data={data} dataKey="value" nameKey="name" outerRadius={90} fill="#5b8cff">
            {data.map((entry, index) => (
              <Cell key={`${entry.name}-${index}`} fill={['#5b8cff', '#6ee7b7', '#f59e0b', '#f472b6', '#a78bfa'][index % 5]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default LanguageChart;
