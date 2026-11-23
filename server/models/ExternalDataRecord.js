const mongoose = require('mongoose');

const externalDataRecordSchema = new mongoose.Schema(
  {
    provider: {
      type: String,
      required: true,
      trim: true
    },
    dataType: {
      type: String,
      required: true,
      enum: ['weather', 'forecast', 'mandi_prices', 'satellite', 'official_warnings', 'air_quality']
    },
    locationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Location'
    },
    observedAt: {
      type: Date,
      required: true
    },
    fetchedAt: {
      type: Date,
      default: Date.now,
      required: true
    },
    sourceUrl: {
      type: String,
      trim: true
    },
    payload: {
      type: mongoose.Schema.Types.Mixed,
      required: true
    },
    freshnessStatus: {
      type: String,
      enum: ['fresh', 'stale', 'expired'],
      default: 'fresh'
    }
  },
  { timestamps: true }
);

externalDataRecordSchema.index({ provider: 1, dataType: 1, locationId: 1 });
externalDataRecordSchema.index({ fetchedAt: -1 });

module.exports = mongoose.model('ExternalDataRecord', externalDataRecordSchema);
