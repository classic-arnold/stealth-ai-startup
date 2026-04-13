const catchAsync = require('../utils/catchAsync');
const eventService = require('../services/event.service');

const create = catchAsync(async (req, res) => {
  const event = eventService.createEvent(req.body);
  res.status(201).json(event);
});

const list = catchAsync(async (req, res) => {
  const result = eventService.getEvents(req.query);
  res.json(result);
});

module.exports = { create, list };
