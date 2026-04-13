export default function KPICards({ summary }) {
  const cards = [
    {
      label: 'Total AI Spend',
      value: `$${summary.total_spend.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      sub: `${summary.total_requests} requests`,
    },
    {
      label: 'Total Requests',
      value: summary.total_requests.toLocaleString(),
      sub: 'all time',
    },
    {
      label: 'Avg Cost / Request',
      value: `$${summary.avg_cost_per_request.toFixed(4)}`,
      sub: 'across all teams',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {cards.map((card) => (
        <div key={card.label} className="bg-white rounded-xl border border-border p-5">
          <p className="text-sm text-text-muted font-medium">{card.label}</p>
          <p className="text-2xl font-bold mt-1">{card.value}</p>
          <p className="text-xs text-text-muted mt-1">{card.sub}</p>
        </div>
      ))}
    </div>
  );
}
