import { useState } from 'react';

export default function CodeBlock({ language, title, children }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(children);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-lg overflow-hidden border border-slate-700 bg-slate-900 text-sm my-4">
      <div className="flex items-center justify-between px-4 py-2 bg-slate-800 border-b border-slate-700">
        <span className="text-xs text-slate-400 font-medium uppercase tracking-wide">
          {title || language}
        </span>
        <button
          onClick={handleCopy}
          className="text-xs text-slate-400 hover:text-white transition-colors cursor-pointer"
        >
          {copied ? '✓ Copied' : 'Copy'}
        </button>
      </div>
      <pre className="p-4 overflow-x-auto text-slate-200 leading-relaxed">
        <code>{children}</code>
      </pre>
    </div>
  );
}
