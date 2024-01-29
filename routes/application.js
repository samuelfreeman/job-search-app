const { Router } = require('express');
const application = require('../controllers/application');

const applicationRoute = Router();

applicationRoute.post('/', application.applyJob);
applicationRoute.post('/bulk', application.bulkApplication);
applicationRoute.get('/all-applications', application.getAllApplications);
applicationRoute.get(
  '/all-applications/:status',
  application.applicationStatus,
);
applicationRoute.get('/:id', application.getSingleApplication);
applicationRoute.delete('/:id', application.deleteApplication);
applicationRoute.patch('/:id', application.updateApplication);
applicationRoute.patch('/bulk/apply', application.updateMultipleApplications);
module.exports = applicationRoute;
