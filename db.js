const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "smart_campus",
  password: "Azibhariz123",
  port: 5432,
});

module.exports = pool;