const { route } = require("../utils/expressRouter.js");

const indexRoute = route;

const authRouter = require("./admin.js");

indexRoute.use(authRouter);

module.exports = indexRoute;
