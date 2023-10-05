const pool = require('../../db/db');
const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();
const Joi = require('joi');

async function likePostController(req, res) {
    const id = req.auth.user;
    const { postId } = req.params;
    const connection = await pool.getConnection();

    try {
        // Verificar el JWT y extraer el ID de usuario
        const token = req.header('Authorization');
        if (!token) {
            return res.status(401).json({ mensaje: 'No autorizado' });
        }
        // Insertar el "like" en la base de datos
        await pool.query('INSERT INTO likes (id_user, id_post) VALUES (?, ?)', [
            id,
            postId,
        ]);

        return res.status(201).json({ mensaje: 'Like agregado exitosamente' });
    } catch (error) {
        console.error('Error al agregar el like:', error);
        return res.status(500).json({ mensaje: 'Error al agregar el like' });
    }
}

module.exports = likePostController;
