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
    // Obtenemos los datos que nos interesan
    const { biography, avatar, username, newPassword } = req.body;

    const fields = []; // Declara el array de campos aquí para que esté disponible en todo el bloque de la función

    try {
        // Validamos los datos que envía el usuario.
        await validateSchema(updateUserSchema, req.body);

        // Obtención ID del usuario
        const id = req.auth.user;

        const params = {};

        // Actualizar la contraseña solo si se proporciona.
        if (newPassword) {
            // Encriptamos la contraseña.
            const hashedPassword = await bcrypt.hash(newPassword, 10);
            params.password_user = hashedPassword;
        }
        // Actualizar la biografía si se proporciona.
        if (biography) {
            params.biography_user = biography;
        }
        // Actualizar el avatar si se proporciona.
        if (avatar) {
            params.avatar_user = avatar;
        }
        // Actualizar el nombre de usuario si se proporciona.
        if (username) {
            params.name_user = username;
        }

        await pool.query('UPDATE users SET ? WHERE id_user = ?', [params, id]);

        // Generamos un token de autenticación para el usuario.
        const token = generateAuthToken(id, username);
        // Enviamos una respuesta al cliente con los datos y el nuevo token.
        res.json({
            status: 'ok',
            message: 'Usuario actualizado correctamente',
            token,
            username,
        });
    } catch (err) {
        // Crear un objeto JSON para los campos afectados en el error.
        const errorResponse = {
            error: err.message,
            fields,
        };

        const fieldsToCheck = [
            'avatar',
            'biography',
            'username',
            'newPassword',
        ];

        fieldsToCheck.forEach((field) => {
            if (err.message.includes(field)) {
                fields.push(field);
            }
        });

        // Verifica si no hay campos para actualizar
        if (fields.length === 0) {
            return res.status(400).json({
                error: 'No se proporcionaron campos para actualizar',
            });
        }
        res.status(400).json(errorResponse);
    }
};

module.exports = updateUserController;
