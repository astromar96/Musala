const { body } = require('express-validator');
const { User } = require('../models/index');

const userValidator = {
  create: [
    body('name')
      .notEmpty()
      .isLength({ max: 100 })
      .withMessage('Please enter valid Name with length limited to 100 chars'),

    body('password')
      .notEmpty()
      .isLength({ min: 8 })
      .withMessage(
        'Please enter valid password with length greater than 8 chars'
      ),

    body('email')
      .notEmpty()
      .withMessage('Please enter a valid email')
      .isEmail()
      .withMessage('Please enter a valid email')
      .custom(async (value) => {
        try {
          const user = await User.findOne({ where: { email: value } });
          if (user) {
            throw new Error('E-mail already in use');
          }
        } catch (e) {
          throw e;
        }
      }),
  ],
  authentice: [
    body('email')
      .notEmpty()
      .withMessage('Please enter a valid email')
      .isEmail()
      .withMessage('Please enter a valid email'),

    body('password')
      .notEmpty()
      .isLength({ min: 8 })
      .withMessage('Please enter valid Name with length greater than 8 chars'),
  ],
};

module.exports = userValidator;
