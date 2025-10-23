var express = require('express');
var router = express.Router();
const User = require('../schema/user');
const jwt = require('jsonwebtoken');

function generateToken(user) {
  return jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, {
    expiresIn: '1d',
  });
}

const authMiddleware = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'No token' });

  const user = await User.findById(
    jwt.verify(token, process.env.JWT_SECRET).id
  );
  if (!user)
    return res.status(401).json({ message: 'User deleted or not found' });

  req.user = user;
  next();
};

router.post('/register', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.create({
    username,
    password,
    createdAt: new Date(),
    updatedAt: new Date(),
  });
  res.status(200).json({ token: generateToken(user), success: true });
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user || !(await user.matchPassword(password))) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
  res.status(200).json({ token: generateToken(user), success: true });
});

router.get('/me', authMiddleware, async (req, res) => {
  const user = await User.findById(req.user.id);
  res.status(200).json({
    id: user._id,
    username: user.username,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  });
});

router.get('/all', authMiddleware, async (req, res) => {
  const users = await User.find();
  res.status(200).json(users);
});

router.post('/logout', authMiddleware, async (req, res) => {
  res.clearCookie('token');
  res.status(200).json({ message: 'Logged out' });
});

module.exports = router;
