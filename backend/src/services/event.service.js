const eventModel = require('../models/event.model');
const ApiError = require('../utils/ApiError');

const normalize = (str) => (str ? String(str).trim().toLowerCase() : null);

const createEvent = (body) => {
  const { provider, model, cost_usd } = body;

  if (!provider || !model || cost_usd === undefined || cost_usd === null) {
    throw new ApiError(400, 'provider, model, and cost_usd are required');
  }

  const input_tokens = body.input_tokens || null;
  const output_tokens = body.output_tokens || null;
  let total_tokens = body.total_tokens || null;

  if (input_tokens && output_tokens && !total_tokens) {
    total_tokens = input_tokens + output_tokens;
  }

  const data = {
    timestamp: body.timestamp || new Date().toISOString(),
    team: normalize(body.team),
    app: normalize(body.app),
    provider: normalize(provider),
    model: normalize(model),
    request_text: body.request_text || null,
    response_text: body.response_text || null,
    input_tokens,
    output_tokens,
    total_tokens,
    cost_usd: parseFloat(cost_usd),
    latency_ms: body.latency_ms || null,
    metadata_json: body.metadata_json ? JSON.stringify(body.metadata_json) : null,
  };

  return eventModel.insert(data);
};

const getEvents = (query = {}) => {
  const limit = Math.min(parseInt(query.limit, 10) || 50, 200);
  const offset = parseInt(query.offset, 10) || 0;
  const events = eventModel.findRecent(limit, offset);
  const total = eventModel.count();
  return { events, total, limit, offset };
};

module.exports = { createEvent, getEvents };
