// isAuthenticated.test.js
const jwt = require('jsonwebtoken');
const isAuthenticated = require('../../middlewares/isAuthenticated');

describe('isAuthenticated Middleware Tests', () => {
  it('should call next() if token is valid', () => {
    // Mock req, res, and next functions
    const req = {
      headers: {
        authorization: 'Bearer validToken',
      },
    };
    const res = {
      sendStatus: jest.fn(),
    };
    const next = jest.fn();

    // Mock jwt.verify function
    jwt.verify = jest.fn().mockImplementation((token, secret, callback) => {
      callback(null, { email: 'user@example.com', id: 'userId' });
    });

    // Call the middleware
    isAuthenticated(req, res, next);

    // Verify that next() was called
    expect(next).toHaveBeenCalled();
  });

  it('should return status 401 if token is not provided', () => {
    // Mock req, res, and next functions
    const req = {
      headers: {},
    };
    const res = {
      sendStatus: jest.fn(),
    };
    const next = jest.fn();

    // Call the middleware
    isAuthenticated(req, res, next);

    // Verify that sendStatus(401) was called
    expect(res.sendStatus).toHaveBeenCalledWith(401);
    // Verify that next() was not called
    expect(next).not.toHaveBeenCalled();
  });

  it('should return status 403 if token is invalid', () => {
    // Mock req, res, and next functions
    const req = {
      headers: {
        authorization: 'Bearer invalidToken',
      },
    };
    const res = {
      sendStatus: jest.fn(),
    };
    const next = jest.fn();

    // Mock jwt.verify function to simulate an error
    jwt.verify = jest.fn().mockImplementation((token, secret, callback) => {
      callback(new Error('Invalid token'));
    });

    // Call the middleware
    isAuthenticated(req, res, next);

    // Verify that sendStatus(403) was called
    expect(res.sendStatus).toHaveBeenCalledWith(403);
    // Verify that next() was not called
    expect(next).not.toHaveBeenCalled();
  });
});
