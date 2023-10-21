// Define un esquema de validación para la actualización de usuario.

const Joi = require('joi');
const updateUserSchema = Joi.object({
    biography: Joi.string().max(200).allow(null, '').optional(),
    avatar: Joi.string().uri().allow(null, '').optional(),
    username: Joi.string().min(3).max(30).optional().allow(''),
    newPassword: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,20}$'))
        .optional()
        .allow(''),
});
module.exports = updateUserSchema;
