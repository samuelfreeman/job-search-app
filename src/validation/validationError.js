const { validationResult } = require('express-validator');

const logger = require('../utils/logger');

exports.validationError = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors?.isEmpty()) {
    logger.error(errors.array());
    res.status(400).json({ errors: errors.array() });
  }
  next();
};
