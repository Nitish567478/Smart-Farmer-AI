const User = require('../models/User');
const EmergencyReport = require('../models/EmergencyReport');
const ClimateAlert = require('../models/ClimateAlert');
const ResourceDevice = require('../models/ResourceDevice');
const ResourceReading = require('../models/ResourceReading');
const Warehouse = require('../models/Warehouse');
const InventoryItem = require('../models/InventoryItem');
const Vehicle = require('../models/Vehicle');
const ReliefOrder = require('../models/ReliefOrder');
const AuditLog = require('../models/AuditLog');
const weatherService = require('../services/weather/weatherService');
const Location = require('../models/Location');

const getMainDashboardSummary = async (req, res, next) => {
  try {
    let { lat, lon, locationId } = req.query;

    if (locationId && (!lat || !lon)) {
      const loc = await Location.findById(locationId);
      if (loc) {
        lat = loc.latitude;
        lon = loc.longitude;
      }
    }

    if (lat === undefined || lon === undefined) {
      lat = 28.6139;
      lon = 77.2090;
    }

    let weather = null;
    try {
      weather = await weatherService.getWeather(lat, lon, locationId);
    } catch (wErr) {
      console.warn('[Dashboard Weather]', wErr.message);
    }

    const [totalEmergencies, activeEmergencies, verifiedEmergencies] = await Promise.all([
      EmergencyReport.countDocuments(),
      EmergencyReport.countDocuments({ status: { $in: ['reported', 'active'] } }),
      EmergencyReport.countDocuments({ verificationStatus: 'verified' })
    ]);

    const activeAlertsCount = await ClimateAlert.countDocuments({ status: 'active' });
    const recentAlerts = await ClimateAlert.find({ status: 'active' }).sort({ issuedAt: -1 }).limit(5);

    const [totalDevices, activeDevices] = await Promise.all([
      ResourceDevice.countDocuments(),
      ResourceDevice.countDocuments({ status: 'active' })
    ]);

    const activeReliefOrders = await ReliefOrder.countDocuments({
      status: { $in: ['created', 'dispatched', 'in_transit'] }
    });

    const recentEmergencies = await EmergencyReport.find({ verificationStatus: 'verified' })
      .populate('locationId', 'name state district')
      .sort({ createdAt: -1 })
      .limit(5);

    res.status(200).json({
      success: true,
      weather: weather || null,
      stats: {
        emergencies: {
          total: totalEmergencies,
          active: activeEmergencies,
          verified: verifiedEmergencies
        },
        alerts: {
          activeCount: activeAlertsCount
        },
        resources: {
          totalDevices,
          activeDevices
        },
        relief: {
          activeOrders: activeReliefOrders
        }
      },
      recentAlerts,
      recentEmergencies
    });
  } catch (error) {
    next(error);
  }
};

const getAdminDashboard = async (req, res, next) => {
  try {
    const [
      userCounts,
      emergencyCounts,
      reliefCounts,
      deviceCounts,
      inventoryTotals,
      vehicleCounts,
      recentLogs
    ] = await Promise.all([
      User.aggregate([{ $group: { _id: '$role', count: { $sum: 1 } } }]),
      EmergencyReport.aggregate([{ $group: { _id: '$verificationStatus', count: { $sum: 1 } } }]),
      ReliefOrder.aggregate([{ $group: { _id: '$status', count: { $sum: 1 } } }]),
      ResourceDevice.aggregate([{ $group: { _id: '$status', count: { $sum: 1 } } }]),
      InventoryItem.aggregate([{ $group: { _id: '$category', totalQuantity: { $sum: '$quantity' } } }]),
      Vehicle.aggregate([{ $group: { _id: '$availability', count: { $sum: 1 } } }]),
      AuditLog.find().populate('actorId', 'name email role').sort({ createdAt: -1 }).limit(10)
    ]);

    const totalUsers = await User.countDocuments();
    const totalWarehouses = await Warehouse.countDocuments();

    res.status(200).json({
      success: true,
      users: {
        total: totalUsers,
        byRole: userCounts
      },
      emergencies: emergencyCounts,
      reliefOrders: reliefCounts,
      resources: {
        devicesByStatus: deviceCounts
      },
      warehouses: {
        total: totalWarehouses,
        inventoryByCategory: inventoryTotals
      },
      vehicles: vehicleCounts,
      recentAuditLogs: recentLogs
    });
  } catch (error) {
    next(error);
  }
};

const getOfficerDashboard = async (req, res, next) => {
  try {
    const officerId = req.user._id;

    const [
      assignedEmergencies,
      unverifiedEmergencies,
      activeReliefOrders,
      availableVehicles,
      warehouses
    ] = await Promise.all([
      EmergencyReport.find({ assignedOfficerId: officerId, status: { $in: ['reported', 'active'] } })
        .populate('locationId')
        .sort({ createdAt: -1 }),
      EmergencyReport.find({ verificationStatus: 'pending' })
        .populate('userId', 'name phone')
        .sort({ createdAt: -1 }),
      ReliefOrder.find({ status: { $in: ['created', 'dispatched', 'in_transit'] } })
        .populate('emergencyReportId')
        .populate('warehouseId')
        .populate('vehicleId'),
      Vehicle.find({ availability: 'available' }),
      Warehouse.find().populate('locationId')
    ]);

    res.status(200).json({
      success: true,
      assignedCount: assignedEmergencies.length,
      unverifiedCount: unverifiedEmergencies.length,
      activeOrdersCount: activeReliefOrders.length,
      assignedEmergencies,
      unverifiedEmergencies,
      activeReliefOrders,
      availableVehicles,
      warehouses
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getMainDashboardSummary,
  getAdminDashboard,
  getOfficerDashboard
};
