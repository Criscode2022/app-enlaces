// Reemplazamos la nueva biografía y avatar que el usuario quiera actualizar.
const Joi = require("joi");
const pool = require("../db/db");

// Define un esquema de validación para la actualización de la biografía.
const biographySchema = Joi.object({
  biography: Joi.string().max(200).required(),
  id_user: Joi.number().integer().positive().required(),
});

// Controlador para actualizar la biografía del usuario.
const updateBiography = async (req, res, next) => {
  const { error } = biographySchema.validate(req.body);

  if (error) {
    return res
      .status(400)
      .json({ status: "error", message: error.details[0].message });
  }

  const { biography, id_user } = req.body;

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

// Define un esquema de validación para la actualización del avatar.
const avatarSchema = Joi.object({
  avatar: Joi.string().uri(), // Puedes ajustar la validación según tus necesidades.
  id_user: Joi.number().integer().positive().required(),
});

// Controlador para actualizar el avatar del usuario.
const updateAvatar = async (req, res, next) => {
  const { error } = avatarSchema.validate(req.body);

  if (error) {
    return res
      .status(400)
      .json({ status: "error", message: error.details[0].message });
  }

  const { avatar, id_user } = req.body;

  try {
    const sql = "UPDATE users SET avatar_user = ? WHERE id_user = ?";
    const [results] = await pool.query(sql, [avatar, id_user]);
    res.json({ status: "success", message: "Avatar updated successfully" });
  } catch (error) {
    console.error("Error updating avatar:", error);
    res.status(500).json({ status: "error", message: "Error updating avatar" });
  }
};

module.exports = { updateBiography, updateAvatar };
