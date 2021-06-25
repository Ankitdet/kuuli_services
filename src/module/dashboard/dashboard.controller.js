const dashboardService = require('./dashboard.service');
const logger = require('../../logger/logger');
require('dotenv').config();

const getDataFromExcelSheet = (req, res) => {
    logger.info(`Get data from Excelsheet ${JSON.stringify(req.body)}`)
    dashboardService.getDataFromExcelSheet(req, res).then((response) => res.send(response));
}

const createQuotation = (req, res) => {
    logger.info(`createQuotation : ${JSON.stringify(req.body)}`)
    dashboardService.createQuotation(req, res).then((response) => res.send(response));
}

const quotationCompanyDetails = (req, res) => {
    logger.info(`Quoation Company Details Page API called`)
    dashboardService.quotationCompanyDetails(req, res).then((response) => res.send(response))
}

const insertQuotationCompanyDetails = (req, res) => {
    logger.info(`Insert Quoation Company Details Page API called. ${JSON.stringify(req.body)}`)
    dashboardService.insertQuotationCompanyDetails(req, res).then((response) => res.send(response))
}
const updateQuotationCompanyDetails = (req, res) => {
    logger.info(`Update Quoation Company Details Page API called. ${JSON.stringify(req.body)}`)
    dashboardService.updateQuotationCompanyDetails(req, res).then((response) => res.send(response))
}

const fetchQuotation = (req, res) => {
    logger.info(`fetchQuotation : ${JSON.stringify(req.body)}`)
    dashboardService.fetchQuotation(req, res).then((response) => res.send(response));
}

const updateQuotation = (req, res) => {
    logger.info(`updateQuotation : ${JSON.stringify(req.body)}`)
    dashboardService.updateQuotation(req, res).then((response) => res.send(response));
}

const fetchQuotationById = (req, res) => {
    logger.info(`fetchQuotationById : ${JSON.stringify(req.query.id)}`)
    dashboardService.fetchQuotationById(req, res).then((response) => res.send(response));
}

const onLoadQuotations = (req, res) => {
    logger.info(`onLoadQuotations : ${JSON.stringify(req.query.id)}`)
    dashboardService.onLoadQuotations(req, res).then((response) => res.send(response));
}

module.exports = {
    getDataFromExcelSheet,
    createQuotation,
    fetchQuotation,
    fetchQuotationById,
    updateQuotation,
    onLoadQuotations,
    quotationCompanyDetails,
    updateQuotationCompanyDetails,
    insertQuotationCompanyDetails
};