const express = require('express');
const deletePostController = require('../controllers/posts/deletePostController');
const routes = express.Router();

// Importamos las funciones controladoras intermedias.
const authenticateToken = require('../middlewares/authenticateToken');

// Importamos las funciones controladoras finales.

const {
    createPost,
    getPostsController,
    unlikePostController,
    getAllLikesController,
    likePostController,
} = require('../controllers/posts');

// Aquí irían el resto de enpoints de posts.

routes.get('/posts', authenticateToken, getPostsController);
routes.post('/posts/like/:postId', authenticateToken, likePostController);
routes.get('/posts/likes', authenticateToken, getAllLikesController);
routes.delete('/posts/unlike/:postId', authenticateToken, unlikePostController);
routes.post('/posts/newPost', authenticateToken, createPost);
routes.delete('/posts/:postId', authenticateToken, deletePostController);

module.exports = routes;
