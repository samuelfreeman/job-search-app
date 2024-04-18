const logger = require('../utils/logger');
const {
  createApplications,
  updateApplication,
  updateManyAppications,
  findApplications,
  find_application_status,
  deleteApplication,
  createSingleApplication,
  find_single_Application,
  preventDoubleApplication,
  updateOneApplication,
} = require('../helpers/applicationHelper');

// Controller to apply for a single job
exports.applyJob = async (req, res, next) => {
  try {
    const data = req.body;
    data.status = 'Submitted';
    /* error handler to prevent double application
     we want to make sure the user doesnt apply for the same job more than once */
    const check = await preventDoubleApplication(data.userId, data.jobId);
    console.log(check);
    if (check) {
      throw new Error('User has already applied for the same job!');
    }
    // Create a new application for the job
    const application = await createSingleApplication(data);
    // Respond with success message and application information
    res.status(200).json({
      status: 'Successful',
      message: 'Application Created',
      applicationInfo: application,
    });
  } catch (error) {
    // Log and pass the error to the next middleware
    // logger.error(error);

    next(error);
  }
};

// Controller to apply for multiple jobs in bulk
exports.bulkApplication = async (req, res, next) => {
  try {
    const { userId, jobIds } = req.body;
    // error handler to prevent double application
    const check = await preventDoubleApplication(userId, jobIds);

    if (check.length !== 0) {
      throw new Error('User has already applied for the same job!');
    }
    // Create multiple applications for the specified jobs
    const applications = jobIds.map((jobId) => ({
      userId,
      status: 'Submitted',
      jobId,
    }));
    const appliedJobs = await createApplications(applications);
    // Respond with success message and applied jobs information
    res.status(200).json({
      message: 'Applications submitted successfully',
      appliedJobs,
    });
  } catch (error) {
    // Log and pass the error to the next middleware
    logger.error(error);
    console.log(error);

    next(error);
  }
};
exports.updateMultipleApplications = async (req, res, next) => {
  try {
    const { applicationId, status } = req.body;

    const updatedApplication = await updateOneApplication(applicationId, status);
console.log(updateApplication)
    // Respond with success message and updated applications information
    res.status(200).json({
      status: 'Successful',
      message: 'Application Updated',
      updatedApplication,
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
    const applications = await findApplications();

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
    const application = await find_application_status(status);

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
    const application = await find_single_Application(id);

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
    const application = await deleteApplication(id);

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
    const application = await updateApplication(id, data);

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
    const application = await updateApplication(id, data);

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

//  might not need this functionality

/* Controller to update multiple  applications  by thier ids
exports.updateApplication = async (req, res, next) => {
  try {
    const { applicationIds, ...rest } = req.body;

    // Update the application by ID with new data
    const application = await

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
}; */
