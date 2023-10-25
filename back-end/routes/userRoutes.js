const express = require('express');
const routes = express.Router();

// Importamos las funciones controladoras intermedias.
const authenticateToken = require('../middlewares/authenticateToken');

// Importamos las funciones controladoras finales.
const {
    checkFollowController,
    deleteUserController,
    newUserController,
    getFollowingUsersController,
    followUserController,
    loginUserController,
    unfollowUserController,
    updateUserController,
    getUserByIdController,
} = require('../controllers/users');

// Registro de usuario.
routes.post('/users/register', newUserController);

// Login de usuario.
routes.post('/users/login', loginUserController);

// Follow de usuario.
routes.post(
    '/users/follow/:userFollow',
    authenticateToken,
    followUserController
);

//Eliminación de usuario.
routes.delete('/users/delete', authenticateToken, deleteUserController);

// Unfollow de usuario.
routes.delete(
    '/users/unfollow/:userUnfollow',
    authenticateToken,
    unfollowUserController
);

// Ver usuarios que sigue el usuario logueado.
routes.get('/users/following', authenticateToken, getFollowingUsersController);

// Check follow de usuario.
routes.get(
    '/users/checkfollow/:userFollow',
    authenticateToken,
    checkFollowController
);

//Obtener información de un usuario por parámetro id:
routes.get('/users/:userId', authenticateToken, getUserByIdController);

// Actualización de usuario.
routes.put('/users/update', authenticateToken, updateUserController);

module.exports = routes;
