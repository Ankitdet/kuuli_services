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
CREATE TABLE IF NOT EXISTS "users" (
	"id" INTEGER NOT NULL DEFAULT nextval('user_id_seq'),
	"name" TEXT NOT NULL,
	"email" CHAR(50) NOT NULL,
    "company" CHAR(50) NOT NULL,
	"created_on" DATE NOT NULL,
	PRIMARY KEY ("id")
)
;
COMMENT ON COLUMN "users"."id" IS '';
COMMENT ON COLUMN "users"."name" IS '';
COMMENT ON COLUMN "users"."email" IS '';
COMMENT ON COLUMN "users"."created_on" IS '';
`

pool.connect((err, client, done) => {
    client.query(query, (err, res) => {
        console.log(err, res)
        client.end()
        console.log('Table Created Successfully.');
    });
});

module.exports = pool;