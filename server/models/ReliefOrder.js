const mongoose = require('mongoose');

const reliefOrderSchema = new mongoose.Schema(
  {
    emergencyReportId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'EmergencyReport',
      required: true
    },
    warehouseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Warehouse',
      required: true
    },
    inventoryItems: [
      {
        itemName: { type: String, required: true },
        quantity: { type: Number, required: true, min: 1 },
        unit: { type: String, required: true }
      }
    ],
    vehicleId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Vehicle'
    },
    assignedTeam: {
      type: String,
      required: true,
      trim: true
    },
    routeReference: {
      distanceKm: Number,
      durationMins: Number,
      summary: String,
      sourceCoords: [Number],
      destCoords: [Number]
    },
    status: {
      type: String,
      enum: ['created', 'dispatched', 'in_transit', 'delivered', 'cancelled'],
      default: 'created'
    },
    dispatchAt: {
      type: Date
    },
    deliveredAt: {
      type: Date
    },
    deliveryEvidence: {
      notes: { type: String, trim: true },
      photoUrls: [{ type: String }],
      signedBy: { type: String, trim: true }
    }
  },
  { timestamps: true }
);

reliefOrderSchema.index({ emergencyReportId: 1 });
reliefOrderSchema.index({ status: 1 });
reliefOrderSchema.index({ createdAt: -1 });

module.exports = mongoose.model('ReliefOrder', reliefOrderSchema);
