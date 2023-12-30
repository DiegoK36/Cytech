const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const saltRounds = 10;

// Endpoint del Registro
router.post('/registro', (req, res) => {
  // Asumiendo que tienes una variable para fecha de nacimiento y teléfono
  const { nombre, apellido, fechaNacimiento, email, telefono, passwd, provincia, codigoPostal, terminos } = req.body;

  bcrypt.hash(passwd, saltRounds, (err, hash) => {
    if (err) {
      return res.status(500).send('Error al hashear la contraseña');
    }
    
    const query = `
      INSERT INTO usuarios (
        nombre, apellido, fechaNacimiento, email, telefono, passwd, provincia, codigoPostal, terminos, fechaRegistro
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())
    `;

    db.query(query, [nombre, apellido, fechaNacimiento, email, telefono, hash, provincia, codigoPostal, terminos], (error) => {
      if (error) {
        // Aquí puedes decidir cómo manejar el error, por ejemplo:
        // Loguear el error y enviar una respuesta genérica
        console.error(error);
        return res.status(500).send('Error al registrar el usuario');
      }

      res.send('Usuario registrado con éxito');
    });
  });
});

module.exports = router;
