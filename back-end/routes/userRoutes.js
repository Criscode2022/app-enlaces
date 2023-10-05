const express = require('express');
const routes = express.Router();

// Importamos las funciones controladoras finales.
const {
    newUserController,
    loginUserController,
} = require('../controllers/users');

// Registro de usuario.
routes.post('/users/register', newUserController);

// Registro de usuario.
routes.post('/users/login', loginUserController);

// Aquí irían el resto de enpoints de usuarios.

module.exports = routes;
