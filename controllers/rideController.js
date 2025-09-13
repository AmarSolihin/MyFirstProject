const Ride = require('../models/Ride');

// Offer a ride (driver creates it)
const offerRide = async (req, res) => {
  try {
    const { driverId, pickupLocation, destination, time, price } = req.body;
    const newRide = new Ride({
      driverId,
      pickupLocation,
      destination,
      time,
      price
    });
    await newRide.save();
    res.status(201).json({ message: 'Ride offered successfully', ride: newRide });
  } catch (error) {
    res.status(500).json({ message: 'Error offering ride', error: error.message });
  }
};

// Book a ride (rider books it)
const bookRide = async (req, res) => {
  try {
    const { rideId, riderId } = req.body;

    const ride = await Ride.findById(rideId);
    if (!ride) return res.status(404).json({ message: 'Ride not found' });
    if (ride.riderId) return res.status(400).json({ message: 'Ride already booked' });

    ride.riderId = riderId;
    ride.status = 'accepted';
    await ride.save();
    res.json({ message: 'Ride booked successfully', ride });
  } catch (error) {
    res.status(500).json({ message: 'Error booking ride', error: error.message });
  }
};

// View all available rides (status = pending)
const getAvailableRides = async (req, res) => {
  try {
    const rides = await Ride.find({ status: 'pending' }).populate('driverId', 'name phone');
    res.json(rides);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching rides', error: error.message });
  }
};

// Mark ride as completed
const completeRide = async (req, res) => {
  try {
    const { rideId } = req.params;

    const ride = await Ride.findById(rideId);
    if (!ride) return res.status(404).json({ message: 'Ride not found' });

    ride.status = 'completed';
    await ride.save();
    res.json({ message: 'Ride marked as completed', ride });
  } catch (error) {
    res.status(500).json({ message: 'Error completing ride', error: error.message });
  }
};

module.exports = {
  offerRide,
  bookRide,
  getAvailableRides,
  completeRide
};
