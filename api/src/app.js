// app.js
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors');
const app = express();

// Middleware para parsear el cuerpo de las peticiones JSON
app.use(bodyParser.json());
app.use(cors());

// Conexión a la base de datos MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'admin',
  database: 'cytech',
  port: 3308,
});

// Conectar a la base de datos
db.connect(err => {
  if (err) {
    console.error('Error conectando a la base de datos', err);
    throw err;
  }
  console.log('Conectado a la base de datos');
});

// Importar rutas
const userRoutes = require('./routes');
app.use('/api', userRoutes);

// Puerto y servidor en escucha
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});

module.exports = app;
