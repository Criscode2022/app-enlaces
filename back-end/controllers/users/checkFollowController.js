const pool = require('../../db/db');

const generateError = require('../../utils/generateError');

async function checkFollowController(req, res, next) {
    try {
        const id = req.auth.user;
        const { userFollow } = req.params;
        const existingFollow = await pool.query(
            'SELECT id_follow FROM follows WHERE id_user = ? AND id_user_following = ?',
            [id, userFollow]
        );

        if (existingFollow[0].length === 0) {
            // Si no existe un "follow" para eliminar, responder con un mensaje de error 404
            generateError('No sigues a este usuario', 404);
        }

        res.json({ mensaje: 'Sigues a este usuario' });
    } catch (err) {
        next(err);
    }
}

module.exports = checkFollowController;
