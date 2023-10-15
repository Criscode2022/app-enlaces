const pool = require('../../db/db');
const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();
const Joi = require('joi');

//Endpoint para crear un nuevo post:

// Controlador para la ruta protegida que requiere autenticación
async function createPost(req, res, next) {
    const id = req.auth.user;

    try {
        // Validar los datos del enlace (por ejemplo, URL, título, descripción, etc.)
        const schema = Joi.object({
            url: Joi.string().uri().required(),
            titulo: Joi.string().required(),
            descripcion: Joi.string().required(),
            image: Joi.string().allow(null).allow('').optional(),
        });

        const { error } = schema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        // Crear el enlace en la base de datos
        const { url, titulo, descripcion, image } = req.body;
        const query =
            'INSERT INTO posts (id_user, post_url, post_title, post_description, post_img) VALUES (?, ?, ?, ?, ?)';
        await pool.query(query, [id, url, titulo, descripcion, image || null]);

        // Respuesta exitosa
        res.status(201).json({ message: 'Enlace creado con éxito' });
    } catch (error) {
        next(error);
    }
}

module.exports = createPost;
