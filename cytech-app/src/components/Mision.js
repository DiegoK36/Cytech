import React, { useEffect, useRef } from 'react';
import inn from '../assets/Innovacion.png'
import vida from '../assets/Vida.png'
import apoyo from '../assets/Apoyo.png'
import '../css/Mision.css';

const Mision = () => {

  const missionRef = useRef();
  const visionRef = useRef();
  const valuesRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        } else {
          entry.target.classList.remove("visible");
        }
      });
    }, {
      threshold: 0.1 // Ajustar según sea necesario
    });
  
    observer.observe(missionRef.current);
    observer.observe(visionRef.current);
    observer.observe(valuesRef.current);
  
    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div className="mission-vision-values-container">
    <div ref={missionRef} className="animated-element">
      <div className="card-image">
        <img src={inn} alt="Misión" />
      </div>
      <div className="card-text">
<<<<<<< HEAD
        <h3>🔬 Revolución en Tecnología Médica</h3>
=======
        <h3>🔬 Revolución en <span className='gradient-text'>Tecnología</span> Médica</h3>
>>>>>>> victor
        <p>Explora y colabora en el futuro de la Medicina con Cytech, donde nos dedicamos a impulsar los avances que redefinen la atención médica.</p>
      </div>
    </div>
    <div ref={visionRef} className="vision animated-element">
      <div className="card-text">
<<<<<<< HEAD
        <h3>¡Transforma la Vida de las Personas! 👨‍⚕️</h3>
=======
        <h3><span className='gradient-text2'>Transforma</span> la Vida de las Personas 👨‍⚕️</h3>
>>>>>>> victor
        <p>Cada innovación tiene una historia humana, por tanto, tu contribución no solo impulsa el futuro de la tecnología, sino que cambia vidas. </p>
      </div>
      <div className="card-image">
        <img src={vida} alt="Visión" />
      </div>
    </div>
    <div ref={valuesRef} className="animated-element">
      <div className="card-image">
        <img src={apoyo} alt="Valores" />
      </div>
      <div className="card-text">
<<<<<<< HEAD
        <h3>🌍 Únete a la Revolución Médica</h3>
=======
        <h3>🌍 Únete a la <span className='gradient-text3'>Revolución</span> Médica</h3>
>>>>>>> victor
        <p>Ya seas un innovador en busca de apoyo, un financiador con visión de futuro, o alguien con el deseo de contribuir al bienestar global, tu papel es crucial.</p>
      </div>
    </div>
  </div>
);
};


export default Mision;
