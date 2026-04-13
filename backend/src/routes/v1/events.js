const express = require('express');
const eventController = require('../../controllers/event.controller');

const router = express.Router();

router.post('/', eventController.create);
router.get('/', eventController.list);

module.exports = router;
