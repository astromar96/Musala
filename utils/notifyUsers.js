const { Ticket, Event, Notification } = require('../models/index');
const moment = require('moment');
const { Op } = require('sequelize');

async function notifyUsers() {
  try {
    const t = await Ticket.findAll({
      include: [
        {
          model: Event,
          where: {
            date: {
              [Op.gte]: moment().utc().add(1, 'days').startOf('day').toDate(),
              [Op.lte]: moment().utc().add(2, 'days').startOf('day').toDate(),
            },
          },
          required: true,
        },
      ],
    });

    t.forEach(async (t) => {
      let ticket = t.dataValues;
      await Notification.create({
        ticket_id: ticket.id,
        user_id: ticket.user_id,
        event_id: ticket.event_id,
      });
    });
  } catch (e) {
    throw e;
  }
}

module.exports = notifyUsers;
