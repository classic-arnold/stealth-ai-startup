const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const v1Routes = require('./routes/v1');
const errorHandler = require('./middlewares/error');
const ApiError = require('./utils/ApiError');

const app = express();

app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
app.use(express.json({ limit: '1mb' }));

app.use('/v1', v1Routes);

// Health check
app.get('/health', (req, res) => res.json({ status: 'ok' }));

// 404 handler
app.use((req, res, next) => {
  next(new ApiError(404, 'Not found'));
});

app.use(errorHandler);

module.exports = app;
