const jwt = require('jsonwebtoken');
const logger = require('./logger');

exports.signToken = async (payload) => {
  try {
    const token = jwt.sign({ payload }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });
    return token;
  } catch (error) {
    return logger.error(error);
  }
};
exports.userSignToken = async (payload) => {
  try {
    const token = jwt.sign({ payload }, process.env.JWT_SECRET_KEY, {
      expiresIn: '1h',
    });
    return token;
  } catch (error) {
    return logger.error(error);
  }
};
// set invalid
exports.setInvalidToken = (loggedout) =>
  jwt.sign({ loggedout }, process.env.JWT_SECRET, {
    expiresIn: 60,
  });

// verify  token
exports.verifyToken = (req, res, next) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
      return res.status(401).json({
        status: 'fail',
        message: 'Access Denied',
        token,
      });
    }
    try {
      const verified = jwt.verify(token, process.env.JWT_SECRET);
      req.user = verified;
      next();
    } catch (error) {
      res.status(403).json({
        status: 'fail',
        message: 'Invalid Token',
        token,
      });
    }
  } else {
    return res.status(500).json({
      status: 'fail',
      message: 'No Header Available',
    });
  }
};
exports.verifyUserToken = (req, res, next) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
      return res.status(401).json({
        status: 'fail',
        message: 'Access Denied',
        token,
      });
    }
    try {
      const verified = jwt.verify(token, process.env.JWT_SECRET_KEY);
      req.user = verified;
      next();
    } catch (error) {
      res.status(403).json({
        status: 'fail',
        message: 'Invalid Token',
        token,
      });
    }
  } else {
    return res.status(500).json({
      status: 'fail',
      message: 'No Header Available',
    });
  }
};
