const pool = require('../../db/db');
const generateError = require('../../utils/generateError');

const getUserByIdController = async (req, res, next) => {

    try {
        const { userId } = req.params;

        const [[user]] = await pool.query(`
        SELECT *
        FROM users
        where id_user = ?
        `, [userId]);

        if(!user) {
            generateError('Usuario no encontrado', 400);
        }

        res.send({
            status: 'ok',
            data: user
        })

    } catch(error) {
        next(error);
    }
};

module.exports = getUserByIdController;