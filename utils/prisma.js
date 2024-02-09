const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const { hash } = require('../utils/bcrypt');

const hashPwd = (password) => {
  return hash(password);
};
prisma.$use(async (params, next) => {
  if (params.model === "admin"||"user") {
    if (params.action === "create" || params.action === "update") {
      if (params.args.data.password) {
        const hashPass = hashPwd(params.args.data.password);
        params.args.data.password = hashPass;
      }
    }
  }
  return next(params);
});

module.exports = prisma;
