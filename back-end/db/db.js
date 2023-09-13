const mysql = require('mysql2/promise');
//Desestructuramos las variables de entorno:
const { DB_PORT, DB_HOST, DB_USER, DB_PASS, DB_DATABASE } = process.env;

//Creamos la función de conexión a la base de datos que exportaremos al final del código:
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
