const express = require('express');
const router = express.Router({ mergeParams: true });

const dashboardController = require('../../controllers/dashboard/dashboard.controller');
const { dashboardBasePath, QuotationBasePath, QuotationCreateBasePath, QuotationUpdateBasePath, QuotationBasePathById } = require('../../utils/urlConstant');

router.route(dashboardBasePath).post(dashboardController.getDataFromExcelSheet);

//Quatiation
router.route(QuotationBasePathById).get(dashboardController.fetchQuotationById);
router.route(QuotationBasePath).get(dashboardController.fetchQuotation);
router.route(QuotationCreateBasePath).post(dashboardController.createQuotation);
router.route(QuotationUpdateBasePath).post(dashboardController.updateQuotation);

module.exports = router;