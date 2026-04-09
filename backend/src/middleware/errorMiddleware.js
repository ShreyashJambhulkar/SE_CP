export const notFound = (req, res) => {
  res.status(404).json({ message: `Not found: ${req.originalUrl}` });
};

export const errorHandler = (error, req, res, next) => {
  if (res.headersSent) {
    return next(error);
  }
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
  res.status(statusCode).json({
    message: error.message || "Internal server error",
  });
};
