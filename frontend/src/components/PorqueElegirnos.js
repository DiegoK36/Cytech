import React, { useState } from 'react';
import '../css/PorqueElegirnos.css'; 
import Logo from '../assets/Logo2_Cytech.png';

const PorqueElegirnos = () => {
    const [activeTab, setActiveTab] = useState(null);

    const toggleTab = (index) => {
      setActiveTab(activeTab === index ? null : index);
    };
  
    return (
      <div className="why-choose-us-container">
        <div className="content-section">
          <h2>¿Por qué elegirnos?</h2>
          <p>Hacemos que la recopilación de datos médicos sea menos abrumadora</p>
          {["Crear", "Conectar", "Compartir", "Resultados"].map((item, index) => (
            <div key={index} className={`accordion-item ${activeTab === index ? 'active' : ''}`}>
              <button className="accordion-title" onClick={() => toggleTab(index)}>
                {item}
              </button>
              <div className="accordion-content">
                {activeTab === index && (
                  <p>Información detallada sobre {item}.</p>
                )}
              </div>
            </div>
          ))}
        </div>
        <div className="image-section">
          <img src={Logo} alt="Nuestra Plataforma" />
        </div>
      </div>
    );
  };

export default PorqueElegirnos;
