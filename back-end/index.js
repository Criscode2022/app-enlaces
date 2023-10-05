// Utilizamos el método "config" de la librería dotenv para cargar las variables de entorno.
require('dotenv').config();

// Importamos las dependencias.
const express = require('express');
const cors = require('cors');
const { expressjwt } = require('express-jwt');

// Importamos las rutas.
const routes = require('./routes');

// Importamos los controladores.
const {
    getLikeCountController,
    getAllLikesController,
    unlikePostController,
    getPostsController,
    likePostController,
} = require('./controllers/posts/postsController');

// Creamos el servidor.
const app = express();

// Middleware que evita problemas de conexión con el cliente.
app.use(cors());

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

//  Endpoint para acceder a todos los enlances publicados: tiene que devolver info todos los post. A mayores, tiene que devolver el número de likes que tiene cada post,
// el nombre del usuario que lo publicó, si el usuario ha dado like o no al post, si el usuario es dueño del post o no.
app.use('/posts', getPostsController);

// Endpoint para dar like a un enlace:
app.post('/posts/like/:postId', isAuthenticated, likePostController);

// Endpoint para eliminar un like de un enlace:
app.delete('/posts/like/:postId', isAuthenticated, unlikePostController);

// app.use('/users', require('./controllers/usersController'));
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
