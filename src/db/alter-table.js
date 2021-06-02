require('dotenv').config();
const { Pool } = require('pg');
const { parse } = require('pg-connection-string')
const config = parse(process.env.DATABASE_URL)

config.ssl = {
    rejectUnauthorized: false
}
const pool = new Pool(config)

const query = `

ALTER TABLE customer_details ALTER COLUMN customer_id SET DEFAULT NOT NULL;
ALTER TABLE customer_details ALTER COLUMN title   SET DEFAULT NOT NULL;
ALTER TABLE customer_details ALTER COLUMN department   SET DEFAULT NOT NULL;
ALTER TABLE customer_details ALTER COLUMN company_name  SET DEFAULT NOT NULL;
ALTER TABLE customer_details ALTER COLUMN revenue   SET DEFAULT NOT NULL;
ALTER TABLE customer_details ALTER COLUMN phone_number  SET DEFAULT NOT NULL;
ALTER TABLE customer_details ALTER COLUMN mobile_number  SET DEFAULT NOT NULL;



ALTER TABLE onload_ca ALTER COLUMN service SET DEFAULT NOT NULL;
`

pool.connect((err, client, done) => {
    client.query(query, (err, res) => {
        console.log(err, res)
        client.end()
        console.log('Table altered Successfully.');
    });
});

module.exports = pool;