'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Events', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },

      name: {
        type: Sequelize.STRING,
      },

      attendees_count: {
        type: Sequelize.INTEGER,
      },

      description: {
        type: Sequelize.STRING,
      },

      date: {
        type: Sequelize.DATE,
        allowNull: false,
      },

      category: {
        type: Sequelize.ENUM('Concert', 'Conference', 'Game'),
      },

      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },

      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Events');
  },
};
