const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_SECRET;

const authenticateToken = (req, res, next) => {
    const token = req.header('Authorization');

    if (!token) {
        return res
            .status(401)
            .json({ message: 'No se proporcionó un token de autenticación.' });
    }

    const tokenParts = token.split(' ');
    if (tokenParts.length !== 2 || tokenParts[0] !== 'Bearer') {
        return res.status(401).json({ message: 'Token no válido.' });
    }

    jwt.verify(tokenParts[1], secretKey, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Token no válido.' });
        }

        req.auth = {
            user: decoded.userId,
        };

        next();
    });
};

module.exports = authenticateToken;
