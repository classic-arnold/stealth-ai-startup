import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import CodeBlock from '../components/docs/CodeBlock';
import EndpointBlock from '../components/docs/EndpointBlock';
import FieldsTable from '../components/docs/FieldsTable';

const SIDEBAR = [
  { id: 'getting-started', label: 'Getting Started' },
  { id: 'quick-start', label: 'Quick Start' },
  { id: 'send-events', label: 'Send Events' },
  { id: 'integration', label: 'Integration Examples' },
  { id: 'query-events', label: 'Query Events' },
  { id: 'usage-summary', label: 'Usage Summary' },
  { id: 'errors', label: 'Errors' },
  { id: 'notes', label: 'Rate Limits & Notes' },
];

const EVENT_FIELDS = [
  { name: 'provider', type: 'string', required: true, description: 'The AI provider. e.g. openai, anthropic, google, mistral' },
  { name: 'model', type: 'string', required: true, description: 'The model used. e.g. gpt-4o, claude-3.5-sonnet, gemini-1.5-pro' },
  { name: 'cost_usd', type: 'number', required: true, description: 'Cost of this request in USD' },
  { name: 'team', type: 'string', required: false, description: 'Team or department that owns this request' },
  { name: 'app', type: 'string', required: false, description: 'Application or service name' },
  { name: 'timestamp', type: 'string', required: false, description: 'ISO 8601 timestamp. Defaults to current time if omitted.' },
  { name: 'input_tokens', type: 'integer', required: false, description: 'Number of tokens in the prompt' },
  { name: 'output_tokens', type: 'integer', required: false, description: 'Number of tokens in the completion' },
  { name: 'total_tokens', type: 'integer', required: false, description: 'Auto-computed from input_tokens + output_tokens if omitted' },
  { name: 'latency_ms', type: 'integer', required: false, description: 'Round-trip latency in milliseconds' },
  { name: 'request_text', type: 'string', required: false, description: 'The prompt sent to the model' },
  { name: 'response_text', type: 'string', required: false, description: 'The completion returned by the model' },
  { name: 'metadata_json', type: 'object', required: false, description: 'Arbitrary metadata. e.g. { "user_id": "u_123", "session_id": "s_456" }' },
];

const QUERY_PARAMS = [
  { name: 'limit', type: 'integer', required: false, description: 'Number of events to return. Default: 50, max: 200.' },
  { name: 'offset', type: 'integer', required: false, description: 'Number of events to skip for pagination. Default: 0.' },
];

const SUMMARY_FIELDS = [
  { name: 'total_spend', type: 'number', required: false, description: 'Total AI spend in USD across all events' },
  { name: 'total_requests', type: 'integer', required: false, description: 'Total number of AI requests recorded' },
  { name: 'avg_cost_per_request', type: 'number', required: false, description: 'Average cost per request in USD' },
  { name: 'spend_by_team', type: 'array', required: false, description: 'Spend breakdown by team: [{ team, spend, requests }]' },
  { name: 'spend_by_provider', type: 'array', required: false, description: 'Spend breakdown by provider: [{ provider, spend, requests }]' },
];

