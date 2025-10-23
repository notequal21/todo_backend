const jwt = require('jsonwebtoken');
const User = require('../schema/user');

// Миддлвара авторизации: проверяет JWT, подгружает пользователя и кладёт в req.user
module.exports = async function auth(req, res, next) {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'No token' });

    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(payload.id);
    if (!user)
      return res.status(401).json({ message: 'User deleted or not found' });

    req.user = user; // доступно как req.user.id
    return next();
  } catch (e) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};
