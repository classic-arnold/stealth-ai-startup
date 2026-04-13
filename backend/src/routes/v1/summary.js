const express = require('express');
const summaryController = require('../../controllers/summary.controller');

const router = express.Router();

router.get('/', summaryController.get);

module.exports = router;
