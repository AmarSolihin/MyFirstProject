const express = require('express');
const router = express.Router();
const {
  offerRide,
  bookRide,
  getAvailableRides,
  completeRide
} = require('../controllers/rideController');

// POST - offer a ride
router.post('/offer', offerRide);

// POST - book a ride
router.post('/book', bookRide);

// GET - view all available rides
router.get('/available', getAvailableRides);

// PUT - mark ride as complete
router.put('/complete/:rideId', completeRide);

module.exports = router;
