import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import '../css/Registro.css';

const Registro = () => {

  // Lista de provincias de España
  const provinciasEspaña = [
    "Álava", "Albacete", "Alicante", "Almería", "Asturias", "Ávila", "Badajoz",
    "Barcelona", "Burgos", "Cáceres", "Cádiz", "Cantabria", "Castellón",
    "Ciudad Real", "Córdoba", "La Coruña", "Cuenca", "Gerona", "Granada",
    "Guadalajara", "Guipúzcoa", "Huelva", "Huesca", "Islas Baleares",
    "Jaén", "León", "Lérida", "Lugo", "Madrid", "Málaga", "Murcia",
    "Navarra", "Orense", "Palencia", "Las Palmas", "Pontevedra",
    "La Rioja", "Salamanca", "Segovia", "Sevilla", "Soria",
    "Tarragona", "Santa Cruz de Tenerife", "Teruel", "Toledo", "Valencia",
    "Valladolid", "Vizcaya", "Zamora", "Zaragoza"
  ];

  const [showPassword, setShowPassword] = useState(false);

  const [userData, setUserData] = useState({
    nombre: '',
    apellido: '',
    email: '',
    contraseña: '',
    confirmarContraseña: '',
  });

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(userData);
  };

  return (
    <div className="register-background">
      <div className="register-container">
        <form className="register-form" onSubmit={handleSubmit}>
          <h2>Regístrate</h2>
          <div className="input-group">
            <label htmlFor="nombre">Nombre *</label>
            <input type="text" name="nombre" placeholder="Introduce tu Nombre" onChange={handleChange} />
            <label htmlFor="apellidos">Apellidos *</label>
            <input type="text" name="apellido" placeholder="Introduce tus Apellidos" onChange={handleChange} />
            <label htmlFor="fechaNacimiento">Fecha de Nacimiento *</label>
            <input type="date" name="fechaNacimiento" onChange={handleChange} />
            <label htmlFor="mail">Correo *</label>
            <input type="email" name="email" placeholder="Introduce tu Email" onChange={handleChange} />
            <label htmlFor="telefono">Teléfono</label>
            <input type="tel" name="telefono" placeholder="Teléfono" onChange={handleChange} />
            <label htmlFor="passwd">Contraseña *</label>
            <div className="password-container">
              <input type={showPassword ? "text" : "password"} name="contraseña" placeholder="Introduce tu Contraseña" onChange={handleChange} />
              <span className="password-toggle-icon" onClick={() => setShowPassword(!showPassword)}>
                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
              </span>
            </div>
            <label htmlFor="passwd2">Confirmar Contraseña *</label>
            <input type="password" name="confirmarContraseña" placeholder="Confirma tu Contraseña" onChange={handleChange} />
          </div>
          <div className="input-group">
            <label htmlFor="provincia">Provincia *</label>
            <select name="provincia" onChange={handleChange}>
              <option value="">Seleccione una Provincia</option>
              {provinciasEspaña.map((provincia, index) => (
                <option key={index} value={provincia.toLowerCase()}>{provincia}</option>
              ))}
            </select>
          </div>
          <div className="input-group">
            <input type="checkbox" name="terminos" onChange={handleChange} />
            <label htmlFor="terminos">Acepto los términos y condiciones *</label>
          </div>
          <button type="submit">Registrarse</button>
        </form>
      </div>
    </div>
  );
};

export default Registro;
