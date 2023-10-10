const pool = require('../../db/db');

const generateError = require('../../utils/generateError');

async function followUserController(req, res, next) {
    try {
        const id = req.auth.user;

        const { userFollow } = req.params;

        // Consulta para verificar si el usuario ya está siguiendo al usuario deseado
        const checkQuery = 'SELECT following_user FROM users WHERE id_user = ?';
        const [checkResults] = await pool.query(checkQuery, [id]);

        const followingUserList = checkResults[0].following_user || '';
        const followingUserArray = followingUserList
            .split(',')
            .map((userId) => parseInt(userId));

        if (followingUserArray.includes(parseInt(userFollow))) {
            generateError('Ya sigues a este usuario', 400);
        }

        // Consulta para actualizar la lista de usuarios seguidos
        const updateQuery = `UPDATE users SET following_user = CONCAT_WS(',', IFNULL(following_user, ''), ?) WHERE id_user = ?`;

        await pool.query(updateQuery, [userFollow, id]);

        res.json({
            message: 'Usuario seguido con éxito: ' + userFollow,
            siguiendo: checkResults[0].following_user + ',' + userFollow,
        });
    } catch (err) {
        next(err);
    }
}

module.exports = followUserController;
