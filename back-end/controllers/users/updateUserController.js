// Importamos el módulo que encripta las contraseñas.
const bcrypt = require('bcrypt');

// Importamos el objeto Pool que me permite conectarme a la base de datos.
const pool = require('../../db/db');

// Importamos el esquema de Joi.
const updateUserSchema = require('../../schemas/users_updates/updatesUserSchema');

// Importamos la función que se encargará de validar el esquema.
const validateSchema = require('../../utils/validateSchema');

// Importamos la función que se encargará de generar un error.
const generateError = require('../../utils/generateError');

// Función controladora final para actualizar el usuario.

const updateUserController = async (req, res, next) => {
    const id = req.auth.user;
    try {
        //Insertamos los datos que quiere actualizar
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

        // Actualizar el nombre de usuario si se proporciona.
        if (userName) {
            const newUserName =
                'UPDATE users SET name_user = ? WHERE id_user = ?';
            await pool.query(newUserName, [newUsername, id]);
        }

        // Actualizar la contraseña si se proporciona.
        if (password) {
            const newPassword =
                'UPDATE users SET password_user = ? WHERE id_user = ?';
            await pool.query(newPassword, [password, id]);
        }
        // Validamos los datos que envía el usuario.
        await validateSchema(updateUserSchema, req.body);

        //Obtenemos los datos que nos interesan
        const { biography, avatar, newUsername, password } = req.body;

        // Comprobamos si existe un usuario con el mismo nombre.
        const [users] = await pool.query(
            'SELECT id_user FROM users WHERE name_user = ?',
            [username]
        );

        // Si existe, lanzamos un error.
        if (users.length > 0) {
            generateError('Ya existe un usuario con ese nombre', 409);
        }
        // Encriptamos la contraseña 
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insertamos el usuario.
        await pool.query(
            'INSERT INTO users (name_user, password_user) VALUES (?, ?)',
            [username, hashedPassword]
        );

        //Enviamos una respuesta al cliente.
        res.json({
            status: 'ok',
            message: 'Usuario actualizado correctamente',
        });
    } catch (error) {
        next(err);
    }
};

module.exports = updateUserController;