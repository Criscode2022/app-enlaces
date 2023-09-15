"use strict";

require('dotenv').config();

// Importaciones usando CommonJS
const express = require('express');
const getLinksController = require('./controllers/getLinksController');

//Creamos servidor y aplicamos primeros middlewares:
const app = express();
app.use(express.json());


app.get('/', (req, res) => {
  res.send('This server is now live!');
}); // Ruta para mostrar un mensaje en la raíz del servidor

//Endpoint para acceder a todos los enlances publicados:
app.use('/links', getLinksController);

//Middleware de errores, devuelve una respuesta de error adecuada y maneja la situación de manera controlada.
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
