const { db, init } = require('./init');

const TEAMS = ['engineering', 'product', 'data-science', 'marketing', 'support'];
const APPS = ['code-assistant', 'chatbot', 'doc-summarizer', 'email-drafter', 'data-analyst'];
const PROVIDERS = {
  openai: ['gpt-4o', 'gpt-4o-mini', 'gpt-4-turbo'],
  anthropic: ['claude-3.5-sonnet', 'claude-3-haiku', 'claude-3-opus'],
  google: ['gemini-1.5-pro', 'gemini-1.5-flash'],
  mistral: ['mistral-large', 'mistral-medium'],
};

// Approximate cost per 1K tokens (input/output blended)
const COST_PER_1K = {
  'gpt-4o': 0.005,
  'gpt-4o-mini': 0.0003,
  'gpt-4-turbo': 0.01,
  'claude-3.5-sonnet': 0.006,
  'claude-3-haiku': 0.0005,
  'claude-3-opus': 0.03,
  'gemini-1.5-pro': 0.007,
  'gemini-1.5-flash': 0.0004,
  'mistral-large': 0.008,
  'mistral-medium': 0.003,
};

function rand(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generateEvent(daysAgo) {
  const provider = pick(Object.keys(PROVIDERS));
  const model = pick(PROVIDERS[provider]);
  const inputTokens = rand(50, 4000);
  const outputTokens = rand(20, 2000);
  const totalTokens = inputTokens + outputTokens;
  const costPer1K = COST_PER_1K[model] || 0.005;
  const costUsd = Math.round((totalTokens / 1000) * costPer1K * 10000) / 10000;
  const latencyMs = rand(200, 5000);

  const timestamp = new Date(Date.now() - daysAgo * 24 * 60 * 60 * 1000 - rand(0, 86400000));

  return {
    timestamp: timestamp.toISOString(),
    team: pick(TEAMS),
    app: pick(APPS),
    provider,
    model,
    request_text: null,
    response_text: null,
    input_tokens: inputTokens,
    output_tokens: outputTokens,
    total_tokens: totalTokens,
    cost_usd: costUsd,
    latency_ms: latencyMs,
    metadata_json: null,
  };
}

function seed(count = 80) {
  init();

  // Clear existing data
  db.exec('DELETE FROM events');

  const stmt = db.prepare(`
    INSERT INTO events (timestamp, team, app, provider, model, request_text, response_text,
      input_tokens, output_tokens, total_tokens, cost_usd, latency_ms, metadata_json)
    VALUES (@timestamp, @team, @app, @provider, @model, @request_text, @response_text,
      @input_tokens, @output_tokens, @total_tokens, @cost_usd, @latency_ms, @metadata_json)
  `);

  const insertMany = db.transaction((events) => {
    for (const event of events) {
      stmt.run(event);
    }
  });

  const events = [];
  for (let i = 0; i < count; i++) {
    const daysAgo = Math.random() * 7; // spread over last 7 days
    events.push(generateEvent(daysAgo));
  }

  insertMany(events);
  console.log(`Seeded ${count} events`);

  // Print quick summary
  const totals = db.prepare('SELECT SUM(cost_usd) as spend, COUNT(*) as count FROM events').get();
  console.log(`Total spend: $${Math.round(totals.spend * 100) / 100} across ${totals.count} events`);
}

seed();
