'use strict';

// Importaciones usando CommonJS

require('dotenv').config();
const express = require('express');
const app = express();
const {
  getPostsController,
  likePostController,
} = require('./controllers/postsController');
const { expressjwt } = require('express-jwt');
const jwt = require('jsonwebtoken');
const cors = require('cors');

app.use(cors());



app.get('/', (req, res) => {
  res.send('This server is now live!');
}); // Ruta para mostrar un mensaje en la raíz del servidor

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Authentication middleware. This takes care of verifying the JWT token and
// storing the token data (user id) in req.auth.
const isAuthenticated = expressjwt({
  secret: process.env.JWT_SECRET,
  algorithms: ['HS256'],
});

//Endpoint para dar like a un enlace:

app.post('/posts/like/:postId', isAuthenticated, likePostController);

//Endpoint para acceder a todos los enlances publicados:
app.use('/posts', getPostsController);

app.use('/users', require('./controllers/usersController'));
app.use('/update', require('./controllers/updatesUsers'));



//Middleware de errores, devuelve una respuesta de error adecuada y maneja la situación de manera controlada.
app.use((error, req, res, next) => {
  console.error(error);
  res.status(error.httpStatus || 500).send({
    status: 'error',
    message: error.message,
  });
});

app.listen(process.env.SERVER_PORT, () => {
  console.log(`Server is running on port ${process.env.SERVER_PORT}`);
});
