const { Router } = require("express");
const indexRoute = Router();

const adminRouter = require("./admin.js");
const userRouter = require("./user.js");

indexRoute.use("/admin", adminRouter);
indexRoute.use("/user", userRouter);

module.exports = indexRoute;
