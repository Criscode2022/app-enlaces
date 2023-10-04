const express = require('express');
const router = express.Router();
const Joi = require('joi');
const pool = require('../db/db');
const jwt = require('jsonwebtoken');
const { expressjwt } = require('express-jwt'); // Importa express-jwt correctamente

// Define un esquema de validación para la actualización de usuario.
const updateUserSchema = Joi.object({
  biography: Joi.string().max(200),
  avatar: Joi.string().uri(),
  newUsername: Joi.string().min(3).max(30),
  newPassword: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,20}$')),
  id_user: Joi.number().integer().positive().required(),
});

//Authentication middleware. This takes care of verifying the JWT token and
// storing the token data (user id) in req.user.
const isAuthenticated = expressjwt({
  secret: process.env.JWT_SECRET,
  algorithms: ['HS256'],
});

// Ruta para actualizar el usuario.
router.put('/update', isAuthenticated, async (req, res, next) => {
  const { value, error } = updateUserSchema.validate(req.body);
  if (error) {
    return next(error);
  }

  const { biography, avatar, newUsername, newPassword, id_user } = value;

  try {
    // Actualizar la biografía si se proporciona.
    if (biography) {
      const biographySql =
        'UPDATE users SET biography_user = ? WHERE id_user = ?';
      await pool.query(biographySql, [biography, id_user]);
    }

    // Actualizar el avatar si se proporciona.
    if (avatar) {
      const avatarSql = 'UPDATE users SET avatar_user = ? WHERE id_user = ?';
      await pool.query(avatarSql, [avatar, id_user]);
    }

    // Actualizar el nombre de usuario si se proporciona.
    if (newUsername) {
      const usernameSql = 'UPDATE users SET name_user = ? WHERE id_user = ?';
      await pool.query(usernameSql, [newUsername, id_user]);
    }

    // Actualizar la contraseña si se proporciona.
    if (newPassword) {
      const passwordSql =
        'UPDATE users SET password_user = ? WHERE id_user = ?';
      await pool.query(passwordSql, [newPassword, id_user]);
    }

    res.json({
      status: 'success',
      message: 'Usuario actualizado correctamente',
    });
  } catch (error) {
    console.error('Error al actualizar el usuario:', error);
    return next(error);
  }
});

module.exports = router;
