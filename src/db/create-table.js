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
CREATE SEQUENCE IF NOT EXISTS carrier_allocation_id_seq;
CREATE SEQUENCE IF NOT EXISTS quotation_id_seq;
CREATE SEQUENCE IF NOT EXISTS allocation_id_seq;
CREATE SEQUENCE IF NOT EXISTS target_id_seq;

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
	"created_on" TIMESTAMP NULL,
	"updated_on" TIMESTAMP NULL,
	PRIMARY KEY ("f_id")
);

CREATE TABLE IF NOT EXISTS "carrier_allocation" (
	"c_id" INTEGER NOT NULL DEFAULT nextval('carrier_allocation_id_seq'),
	"allocation_type" VARCHAR(500) NOT NULL,
	"allocation_level" VARCHAR(500) NOT NULL,
	"route" VARCHAR(500) NOT NULL,
	"owner" VARCHAR(500) NOT NULL,
	"from_year" VARCHAR(500) NOT NULL,
	"from_week" VARCHAR(500) NOT NULL,
	"to_year" VARCHAR(500) NOT NULL,
	"to_week" VARCHAR(500) NOT NULL,
	"generic_nac" VARCHAR(500) NOT NULL,
	"commitment" VARCHAR(500) NOT NULL,
	"status" VARCHAR(500) NOT NULL,
	"origin_shipment_type" VARCHAR(500) NOT NULL,
	"dest_shipment_type" VARCHAR(500) NOT NULL,
	"place_of_receipt" VARCHAR(500) NOT NULL,
	"place_of_delivery" VARCHAR(500) NOT NULL,
	"mother_vessel_discharge_point" VARCHAR(500) NOT NULL,
	"mother_vessel_load_point" VARCHAR(500) NOT NULL,
	"carrier_name" VARCHAR(500) NOT NULL,
	"customers" VARCHAR(500) NOT NULL,
	"carrier_service" VARCHAR(500) NOT NULL,
	"tarrif_ref" VARCHAR(500) NOT NULL,
	"equipment_type" VARCHAR(500) NOT NULL,
	"equipment_size" VARCHAR(500) NOT NULL,
	"space_status" VARCHAR(500) NOT NULL,
	"allocation_per_week" VARCHAR(500) NOT NULL,
	"total_allocation" VARCHAR(500) NOT NULL,
	"commodity" VARCHAR(500) NOT NULL,
	"remarks" VARCHAR(500) NOT NULL,
	"heavy_weight" VARCHAR(500) NOT NULL,
	"paying_cargo" VARCHAR(500) NOT NULL,
	"overbooking_allowance" VARCHAR(500) NOT NULL,
	"created_on" TIMESTAMP NULL,
	"updated_on" TIMESTAMP NULL,
	PRIMARY KEY ("c_id")
);

CREATE TABLE IF NOT EXISTS "quotation" (
	"q_id" INTEGER NOT NULL DEFAULT nextval('quotation_id_seq'),
	"origin" VARCHAR(500) NOT NULL,
	"destination" VARCHAR(500) NOT NULL,
	"container_name" VARCHAR(500) NOT NULL,
	"container_type" VARCHAR(500) NOT NULL,
	"container_size" VARCHAR(500) NOT NULL,
	"container_quantity" VARCHAR(500) NOT NULL,
	"container_weight" VARCHAR(500) NOT NULL,
	"cargo_ready_date" TIMESTAMP NOT NULL,
	"incoterms"  VARCHAR(500) NOT NULL,
	"type" VARCHAR(500) NOT NULL,
	"created_on" TIMESTAMP NULL,
	"updated_on" TIMESTAMP NULL,
	PRIMARY KEY ("q_id")
);

CREATE TABLE IF NOT EXISTS "carrier_allocation_new" (
	"ca_id" INTEGER NOT NULL DEFAULT nextval('allocation_id_seq'),
	"container_type" VARCHAR(500) NOT NULL,
	"container_name" VARCHAR(500) NOT NULL,
	"service" VARCHAR(500) NOT NULL,
	"supplier" VARCHAR(500) NOT NULL,
	"origin" VARCHAR(500) NOT NULL,
	"destination" VARCHAR(500) NOT NULL,
	"sailing" VARCHAR(500) NOT NULL,
	"type" VARCHAR(500) NOT NULL,
	"total_allocated_space" VARCHAR(500) NOT NULL,
	"start_date" TIMESTAMP NOT NULL,
	"end_date" TIMESTAMP NOT NULL,
	"created_on" TIMESTAMP NULL,
	"updated_on" TIMESTAMP NULL,
	PRIMARY KEY ("ca_id")
);

