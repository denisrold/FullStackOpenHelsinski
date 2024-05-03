const { error } = require("./logger");

const errorHandler = (err, req, res, next) => {
  error(err.message);
  if (err.name === "CastError") {
    res.status(400).send({ error: "Invalid ID" });
  } else if (err.name === "ValidationError") {
    res.status(400).json({ error: err.message });
  } else {
    res.status(500).json({ error: "Internal server error" });
  }
  if (err.name === "CastError")
    // next to other errors middlewares:
    next(err);
};

module.exports = errorHandler;
