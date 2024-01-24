const router = require('express').Router();
const bcrypt = require('bcrypt');
const mysql = require('mysql');
const config = require('config');
const path = require('path');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const saltRounds = 10;
const cors = require('cors');
const express = require('express');
const app = express();
app.use(cors());

app.use(cors({
  origin: '*', // Esto permite solicitudes de cualquier origen
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos permitidos
  allowedHeaders: ['Content-Type', 'Authorization'] // Encabezados permitidos
}));

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

// Configura multer para manejar la carga de imágenes
const storage = multer.diskStorage({
  destination: './uploads/', // Directorio donde se almacenarán las imágenes
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

// Ruta para crear un proyecto
router.post('/crear', upload.single('imagen'), (req, res) => {
  const { nombre, descripcion, presupuesto, moneda, categoria, fechaLimite, emailContacto, instagram, youtube, facebook, usuario_id } = req.body;
  const imagen = req.file ? req.file.filename : null;

  // Realiza la inserción en la base de datos
  const insertQuery = 'INSERT INTO proyecto (nombre, descripcion, presupuesto, moneda, imagen, categoria, fechaLimite, emailContacto, instagram, youtube, facebook, usuario_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
  db.query(insertQuery, [nombre, descripcion, presupuesto, moneda, imagen, categoria, fechaLimite, emailContacto, instagram, youtube, facebook, usuario_id], (err, result) => {
    if (err) {
      console.error('Error al crear el proyecto:', err);
      res.status(500).json({ error: 'Error al crear el proyecto' });
    } else {
      console.log('Proyecto creado con éxito');
      res.status(200).json({ message: 'Proyecto guardado con éxito' });
    }
  });
});

// Ruta para obtener la URL de la imagen de perfil del usuario
router.get('/imagen-perfil/:userId', (req, res) => {
  const userId = req.params.userId;
  // Reemplaza con tu consulta SQL para obtener la URL de la imagen de perfil
  const sql = `SELECT profilePictureURL FROM usuario WHERE id = ?`;

  db.query(sql, [userId], (err, result) => {
    if (err) {
      console.error('Error al obtener la imagen de perfil:', err);
      res.status(500).json({ error: 'Error al obtener la imagen de perfil' });
      return;
    }

    if (result.length === 0) {
      res.status(404).json({ error: 'Usuario no encontrado' });
      return;
    }

    // Devuelve la URL de la imagen de perfil como respuesta
    res.json({ profileImage: result[0].profilePictureURL });
  });
});

// Ruta para eliminar la cuenta del usuario y sus proyectos asociados
router.delete('/eliminar-cuenta/:userId', (req, res) => {
  const userId = req.params.userId;

  // Inicia una transacción para garantizar la consistencia de la base de datos
  db.beginTransaction((err) => {
    if (err) {
      console.error('Error al iniciar la transacción:', err);
      res.status(500).json({ message: 'Error al eliminar la cuenta' });
      return;
    }

    // Eliminar los proyectos asociados al usuario
    const deleteProjectsSql = 'DELETE FROM proyecto WHERE usuario_id = ?';

    db.query(deleteProjectsSql, [userId], (err, result) => {
      if (err) {
        console.error('Error al eliminar proyectos:', err);
        db.rollback(() => {
          res.status(500).json({ message: 'Error al eliminar la cuenta' });
        });
        return;
      }

      // Eliminar el usuario
      const deleteUserSql = 'DELETE FROM usuario WHERE id = ?';

      db.query(deleteUserSql, [userId], (err, result) => {
        if (err) {
          console.error('Error al eliminar el usuario:', err);
          db.rollback(() => {
            res.status(500).json({ message: 'Error al eliminar la cuenta' });
          });
          return;
        }

        // Confirmar la transacción y enviar respuesta exitosa
        db.commit((err) => {
          if (err) {
            console.error('Error al confirmar la transacción:', err);
            db.rollback(() => {
              res.status(500).json({ message: 'Error al eliminar la cuenta' });
            });
            return;
          }

          // Borrar el token y el ID del localStorage (en el cliente)
          res.status(200).json({ message: 'Cuenta eliminada con éxito' });
        });
      });
    });
  });
});

// Ruta para cambiar la imagen de perfil del usuario
router.post('/cambiar-imagen/:userId', upload.single('image'), (req, res) => {
  const userId = req.params.userId;
  const imagePath = req.file.path; // Ruta del archivo subido

  // Actualiza la ruta de la imagen de perfil en la base de datos
  db.query(
    'UPDATE usuario SET profilePictureURL = ? WHERE id = ?',
    [imagePath, userId],
    (err, results) => {
      if (err) {
        console.error('Error al actualizar la imagen de perfil:', err);
        res.status(500).json({ error: 'Error al actualizar la imagen de perfil' });
        return;
      }

      if (results.affectedRows === 0) {
        res.status(404).json({ error: 'Usuario no encontrado' });
        return;
      }

      // Devuelve la URL de la nueva imagen de perfil como respuesta
      const imageUrl = `/uploads/${userId}${path.extname(req.file.originalname)}`;
      res.json({ profileImage: imageUrl });

      // Cierra la conexión a la base de datos
      connection.end();
    }
  );
});

// Cambia la ruta para coincidir con la esperada por el frontend
router.get('/obtener-proyectos', (req, res) => {
  const categoria = req.query.category;
  console.log('Categoría seleccionada:', categoria);

  const sql = 'SELECT * FROM proyecto WHERE categoria = ?';

  db.query(sql, [categoria], (err, results) => {
    if (err) {
      console.error('Error al obtener proyectos:', err);
      res.status(500).json({ error: 'Error al obtener proyectos' });
      return;
    }

    // Enviar los proyectos como respuesta
    res.json(results);
  });
});

module.exports = router;
