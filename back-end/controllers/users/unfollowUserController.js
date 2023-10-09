const pool = require('../../db/db');
const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();
const Joi = require('joi');

async function unfollowUserController(req, res, next) {
    const id = req.auth.user;
    const { userUnfollow } = req.params;

    try {
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
        return next(error);
    }
}

module.exports = unfollowUserController;
