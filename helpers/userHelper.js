const prisma = require('../utils/prisma');
const createUser = async (data) => {
  return (user = await prisma.user.create({
    data,
  }));
};

const getUsers = async () => {
  const user = await prisma.user.findMany({});
  return user;
};

const updateUser = async (id, data) => {
  const user = await prisma.user.update({
    where: {
      id,
    },
    data,
  });
  return user;
};

const getSingleUser = async (id) => {
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
  });
  return user;
};
const deleteUser = async (id) => {
  const user = await prisma.user.delete({
    where: {
      id,
    },
  });
  return user;
};

const applyJobs = async (id) => {
  const user = await prisma.user.findMany({
    where: {
      id,
    },
    include: {
      appliedJobs: {
        where: {
          userId: id,
        },
        include: {
          job: true,
        },
      },
    },
  });
  return user;
};
const getAppliedJobs = async (userId, status) => {
  const user = await prisma.application.findMany({
    where: {
      AND: [
        {
          userId,
          status,
        },
      ],
    },
    include: {
      job: true,
    },
  });
  return user;
};

module.exports = {
  createUser,
  getUsers,
  updateUser,
  deleteUser,
  getSingleUser,
  applyJobs,
  getAppliedJobs,
};
