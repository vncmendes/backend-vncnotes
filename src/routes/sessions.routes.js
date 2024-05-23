const { Router } = require("express");
const sessionsRoute = Router();

const SessionsController = require("../controllers/SessionsController");
const sessionsController = new SessionsController();

sessionsRoute.post("/", sessionsController.create);

module.exports = sessionsRoute;