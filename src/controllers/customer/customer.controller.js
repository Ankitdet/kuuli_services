const customerService = require('../../services/customer/customer.service');
const logger = require('../../logger/logger');

const fetchCustomerDetails = function (req, res) {
    logger.info(`fetching customer data`)
    customerService.fetchCustomerDetails(req, res).then((response) => {
        res.send(response);
    });
}

module.exports = {
    fetchCustomerDetails : fetchCustomerDetails
};