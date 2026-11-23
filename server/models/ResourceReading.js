const mongoose = require('mongoose');

const resourceReadingSchema = new mongoose.Schema(
  {
    deviceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'ResourceDevice',
      required: true
    },
    locationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Location',
      required: true
    },
    resourceType: {
      type: String,
      enum: ['water', 'electricity', 'solar'],
      required: true
    },
    value: {
      type: Number,
      required: true
    },
    unit: {
      type: String,
      required: true,
      trim: true
    },
    measuredAt: {
      type: Date,
      required: true
    },
    receivedAt: {
      type: Date,
      default: Date.now,
      required: true
    },
    source: {
      type: String,
      default: 'iot_device',
      trim: true
    }
  },
  { timestamps: true }
);

resourceReadingSchema.index({ deviceId: 1, measuredAt: -1 });
resourceReadingSchema.index({ locationId: 1, resourceType: 1 });
resourceReadingSchema.index({ measuredAt: -1 });

module.exports = mongoose.model('ResourceReading', resourceReadingSchema);
