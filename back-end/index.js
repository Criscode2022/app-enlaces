"use strict";
// Importaciones usando CommonJS
const express = require("express");
const app = express();
const { createPool } = require('./db/db.js'); // Importa createPool


app.get("/", (req, res) => {
  res.send("El servidor está activo!");
}); // Ruta para mostrar un mensaje en la raíz del servidor

app.get('/users', async (req, res) => {
  try {
    const pool = await createPool();
    const connection = await pool.getConnection();

    // Consulta a la base de datos
    const [rows, fields] = await connection.query('SELECT * FROM users');
    connection.release(); // Devolver la conexión al pool

    console.log('Resultados de la consulta:', rows);
    res.json(rows);
  } catch (error) {
    console.error('Error obteniendo o consultando la conexión a la base de datos:', error);
    return res.status(500).send('Error obteniendo o consultando la conexión a la base de datos');
  }
});

app.use((error, req, res, next) => {
  console.error(error);
  res.status(error.httpStatus || 500).send({
    status: "error",
    message: error.message,
  });
});

app.listen(process.env.SERVER_PORT, () => {
  console.log(`Server is running on port ${process.env.SERVER_PORT}`);
});
