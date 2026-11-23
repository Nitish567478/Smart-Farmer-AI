const mongoose = require('mongoose');

const farmerChatMessageSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true
    },
    sender: {
      type: String,
      enum: ['farmer', 'bot'],
      required: true
    },
    text: {
      type: String,
      required: true
    },
    imageUrl: {
      type: String,
      default: null
    },
    language: {
      type: String,
      default: 'auto'
    },
    diagnosis: {
      crop: String,
      condition: String,
      severity: String,
      immediateSteps: [String],
      treatment: String,
      prevention: String
    }
  },
  { timestamps: true }
);

farmerChatMessageSchema.index({ userId: 1, createdAt: 1 });

module.exports = mongoose.model('FarmerChatMessage', farmerChatMessageSchema);
