const dashboardService = require('../../services/dashboard/dashboard.service');
const logger = require('../../logger/logger');
require('dotenv').config();

const getDataFromExcelSheet = function (req, res) {
    logger.info(`Get data from Excelsheet ${JSON.stringify(req.body)}`)
    dashboardService.getDataFromExcelSheet(req, res).then((response) => {
        res.send(response);
    });
}


module.exports = {
    getDataFromExcelSheet,
};