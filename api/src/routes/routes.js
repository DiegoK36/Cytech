const router = require('express').Router();
const bcrypt = require('bcrypt');
const mysql = require('mysql');
const config = require('config');
const jwt = require('jsonwebtoken');
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

// Middleware para verificar el token JWT
function verificarToken(req, res, next) {
  const token = req.headers['authorization'];
  if (!token) {
    return res.status(401).send('Acceso denegado');
  }

  try {
    const decoded = jwt.verify(token, config.get('jwtSecret'));
    req.user = decoded.user;
    next();
  } catch (error) {
    res.status(400).send('Token inválido');
  }
}

// Endpoint del Registro
router.post('/registro', (req, res) => {
  const { nombre, apellido, fechaNacimiento, email, telefono, usuario, contraseña, provincia, codigoPostal, terminos } = req.body;

  // URL de imagen de perfil por defecto
  const defaultProfilePictureURL = 'https://cdn.discordapp.com/attachments/1071576440253984838/1198402211093426366/avatar1.png?ex=65bec608&is=65ac5108&hm=ef8754790004aabdb26c9147baa302b723903d8e2d677063214eede76eb57a2f&';

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
        INSERT INTO usuario (nombre, apellido, fechaNacimiento, email, telefono, username, passwd, provincia, codigoPostal, terminos, fechaRegistro, profilePictureURL)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), ?);
      `;
      db.query(queryInsertarUsuario, [nombre, apellido, fechaNacimiento, email, telefono, usuario, hash, provincia, codigoPostal, terminos, defaultProfilePictureURL], (error) => {
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

// Endpoint de Inicio de Sesión
router.post('/login', (req, res) => {

  const { usuario, contraseña } = req.body;

  // Comprobar si el usuario existe en la base de datos
  const queryVerificarUsuario = 'SELECT * FROM usuario WHERE username = ?';
  db.query(queryVerificarUsuario, [usuario], (error, results) => {
    if (error) {
      console.error('Error al verificar el usuario:', error);
      return res.status(500).send('Error al procesar la solicitud');
    }

    if (results.length === 0) {
      return res.status(400).send('Credenciales inválidas');
    }

    // Verificar la contraseña utilizando bcrypt
    const hashedPassword = results[0].passwd;
    bcrypt.compare(contraseña, hashedPassword, (err, isMatch) => {
      if (err) {
        console.error('Error al comparar contraseñas:', err);
        return res.status(500).send('Error al procesar la solicitud');
      }

      if (!isMatch) {
        return res.status(400).send('Credenciales inválidas');
      }

      // Si las credenciales son válidas, puedes generar un token JWT y enviarlo al cliente
      const payload = {
        user: {
          id: results[0].id, // Reemplaza con la propiedad adecuada que representa la identificación del usuario en tu base de datos
        },
      };

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: 7200 }, // 2 Horas de duración
        (err, token) => {
          if (err) {
            console.error('Error al generar el token JWT:', err);
            return res.status(500).send('Error al procesar la solicitud');
          }
          res.json({ token, user: { id: results[0].id } });
        }
      );
    });
  });
});

// Endpoint para obtener los datos del perfil del usuario
router.get('/perfil', verificarToken, (req, res) => {
  const userId = req.user.id;
  const query = 'SELECT username, profilePictureURL FROM usuario WHERE id = ?';

  db.query(query, [userId], (error, results) => {
    if (error) {
      console.error('Error al obtener datos del usuario:', error);
      return res.status(500).send('Error al procesar la solicitud');
    }
    if (results.length === 0) {
      return res.status(404).send('Usuario no encontrado');
    }
    res.json(results[0]);
  });
});

// Ruta para crear un nuevo proyecto
app.post('/api/crear-proyecto', (req, res) => {
  const nuevoProyecto = req.body;

  // Insertar el nuevo proyecto en la base de datos
  db.query('INSERT INTO proyecto SET ?', nuevoProyecto, (error, results) => {
    if (error) {
      console.error('Error al crear el proyecto: ' + error.message);
      res.status(500).json({ error: 'Error al crear el proyecto' });
    } else {
      console.log('Proyecto creado con éxito, ID:', results.insertId);
      res.status(201).json({ mensaje: 'Proyecto creado con éxito', proyectoId: results.insertId });
    }
  });
});

module.exports = router;
