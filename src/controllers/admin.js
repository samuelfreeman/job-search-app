const prisma = require("../utils/prisma");

const bcrypt = require("../utils/bcrypt");

const logger = require("../utils/logger");

const checkUser = require("../verification/user");

const jwt = require("../utils/token");

exports.register = async (req, res, next) => {
  const data = req.body;
  const checkUserExits = await checkUser(data.email);
  if (checkUserExits) {
    logger.error("User has already registered!");
    res.status(400).json({
      message: "User account Already Exits!",
    });
  } else {
    try {
      data.password = await bcrypt.hash(data.password);
      const user = await prisma.admin.create({
        data,
      });
      logger.info("User registered succesfully!");
      const token = await jwt.signToken(user.id);
      delete user.password;
      res.status(201).json({
        Status: "success",
        user,
        AccessToken: token,
      });
    } catch (e) {
      logger.error(e);
      next();
    }
  }
};

exports.login = async (req, res, next) => {
  try {
    const data = req.body;
    const userExits = await checkUser(data.email);
    if (!userExits) {
      logger.error("User account not found!");
      res.status(404).json({
        message: "User not found!",
      });
    } else {
      const checkPass = await bcrypt.compare(data.password, userExits.password);
      if (!checkPass) {
        logger.error("User Password or Email incorrect!");
        res.status(422).json({
          message: "Invalid credentials!",
        });
      } else {
        const token = await jwt.signToken(userExits.id);
        logger.info("User logged in succesfully!");
        res.status(200).json({
          message: "User succesfully logged in!",
          AccessToken: token,
        });
      }
    }
  } catch (e) {
    logger.error(e);
    next();
  }
};
