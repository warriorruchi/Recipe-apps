// middleware/auth.js

const jwt = require('jsonwebtoken');
const config = require('../config.js');

function authenticateToken(req, res, next) {
  const token = req.header('authorization');

  if (!token) return res.status(401).json({ message: 'Unauthorized' });

  jwt.verify(token, config.secret, (err, user) => {
    if (err) return res.status(403).json({ message: 'Forbidden' });
    req.user = user;
    next();
  });
}

module.exports = authenticateToken;
