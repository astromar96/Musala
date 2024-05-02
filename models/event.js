'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Event extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }

  //   - name (limited to 100 characters);
  // - date (in a valid date format);

  Event.init(
    {
      name: {
        type: DataTypes.STRING,
        len: [0, 100],
        notNull: true,
      },

      attendees_count: {
        type: DataTypes.INTEGER,
        notNull: true,
        isNumeric: true,
      },

      description: {
        type: DataTypes.STRING,
      },

      category: {
        type: DataTypes.ENUM,
        values: ['Concert', 'Conference', 'Game'],
      },

      date: {
        type: DataTypes.DATE,
        isDate: true,
        notNull: true,
      },
    },
    {
      sequelize,
      modelName: 'Event',
    }
  );
  return Event;
};
