const pool = require('../../db/db');
const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();
const Joi = require('joi');

async function getPostsController(req, res, next) {
    const connection = await pool.getConnection();
    try {
        const [results] = await pool.query(`
          SELECT p.post_url, p.post_img, p.post_title, p.post_description, u.name_user, p.id_post, u.id_user, COUNT(l.id_like) AS like_count
          FROM posts p
          LEFT JOIN likes l ON p.id_post = l.id_post
          JOIN users u ON p.id_user = u.id_user
          GROUP BY p.id_post      
        `);

        res.send({
            ok: true,
            data: results,
            error: null,
            message: null,
        });
    } catch (error) {
        next(error);
    } finally {
        if (connection) connection.release();
    }
}
module.exports = getPostsController;
