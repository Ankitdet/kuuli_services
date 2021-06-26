require('dotenv').config();
const { Pool } = require('pg');
const { parse } = require('pg-connection-string')
const config = parse(process.env.DATABASE_URL)

config.ssl = {
    rejectUnauthorized: false
}
const pool = new Pool(config)

const query = `

ALTER TABLE customer_details ALTER COLUMN customer_id SET DEFAULT NULL;
ALTER TABLE customer_details ALTER COLUMN title   SET DEFAULT NULL;
ALTER TABLE customer_details ALTER COLUMN department   SET DEFAULT NULL;
ALTER TABLE customer_details ALTER COLUMN company_name  SET DEFAULT NULL;
ALTER TABLE customer_details ALTER COLUMN revenue   SET DEFAULT NULL;
ALTER TABLE customer_details ALTER COLUMN phone_number  SET DEFAULT NULL;
ALTER TABLE customer_details ALTER COLUMN mobile_number  SET DEFAULT NULL;

ALTER TABLE onload_ca ALTER COLUMN service SET DEFAULT NOT NULL;

ALTER TABLE quotation DROP COLUMN IF EXISTS container_size;
ALTER TABLE quotation DROP COLUMN IF EXISTS container_quantity;
ALTER TABLE quotation DROP COLUMN IF EXISTS container_weight;

ALTER TABLE quotation ADD IF NOT EXISTS tw_ft_container VARCHAR(100) DEFAULT NULL;
ALTER TABLE quotation ADD  IF NOT EXISTS ft_ft_container VARCHAR(100) DEFAULT NULL;
ALTER TABLE quotation ADD  IF NOT EXISTS  ft_ft_high_cube VARCHAR(100) DEFAULT NULL;
ALTER TABLE quotation ADD  IF NOT EXISTS  customer_id VARCHAR(100) DEFAULT NULL;

ALTER TABLE quotation ALTER COLUMN cargo_ready_date TYPE VARCHAR;
ALTER TABLE quotation ALTER COLUMN cargo_ready_date  SET DEFAULT NULL;

ALTER TABLE quotation_company_details ADD COLUMN add_charges text DEFAULT NULL;
ALTER TABLE quotation_company_details ADD COLUMN add_margin text DEFAULT NULL;


DO $$
BEGIN
  IF EXISTS(SELECT *
    FROM information_schema.columns
    WHERE table_name='quotation' and column_name='type')
  THEN
      ALTER TABLE quotation RENAME COLUMN "type" TO "terms";
  END IF;
END $$;
`

pool.connect((err, client, done) => {
    client.query(query, (err, res) => {
        console.log(err, res)
        client.end()
        console.log('Table altered Successfully.');
    });
});

module.exports = pool;