const express = require('express');
const router = express.Router({ mergeParams: true });

const allocationController = require('../../controllers/allocation/allocation.controller');
const { createForecast, createCarrier, carrierAllocation, fetchCarrierAllocation, carrierAllocationDefineTargetValue, getWeekStartEnd} = require('../../utils/urlConstant');

router.route(createForecast).post(allocationController.createForecaster);
router.route(createCarrier).post(allocationController.createCarrier);

// Create new carrier allocation in the System
router.route(carrierAllocation).post(allocationController.carrierAllocationNew);

// Get all created Carrier allocation in the System 
router.route(fetchCarrierAllocation).get(allocationController.fetchAllCarrierAllocation);

// Define target Values
router.route(carrierAllocationDefineTargetValue).post(allocationController.carrierAllocationNewDefineTargetValues);

// get Week Start and End from carrier Allocation Id
router.route(getWeekStartEnd).get(allocationController.getWeekStartEnd);

module.exports = router;