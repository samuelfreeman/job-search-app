const { Router } = require('express');
const job = require('../controllers/job');

const jobRoute = Router();

jobRoute.post('/', job.addJob);
jobRoute.get('/', job.getAllJobs);
jobRoute.get('/search-job', job.getJobs);
jobRoute.get('/:id', job.getSingleJob);
jobRoute.delete('/:id', job.deleteJob);
jobRoute.patch('/:id', job.updateJob);

module.exports = jobRoute;
