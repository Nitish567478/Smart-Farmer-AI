const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const ResourceDevice = require('../models/ResourceDevice');

const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        error: 'Authentication required. Please provide a valid token in the Authorization header.'
      });
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'climate_pulse_super_secret_jwt_key_2026_change_in_production');

    const user = await User.findById(decoded.id).select('-passwordHash');
    if (!user) {
      return res.status(401).json({
        success: false,
        error: 'The user belonging to this token no longer exists.'
      });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      error: 'Invalid or expired authentication token.'
    });
  }
};

const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ success: false, error: 'User is not authenticated.' });
    }
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        error: `Access denied. Role '${req.user.role}' is not authorized to access this resource.`
      });
    }
    next();
  };
};

const authenticateDevice = async (req, res, next) => {
  try {
    const deviceIdentifier = req.headers['x-device-id'] || req.body.deviceIdentifier;
    const deviceKey = req.headers['x-device-key'] || req.body.deviceKey;

    if (!deviceIdentifier || !deviceKey) {
      return res.status(401).json({
        success: false,
        error: 'Device authentication required. Provide x-device-id and x-device-key headers.'
      });
    }

    const device = await ResourceDevice.findOne({ deviceIdentifier });
    if (!device) {
      return res.status(401).json({
        success: false,
        error: 'Unknown or unregistered resource device.'
      });
    }

    if (device.status === 'retired') {
      return res.status(403).json({
        success: false,
        error: 'Device has been decommissioned or retired.'
      });
    }

    const isMatch = await bcrypt.compare(deviceKey, device.credentialHash);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        error: 'Invalid device credentials.'
      });
    }

    req.device = device;
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: 'Device authentication error: ' + error.message
    });
  }
};

module.exports = { authenticate, authorize, authenticateDevice };
