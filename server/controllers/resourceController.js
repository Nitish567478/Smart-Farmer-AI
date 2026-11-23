const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const ResourceDevice = require('../models/ResourceDevice');
const ResourceReading = require('../models/ResourceReading');
const ClimateAlert = require('../models/ClimateAlert');
const Location = require('../models/Location');
const { broadcastToRole, sendNotification } = require('../services/notifications/notificationService');

const registerDevice = async (req, res, next) => {
  try {
    const { name, deviceType, locationId, warningThresholds, notes } = req.body;

    if (!name || !deviceType || !locationId) {
      return res.status(400).json({
        success: false,
        error: 'Please provide device name, deviceType, and locationId.'
      });
    }

    const loc = await Location.findById(locationId);
    if (!loc) {
      return res.status(404).json({ success: false, error: 'Location not found.' });
    }

    const deviceIdentifier = `CP-${deviceType.substring(0, 3).toUpperCase()}-${Date.now().toString(36).toUpperCase()}`;
    const rawApiKey = `cpa_key_${crypto.randomBytes(24).toString('hex')}`;

    const salt = await bcrypt.genSalt(10);
    const credentialHash = await bcrypt.hash(rawApiKey, salt);

    const device = await ResourceDevice.create({
      name,
      deviceType,
      locationId,
      deviceIdentifier,
      credentialHash,
      status: 'active',
      warningThresholds: warningThresholds || { min: 10, max: 90 },
      notes
    });

    res.status(201).json({
      success: true,
      message: 'Resource device registered successfully. Securely save the apiKey now as it will not be displayed again.',
      device: {
        id: device._id,
        name: device.name,
        deviceType: device.deviceType,
        deviceIdentifier: device.deviceIdentifier,
        status: device.status,
        warningThresholds: device.warningThresholds
      },
      credentials: {
        deviceIdentifier: device.deviceIdentifier,
        apiKey: rawApiKey,
        usageHeaderExample: {
          'x-device-id': device.deviceIdentifier,
          'x-device-key': rawApiKey
        }
      }
    });
  } catch (error) {
    next(error);
  }
};

const submitReading = async (req, res, next) => {
  try {
    const device = req.device; 
    const { resourceType, value, unit, measuredAt, source = 'iot_sensor' } = req.body;

    if (!resourceType || value === undefined || !unit) {
      return res.status(400).json({
        success: false,
        error: 'Please provide resourceType, numerical value, and unit.'
      });
    }

    const numValue = parseFloat(value);
    if (isNaN(numValue)) {
      return res.status(400).json({ success: false, error: 'Value must be a valid number.' });
    }

    const readingTime = measuredAt ? new Date(measuredAt) : new Date();

    const reading = await ResourceReading.create({
      deviceId: device._id,
      locationId: device.locationId,
      resourceType,
      value: numValue,
      unit,
      measuredAt: readingTime,
      receivedAt: new Date(),
      source
    });

    device.lastSeenAt = new Date();
    device.status = 'active';
    await device.save();

    let alertCreated = null;
    const thresholds = device.warningThresholds;
    if (thresholds) {
      let isThresholdBreached = false;
      let alertMsg = '';

      if (thresholds.min !== undefined && numValue < thresholds.min) {
        isThresholdBreached = true;
        alertMsg = `CRITICAL DEFICIT: ${device.name} reported ${numValue} ${unit}, falling below safety minimum of ${thresholds.min} ${unit}.`;
      } else if (thresholds.max !== undefined && numValue > thresholds.max) {
        isThresholdBreached = true;
        alertMsg = `EXCESS/SURGE WARNING: ${device.name} reported ${numValue} ${unit}, exceeding threshold limit of ${thresholds.max} ${unit}.`;
      }

      if (isThresholdBreached) {
        alertCreated = await ClimateAlert.create({
          locationId: device.locationId,
          alertType: `${resourceType.toUpperCase()}_THRESHOLD_ALERT`,
          severity: 'High',
          title: `Resource Alert: ${device.name}`,
          description: alertMsg,
          source: `IoT Device ${device.deviceIdentifier}`,
          status: 'active'
        });

        broadcastToRole('resource_manager', 'resource:threshold_alert', alertCreated);
        broadcastToRole('admin', 'resource:threshold_alert', alertCreated);
      }
    }

    broadcastToRole('resource_manager', 'resource:reading', {
      deviceId: device._id,
      deviceIdentifier: device.deviceIdentifier,
      name: device.name,
      resourceType,
      value: numValue,
      unit,
      measuredAt: readingTime
    });

    res.status(201).json({
      success: true,
      message: 'Reading recorded successfully.',
      readingId: reading._id,
      thresholdAlert: alertCreated ? alertCreated.title : null
    });
  } catch (error) {
    next(error);
  }
};

const getDevices = async (req, res, next) => {
  try {
    const { locationId, status } = req.query;
    const query = {};
    if (locationId) query.locationId = locationId;
    if (status) query.status = status;

    const devices = await ResourceDevice.find(query).populate('locationId').sort({ updatedAt: -1 });

    const thirtyMinutesAgo = new Date(Date.now() - 30 * 60 * 1000);
    const enrichedDevices = devices.map((dev) => {
      const isOnline = dev.lastSeenAt && new Date(dev.lastSeenAt) > thirtyMinutesAgo;
      return {
        ...dev.toObject(),
        isOnline: Boolean(isOnline),
        healthStatus: isOnline ? 'Online' : dev.lastSeenAt ? 'Offline' : 'Never connected'
      };
    });

    res.status(200).json({
      success: true,
      count: enrichedDevices.length,
      devices: enrichedDevices
    });
  } catch (error) {
    next(error);
  }
};

const getResourceAnalytics = async (req, res, next) => {
  try {
    const { deviceId, resourceType, locationId, hours = 24 } = req.query;

    const timeWindow = new Date(Date.now() - parseInt(hours) * 60 * 60 * 1000);
    const query = { measuredAt: { $gte: timeWindow } };

    if (deviceId) query.deviceId = deviceId;
    if (resourceType) query.resourceType = resourceType;
    if (locationId) query.locationId = locationId;

    const readings = await ResourceReading.find(query)
      .populate('deviceId', 'name deviceType deviceIdentifier')
      .sort({ measuredAt: 1 })
      .limit(100);

    res.status(200).json({
      success: true,
      count: readings.length,
      readings,
      note: readings.length === 0
        ? 'No authenticated IoT device readings have been received in this time period. Use POST /api/resources/readings with device credentials to ingest live telemetry.'
        : undefined
    });
  } catch (error) {
    next(error);
  }
};

const updateDevice = async (req, res, next) => {
  try {
    const { name, status, warningThresholds, notes } = req.body;
    const updates = {};
    if (name) updates.name = name;
    if (status) updates.status = status;
    if (warningThresholds) updates.warningThresholds = warningThresholds;
    if (notes !== undefined) updates.notes = notes;

    const device = await ResourceDevice.findByIdAndUpdate(req.params.id, updates, {
      new: true,
      runValidators: true
    });

    if (!device) {
      return res.status(404).json({ success: false, error: 'Device not found.' });
    }

    res.status(200).json({
      success: true,
      device
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  registerDevice,
  submitReading,
  getDevices,
  getResourceAnalytics,
  updateDevice
};
