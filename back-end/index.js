'use strict';

// Importaciones usando CommonJS

require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());

//Middleware para subir archivos
// app.use("/upload", uploadRoute);

app.get('/', (req, res) => {
  res.send('This server is now live!');
}); // Ruta para mostrar un mensaje en la raíz del servidor

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/posts', require('./controllers/postsController'));
app.use('/users', require('./controllers/usersController').router);
app.use('/update', require('./controllers/updatesUsers'));

// Middleware de errores, devuelve una respuesta de error adecuada y maneja la situación de manera controlada.
app.use((error, req, res, next) => {
  console.error(error);
  res.status(error.httpStatus || 500).send({
    status: 'error',
    error: error.message,
  });
});

// Middleware y configuraciones

// Ruta de ejemplo que devuelve un error 404
app.use((req, res, next) => {
  res.status(404).send('404 Not Found');
});

// Middleware de errores, maneja la situación de manera controlada
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Internal Server Error');
});

app.listen(process.env.SERVER_PORT, () => {
  console.log(`Server is running on port ${process.env.SERVER_PORT}`);
});
