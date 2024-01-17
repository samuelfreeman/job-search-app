const { route } = require("../utils/expressRouter.js");

const authRouter = route;
const user = require("../controllers/admin.js");


authRouter.post("/signUp", user.register);
authRouter.post("/login", user.login);

module.exports = authRouter;
