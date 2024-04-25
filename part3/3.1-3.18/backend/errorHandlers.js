const errorHandler = (error, request, response, next) => {
  console.error(error.message);
  if (error.name === "CastError") {
    return response.status(404).send({ error: "malformatted id" });
  } else {
    response.status(500).json({ error: "Internal server error" });
  }
  next(error);
};

module.exports = errorHandler;
