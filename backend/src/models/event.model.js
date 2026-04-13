const { db } = require('../db/init');

const insert = (data) => {
  const stmt = db.prepare(`
    INSERT INTO events (timestamp, team, app, provider, model, request_text, response_text,
      input_tokens, output_tokens, total_tokens, cost_usd, latency_ms, metadata_json)
    VALUES (@timestamp, @team, @app, @provider, @model, @request_text, @response_text,
      @input_tokens, @output_tokens, @total_tokens, @cost_usd, @latency_ms, @metadata_json)
  `);
  const result = stmt.run(data);
  return { id: result.lastInsertRowid, ...data };
};

const findRecent = (limit = 50, offset = 0) => {
  return db.prepare('SELECT * FROM events ORDER BY created_at DESC LIMIT ? OFFSET ?').all(limit, offset);
};

const count = () => {
  return db.prepare('SELECT COUNT(*) as total FROM events').get().total;
};

const aggregateTotals = () => {
  return db.prepare(`
    SELECT
      COALESCE(SUM(cost_usd), 0) as total_spend,
      COUNT(*) as total_requests,
      COALESCE(AVG(cost_usd), 0) as avg_cost_per_request
    FROM events
  `).get();
};

const spendByTeam = () => {
  return db.prepare(`
    SELECT team, SUM(cost_usd) as spend, COUNT(*) as requests
    FROM events
    GROUP BY team
    ORDER BY spend DESC
  `).all();
};

const spendByProvider = () => {
  return db.prepare(`
    SELECT provider, SUM(cost_usd) as spend, COUNT(*) as requests
    FROM events
    GROUP BY provider
    ORDER BY spend DESC
  `).all();
};

module.exports = { insert, findRecent, count, aggregateTotals, spendByTeam, spendByProvider };
