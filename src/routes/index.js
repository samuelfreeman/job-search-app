const { Router } = require("express");
const indexRoute = Router();

const authRouter = require("./admin.js");

indexRoute.use("/admin", authRouter);

module.exports = indexRoute;
