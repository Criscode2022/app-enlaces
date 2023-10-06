// Utilizamos el método "config" de la librería dotenv para cargar las variables de entorno.
require('dotenv').config();

// Importamos las dependencias.
const express = require('express');
const cors = require('cors');
const { expressjwt } = require('express-jwt');

// Importamos las rutas.
const routes = require('./routes');

//Importamos los controladores

const { getPostsController } = require('./controllers/posts/postsController');

// Importamos los controladores.
const {
    getLikeCountController,
    getAllLikesController,
    unlikePostController,
    likePostController,
} = require('./controllers/posts/postsController');
const authenticateToken = require('./utils/authenticateToken');

// Creamos el servidor.
const app = express();

// Middleware que evita problemas de conexión con el cliente.
app.use(cors());

app.use('/posts', authenticateToken);

// Middleware que permite recibir datos en formato JSON.
app.use(express.json());

// Middleware que indica a Express donde están las rutas.
app.use(routes);

// Authentication middleware. This takes care of verifying the JWT token and
// storing the token data (user id) in req.auth.
const isAuthenticated = expressjwt({
    secret: process.env.JWT_SECRET,
    algorithms: ['HS256'],
});

// Endpoint para dar like a un enlace:
// app.post('/posts/like/:postId', isAuthenticated, likePostController);

// Endpoint para eliminar un like de un enlace:
// app.delete('/posts/like/:postId', isAuthenticated, unlikePostController);

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
