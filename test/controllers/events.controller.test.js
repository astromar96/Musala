// eventsController.test.js
const { create, list, reserve } = require('../../controllers/events.controller.js');
const { Event, Ticket } = require('../../models');

describe('Events Controller Tests', () => {
  describe('create()', () => {
    it('should create a new event', async () => {
      const req = { body:{
        "name": "string",
        "date": "2024-05-02",
        "availableAttendeesCount": 1000,
        "description": "string",
        "category": "Concert"
      } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await create(req, res);
      
      // Verify the response status and json call
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalled();
    });
  });

  describe('list()', () => {
    it('should list events', async () => {
      // Mock request object
      const req = { query: { /* query parameters */ } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await list(req, res);
      
      // Verify the response status and json call
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalled();
    });
  });

  describe('reserve()', () => {
    it('should reserve tickets for an event', async () => {
      // Mock request object
      const req = {
        param: jest.fn().mockReturnValue('eventId'),
        body: { attendeesCount: 5 },
        user: { id: 'userId' },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      // Mock the Event.findOne and Ticket.create functions
      Event.findOne = jest.fn().mockResolvedValue({ id: 'eventId', attendees_count: 10 });
      Ticket.sum = jest.fn().mockResolvedValue(5);

      await reserve(req, res);

      // Verify the response status and json call
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalled();
    });
  });
});
