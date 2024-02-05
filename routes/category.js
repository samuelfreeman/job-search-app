const { Router } = require('express');
const cart = require('../controllers/cartegory');

const cartegoryRoute = Router();

cartegoryRoute.post('/bulk', cart.addCartegory);
cartegoryRoute.post('/', cart.addCartegory);
cartegoryRoute.get('/', cart.getAllCartegories);
cartegoryRoute.get('/:id', cart.getSingleCartegory);
cartegoryRoute.delete('/:id', cart.deleteCartegory);
cartegoryRoute.patch('/:id', cart.updateCartegory);
cartegoryRoute.get('/:id/appliedJobs', cart.jobsAppliedbyCartegory);
module.exports = cartegoryRoute;
