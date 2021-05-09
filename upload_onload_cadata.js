require('dotenv').config();
const sql = require('sql');
const { Pool } = require('pg')
const { parse } = require('pg-connection-string')
const config = parse(process.env.DATABASE_URL)
const fs = require('fs');
const readLine = require('readline');
const csvParser = require('csv-parser');
const path = require('path');

config.ssl = {
    rejectUnauthorized: false
}
const pool = new Pool(config)

pool.connect((err, client, done) => {
    client.query('SELECT NOW()', (err, res) => {
        done()
        if (err) {
            console.error(err);
            return;
        }
        console.log('Connection successful.');
    });
});

let User = sql.define({
    name: 'onload_ca',
    columns: [
        "carrier_name",
        "logo",
        "service",
        "preferred_supplier",
        "ports",
        "contract_type",
        "container_type",
    ]
});
let usersToInsert = [];
function getData() {
    let filePath = "/resources/sample_data.csv";
    new Promise((resolve, rej) => {
        readFromN2M(path.resolve(__dirname) + filePath).then((data) => {
            resolve(data);
            console.log('usersToInsert', usersToInsert);
        })
    }).then((data) => {
        executeQuery();
        console.log(data);
    });
}
getData();
async function readFromN2M(fileName) {
    const lineReader = readLine.createInterface({
        input: fs.createReadStream(fileName)
    })
    return new Promise((res, rej) => {
        usersToInsert = [];
        fs.createReadStream(fileName)
            .pipe(csvParser())
            .on('data', (row) => {
                usersToInsert.push(row);
            }).on('end', () => {
                console.log('done reading');
                console.log(usersToInsert);
            });
    }).then((data) => {
        return data;
    }).catch((err) => {
        return err;
    });
}


const executeQuery = async () => {
    try {
        const client = await pool.connect();
        let query = User.insert(usersToInsert).toQuery();
        let { rows } = await client.query(query);
        console.log(rows);
        client.release()
        return data;
    } catch (err) {
        return err;
    }
}

executeQuery();