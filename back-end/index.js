'use strict';

// Importaciones usando CommonJS

require('dotenv').config();
const express = require('express');
const app = express();
const {
  getPostsController,
  likePostController,
} = require('./controllers/postsController');

app.get('/', (req, res) => {
  res.send('This server is now live!');
}); // Ruta para mostrar un mensaje en la raíz del servidor

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Endpoint para dar like a un enlace:

app.patch('/posts/like/:postId', likePostController);

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
