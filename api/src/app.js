// app.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const userRoutes = require('./routes/routes');
const app = express();

// Middleware para parsear el cuerpo de las peticiones JSON
app.use(bodyParser.json());
app.use(cors());
app.use('/api', userRoutes);

// Puerto y servidor en escucha
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});

module.exports = app;
