const { Router } = require('express');

const indexRoute = Router();

const userRouter = require('./user');
const cartegory = require('./category');
const job = require('./job');
const application = require('./application');
const location = require('./location');

indexRoute.use('/user', userRouter);
indexRoute.use('/cartegory', cartegory);
indexRoute.use('/job', job);
indexRoute.use('/application', application);
indexRoute.use('/location', location);

module.exports = indexRoute;
