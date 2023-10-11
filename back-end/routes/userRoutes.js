const express = require('express');
const routes = express.Router();

// Importamos las funciones controladoras finales.
const {
    checkFollowController,
    newUserController,
    getFollowingUsersController,
    followUserController,
    loginUserController,
    unfollowUserController,
    getUserByIdController
} = require('../controllers/users');

//Check follow de usuario.

routes.get('/users/checkfollow/:userFollow', checkFollowController);

//Obtener información de un usuario por parámetro id:
routes.get('/users/:userId', getUserByIdController);

// Registro de usuario.
routes.post('/users/register', newUserController);

// Login de usuario.
routes.post('/users/login', loginUserController);

// Follow de usuario.

routes.post('/users/follow/:userFollow', followUserController);

//Ver usuarios que sigue el usuario logueado.

routes.get('/users/following', getFollowingUsersController);

// Unfollow de usuario.

routes.delete('/users/unfollow/:userUnfollow', unfollowUserController);

module.exports = routes;
