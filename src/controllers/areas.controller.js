const areasRepo = require('../repositories/areas.repository');

const obtenerTodas = async (req, res, next) => {
  try {
    const areas = await areasRepo.obtenerTodas();
    res.json({
      mensaje: 'Áreas obtenidas correctamente.',
      datos: areas
    });
  } catch (err) {
    next(err);
  }
};

const obtenerPorId = async (req, res, next) => {
  try {
    const { id } = req.params;
    const area = await areasRepo.obtenerPorId(id);
    res.json({
      mensaje: 'Área obtenida correctamente.',
      datos: area
    });
  } catch (err) {
    next(err);
  }
};

const crear = async (req, res, next) => {
  try {
    const { nombre, descripcion, capacidad } = req.body;

    if (!nombre || nombre.trim() === '') {
      return res.status(400).json({ error: true, mensaje: 'El nombre del área es obligatorio.' });
    }
    if (!capacidad || isNaN(capacidad) || capacidad < 1) {
      return res.status(400).json({ error: true, mensaje: 'La capacidad debe ser un número mayor a 0.' });
    }

    const area = await areasRepo.crear({ nombre, descripcion, capacidad });
    res.status(201).json({
      mensaje: 'Área creada correctamente.',
      datos: area
    });
  } catch (err) {
    next(err);
  }
};

const eliminar = async (req, res, next) => {
  try {
    const { id } = req.params;
    await areasRepo.obtenerPorId(id);
    const resultado = await areasRepo.eliminar(id);
    res.json(resultado);
  } catch (err) {
    next(err);
  }
};

const asignarMiembro = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { miembro_id } = req.body;

    if (!miembro_id) {
      return res.status(400).json({ error: true, mensaje: 'El miembro_id es obligatorio.' });
    }

    const resultado = await areasRepo.asignarMiembro(id, miembro_id);
    res.status(201).json({
      mensaje: 'Miembro asignado al área correctamente.',
      datos: resultado
    });
  } catch (err) {
    next(err);
  }
};

const quitarMiembro = async (req, res, next) => {
  try {
    const { id, miembro_id } = req.params;
    const resultado = await areasRepo.quitarMiembro(id, miembro_id);
    res.json(resultado);
  } catch (err) {
    next(err);
  }
};

module.exports = { obtenerTodas, obtenerPorId, crear, eliminar, asignarMiembro, quitarMiembro };