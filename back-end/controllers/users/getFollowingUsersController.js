const pool = require('../../db/db');

async function getFollowingUsersController(req, res, next) {
    try {
        const id = req.auth.user;

        const [results] = await pool.query(
            'SELECT id_user_following FROM follows WHERE id_user = ?',
            [id]
        );

        // Extraemos los ids de los usuarios a los que sigue el usuario autenticado
        const ids = results.map((result) => result.id_user_following);

        res.json(ids);
    } catch (error) {
        next(error);
    }
}

module.exports = getFollowingUsersController;
