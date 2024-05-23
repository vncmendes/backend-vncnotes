const { Router } = require("express");
const tagsRoutes = Router();

const TagsController = require("../controllers/TagsController");
const tagController = new TagsController(); 

tagsRoutes.get("/", tagController.read);
tagsRoutes.get("/:user_id", tagController.index);

module.exports = tagsRoutes;