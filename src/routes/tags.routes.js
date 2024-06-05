const { Router } = require("express");
const tagsRoutes = Router();

const TagsController = require("../controllers/TagsController");
const ensureAuthentication = require("../middlewares/ensureAuthentication");
const tagController = new TagsController(); 

tagsRoutes.use(ensureAuthentication);

tagsRoutes.get("/", tagController.read);
tagsRoutes.get("/", tagController.index);

module.exports = tagsRoutes;