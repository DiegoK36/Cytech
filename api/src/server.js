const http = require('http');
const app = require('./app').default; // Importa la aplicación de app.js

const PORT = process.env.PORT || 3000;

// Crea el servidor HTTP usando la aplicación Express
const server = http.createServer(app);

// El servidor escucha en el Puerto 3000
server.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
