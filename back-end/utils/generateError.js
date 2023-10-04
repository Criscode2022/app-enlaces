// Función que genera un error con un código de estado.
const generateError = (message, statusCode) => {
    const err = new Error(message);
    err.httpStatus = statusCode;
    throw err;
};

module.exports = generateError;
