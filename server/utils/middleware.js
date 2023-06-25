const logger = require("./logger");
const ApiError = require("../exeptions/api-error");

exports.unknownEndpoint = (req, res) => {
  res.status(404).send({ error: "Unknown endpoint" });
};

exports.errorHandler = (err, req, res, next) => {
  logger.error(err);

  if (err instanceof ApiError) {
    return res
      .status(err.status)
      .json({ message: err.message, errors: err.errors });
  }

  next(err);
};
