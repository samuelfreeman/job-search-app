const prisma = require('../utils/prisma');

const createCartegories = async (jobs) => {
  const cartegories = await prisma.cartegory.createMany({
    data: jobs,
  });
  return cartegories;
};

const createSingleCategory = async (data) => {
  const cartegorie = await prisma.cartegory.create({
    data,
  });
  return cartegorie;
};

const findCartegories = async (id) => {
  const cartegories = await prisma.job.findMany({
    cacheStrategy: {
      swr: 60,
      ttl: 60,
    },
    orderBy: [
      {
        createdAt: 'desc',
      },
    ],
    where: {
      industry: id,
    },
    include: {
      cartegory: true,
      application: true,
    },
  });
  return cartegories;
};

const queryCartegories = async (query) => {
  const cartegories = await prisma.cartegory.findMany({
    cacheStrategy: {
      swr: 60,
      ttl: 60,
    },
    orderBy: [
      {
        createdAt: 'desc',
      },
    ],
    where: {
      name: { contains: query, mode: 'insensitive' },
    },
    include: {
      jobs: true,
    },
  });

  return cartegories;
};

const singleCartegory = async (id) => {
  const cartegory = await prisma.cartegory.findFirst({
    cacheStrategy: {
      swr: 60,
      ttl: 60,
    },
    where: {
      id,
    },
    include: {
      jobs: true,
    },
  });
  return cartegory;
};
const delCartegory = async (id) => {
  const cartegory = await prisma.cartegory.delete({
    where: {
      id,
    },
  });
  return cartegory;
};
const editCartegory = async (id, data) => {
  const cartegory = await prisma.cartegory.update({
    where: {
      id,
    },
    data,
  });
  return cartegory;
};

module.exports = {
  createCartegories,
  findCartegories,
  queryCartegories,
  singleCartegory,
  delCartegory,
  editCartegory,
  createSingleCategory,
};
