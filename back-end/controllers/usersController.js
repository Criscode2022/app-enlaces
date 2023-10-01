const express = require('express');
const router = express.Router();
const pool = require('../db/db');
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const { expressjwt } = require('express-jwt');

router.get('/', async (req, res) => {
  const connection = await pool.getConnection();
  try {
    // Consulta a la base de datos
    const [rows, fields] = await pool.query('SELECT * FROM users');
    console.log('Resultados de la consulta:', rows);
    res.json(rows);
  } catch (error) {
    console.error(
      'Error obteniendo o consultando la conexión a la base de datos:',
      error
    );
    return res
      .status(500)
      .send('Error obteniendo o consultando la conexión a la base de datos');
  } finally {
    if (connection) connection.release();
  }
});

const registerSchema = Joi.object({
  username: Joi.string().alphanum().min(3).max(30).required(),
  password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,20}$')).required(),
  // email: Joi.string().email().required(),
});

router.post('/register', async function (req, res) {
  const { value, error } = registerSchema.validate(req.body);
  const connection = await pool.getConnection();
  if (error) {
    return res.status(400).send(error);
  }
  const { username, password } = value;
  try {
    await pool.query(
      'INSERT INTO users (name_user, password_user) VALUES (?, ?)',
      [username, password]
    );
  } catch (ex) {
    return res.status(500).send(ex);
  } finally {
    if (connection) connection.release();
  }
  return res.json({ username });
});

router.post('/login', async function (req, res, next) {
  const { value, error } = registerSchema.validate(req.body);
  if (error) {
    return res.status(400).send(error);
  }
  const { username, password } = value;
  try {
    // query() returns [rows, columns]. We only want the first (and only) row, so that's:
    //     const user = result[0][0];
    //  or just:
    //      const [[user]] = result;
    const [[user]] = await pool.query(
      'SELECT id_user, name_user, password_user FROM users WHERE name_user = ? AND password_user = ?',
      [username, password]
    );

    if (!user) {
      return res.status(400).send('Invalid user or password');
    }

    // create token
    const token = jwt.sign(
      {
        user: user.id_user,
      },
      process.env.JWT_SECRET
    );

    res.header('auth-token', token);
    return res.json({ token });
  } catch (ex) {
    return res.status(500).send(ex.message);
  }
});

// Authentication middleware. This takes care of verifying the JWT token and
// storing the token data (user id) in req.auth.
const isAuthenticated = expressjwt({
  secret: process.env.JWT_SECRET,
  algorithms: ['HS256'],
});

router.post('/verify', isAuthenticated, async (req, res) => {
  return res.send('Logged in as user: ' + req.auth.user);
});

// Note that there is no /logout endpoint, because by definition
// we don't store any data once we return a valid JWT token.

router.post('/unregister', isAuthenticated, async (req, res) => {
  const id = req.auth.user;
  const connection = await pool.getConnection();
  if (!id) {
    return res.status(401).json({ message: 'No estás autenticado' });
  }

  try {
    // Elimina el usuario de la base de datos
    await pool.query('DELETE FROM users WHERE id_user = ?', [id]);
    return res.send('Successfully unregistered');
  } catch (error) {
    console.error('Error al eliminar el usuario:', error);
    return res.status(500).send('Error al eliminar el usuario');
  } finally {
    if (connection) connection.release();
  }
});

router.put('/follow/:userFollow', isAuthenticated, async (req, res) => {
  const id = req.auth.user;
  const { userFollow } = req.params;
  const connection = await pool.getConnection();

  try {
    // Verificar el JWT y extraer el ID de usuario
    const token = req.header('Authorization');

    // Consulta para verificar si el usuario ya está siguiendo al usuario deseado
    const checkQuery = 'SELECT following_user FROM users WHERE id_user = ?';
    const [checkResults] = await pool.query(checkQuery, [id]);

    const followingUserList = checkResults[0].following_user || '';
    const followingUserArray = followingUserList.split(',').map(userId => parseInt(userId));

    if (followingUserArray.includes(parseInt(userFollow))) {
      return res.status(400).json({ error: 'Ya sigues a este usuario' });
    }

    // Consulta para actualizar la lista de usuarios seguidos
    const updateQuery = `UPDATE users SET following_user = CONCAT_WS(',', IFNULL(following_user, ''), ?) WHERE id_user = ?`;

    await pool.query(updateQuery, [userFollow, id]);

    return res.status(200).json({ message: 'Usuario seguido con éxito: ' + userFollow, siguiendo: checkResults[0].following_user + ',' + userFollow });
  } catch (error) {
    console.error('Error al seguir al usuario:', error);
    return res.status(500).json({ error: 'Error al seguir al usuario' });
  } finally {
    if (connection) connection.release();
  }
});

module.exports = router;
