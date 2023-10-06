const pool = require('../../db/db');
const generateError = require('../../utils/generateError');

async function deletePostController (req, res, next) {
    const id = req.auth.user;
    const { postId } = req.params;

    try {
        const [post] = await pool.query(`
            SELECT * 
            FROM posts
            WHERE id_post = ?
        `, [postId]);

        if (!post) {
            return next(generateError(404, 'No existe esa publicación.'));
        }
        if (post[0].id_user !== id) {
            return next(generateError(403, 'No puedes borrar la publicación de otra persona.'));
        }
        await pool.query(`
            DELETE FROM posts
            WHERE id_post = ?
        `, [postId]);

    } catch (error) {
        return next(error);
    }

    res.send({
        ok: true,
        data: null,
        error: null,
        message: 'Publicación borrada con éxito.'
    });
}

module.exports = deletePostController;
