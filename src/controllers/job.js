const prisma = require('../utils/prisma');
const logger = require('../utils/logger');

// Controller to add a new job
exports.addJob = async (req, res, next) => {
  try {
    const data = req.body;

    // Create a new job
    const job = await prisma.job.create({
      data,
    });

    // Respond with success message and job information
    res.status(200).json({
      status: 'Successful',
      message: 'Job Created',
      job,
    });
  } catch (error) {
    // Log and pass the error to the next middleware
    logger.error(error);

    next(error);
  }
};

// Controller to get all jobs
exports.getAllJobs = async (req, res, next) => {
  try {
    // Retrieve all jobs
    const jobs = await prisma.job.findMany({});

    // Respond with the list of jobs
    res.status(200).json({
      jobs,
    });
  } catch (error) {
    // Log and pass the error to the next middleware
    logger.error(error);

    next(error);
  }
};

// Controller to search for jobs by title or category
exports.getJobs = async (req, res) => {
  try {
    const { query } = req.query;

    // Search for jobs by title or category with an optional query
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

    // Respond with the list of jobs matching the query
    res.status(200).json({ jobs });
  } catch (error) {
    // Log and pass the error to the next middleware
    logger.error(error);

    next(error);
  }
};

// Controller to get a single job by ID
exports.getSingleJob = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Retrieve a single job by ID along with associated applications and users
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

    // Respond with the job information
    res.status(200).json({
      job,
    });
  } catch (error) {
    // Log and pass the error to the next middleware
    logger.error(error);

    next(error);
  }
};

// Controller to delete a job by ID
exports.deleteJob = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Delete the job by ID
    const job = await prisma.job.delete({
      where: {
        id,
      },
    });

    // Respond with success message and deleted job information
    res.status(200).json({
      status: 'Successful',
      message: 'Job deleted',
      job,
    });
  } catch (error) {
    // Log and pass the error to the next middleware
    logger.error(error);

    next(error);
  }
};

// Controller to update a job by ID
exports.updateJob = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = req.body;

    // Update the job by ID with new data
    const job = await prisma.job.update({
      where: {
        id,
      },
      data,
    });

    // Respond with success message and updated job information
    res.status(200).json({
      status: 'Successful',
      message: 'Job Updated',
      job,
    });
  } catch (error) {
    // Log and pass the error to the next middleware
    logger.error(error);

    next(error);
  }
};
