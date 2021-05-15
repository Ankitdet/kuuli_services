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
    name: 'carrier_allocation_new',
    columns: [
        "container_type",
        "container_name",
        "service",
        "supplier",
        "origin",
        "destination",
        "sailing",
        "type",
        "total_allocated_space",
        "uom",
        "actual_allocate_space",
        "costs",
        "start_date",
        "end_date",
        "week_1",
        "week_2",
        "week_3",
        "week_4",
        "week_5",
        "week_6",
        "week_7",
        "week_8",
        "week_9",
        "week_10",
        "week_11",
        "week_12",
        "week_13",
        "week_14",
        "week_15",
        "week_16",
        "week_17",
        "week_18",
        "week_19",
        "week_20",
        "week_21",
        "week_22",
        "week_23",
        "week_24",
        "week_25",
        "week_26",
        "week_27",
        "week_28",
        "week_29",
        "week_30",
        "week_31",
        "week_32",
        "week_33",
        "week_34",
        "week_35",
        "week_36",
        "week_37",
        "week_38",
        "week_39",
        "week_40",
        "week_41",
        "week_42",
        "week_43",
        "week_44",
        "week_45",
        "week_46",
        "week_47",
        "week_48",
        "week_49",
        "week_50",
        "week_51",
        "week_52"
    ]
});
let usersToInsert = [];
function getData() {
    let filePath = "/resources/carrier-allocation-csv-format.csv";
    new Promise((resolve, rej) => {
        readFromN2M(path.resolve(__dirname) + filePath).then((data) => {
            resolve(data);
        })
    }).then((data) => {
        executeQuery();
    });
}
// getData();
async function readFromN2M(fileName) {
    const lineReader = readLine.createInterface({
        input: fs.createReadStream(fileName)
    })
    return new Promise((res, rej) => {
        usersToInsert = [];
        fs.createReadStream(fileName)
            .pipe(csvParser([
                "container_type",
                "container_name",
                "service",
                "supplier",
                "origin",
                "destination",
                "sailing",
                "type",
                "total_allocated_space",
                "uom",
                "actual_allocate_space",
                "costs",
                "start_date",
                "end_date",
                "week_1",
                "week_2",
                "week_3",
                "week_4",
                "week_5",
                "week_6",
                "week_7",
                "week_8",
                "week_9",
                "week_10",
                "week_11",
                "week_12",
                "week_13",
                "week_14",
                "week_15",
                "week_16",
                "week_17",
                "week_18",
                "week_19",
                "week_20",
                "week_21",
                "week_22",
                "week_23",
                "week_24",
                "week_25",
                "week_26",
                "week_27",
                "week_28",
                "week_29",
                "week_30",
                "week_31",
                "week_32",
                "week_33",
                "week_34",
                "week_35",
                "week_36",
                "week_37",
                "week_38",
                "week_39",
                "week_40",
                "week_41",
                "week_42",
                "week_43",
                "week_44",
                "week_45",
                "week_46",
                "week_47",
                "week_48",
                "week_49",
                "week_50",
                "week_51",
                "week_52"]))
            .on('data', (row) => {
                usersToInsert.push(row);
            }).on('end', () => {
                console.log('done reading');
                usersToInsert = usersToInsert.slice(1);
            });
    }).then((usersToInsert) => {
        return usersToInsert;
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