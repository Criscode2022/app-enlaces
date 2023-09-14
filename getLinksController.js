//Este controller gestiona el endpoint '/links' con método GET:

const { createPool } = require('../db/db');

//Con esta función obtenemos el listado de enlaces publicados junto con la info del usuario:

const getAllLinks = async () => {
  let connection;
  try {
   connection = await pool.getConnection();

   const [result] = await connection.query(`
      SELECT post_url, post_title, post_description, name_user, posts.created_at, post_likes
      FROM posts 
      JOIN users 
      ON posts.id_user = users.id_user`);
    return result;
  } catch(error) {
    console.error(error);
  } finally {
    if(connection) connection.release();
  }
};

const getLinksController = async (req, res, next) => {
  try {
    const listOfLinks = await getAllLinks();
    res.send({
      status: 'ok',
      data: listOfLinks
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getLinksController
};
