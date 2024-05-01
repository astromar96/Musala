var express = require('express');
var router = express.Router();
const usersController = require('../controllers/users.controller');
const userValidator = require('../validators/user.validator');

router.post('/users',userValidator.create, usersController.create);

router.post('/auth', userValidator.authentice,usersController.authenticate );

module.exports = router;

