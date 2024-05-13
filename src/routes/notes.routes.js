const { Router } = require("express");

const NotesController = require("../controllers/NoteController");

const notesRoutes = Router();

const noteController = new NotesController();

notesRoutes.post("/:user_id", noteController.create);

notesRoutes.get("/", noteController.index);
notesRoutes.get("/:id", noteController.read);

notesRoutes.put("/:id", noteController.update);

notesRoutes.delete("/:id", noteController.delete);

module.exports = notesRoutes;