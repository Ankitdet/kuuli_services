const logger = require('../../logger/logger');
const allocationService = require('../../services/allocation/allocation.service');
require('dotenv').config();

const createForecaster = function (req, res) {
    logger.info(`Customer forecast API called using data: ${JSON.stringify(req.body)}`)
    allocationService.createForecast(req, res).then((response) => {
        res.send(response);
    })
}

module.exports = {
    createForecaster,
};