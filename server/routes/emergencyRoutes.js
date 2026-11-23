const express = require('express');
const router = express.Router();
const emergencyController = require('../controllers/emergencyController');
const { authenticate, authorize } = require('../middleware/auth');
const upload = require('../middleware/upload');
const { aiLimiter } = require('../middleware/rateLimiter');

router.post('/', authenticate, upload.array('images', 5), emergencyController.createReport);
router.get('/my', authenticate, emergencyController.getMyReports);
router.get('/', authenticate, authorize('emergency_officer', 'admin'), emergencyController.getAllReports);
router.get('/:id', authenticate, emergencyController.getReportById);
router.patch('/:id/verify', authenticate, authorize('emergency_officer', 'admin'), emergencyController.verifyReport);
router.patch('/:id/status', authenticate, authorize('emergency_officer', 'admin'), emergencyController.updateReportStatus);
router.patch('/:id/assign', authenticate, authorize('emergency_officer', 'admin'), emergencyController.assignOfficer);
router.post('/:id/ai-recommendations', authenticate, authorize('emergency_officer', 'admin'), aiLimiter, emergencyController.getAIRecommendations);

module.exports = router;
