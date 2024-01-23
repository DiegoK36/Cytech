import React from 'react';
import '../css/Proyecto.css';
import imagen_proyecto from '../assets/cat4.png';


const Crear = () => {

  return (
    <div className='crear-body'>
      <div className="crear-container">
        <div className='volver-container'>
            <a href="/">
              <svg role="presentation" aria-hidden="true" viewBox="0 0 28 28" className='volver'>
                <path d="M11.5 25.2c1.1 0 1.8-.8 1.8-1.7 0-.5-.2-1-.6-1.3L9.5 19 6 15.6l3.2.2h16.6c1.1 0 1.9-.7 1.9-1.8s-.8-1.8-1.9-1.8H9.2l-3.2.2 3.6-3.3 3.2-3.2c.3-.3.6-.8.6-1.3 0-1-.7-1.7-1.8-1.7-.4 0-.9.2-1.3.6L1 12.6c-.4.4-.6.9-.6 1.4s.2 1 .6 1.3l9.3 9.3c.3.4.8.6 1.2.6z" fill='white'></path>
              </svg>
            </a>
            <h2> Nombre del Proyecto</h2>
          </div>
          <div className='proyecto-container'>
            <div className='img-proyecto-container'>
                <img src={imagen_proyecto} alt="Imagen de proyecto" className='img-proyecto'/>
                <p>descripcion del proyecto blablabla a rellenar con lo que haya texto texto texto texto</p>
            </div>
            <div className='info-proyecto-container'>
                <div>
                   <h3>Nombre del creador</h3>
                    <h4>Mariito</h4> 
                </div>
                <div>
                    <h3>Presupuesto</h3>
                    <h4>1000€</h4>
                </div>
                <div>
                    <h3>Llevamos</h3>
                    <h4>500€</h4>
                </div>
                <div>
                    <h3>Fecha Límite</h3>
                    <h4>12/12/2025</h4>
                </div>
                <div>
                    <h3>Categoría</h3>
                    <h4>Neurotecnología</h4>
                </div>
            </div>
          </div>
          
        <button className='card1'>
        <span></span>
        <span></span>
        <span></span>
        <span></span> Financiar Proyecto
        </button>
        </div>
        </div>
    
  );
};

export default Crear;