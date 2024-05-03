// userController.test.js
const { create, authenticate } = require('../../controllers/users.controller');
const { User } = require('../../models');
const jwt = require('jsonwebtoken');
const { hashSync } = require('bcrypt');

describe('User Controller Tests', () => {
  describe('create()', () => {
    it('should create a new user', async () => {
      const req = { body: {
        "name": "string",
        "email": "user@example.com",
        "password": "stringst"
      } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      // Mock User.create function
      User.create = jest.fn().mockResolvedValue({ id: 'userId', name: 'John', email: 'john@example.com' });

      await create(req, res);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalled();
    });

  });

  describe('authenticate()', () => {
    it('should authenticate a user', async () => {
      const req = { body: { email: 'john@example.com', password: 'password' } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      // Mock User.findOne function
      User.findOne = jest.fn().mockResolvedValue({
        id: 'userId',
        email: 'john@example.com',
        password: hashSync('password', 10),
      });

      // Mock jwt.sign function
      jwt.sign = jest.fn().mockReturnValue('mocked.token');

      await authenticate(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalled();
    });
  });
});
