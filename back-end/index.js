//Importaciones usando CommonJS

const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mysql = require('mysql2');

dotenv.config(); //Configuración de dotenv

app.get('/', (req, res) => {
  res.send('This server is now live!');
}); //Ruta para mostrar un mensaje en la raíz del servidor

app.listen(process.env.SERVER_PORT, () => {
  console.log(`Server is running on port ${process.env.SERVER_PORT}`);
});

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  port: process.env.DB_PORT,
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the database!');
});
