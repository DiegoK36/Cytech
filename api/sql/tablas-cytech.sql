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
  fechaRegistro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  profilePictureURL VARCHAR(255) NOT NULL
);

CREATE TABLE proyecto (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(255) NOT NULL,
  descripcion TEXT NOT NULL,
  presupuesto DECIMAL(10, 2) NOT NULL,
  moneda VARCHAR(5) NOT NULL,
  imagen VARCHAR(255) NOT NULL,
  categoria VARCHAR(50) NOT NULL,
  fechaLimite DATE NOT NULL,
  emailContacto VARCHAR(255) NOT NULL,
  instagram VARCHAR(255),
  youtube VARCHAR(255),
  facebook VARCHAR(255),
  fechaCreacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  usuario_id INT,

  FOREIGN KEY (usuario_id) REFERENCES usuario(id)
);

INSERT INTO usuario (nombre, apellido, fechaNacimiento, email, telefono, username, passwd, provincia, codigoPostal, terminos, profilePictureURL)
VALUES ('Administrador', 'Admin', '1990-01-01', 'admin@example.com', '1234567890', 'admin', 'pass', 'Provincia', '12345', 1, 'admin.jpg');

-- Proyecto 1
INSERT INTO proyecto (nombre, descripcion, presupuesto, moneda, imagen, categoria, fechaLimite, emailContacto, instagram, youtube, facebook, usuario_id)
VALUES ('Proyecto 1', 'Descripción del Proyecto 1', 1000.00, 'USD', 'imagen1.jpg', 'Neurotecnología', '2024-12-31', 'contacto1@example.com', 'instagram1', 'youtube1', 'facebook1', 1);

-- Proyecto 2
INSERT INTO proyecto (nombre, descripcion, presupuesto, moneda, imagen, categoria, fechaLimite, emailContacto, instagram, youtube, facebook, usuario_id)
VALUES ('Proyecto 2', 'Descripción del Proyecto 2', 2000.00, 'EUR', 'imagen2.jpg', 'Prótesis', '2024-12-31', 'contacto2@example.com', 'instagram2', 'youtube2', 'facebook2', 1);

-- Proyecto 3
INSERT INTO proyecto (nombre, descripcion, presupuesto, moneda, imagen, categoria, fechaLimite, emailContacto, instagram, youtube, facebook, usuario_id)
VALUES ('Proyecto 3', 'Descripción del Proyecto 3', 1500.00, 'USD', 'imagen3.jpg', 'Medicina', '2024-12-31', 'contacto3@example.com', 'instagram3', 'youtube3', 'facebook3', 1);
