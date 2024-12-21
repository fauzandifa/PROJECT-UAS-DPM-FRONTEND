const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  try {
    const token = req.header('Authorization');
    if (!token) {
      return res.status(401).json({ message: 'Authorization denied' });
    }

    const decoded = jwt.verify(token.replace('Bearer ', ''), process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token is invalid' });
  }
};

module.exports = auth;