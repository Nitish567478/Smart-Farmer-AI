const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');
const { authenticate, authorize } = require('../middleware/auth');

router.get('/dashboard/summary', dashboardController.getMainDashboardSummary);
router.get('/admin/dashboard', authenticate, authorize('admin'), dashboardController.getAdminDashboard);
router.get('/officer/dashboard', authenticate, authorize('emergency_officer', 'admin'), dashboardController.getOfficerDashboard);

module.exports = router;
