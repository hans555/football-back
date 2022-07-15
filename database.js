const { Pool } = require("pg");
require("dotenv").config();

let config = {
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  port: 5432
};

let pool = new Pool(config);

module.exports = {
  pool
};
