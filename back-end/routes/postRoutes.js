const express = require('express');
const routes = express.Router();

// Importamos las funciones controladoras finales.

const {
    createPost,
    getPostsController,
    unlikePostController,
    getAllLikesController,
    likePostController,
} = require('../controllers/posts');

// Aquí irían el resto de enpoints de posts.

routes.get('/posts', getPostsController);
routes.post('/posts/like/:postId', likePostController);
routes.get('/posts/likes', getAllLikesController);
routes.delete('/posts/unlike/:postId', unlikePostController);
routes.post('/posts/newPost', createPost);

module.exports = routes;
