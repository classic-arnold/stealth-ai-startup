const express = require('express');
const eventsRoute = require('./events');
const summaryRoute = require('./summary');

const router = express.Router();

router.use('/events', eventsRoute);
router.use('/summary', summaryRoute);

module.exports = router;
