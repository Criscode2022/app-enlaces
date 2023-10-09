const express = require('express');
const routes = express.Router();

// Importamos las funciones controladoras finales.
const {
    newUserController,
    followUserController,
    loginUserController,
    unfollowUserController,
    updateUserController,
} = require('../controllers/users');

// Registro de usuario.
routes.post('/users/register', newUserController);

// Login de usuario.
routes.post('/users/login', loginUserController);

// Follow de usuario.

routes.put('/users/follow/:userFollow', followUserController);

// Unfollow de usuario.

routes.delete('/users/unfollow/:userUnfollow', unfollowUserController);

// Actualización de usuario.
routes.put('/users/update', updateUserController);

module.exports = routes;
