import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import salir from '../assets/salir.svg';
import { useNavigate } from 'react-router-dom';
import '../css/Usuario.css';




const Usuario = () => {

  const navigate = useNavigate(); // Define useNavigate aquí

  const [showPassword, setShowPassword] = useState(false);
  const [showPassword1, setShowPassword1] = useState(false);
  const [profileImage, setProfileImage] = useState('');
  const [userId, setUserId] = useState(''); // Define userId aquí

  useEffect(() => {
    const hasToken = !!localStorage.getItem('token');

    if (!hasToken) {
      navigate('/login');
    }
  }, [navigate]);

  useEffect(() => {
    // Obtener userId del localStorage
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      setUserId(storedUserId);
    }
  }, []);

  useEffect(() => {
    if (userId) {
      // Realizar la solicitud al endpoint con el userId
      fetch(`http://localhost:3001/api/imagen-perfil/${userId}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`Error en la respuesta del servidor: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          setProfileImage(data.profileImage);
        })
        .catch((error) => {
          console.error('Error al obtener la imagen de perfil:', error);
        });
    }
  }, [userId]);

  // Función para cerrar sesión
  const handleLogout = () => {
    // Eliminar el token y userId del localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    // Redirigir al usuario a la página de inicio
    navigate('/');
  };

  // Función para mostrar una alerta y eliminar la cuenta
  const handleDeleteAccount = () => {
    const confirmDelete = window.confirm('¿Está seguro de que desea borrar su cuenta? Esta acción no se puede deshacer.');
    if (confirmDelete) {
      // Realizar la solicitud al endpoint para eliminar la cuenta
      fetch(`http://localhost:3001/api/eliminar-cuenta/${userId}`, {
        method: 'DELETE',
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`Error en la respuesta del servidor: ${response.status}`);
          }
          return response.json();
        })
        .then(() => {
          // Redirigir al usuario a la página de inicio
          navigate('/');
        })
        .catch((error) => {
          console.error('Error al eliminar la cuenta:', error);
        });
    }
  };

  

  return (
    <div className='usuario-background'>
      <div className="crear-body">
        <div className="crear-container">
          <form className="edit-form">
            <div className='volver-container2'>
              <a href="/categorias">
                <svg role="presentation" aria-hidden="true" viewBox="0 0 28 28" className='volver'>
                  <path d="M11.5 25.2c1.1 0 1.8-.8 1.8-1.7 0-.5-.2-1-.6-1.3L9.5 19 6 15.6l3.2.2h16.6c1.1 0 1.9-.7 1.9-1.8s-.8-1.8-1.9-1.8H9.2l-3.2.2 3.6-3.3 3.2-3.2c.3-.3.6-.8.6-1.3 0-1-.7-1.7-1.8-1.7-.4 0-.9.2-1.3.6L1 12.6c-.4.4-.6.9-.6 1.4s.2 1 .6 1.3l9.3 9.3c.3.4.8.6 1.2.6z" fill='white'></path>
                </svg>
              </a>
              <h2> Configuración de <span className="title">Usuario</span></h2>
            </div>
            <div className="input-row">
              <div className="input-group">
                <div className='img-container'>
                  <img src={profileImage} alt="Imagen de perfil" className="profile-img" />
                </div>
                <button type="button" className='bn634-hover bn34'>Cambiar Imagen</button>
              </div>
            </div>
            <br></br>
            <div className="input-row">
              <div className="input-group">
                <label htmlFor="passwd">Cambiar contraseña</label>
                <div className="password-container">
                  <input type={showPassword ? "text" : "password"} name="contraseña" placeholder="Introduzca su actual contraseña" />
                  <span className="password-toggle-icon" onClick={() => setShowPassword(!showPassword)}>
                    <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                  </span>
                </div>
                <div className="password-container">
                  <input type={showPassword1 ? "text" : "password"} name="contraseña" placeholder="Introduzca su nueva contraseña" />
                  <span className="password-toggle-icon" onClick={() => setShowPassword1(!showPassword1)}>
                    <FontAwesomeIcon icon={showPassword1 ? faEyeSlash : faEye} />
                  </span>
                </div>
                <button type="button" className='bn634-hover bn34'>Cambiar Contraseña</button>
              </div>
            </div>
            <br></br>
            <button type="button" className='bn634-hover bn34' onClick={handleLogout}><img src={salir} alt='icono de salir' className='icon'></img> Cerrar Sesión</button>
            <button type="button" className='bn635-hover bn35' onClick={handleDeleteAccount}><FontAwesomeIcon icon={faTrash} className='icon' /> Borrar Cuenta</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Usuario;

