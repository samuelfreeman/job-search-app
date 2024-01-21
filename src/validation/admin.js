const { body } = require('express-validator');

const validate = [
  body('fullname')
    .isString()
    .trim()
    .notEmpty()
    .withMessage('Please provide your name '),
  body('email')
    .isString()
    .withMessage('Value provided is not a string!')
    .trim()
    .isEmail()
    .withMessage('Value is not an email!')
    .notEmpty()
    .withMessage('Email is required!'),
  body('password')
    .trim()
    .isString()
    .notEmpty()
    .withMessage('Password required!')
    .isStrongPassword()
    .withMessage('Please provide a strong password!'),
];

module.exports = validate;
