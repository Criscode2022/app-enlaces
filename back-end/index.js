// Utilizamos el método "config" de la librería dotenv para cargar las variables de entorno.
require('dotenv').config();

// Importamos las dependencias.
const express = require('express');
const cors = require('cors');

// Importamos las rutas.
const routes = require('./routes');

//Importamos los controladores

const authenticateToken = require('./utils/authenticateToken');

// Creamos el servidor.
const app = express();

// Middleware que evita problemas de conexión con el cliente.
app.use(cors());

//Middleware para proteger las rutas '/posts' con JWT

app.use('/posts', authenticateToken);

// Middleware que permite recibir datos en formato JSON.
app.use(express.json());

// Middleware que indica a Express donde están las rutas.
app.use(routes);

app.use('/users', require('./controllers/usersController'));
app.use('/update', require('./controllers/updatesUsers'));

// Middleware de error.
app.use((err, req, res, next) => {
    console.error(err);

    res.status(err.httpStatus || 500).send({
        status: 'error',
        message: err.message,
    });
});

// Middleware de ruta no encontrada.
app.use((req, res) => {
    res.status(404).send({
        status: 'error',
        message: 'Not found',
    });
});

app.listen(process.env.SERVER_PORT, () => {
    console.log(`Server is running on port ${process.env.SERVER_PORT}`);
});
