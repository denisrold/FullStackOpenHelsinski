const express = require("express");
const app = express();
require("express-async-errors");
const cors = require("cors");
const loginRouter = require("./controllers/login");
const blogsRouter = require("./controllers/blogs");
const usersRouter = require("./controllers/users");
const {
  requestMorgan,
  unknownEndPoint,
  userExtractor,
} = require("./utils/middleware");
const errorHandler = require("./utils/errorHandler");

// Middlewares
app.use(cors());
app.use(express.json());
if (!process.env.NODE_ENV == "test") app.use(requestMorgan());
app.use("/api/login", loginRouter);
app.use("/api/users", userExtractor, usersRouter);
app.use("/api/blogs", userExtractor, blogsRouter);
app.use(unknownEndPoint);
app.use(errorHandler);

module.exports = app;
