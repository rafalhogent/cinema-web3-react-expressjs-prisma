const { body } = require("express-validator");

const emailValidator = body("email").isEmail().withMessage("Email incorrect");
const passwordValidator = body("password")
  .notEmpty()
  .isLength({ min: 6 })
  .withMessage("Password must consist of at least 6 characters");

const loginValidator = [emailValidator, passwordValidator];

const registerValidator = [
  body("firstname")
    .trim()
    .notEmpty()
    .withMessage("First name is required")
    .isLength({ min: 2 })
    .withMessage("First name must consist of at least 2 characters"),
  body("lastname")
    .trim()
    .notEmpty()
    .withMessage("Last name is required")
    .isLength({ min: 2 })
    .withMessage("Last name must consist of at least 2 characters"),
  emailValidator,
  passwordValidator,
];

module.exports = { loginValidator, registerValidator };