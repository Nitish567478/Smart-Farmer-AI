const mongoose = require('mongoose');

const warehouseSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    locationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Location',
      required: true
    },
    managerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    address: {
      type: String,
      trim: true
    },
    contactPhone: {
      type: String,
      trim: true
    }
  },
  { timestamps: true }
);

warehouseSchema.index({ locationId: 1 });

module.exports = mongoose.model('Warehouse', warehouseSchema);
