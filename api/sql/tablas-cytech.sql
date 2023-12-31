CREATE TABLE usuario (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(255) NOT NULL,
  apellido VARCHAR(255) NOT NULL,
  fechaNacimiento DATE,
  email VARCHAR(255) NOT NULL UNIQUE,
  telefono VARCHAR(20),
  username VARCHAR(255) NOT NULL UNIQUE,
  passwd VARCHAR(255) NOT NULL,
  provincia VARCHAR(255),
  codigoPostal VARCHAR(10),
  terminos BOOLEAN NOT NULL,
  fechaRegistro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
