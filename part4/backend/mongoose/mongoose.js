const mongoose = require("mongoose");
const config = require("../utils/config");
const logger = require("../utils/logger");

mongoose.set("strictQuery", false);

const mongooseConection = () => {
  return mongoose
    .connect(config.MONGODB_URI)
    .then((res) => {
      logger.info("Connected to MongoDB.\n");
    })
    .catch((error) => {
      logger.error("error connecting to MongoDB:", error.message);
    });
};

module.exports = mongooseConection;
