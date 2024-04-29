const morgan = require("morgan");
const requestMorgan = () => {
  morgan.token("body", (req) => {
    if (Object.keys(req.body).length) {
      return JSON.stringify(req.body);
    } else return;
  });
  return morgan(":method :url :body");
};

const unknownEndPoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint. 404 NOT FOUND" });
};

module.exports = { unknownEndPoint, requestMorgan };
