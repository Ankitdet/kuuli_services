const express = require('express');
const { basePath, allowcationBasePath } = require('../utils/urlConstant');
const user = require('./user/user.route');
const allocation = require('./allocation/allocation.route');
const dashboard = require('./dashboard/dashboard.route');

const router = express.Router();

router.use(basePath, user)
router.use(allowcationBasePath, allocation);
router.use(basePath, dashboard)
module.exports = router;