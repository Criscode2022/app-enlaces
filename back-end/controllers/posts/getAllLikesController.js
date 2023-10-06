const pool = require('../../db/db');
const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();
const Joi = require('joi');

//Endpoint para obtener todos los likes:

async function getAllLikesController(req, res) {
    const connection = await pool.getConnection();

    try {
        // Consulta SQL para obtener todos los likes
        const query = `
      SELECT l.id_like, l.id_user, l.id_post, u.name_user, p.post_title
      FROM likes l
      JOIN users u ON l.id_user = u.id_user
      JOIN posts p ON l.id_post = p.id_post;
    `;

        // Ejecuta la consulta SQL
        const [rows] = await connection.query(query);

        // Devuelve los likes en la respuesta JSON
        return res.status(200).json({ likes: rows });
    } catch (error) {
        console.error('Error al obtener los likes:', error);
        return res.status(500).json({ mensaje: 'Error al obtener los likes' });
    }
}

module.exports = getAllLikesController;
