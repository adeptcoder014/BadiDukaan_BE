const Joi = require("joi");




const roleValidation = Joi.object({
    name: Joi.string().required(),
    permissions: Joi.array().items(Joi.string()).required(),
  });

  module.exports = roleValidation;
