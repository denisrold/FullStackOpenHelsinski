const express = require("express");
const app = express();
const notesRouter = require("./controllers/notes");
const cors = require("cors");
const mongoose = require("mongoose");
const errorHandler = require("./utils/errorHandler");
const { unknownEndPoint, requestMorgan } = require("./utils/middleware");
const config = require("./utils/config");
const logger = require("./utils/logger");

//MIDDLERWARES
app.use(express.static("dist"));
app.use(cors());
app.use(express.json());
//morgan configuration
app.use(requestMorgan());
//router
app.use("/api/notes", notesRouter);
//MIDDLEWARE 404 NOT FOUND / ERRORSHANDLER
app.use(unknownEndPoint);
//errors configuration
app.use(errorHandler);

//SERVER ONLINE
app.listen(config.PORT, () => {
  logger.info(`\nServer running on port ${config.PORT}`);
});

//close app and mongodb disconnect.
app.on("close", () => {
  mongoose.connection.close().then(() => {
    logger.info("mongodb connection closed");
    process.exit(0);
  });
});
process.on("SIGTERM", async () => {
  await mongoose.connection
    .close()
    .then(() => {
      app.close(() => {
        logger.info("Server closed");
      });
      process.exit(0);
    })
    .catch((err) => logger.error(err.message));
});
