'use strict';

const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  port: process.env.DB_PORT,
  database: 'enlaces',
  connectionLimit: 100,
  timezone: 'Z',
});

module.exports = pool;
