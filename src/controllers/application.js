const prisma = require('../utils/prisma');
const logger = require('../utils/logger');
// we want to make sure the user doesnt apply for the same job more than once
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

// Controller to apply for a single job
exports.applyJob = async (req, res, next) => {
  try {
    const data = req.body;
    data.status = 'Submitted';
    // error handler to prevent double application
    const check = await preventDoubleApplication(data.userId, data.jobId);
    if (check) {
      throw new Error('User has already applied for the same job!');
    }
    // Create a new application for the job
    const application = await prisma.application.create({
      data,
    });

    // Respond with success message and application information
    res.status(200).json({
      status: 'Successful',
      message: 'Application Created',
      applicationInfo: application,
    });
  } catch (error) {
    // Log and pass the error to the next middleware
    logger.error(error);

    next(error);
  }
};

// Controller to apply for multiple jobs in bulk
exports.bulkApplication = async (req, res, next) => {
  try {
    const { userId, jobIds } = req.body;
    // error handler to prevent double application
    const check = await preventDoubleApplication(userId, jobIds);
    if (check) {
      throw new Error('User has already applied for the same job!');
    }
    // Create multiple applications for the specified jobs
    const applications = jobIds.map((jobId) => ({
      userId,
      status: 'Submitted',
      jobId,
    }));
    const appliedJobs = await prisma.application.createMany({
      data: applications,
    });

    // Respond with success message and applied jobs information
    res.status(200).json({
      message: 'Applications submitted successfully',
      appliedJobs,
    });
  } catch (error) {
    // Log and pass the error to the next middleware
    logger.error(error);

    next(error);
  }
};
exports.updateMultipleApplications = async (req, res, next) => {
  try {
    const { applicationIds, ...rest } = req.body;

    const updatedApplications = await prisma.application.updateMany({
      where: {
        id: {
          in: applicationIds,
        },
      },
      data: rest,
    });

    // Respond with success message and updated applications information
    res.status(200).json({
      status: 'Successful',
      message: 'Applications Updated',
      updatedApplications,
    });
  } catch (error) {
    // Log and pass the error to the next middleware
    logger.error(error);

    next(error);
  }
};

// Controller to get all applications
exports.getAllApplications = async (req, res, next) => {
  try {
    // Retrieve all applications
    const applications = await prisma.application.findMany({});

    // Respond with the list of applications
    res.status(200).json({
      applications,
    });
  } catch (error) {
    // Log and pass the error to the next middleware
    logger.error(error);

    next(error);
  }
};

// Controller to get all  applications by status
exports.applicationStatus = async (req, res, next) => {
  const { status } = req.params;
  try {
    // Retrieve applications with status  and include user information
    const application = await prisma.application.findMany({
      where: {
        status,
      },
      include: {
        user: true,
      },
    });

    // Respond with the list of declined applications
    res.status(200).json({
      application,
    });
  } catch (error) {
    // Log and pass the error to the next middleware
    logger.error(error);

    next(error);
  }
};

// Controller to get a single application by ID
exports.getSingleApplication = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Retrieve a single application by ID
    const application = await prisma.application.findFirst({
      where: {
        id,
      },
    });

    // Respond with the application information
    res.status(200).json({
      application,
    });
  } catch (error) {
    // Log and pass the error to the next middleware
    logger.error(error);

    next(error);
  }
};

// Controller to delete an application by ID
exports.deleteApplication = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Delete the application by ID
    const application = await prisma.application.delete({
      where: {
        id,
      },
    });

    // Respond with success message and deleted application information
    res.status(200).json({
      status: 'Successful',
      message: 'Application deleted',
      application,
    });
  } catch (error) {
    // Log and pass the error to the next middleware
    logger.error(error);

    next(error);
  }
};

// Controller to accept an application by ID
exports.acceptApplication = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = req.body;

    // Update the application by ID with new data
    const application = await prisma.application.update({
      where: {
        id,
      },
      data,
    });

    // Respond with success message and updated application information
    res.status(200).json({
      status: 'Successful',
      application,
    });
  } catch (error) {
    // Log and pass the error to the next middleware
    logger.error(error);

    next(error);
  }
};

// Controller to decline an application by ID
exports.declineApplication = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = req.body;

    // Update the application by ID with new data
    const application = await prisma.application.update({
      where: {
        id,
      },
      data,
    });

    // Respond with success message and updated application information
    res.status(200).json({
      status: 'Successful',
      application,
    });
  } catch (error) {
    // Log and pass the error to the next middleware
    logger.error(error);

    next(error);
  }
};

// Controller to update an application by ID
exports.updateApplication = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { applicationIds, ...rest } = req.body;

    // Update the application by ID with new data
    const application = await prisma.application.update({
      where: {
        id,
      },
      data: rest,
    });

    // Respond with success message and updated application information
    res.status(200).json({
      status: 'Successful',
      message: 'Application Updated',
      application,
    });
  } catch (error) {
    // Log and pass the error to the next middleware
    logger.error(error);

    next(error);
  }
};
