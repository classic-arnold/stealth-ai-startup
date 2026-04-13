const ApiError = require('../utils/ApiError');

const errorHandler = (err, req, res, _next) => {
  let { statusCode, message } = err;

  if (!(err instanceof ApiError)) {
    statusCode = 500;
    message = 'Internal server error';
  }

  console.error(err);

  res.status(statusCode).json({
    error: true,
    message,
  });
};

module.exports = errorHandler;
