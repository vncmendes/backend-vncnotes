const { Router } = require("express");
const usersRouter  = require("./users.routes");
const sessionsRouter = require("./sessions.route");
const notesRouter = require("./notes.routes");
const tagsRouter = require("./tags.routes");

const routes = Router();

routes.use("/users", usersRouter);
routes.use("/sessions", sessionsRouter);
routes.use("/avatar", usersRouter);
routes.use("/notes", notesRouter);
routes.use("/tags", tagsRouter);

module.exports = routes;