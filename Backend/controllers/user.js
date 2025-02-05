const bcrypt = require('../utils/bcrypt');
const logger = require('../utils/logger');
const { checkUserExits } = require('../verification/user');
const jwt = require('../utils/token');
const { checkExits } = require('../verification/user');
const {
  createUser,
  getUsers,
  updateUser,
  deleteUser,
  getSingleUser,
  applyJobs,
  getAppliedJobs,
} = require('../helpers/userHelper');

// Controller to register a new user
exports.register = async (req, res, next) => {
  const data = req.body;
  const checkUserExit = await checkUserExits(data.email);

  if (checkUserExit) {
    logger.error('User has already registered!');
    res.status(400).json({
      message: 'User account Already Exists!',
    });
  } else {
    try {
      //  hash the password
      const hashedPassword = await bcrypt.hash(data.password);
      data.password = hashedPassword;
      // Create a new user

      const user = await createUser(data);

      // Generate JWT token for the user
      const token = await jwt.userSignToken(user.id);

      // Remove password before sending the response
      delete user.password;

      // Respond with success message, user information, and access token
      res.status(201).json({
        Status: 'success',
        user,
        AccessToken: token,
      });
    } catch (error) {
      // Log and pass the error to the next middleware

      logger.error(error);
      next(error);
    }
  }
};

// Controller to log in a user

exports.login = async (req, res, next) => {
  try {
    const data = req.body;

    // Check if the user with the provided email exists
    const exists = await checkExits(data.email);

    if (!exists || exists == null) {
      logger.error('User account not found!');
      return res.status(404).json({
        message: 'User not found!',
      });
    }
    // Compare the provided password with the stored hashed password
    const checkPass = await bcrypt.compare(data.password, exists.password);
    if (!checkPass) {
      logger.error('User Password or Email incorrect!');
      return res.status(422).json({
        message: 'Invalid credentials!',
      });
    }

    // Generate and send an access token upon successful login
    const token = await jwt.userSignToken(exists.id);

    logger.info('User logged in successfully!');

    return res.status(200).json({
      message: 'User successfully logged in!',
      user: exists,
      accessToken: token,
    });
  } catch (error) {
    logger.error(error);
    next(error);
  }
};

// Controller to get a user by ID
exports.getUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Retrieve a user by ID
    const user = await getSingleUser(id);

    // Remove password before sending the response
    delete user.password;

    // Respond with success message and user information
    res.status(200).json({
      status: 'Success',
      user,
    });
  } catch (error) {
    // Log and pass the error to the next middleware

    logger.error(error);
    next();
  }
};

// Controller to get all users
exports.getAllUser = async (req, res, next) => {
  try {
    // Retrieve all users
    const users = await getUsers();
    // Remove password before sending the response

    // Respond with success message and the list of users
    res.status(200).json({
      status: 'Success',
      users,
    });
  } catch (error) {
    // Log and pass the error to the next middleware

    logger.error(error);
    next(error);
  }
};

// Controller to get all applied jobs by a user
exports.getAppliedJobs = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Retrieve all applied jobs by a user
    const applied = await applyJobs(id);

    // Respond with the list of applied jobs
    res.status(200).json({
      appliedJobs: applied,
    });
    
  } catch (error) {
    console.log("error")
    // Log and pass the error to the next middleware
    logger.error(error);
    next(error);
  }
};

// Controller to update a user by ID
exports.updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = req.body;
    if (data.password) {
      const hashedPassword = await bcrypt.hash(data.password);
      data.password = hashedPassword;
    }
    // Find the user by ID
    const user = await getSingleUser(id);

    // Check if the user exists
    if (!user) {
      res.status(400).json({
        error: 'User not found!',
      });
    } else {
      // Update the user with new data
      const updatedUser = await updateUser(id, data);

      // Remove password before sending the response
      delete updatedUser.password;

      // Respond with success message and updated user information
      res.status(200).json({
        status: 'Success',
        user: updatedUser,
      });
    }
  } catch (error) {
    // Log and pass the error to the next middleware

    logger.error(error);
    next(error);
  }
};

// Controller to get all  applications by a user with status
exports.getAllApplicationsByStatus = async (req, res, next) => {
  try {
    const { id, status } = req.params;

    // Retrieve all accepted applications by a user
    const applications = await getAppliedJobs(id, status);

    // Respond with the list of accepted applications
    res.status(200).json({
      applications,
    });
  } catch (error) {
    // Log and pass the error to the next middleware

    logger.error(error);
    next(error);
  }
};

// Controller to delete a user by ID
exports.deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Find the user by ID
    const user = await getSingleUser(id);

    // Check if the user exists
    if (!user) {
      res.status(400).json({
        error: 'User not found!',
      });
    } else {
      // Delete the user by ID
      const deletedUser = await deleteUser(id);

      // Remove password before sending the response
      delete deletedUser.password;

      // Respond with success message and deleted user information
      res.status(200).json({
        status: 'success',
        message: 'User deleted',
        user: deletedUser,
      });
    }
  } catch (error) {
    // Log and pass the error to the next middleware

    logger.error(error);
    next(error);
  }
};
