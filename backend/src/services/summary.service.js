const eventModel = require('../models/event.model');

const getSummary = () => {
  const totals = eventModel.aggregateTotals();
  const byTeam = eventModel.spendByTeam();
  const byProvider = eventModel.spendByProvider();

  return {
    total_spend: Math.round(totals.total_spend * 100) / 100,
    total_requests: totals.total_requests,
    avg_cost_per_request: Math.round(totals.avg_cost_per_request * 10000) / 10000,
    spend_by_team: byTeam.map((r) => ({ ...r, spend: Math.round(r.spend * 100) / 100 })),
    spend_by_provider: byProvider.map((r) => ({ ...r, spend: Math.round(r.spend * 100) / 100 })),
  };
};

module.exports = { getSummary };
