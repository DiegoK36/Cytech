import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { faTrash} from '@fortawesome/free-solid-svg-icons';
import cerebro from '../assets/cerebro.svg';
import salir from '../assets/salir.svg';
import '../css/Usuario.css';




const Usuario = () => {

const [showPassword, setShowPassword] = useState(false);
const [showPassword1, setShowPassword1] = useState(false);

  return (
    <div className="crear-body">
      <div className="crear-container">
        <form className="edit-form">
          <div className='volver-container2'>
                <a href="/">
                <svg role="presentation" aria-hidden="true" viewBox="0 0 28 28" className='volver'>
                <path d="M11.5 25.2c1.1 0 1.8-.8 1.8-1.7 0-.5-.2-1-.6-1.3L9.5 19 6 15.6l3.2.2h16.6c1.1 0 1.9-.7 1.9-1.8s-.8-1.8-1.9-1.8H9.2l-3.2.2 3.6-3.3 3.2-3.2c.3-.3.6-.8.6-1.3 0-1-.7-1.7-1.8-1.7-.4 0-.9.2-1.3.6L1 12.6c-.4.4-.6.9-.6 1.4s.2 1 .6 1.3l9.3 9.3c.3.4.8.6 1.2.6z" fill='white'></path>
              </svg>
              </a>
                <h2> Configuración de <span className="title">Usuario</span></h2>
              </div>
          <div className="input-row">
            <div className="input-group">
              <div className='img-container'>
              <img src={cerebro} alt="Imagen de perfil" className="profile-img" />
              </div>
              <button type="button" className='bn634-hover bn34'>Cambiar Imagen</button>
            </div>  
          </div>
          <br>
          </br>
          <div className="input-row">
            <div className="input-group">
              <label htmlFor="nombre">Cambiar Nombre de Usuario</label>
              <input type="text" name="nombre" placeholder="Introduzca su nuevo nombre"/>
              <button type="submit" className='bn634-hover bn34'>Cambiar Nombre</button>
            </div>
          </div>
          <br>
          </br>
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
                  <br>
                  </br>
                  <button type="button" className='bn634-hover bn34'><img src={salir} alt='icono de salir' className='icon'></img> Cerrar Sesión</button>
                  <button type="button" className='bn635-hover bn35'><FontAwesomeIcon icon={faTrash} className='icon'/> Borrar Cuenta</button>
        </form>
      </div >
    </div >
  );
};

export default Usuario;

