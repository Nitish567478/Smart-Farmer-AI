const express = require('express');
const router = express.Router();
const resourceController = require('../controllers/resourceController');
const { authenticate, authorize, authenticateDevice } = require('../middleware/auth');

router.get('/', resourceController.getDevices);
router.get('/devices', authenticate, authorize('resource_manager', 'admin'), resourceController.getDevices);
router.post('/devices', authenticate, authorize('resource_manager', 'admin'), resourceController.registerDevice);
router.patch('/devices/:id', authenticate, authorize('resource_manager', 'admin'), resourceController.updateDevice);
router.post('/readings', authenticateDevice, resourceController.submitReading);
router.get('/analytics', resourceController.getResourceAnalytics);

module.exports = router;
