const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const express = require('express');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const cors = require('cors');
const apiRoutes = require('./routes/apiRoutes');
const rateLimit = require('express-rate-limit');

const app = express();
const port = process.env.PORT;

// Middleware para seguridad
app.use(helmet());
app.use(bodyParser.json());
app.use(cors());

// Configurar rate limiting
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100 // límite de 100 solicitudes por IP cada 15 minutos
});

app.use(apiLimiter); //limita la cantidad de solicitudes que una dirección IP que puede hacer al servidor en un período de tiempo específico, en este caso, 100 solicitudes cada 15 minutos.

// Usar rutas
app.use('/', apiRoutes);

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
