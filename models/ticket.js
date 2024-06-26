'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Ticket extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasOne(models.Event, {
        foreignKey: 'id',
        sourceKey:'event_id'
      });
    }
  }

  Ticket.init(
    {
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      event_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },

      attendees_count: {
        type: DataTypes.INTEGER,
        notNull: true,
        isNumeric: true,
      },
    },
    {
      sequelize,
      modelName: 'Ticket',
    }
  );
  return Ticket;
};
