const pool = require('../../db/db');
const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();
const Joi = require('joi');

//Función para eliminar el like de un enlace:

async function unlikePostController(req, res) {
    const id = req.auth.user;
    const { postId } = req.params;
    const connection = await pool.getConnection();

    try {
        // Verificar el JWT y extraer el ID de usuario
        const token = req.header('Authorization');
        if (!token) {
            return res.status(401).json({ mensaje: 'No autorizado' });
        }

        // Eliminar el "like" de la base de datos
        await pool.query(
            'DELETE FROM likes WHERE id_user = ? AND id_post = ?',
            [id, postId]
        );

        return res.status(200).json({ mensaje: 'Like eliminado exitosamente' });
    } catch (error) {
        console.error('Error al eliminar el like:', error);
        return res.status(500).json({ mensaje: 'Error al eliminar el like' });
    } finally {
        if (connection) connection.release();
    }
}

module.exports = unlikePostController;
