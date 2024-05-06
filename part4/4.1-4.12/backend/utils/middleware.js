const morgan = require("morgan");

// MORGAN CONFIGURATION

const requestMorgan = () => {
  morgan.token("body", (req) => {
    if (Object.keys(req.body).length) {
      return JSON.stringify(req.body);
    }
    return null;
  });
  return morgan(":method :url :body");
};

// 404 NOT FOUND
const unknownEndPoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint. 404 NOT FOUND" });
};

const tokenExtractor = (request, response, next) => {
  const authorization = request.get("authorization");
  if (authorization && authorization.startsWith("Bearer ")) {
    request.token = authorization.replace("Bearer ", "");
  }
  next();
};

module.exports = { unknownEndPoint, requestMorgan, tokenExtractor };
