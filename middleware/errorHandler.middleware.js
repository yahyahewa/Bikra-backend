export const errorHandler = (err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Something went wrong";
  const errorCode = err.errorCode || 0;
  res.status(status).json({
    status,
    data: {
      message,
      error: errorCode,
    },
  });
};
