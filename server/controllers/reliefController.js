const Warehouse = require('../models/Warehouse');
const InventoryItem = require('../models/InventoryItem');
const Vehicle = require('../models/Vehicle');
const ReliefOrder = require('../models/ReliefOrder');
const EmergencyReport = require('../models/EmergencyReport');
const AuditLog = require('../models/AuditLog');
const { broadcastToRole, sendNotification } = require('../services/notifications/notificationService');


const getWarehouses = async (req, res, next) => {
  try {
    const warehouses = await Warehouse.find().populate('locationId').populate('managerId', 'name email');
    res.status(200).json({ success: true, count: warehouses.length, warehouses });
  } catch (error) {
    next(error);
  }
};

const createWarehouse = async (req, res, next) => {
  try {
    const { name, locationId, managerId, address, contactPhone } = req.body;
    if (!name || !locationId) {
      return res.status(400).json({ success: false, error: 'Warehouse name and locationId are required.' });
    }

    const warehouse = await Warehouse.create({
      name,
      locationId,
      managerId: managerId || req.user._id,
      address,
      contactPhone
    });

    res.status(201).json({ success: true, warehouse });
  } catch (error) {
    next(error);
  }
};


const getInventory = async (req, res, next) => {
  try {
    const { warehouseId, category } = req.query;
    const query = {};
    if (warehouseId) query.warehouseId = warehouseId;
    if (category) query.category = category;

    const items = await InventoryItem.find(query).populate('warehouseId', 'name locationId').sort({ itemName: 1 });
    res.status(200).json({ success: true, count: items.length, items });
  } catch (error) {
    next(error);
  }
};

const addInventoryItem = async (req, res, next) => {
  try {
    const { warehouseId, itemName, quantity, unit, category } = req.body;

    if (!warehouseId || !itemName || quantity === undefined || !unit) {
      return res.status(400).json({
        success: false,
        error: 'Please provide warehouseId, itemName, quantity, and unit.'
      });
    }

    const item = await InventoryItem.findOneAndUpdate(
      { warehouseId, itemName: itemName.trim() },
      {
        $inc: { quantity: parseFloat(quantity) },
        $set: { unit, category: category || 'food', updatedAt: new Date() }
      },
      { new: true, upsert: true }
    );

    await AuditLog.create({
      actorId: req.user._id,
      actorRole: req.user.role,
      action: 'INVENTORY_ADDED',
      entityType: 'InventoryItem',
      entityId: item._id.toString(),
      details: { warehouseId, itemName, quantity, unit }
    });

    res.status(201).json({ success: true, item });
  } catch (error) {
    next(error);
  }
};

const updateInventoryItem = async (req, res, next) => {
  try {
    const { quantity } = req.body;
    if (quantity === undefined || quantity < 0) {
      return res.status(400).json({ success: false, error: 'Valid positive quantity required.' });
    }

    const item = await InventoryItem.findByIdAndUpdate(
      req.params.id,
      { quantity: parseFloat(quantity), updatedAt: new Date() },
      { new: true }
    );

    if (!item) {
      return res.status(404).json({ success: false, error: 'Inventory item not found.' });
    }

    await AuditLog.create({
      actorId: req.user._id,
      actorRole: req.user.role,
      action: 'INVENTORY_ADJUSTED',
      entityType: 'InventoryItem',
      entityId: item._id.toString(),
      details: { newQuantity: quantity }
    });

    res.status(200).json({ success: true, item });
  } catch (error) {
    next(error);
  }
};


const getVehicles = async (req, res, next) => {
  try {
    const { availability, vehicleType } = req.query;
    const query = {};
    if (availability) query.availability = availability;
    if (vehicleType) query.vehicleType = vehicleType;

    const vehicles = await Vehicle.find(query).populate('locationId').populate('assignedOfficerId', 'name email');
    res.status(200).json({ success: true, count: vehicles.length, vehicles });
  } catch (error) {
    next(error);
  }
};

const createVehicle = async (req, res, next) => {
  try {
    const { vehicleIdentifier, vehicleType, locationId } = req.body;
    if (!vehicleIdentifier || !vehicleType) {
      return res.status(400).json({ success: false, error: 'Vehicle identifier and type are required.' });
    }

    const vehicle = await Vehicle.create({
      vehicleIdentifier: vehicleIdentifier.trim().toUpperCase(),
      vehicleType,
      locationId: locationId || undefined,
      availability: 'available'
    });

    res.status(201).json({ success: true, vehicle });
  } catch (error) {
    next(error);
  }
};