CREATE TABLE IF NOT EXISTS "target_values" (
	"target_id" INTEGER NOT NULL DEFAULT nextval('target_id_seq'),
	"ca_id" INTEGER NOT NULL,
	"week_1" VARCHAR(50) DEFAULT 0 NULL,
	"week_2" VARCHAR(50) DEFAULT 0 NULL,
	"week_3" VARCHAR(50) DEFAULT 0 NULL,
	"week_4" VARCHAR(50) DEFAULT 0 NULL,
	"week_5" VARCHAR(50) DEFAULT 0 NULL,
	"week_6" VARCHAR(50) DEFAULT 0 NULL,
	"week_7" VARCHAR(50) DEFAULT 0 NULL,
	"week_8" VARCHAR(50) DEFAULT 0 NULL,
	"week_9" VARCHAR(50) DEFAULT 0 NULL,
	"week_10" VARCHAR(50) DEFAULT 0 NULL,
	"week_11" VARCHAR(50) DEFAULT 0 NULL,
	"week_12" VARCHAR(50) DEFAULT 0 NULL,
	"week_13" VARCHAR(50) DEFAULT 0 NULL,
	"week_14" VARCHAR(50) DEFAULT 0 NULL,
	"week_15" VARCHAR(50) DEFAULT 0 NULL,
	"week_16" VARCHAR(50) DEFAULT 0 NULL,
	"week_17" VARCHAR(50) DEFAULT 0 NULL,
	"week_18" VARCHAR(50) DEFAULT 0 NULL,
	"week_19" VARCHAR(50) DEFAULT 0 NULL,
	"week_20" VARCHAR(50) DEFAULT 0 NULL,
	"week_21" VARCHAR(50) DEFAULT 0 NULL,
	"week_22" VARCHAR(50) DEFAULT 0 NULL,
	"week_23" VARCHAR(50) DEFAULT 0 NULL,
	"week_24" VARCHAR(50) DEFAULT 0 NULL,
	"week_25" VARCHAR(50) DEFAULT 0 NULL,
	"week_26" VARCHAR(50) DEFAULT 0 NULL,
	"week_27" VARCHAR(50) DEFAULT 0 NULL,
	"week_28" VARCHAR(50) DEFAULT 0 NULL,
	"week_29" VARCHAR(50) DEFAULT 0 NULL,
	"week_30" VARCHAR(50) DEFAULT 0 NULL,
	"week_31" VARCHAR(50) DEFAULT 0 NULL,
	"week_32" VARCHAR(50) DEFAULT 0 NULL,
	"week_33" VARCHAR(50) DEFAULT 0 NULL,
	"week_34" VARCHAR(50) DEFAULT 0 NULL,
	"week_35" VARCHAR(50) DEFAULT 0 NULL,
	"week_36" VARCHAR(50) DEFAULT 0 NULL,
	"week_37" VARCHAR(50) DEFAULT 0 NULL,
	"week_38" VARCHAR(50) DEFAULT 0 NULL,
	"week_39" VARCHAR(50) DEFAULT 0 NULL,
	"week_40" VARCHAR(50) DEFAULT 0 NULL,
	"week_41" VARCHAR(50) DEFAULT 0 NULL,
	"week_42" VARCHAR(50) DEFAULT 0 NULL,
	"week_43" VARCHAR(50) DEFAULT 0 NULL,
	"week_44" VARCHAR(50) DEFAULT 0 NULL,
	"week_45" VARCHAR(50) DEFAULT 0 NULL,
	"week_46" VARCHAR(50) DEFAULT 0 NULL,
	"week_47" VARCHAR(50) DEFAULT 0 NULL,
	"week_48" VARCHAR(50) DEFAULT 0 NULL,
	"week_49" VARCHAR(50) DEFAULT 0 NULL,
	"week_50" VARCHAR(50) DEFAULT 0 NULL,
	"week_51" VARCHAR(50) DEFAULT 0 NULL,
	"week_52" VARCHAR(50) DEFAULT 0 NULL,
	"created_on" TIMESTAMP NULL,
	"updated_on" TIMESTAMP NULL,
	PRIMARY KEY ("target_id")
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