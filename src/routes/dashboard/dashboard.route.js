const express = require('express');
const router = express.Router({ mergeParams: true });

const dashboardController = require('../../controllers/dashboard/dashboard.controller');
const { dashboardBasePath } = require('../../utils/urlConstant');

router.route(dashboardBasePath).post(dashboardController.getDataFromExcelSheet);

module.exports = router;