export default function Docs() {
  const [activeSection, setActiveSection] = useState('getting-started');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        }
      },
      { rootMargin: '-80px 0px -60% 0px', threshold: 0 }
    );

    for (const s of SIDEBAR) {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-6 py-8 flex gap-12">
      {/* Sidebar */}
      <nav className="hidden lg:block w-52 shrink-0">
        <div className="sticky top-24">
          <p className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-3">Documentation</p>
          <ul className="space-y-1">
            {SIDEBAR.map((s) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  className={`block text-sm px-3 py-1.5 rounded-md transition-colors ${
                    activeSection === s.id
                      ? 'text-primary font-medium bg-primary/5'
                      : 'text-text-muted hover:text-text hover:bg-surface-alt'
                  }`}
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Content */}
      <div className="flex-1 min-w-0">
        {/* Getting Started */}
        <section id="getting-started" className="scroll-mt-24 mb-12">
          <h1 className="text-3xl font-bold text-text mb-3">BirdsEye API</h1>
          <p className="text-lg text-text-muted leading-relaxed mb-6">
            BirdsEye captures every AI API call across your organization. Instrument once, get full visibility
            into spend, usage, and performance by team, app, and provider.
          </p>

          <div className="bg-white rounded-lg border border-border p-5 space-y-3">
            <div className="flex items-start gap-3">
              <span className="text-xs font-semibold text-text-muted w-24 shrink-0 pt-0.5">Base URL</span>
              <code className="text-sm font-mono bg-surface-alt px-2 py-0.5 rounded">https://api.birdseye.dev/v1</code>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-xs font-semibold text-text-muted w-24 shrink-0 pt-0.5">Local dev</span>
              <code className="text-sm font-mono bg-surface-alt px-2 py-0.5 rounded">http://localhost:3001/v1</code>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-xs font-semibold text-text-muted w-24 shrink-0 pt-0.5">Content-Type</span>
              <code className="text-sm font-mono bg-surface-alt px-2 py-0.5 rounded">application/json</code>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-xs font-semibold text-text-muted w-24 shrink-0 pt-0.5">Auth</span>
              <span className="text-sm text-text-muted">
                API key via <code className="font-mono bg-surface-alt px-1.5 py-0.5 rounded text-xs">Authorization: Bearer &lt;api_key&gt;</code> header
                <span className="ml-2 text-xs text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded">not enforced in demo</span>
              </span>
            </div>
          </div>
        </section>

        {/* Quick Start */}
        <section id="quick-start" className="scroll-mt-24 mb-12">
          <h2 className="text-xl font-bold text-text mb-4">Quick Start</h2>
          <p className="text-text-muted mb-6">Start sending AI usage events to BirdsEye in under 2 minutes.</p>

          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="w-6 h-6 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center">1</span>
                <h3 className="font-semibold text-text">Get your API key</h3>
              </div>
              <p className="text-sm text-text-muted ml-9">
                Grab your API key from the BirdsEye dashboard settings.
                <span className="ml-1 text-xs text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded">Use any value for the demo</span>
              </p>
            </div>

            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="w-6 h-6 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center">2</span>
                <h3 className="font-semibold text-text">Send your first event</h3>
              </div>
              <div className="ml-9">
                <p className="text-sm text-text-muted mb-2">
                  After each AI API call in your application, send the usage data to BirdsEye:
                </p>
                <CodeBlock language="bash" title="curl">{`curl -X POST http://localhost:3001/v1/events \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer your_api_key" \\
  -d '{
    "provider": "openai",
    "model": "gpt-4o",
    "team": "engineering",
    "app": "code-assistant",
    "cost_usd": 0.045,
    "input_tokens": 1200,
    "output_tokens": 350,
    "latency_ms": 1830
  }'`}</CodeBlock>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="w-6 h-6 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center">3</span>
                <h3 className="font-semibold text-text">View your dashboard</h3>
              </div>
              <p className="text-sm text-text-muted ml-9">
                Open the <Link to="/" className="text-primary hover:underline font-medium">BirdsEye dashboard</Link> to
                see your AI spend, usage breakdown by team and provider, and recent events.
              </p>
            </div>
          </div>
        </section>

        {/* POST /v1/events — Send Events */}
        <EndpointBlock
          id="send-events"
          method="POST"
          path="/v1/events"
          description="Every time your application makes an AI API call, send the usage details to BirdsEye. This is the core ingestion endpoint — it's how BirdsEye learns about your AI usage."
          fields={EVENT_FIELDS}
        >
          <div className="mt-4 p-4 bg-blue-50 border border-blue-100 rounded-lg text-sm text-blue-800">
            <strong>Normalization:</strong> The <code className="font-mono text-xs">provider</code>, <code className="font-mono text-xs">model</code>,{' '}
            <code className="font-mono text-xs">team</code>, and <code className="font-mono text-xs">app</code> fields
            are automatically trimmed and lowercased. You don't need to normalize them yourself.
          </div>

          <h4 className="text-sm font-semibold text-text mt-6 mb-1">Example Request</h4>
          <CodeBlock language="bash" title="curl">{`curl -X POST http://localhost:3001/v1/events \\
  -H "Content-Type: application/json" \\
  -d '{
    "provider": "anthropic",
    "model": "claude-3.5-sonnet",
    "team": "product",
    "app": "chatbot",
    "cost_usd": 0.012,
    "input_tokens": 800,
    "output_tokens": 420,
    "latency_ms": 2100,
    "metadata_json": { "user_id": "u_8291", "conversation_id": "c_3847" }
  }'`}</CodeBlock>

          <h4 className="text-sm font-semibold text-text mt-4 mb-1">Example Response</h4>
          <CodeBlock language="json" title="201 Created">{`{
  "id": 42,
  "timestamp": "2026-04-07T14:32:10.000Z",
  "provider": "anthropic",
  "model": "claude-3.5-sonnet",
  "team": "product",
  "app": "chatbot",
  "cost_usd": 0.012,
  "input_tokens": 800,
  "output_tokens": 420,
  "total_tokens": 1220,
  "latency_ms": 2100,
  "metadata_json": "{\\"user_id\\":\\"u_8291\\",\\"conversation_id\\":\\"c_3847\\"}",
  "request_text": null,
  "response_text": null
}`}</CodeBlock>
        </EndpointBlock>

        {/* Integration Examples */}
        <section id="integration" className="scroll-mt-24 mb-12">
          <h2 className="text-xl font-bold text-text mb-2">Integration Examples</h2>
          <p className="text-text-muted mb-6">
            Wrap your existing AI API calls with a BirdsEye event. Here's how it looks in practice.
          </p>

          <h4 className="text-sm font-semibold text-text mb-1">Python — wrapping an OpenAI call</h4>
          <CodeBlock language="python" title="Python">{`import time
import openai
import requests

BIRDSEYE_URL = "http://localhost:3001/v1/events"

def ask_openai(prompt, team="engineering", app="code-assistant"):
    start = time.time()
    response = openai.chat.completions.create(
        model="gpt-4o",
        messages=[{"role": "user", "content": prompt}],
    )
    latency_ms = int((time.time() - start) * 1000)

    usage = response.usage
    # Send usage event to BirdsEye
    requests.post(BIRDSEYE_URL, json={
        "provider": "openai",
        "model": "gpt-4o",
        "team": team,
        "app": app,
        "input_tokens": usage.prompt_tokens,
        "output_tokens": usage.completion_tokens,
        "cost_usd": usage.prompt_tokens * 0.0025 / 1000
                   + usage.completion_tokens * 0.01 / 1000,
        "latency_ms": latency_ms,
    })

    return response.choices[0].message.content`}</CodeBlock>

          <h4 className="text-sm font-semibold text-text mt-6 mb-1">Node.js — wrapping an Anthropic call</h4>
          <CodeBlock language="javascript" title="Node.js">{`import Anthropic from "@anthropic-ai/sdk";

const BIRDSEYE_URL = "http://localhost:3001/v1/events";
const anthropic = new Anthropic();

async function askClaude(prompt, team = "product", app = "chatbot") {
  const start = Date.now();
  const response = await anthropic.messages.create({
    model: "claude-3.5-sonnet",
    max_tokens: 1024,
    messages: [{ role: "user", content: prompt }],
  });
  const latencyMs = Date.now() - start;

  // Send usage event to BirdsEye
  await fetch(BIRDSEYE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      provider: "anthropic",
      model: "claude-3.5-sonnet",
      team,
      app,
      input_tokens: response.usage.input_tokens,
      output_tokens: response.usage.output_tokens,
      cost_usd:
        response.usage.input_tokens * 0.003 / 1000 +
        response.usage.output_tokens * 0.015 / 1000,
      latency_ms: latencyMs,
    }),
  });

  return response.content[0].text;
}`}</CodeBlock>
        </section>

        {/* GET /v1/events — Query Events */}
        <EndpointBlock
          id="query-events"
          method="GET"
          path="/v1/events"
          description="Retrieve your recent AI usage events. Returns events in reverse chronological order."
          queryParams={QUERY_PARAMS}
        >
          <h4 className="text-sm font-semibold text-text mt-4 mb-1">Example Request</h4>
          <CodeBlock language="bash" title="curl">{`curl http://localhost:3001/v1/events?limit=5&offset=0`}</CodeBlock>

          <h4 className="text-sm font-semibold text-text mt-4 mb-1">Example Response</h4>
          <CodeBlock language="json" title="200 OK">{`{
  "events": [
    {
      "id": 81,
      "timestamp": "2026-04-07T14:32:10.000Z",
      "team": "engineering",
      "app": "code-assistant",
      "provider": "openai",
      "model": "gpt-4o",
      "cost_usd": 0.045,
      "input_tokens": 1200,
      "output_tokens": 350,
      "total_tokens": 1550,
      "latency_ms": 1830,
      ...
    }
  ],
  "total": 81,
  "limit": 5,
  "offset": 0
}`}</CodeBlock>
        </EndpointBlock>

        {/* GET /v1/summary — Usage Summary */}
        <EndpointBlock
          id="usage-summary"
          method="GET"
          path="/v1/summary"
          description="Get an aggregated view of your organization's AI spend and usage. Powers the BirdsEye dashboard."
        >
          <h4 className="text-sm font-semibold text-text mt-4 mb-1">Response Fields</h4>
          <div className="mb-4">
            <FieldsTable fields={SUMMARY_FIELDS} />
          </div>

          <h4 className="text-sm font-semibold text-text mb-1">Example Response</h4>
          <CodeBlock language="json" title="200 OK">{`{
  "total_spend": 847.32,
  "total_requests": 12450,
  "avg_cost_per_request": 0.068,
  "spend_by_team": [
    { "team": "engineering", "spend": 412.50, "requests": 6200 },
    { "team": "product", "spend": 234.10, "requests": 3800 },
    { "team": "data-science", "spend": 200.72, "requests": 2450 }
  ],
  "spend_by_provider": [
    { "provider": "openai", "spend": 520.00, "requests": 7800 },
    { "provider": "anthropic", "spend": 327.32, "requests": 4650 }
  ]
}`}</CodeBlock>
        </EndpointBlock>

        {/* Errors */}
        <section id="errors" className="scroll-mt-24 mb-12">
          <h2 className="text-xl font-bold text-text mb-4">Errors</h2>
          <p className="text-text-muted mb-4">
            All errors return a JSON object with <code className="font-mono text-xs bg-surface-alt px-1.5 py-0.5 rounded">error</code> and{' '}
            <code className="font-mono text-xs bg-surface-alt px-1.5 py-0.5 rounded">message</code> fields.
          </p>

          <CodeBlock language="json" title="Error Response">{`{
  "error": true,
  "message": "provider, model, and cost_usd are required"
}`}</CodeBlock>

          <div className="overflow-x-auto rounded-lg border border-border mt-4">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-surface-alt text-left">
                  <th className="px-4 py-2.5 font-semibold text-text-muted w-28">Status</th>
                  <th className="px-4 py-2.5 font-semibold text-text-muted">Meaning</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-border">
                  <td className="px-4 py-2.5 font-mono text-xs">400</td>
                  <td className="px-4 py-2.5 text-text-muted">Validation failed — missing or invalid fields</td>
                </tr>
                <tr className="border-t border-border">
                  <td className="px-4 py-2.5 font-mono text-xs">404</td>
                  <td className="px-4 py-2.5 text-text-muted">Endpoint not found</td>
                </tr>
                <tr className="border-t border-border">
                  <td className="px-4 py-2.5 font-mono text-xs">500</td>
                  <td className="px-4 py-2.5 text-text-muted">Internal server error</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Rate Limits & Notes */}
        <section id="notes" className="scroll-mt-24 mb-12">
          <h2 className="text-xl font-bold text-text mb-4">Rate Limits & Notes</h2>
          <div className="space-y-4 text-sm text-text-muted leading-relaxed">
            <p>No rate limits are enforced in the demo environment.</p>
            <p>
              In production, BirdsEye supports high-throughput event ingestion and is designed to handle
              thousands of events per second per organization without impacting your AI call latency.
            </p>
            <div className="bg-surface-alt border border-border rounded-lg p-4">
              <p className="font-semibold text-text text-sm mb-2">Coming Soon</p>
              <ul className="space-y-1 list-disc list-inside">
                <li><code className="font-mono text-xs bg-white px-1.5 py-0.5 rounded">POST /v1/events/batch</code> — send up to 100 events in a single request</li>
                <li>Official SDKs for Python, Node.js, Go, and Java</li>
                <li>Webhooks for cost alerts and anomaly detection</li>
                <li>Streaming event ingestion via WebSocket</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
