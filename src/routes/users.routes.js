const express = require('express');
const router = express.Router();
const { registro, login, perfil } = require('../controllers/users.controller');
const { authMiddleware } = require('../middlewares/auth.middleware');
const { validarUsuario, validarLogin } = require('../middlewares/validate.middleware');

// Rutas públicas
router.post('/registro', validarUsuario, registro);
router.post('/login', validarLogin, login);

// Rutas protegidas
router.get('/perfil', authMiddleware, perfil);

module.exports = router;