const mysql = require('mysql2/promise');
require('dotenv').config();

// Creamos el objeto de configuración para conectarnos a la BBDD
const dbConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    port: process.env.DB_PORT,
    database: 'enlaces',
    timezone: 'local'
};

async function connectToDBPool () {
    let pool;

    try {

        if (!pool) {
            pool = await mysql.createPool(dbConfig);
        }

        return await pool.getConnection();

    } catch (error) {
        throw new Error(error.message);
    }

}

async function sendQuery (query, values) {
  let connection;
  try {

      connection = await connectToDBPool();
      const [results] = await connection.query(query, values);
      return results;

  } catch (error) {
      throw new Error(error.message);
  } finally {
      if (connection) {
          connection.release();
      }
  }
}

module.exports = sendQuery;

