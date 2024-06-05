const { Router } = require("express");
const usersRoutes = Router();

const UsersController = require("../controllers/UserController");
const userController = new UsersController();

const UserAvatarController = require("../controllers/UserAvatarController");
const userAvatarController = new UserAvatarController();

const multer = require("multer");

const ensureAuthentication = require("../middlewares/ensureAuthentication");

const uploadConfig = require("../config/upload");
const upload = multer(uploadConfig.MULTER);

usersRoutes.post("/", userController.create);

usersRoutes.get("/", userController.read);

usersRoutes.put("/", ensureAuthentication, userController.update);

usersRoutes.patch("/avatar", ensureAuthentication, upload.single("avatar"), userAvatarController.update);

usersRoutes.delete("/", ensureAuthentication, userController.delete);

module.exports = usersRoutes; // type module