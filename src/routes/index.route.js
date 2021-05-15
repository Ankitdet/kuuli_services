const express = require('express');
const { basePath, allowcationBasePath, dashboardBasePath, customerbaseUrl } = require('../utils/urlConstant');
const user = require('./user/user.route');
const allocation = require('./allocation/allocation.route');
const dashboard = require('./dashboard/dashboard.route');
const customer = require('./customer/customer.route');

const router = express.Router();

router.use(basePath, user)
router.use(allowcationBasePath, allocation);
router.use(dashboardBasePath, dashboard)
router.use(customerbaseUrl, customer);
module.exports = router;