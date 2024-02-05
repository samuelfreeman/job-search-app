const prisma = require('../utils/prisma');
// helper function to create a job
const createJob = async (data) => {
  const job = await prisma.job.create({
    data,
  });
  return job;
};

const checkDoubleJobCreation = async (name) => {
  const getJob = await prisma.job.findFirst({
    where: {
      title: {
        contains: `${name}`,
      },
    },
  });
  return getJob;
};
// helper function for getting all jobs
const getJobs = async () => {
  const jobs = await prisma.job.findMany({});
  return jobs;
};
// helper   for query jobs
const queryJobs = async (query) => {
  const jobs = await prisma.job.findMany({
    where: {
      OR: [
        { title: { contains: query, mode: 'insensitive' } },
        { cartegory: { name: { contains: query, mode: 'insensitive' } } },
      ],
    },
    include: {
      cartegory: true,
    },
  });
  return jobs;
};
//  helper to get a single job
const get_single_job = async (id) => {
  const job = await prisma.job.findFirst({
    where: {
      id,
    },
    include: {
      application: {
        include: {
          user: true,
        },
      },
    },
  });
  return job;
};
//  edit  a job
const editJob = async (id, data) => {
  const jobs = await prisma.job.update({
    where: {
      id,
    },
    data,
  });
  return jobs;
};
// helper to remove job
const removeJob = async (id) => {
  const job = await prisma.job.delete({
    where: {
      id,
    },
  });
  return job;
};

module.exports = {
  createJob,
  getJobs,
  queryJobs,
  get_single_job,
  removeJob,
  editJob,
  checkDoubleJobCreation
};
