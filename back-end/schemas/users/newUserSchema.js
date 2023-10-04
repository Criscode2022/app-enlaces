const Joi = require('joi');

const newUserSchema = Joi.object({
    username: Joi.string().alphanum().min(3).max(30).required(),
    password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,20}$'))
        .required(),
    // email: Joi.string().email().required(),
});

module.exports = newUserSchema;
