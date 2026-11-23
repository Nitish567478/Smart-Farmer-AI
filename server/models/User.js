const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      maxlength: 100
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address']
    },
    passwordHash: {
      type: String,
      required: [true, 'Password hash is required']
    },
    role: {
      type: String,
      enum: ['farmer', 'citizen', 'admin', 'emergency_officer', 'resource_manager'],
      default: 'citizen',
      required: true
    },
    phone: {
      type: String,
      trim: true
    },
    preferredLanguage: {
      type: String,
      default: 'hi'
    },
    savedLocationIds: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Location'
      }
    ]
  },
  { timestamps: true }
);

userSchema.index({ role: 1 });

module.exports = mongoose.model('User', userSchema);
