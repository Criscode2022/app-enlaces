//Importaciones usando CommonJS

const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mysql = require('mysql2'); 


const PORT = 3000; //El puerto 3000 es el puerto por defecto de Express

dotenv.config(); //Configuración de dotenv

app.get('/', (req, res) => {
    res.send('This server is now live!');
  }); //Ruta para mostrar un mensaje en la raíz del servidor

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); //El servidor escucha en el puerto 3000


const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    port: process.env.DB_PORT
  });
  
  connection.connect((err) => {
    if (err) {
      console.error('Error connecting to the database:', err);
      return;
    }
    console.log('Connected to the database!');
  });
  
