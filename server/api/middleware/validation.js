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
    } else if (user.username.length < 5) {
        errors.username = "Username must be at least 5 characters long";
    }

    // Check email
    if (Validator.isEmpty(user.email)) {
        errors.email = "Email is required";
    } else if (!Validator.isEmail(user.email)) {
        errors.email = "Email is invalid";
    }

    // Check password
    if (Validator.isEmpty(user.password)) {
        errors.password = "Password is required";
    } else if (user.password.length < 7) {
        errors.password = "Password must be at least 7 characters long";
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
