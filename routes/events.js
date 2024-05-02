var express = require('express');
var router = express.Router();
const eventsController = require('../controllers/events.controller');
const eventValidator = require('../validators/event.validator');
const isAuthenticated = require('../middlewares/isAuthenticated');

router.post(
  '',
  isAuthenticated,
  eventValidator.create,
  eventsController.create
);

router.get('', isAuthenticated, eventValidator.list, eventsController.list);

router.post('/:eventId/tickets', isAuthenticated, eventsController.reserve);

module.exports = router;
