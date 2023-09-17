const pool = require('../db/db');

async function getPostsController (req, res, next) {
    try {
        const [results] = await pool.query(`
        SELECT post_url, post_title, post_description, name_user, posts.created_at, post_likes
        FROM posts 
        JOIN users 
        ON posts.id_user = users.id_user      
        `);

        res.send({
            ok: true,
            data: results,
            error: null,
            message: null
        });

    } catch (error) {
        next(error);
    }
}

module.exports = getPostsController;