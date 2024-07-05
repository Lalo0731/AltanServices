const express = require('express');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const cors = require('cors');
const apiRoutes = require('./routes/apiRoutes');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const app = express();
const port = 3000;

// Middleware para seguridad
app.use(helmet());
app.use(bodyParser.json());
app.use(cors());

// Configurar rate limiting
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100 // límite de 100 solicitudes por IP cada 15 minutos
});
app.use('/api', apiLimiter);

// Usar rutas
app.use('/api', apiRoutes);

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
