const express = require('express');
const router = express.Router();
const { obtenerTodos, obtenerPorId, crear, actualizar, eliminar } = require('../controllers/miembros.controller');
const { authMiddleware, soloAdmin } = require('../middlewares/auth.middleware');
const { validarMiembro } = require('../middlewares/validate.middleware');

// Rutas protegidas (requieren token)
router.get('/', authMiddleware, obtenerTodos);
router.get('/:id', authMiddleware, obtenerPorId);
router.post('/', authMiddleware, validarMiembro, crear);
router.put('/:id', authMiddleware, validarMiembro, actualizar);
router.delete('/:id', authMiddleware, soloAdmin, eliminar);

module.exports = router;