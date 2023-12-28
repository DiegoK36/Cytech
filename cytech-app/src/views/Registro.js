import React, { useState } from 'react';
import '../css/Registro.css'; // Asegúrate de crear este archivo CSS

const Registro = () => {
  const [userData, setUserData] = useState({
    nombre: '',
    apellido: '',
    email: '',
    contraseña: '',
    confirmarContraseña: '',
    // Agrega otros campos según sea necesario
  });

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Implementa la lógica de envío aquí
    console.log(userData);
  };

  return (
    <div className="register-container">
      <form className="register-form" onSubmit={handleSubmit}>
        <h2>Registrarse</h2>
        {/* Campos del formulario */}
        <input type="text" name="nombre" placeholder="Nombre" onChange={handleChange} />
        <input type="text" name="apellido" placeholder="Apellido" onChange={handleChange} />
        <input type="email" name="email" placeholder="Email" onChange={handleChange} />
        <input type="password" name="contraseña" placeholder="Contraseña" onChange={handleChange} />
        <input type="password" name="confirmarContraseña" placeholder="Confirmar Contraseña" onChange={handleChange} />
        {/* Otros campos según sea necesario */}
        <button type="submit">Registrarse</button>
      </form>
    </div>
  );
};

export default Registro;
