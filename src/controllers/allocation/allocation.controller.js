const logger = require('../../logger/logger');
const allocationService = require('../../services/allocation/allocation.service');
require('dotenv').config();

const createForecaster = function (req, res) {
    logger.info(`Customer forecast API called using data: ${JSON.stringify(req.body)}`)
    allocationService.createForecast(req, res).then((response) => {
        res.send(response);
    })
}
const createCarrier = function (req, res) {
    logger.info(`Carrier Allocation API called using data: ${JSON.stringify(req.body)}`)
    allocationService.carrierAllocation(req, res).then((response) => {
        res.send(response);
    })
}

const carrierAllocationNew = function (req, res) {
    logger.info(`Carrier Allocation New API called using data: ${JSON.stringify(req.body)}`)
    allocationService.carrierAllocationNew(req, res).then((response) => {
        res.send(response);
    })
}

const fetchAllCarrierAllocation = function (req, res) {
    logger.info(`Carrier get data`)
    allocationService.fetchAllCarrierAllocation(req, res).then((response) => {
        res.send(response);
    })
}

const carrierAllocationNewDefineTargetValues = function (req, res) {
    logger.info(`carrierAllocationNewDefineTargetValues API called using data: ${JSON.stringify(req.body)}`)
    allocationService.carrierAllocationNewDefineTargetValues(req, res).then((response) => {
        res.send(response);
    })
}

const getWeekStartEnd = function(req, res) {
    logger.info(`getWeek Start and End Value called using data: ${JSON.stringify(req.body)}`)
    allocationService.getWeekStartEnd(req, res).then((response) => {
        res.send(response);
    })
}

const onLoadCarrierAllocation = function(req, res) {
    logger.info(`OnLoad Carrier Allocation Page API called. ${JSON.stringify(req.body)}`)
    allocationService.onLoadCarrierAllocation(req, res).then((response) => {
        res.send(response);
    })
}

module.exports = {
    createForecaster,
    createCarrier,
    carrierAllocationNew,
    fetchAllCarrierAllocation,
    carrierAllocationNewDefineTargetValues,
    getWeekStartEnd,
    onLoadCarrierAllocation
};