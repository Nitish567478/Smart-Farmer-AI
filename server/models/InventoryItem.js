const mongoose = require('mongoose');

const inventoryItemSchema = new mongoose.Schema(
  {
    warehouseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Warehouse',
      required: true
    },
    itemName: {
      type: String,
      required: true,
      trim: true
    },
    quantity: {
      type: Number,
      required: true,
      min: 0,
      default: 0
    },
    unit: {
      type: String,
      required: true,
      trim: true
    },
    category: {
      type: String,
      enum: ['food', 'water', 'medical', 'shelter', 'equipment', 'other'],
      default: 'food'
    },
    updatedAt: {
      type: Date,
      default: Date.now
    }
  },
  { timestamps: true }
);

inventoryItemSchema.index({ warehouseId: 1, itemName: 1 }, { unique: true });

module.exports = mongoose.model('InventoryItem', inventoryItemSchema);
