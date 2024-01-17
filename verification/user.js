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
  } catch (e) {
    return logger.error(e);
  }
};

module.exports = checkUserExits;
