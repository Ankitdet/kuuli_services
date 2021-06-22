const express = require('express');
const router = express.Router({ mergeParams: true });

const dashboardController = require('./dashboard.controller');
const { dashboardBasePath, QuotationBasePath, QuotationCreateBasePath, QuotationUpdateBasePath, QuotationBasePathById, OnLoadQoutation, quotationCompanyDetails, insertQuotationCompanyDetails, updateQuotationCompanyDetails } = require('../../utils/urlConstant');

router.route(dashboardBasePath).post(dashboardController.getDataFromExcelSheet);

//Quatiation
router.route(QuotationBasePathById).get(dashboardController.fetchQuotationById);
router.route(QuotationBasePath).get(dashboardController.fetchQuotation);
router.route(QuotationCreateBasePath).post(dashboardController.createQuotation);
router.route(QuotationUpdateBasePath).post(dashboardController.updateQuotation);
router.route(QuotationUpdateBasePath).post(dashboardController.updateQuotation);
router.route(OnLoadQoutation).get(dashboardController.onLoadQuotations);

router.route(quotationCompanyDetails).get(dashboardController.quotationCompanyDetails);
router.route(insertQuotationCompanyDetails).post(dashboardController.insertQuotationCompanyDetails);
router.route(updateQuotationCompanyDetails).post(dashboardController.updateQuotationCompanyDetails);

module.exports = router;