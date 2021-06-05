require('dotenv').config();
const pug = require('pug');
const Path = require('path');
const logger = require('../../logger/logger');
const executeQuery = require('../../db/connect');
const { OK, INTERNAL_SERVER_ERROR } = require('../../utils/apiStatus');
const csvParser = require('csv-parser');

const fetchCustomerDetails = async (req, res) => {

    let query = `select * from customer_details`;

    try {
        return executeQuery(query).then((data) => {
            let tutorials = [{ id: 10, title: 20, description: 20, published: 200 }]
            const csvFields = ["Id", "Title", "Description", "Published"];
            const csvParserDate = new csvParser({ csvFields });
            const csvData = csvParserDate.parse(tutorials);

            res.set("Content-Type", "text/csv");
            res.setHeader("Content-Disposition", "attachment; filename=tutorials.csv");

            res.status(200).end(csvData);
            // res.status(OK).send({ data, message: 'customer data fetched.' });
        });
    } catch (err) {
        res.status(INTERNAL_SERVER_ERROR).send({ message: err });
    }


}

module.exports = {
    fetchCustomerDetails: fetchCustomerDetails
};