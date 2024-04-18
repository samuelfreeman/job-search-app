const { Router } = require('express');

const userRoute = Router();
const { validationError } = require('../validation/validationError');
const validation = require('../validation/user');

const validate = [...validation, validationError];
const user = require('../controllers/user');
const verify = require('../utils/token');

const authenticate = [verify.verifyUserToken];
userRoute.post('/signUp', validate, user.register);
userRoute.post('/login', user.login);
userRoute.patch('/:id', authenticate, user.updateUser);
userRoute.delete('/:id', authenticate, user.deleteUser);
userRoute.get('/:id', authenticate, user.getUser);
userRoute.get('/', authenticate, user.getAllUser);
userRoute.get('/:id/appliedJobs',  user.getAppliedJobs);
userRoute.get('/:id/applications/:status', authenticate, user.getAllApplicationsByStatus);

module.exports = userRoute;
