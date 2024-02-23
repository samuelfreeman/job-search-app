const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const { hash } = require('./bcrypt');

const hashPwd = (password) => hash(password);

prisma.$use(async (params, next) => {
  if (params.model === 'user') {
    if (params.action === 'create' || params.action === 'update') {
      if (params.args.data.password) {
        // console.log(params.args.data.password)
        const hashPass = await hashPwd(params.args.data.password);
        params.args.data.password = hashPass;
      }
    }
  }
  return next(params);
});

module.exports = prisma;
