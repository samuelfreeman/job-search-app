const logger = require('../utils/logger');

const {
  createJob,
  getJobs,
  queryJobs,
  get_single_job,
  removeJob,
  editJob,
} = require('../helpers/jobHelper');

// Controller to add a new job
exports.addJob = async (req, res, next) => {
  try {
    const data = req.body;

    // Create a new job
    const job = await createJob(data);

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
    const jobs = await getJobs();

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
    const jobs = await queryJobs(query);

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
    const job = await get_single_job(id);

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
    const job = await removeJob(id);

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
    const job = await editJob(id,data)

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
