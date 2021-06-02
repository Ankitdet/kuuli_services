const dashboardService = require('../../services/dashboard/dashboard.service');
const logger = require('../../logger/logger');
require('dotenv').config();

const getDataFromExcelSheet = function (req, res) {
    logger.info(`Get data from Excelsheet ${JSON.stringify(req.body)}`)
    dashboardService.getDataFromExcelSheet(req, res).then((response) => {
        res.send(response);
    });
}

const createQuotation = function (req, res) {
    logger.info(`createQuotation : ${JSON.stringify(req.body)}`)
    dashboardService.createQuotation(req, res).then((response) => {
        res.send(response);
    });
}

const fetchQuotation = function (req, res) {
    logger.info(`fetchQuotation : ${JSON.stringify(req.body)}`)
    dashboardService.fetchQuotation(req, res).then((response) => {
        res.send(response);
    });
}

const updateQuotation = function (req, res) {
    logger.info(`updateQuotation : ${JSON.stringify(req.body)}`)
    dashboardService.updateQuotation(req, res).then((response) => {
        res.send(response);
    });
}

const fetchQuotationById = function (req, res) {
    logger.info(`fetchQuotationById : ${JSON.stringify(req.query.id)}`)
    dashboardService.fetchQuotationById(req, res).then((response) => {
        res.send(response);
    });
}

module.exports = {
    getDataFromExcelSheet,
    createQuotation,
    fetchQuotation,
    fetchQuotationById,
    updateQuotation
};