const pool = require('../db/db');

async function getPostsController(req, res, next) {
  const connection = await pool.getConnection();
  try {
    const [results] = await pool.query(`
        SELECT post_url, post_title, post_description, name_user, posts.created_at, post_likes
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
  const postId = req.params.postId;

  try {
    // Verifica si el post al que se le dará like existe
    const [[post]] = await pool.query('SELECT * FROM posts WHERE id_post = ?', [
      postId,
    ]);

    if (!post) {
      return res.status(404).json({ message: 'Post no encontrado' });
    }

    // Incrementa el contador de likes del post
    const updatedLikes = post.post_likes + 1;

    // Actualiza la propiedad de likes en la base de datos
    await pool.query('UPDATE posts SET post_likes = ? WHERE id_post = ?', [
      updatedLikes,
      postId,
    ]);

    // Recupera nuevamente el post actualizado con los likes
    const [[updatedPost]] = await pool.query(
      'SELECT * FROM posts WHERE id_post = ?',
      [postId]
    );

    return res.json({
      message: 'Like agregado correctamente',
      updatedLikes: updatedPost.post_likes,
    });
  } catch (error) {
    console.error('Error al agregar like al post:', error);
    return res.status(500).send('Error al agregar like al post');
  }
}
const express = require('express');
const router = express.Router();
const pool = require('../db/db');
const Joi = require('joi');

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

module.exports = router;
module.exports = { getPostsController, likePostController };
