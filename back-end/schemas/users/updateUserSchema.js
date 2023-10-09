// Define un esquema de validación para la actualización de usuario.

const Joi = require('joi');

const updateUsersSchema = Joi.object({
    biography: Joi.string().max(200),
    avatar: Joi.string().uri(),
    newUsername: Joi.string().min(3).max(30),
    id_user: Joi.number().integer().positive().required(),
    newPassword: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,20}$'))
        .required(),
});

module.exports = updateUserSchema;