const miembrosRepo = require('../repositories/miembros.repository');

const obtenerTodos = async (req, res, next) => {
  try {
    const { page = 1, limit = 5, membresia } = req.query;
    const resultado = await miembrosRepo.obtenerTodos({ page, limit, membresia });

    res.json({
      mensaje: 'Miembros obtenidos correctamente.',
      ...resultado
    });
  } catch (err) {
    next(err);
  }
};

const obtenerPorId = async (req, res, next) => {
  try {
    const { id } = req.params;
    const miembro = await miembrosRepo.obtenerPorId(id);

    res.json({
      mensaje: 'Miembro obtenido correctamente.',
      datos: miembro
    });
  } catch (err) {
    next(err);
  }
};

const crear = async (req, res, next) => {
  try {
    const { nombre, email, telefono, membresia, meses, precio } = req.body;
    const miembro = await miembrosRepo.crear({ nombre, email, telefono, membresia, meses, precio });

    res.status(201).json({
      mensaje: 'Miembro creado correctamente.',
      datos: miembro
    });
  } catch (err) {
    next(err);
  }
};

const actualizar = async (req, res, next) => {
  try {
    const { id } = req.params;
    const campos = req.body;
    const miembro = await miembrosRepo.actualizar(id, campos);

    res.json({
      mensaje: 'Miembro actualizado correctamente.',
      datos: miembro
    });
  } catch (err) {
    next(err);
  }
};

const eliminar = async (req, res, next) => {
  try {
    const { id } = req.params;
    await miembrosRepo.obtenerPorId(id);
    const resultado = await miembrosRepo.eliminar(id);

    res.json(resultado);
  } catch (err) {
    next(err);
  }
};

module.exports = { obtenerTodos, obtenerPorId, crear, actualizar, eliminar };