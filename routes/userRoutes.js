const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getUserProfile } = require('../controllers/userController');

// Register
router.post('/register', registerUser);

// Login
router.post('/login', loginUser);

// View Profile
router.get('/profile/:matricNo', getUserProfile);

module.exports = router;
