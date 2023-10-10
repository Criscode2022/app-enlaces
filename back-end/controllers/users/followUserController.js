const pool = require('../../db/db');

async function followUserController(req, res, next) {
    try {
        const id = req.auth.user;

        const { userFollow } = req.params;

        await pool.query(
            'INSERT INTO follows (id_user, id_user_following) VALUES (?, ?)',
            [id, userFollow]
        );

        res.status(201).json({ mensaje: 'Seguimiento realizado exitosamente' });
    } catch (err) {
        next(err);
    }
}

module.exports = followUserController;
