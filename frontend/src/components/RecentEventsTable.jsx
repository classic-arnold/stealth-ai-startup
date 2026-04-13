export default function RecentEventsTable({ events }) {
  return (
    <div className="bg-white rounded-xl border border-border overflow-hidden">
      <div className="px-5 py-4 border-b border-border">
        <h3 className="text-sm font-semibold text-text-muted">Recent Events</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-surface-alt text-text-muted text-left">
              <th className="px-5 py-3 font-medium">Timestamp</th>
              <th className="px-5 py-3 font-medium">Team</th>
              <th className="px-5 py-3 font-medium">App</th>
              <th className="px-5 py-3 font-medium">Provider</th>
              <th className="px-5 py-3 font-medium">Model</th>
              <th className="px-5 py-3 font-medium text-right">Cost</th>
              <th className="px-5 py-3 font-medium text-right">Tokens</th>
            </tr>
          </thead>
          <tbody>
            {events.map((e) => (
              <tr key={e.id} className="border-t border-border hover:bg-surface-alt/50">
                <td className="px-5 py-3 text-text-muted whitespace-nowrap">
                  {new Date(e.timestamp).toLocaleString()}
                </td>
                <td className="px-5 py-3 capitalize">{e.team}</td>
                <td className="px-5 py-3">{e.app}</td>
                <td className="px-5 py-3 capitalize">{e.provider}</td>
                <td className="px-5 py-3 font-mono text-xs">{e.model}</td>
                <td className="px-5 py-3 text-right font-medium">${e.cost_usd?.toFixed(4)}</td>
                <td className="px-5 py-3 text-right text-text-muted">{e.total_tokens?.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
