const logger = require('../utils/logger');
const {
  addLocation,
  loadLocations,
  loadLocation,
  updateLocation,
  removeLocation,
} = require('../helpers/location');
//  adding a location
exports.saveLocation = async (req, res, next) => {
  try {
    const data = req.body;
    const location = await addLocation(data);
    res.status(201).json({
      status: 'Location succesfully added!',
      location,
    });
  } catch (error) {
    logger.error(error);
    next(error);
  }
};

// getting all locations
exports.getLocations = async (req, res, next) => {
  try {
    const locations = await loadLocations();
    res.status(200).json({
      locations,
    });
  } catch (error) {
    logger.error(error);
    next(error);
  }
};
exports.getSingleLocation = async (req, res, next) => {
  try {
    const location = await loadLocation();
    res.status(200).json({
      location,
    });
  } catch (error) {
    logger.error(error);
    next(error);
  }
};
exports.editLocation = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const location = await updateLocation(id, data);
    res.status(200).json({
      message: 'Location edited',
      location,
    });
  } catch (error) {
    logger.error(error);
    next(error);
  }
};

exports.deleteLocation = async (req, res, next) => {
  try {
    const { id } = req.params;
    const location = await removeLocation(id);
    res.status(200).json({
      location,
    });
  } catch (error) {
    logger.error(error);
    next(error);
  }
};
