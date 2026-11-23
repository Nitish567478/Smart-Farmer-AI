const express = require('express');
const router = express.Router();
const agricultureController = require('../controllers/agricultureController');
const { authenticate } = require('../middleware/auth');
const { aiLimiter } = require('../middleware/rateLimiter');

router.get('/farms/me', authenticate, agricultureController.getMyFarmProfile);
router.post('/farms', authenticate, agricultureController.upsertFarmProfile);
router.patch('/farms/:id', authenticate, agricultureController.upsertFarmProfile);
router.post('/agriculture/advisory', authenticate, aiLimiter, agricultureController.requestCropAdvisory);
router.post('/agriculture/chat', authenticate, aiLimiter, agricultureController.farmerChat);
router.get('/agriculture/chat/history', authenticate, agricultureController.getFarmerChatHistory);
router.delete('/agriculture/chat/history', authenticate, agricultureController.clearFarmerChatHistory);

module.exports = router;
