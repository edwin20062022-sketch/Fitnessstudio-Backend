const equiposRepo = require('../repositories/equipos.repository');

const obtenerTodos = async (req, res, next) => {
  try {
    const equipos = await equiposRepo.obtenerTodos();
    res.json({
      mensaje: 'Equipos obtenidos correctamente.',
      datos: equipos
    });
  } catch (err) {
    next(err);
  }
};

const obtenerPorId = async (req, res, next) => {
  try {
    const { id } = req.params;
    const equipo = await equiposRepo.obtenerPorId(id);
    res.json({
      mensaje: 'Equipo obtenido correctamente.',
      datos: equipo
    });
  } catch (err) {
    next(err);
  }
};

const crear = async (req, res, next) => {
  try {
    const { nombre, descripcion } = req.body;

    if (!nombre || nombre.trim() === '') {
      return res.status(400).json({ error: true, mensaje: 'El nombre del equipo es obligatorio.' });
    }

    const equipo = await equiposRepo.crear({ nombre, descripcion });
    res.status(201).json({
      mensaje: 'Equipo creado correctamente.',
      datos: equipo
    });
  } catch (err) {
    next(err);
  }
};

const actualizar = async (req, res, next) => {
  try {
    const { id } = req.params;
    const campos = req.body;
    const equipo = await equiposRepo.actualizar(id, campos);
    res.json({
      mensaje: 'Equipo actualizado correctamente.',
      datos: equipo
    });
  } catch (err) {
    next(err);
  }
};

const eliminar = async (req, res, next) => {
  try {
    const { id } = req.params;
    await equiposRepo.obtenerPorId(id);
    const resultado = await equiposRepo.eliminar(id);
    res.json(resultado);
  } catch (err) {
    next(err);
  }
};

module.exports = { obtenerTodos, obtenerPorId, crear, actualizar, eliminar };