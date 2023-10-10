const pool = require('../../db/db');

async function getAllLikesController(req, res, next) {
    try {
        const connection = await pool.getConnection();

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
        res.json({ likes: rows });
    } catch (err) {
        next(err);
    }
}

module.exports = getAllLikesController;
