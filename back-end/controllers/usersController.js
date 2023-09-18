const express = require('express');
const router = express.Router();
const pool = require('../db/db');
const Joi = require('joi');

router.get('/', async (req, res) => {
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
  }
});

const registerSchema = Joi.object({
  username: Joi.string().alphanum().min(3).max(30).required(),
  password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,20}$')).required(),
  // email: Joi.string().email().required(),
});

router.post('/register', async function (req, res) {
  const { value, error } = registerSchema.validate(req.body);
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
  }
  return res.json({ username });
});

router.post('/login', async function (req, res, next) {
  const { value, error } = registerSchema.validate(req.body);
  if (error) {
    return res.status(400).send(error);
  }
  if (req.session.user) {
    return res.status(400).send('Already logged in as ' + req.session.user);
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

    req.session.regenerate(function (err) {
      if (err) next(err);

      req.session.user = user.id_user;
      req.session.save(function (err) {
        if (err) return next(err);
        res.json({ username });
      });
    });
  } catch (ex) {
    return res.status(500).send(ex.message);
  }
});

function logout(req, res, next) {
  if (!req.session.user) {
    return res.status(400).send('Not logged in');
  }
  req.session.user = null;
  req.session.save(function (err) {
    if (err) next(err);

    req.session.regenerate(function (err) {
      if (err) next(err);
      res.json('OK');
    });
  });
}

router.get('/logout', logout);

router.post('/unregister', async (req, res, next) => {
  const id = req.session.user;
  if (!id) {
    return res.status(401).json({ message: 'No estás autenticado' });
  }

  try {
    // Elimina el usuario de la base de datos
    await pool.query('DELETE FROM users WHERE id_user = ?', [id]);
    return logout(req, res, next);
  } catch (error) {
    console.error('Error al eliminar el usuario:', error);
    return res.status(500).send('Error al eliminar el usuario');
  }
});

module.exports = router;
