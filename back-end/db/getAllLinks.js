const { getConnection } = require('./db');

//Con esta función obtenemos el listado de enlaces publicados, en orden de fecha de publicación:

const getAllLinks = async () => {
  let connection;
  try {
   connection = await getConnection();

   const [result] = await connection.query(`
      SELECT * FROM posts ORDER BY created_at DESC
    `);
    return result;
  } finally {
    //Comprobamos siempre que la conexión quede cerrada:
    if (connection) connection.release();
  }
};

module.exports = {
  getAllLinks
};
