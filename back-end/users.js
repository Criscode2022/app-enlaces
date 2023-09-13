const express = require('express');
const router = express.Router();
const pool = require('./db/db');

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

module.exports = router;
