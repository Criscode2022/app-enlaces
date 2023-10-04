const express = require('express');
const routes = express.Router();

// Importamos las funciones controladoras finales.
const { newUserController } = require('../controllers/users');

// Registro de usuario.
routes.post('/users/register', newUserController);

// Aquí irían el resto de enpoints de usuarios.

module.exports = routes;
