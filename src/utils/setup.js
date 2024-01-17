const prisma = require("../utils/prisma");
const logger = require("../utils/logger");
const data = {
  fullname: "SuperAdmin",
  email: "super@gmail.com",
  password: "super@123",
  telephone: "023456789",
};
exports.run = async () => {
  try {
    console.log("Checking for super admin");
    const findUsers = await prisma.admin.findMany({
      where: {
        email: "super@gmail.com",
      },
    });
    if (findUsers.length === 0) {
      const admin = await prisma.admin.create({
        data,
      });
      logger.info("SuperAdmin  Initialized");
      console.log("SuperAdmin  Created:", admin);
    } else {
      console.log("SuperAdmin Available:", findUsers);
    }
  } catch (error) {
    logger.error(error);
    console.error(error);
  }
};
