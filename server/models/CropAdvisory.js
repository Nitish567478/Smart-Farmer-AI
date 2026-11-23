const mongoose = require('mongoose');

const cropAdvisorySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    locationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Location',
      required: false
    },
    crop: {
      type: String,
      required: true,
      trim: true
    },
    inputDataReferences: {
      weatherObservedAt: Date,
      mandiFetchedAt: Date,
      soilType: String,
      temperatureC: Number,
      rainfallMm: Number,
      humidityPct: Number
    },
    advisoryText: {
      type: String,
      required: true
    },
    language: {
      type: String,
      enum: ['en', 'hi'],
      default: 'en'
    },
    limitations: {
      type: String,
      required: true,
      default: 'Advisory is AI-assisted using current meteorological and market data. Yield, prices, and weather conditions are not guaranteed. Always cross-verify with local agricultural extension offices.'
    }
  },
  { timestamps: true }
);

cropAdvisorySchema.index({ userId: 1, crop: 1 });
cropAdvisorySchema.index({ createdAt: -1 });

module.exports = mongoose.model('CropAdvisory', cropAdvisorySchema);
