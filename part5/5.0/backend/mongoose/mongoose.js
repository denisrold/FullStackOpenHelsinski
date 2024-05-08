const mongoose = require("mongoose");
const { MONGODB_URI } = require("../utils/config");
const { info, error } = require("../utils/logger");

mongoose.set("strictQuery", false);

const mongooseConection = () => {
  mongoose
    .connect(MONGODB_URI)
    .then(() => {
      info("Connected to MongoDB.\n");
    })
    .catch((err) => {
      error("error connecting to MongoDB:", err.message);
    });
};

module.exports = mongooseConection;
