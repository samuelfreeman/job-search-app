const { route } = require("../utils/expressRouter.js");

const authRouter = route;
const user = require("../controller/auth");


authRouter.post("/signUp", user.register);
authRouter.post("/login", user.login);

module.exports = authRouter;
