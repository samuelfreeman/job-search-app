const { Router } = require("express");
const userRoute = Router();

const user = require("../controllers/user");

userRoute.post("/signUp", user.register);
userRoute.post("/login", user.login);
userRoute.patch("/:id", user.updateUser);
userRoute.delete("/:id", user.deleteUser);
userRoute.get("/", user.getAllUser);
userRoute.get("/:id", user.getUser);

module.exports = userRoute;
