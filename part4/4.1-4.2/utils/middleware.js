const morgan = require('morgan');

// MORGAN CONFIGURATION

const requestMorgan = () => {
  morgan.token('body', (req) => {
    if (Object.keys(req.body).length) {
      return JSON.stringify(req.body);
    }
    return null;
  });
  return morgan(':method :url :body');
};

// 404 NOT FOUND
const unknownEndPoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint. 404 NOT FOUND' });
};

module.exports = { unknownEndPoint, requestMorgan };
