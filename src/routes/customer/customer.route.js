const express = require('express');
const router = express.Router({ mergeParams: true });

const customerController = require('../../controllers/customer/customer.controller');
const { fetchCustomerDetails } = require('../../utils/urlConstant');

router.route(fetchCustomerDetails).get(customerController.fetchCustomerDetails);

module.exports = router;