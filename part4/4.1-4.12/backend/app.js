const express = require("express");
const app = express();
require("express-async-errors");
const cors = require("cors");
const blogsRouter = require("./controllers/blogs");
const { requestMorgan, unknownEndPoint } = require("./utils/middleware");
const errorHandler = require("./utils/errorHandler");

// Middlewares
app.use(cors());
app.use(express.json());
app.use(requestMorgan());
app.use("/api/blogs", blogsRouter);
app.use(unknownEndPoint);
app.use(errorHandler);

module.exports = app;
