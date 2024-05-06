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
  tokenExtractor,
} = require("./utils/middleware");
const errorHandler = require("./utils/errorHandler");

// Middlewares
app.use(cors());
app.use(express.json());
if (!process.env.NODE_ENV == "test") app.use(requestMorgan());
app.use(tokenExtractor);
app.use("/api/login", loginRouter);
app.use("/api/users", usersRouter);
app.use("/api/blogs", blogsRouter);
app.use(unknownEndPoint);
app.use(errorHandler);

module.exports = app;
