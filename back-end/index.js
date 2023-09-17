"use strict";

require('dotenv').config();

// Importaciones usando CommonJS
const express = require('express');
const session = require('express-session');
const app = express();

app.get('/', (req, res) => {
  res.send('This server is now live!');
}); // Ruta para mostrar un mensaje en la raíz del servidor

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
  session({
    secret: process.env.SESSION_COOKIE_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

app.use('/users', require('./users'));

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