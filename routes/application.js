const { Router } = require('express');
const application = require('../controllers/application');

const applicationRoute = Router();

// applicationRoute.post('/', application.applyJob);
// deactivated this because the bulk can be used to apply for a single job as well
applicationRoute.post('/bulk', application.bulkApplication);
applicationRoute.get('/all-applications', application.getAllApplications);
applicationRoute.get(
  '/all-applications/:status',
  application.applicationStatus,
);
applicationRoute.get('/:id', application.getSingleApplication);
applicationRoute.delete('/:id', application.deleteApplication);

applicationRoute.patch('/bulk/apply', application.updateMultipleApplications);
module.exports = applicationRoute;
