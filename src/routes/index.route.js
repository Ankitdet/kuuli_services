const express = require('express');
const { basePath } = require('../utils/urlConstant');
const user = require('./user/user.route');

const router = express.Router();

router.use(basePath, user)

module.exports = router;