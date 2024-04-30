var express = require('express');
var router = express.Router();
const usersController = require('../controllers/users.controller');
const userValidator = require('../validators/user.validator');

router.post('/users',userValidator.validateUser(), usersController.createUser);

router.post('/auth', userValidator.validateAuthentication(),usersController.authenticateUser );


module.exports = router;

