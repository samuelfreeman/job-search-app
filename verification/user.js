// verifying the user's existence

const logger = require('../utils/logger');
const prisma = require('../utils/prisma');
// function to check if user exists before moving to the next function
const checkUserExits = async (email) => {
  try {
    const user = prisma.user.findFirst({
      where: {
        email,
      },
    });

    return user;
  } catch (error) {
    return logger.error(error);
  }
};

// function to check if admin exists before moving to the next function : this function is for the login  operation

const checkAdminExists = async (email) => {
  try {
    const user = prisma.admin.findFirst({
      where: {
        email,
      },
    });

    return user;
  } catch (error) {
    return logger.error(error);
  }
};
module.exports = {
  checkUserExits,
  checkAdminExists,
};