const createReliefOrder = async (req, res, next) => {
  try {
    const { emergencyReportId, warehouseId, inventoryItems, vehicleId, assignedTeam, routeReference } = req.body;

    if (!emergencyReportId || !warehouseId || !inventoryItems || inventoryItems.length === 0 || !assignedTeam) {
      return res.status(400).json({
        success: false,
        error: 'Please provide emergencyReportId, warehouseId, inventoryItems list, and assignedTeam.'
      });
    }

    const report = await EmergencyReport.findById(emergencyReportId);
    if (!report) {
      return res.status(404).json({ success: false, error: 'Emergency report not found.' });
    }

    for (const item of inventoryItems) {
      const stock = await InventoryItem.findOne({ warehouseId, itemName: item.itemName });
      if (!stock || stock.quantity < item.quantity) {
        return res.status(400).json({
          success: false,
          error: `Insufficient warehouse stock for item: "${item.itemName}". Available: ${stock ? stock.quantity : 0} ${stock ? stock.unit : ''}, Requested: ${item.quantity}.`
        });
      }
    }

    for (const item of inventoryItems) {
      await InventoryItem.updateOne(
        { warehouseId, itemName: item.itemName },
        { $inc: { quantity: -item.quantity }, $set: { updatedAt: new Date() } }
      );
    }

    if (vehicleId) {
      await Vehicle.findByIdAndUpdate(vehicleId, { availability: 'dispatched' });
    }

    const reliefOrder = await ReliefOrder.create({
      emergencyReportId,
      warehouseId,
      inventoryItems,
      vehicleId: vehicleId || undefined,
      assignedTeam,
      routeReference,
      status: 'created'
    });

    await AuditLog.create({
      actorId: req.user._id,
      actorRole: req.user.role,
      action: 'RELIEF_ORDER_CREATED',
      entityType: 'ReliefOrder',
      entityId: reliefOrder._id.toString(),
      details: { emergencyReportId, warehouseId, itemsCount: inventoryItems.length, vehicleId }
    });

    broadcastToRole('emergency_officer', 'relief:new', reliefOrder);
    broadcastToRole('admin', 'relief:new', reliefOrder);

    res.status(201).json({
      success: true,
      reliefOrder
    });
  } catch (error) {
    next(error);
  }
};

const getReliefOrders = async (req, res, next) => {
  try {
    const { status, emergencyReportId } = req.query;
    const query = {};
    if (status) query.status = status;
    if (emergencyReportId) query.emergencyReportId = emergencyReportId;

    const orders = await ReliefOrder.find(query)
      .populate('emergencyReportId')
      .populate('warehouseId')
      .populate('vehicleId')
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, count: orders.length, orders });
  } catch (error) {
    next(error);
  }
};

const updateReliefOrderStatus = async (req, res, next) => {
  try {
    const { status, deliveryEvidence } = req.body;

    const order = await ReliefOrder.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ success: false, error: 'Relief order not found.' });
    }

    order.status = status;

    if (status === 'dispatched') {
      order.dispatchAt = new Date();
    } else if (status === 'delivered') {
      order.deliveredAt = new Date();
      if (deliveryEvidence) order.deliveryEvidence = deliveryEvidence;
      if (order.vehicleId) {
        await Vehicle.findByIdAndUpdate(order.vehicleId, { availability: 'available' });
      }
    } else if (status === 'cancelled') {
      for (const item of order.inventoryItems) {
        await InventoryItem.updateOne(
          { warehouseId: order.warehouseId, itemName: item.itemName },
          { $inc: { quantity: item.quantity }, $set: { updatedAt: new Date() } }
        );
      }
      if (order.vehicleId) {
        await Vehicle.findByIdAndUpdate(order.vehicleId, { availability: 'available' });
      }
    }

    await order.save();

    broadcastToRole('emergency_officer', 'relief:status_changed', order);

    res.status(200).json({
      success: true,
      order
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getWarehouses,
  createWarehouse,
  getInventory,
  addInventoryItem,
  updateInventoryItem,
  getVehicles,
  createVehicle,
  createReliefOrder,
  getReliefOrders,
  updateReliefOrderStatus
};
