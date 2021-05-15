require('dotenv').config();
const pug = require('pug');
const Path = require('path');
const logger = require('../../logger/logger');
const executeQuery = require('../../db/connect');
const { OK, INTERNAL_SERVER_ERROR } = require('../../utils/apiStatus');

const fetchCustomerDetails = async (req, res) => {

    let query = `select * from customer_details`;

    try {
        return executeQuery(query).then((data) => {
            res.status(OK).send({ data, message: 'customer data fetched.' });
        });
    } catch (err) {
        res.status(INTERNAL_SERVER_ERROR).send({ message: err });
    }
}

module.exports = {
    fetchCustomerDetails: fetchCustomerDetails
};