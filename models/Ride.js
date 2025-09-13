const mongoose = require('mongoose');

const rideSchema = new mongoose.Schema({
  driverId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  riderId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  pickupLocation: { type: String, required: true },
  destination: { type: String, required: true },
  time: { type: Date, required: true },
  status: { type: String, enum: ['pending', 'accepted', 'completed'], default: 'pending' },
  price: { type: Number }
}, { timestamps: true });

module.exports = mongoose.model('Ride', rideSchema);
