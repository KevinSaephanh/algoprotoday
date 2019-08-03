const Joi = require("joi");

const getErrors = err => {
  switch (err.type) {
    case "any.empty":
      err.message = "This field is required";
      return err.message;
    case "string.min":
      err.message = `This field should have at least ${
        err.context.limit
      } characters!`;
      return err.message;
    case "string.max":
      err.message = `This field should have at most ${
        err.context.limit
      } characters!`;
      return err.message;
    case "string.email":
      err.message = "You must provide an email";
      return err.message;
    default:
      return;
  }
};

// Use joi to validate forms
const registerValidation = data => {
  const schema = Joi.object().keys({
    username: Joi.string()
      .min(3)
      .max(15)
      .required()
      .error(errors => {
        errors.forEach(err => {
          err = getErrors(err);
        });

        return errors;
      }),
    email: Joi.string()
      .min(7)
      .max(50)
      .required()
      .email()
      .error(errors => {
        errors.forEach(err => {
          err = getErrors(err);
        });

        return errors;
      }),
    password: Joi.string()
      .min(7)
      .max(255)
      .required()
      .regex(/^(?=.*[A-Z])(?=.*\d)/)
      .error(errors => {
        errors.forEach(err => {
          err = getErrors(err);
        });

        return errors;
      })
  });

  return Joi.validate(data, schema);
};

const loginValidation = data => {
  const schema = {
    username: Joi.string()
      .min(3)
      .max(15)
      .required()
      .error(errors => {
        errors.forEach(err => {
          err = getErrors(err);
        });

        return errors;
      }),
    password: Joi.string()
      .min(7)
      .max(255)
      .required()
      .error(errors => {
        errors.forEach(err => {
          err = getErrors(err);
        });

        return errors;
      })
  };

  return Joi.validate(data, schema);
};

const challengeValidation = data => {
  const schema = {
    title: Joi.string()
      .min(5)
      .max(55)
      .required()
      .error(errors => {
        errors.forEach(err => {
          err = getErrors(err);
        });

        return errors;
      }),
    difficulty: Joi.string()
      .min(3)
      .max(15)
      .required()
      .error(errors => {
        errors.forEach(err => {
          err = getErrors(err);
        });

        return errors;
      }),
    prompt: Joi.string()
      .min(7)
      .max(500)
      .required()
      .error(errors => {
        errors.forEach(err => {
          err = getErrors(err);
        });

        return errors;
      })
  };

  return Joi.validate(data, schema);
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
module.exports.challengeValidation = challengeValidation;
