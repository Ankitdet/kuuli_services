const express = require('express');
const router = express.Router({ mergeParams: true });

const allocationController = require('./allocation.controller');
const { carrierAllocation, downloadExcelPath, fetchCarrierAllocation, carrierAllocationDefineTargetValue, onLoadCarrierAllocation, updateTargetValues } = require('../../utils/urlConstant');

// Create new carrier allocation (When click on ContinueButton)
router.route(carrierAllocation).post(allocationController.carrierAllocationNew);

// Update carrier allocation's target values
router.route(updateTargetValues).post(allocationController.updateTargetValues);

// Get all created Carrier allocation in the System 
router.route(fetchCarrierAllocation).get(allocationController.fetchAllCarrierAllocation);

// Define target Values
router.route(carrierAllocationDefineTargetValue).post(allocationController.carrierAllocationNewDefineTargetValues);

// onLoad carrier allocation page
router.route(onLoadCarrierAllocation).get(allocationController.onLoadCarrierAllocation);

router.route(downloadExcelPath).get(allocationController.downloadExcel);

module.exports = router;