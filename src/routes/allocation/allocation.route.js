const express = require('express');
const router = express.Router({ mergeParams: true });

const allocationController = require('../../controllers/allocation/allocation.controller');
const { createForecast } = require('../../utils/urlConstant');

router.route(createForecast).post(allocationController.createForecaster);


module.exports = router;