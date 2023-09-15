const pool = require("../db/db");

async function getBiography(req, res, next) {
  try {
    const [results] = await pool.query(`
        SELECT biography_user
        FROM users       
        `);

    res.send({
      ok: true,
      data: results,
      error: null,
      message: null,
    });
  } catch (error) {
    next(error);
  }
}

module.exports = getBiography;
