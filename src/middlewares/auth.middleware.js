const { verificarToken } = require('../utils/auth');

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

  if (!token) {
    return res.status(401).json({
      error: true,
      mensaje: 'Acceso denegado. Token no proporcionado.'
    });
  }

  try {
    const decoded = verificarToken(token);
    req.usuario = decoded;
    next();
  } catch (err) {
    return res.status(401).json({
      error: true,
      mensaje: 'Token inválido o expirado.'
    });
  }
};

const soloAdmin = (req, res, next) => {
  if (req.usuario?.rol !== 'admin') {
    return res.status(403).json({
      error: true,
      mensaje: 'Acceso denegado. Se requiere rol de administrador.'
    });
  }
  next();
};

module.exports = { authMiddleware, soloAdmin };