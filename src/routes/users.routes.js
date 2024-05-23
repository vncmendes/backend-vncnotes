const { Router } = require("express");
const usersRoutes = Router();

const UsersController = require("../controllers/UserController.js");
const userController = new UsersController();

const ensureAuth = require("../middlewares/ensureAuth.js");

usersRoutes.post("/", userController.create);

usersRoutes.get("/", userController.read);

usersRoutes.put("/", ensureAuth, userController.update);

usersRoutes.delete("/", ensureAuth, userController.delete);

module.exports = usersRoutes; // type module