const logger = require('../utils/logger');
const {
  createCartegories,
  findCartegories,
  queryCartegories,
  singleCartegory,
  delCartegory,
  editCartegory,
  createSingleCategory,
} = require('../helpers/cartegoryHelper');

// Controller to add a new category
exports.addCartegories = async (req, res, next) => {
  try {
    const { jobs } = req.body;
    // Create multiple categories
    const cartegory = await createCartegories(jobs);

    // Respond with success message and category information
    res.status(200).json({
      status: 'Successful',
      message: 'Category Created',
      cartegory,
    });
  } catch (error) {
    // Log and pass the error to the next middleware
    logger.error(error);

    next(error);
  }
};
exports.addCartegory = async (req, res, next) => {
  try {
    const data = req.body;
    const checkCartegory = await queryCartegories(data.name);
    if (checkCartegory.length > 0) {
      logger.error('cartegory has already been created!');
      res.status(400).json({
        message: 'cartegory has already been created',
      });
    } else {
      const cartegory = await createSingleCategory(data);
      res.status(201).json({
        status: 'success',
        message: 'Cartegory  successfully created!',
        cartegory,
      });
    }
  } catch (error) {
    logger.error(error);
    next(error);
  }
};
// Controller to get jobs applied by category
exports.jobsAppliedbyCartegory = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Retrieve jobs in a specific category with applied applications
    const jobs = await findCartegories(id);

    // Respond with the list of jobs in the category with applied applications
    res.status(200).json({
      AppliedJobs: jobs,
    });
  } catch (error) {
    // Log and pass the error to the next middleware
    logger.error(error);

    next(error);
  }
};

// Controller to get all categories with optional search query
exports.getAllCartegories = async (req, res, next) => {
  try {
    const { query } = req.query;

    // Retrieve categories with an optional search query
    const cartegories = await queryCartegories(query);

    // Respond with the list of categories
    res.status(200).json({
      JobCartegories: cartegories,
    });
  } catch (error) {
    // Log and pass the error to the next middleware
    logger.error(error);

    next(error);
  }
};

// Controller to get a single category by ID
exports.getSingleCartegory = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Retrieve a single category by ID
    const cartegory = await singleCartegory(id);

    // Respond with the category information
    res.status(200).json({
      JobCartegories: cartegory,
    });
  } catch (error) {
    // Log and pass the error to the next middleware
    logger.error(error);

    next(error);
  }
};

// Controller to delete a category by ID
exports.deleteCartegory = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Delete the category by ID
    const cartegory = await delCartegory(id);

    // Respond with success message and deleted category information
    res.status(200).json({
      status: 'Successful',
      message: 'Category deleted',
      JobCartegories: cartegory,
    });
  } catch (error) {
    // Log and pass the error to the next middleware
    logger.error(error);

    next(error);
  }
};

// Controller to update a category by ID
exports.updateCartegory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = req.body;

    // Update the category by ID with new data
    const cartegory = await editCartegory(id, data);

    // Respond with success message and updated category information
    res.status(200).json({
      status: 'Successful',
      message: 'Category Updated',
      JobCartegories: cartegory,
    });
  } catch (error) {
    // Log and pass the error to the next middleware
    logger.error(error);

    next(error);
  }
};
