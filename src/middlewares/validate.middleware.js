const validarMiembro = (req, res, next) => {
  const { nombre, membresia, meses, precio } = req.body;

  if (!nombre || nombre.trim() === '') {
    return res.status(400).json({ error: true, mensaje: 'El nombre es obligatorio.' });
  }
  if (!membresia || !['Basica', 'Premium'].includes(membresia)) {
    return res.status(400).json({ error: true, mensaje: 'La membresía debe ser Basica o Premium.' });
  }
  if (!meses || isNaN(meses) || meses < 1) {
    return res.status(400).json({ error: true, mensaje: 'Los meses deben ser un número mayor a 0.' });
  }
  if (precio === undefined || isNaN(precio) || precio < 0) {
    return res.status(400).json({ error: true, mensaje: 'El precio debe ser un número válido.' });
  }

  next();
};

const validarUsuario = (req, res, next) => {
  const { nombre, email, password } = req.body;

  if (!nombre || nombre.trim() === '') {
    return res.status(400).json({ error: true, mensaje: 'El nombre es obligatorio.' });
  }
  if (!email || !email.includes('@')) {
    return res.status(400).json({ error: true, mensaje: 'El email no es válido.' });
  }
  if (!password || password.length < 6) {
    return res.status(400).json({ error: true, mensaje: 'La contraseña debe tener al menos 6 caracteres.' });
  }

  next();
};

const validarLogin = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !email.includes('@')) {
    return res.status(400).json({ error: true, mensaje: 'El email no es válido.' });
  }
  if (!password || password.length < 1) {
    return res.status(400).json({ error: true, mensaje: 'La contraseña es obligatoria.' });
  }

  next();
};

module.exports = { validarMiembro, validarUsuario, validarLogin };