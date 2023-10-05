// Importamos el módulo que encripta las contraseñas.
const bcrypt = require('bcrypt');

// Importamos el objeto Pool que me permite conectarme a la base de datos.
const pool = require('../../db/db');

// Importamos la función que se encargará de generar un token de autenticación.
const generateAuthToken = require('../../utils/generateAuthToken');

// Importamos el esquema de Joi para validar los datos del inicio de sesión.
const loginSchema = require('../../schemas/users/loginSchema');

// Importamos la función que se encargará de validar el esquema.
const validateSchema = require('../../utils/validateSchema');

// Importamos la función que se encargará de generar un error.
const generateError = require('../../utils/generateError');

// Función controladora final que permite a un usuario iniciar sesión.
const loginUserController = async (req, res, next) => {
    try {
        // Validamos los datos que envía el usuario.
        await validateSchema(loginSchema, req.body);

        // Obtenemos los datos que nos interesan del body.
        const { username, password } = req.body;

        // Buscamos al usuario en la base de datos por nombre de usuario.
        const [users] = await pool.query(
            'SELECT * FROM users WHERE name_user = ?',
            [username]
        );

        // Si no existe un usuario con ese nombre, lanzamos un error.
        if (users.length === 0) {
            generateError('Usuario no encontrado', 404);
        }

        // Comparamos la contraseña proporcionada con la almacenada en la base de datos.
        const user = users[0];
        const passwordMatch = await bcrypt.compare(
            password,
            user.password_user
        );

        // Si las contraseñas no coinciden, lanzamos un error.
        if (!passwordMatch) {
            generateError('Contraseña incorrecta', 401);
        }

        // Generamos un token de autenticación para el usuario.
        const authToken = generateAuthToken(user.id_user);

        // Enviamos una respuesta al cliente con el token.
        res.json({
            status: 'ok',
            message: 'Inicio de sesión exitoso',
            token: authToken,
        });
    } catch (err) {
        next(err);
    }
};

module.exports = loginUserController;
