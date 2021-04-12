const express = require('express');
const router = express.Router({ mergeParams: true });

const allocationController = require('../../controllers/allocation/allocation.controller');
const { createForecast, createCarrier, carrierAllocation, fetchCarrierAllocation} = require('../../utils/urlConstant');

router.route(createForecast).post(allocationController.createForecaster);
router.route(createCarrier).post(allocationController.createCarrier);
router.route(carrierAllocation).post(allocationController.carrierAllocationNew);

router.route(fetchCarrierAllocation).get(allocationController.fetchAllCarrierAllocation);


module.exports = router;