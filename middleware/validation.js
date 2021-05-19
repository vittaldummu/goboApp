const joi = require("joi");

function registerValidation(data) {
  const schema = joi.object({
    firstName: joi.string().required(),
    lastName: joi.string().required(),
    userRole :joi.string().required(),
    email: joi.string().email().required(),
    password: joi.string().required(),
    phone: joi.string().required().max(15),
//  is_profile_updated:joi.string().required()
  });
  return schema.validate(data);
}

function loginValidation(data) {
  const schema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().required(),
    userRole :joi.string().required(),
  });
  return schema.validate(data);
}

module.exports = { registerValidation, loginValidation };
