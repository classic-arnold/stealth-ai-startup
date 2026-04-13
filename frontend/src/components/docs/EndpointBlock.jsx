import FieldsTable from './FieldsTable';
import CodeBlock from './CodeBlock';

const METHOD_STYLES = {
  POST: 'bg-emerald-100 text-emerald-700',
  GET: 'bg-blue-100 text-blue-700',
};

export default function EndpointBlock({ id, method, path, description, fields, queryParams, children }) {
  return (
    <section id={id} className="scroll-mt-24 mb-12">
      <div className="flex items-center gap-3 mb-3">
        <span className={`px-2.5 py-1 rounded-md text-xs font-bold tracking-wide ${METHOD_STYLES[method]}`}>
          {method}
        </span>
        <code className="text-base font-semibold font-mono text-text">{path}</code>
      </div>
      <p className="text-text-muted leading-relaxed mb-4">{description}</p>
      {fields && (
        <>
          <h4 className="text-sm font-semibold text-text mb-1">Request Body</h4>
          <FieldsTable fields={fields} />
        </>
      )}
      {queryParams && (
        <>
          <h4 className="text-sm font-semibold text-text mb-1">Query Parameters</h4>
          <FieldsTable fields={queryParams} />
        </>
      )}
      {children}
    </section>
  );
}
