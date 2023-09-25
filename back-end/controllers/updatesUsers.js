const express = require('express');
const router = express.Router();
const Joi = require('joi');
const pool = require('../db/db');

// Define un esquema de validación para la actualización de la biografía.
const biographySchema = Joi.object({
  biography: Joi.string().max(200).required(),
  id_user: Joi.number().integer().positive().required(),
});

// Ruta para actualizar la biografía del usuario.
router.put('/update-biography', async (req, res) => {
  const { error } = biographySchema.validate(req.body);
  const connection = await pool.getConnection();

  if (error) {
    return res
      .status(400)
      .json({ status: 'error', message: error.details[0].message });
  }

  const { biography, id_user } = req.body;

  try {
    const sql = 'UPDATE users SET biography_user = ? WHERE id_user = ?';
    const [results] = await pool.query(sql, [biography, id_user]);
    res.json({ status: 'success', message: 'Biography updated successfully' });
  } catch (error) {
    console.error('Error updating biography:', error);
    res
      .status(500)
      .json({ status: 'error', message: 'Error updating biography' });
  } finally {
    if (connection) connection.release();
  }
});

// Define un esquema de validación para la actualización del avatar.
const avatarSchema = Joi.object({
  avatar: Joi.string().uri(), // Puedes ajustar la validación según tus necesidades.
  id_user: Joi.number().integer().positive().required(),
});

// Ruta para actualizar el avatar del usuario.
router.put('/update-avatar', async (req, res) => {
  const { error } = avatarSchema.validate(req.body);
  const connection = await pool.getConnection();

  if (error) {
    return res
      .status(400)
      .json({ status: 'error', message: error.details[0].message });
  }

  const { avatar, id_user } = req.body;

  try {
    const sql = 'UPDATE users SET avatar_user = ? WHERE id_user = ?';
    const [results] = await pool.query(sql, [avatar, id_user]);
    res.json({ status: 'success', message: 'Avatar updated successfully' });
  } catch (error) {
    console.error('Error updating avatar:', error);
    res.status(500).json({ status: 'error', message: 'Error updating avatar' });
  } finally {
    if (connection) connection.release();
  }
});

// Define un esquema de validación para el cambio de nombre.
const changeNameSchema = Joi.object({
  newUsername: Joi.string().min(3).max(30).required(),
  id_user: Joi.number().integer().positive().required(),
});

// Ruta para cambiar el nombre del usuario.
router.put('/change-name', async (req, res) => {
  const { value, error } = changeNameSchema.validate(req.body);
  const connection = await pool.getConnection();
  if (error) {
    return res
      .status(400)
      .json({ status: 'error', message: error.details[0].message });
  }

  const { newUsername, id_user } = value;

  try {
    // Consulta para actualizar el nombre de usuario.
    const sql = 'UPDATE users SET name_user = ? WHERE id_user = ?';
    const [results] = await pool.query(sql, [newUsername, id_user]);

    if (results.affectedRows === 0) {
      return res
        .status(404)
        .json({ status: 'error', message: 'Usuario no encontrado' });
    }

    res.json({
      status: 'success',
      message: 'Nombre de usuario actualizado correctamente',
    });
  } catch (error) {
    console.error('Error al cambiar el nombre de usuario:', error);
    res.status(500).json({
      status: 'error',
      message: 'Error al cambiar el nombre de usuario',
    });
  } finally {
    if (connection) connection.release();
  }
});

// Define un esquema de validación para el cambio de contraseña.
const changePasswordSchema = Joi.object({
  newPassword: Joi.string()
    .pattern(new RegExp('^[a-zA-Z0-9]{3,20}$'))
    .required(),
  id_user: Joi.number().integer().positive().required(),
});

// Ruta para cambiar la contraseña del usuario.
router.put('/change-password', async (req, res) => {
  const { value, error } = changePasswordSchema.validate(req.body);
  const connection = await pool.getConnection();
  if (error) {
    return res
      .status(400)
      .json({ status: 'error', message: error.details[0].message });
  }

  const { newPassword, id_user } = value;

  try {
    // Consulta para actualizar la contraseña del usuario.
    const sql = 'UPDATE users SET password_user = ? WHERE id_user = ?';
    const [results] = await pool.query(sql, [newPassword, id_user]);

    if (results.affectedRows === 0) {
      return res
        .status(404)
        .json({ status: 'error', message: 'Usuario no encontrado' });
    }

    res.json({
      status: 'success',
      message: 'Contraseña actualizada correctamente',
    });
  } catch (error) {
    console.error('Error al cambiar la contraseña:', error);
    res
      .status(500)
      .json({ status: 'error', message: 'Error al cambiar la contraseña' });
  } finally {
    if (connection) connection.release();
  }
});

module.exports = router;
