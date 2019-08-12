const Validator = require("validator");
const isEmpty = require("is-empty");

const validateRegister = user => {
  let errors = {};

  // Convert empty fields to empty string
  user.username = !isEmpty(user.username) ? user.username : "";
  user.email = !isEmpty(user.email) ? user.email : "";
  user.password = !isEmpty(user.password) ? user.password : "";

  // Check username
  if (Validator.isEmpty(user.username)) {
    errors.username = "Username is required";
  }

  // Check email
  if (Validator.isEmpty(user.email)) {
    errors.email = "Email is required";
  } else if (Validator.isEmail(user.email)) {
    errors.email = "Email is invalid";
  }

  // Check password
  if (Validator.isEmpty(user.password)) {
    errors.password = "Password is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

const validateLogin = user => {
  let errors = {};

  // Convert empty fields to empty string
  user.username = !isEmpty(user.username) ? user.username : "";
  user.password = !isEmpty(user.password) ? user.password : "";

  // Check username
  if (Validator.isEmpty(user.username)) {
    errors.username = "Username is required";
  }

  // Check password
  if (Validator.isEmpty(user.password)) {
    errors.password = "Password is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

module.exports = {
  validateRegister,
  validateLogin
};
