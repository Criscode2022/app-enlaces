const pool = require('../db/db');

async function shareLinkController(req, res) {
  const { link } = req.body; // Supongamos que el enlace se envía en el cuerpo de la solicitud POST

  // Aquí puedes realizar la validación del enlace y otras comprobaciones necesarias antes de insertarlo en la base de datos.

  const connection = await pool.getConnection();

  try {
    // Insertar el enlace en la base de datos
    await pool.query('INSERT INTO posts (post_url) VALUES (?)', [link]);

    return res.status(201).json({ mensaje: 'Enlace compartido exitosamente' });
  } catch (error) {
    console.error('Error al compartir el enlace:', error);
    return res.status(500).json({ mensaje: 'Error al compartir el enlace' });
  } finally {
    if (connection) connection.release();
  }
}

module.exports = { shareLinkController };
