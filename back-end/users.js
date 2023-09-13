const express = require('express');
const router = express.Router();
const pool = require('./db/db');
const Joi = require('joi');

router.get('/', async (req, res) => {
  try {
    // Consulta a la base de datos
    const [rows, fields] = await pool.query('SELECT * FROM users');
    console.log('Resultados de la consulta:', rows);
    res.json(rows);
  } catch (error) {
    console.error('Error obteniendo o consultando la conexión a la base de datos:', error);
    return res.status(500).send('Error obteniendo o consultando la conexión a la base de datos');
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
    const connection = await pool
      .query('INSERT INTO users (name_user, password_user) VALUES (?, ?)', [
        username,
        password,
      ]);
  } catch (ex) {
    return res.status(500).send(ex);
  }
  return res.json({ username });
});

module.exports = router;
