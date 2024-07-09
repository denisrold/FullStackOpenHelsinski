const mongoose = require('mongoose');
const { MONGODB_URI } = require('../utils/config');
const { info, error } = require('../utils/logger');

mongoose.set('strictQuery', false);

const mongoDBConection = () => {
  const mongoUrl = MONGODB_URI;
  mongoose
    .connect(mongoUrl)
    .then(() => {
      info('MONGODB CONNECTION - OK');
    })
    .catch((err) => {
      error(err.message);
    });
};

module.exports = mongoDBConection;
