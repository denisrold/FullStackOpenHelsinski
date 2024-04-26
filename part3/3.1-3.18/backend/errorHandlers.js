const errorHandler = (error, request, response, next) => {
  console.error(error.message);
  if (error.name === "CastError")
    response.status(404).send({ error: "malformatted id" });
  else if (error.name === "ValidationError")
    response.status(400).json({ error: error.message });
  else response.status(500).json({ error: "Internal server error" });

  //next to another error handlers.
  //next(error);
};

module.exports = errorHandler;
