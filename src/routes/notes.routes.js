const { Router } = require("express");
const notesRoutes = Router();

const NotesController = require("../controllers/NoteController");
const noteController = new NotesController();

const ensureAuth = require("../middlewares/ensureAuth");

notesRoutes.post("/", ensureAuth, noteController.create);

notesRoutes.get("/", noteController.index);
notesRoutes.get("/:id", noteController.read);

notesRoutes.put("/:id", noteController.update);

notesRoutes.delete("/:id", noteController.delete);

module.exports = notesRoutes;