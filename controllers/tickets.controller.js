const { User, Ticket } = require('../models/index');

async function list(req, res) {
  try {
    let tickets = await Ticket.findAll({ where: { user_id: req.user.id } });
    tickets = tickets.map(({ id, attendees_count }) => ({
      id,
      attendees_count,
    }));

    res.status(200).json({
      success: true,
      data: {
        tickets,
      },
    });
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
}

async function cancel(req, res) {
  try {
    await Ticket.destroy({ where: { id: req.body.id } });

    res.status(200).json({
      success: true,
    });
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
}
module.exports = {
  list,
  cancel,
};
