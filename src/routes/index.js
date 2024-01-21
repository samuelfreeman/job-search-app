const { Router } = require('express');

const indexRoute = Router();

const adminRouter = require('./admin');
const userRouter = require('./user');
const cartegory = require('./category');
const job = require('./job');
const application = require('./application');

indexRoute.use('/admin', adminRouter);
indexRoute.use('/user', userRouter);
indexRoute.use('/cartegory', cartegory);
indexRoute.use('/job', job);
indexRoute.use('/application', application);

module.exports = indexRoute;
