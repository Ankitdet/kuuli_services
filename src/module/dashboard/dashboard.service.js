
require('dotenv').config();
var csv = require('csv-parser')
var fs = require('fs');
const path = require('path');
const moment = require('moment');
const executeQuery = require('../../db/connect');
var readLine = require('readline');
const { NOT_FOUND, INTERNAL_SERVER_ERROR, OK } = require('../../utils/apiStatus');

const getDataFromExcelSheet = async (req, res) => {

}

const createQuotation = async (req, res) => {

    const { origin, destination, containerName, containerType, containerSize, containerQuantity, containerWeight, cargoReadyDate, incoterms, type } = req.body;
    let query = `INSERT INTO quotation("origin", "destination", "container_name", "container_type", "container_size", "container_quantity", "container_weight", "cargo_ready_date", "incoterms", "type", "created_on") 
            VALUES ('${origin}', '${destination}', '${containerName}', '${containerType}', '${containerSize}', '${containerQuantity}', '${containerWeight}', ''${moment(cargoReadyDate).format('YYYY-MM-DD HH:mm:ss')}', '${incoterms}', '${type}', '${moment(new Date()).format('YYYY-MM-DD HH:mm:ss')}')`;
    try {
        return executeQuery(query).then((data) => {
            res.status(OK).send({ message: 'Quotation successfully inserted.' });
        });
    } catch (err) {
        res.status(INTERNAL_SERVER_ERROR).send({ message: err });
    }
}

const fetchQuotation = async (req, res) => {
    let query = `SELECT * FROM quotation;`;
    try {
        return executeQuery(query).then((data) => {
            res.status(OK).send({ data: data.rows });
        });
    } catch (err) {
        res.status(INTERNAL_SERVER_ERROR).send({ message: err });
    }
}

const updateQuotation = async (req, res) => {

    const { qId, origin, destination, containerName, containerType, containerSize, containerQuantity, containerWeight, cargoReadyDate, incoterms, type } = req.body;
    if (!qId) res.status(NOT_FOUND).send({ message: "Id not found during update operation." });
    let query = `UPDATE "quotation" SET "origin"='${origin}', "destination"='${destination}', 
    "container_name"='${containerName}', "container_type"='${containerType}', 
    "container_size"='${containerSize}', "container_quantity"='${containerQuantity}', "container_weight"='${containerWeight}', 
    "cargo_ready_date"='${moment(cargoReadyDate).format('YYYY-MM-DD HH:mm:ss')}', "incoterms"='${incoterms}', "type"='${type}', "updated_on"='${moment(new Date()).format('YYYY-MM-DD HH:mm:ss')}' WHERE "q_id"='${qId}'`;

    try {
        return executeQuery(query).then((data) => {
            if (data.rowCount == 0) {
                res.status(OK).send({ rowCount: data.rowCount, message: 'Not data updated.' });
            } else {
                res.status(OK).send({ rowCount: data.rowCount, message: 'Quotation successfully updated.' });
            }
        });
    } catch (err) {
        res.status(INTERNAL_SERVER_ERROR).send({ message: err });
    }
}

const fetchQuotationById = async (req, res) => {
    let id = req.query.id;
    if (!id) res.status(NOT_FOUND).send({ message: "Id not found to fetch the data" });
    let query = `SELECT * FROM quotation where q_id=${id}`;
    try {
        return executeQuery(query).then((data) => {
            res.status(OK).send({ data: data.rows, message: 'Quotation successfully fectched.' });
        });
    } catch (err) {
        console.log(err);
        res.status(INTERNAL_SERVER_ERROR).send({ message: err });
    }
}

var data = [] ;
function fnc(line, number) {
    data.push(line);
}

function readFromN2M(fileName, n, m, func) {
    const lineReader = readLine.createInterface({
        input: fs.createReadStream(fileName)
    })

    let lineNumber = 0;
    fs.createReadStream(fileName)
        .pipe(csv())
        .on(
            'data', (row) => {
                lineReader.on('line', (line) => {
                    lineNumber++;
                    if (lineNumber >= n && lineNumber < m) {
                        func(row, lineNumber);
                    }
                });
            }
        ).on('end', () => {
            console.log(data);
            console.log('Data loaded');
        })
}

// readFromN2M(path.resolve(__dirname) + '../../../../resources/BTC-USD.csv', 1, 1000, fnc);


module.exports = {
    getDataFromExcelSheet,
    createQuotation,
    fetchQuotationById,
    updateQuotation,
    fetchQuotation
}