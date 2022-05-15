// PG database client/connection setup
const { Pool } = require("pg");
const dbConfig = require("../lib/db-config");
const db = new Pool(dbConfig);
db.connect();

module.exports = db;
