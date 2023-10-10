const pool = require('../../db/db');
const generateError = require('../../utils/generateError');

async function unfollowUserController(req, res, next) {
    try {
        const id = req.auth.user;
        const { userUnfollow } = req.params;

        // Verificar si existe un "follow" antes de eliminarlo
        const existingFollow = await pool.query(
            'SELECT id_follow FROM follows WHERE id_user = ? AND id_user_following = ?',
            [id, userUnfollow]
        );

        if (existingFollow[0].length === 0) {
            // Si no existe un "follow" para eliminar, responder con un mensaje de error 404
            generateError('No existe un seguimiento para eliminar', 404);
        }

        // Eliminar el "follow" si existe
        await pool.query(
            'DELETE FROM follows WHERE id_user = ? AND id_user_following = ?',
            [id, userUnfollow]
        );

        res.json({ mensaje: 'Seguimiento eliminado exitosamente' });
    } catch (err) {
        next(err);
    }
}

module.exports = unfollowUserController;
