const pool = require('../db/db');
const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();
const Joi = require('joi');


async function getPostsController (req, res, next) {
    const connection = await pool.getConnection();
    try {
        const [results] = await pool.query(`
        SELECT post_url, post_title, post_description, name_user, posts.created_at
        FROM posts 
        JOIN users 
        ON posts.id_user = users.id_user      
        `);

    res.send({
      ok: true,
      data: results,
      error: null,
      message: null,
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
}


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
      await pool.query('INSERT INTO likes (id_user, id_post) VALUES (?, ?)', [id, postId]);

      return res.status(201).json({ mensaje: 'Like agregado exitosamente' });
    
  } catch (error) {
    console.error('Error al agregar el like:', error);
    return res.status(500).json({ mensaje: 'Error al agregar el like' });
  } finally {
        if (connection) connection.release();
    }
}


// Función para verificar si el usuario está autenticado
function isLoggedIn(req, res, next) {
  if (!req.session.user) {
    next(new Error("Not logged-in"));
  } else {
    next();
  }
}

// Controlador para la ruta protegida que requiere autenticación
async function crearEnlace(req, res) {
  try {
    // Validar los datos del enlace (por ejemplo, URL, título, descripción, etc.)
    const schema = Joi.object({
      url: Joi.string().uri().required(),
      titulo: Joi.string().required(),
      descripcion: Joi.string().required(),
    });
    
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    // Crear el enlace en la base de datos
    const { url, titulo, descripcion } = req.body;
    const query = 'INSERT INTO enlaces (url, titulo, descripcion) VALUES (?, ?, ?)';
    await pool.query(query, [url, titulo, descripcion]);

    // Respuesta exitosa
    res.status(201).json({ message: 'Enlace creado con éxito' });
  } catch (error) {
    // Manejo de errores
    console.error(error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
}

// Asociar el controlador a la ruta protegida
router.post('/crear-enlace', isLoggedIn, crearEnlace);

// Otras rutas y controladores

module.exports = { getPostsController, likePostController };
