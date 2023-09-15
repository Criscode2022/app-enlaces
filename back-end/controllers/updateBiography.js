// Reemplaza con la nueva biografía que deseas establecer.
const pool = require("../db/db");

const updateBiography = async (req, res, next) => {
  const { biography, id_user } = req.body; // Asegúrate de que req.body contenga los valores adecuados

  try {
    const sql = "UPDATE users SET biography_user = ? WHERE id_user = ?";
    const [results] = await pool.query(sql, [biography, id_user]);
    res.json({ status: "success", message: "Biography updated successfully" });
  } catch (error) {
    console.error("Error updating biography:", error);
    res
      .status(500)
      .json({ status: "error", message: "Error updating biography" });
  }
};

module.exports = updateBiography;
