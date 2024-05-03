const express = require("express");
const app = express();
require("express-async-errors");
const notesRouter = require("./controllers/notes");
const cors = require("cors");
const errorHandler = require("./utils/errorHandler");
const { unknownEndPoint, requestMorgan } = require("./utils/middleware");

//MIDDLERWARES
app.use(express.static("dist"));
app.use(cors());
app.use(express.json());
//morgan configuration
if (!process.env.NOTE_ENV == "test") app.use(requestMorgan());
//router
app.use("/api/notes", notesRouter);
//MIDDLEWARE 404 NOT FOUND / ERRORSHANDLER
app.use(unknownEndPoint);
//errors configuration
app.use(errorHandler);

module.exports = app;
