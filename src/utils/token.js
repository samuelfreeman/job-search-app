const jwt = require('jsonwebtoken');
const logger = require('./logger');

exports.signToken = async (payload) => {
  try {
    const token = jwt.sign({ payload }, process.env.SECRET, {
      expiresIn: '1h',
    });
    return token;
  } catch (error) {
    return logger.error(error);
  }
};
