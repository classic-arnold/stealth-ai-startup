const catchAsync = require('../utils/catchAsync');
const summaryService = require('../services/summary.service');

const get = catchAsync(async (req, res) => {
  const summary = summaryService.getSummary();
  res.json(summary);
});

module.exports = { get };
