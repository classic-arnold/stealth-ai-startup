const Database = require('better-sqlite3');
const path = require('path');
const fs = require('fs');
const config = require('../config');

const dbDir = path.dirname(path.resolve(config.dbPath));
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
}

const db = new Database(path.resolve(config.dbPath));

// Enable WAL mode for better concurrent read performance
db.pragma('journal_mode = WAL');

function init() {
  db.exec(`
    CREATE TABLE IF NOT EXISTS events (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      timestamp TEXT,
      team TEXT,
      app TEXT,
      provider TEXT,
      model TEXT,
      request_text TEXT,
      response_text TEXT,
      input_tokens INTEGER,
      output_tokens INTEGER,
      total_tokens INTEGER,
      cost_usd REAL,
      latency_ms INTEGER,
      metadata_json TEXT,
      created_at TEXT DEFAULT (datetime('now'))
    )
  `);

  // Index for common queries
  db.exec(`CREATE INDEX IF NOT EXISTS idx_events_created_at ON events(created_at DESC)`);
  db.exec(`CREATE INDEX IF NOT EXISTS idx_events_team ON events(team)`);
  db.exec(`CREATE INDEX IF NOT EXISTS idx_events_provider ON events(provider)`);
}

module.exports = { db, init };
