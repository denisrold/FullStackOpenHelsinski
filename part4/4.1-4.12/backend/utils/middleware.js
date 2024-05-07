const morgan = require("morgan");
const jwt = require("jsonwebtoken");

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

const userExtractor = (request, response, next) => {
  const authorization = request.get("authorization");
  if (authorization && authorization.startsWith("Bearer ")) {
    request.token = authorization.replace("Bearer ", "");
    const userToken = jwt.verify(request.token, process.env.SECRET);
    request.user = userToken;
  }
  next();
};

module.exports = { unknownEndPoint, requestMorgan, userExtractor };
