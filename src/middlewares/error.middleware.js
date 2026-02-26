const errorMiddleware = (err, req, res, next) => {
  console.error('Error:', err.message);

  const status = err.status || 500;
  const mensaje = err.message || 'Error interno del servidor';

  res.status(status).json({
    error: true,
    mensaje,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
};

module.exports = errorMiddleware;