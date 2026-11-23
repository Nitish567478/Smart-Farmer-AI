const express = require('express');
const router = express.Router();
const locationController = require('../controllers/locationController');
const { authenticate } = require('../middleware/auth');

router.get('/search', locationController.searchLocations);
router.get('/:id', locationController.getLocationById);
router.post('/', authenticate, locationController.createLocation);

module.exports = router;
