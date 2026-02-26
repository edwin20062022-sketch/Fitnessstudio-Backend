const express = require('express');
const router = express.Router();
const { convertir, obtenerTasas } = require('../controllers/monedas.controller');
const { authMiddleware } = require('../middlewares/auth.middleware');

// Rutas protegidas
router.get('/convertir', authMiddleware, convertir);
router.get('/tasas', authMiddleware, obtenerTasas);

module.exports = router;