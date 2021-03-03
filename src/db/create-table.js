require('dotenv').config();
const { Pool } = require('pg');
const { parse } = require('pg-connection-string')
const config = parse(process.env.DATABASE_URL)

config.ssl = {
    rejectUnauthorized: false
}
const pool = new Pool(config)

const query = `
CREATE SEQUENCE IF NOT EXISTS user_id_seq;
CREATE SEQUENCE IF NOT EXISTS contactus_id_seq;
CREATE SEQUENCE IF NOT EXISTS customer_forecast_id_seq;

CREATE TABLE IF NOT EXISTS "users" (
	"id" INTEGER NOT NULL DEFAULT nextval('user_id_seq'),
	"name" TEXT NOT NULL,
	"email" CHAR(50) NOT NULL,
    "company" CHAR(50) NOT NULL,
	"created_on" TIMESTAMP NOT NULL,
	PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "contactus" (
	"id" INTEGER NOT NULL DEFAULT nextval('contactus_id_seq'),
	"name" VARCHAR(500) NOT NULL,
	"email" VARCHAR(500) NOT NULL,
	"mobile" VARCHAR(50) NOT NULL,
	"message" TEXT NOT NULL,
    "created_on" TIMESTAMP NOT NULL,
    PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "customer_forecast" (
	"f_id" INTEGER NOT NULL DEFAULT nextval('customer_forecast_id_seq'),
	"valid_week" VARCHAR(500) NOT NULL,
	"valid_year" VARCHAR(500) NOT NULL,
	"route" VARCHAR(500) NOT NULL,
	"owner" VARCHAR(500) NOT NULL,
	"origin_shipment_type" VARCHAR(500) NOT NULL,
	"dest_shipment_type" VARCHAR(500) NOT NULL,
	"place_of_receipt" VARCHAR(500) NOT NULL,
	"place_of_delivery" VARCHAR(500) NOT NULL,
	"mother_vessel_discharge_point" VARCHAR(500) NOT NULL,
	"mother_vessel_load_point" VARCHAR(500) NOT NULL,
	"carrier_name" VARCHAR(500) NOT NULL,
	"customer_name" VARCHAR(500) NOT NULL,
	"carrier_service" VARCHAR(500) NOT NULL,
	"equipment_size" VARCHAR(500) NOT NULL,
	"equipment_type" VARCHAR(500) NOT NULL,
	"tarrif_ref" VARCHAR(500) NOT NULL,
	"commodity" VARCHAR(500) NOT NULL,
	"remarks" VARCHAR(500) NOT NULL,
	"heavy_weight" VARCHAR(500) NOT NULL,
	"forward_console" BOOLEAN NOT NULL,
	PRIMARY KEY ("f_id")
);

`

pool.connect((err, client, done) => {
    client.query(query, (err, res) => {
        console.log(err, res)
        client.end()
        console.log('Table Created Successfully.');
    });
});

module.exports = pool;