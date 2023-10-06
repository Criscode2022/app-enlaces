const express = require('express');
const routes = express.Router();

// Importamos las funciones controladoras finales.

const {
    getPostsController,
    getAllLikesController,
    likePostController,
} = require('../controllers/posts');

// Aquí irían el resto de enpoints de posts.

routes.get('/posts', getPostsController);
routes.post('/posts/like/:postId', likePostController);
routes.get('/posts/likes', getAllLikesController);

module.exports = routes;
