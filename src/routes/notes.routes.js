const { Router } = require("express");
const notesRoutes = Router();

const NotesController = require("../controllers/NoteController");
const ensureAuthentication = require("../middlewares/ensureAuthentication");
const noteController = new NotesController();

notesRoutes.use(ensureAuthentication);

notesRoutes.post("/", noteController.create);

notesRoutes.get("/", noteController.index);
notesRoutes.get("/", noteController.read);

notesRoutes.put("/:id", noteController.update);

notesRoutes.delete("/:id", noteController.delete);

module.exports = notesRoutes;