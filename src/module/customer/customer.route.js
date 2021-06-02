const express = require('express');
const router = express.Router({ mergeParams: true });

const customerController = require('../../controllers/customer/customer.controller');
//const { fetchSearchById } = require('../../services/customer/customer.service');
const { fetchCustomerDetails, createCustomerDetails,fetchSearchById } = require('../../utils/urlConstant');

router.route(fetchCustomerDetails).get(customerController.fetchCustomerDetails);
router.route(fetchCustomerDetails).post(customerController.updateCustomerDetails);
router.route(fetchCustomerDetails).delete(customerController.deleteCustomerDetails);
router.route(createCustomerDetails).post(customerController.createCustomerDetails)
router.route(fetchSearchById).get(customerController.fetchSearchById)

module.exports = router;