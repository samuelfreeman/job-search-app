const prisma = require('../utils/prisma');
const createAdmin = async (data) => {
  const admin = await prisma.admin.create({ data });
  return admin;
};

const getAdmin = async (id) => {
  const admin = await prisma.admin.findUnique({
    where: {
      id,
    },
  });
  return admin;
};

const getAllAdmins = async () => {
  const admin = await prisma.admin.findMany({});
  return admin;
};
const updateAdmin = async (id, data) => {
  const admin = await prisma.admin.update({
    where: {
      id,
    },
    data,
  });
  return admin;
};
const deleteAdmin = async (id) => {
  const admin = await prisma.admin.delete({
    where: {
      id,
    },
  });
  return admin;
};
module.exports = {
  createAdmin,
  getAdmin,
  getAllAdmins,
  updateAdmin,
  deleteAdmin,
};
