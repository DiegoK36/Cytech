const router = require('express').Router();
const bcrypt = require('bcrypt');
const mysql = require('mysql');
const saltRounds = 10;

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

// Endpoint del Registro
router.post('/registro', (req, res) => {
  console.log('Acceso a Registro Endpoint');
  const { nombre, apellido, fechaNacimiento, email, telefono, usuario, contraseña, provincia, codigoPostal, terminos } = req.body;

  // Comprobar si el nombre de usuario ya existe
  const queryVerificarUsuario = 'SELECT * FROM usuario WHERE username = ?';
  db.query(queryVerificarUsuario, [usuario], (error, results) => {
    if (error) {
      console.error('Error al verificar el usuario:', error);
      return res.status(500).send('Error al procesar la solicitud');
    }
    if (results.length > 0) {
      return res.status(400).send('El nombre de usuario ya está en uso');
    }

    // Si el nombre de usuario no existe, proceder con el hashing de la contraseña
    bcrypt.hash(contraseña, saltRounds, (err, hash) => {
      if (err) {
        console.error('Error al hashear la contraseña:', err);
        return res.status(500).send('Error al procesar la solicitud');
      }

      // Insertar el nuevo usuario en la base de datos
      const queryInsertarUsuario = `
        INSERT INTO usuario (nombre, apellido, fechaNacimiento, email, telefono, username, passwd, provincia, codigoPostal, terminos, fechaRegistro)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW());
      `;
      db.query(queryInsertarUsuario, [nombre, apellido, fechaNacimiento, email, telefono, usuario, hash, provincia, codigoPostal, terminos], (error) => {
        if (error) {
          if (error.code === 'ER_DUP_ENTRY' && error.sqlMessage.includes('email')) {
            console.error('Intento de registrar con un email duplicado:', email);
            return res.status(400).send('El email ya está en uso');
          }
          console.error('Error al registrar el usuario:', error.code);
          return res.status(500).send('Error al procesar la solicitud');
        }
        res.send('Usuario registrado con éxito');
      });
    });
  });
});

module.exports = router;
