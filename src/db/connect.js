require('dotenv').config();
const { Pool } = require('pg')
const { parse } = require('pg-connection-string')
const config = parse(process.env.DATABASE_URL)

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

const executeQuery = async (query) => {
    try {
        const client = await pool.connect();
        let data = await client.query(query);
        client.release()
        return data;
    } catch (err) {
        return err;
    }
}

module.exports = executeQuery;