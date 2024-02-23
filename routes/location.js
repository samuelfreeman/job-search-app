const { Router } = require('express');
const location = require('../controllers/locations');

const jobRoute = Router();

jobRoute.post('/', location.saveLocation);
jobRoute.get('/', location.getLocations);

jobRoute.get('/:id', location.getSingleLocation);
jobRoute.delete('/:id', location.deleteLocation);
jobRoute.patch('/:id', location.editLocation);

module.exports = jobRoute;
