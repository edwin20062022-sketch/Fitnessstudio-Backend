const usersRepo = require('../repositories/users.repository');
const { generarToken } = require('../utils/auth');

const registro = async (req, res, next) => {
  try {
    const { nombre, email, password, rol } = req.body;
    const usuarioExistente = await usersRepo.buscarPorEmail(email);

    if (usuarioExistente) {
      return res.status(400).json({ error: true, mensaje: 'El email ya está registrado.' });
    }

    const usuario = await usersRepo.crearUsuario({ nombre, email, password, rol });
    const token = generarToken({ id: usuario.id, email: usuario.email, rol: usuario.rol });

    res.status(201).json({
      mensaje: 'Usuario registrado correctamente.',
      token,
      usuario: {
        id: usuario.id,
        nombre: usuario.nombre,
        email: usuario.email,
        rol: usuario.rol
      }
    });
  } catch (err) {
    next(err);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const usuario = await usersRepo.buscarPorEmail(email);

    if (!usuario) {
      return res.status(401).json({ error: true, mensaje: 'Credenciales incorrectas.' });
    }

    const passwordValido = await usersRepo.verificarPassword(password, usuario.password_hash);

    if (!passwordValido) {
      return res.status(401).json({ error: true, mensaje: 'Credenciales incorrectas.' });
    }

    if (!usuario.activo) {
      return res.status(401).json({ error: true, mensaje: 'Usuario inactivo.' });
    }

    const token = generarToken({ id: usuario.id, email: usuario.email, rol: usuario.rol });

    res.json({
      mensaje: 'Login exitoso.',
      token,
      usuario: {
        id: usuario.id,
        nombre: usuario.nombre,
        email: usuario.email,
        rol: usuario.rol
      }
    });
  } catch (err) {
    next(err);
  }
};

const perfil = async (req, res, next) => {
  try {
    res.json({
      mensaje: 'Perfil obtenido correctamente.',
      usuario: req.usuario
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { registro, login, perfil };