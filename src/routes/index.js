const { route } = require("../utils/expressRouter.js");

const indexRoute = route;

const authRouter = require("./auth");

indexRoute.use(authRouter);

module.exports = indexRoute;
