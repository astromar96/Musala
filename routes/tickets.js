var express = require('express');
var router = express.Router();
const ticketsController = require('../controllers/tickets.controller');
const isAuthenticated = require('../middlewares/isAuthenticated');

router.get('', isAuthenticated, ticketsController.list);

router.delete('', isAuthenticated, ticketsController.cancel);

module.exports = router;
