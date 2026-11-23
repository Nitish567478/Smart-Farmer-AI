const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema(
  {
    vehicleIdentifier: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    vehicleType: {
      type: String,
      enum: ['truck', 'van', 'boat', 'drone', 'ambulance', 'utility'],
      required: true
    },
    locationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Location'
    },
    availability: {
      type: String,
      enum: ['available', 'dispatched', 'maintenance', 'unavailable'],
      default: 'available'
    },
    assignedOfficerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    lastGpsUpdateAt: {
      type: Date
    },
    coordinates: {
      latitude: { type: Number },
      longitude: { type: Number }
    }
  },
  { timestamps: true }
);

vehicleSchema.index({ availability: 1 });

module.exports = mongoose.model('Vehicle', vehicleSchema);
