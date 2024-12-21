const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userController = {
  register: async (req, res) => {
    try {
      const { username, email, password, nama } = req.body;

      // Check existing user
      const existingUser = await User.findOne({ $or: [{ username }, { email }] });
      if (existingUser) {
        return res.status(400).json({ message: 'Username or email already exists' });
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 12);

      // Create new user
      const newUser = new User({
        username,
        email,
        password: hashedPassword,
        nama
      });

      await newUser.save();
      res.status(201).json({ message: 'Registration successful' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      // Find user
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: 'User not found' });
      }

      // Check password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }

      // Create token
      const token = jwt.sign(
        { id: user._id },
        process.env.JWT_SECRET,
        { expiresIn: '1d' }
      );

      res.json({ token, user: { id: user._id, username: user.username, email: user.email } });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  getProfile: async (req, res) => {
    try {
      const user = await User.findById(req.user.id).select('-password');
      res.json(user);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
};

module.exports = userController;