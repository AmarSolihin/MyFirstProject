const User = require('../models/User');

// Register new user
const registerUser = async (req, res) => {
  try {
    const { name, matricNo, role, phone, password } = req.body;

    // Check if matricNo is already used
    const userExists = await User.findOne({ matricNo });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const newUser = new User({ name, matricNo, role, phone, password });
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully', user: newUser });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Login user (simplified)
const loginUser = async (req, res) => {
  try {
    const { matricNo, password } = req.body;
    const user = await User.findOne({ matricNo, password });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    res.json({ message: 'Login successful', user });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// View profile
const getUserProfile = async (req, res) => {
  try {
    const { matricNo } = req.params;
    const user = await User.findOne({ matricNo });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getUserProfile,
};
