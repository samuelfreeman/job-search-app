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
      data,
    },
  });
  return application;
};
const find_single_Application = async (id) => {
  const application = await prisma.user.findFirst({
    where: {
      id,
    },
  });
  return application;
};
const findApplications = async () => {
  const application = await prisma.application.findMany({});
  return application;
};
const find_application_status = async (status) => {
  const application = await prisma.application.findMany({
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
    return (application = await prisma.application.findFirst({
      where: { AND: [{ userId: user, jobId: job }] },
    }));
  } else {
    return (application = await prisma.application.findMany({
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
    }));
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
