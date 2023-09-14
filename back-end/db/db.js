"use strict"

const dotenv = require('dotenv');
const mysql = require('mysql2/promise'); // Importa mysql2/promise

dotenv.config();

let pool;

const createPool = async () => {
  if (!pool) {
    pool = mysql.createPool({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      port: process.env.DB_PORT,
      database: 'enlaces',
      connectionLimit: 100,
      timezone: 'Z',
    });
  }
  return pool;
};

module.exports = { createPool };