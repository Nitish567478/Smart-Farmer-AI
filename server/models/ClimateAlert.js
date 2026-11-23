const mongoose = require('mongoose');

const climateAlertSchema = new mongoose.Schema(
  {
    locationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Location'
    },
    alertType: {
      type: String,
      required: true,
      trim: true
    },
    severity: {
      type: String,
      enum: ['Low', 'Moderate', 'High', 'Critical'],
      required: true
    },
    title: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      required: true,
      trim: true
    },
    source: {
      type: String,
      required: true,
      trim: true
    },
    sourceUrl: {
      type: String,
      trim: true
    },
    issuedAt: {
      type: Date,
      default: Date.now,
      required: true
    },
    expiresAt: {
      type: Date
    },
    status: {
      type: String,
      enum: ['active', 'resolved', 'expired'],
      default: 'active'
    }
  },
  { timestamps: true }
);

climateAlertSchema.index({ severity: 1, status: 1 });
climateAlertSchema.index({ locationId: 1 });
climateAlertSchema.index({ issuedAt: -1 });

module.exports = mongoose.model('ClimateAlert', climateAlertSchema);
