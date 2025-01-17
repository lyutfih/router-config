const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    connectionString: process.env.URL + "?sslmode=require",
});

module.exports = pool;