// ticketController.test.js
const { list, cancel } = require('../../controllers/tickets.controller');
const { Ticket } = require('../../models');

describe('Ticket Controller Tests', () => {
  describe('list()', () => {
    it('should list tickets for a user', async () => {
      const req = { user: { id: 'userId' } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      // Mock Ticket.findAll function
      Ticket.findAll = jest.fn().mockResolvedValue([
        { id: 'ticketId1', attendees_count: 2 },
        { id: 'ticketId2', attendees_count: 1 },
      ]);

      await list(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalled();
    });
  });

  describe('cancel()', () => {
    it('should cancel a ticket', async () => {
      const req = { body: { id: 'ticketId' } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      // Mock Ticket.destroy function
      Ticket.destroy = jest.fn().mockResolvedValue();

      await cancel(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalled();
    });
  });
});
