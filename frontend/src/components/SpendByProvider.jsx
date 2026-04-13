import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const COLORS = ['#0ea5e9', '#06b6d4', '#14b8a6', '#10b981'];

export default function SpendByProvider({ data }) {
  return (
    <div className="bg-white rounded-xl border border-border p-5">
      <h3 className="text-sm font-semibold text-text-muted mb-4">Spend by Provider</h3>
      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={data} layout="vertical" margin={{ left: 10, right: 20 }}>
          <XAxis type="number" tickFormatter={(v) => `$${v}`} fontSize={12} />
          <YAxis type="category" dataKey="provider" width={100} fontSize={12} />
          <Tooltip formatter={(v) => `$${v.toFixed(2)}`} />
          <Bar dataKey="spend" radius={[0, 4, 4, 0]}>
            {data.map((_, i) => (
              <Cell key={i} fill={COLORS[i % COLORS.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
