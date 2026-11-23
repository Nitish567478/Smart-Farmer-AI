const mongoose = require('mongoose');

const emergencyReportSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    locationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Location'
    },
    coordinates: {
      latitude: { type: Number, min: -90, max: 90 },
      longitude: { type: Number, min: -180, max: 180 }
    },
    address: {
      type: String,
      trim: true
    },
    category: {
      type: String,
      enum: ['flood', 'storm', 'heat_emergency', 'infrastructure_disruption', 'water_shortage', 'other'],
      required: true
    },
    description: {
      type: String,
      required: true,
      trim: true
    },
    imageUrls: [
      {
        type: String,
        trim: true
      }
    ],
    severity: {
      type: String,
      enum: ['low', 'medium', 'high', 'critical'],
      default: 'medium'
    },
    verificationStatus: {
      type: String,
      enum: ['pending', 'verified', 'rejected', 'investigating'],
      default: 'pending'
    },
    status: {
      type: String,
      enum: ['reported', 'active', 'resolved', 'closed'],
      default: 'reported'
    },
    statusHistory: [
      {
        status: String,
        updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        note: String,
        updatedAt: { type: Date, default: Date.now }
      }
    ],
    assignedOfficerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  },
  { timestamps: true }
);

emergencyReportSchema.index({ verificationStatus: 1, status: 1 });
emergencyReportSchema.index({ category: 1, severity: 1 });
emergencyReportSchema.index({ userId: 1 });
emergencyReportSchema.index({ createdAt: -1 });

module.exports = mongoose.model('EmergencyReport', emergencyReportSchema);
