const mongoose = require('mongoose');

const farmProfileSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true
    },
    locationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Location',
      required: true
    },
    cropTypes: [
      {
        type: String,
        trim: true
      }
    ],
    soilType: {
      type: String,
      trim: true
    },
    area: {
      type: Number,
      min: 0
    },
    irrigationType: {
      type: String,
      trim: true
    }
  },
  { timestamps: true }
);

farmProfileSchema.index({ locationId: 1 });

module.exports = mongoose.model('FarmProfile', farmProfileSchema);
