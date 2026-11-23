const express = require('express');
const router = express.Router();
const climateController = require('../controllers/climateController');
const { authenticate, authorize } = require('../middleware/auth');
const { aiLimiter } = require('../middleware/rateLimiter');

router.get('/risks', climateController.getClimateRiskIndices);
router.get('/alerts', climateController.getClimateAlerts);
router.post('/alerts', authenticate, authorize('admin', 'emergency_officer'), climateController.createClimateAlert);
router.post('/alerts/:id/explain', authenticate, aiLimiter, climateController.explainAlertWithAI);
router.get('/satellite', climateController.getSatelliteData);

module.exports = router;
