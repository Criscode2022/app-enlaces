const pool = require('../db/db');
const express = require('express');
const Joi = require('joi');
const isAuthenticated = require('./usersController').isAuthenticated;

const router = express.Router();

async function getPostsController(req, res, next) {
  try {
    const [results] = await pool.query(`
      SELECT post_url, post_title, post_description, name_user, posts.created_at, id_post, users.id_user, post_img
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
  }
}

async function likePostController(req, res, next) {
  const id = req.auth.user;
  const { postId } = req.params;

  try {
    // Insertar el "like" en la base de datos
    await pool.query('INSERT INTO likes (id_user, id_post) VALUES (?, ?)', [
      id,
      postId,
    ]);

    return res.status(201).json({ mensaje: 'Like agregado exitosamente' });
  } catch (error) {
    console.error('Error al agregar el like:', error);
    return next(error);
  }
}

//Controlador para eliminar un like de un enlace:

async function unlikePostController(req, res, next) {
  const id = req.auth.user;
  const { postId } = req.params;
  try {
    // Eliminar el "like" de la base de datos
    await pool.query('DELETE FROM likes WHERE id_user = ? AND id_post = ?', [
      id,
      postId,
    ]);
    return res.status(200).json({ mensaje: 'Like eliminado exitosamente' });
  } catch (error) {
    console.error('Error al eliminar el like:', error);
    return next(error);
  }
}

// Controlador para la ruta protegida que requiere autenticación
async function crearEnlace(req, res, next) {
  try {
    // Validar los datos del enlace (por ejemplo, URL, título, descripción, etc.)
    const schema = Joi.object({
      url: Joi.string().uri().required(),
      titulo: Joi.string().required(),
      descripcion: Joi.string().required(),
    });

    const { error } = schema.validate(req.body);
    if (error) {
      return next(error);
    }

    // Crear el enlace en la base de datos
    const { url, titulo, descripcion } = req.body;
    const query =
      'INSERT INTO enlaces (url, titulo, descripcion) VALUES (?, ?, ?)';
    await pool.query(query, [url, titulo, descripcion]);

    // Respuesta exitosa
    res.status(201).json({ message: 'Enlace creado con éxito' });
  } catch (error) {
    // Manejo de errores
    console.error(error);
    return next(error);
  }
}

// Controlador para contar los likes de un enlace
async function getLikeCountController(req, res, next) {
  const { postId } = req.params;
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
    const [rows] = await pool.query(query, [postId]);

    // Verifica si se encontraron resultados
    if (rows.length === 0) {
      return next(new Error('Post no encontrado'));
    }

    // Devuelve el contador de likes en la respuesta JSON
    return res.status(200).json({ likeCount: rows[0].like_count });
  } catch (error) {
    console.error('Error al obtener el contador de likes:', error);
    return next(error);
  }
}

//Endpoint para obtener todos los likes:

async function getAllLikesController(req, res, next) {
  try {
    // Consulta SQL para obtener todos los likes
    const query = `
      SELECT l.id_like, l.id_user, l.id_post, u.name_user, p.post_title
      FROM likes l
      JOIN users u ON l.id_user = u.id_user
      JOIN posts p ON l.id_post = p.id_post;
    `;

    // Ejecuta la consulta SQL
    const [rows] = await pool.query(query);

    // Devuelve los likes en la respuesta JSON
    return res.status(200).json({ likes: rows });
  } catch (error) {
    console.error('Error al obtener los likes:', error);
    return next(error);
  }
}

// FIXME: Esta ruta no funciona.
// router.post('/crear-enlace', isAuthenticated, crearEnlace);

router.get('/', getPostsController);
// Endpoint para obtener todos los likes:
router.get('/likes', getAllLikesController);
// Endpoint para obtener el contador de likes de un post específico
router.get('/:postId/likeCount', getLikeCountController);
// Endpoint para dar like a un enlace:
router.post('/like/:postId', isAuthenticated, likePostController);
// Endpoint para eliminar un like de un enlace:
router.delete('/unlike/:postId', isAuthenticated, unlikePostController);

module.exports = router;
