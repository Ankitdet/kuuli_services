const customerService = require('./customer.service');
const logger = require('../../logger/logger');

const fetchCustomerDetails = (req, res) => {
    logger.info(`fetching customer data`)
    customerService.fetchCustomerDetails(req, res).then((response) => res.send(response));
}

const updateCustomerDetails = (req, res) => {
    logger.info(`updating customer data`)
    customerService.updateCustomerDetails(req, res).then((response) => res.send(response));
}

const deleteCustomerDetails = (req, res) => {
    logger.info(`deleting customer data`)
    customerService.deleteCustomerDetails(req, res).then((response) => res.send(response));
}
const createCustomerDetails = (req, res) => {
    logger.info(`creating customer data`)
    customerService.createCustomerDetails(req, res).then((response) => res.send(response));
}
const searchCustomerById = (req, res) => {
    logger.info(`fetching customer data`)
    customerService.searchCustomerById(req, res).then((response) => res.send(response));
}

module.exports = {
    fetchCustomerDetails,
    updateCustomerDetails,
    deleteCustomerDetails,
    searchCustomerById,
    createCustomerDetails
};