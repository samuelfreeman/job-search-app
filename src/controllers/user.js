const prisma = require("../utils/prisma");

const bcrypt = require("../utils/bcrypt");

const logger = require("../utils/logger");

const { checkUserExits } = require("../verification/user");

const jwt = require("../utils/token");

exports.register = async (req, res, next) => {
  const data = req.body;
  const checkUserExit = await checkUserExits(data.email);

  if (checkUserExit) {
    logger.error("User has already registered!");
    res.status(400).json({
      message: "User account Already Exits!",
    });
  } else {
    try {
      data.password = await bcrypt.hash(data.password);
      const user = await prisma.user.create({
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
    } catch (error) {
      console.log(error);
      logger.error(error);
      next();
    }
  }
};

exports.login = async (req, res, next) => {
  try {
    const data = req.body;
    const userExits = await checkUserExits(data.email);
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
  } catch (error) {
    console.log(error);
    logger.error(error);
    next();
  }
};

exports.getUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await prisma.user.findFirst({
      where: {
        id,
      },
    });
    delete user.password;
    res.status(200).json({
      status: "Success",
      user,
    });
  } catch (error) {
    console.log(error);
    logger.error(error);
    next();
  }
};
exports.getAllUser = async (req, res, next) => {
  try {
    const user = await prisma.user.findMany({});
    delete user.password;
    res.status(200).json({
      status: "Success",
      users: user,
    });
  } catch (error) {
    console.log(error);
    logger.error(error);
    next();
  }
};

exports.updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = req.body;
    data.password = await bcrypt.hash(data.password);
    const user = await prisma.user.findFirst({
      where: {
        id,
      },
    });

    if (!user) {
      res.status(400).json({
        error: "User not found!",
      });
    } else {
      const user = await prisma.user.update({
        where: {
          id,
        },
        data,
      });
      delete user.password;
      res.status(200).json({
        status: "Success",
        user,
      });
    }
  } catch (error) {
    console.log(error.message);
    logger.error(error);
    next();
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await prisma.user.findFirst({
      where: {
        id,
      },
    });

    if (!user) {
      res.status(400).json({
        error: "User not found!",
      });
    } else {
      const user = await prisma.user.delete({
        where: {
          id,
        },
      });
      delete user.password;
      res.status(200).json({
        status: "success",
        message: "User deleted",
        user,
      });
    }
  } catch (error) {
    console.log(error);
    logger.error(error);
    next();
  }
};
