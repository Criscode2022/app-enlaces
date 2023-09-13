// Importaciones usando CommonJS
const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mysql = require('mysql2');
const { getLinksController } = require('/controllers/getLinksController');

const PORT = 3000; // El puerto 3000 es el puerto por defecto de Express

dotenv.config(); // Configuración de dotenv

app.get('/', (req, res) => {
  res.send('This server is now live!');
}); // Ruta para mostrar un mensaje en la raíz del servidor

app.get('/users', (req, res) => {
  // Obtener una conexión del pool
  pool.getConnection((err, connection) => {
    if (err) {
      console.error('Error obteniendo conexión a la base de datos:', err);
      return res.status(500).send('Error obteniendo conexión a la base de datos');
    }

    // Consulta a la base de datos
    connection.query('SELECT * FROM users', (error, results, fields) => {
      connection.release(); // Devolver la conexión al pool

      if (error) {
        console.error('Error ejecutando la consulta:', error);
        return res.status(500).send('Error ejecutando la consulta');
      }

      console.log('Resultados de la consulta:', results);
      res.json(results);
    });
  });
});

app.get('/links', getLinksController);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); // El servidor escucha en el puerto 3000
