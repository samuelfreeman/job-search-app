const { Router } = require("express");
const adminRoute = Router();

const user = require("../controllers/admin.js");

adminRoute.post("/signUp", user.register);
adminRoute.post("/login", user.login);
adminRoute.patch("/:id", user.updateAdmin);
adminRoute.delete("/:id", user.deleteAdmin);
adminRoute.get("/", user.getAllAdmins);
adminRoute.get("/:id", user.getAdmin);

module.exports = adminRoute;
