# BirdsEye — AI Usage Intelligence

A minimal MVP/demo that receives AI usage events, stores them in SQLite, and displays a dashboard with spend and usage insights.

## Architecture

```
birdseye/
├── backend/          Express API (MVC)
│   └── src/
│       ├── config/       Environment config
│       ├── controllers/  HTTP request handlers
│       ├── db/           SQLite init + seed script
│       ├── middlewares/   Error handler
│       ├── models/       SQL query functions
│       ├── routes/v1/    Route definitions
│       ├── services/     Business logic
│       ├── utils/        catchAsync, ApiError
│       ├── app.js        Express app setup
│       └── server.js     Entry point
└── frontend/         React + Vite dashboard
    └── src/
        ├── api/          Axios API client
        ├── components/   KPI cards, charts, table
        ├── pages/        Dashboard page
        ├── App.jsx       App shell
        └── main.jsx      Entry point
```

**Data flow:** Frontend → Vite proxy (`/v1`) → Express API → SQLite → JSON response → React renders dashboard

## Quick Start

### 1. Install dependencies

```bash
cd backend && npm install
cd ../frontend && npm install
```

### 2. Seed demo data

```bash
cd backend && npm run seed
```

### 3. Start backend (terminal 1)

```bash
cd backend && npm run dev
# → http://localhost:3001
```

### 4. Start frontend (terminal 2)

```bash
cd frontend && npm run dev
# → http://localhost:5173
```

Open **http://localhost:5173** to see the dashboard.

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/v1/events` | Create an AI usage event |
| GET | `/v1/events` | List events (supports `?limit=N&offset=N`) |
| GET | `/v1/summary` | Dashboard summary (totals, spend by team/provider) |
| GET | `/health` | Health check |

### Example: Post an event

```bash
curl -X POST http://localhost:3001/v1/events \
  -H "Content-Type: application/json" \
  -d '{
    "provider": "openai",
    "model": "gpt-4o",
    "team": "engineering",
    "app": "code-assistant",
    "cost_usd": 0.05,
    "input_tokens": 500,
    "output_tokens": 200,
    "latency_ms": 1200
  }'
```

## Tech Stack

- **Backend:** Node.js, Express, better-sqlite3
- **Frontend:** React 19, Vite, Tailwind CSS v4, Recharts
- **Database:** SQLite (single file, zero config)
# stealth-ai-startup
