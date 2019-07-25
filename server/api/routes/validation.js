const Joi = require("joi");

const registerValidation = data => {
  const schema = {
    username: Joi.string()
      .min(3)
      .max(15)
      .required(),
    email: Joi.string()
      .min(7)
      .max(50)
      .required()
      .email(),
    password: Joi.string()
      .min(7)
      .max(255)
      .required()
  };

  return Joi.validate(data, schema);
};

const loginValidation = data => {
  const schema = {
    username: Joi.string()
      .min(3)
      .max(15)
      .required(),
    password: Joi.string()
      .min(7)
      .max(255)
      .required()
  };

  return Joi.validate(data, schema);
};

const challengeValidation = data => {
  const schema = {
    title: Joi.string()
      .min(5)
      .max(15)
      .required(),
    difficulty: Joi.string()
      .min(3)
      .max(7)
      .required(),
    prompt: Joi.string()
      .min(7)
      .max(200)
      .required()
  };

  return Joi.validate(data, schema);
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
module.exports.challengeValidation = challengeValidation;
