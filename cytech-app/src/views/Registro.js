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

  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    fechaNacimiento: '',
    email: '',
    telefono: '',
    contraseña: '',
    provincia: '',
    codigoPostal: '',
    terminos: false,
  });
  const [errors, setErrors] = useState({});
  const [showErrors, setShowErrors] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log(formData);
    } else {
      setShowErrors(true);
      setTimeout(() => setShowErrors(false), 10000); // Ocultar errores después de 5 segundos
    }
  };

  const validateForm = () => {
    let newErrors = {};

    // Expresiones regulares para las validaciones
    const regexNombre = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ ]+$/;
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const regexTelefono = /^\d{9}$/;
    const regexContraseña = /^(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;
    const regexCodigoPostal = /^\d{5}$/;

    // Verificar primero si algún campo obligatorio está vacío
    const requiredFields = ['nombre', 'apellido', 'email', 'contraseña', 'provincia', 'codigoPostal', 'terminos'];
    const isAnyFieldEmpty = requiredFields.some(field => !formData[field]);
    if (isAnyFieldEmpty) {
      setErrors({ general: 'Falta algún campo obligatorio por rellenar (*)' });
      return false;
    }

    if (!regexNombre.test(formData.nombre)) {
      newErrors.nombre = 'No se permiten caracteres especiales en el Nombre.';
      setErrors(newErrors);
      return false;
    }

    if (!regexNombre.test(formData.apellido)) {
      newErrors.nombre = 'No se permiten caracteres especiales en los Apellidos.';
      setErrors(newErrors);
      return false;
    }

    // Verificar si las contraseñas coinciden
    if (formData.contraseña !== formData.confirmarContraseña) {
      newErrors.contraseña = 'Las contraseñas no coinciden.';
      setErrors(newErrors);
      return false;
    }


    // Validación de fecha (puedes utilizar una librería como moment.js para facilitar esto)
    // ...

    if (!regexEmail.test(formData.email)) {
      newErrors.email = 'Formato de correo inválido.';
      setErrors(newErrors);
      return false;
    }

    if (formData.telefono && !regexTelefono.test(formData.telefono)) {
      newErrors.telefono = 'El teléfono debe tener 9 dígitos.';
      setErrors(newErrors);
      return false;
    }

    if (!regexContraseña.test(formData.contraseña)) {
      newErrors.contraseña = 'La contraseña debe tener al menos 8 caracteres/números y contener al menos un carácter especial [!@#$%^&*]';
      setErrors(newErrors);
      return false;
    }

    if (!formData.provincia) {
      newErrors.provincia = 'Debe seleccionar una provincia.';
      setErrors(newErrors);
      return false;
    }

    if (!regexCodigoPostal.test(formData.codigoPostal)) {
      newErrors.codigoPostal = 'El código postal debe tener 5 números.';
      setErrors(newErrors);
      return false;
    }

    if (!formData.terminos) {
      newErrors.terminos = 'Debe aceptar los términos y condiciones.';
      setErrors(newErrors);
      return false;
    }

    setErrors({});
    return true;
  };

  return (
    <div className="register-background">
      <div className="register-container">
        <form className="register-form" onSubmit={handleSubmit}>
          <h2>Regístrate en <span className="title">Cytech</span></h2>
          <div className="input-group">
            <label htmlFor="nombre">Nombre <span className="required">*</span></label>
            <input type="text" name="nombre" placeholder="Introduce tu Nombre" onChange={handleChange} />
            <label htmlFor="apellidos">Apellidos <span className="required">*</span></label>
            <input type="text" name="apellido" placeholder="Introduce tus Apellidos" onChange={handleChange} />
            <div className="input-group">
              <label htmlFor="fechaNacimiento">Fecha de Nacimiento <span className="required">*</span></label>
              <input type="date" id="fechaNacimiento" name="fechaNacimiento" onChange={handleChange} placeholder="DD/MM/AAAA" />
            </div>
            <label htmlFor="mail">Correo <span className="required">*</span></label>
            <input type="email" name="email" placeholder="Introduce tu Email" onChange={handleChange} />
            <label htmlFor="telefono">Teléfono</label>
            <input type="tel" name="telefono" placeholder="Teléfono" onChange={handleChange} />
            <label htmlFor="passwd">Contraseña <span className="required">*</span></label>
            <div className="password-container">
              <input type={showPassword ? "text" : "password"} name="contraseña" placeholder="Introduce tu Contraseña" onChange={handleChange} />
              <span className="password-toggle-icon" onClick={() => setShowPassword(!showPassword)}>
                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
              </span>
            </div>
            <label htmlFor="passwd2">Confirmar Contraseña <span className="required">*</span></label>
            <input type="password" name="confirmarContraseña" placeholder="Confirma tu Contraseña" onChange={handleChange} />
          </div>
          <div className="input-group">
            <label htmlFor="provincia">Dirección de Facturación <span className="required">*</span></label>
            <select name="provincia" onChange={handleChange}>
              <option value="">Seleccione una Provincia</option>
              {provinciasEspaña.map((provincia, index) => (
                <option key={index} value={provincia.toLowerCase()}>{provincia}</option>
              ))}
            </select>
            <div className="input-group input-inline">
              <input type="text" id="direccion" name="direccion" placeholder="Dirección" onChange={handleChange} />
              <input type="text" id="codigoPostal" name="codigoPostal" placeholder="Código Postal" onChange={handleChange} />
            </div>
          </div>
          <div className="input-group checkbox-row">
            <input type="checkbox" id="terminos" name="terminos" onChange={handleChange} />
            <label htmlFor="terminos">Acepto los <span className="title">términos y condiciones</span> <span className="required">*</span></label>
          </div>
          <button type="submit">Registrarse</button>
          <div className="login-link">
            ¿Ya tienes cuenta? <a href="/login" className="login-link-a">Inicia sesión aquí.</a>
          </div>
        </form>
      </div>
      {showErrors && (
        <div className={`error-container ${Object.keys(errors).length > 0 ? 'visible' : ''}`}>
          <div className="error-message">{Object.values(errors)[0]}</div>
        </div>
      )}
    </div>
  );
};

export default Registro;
