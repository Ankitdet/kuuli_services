const express = require('express');
const router = express.Router({ mergeParams: true });

const allocationController = require('../../controllers/allocation/allocation.controller');
const { createForecast, createCarrier } = require('../../utils/urlConstant');

router.route(createForecast).post(allocationController.createForecaster);
router.route(createCarrier).post(allocationController.createCarrier);


module.exports = router;