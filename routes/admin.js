const { Router } = require('express');

const adminRoute = Router();
const { validationError } = require('../validation/validationError');
const validation = require('../validation/admin');

const validate = [...validation, validationError];
const user = require('../controllers/admin');
const verify = require('../utils/token');

const authenticate = [verify.verifyToken];
adminRoute.post('/signUp', validate, user.register);
adminRoute.post('/login', user.login);
adminRoute.patch('/:id', authenticate, user.updateAdmin);
adminRoute.delete('/:id', authenticate, user.deleteAdmin);
adminRoute.get('/', authenticate, user.loadAdmins);
adminRoute.get('/:id', authenticate, user.getAdmin);

module.exports = adminRoute;
