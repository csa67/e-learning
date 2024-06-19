const validator = require('validator');

// Email validation
const validateEmail = (email) => {
   return validator.isEmail(email);
};

// Password strength validation
const validatePassword = (password) => {
    // Regex explanation:
    // ^                 : start of string
    // (?=.*[0-9])       : at least one digit
    // (?=.*[!@#$%^&*])  : at least one special character
    // (?=.*[A-Z])       : at least one uppercase letter
    // (?=.*[a-z])       : at least one lowercase letter
    // .{8,}             : at least 8 characters
    // $                 : end of string
    const strongPasswordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[A-Z])(?=.*[a-z]).{8,}$/;
    return strongPasswordRegex.test(password);
};

module.exports = {
  validateEmail,
  validatePassword
};
