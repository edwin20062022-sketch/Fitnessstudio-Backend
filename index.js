require('dotenv').config();
const express = require('express');
const cors = require('cors');

const usersRoutes = require('./src/routes/users.routes');
const miembrosRoutes = require('./src/routes/miembros.routes');
const equiposRoutes = require('./src/routes/equipos.routes');
const areasRoutes = require('./src/routes/areas.routes');
const monedasRoutes = require('./src/routes/monedas.routes');
const errorMiddleware = require('./src/middlewares/error.middleware');

const app = express();
const PORT = process.env.PORT || 4000;

// Middlewares globales
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());

// Ruta de salud (para verificar que el servidor corre)
app.get('/', (req, res) => {
  res.json({
    mensaje: 'API Gimnasio funcionando correctamente',
    version: '1.0.0',
    timestamp: new Date().toISOString()
  });
});

// Rutas
app.use('/api/auth', usersRoutes);
app.use('/api/miembros', miembrosRoutes);
app.use('/api/equipos', equiposRoutes);
app.use('/api/areas', areasRoutes);
app.use('/api/monedas', monedasRoutes);

// Middleware de errores (siempre al final)
app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

module.exports = app;