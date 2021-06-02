const customerService = require('../../services/customer/customer.service');
const logger = require('../../logger/logger');

const fetchCustomerDetails = function (req, res) {
    logger.info(`fetching customer data`)
    customerService.fetchCustomerDetails(req, res).then((response) => {
        res.send(response);
    });
}

const updateCustomerDetails = function (req, res) {
    logger.info(`updating customer data`)
    customerService.updateCustomerDetails(req, res).then((response) => {
        res.send(response);
    });
}

const  deleteCustomerDetails = function (req,res) {
    logger.info(`deleting customer data`)
    customerService.deleteCustomerDetails(req, res).then((response) => {
        res.send(response);
    });
}
const createCustomerDetails = function (req,res) {
    logger.info(`creating customer data`)
    customerService.createCustomerDetails(req, res).then((response) => {
        res.send(response);
    });
}
const fetchSearchById = function (req,res) {
    logger.info(`search customer data`)
    customerService.fetchSearchById(req, res).then((response) => {
        res.send(response);
    });
}

module.exports = {
    fetchCustomerDetails : fetchCustomerDetails,
    updateCustomerDetails :updateCustomerDetails,
    deleteCustomerDetails,
    createCustomerDetails,
    fetchSearchById
};