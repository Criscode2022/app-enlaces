//DEPRECATED

const express = require('express');
const router = express.Router();
const pool = require('../db/db');
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const { expressjwt } = require('express-jwt');
const newUserSchema = require('../schemas/users/newUserSchema');

router.get('/', async (req, res) => {
    const connection = await pool.getConnection();
    try {
        // Consulta a la base de datos
        const [rows, fields] = await pool.query('SELECT * FROM users');
        console.log('Resultados de la consulta:', rows);
        res.json(rows);
    } catch (error) {
        console.error(
            'Error obteniendo o consultando la conexión a la base de datos:',
            error
        );
        return res
            .status(500)
            .send(
                'Error obteniendo o consultando la conexión a la base de datos'
            );
    } finally {
        if (connection) connection.release();
    }
});

// Authentication middleware. This takes care of verifying the JWT token and
// storing the token data (user id) in req.auth.
const isAuthenticated = expressjwt({
    secret: process.env.JWT_SECRET,
    algorithms: ['HS256'],
});

router.post('/verify', isAuthenticated, async (req, res) => {
    return res.send('Logged in as user: ' + req.auth.user);
});

// Note that there is no /logout endpoint, because by definition
// we don't store any data once we return a valid JWT token.

router.post('/unregister', isAuthenticated, async (req, res) => {
    const id = req.auth.user;
    const connection = await pool.getConnection();
    if (!id) {
        return res.status(401).json({ message: 'No estás autenticado' });
    }

    try {
        // Elimina el usuario de la base de datos
        await pool.query('DELETE FROM users WHERE id_user = ?', [id]);
        return res.send('Successfully unregistered');
    } catch (error) {
        console.error('Error al eliminar el usuario:', error);
        return res.status(500).send('Error al eliminar el usuario');
    } finally {
        if (connection) connection.release();
    }
});

router.put('/follow/:userFollow', isAuthenticated, async (req, res) => {
    const id = req.auth.user;
    const { userFollow } = req.params;
    const connection = await pool.getConnection();

    try {
        // Verificar el JWT y extraer el ID de usuario
        const token = req.header('Authorization');

        // Consulta para verificar si el usuario ya está siguiendo al usuario deseado
        const checkQuery = 'SELECT following_user FROM users WHERE id_user = ?';
        const [checkResults] = await pool.query(checkQuery, [id]);

        const followingUserList = checkResults[0].following_user || '';
        const followingUserArray = followingUserList
            .split(',')
            .map((userId) => parseInt(userId));

        if (followingUserArray.includes(parseInt(userFollow))) {
            return res.status(400).json({ error: 'Ya sigues a este usuario' });
        }

        // Consulta para actualizar la lista de usuarios seguidos
        const updateQuery = `UPDATE users SET following_user = CONCAT_WS(',', IFNULL(following_user, ''), ?) WHERE id_user = ?`;

        await pool.query(updateQuery, [userFollow, id]);

        return res.status(200).json({
            message: 'Usuario seguido con éxito: ' + userFollow,
            siguiendo: checkResults[0].following_user + ',' + userFollow,
        });
    } catch (error) {
        console.error('Error al seguir al usuario:', error);
        return res.status(500).json({ error: 'Error al seguir al usuario' });
    } finally {
        if (connection) connection.release();
    }
});

//Ruta para dejar de seguir a un usuario:
router.put('/unfollow/:userUnfollow', isAuthenticated, async (req, res) => {
    const id = req.auth.user;
    const { userUnfollow } = req.params;
    const connection = await pool.getConnection();

    try {
        // Verificar el JWT y extraer el ID de usuario
        const token = req.header('Authorization');

        // Consulta para verificar si el usuario ya está siguiendo al usuario deseado
        const checkQuery = 'SELECT following_user FROM users WHERE id_user = ?';
        const [checkResults] = await pool.query(checkQuery, [id]);

        const followingUserList = checkResults[0].following_user || '';
        const followingUserArray = followingUserList
            .split(',')
            .map((userId) => parseInt(userId));

        if (!followingUserArray.includes(parseInt(userUnfollow))) {
            return res.status(400).json({ error: 'No sigues a este usuario' });
        }

        // Consulta para actualizar la lista de usuarios seguidos
        const updatedFollowingUserList = followingUserArray
            .filter((userId) => userId !== parseInt(userUnfollow))
            .join(',');

        const updateQuery =
            'UPDATE users SET following_user = ? WHERE id_user = ?';

        await pool.query(updateQuery, [updatedFollowingUserList, id]);

        return res.status(200).json({
            message: 'Usuario dejado de seguir con éxito: ' + userUnfollow,
            siguiendo: updatedFollowingUserList,
        });
    } catch (error) {
        console.error('Error al dejar de seguir al usuario:', error);
        return res
            .status(500)
            .json({ error: 'Error al dejar de seguir al usuario' });
    } finally {
        if (connection) connection.release();
    }
});

// Ruta para verificar si un usuario está siguiendo a otro
router.get('/isFollowing/:userIdToCheck', isAuthenticated, async (req, res) => {
    const userId = req.auth.user; // ID del usuario autenticado
    const { userIdToCheck } = req.params;

    try {
        // Consulta para obtener la lista de usuarios seguidos por el usuario autenticado
        const query = 'SELECT following_user FROM users WHERE id_user = ?';
        const [results] = await pool.query(query, [userId]);

        const followingUserList = results[0].following_user || '';
        const followingUserArray = followingUserList
            .split(',')
            .map((userId) => parseInt(userId));

        // Verificar si el usuario está siguiendo al usuario que se está comprobando
        const isFollowing = followingUserArray.includes(
            parseInt(userIdToCheck)
        );

        return res.status(200).json({ isFollowing });
    } catch (error) {
        console.error('Error al verificar el seguimiento del usuario:', error);
        return res
            .status(500)
            .json({ error: 'Error al verificar el seguimiento del usuario' });
    }
});

module.exports = router;
