/* eslint-disable */
const { error } = require("./logger");

const errorHandler = (err, req, res, next) => {
  error(err.message);
  if (err.name === "CastError") res.status(400).send({ error: "Invalid ID" });
  else if (err.name === "ValidationError") {
    res.status(400).json({ error: err.message });
  } else if (
    err.name === "MongoServerError" &&
    err.message.includes("E11000 duplicate key error")
  )
    res.status(400).json({ error: "expected `username` to be unique" });
  else if (err.name === "JsonWebTokenError") {
    return res.status(401).json({ error: "token invalid" });
  } else if (err.name === "TokenExpiredError") {
    return res.status(401).json({
      error: "token expired",
    });
  } else res.status(500).json({ error: "Internal server error" });
  // next to other errors middlewares:
  next(err);
};

module.exports = errorHandler;
