// Importamos el módulo que encripta las contraseñas.
const bcrypt = require('bcrypt');

// Importamos el objeto Pool que me permite conectarme a la base de datos.
const pool = require('../../db/db');

// Importamos el esquema de Joi.
const updateUserSchema = require('../../schemas/users/updateUserSchema');

// Importamos la función que se encargará de validar el esquema.
const validateSchema = require('../../utils/validateSchema');

// Importamos la función que se encargará de generar un error.
const generateError = require('../../utils/generateError');

// Importamos la función que se encargará de generar un token de autenticación.
const generateAuthToken = require('../../utils/generateAuthToken');

// Función controladora final para actualizar el usuario.
const updateUserController = async (req, res, next) => {
    try {
        // Validamos los datos que envía el usuario.
        await validateSchema(updateUserSchema, req.body);
        //Obtenemos los datos que nos interesan
        const { biography, avatar, username, newPassword } = req.body;
        //Obtención ID del usuario
        const id = req.auth.user;

        //Insertamos los datos que quiere actualizar
        // Actualizar la contraseña si se proporciona.
        if (newPassword) {
            // Encriptamos la contraseña.
            const hashedPassword = await bcrypt.hash(newPassword, 10);
            // Actualiza la contraseña utilizando placeholders.
            const newPasswordQuery =
                'UPDATE users SET password_user = ? WHERE id_user = ?';
            await pool.query(newPasswordQuery, [hashedPassword, id]);
        }
        // Actualizar la biografía si se proporciona.
        if (biography) {
            const newBiography =
                'UPDATE users SET biography_user = ? WHERE id_user = ?';
            await pool.query(newBiography, [biography, id]);
        }

        // Actualizar el avatar si se proporciona.
        if (avatar) {
            const newAvatar =
                'UPDATE users SET avatar_user = ? WHERE id_user = ?';
            await pool.query(newAvatar, [avatar, id]);
        }

        if (username) {
            // Actualiza el nombre de usuario utilizando placeholders.
            const newUsernameQuery =
                'UPDATE users SET name_user = ? WHERE id_user = ?';
            await pool.query(newUsernameQuery, [username, id]);
        }
        // Comprobamos si existe un usuario con el mismo nombre.
        const [users] = await pool.query(
            'SELECT id_user FROM users WHERE name_user = ?',
            [username]
        );
        // Si existe, lanzamos un error.
        if (users.length === 0) {
            generateError('Ya existe un usuario con ese nombre', 409);
        }

        // Generamos un token de autenticación para el usuario.
        const authToken = generateAuthToken(id, username);
        //Enviamos una respuesta al cliente.
        res.json({
            status: 'ok',
            message: 'Usuario actualizado correctamente',
            token: authToken,
        });
    } catch (err) {
        next(err);
    }
};
module.exports = updateUserController;
