const prisma = require('../utils/prisma');
const bcrypt = require('../utils/bcrypt');
const logger = require('../utils/logger');
const { checkAdminExists, checkExits } = require('../verification/user');
const jwt = require('../utils/token');
const {
  createAdmin,
  getAdmin,
  getAllAdmins,
  updateAdmin,
} = require('../helpers/adminHelper');
// Register a new admin
exports.register = async (req, res, next) => {
  const data = req.body;

  // Check if the user with the provided email already exists
  const checkUserExists = await checkAdminExists(data.email);

  if (checkUserExists) {
    logger.error('User has already registered!');
    return res.status(400).json({
      message: 'User account already exists!',
    });
  }

  try {
    // Hash the user's password before storing it
    data.password = await bcrypt.hash(data.password);
    const admin = await createAdmin(data);

    logger.info('User registered successfully!');

    // Generate and send an access token along with the user information
    const token = await jwt.signToken(admin.id);
    delete admin.password;

    res.status(201).json({
      status: 'success',
      admin,
      accessToken: token,
    });
  } catch (error) {
    logger.error(error);
    next(error);
  }
};

// Login an admin
exports.login = async (req, res, next) => {
  try {
    const data = req.body;

    // Check if the user with the provided email exists
    const exists = await checkExits(data.email);

    console.log(exists)
    if (!exists || exists == null) {
      logger.error('User account not found!');
      return res.status(404).json({
        message: 'User not found!',
      });
    } else {
      // Compare the provided password with the stored hashed password
      const checkPass = await bcrypt.compare(
        data.password,
        exists.user.password,
      );

      if (!checkPass) {
        logger.error('User Password or Email incorrect!');
        return res.status(422).json({
          message: 'Invalid credentials!',
        });
      }

      // Generate and send an access token upon successful login
      const token = await jwt.signToken(exists.user.id);

      logger.info('User logged in successfully!');

      res.status(200).json({
        message: 'User successfully logged in!',
        user: exists.user,
        role: exists.role,
        accessToken: token,
      });
    }
  } catch (error) {
    logger.error(error);
    next(error);
  }
};

// Get a specific admin by ID
exports.getAdmin = async (req, res, next) => {
  try {
    const { id } = req.params;
    const admin = await getAdmin(id);
    // Omit the password from the response
    if (admin) {
      delete admin.password;

      res.status(200).json({
        status: 'success',
        admin,
      });
    } else {
      throw new Error('Admin not found!');
    }
  } catch (error) {
    logger.error(error);
    next(error);
  }
};

// Get all admins
exports.loadAdmins = async (req, res, next) => {
  try {
    const admins = await getAllAdmins();
    // Omit the password from each admin's response
    admins.forEach((admins) => delete admins.password);

    res.status(200).json({
      status: 'success',
      admins,
    });
  } catch (error) {
    logger.error(error);
    next(error);
  }
};

// Update an admin
exports.updateAdmin = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = req.body;

    // Hash the new password before updating
    data.password = await bcrypt.hash(data.password);

    const existingAdmin = await prisma.admin.findFirst({ where: { id } });

    if (!existingAdmin) {
      return res.status(404).json({
        error: 'Admin not found!',
      });
    }

    // Update the admin information
    const updatedAdmin = await updateAdmin(id, data);

    // Omit the password from the response
    delete updatedAdmin.password;

    res.status(200).json({
      status: 'success',
      admin: updatedAdmin,
    });
  } catch (error) {
    logger.error(error);
    next(error);
  }
};

// Delete an admin
exports.deleteAdmin = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedAdmin = await prisma.admin.delete({ where: { id } });

    // Omit the password from the response
    if (deletedAdmin) delete deletedAdmin.password;

    res.status(200).json({
      status: 'success',
      message: 'Admin deleted',
      admin: deletedAdmin,
    });
  } catch (error) {
    logger.error(error);
    next(error);
  }
};
