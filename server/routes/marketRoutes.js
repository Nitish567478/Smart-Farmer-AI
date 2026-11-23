const express = require('express');
const router = express.Router();
const agricultureController = require('../controllers/agricultureController');

router.get('/prices', agricultureController.getMandiPrices);

module.exports = router;
