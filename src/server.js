const express = require("express");
require ("express-async-errors"); // needed to work with async errors.
const appError = require("./utils/appError.js");
const uploadConfig = require("./config/upload");
const routes = require("./routes/index.js");
const migrationRun = require("./database/sqlite/migrations");
const cors = require("cors");

const server = express();

server.use(cors());

server.use(express.json()); // defines the method sended on request: JSON.

server.use(routes); // call routes.

server.use("/files", express.static(uploadConfig.UPLOADS_FOLDER));

migrationRun();

server.use(( error, req, res, next) => {
  if (error instanceof appError) {
    return res.status(error.statusCode).json({
      status: "Error",
      message: error.message
    })
  }
  
  console.error(error);
  
  return res.status(500).json({
    status: "Error",
    message: "Internal Server Error"
  });
});


const PORT = 3333;
server.listen(PORT, () => { console.log(`HTTP Server is Running on PORT: ${PORT}`) });