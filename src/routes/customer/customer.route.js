const express = require('express');
const router = express.Router({ mergeParams: true });

const customerController = require('../../controllers/customer/customer.controller');
const { fetchCustomerDetails,createCustomerDetails } = require('../../utils/urlConstant');

router.route(fetchCustomerDetails).get(customerController.fetchCustomerDetails);
router.route(fetchCustomerDetails).post(customerController.updateCustomerDetails);
router.route(fetchCustomerDetails).delete(customerController.deleteCustomerDetails);
router.route(createCustomerDetails).post(customerController.createCustomerDetails)

module.exports = router;