import React from 'react';
import '../css/Mision.css'; // Asegúrate de crear este archivo CSS y referenciarlo aquí

const Mision = () => {
  return (
    <div className="mission-vision-values-container">
      <div className="mission">
        <h3>Misión</h3>
        <p>Nuestra misión es innovar y revolucionar el campo de la tecnología médica para mejorar la calidad de vida de las personas en todo el mundo.</p>
      </div>
      <div className="vision">
        <h3>Visión</h3>
        <p>Aspiramos a ser líderes globales en tecnología médica, proporcionando soluciones avanzadas y accesibles para todos.</p>
      </div>
      <div className="values">
        <h3>Valores</h3>
        <ul>
          <li>Innovación constante</li>
          <li>Compromiso con la calidad</li>
          <li>Integridad y ética</li>
          <li>Colaboración y comunidad</li>
        </ul>
      </div>
    </div>
  );
};

export default Mision;
