const { getConnection } = require('./db');

const getAllLinks = async () => {
  let connection;
  try {
   connection = await getConnection();

   const [result] = await connection.query(`
      SELECT * FROM posts ORDER BY created_at DESC
    `);

    return result;
  } finally {
    if (connection) connection.release();
  }
};
