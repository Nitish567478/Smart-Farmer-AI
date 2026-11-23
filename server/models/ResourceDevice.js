const mongoose = require('mongoose');

const resourceDeviceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    deviceType: {
      type: String,
      enum: ['water_sensor', 'electricity_meter', 'solar_inverter', 'weather_station'],
      required: true
    },
    locationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Location',
      required: true
    },
    deviceIdentifier: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    credentialHash: {
      type: String,
      required: true
    },
    status: {
      type: String,
      enum: ['active', 'offline', 'maintenance', 'retired'],
      default: 'active'
    },
    lastSeenAt: {
      type: Date
    },
    warningThresholds: {
      min: { type: Number, default: 0 },
      max: { type: Number, default: 100 }
    },
    notes: {
      type: String,
      trim: true
    }
  },
  { timestamps: true }
);

resourceDeviceSchema.index({ locationId: 1 });
resourceDeviceSchema.index({ status: 1 });

module.exports = mongoose.model('ResourceDevice', resourceDeviceSchema);
