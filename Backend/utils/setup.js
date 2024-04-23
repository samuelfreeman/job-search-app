const prisma = require('./prisma');
const logger = require('./logger');

const data = {
  fullname: 'SuperAdmin',
  email: 'super@gmail.com',
  password: 'super@123',
};
exports.run = async () => {
  try {
    const findUsers = await prisma.admin.findMany({
      where: {
        email: 'super@gmail.com',
      },
      cacheStrategy: {
        swr: 60,
        ttl: 60,
      },
    });
    if (findUsers.length === 0) {
      await prisma.admin.create({
        data,
      });
      logger.info('SuperAdmin  Initialized!');
    } else {
      console.log('Super admin already created!');
    }
  } catch (error) {
    logger.error(error);
  }
};
