const express = require('express');
const router = express.Router();
const reliefController = require('../controllers/reliefController');
const { authenticate, authorize } = require('../middleware/auth');

router.get('/warehouses', authenticate, reliefController.getWarehouses);
router.post('/warehouses', authenticate, authorize('admin', 'emergency_officer'), reliefController.createWarehouse);

router.get('/inventory', authenticate, reliefController.getInventory);
router.post('/inventory', authenticate, authorize('admin', 'emergency_officer'), reliefController.addInventoryItem);
router.patch('/inventory/:id', authenticate, authorize('admin', 'emergency_officer'), reliefController.updateInventoryItem);

router.get('/vehicles', authenticate, reliefController.getVehicles);
router.post('/vehicles', authenticate, authorize('admin', 'emergency_officer'), reliefController.createVehicle);

router.get('/relief/orders', authenticate, reliefController.getReliefOrders);
router.post('/relief/orders', authenticate, authorize('admin', 'emergency_officer'), reliefController.createReliefOrder);
router.patch('/relief/orders/:id/status', authenticate, authorize('admin', 'emergency_officer'), reliefController.updateReliefOrderStatus);

module.exports = router;
