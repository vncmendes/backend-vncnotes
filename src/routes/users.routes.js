const { Router } = require("express");

const UsersController = require("../controllers/UserController.js");

const usersRoutes = Router();

const userController = new UsersController();

usersRoutes.post("/", userController.create);

usersRoutes.get("/", userController.read);

usersRoutes.put("/:id", userController.update);

usersRoutes.delete("/:id", userController.delete);

module.exports = usersRoutes; // type module