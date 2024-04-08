const prisma = require('../utils/prisma');
//  helper to create alot of applications
const createApplications = async (applications) => {
  const application = await prisma.application.createMany({
    data: applications,
  });
  return application;
};
//  create single  application adn save it
const createSingleApplication = async (data) => {
  const application = await prisma.application.create({
    data,
  });
  return application;
};
// function to  update an application

const updateApplication = async (id, data) => {
  const application = await prisma.application.update({
    where: {
      id,
    },
    data,
  });
  return application;
};
const updateManyAppications = async (applicationIds, data) => {
  const application = await prisma.application.updateMany({
    where: {
      id: {
        in: applicationIds,
      },
    },
    data,
  });
  return application;
};
const find_single_Application = async (id) => {
  const application = await prisma.application.findUnique({
    where: {
      id,
    },
  });

  return application;
};
const findApplications = async () => {
  const application = await prisma.application.findMany({
    orderBy: [
      {
        createdAt: 'desc',
      },
    ],
  });
  return application;
};
const find_application_status = async (status) => {
  const application = await prisma.application.findMany({
    orderBy: [
      {
        createdAt: 'desc',
      },
    ],
    where: {
      status,
    },
    include: {
      user: true,
    },
  });
  return application;
};

const deleteApplication = async (id) => {
  const application = await prisma.application.delete({
    where: {
      id,
    },
  });
  return application;
};
const preventDoubleApplication = async (user, job) => {
  if (job.length === 0) {
    const application = await prisma.application.findFirst({
      where: { AND: [{ userId: user, jobId: job }] },
    });
    return application;
  }else{

    const application = await prisma.application.findMany({
      orderBy: [
        {
          createdAt: 'desc',
      },
    ],
    where: {
      AND: [
        {
          userId: user,
          jobId: {
            in: job,
          },
        },
      ],
    },
  });
  return application;
}
};

module.exports = {
  createApplications,
  updateApplication,
  updateManyAppications,
  findApplications,
  find_application_status,
  deleteApplication,
  createSingleApplication,
  find_single_Application,
  preventDoubleApplication,
};
