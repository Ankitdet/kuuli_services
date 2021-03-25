
require('dotenv').config();
var csv = require('csv-parser')
var fs = require('fs');
var path = require('path');
var readLine = require('readline');

const getDataFromExcelSheet = async (req, res) => {

}

function fnc(line, number) {
    console.log('line:-', line)
    console.log('number:', number)
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
            console.log('Data loaded');
        })
}

readFromN2M(path.resolve(__dirname) + '../../../../resources/sample_data.csv', 1, 100, fnc);


module.exports = {
    getDataFromExcelSheet
}