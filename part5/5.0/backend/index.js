const mongoose = require('mongoose');
const app = require('./app');
const { PORT } = require('./utils/config');
const logger = require('./utils/logger');

// SERVER ONLINE
app.listen(PORT, () => {
  logger.info(`\nServer running on port ${PORT}`);
});

// close app and mongodb disconnect.
app.on('close', () => {
  mongoose.connection.close().then(() => {
    logger.info('mongodb connection closed');
    process.exit(0);
  });
});
process.on('SIGINT', async () => {
  await mongoose.connection
    .close()
    .then(() => {
      app.close(() => {
        logger.info('Server closed');
      });
      process.exit(0);
    })
    .catch((err) => logger.error(err.message));
});
