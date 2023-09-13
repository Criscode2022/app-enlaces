// Importaciones usando CommonJS
const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mysql = require("mysql2");

dotenv.config(); // Configuración de dotenv

// Creación del pool de conexiones a la base de datos
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  port: process.env.DB_PORT,
  database: "enlaces",
  connectionLimit: 100,
});

app.get("/", (req, res) => {
  res.send("This server is now live!");
}); // Ruta para mostrar un mensaje en la raíz del servidor

app.get("/users", (req, res) => {
  // Obtener una conexión del pool
  pool.getConnection((err, connection) => {
    if (err) {
      console.error("Error obteniendo conexión a la base de datos:", err);
      return res
        .status(500)
        .send("Error obteniendo conexión a la base de datos");
    }

    // Consulta a la base de datos
    connection.query("SELECT * FROM users", (error, results, fields) => {
      connection.release(); // Devolver la conexión al pool

      if (error) {
        console.error("Error ejecutando la consulta:", error);
        return res.status(500).send("Error ejecutando la consulta");
      }

      console.log("Resultados de la consulta:", results);
      res.json(results);
    });
  });
});

app.use((error, req, res, next) => {
  console.error(error);
  res.status(404).send({
    status: "error",
    message: "Not found",
  });
});

app.listen(process.env.SERVER_PORT, () => {
  console.log(`Server is running on port ${process.env.SERVER_PORT}`);
});
