const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_SECRET;

const generateError = require('../utils/generateError');

const authenticateToken = (req, res, next) => {
    const token = req.header('Authorization');

    if (!token) {
        generateError('No se proporcionó un token de autenticación.', 401);
    }

    const tokenParts = token.split(' ');

    if (tokenParts.length !== 2 || tokenParts[0] !== 'Bearer') {
        generateError('Formato de token incorrecto.', 401);
    }

    try {
        const tokenInfo = jwt.verify(tokenParts[1], secretKey);

        req.auth = {
            user: tokenInfo.userId,
        };

        next();
    } catch (err) {
        console.error(err);
        generateError('El token proporcionado no es válido.', 401);
    }
};

module.exports = authenticateToken;
