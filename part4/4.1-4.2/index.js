const express = require('express');

const app = express();
const cors = require('cors');
const blogsRouter = require('./controllers/blogs');
const { requestMorgan, unknownEndPoint } = require('./utils/middleware');
const errorHandler = require('./utils/errorHandler');
const { PORT } = require('./utils/config');
const { info } = require('./utils/logger');
// Middlewares
app.use(cors());
app.use(express.json());
app.use(requestMorgan());
app.use('/api/blogs', blogsRouter);
app.use(unknownEndPoint);
app.use(errorHandler);

app.listen(PORT, () => {
  info(`Server running on port ${PORT}`);
});
