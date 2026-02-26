const express = require('express');
const router = express.Router();
const { obtenerTodas, obtenerPorId, crear, eliminar, asignarMiembro, quitarMiembro } = require('../controllers/areas.controller');
const { authMiddleware, soloAdmin } = require('../middlewares/auth.middleware');

// Rutas protegidas
router.get('/', authMiddleware, obtenerTodas);
router.get('/:id', authMiddleware, obtenerPorId);
router.post('/', authMiddleware, crear);
router.delete('/:id', authMiddleware, soloAdmin, eliminar);
router.post('/:id/asignar', authMiddleware, asignarMiembro);
router.delete('/:id/miembros/:miembro_id', authMiddleware, quitarMiembro);

module.exports = router;