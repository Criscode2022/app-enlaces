const express = require('express');
const routes = express.Router();

// Importamos las funciones controladoras finales.

const { getPostsController } = require('../controllers/posts');

// Aquí irían el resto de enpoints de posts.

routes.get('/posts', getPostsController);

module.exports = routes;
