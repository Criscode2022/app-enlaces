const { getConnection } = require('./db');

//Con esta función obtenemos el listado de enlaces publicados, en orden de fecha de publicación, junto con la info del usuario:

const getAllLinks = async () => {
  let connection;
  try {
   connection = await getConnection();

   const [result] = await connection.query(`
      SELECT post_url, post_title, post_description, name_user, posts.created_at, post_likes
      FROM posts 
      JOIN users 
      ON posts.id_user = users.id_user`);
    return result;
  } finally {
    //Comprobamos siempre que la conexión quede cerrada:
    if (connection) connection.release();
  }
};

module.exports = {
  getAllLinks
};
