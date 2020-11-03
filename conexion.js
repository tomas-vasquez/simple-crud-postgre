require("dotenv").config();
const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.POSGRE_URL,
  ssl: true,
});

module.exports = pool;
