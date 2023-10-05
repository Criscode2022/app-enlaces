const Joi = require('joi');

const loginSchema = Joi.object({
    username: Joi.string().alphanum().min(3).max(30).required(),
    password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,20}$'))
        .required(),
});

module.exports = loginSchema;
