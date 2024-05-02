const jwt = require('jsonwebtoken');

function isAuthenticated(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.TOKEN_SECRET, (err, data) => {
    if (err) return res.sendStatus(403);
    req.user = { email: data.email, id: data.id };

    next();
  });
}

module.exports = isAuthenticated;
