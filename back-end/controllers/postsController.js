const pool = require('../db/db');

async function getPostsController (req, res, next) {
    const connection = await pool.getConnection();
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
    } finally {
        if (connection) connection.release();
    }

}

async function likePostController(req, res) {
  const postId = req.params.postId;

  try {
    // Verifica si el post al que se le dará like existe
    const [[post]] = await pool.query('SELECT * FROM posts WHERE id_post = ?', [
      postId,
    ]);

    if (!post) {
      return res.status(404).json({ message: 'Post no encontrado' });
    }

    // Incrementa el contador de likes del post
    const updatedLikes = post.post_likes + 1;

    // Actualiza la propiedad de likes en la base de datos
    await pool.query('UPDATE posts SET post_likes = ? WHERE id_post = ?', [
      updatedLikes,
      postId,
    ]);

    // Recupera nuevamente el post actualizado con los likes
    const [[updatedPost]] = await pool.query(
      'SELECT * FROM posts WHERE id_post = ?',
      [postId]
    );

    return res.json({
      message: 'Like agregado correctamente',
      updatedLikes: updatedPost.post_likes,
    });
  } catch (error) {
    console.error('Error al agregar like al post:', error);
    return res.status(500).send('Error al agregar like al post');
  }
}

module.exports = { getPostsController, likePostController };
