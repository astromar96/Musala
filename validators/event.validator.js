const { body, query } = require('express-validator');

const eventValidator = {
  create: [
    body('name')
      .notEmpty()
      .isLength({ max: 100 })
      .withMessage('Please enter valid Name with length limited to 100 chars'),

    body('date').isDate().withMessage('Please enter a valid date'),

    body('availableAttendeesCount')
      .isNumeric()
      .withMessage('enter valid value')
      .custom((val) => {
        if (parseInt(val) > 1000) {
          throw new Error(
            'Please enter a valid attendees count less than or equal to 1000'
          );
        } else {
          return true;
        }
      }),

    body('description')
      .notEmpty()
      .isString()
      .isLength({ max: 500 })
      .withMessage(
        'Please enter a valid description with length less than or equals 500'
      ),

    body('category')
      .notEmpty()
      .matches(/^(Concert|Conference|Game)$/gi)
      .withMessage(
        'Please enter a valid value as one of the following Concert,Conference or Game'
      ),
  ],

  list: [
    query('name').isEmpty().isString(),

    query('start_date')
      .isEmpty()
      .isDate()
      .withMessage('Please enter a valid date'),

    query('end_date')
      .isEmpty()
      .isDate()
      .withMessage('Please enter a valid date'),

    query('category')
      .isEmpty()
      .matches(/^(Concert|Conference|Game)$/gi)
      .withMessage(
        'Please enter a valid value as one of the following Concert, Conference or Game'
      ),
  ],
};

module.exports = eventValidator;
