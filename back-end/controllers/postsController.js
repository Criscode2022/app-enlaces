const pool = require('../db/db');
const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();
const Joi = require('joi');


async function getPostsController (req, res, next) {
    const connection = await pool.getConnection();
    try {
        const [results] = await pool.query(`
          SELECT p.post_url, p.post_title, p.post_description, u.name_user, p.id_post, u.id_user, COUNT(l.id_like) AS like_count
          FROM posts p
          LEFT JOIN likes l ON p.id_post = l.id_post
          JOIN users u ON p.id_user = u.id_user
          GROUP BY p.id_post      
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

//Controlador para eliminar un like de un enlace:

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
    await pool.query('DELETE FROM likes WHERE id_user = ? AND id_post = ?', [id, postId]);

    return res.status(200).json({ mensaje: 'Like eliminado exitosamente' });
  } catch (error) {
    console.error('Error al eliminar el like:', error);
    return res.status(500).json({ mensaje: 'Error al eliminar el like' });
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

// Controlador para contar los likes de un enlace

async function getLikeCountController(req, res) {
  const { postId } = req.params;
  const connection = await pool.getConnection();

  try {
    // Consulta SQL para contar los likes de un post específico
    const query = `
      SELECT p.id_post, p.post_title, COUNT(l.id_like) AS like_count
      FROM posts p
      LEFT JOIN likes l ON p.id_post = l.id_post
      WHERE p.id_post = ?
      GROUP BY p.id_post, p.post_title;
    `;

    // Ejecuta la consulta SQL
    const [rows] = await connection.query(query, [postId]);

    // Verifica si se encontraron resultados
    if (rows.length === 0) {
      return res.status(404).json({ mensaje: 'Post no encontrado' });
    }

    // Devuelve el contador de likes en la respuesta JSON
    return res.status(200).json({ likeCount: rows[0].like_count });
  } catch (error) {
    console.error('Error al obtener el contador de likes:', error);
    return res.status(500).json({ mensaje: 'Error al obtener el contador de likes' });
  } finally {
    if (connection) connection.release();
  }
}

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
  } finally {
    if (connection) connection.release();
  }
}


// Asociar el controlador a la ruta protegida
router.post('/crear-enlace', isLoggedIn, crearEnlace);

// Otras rutas y controladores

module.exports = { getPostsController, likePostController, getLikeCountController, unlikePostController, getAllLikesController};
