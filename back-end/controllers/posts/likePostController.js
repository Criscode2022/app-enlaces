const pool = require('../../db/db');
const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();
const Joi = require('joi');

async function likePostController(req, res, next) {
    const id = req.auth.user;
    const { postId } = req.params;

    try {
        await pool.query('INSERT INTO likes (id_user, id_post) VALUES (?, ?)', [
            id,
            postId,
        ]);

        return res.status(201).json({ mensaje: 'Like agregado exitosamente' });
    } catch (error) {
        next(error);
    }
}

module.exports = likePostController;
