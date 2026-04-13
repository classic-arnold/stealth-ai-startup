export default function FieldsTable({ fields }) {
  return (
    <div className="overflow-x-auto my-4 rounded-lg border border-border">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-surface-alt text-left">
            <th className="px-4 py-2.5 font-semibold text-text-muted w-40">Field</th>
            <th className="px-4 py-2.5 font-semibold text-text-muted w-24">Type</th>
            <th className="px-4 py-2.5 font-semibold text-text-muted">Description</th>
          </tr>
        </thead>
        <tbody>
          {fields.map((f) => (
            <tr key={f.name} className="border-t border-border">
              <td className="px-4 py-2.5 font-mono text-xs text-text">
                {f.name}
                {f.required && (
                  <span className="ml-2 text-[10px] font-sans font-semibold text-red-500 bg-red-50 px-1.5 py-0.5 rounded">
                    required
                  </span>
                )}
              </td>
              <td className="px-4 py-2.5 text-text-muted font-mono text-xs">{f.type}</td>
              <td className="px-4 py-2.5 text-text-muted">{f.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
