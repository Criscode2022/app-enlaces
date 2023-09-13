"use strict"

const dotenv = require('dotenv');
const mysql = require('mysql2');

const PORT = 3000; // El puerto 3000 es el puerto por defecto de Express

dotenv.config(); // Configuración de dotenv

let pool;

const getConnection = async () => { // Creación del pool de conexiones a la base de datos
    try {
    if (!pool) {
        pool = mysql.createPool({        
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASS,
            port: process.env.DB_PORT,
            database: 'enlaces',
            connectionLimit: 100,
            timezone: 'Z'
          });
        }
        return await pool.getConnection();
        
    } catch {
        throw new Error('Error obteniendo conexión a la base de datos');
    };
}

module.exports = {getConnection};
