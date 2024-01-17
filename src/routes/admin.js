const { Router } = require("express");
const route = Router();

const authRouter = route;
const user = require("../controllers/admin.js");

authRouter.post("/signUp", user.register);
authRouter.post("/login", user.login);
authRouter.get("/test", (req, res) => {
  res.statusCode(200);
});

module.exports = authRouter;
