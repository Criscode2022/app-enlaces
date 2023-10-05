const express = require('express');
const routes = express.Router();

// Importamos las funciones controladoras finales.

const {
    getPostsController,
    likePostController,
} = require('../controllers/posts');

// Aquí irían el resto de enpoints de posts.

routes.get('/posts', getPostsController);
routes.post('/posts/like/:postId', likePostController);

module.exports = routes;
