const pool = require('../../db/db');

async function likePostController(req, res, next) {
    try {
        const id = req.auth.user;

        const { postId } = req.params;

        await pool.query('INSERT INTO likes (id_user, id_post) VALUES (?, ?)', [
            id,
            postId,
        ]);

        res.status(201).json({ mensaje: 'Like agregado exitosamente' });
    } catch (err) {
        next(err);
    }
}

module.exports = likePostController;
