const express = require('express');
const routes = express.Router();

// Importamos las rutas de usuarios y posts.
const userRoutes = require('./userRoutes');
const postRoutes = require('./postRoutes');

// Middleware que establece las rutas de usuarios y posts.
routes.use(userRoutes);
routes.use(postRoutes);

module.exports = routes;
