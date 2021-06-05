const express = require('express');
const { basePath, allowcationBasePath, dashboardBasePath, customerbaseUrl } = require('./utils/urlConstant');
const user = require('./module/user/user.route');
const allocation = require('./module/allocation/allocation.route');
const dashboard = require('./module/dashboard/dashboard.route');
const customer = require('./module/customer/customer.route');

const router = express.Router();

router.use(basePath, user)
router.use(allowcationBasePath, allocation);
router.use(dashboardBasePath, dashboard)
router.use(customerbaseUrl, customer);
module.exports = router;