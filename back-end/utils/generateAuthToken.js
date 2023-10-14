// Importa la biblioteca 'jsonwebtoken'.
const jwt = require('jsonwebtoken');

// Clave secreta para firmar el token.
const secretKey = process.env.JWT_SECRET;

// Función para generar un token de autenticación.
const generateAuthToken = (userId, userName) => {
    // Define la información que deseas incluir en el token.
    const payload = {
        userId: userId,
        userName: userName,
    };

    // Genera el token utilizando jwt.sign().
    const token = jwt.sign(payload, secretKey, {
        expiresIn: '24h',
    });

    return token;
};

module.exports = generateAuthToken;
