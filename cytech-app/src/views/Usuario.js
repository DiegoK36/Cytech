import React from 'react';
import '../css/Usuario.css';



const Usuario = () => {
  return (
    <div className='crear-body'>
      <div className='volver-container1'>
                <a href="/">
                <svg role="presentation" aria-hidden="true" viewBox="0 0 28 28" className='volver1'>
                <path d="M11.5 25.2c1.1 0 1.8-.8 1.8-1.7 0-.5-.2-1-.6-1.3L9.5 19 6 15.6l3.2.2h16.6c1.1 0 1.9-.7 1.9-1.8s-.8-1.8-1.9-1.8H9.2l-3.2.2 3.6-3.3 3.2-3.2c.3-.3.6-.8.6-1.3 0-1-.7-1.7-1.8-1.7-.4 0-.9.2-1.3.6L1 12.6c-.4.4-.6.9-.6 1.4s.2 1 .6 1.3l9.3 9.3c.3.4.8.6 1.2.6z" fill='white'></path>
              </svg>
              
                <h3>  Volver</h3>
                </a>
              </div>
      <div className="crear-container">
        <div className='divider'>
              <div className='column'>
                <form>
                    <div className="input-group">
                    <label htmlFor="nombre">Cambiar Nombre</label>
                    <input type="text" name="nombre" placeholder="Introduzca su nuevo nombre" />
                </div>
                <button type='submit' className='button-user'>Cambiar Nombre</button>
                </form>
                <button type='submit' className='button-user'>Cerrar Sesión</button>
                <button type='submit' className='button-user-negative'>Borrar cuenta</button>

                    

                </div>
                <div className='column'>
                        <img src="https://via.placeholder.com/150" alt="Imagen del proyecto" className='userImage'/>
                        <button type='button' className='button-user'>Cambiar Imagen</button>
                </div>

        </div>
      </div>
    </div>
  );
};

export default Usuario;

