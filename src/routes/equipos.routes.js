const express = require('express');
const router = express.Router();
const { obtenerTodos, obtenerPorId, crear, actualizar, eliminar } = require('../controllers/equipos.controller');
const { authMiddleware, soloAdmin } = require('../middlewares/auth.middleware');

// Rutas protegidas
router.get('/', authMiddleware, obtenerTodos);
router.get('/:id', authMiddleware, obtenerPorId);
router.post('/', authMiddleware, crear);
router.put('/:id', authMiddleware, actualizar);
router.delete('/:id', authMiddleware, soloAdmin, eliminar);

module.exports = router;