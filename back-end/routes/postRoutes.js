const express = require('express');
const deletePostController = require('../controllers/posts/deletePostController');
const routes = express.Router();

routes.delete('/posts/:postId', deletePostController);

module.exports = routes;

