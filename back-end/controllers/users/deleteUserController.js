// Importamos el objeto Pool que nos permite conectarnos a la base de datos.
const pool = require('../../db/db');

// Importamos la función que se encargará de generar un error.
const generateError = require('../../utils/generateError');

// Función controladora para eliminar un usuario.
const deleteUserController = async (req, res, next) => {
    try {
        const userId = req.auth.user;
        console.log(userId);

        const [result] = await pool.query(
            'DELETE FROM users WHERE id_user = ?',
            [userId]
        );

        if (result.affectedRows === 0) {
            generateError('El usuario no existe', 404);
        }

        res.json({
            status: 'ok',
            message: 'Usuario eliminado correctamente',
        });
    } catch (err) {
        next(err);
    }
};

module.exports = deleteUserController;
