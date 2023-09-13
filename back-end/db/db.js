const mysql = require('mysql2/promise');
const { DB_PORT, DB_HOST, DB_USER, DB_PASS, DB_DATABASE } = process.env;

let pool;
const getConnection = async () => {
  if (!pool) {
    pool = mysql.createPool({
      connectionLimit: 10,
      host: DB_HOST,
      user: DB_USER,
      password: DB_PASSWORD,
      database: DB_DATABASE,
      timezone: 'local'
    });
  }
  return await pool.getConnection();
};

module.exports = {
  getConnection
};
