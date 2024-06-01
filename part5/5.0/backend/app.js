const express = require("express");
const app = express();
require("express-async-errors");
const loginRouter = require("./controllers/login");
const notesRouter = require("./controllers/notes");
const usersRouter = require("./controllers/users");
const cors = require("cors");
const errorHandler = require("./utils/errorHandler");
const {
  unknownEndPoint,
  requestMorgan,
  userExtractor,
} = require("./utils/middleware");

//MIDDLERWAREs
app.use(express.static("dist"));
app.use(cors());
app.use(express.json());
//morgan configuration
if (!process.env.NOTE_ENV == "test") app.use(requestMorgan());
// app.use(tokenExtractor);
//router
app.use("/api/login", loginRouter);
app.use("/api/notes", userExtractor, notesRouter);
app.use("/api/users", userExtractor, usersRouter);
if (process.env.NODE_ENV === "test") {
  const testingRouter = require("./controllers/testing");
  app.use("/api/testing", testingRouter);
}
//MIDDLEWARE 404 NOT FOUND / ERRORSHANDLER
app.use(unknownEndPoint);
//errors configuration
app.use(errorHandler);

module.exports = app;
