import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
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
    usuario: '',
    contraseña: '',
    provincia: '',
    codigoPostal: '',
    terminos: false,
  });

  useNavigate();

  const [errors, setErrors] = useState({});
  const [showErrors, setShowErrors] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await fetch('http://localhost:3001/api/registro', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData)
        });

        if (response.ok) {
          setSuccessMessage("¡Registro exitoso!");
        } else {
          const errorText = await response.text();
          console.error('Error en la respuesta del servidor:', errorText);
          // Actualizar el estado de errores con el mensaje del servidor
          setErrors({ general: errorText });
          setShowErrors(true);
        }
      } catch (error) {
        console.error('Error al conectarse con el servidor:', error);
        // Mostrar un mensaje de error o manejar el error
      }
    } else {
      setShowErrors(true);
      setTimeout(() => setShowErrors(false), 10000); // Ocultar errores después de 10 segundos
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
      newErrors.apellido = 'No se permiten caracteres especiales en los Apellidos.';
      setErrors(newErrors);
      return false;
    }

    // Validación de la fecha de nacimiento
    const resultadoValidacionFecha = validarFechaNacimiento(formData.fechaNacimiento);
    if (!resultadoValidacionFecha.valido) {
      newErrors.fechaNacimiento = resultadoValidacionFecha.mensaje;
    }

    // Verificar si las contraseñas coinciden
    if (formData.contraseña !== formData.confirmarContraseña) {
      newErrors.contraseña = 'Las contraseñas no coinciden.';
      setErrors(newErrors);
      return false;
    }

    if (!regexEmail.test(formData.email)) {
      console.log("Error de formato de correo detectado");
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

  const validarFechaNacimiento = (fechaNacimiento) => {
    // La fecha viene en formato yyyy-mm-dd
    if (!fechaNacimiento) {
      return { valido: false, mensaje: "Fecha de nacimiento es requerida." };
    }

    const partes = fechaNacimiento.split('-');
    const anio = parseInt(partes[0], 10);
    const mes = parseInt(partes[1], 10) - 1; // Los meses en JavaScript van de 0 a 11
    const dia = parseInt(partes[2], 10);

    const hoy = new Date();
    let edad = hoy.getFullYear() - anio;
    if (hoy.getMonth() < mes || (hoy.getMonth() === mes && hoy.getDate() < dia)) {
      edad--;
    }

    if (edad < 18) {
      return { valido: false, mensaje: "Debes tener al menos 18 años." };
    }

    return { valido: true, mensaje: "Fecha de nacimiento válida." };
  };

  return (
    <div className="register-background">
      <div className="register-container">
        <form className="register-form" onSubmit={handleSubmit}>
          <div className='volver-container'>
            <a href="/">
              <svg role="presentation" aria-hidden="true" viewBox="0 0 28 28" className='volver'>
                <path d="M11.5 25.2c1.1 0 1.8-.8 1.8-1.7 0-.5-.2-1-.6-1.3L9.5 19 6 15.6l3.2.2h16.6c1.1 0 1.9-.7 1.9-1.8s-.8-1.8-1.9-1.8H9.2l-3.2.2 3.6-3.3 3.2-3.2c.3-.3.6-.8.6-1.3 0-1-.7-1.7-1.8-1.7-.4 0-.9.2-1.3.6L1 12.6c-.4.4-.6.9-.6 1.4s.2 1 .6 1.3l9.3 9.3c.3.4.8.6 1.2.6z" fill='white'></path>
              </svg>
            </a>
            <h2> Regístrate en <span className="title">Cytech</span></h2>
          </div>
          <div className="input-row">
            <div className="input-group">
              <label htmlFor="nombre">Nombre <span className="required">*</span></label>
              <input type="text" name="nombre" placeholder="Introduzca su nombre" onChange={handleChange} />
            </div>
            <div className="input-group">
              <label htmlFor="apellido">Apellidos <span className="required">*</span></label>
              <input type="text" name="apellido" placeholder="Introduzca sus apellidos" onChange={handleChange} />
            </div>
          </div>
          <div className="input-row">
            <div className="input-group">
              <label htmlFor="fechaNacimiento">Fecha de Nacimiento <span className="required">*</span></label>
              <input type="date" id="fechaNacimiento" name="fechaNacimiento" onChange={handleChange} placeholder="DD/MM/AAAA" />
            </div>
            <div className="input-group">
              <label htmlFor="mail">Correo <span className="required">*</span></label>
              <input type="text" name="email" placeholder="Introduzca su correo electrónico" onChange={handleChange} />
            </div>
          </div>
          <div className="input-row">
            <div className="input-group">
              <label htmlFor="usuario">Usuario <span className="required">*</span></label>
              <input type="text" name="usuario" placeholder="Introduzca su nombre de usuario" onChange={handleChange} />
            </div>
            <div className="input-group">
              <label htmlFor="telefono">Teléfono</label>
              <input type="tel" name="telefono" placeholder="Teléfono" onChange={handleChange} />
            </div>
          </div>
          <div className="input-row">
            <div className="input-group">
              <label htmlFor="passwd">Contraseña <span className="required">*</span></label>
              <div className="password-container">
                <input type={showPassword ? "text" : "password"} name="contraseña" placeholder="Introduzca su contraseña" onChange={handleChange} />
                <span className="password-toggle-icon" onClick={() => setShowPassword(!showPassword)}>
                  <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                </span>
              </div>
            </div>
            <div className="input-group">
              <label htmlFor="passwd2">Confirmar Contraseña <span className="required">*</span></label>
              <input type="password" name="confirmarContraseña" placeholder="Confirme su contraseña" onChange={handleChange} />
            </div>
          </div>
          <div className="input-row">
            <div className="input-group-half">
              <label htmlFor="direccion">Dirección <span className="required">*</span></label>
              <input type="text" id="direccion" name="direccion" placeholder="Introduzca su dirección" onChange={handleChange} />
            </div>
            <div className="input-group-right">
              <div className="input-group-quarter">
                <label htmlFor="provincia">Provincia <span className="required">*</span></label>
                <select name="provincia" onChange={handleChange}>
                  <option value="">Seleccione una provincia</option>
                  {provinciasEspaña.map((provincia, index) => (
                    <option key={index} value={provincia.toLowerCase()}>{provincia}</option>
                  ))}
                </select>
              </div>
              <div className="input-group-quarter">
                <label htmlFor="codigoPostal">Código Postal <span className="required">*</span></label>
                <input type="text" id="codigoPostal" name="codigoPostal" placeholder="Código Postal" onChange={handleChange} />
              </div>
            </div>
          </div>
          <div className="input-group checkbox-row">
            <input type="checkbox" className="checkbox-custom" id="terminos" name="terminos" onChange={handleChange} />
            <label htmlFor="terminos" className='label-checkbox'>Acepto los <span className="title">términos y condiciones</span> <span className="required">*</span></label>
          </div>
          <button type="submit" className='bn634-hover bn34'>Registrarse</button>
          <div className="login-link">
            ¿Ya tienes cuenta? <a href="/login" className="login-link-a">Inicia sesión aquí.</a>
          </div>
        </form>
      </div >
      {showErrors && (
        <div className={`error-container ${Object.keys(errors).length > 0 ? 'visible' : ''}`}>
          <div className="error-message">{Object.values(errors)[0]}</div>
        </div>
      )}
      {successMessage && (
        <div className={`success-container ${successMessage ? 'visible' : ''}`}>
          <div className="success-message">{successMessage}</div>
        </div>
      )}
    </div >
  );
};

export default Registro;
