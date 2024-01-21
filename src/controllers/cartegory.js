const prisma = require('../utils/prisma');
const logger = require('../utils/logger');

// Controller to add a new category
exports.addCartegory = async (req, res, next) => {
  try {
    const { jobs } = req.body;

    // Create multiple categories
    const cartegory = await prisma.cartegory.createMany({
      data: jobs,
    });

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

// Controller to get jobs applied by category
exports.jobsAppliedbyCartegory = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Retrieve jobs in a specific category with applied applications
    const jobs = await prisma.job.findMany({
      where: {
        industry: id,
        application: {
          some: {
            status: {
              not: null,
            },
          },
        },
      },
      include: {
        cartegory: true,
        application: true,
      },
    });

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
    const cartegories = await prisma.cartegory.findMany({
      where: {
        name: { contains: query, mode: 'insensitive' },
      },
      include: {
        jobs: true,
      },
    });

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
    const cartegory = await prisma.cartegory.findFirst({
      where: {
        id,
      },
      include: {
        jobs: true,
      },
    });

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
    const cartegory = await prisma.cartegory.delete({
      where: {
        id,
      },
    });

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
    const cartegory = await prisma.cartegory.update({
      where: {
        id,
      },
      data,
    });

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
