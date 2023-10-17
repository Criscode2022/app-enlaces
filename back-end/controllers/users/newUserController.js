// Importamos el módulo que encripta las contraseñas.
const bcrypt = require('bcrypt');

// Importamos el objeto Pool que me permite conectarme a la base de datos.
const pool = require('../../db/db');

// Importamos el esquema de Joi.
const newUserSchema = require('../../schemas/users/newUserSchema');

// Importamos la función que se encargará de validar el esquema.
const validateSchema = require('../../utils/validateSchema');

// Importamos la función que se encargará de generar un error.
const generateError = require('../../utils/generateError');

// Función controladora final que crea un nuevo usuario.
const newUserController = async (req, res, next) => {
    try {
        // Validamos los datos que envía el usuario.
        await validateSchema(newUserSchema, req.body);

        // Obtenemos los datos que nos interesan del body.
        const { username, password } = req.body;

        if (username.length < 3) {
            generateError(
                'El nombre de usuario debe tener al menos 3 caracteres',
                409
            );
        }

        // Comprobamos si existe un usuario con el mismo nombre.
        const [users] = await pool.query(
            'SELECT id_user FROM users WHERE name_user = ?',
            [username]
        );

        // Si existe, lanzamos un error.
        if (users.length > 0) {
            generateError('Ya existe un usuario con ese nombre', 409);
        }

        // Encriptamos la contraseña.
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insertamos el usuario.
        await pool.query(
            'INSERT INTO users (name_user, password_user) VALUES (?, ?)',
            [username, hashedPassword]
        );

        // Enviamos una respuesta al cliente.
        res.json({
            status: 'ok',
            message: 'Usuario creado correctamente',
        });
    } catch (err) {
        next(err);
    }
};

module.exports = newUserController;
