import React, { useState, useRef, useEffect } from 'react';
import '../css/PorqueElegirnos.css';
import Logo from '../assets/Logo2_Cytech.png';

const PorqueElegirnos = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [animationClass, setAnimationClass] = useState('');

  const toggleTab = (index) => {
    setActiveTab(index === activeTab ? -1 : index);
  };

  const sectionRef = useRef(null);

  useEffect(() => {
    const sectionCurrent = sectionRef.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimationClass('slideIn');
        } else {
          setAnimationClass('slideOut');
        }
      },
      { threshold: [0, 1] }
    );

    if (sectionCurrent) {
      observer.observe(sectionCurrent);
    }

    return () => {
      if (sectionCurrent) {
        observer.unobserve(sectionCurrent);
      }
    };
  }, []);

  const accordionItems = [
    { title: "🌟 Comprometidos con la Transparencia", description: "Nuestra plataforma asegura la máxima transparencia en cada proyecto, permitiendo a los patrocinadores ver exactamente cómo se utilizan sus fondos." },
    { title: "🔒 Seguridad en Cada Paso", description: "Implementamos protocolos de seguridad de vanguardia para proteger tus inversiones y la información personal." },
    { title: "🚀 Impacto y Éxito de Proyectos", description: "Contamos con una larga lista de proyectos que han alcanzado y superado sus objetivos, generando un impacto positivo." },
    { title: "💬 Nuestro Soporte y Comunidad", description: "Ofrecemos un espacio para que patrocinadores y creadores interactúen, compartan ideas y construyan una comunidad fuerte." }
  ];

  return (
    <div ref={sectionRef} className={`why-choose-us-container ${animationClass}`}>
      <div className={`content-section ${animationClass}`}>
        <h2>¿Por qué confiar en nosotros?</h2>
        <p>Nuestro objetivo es potenciar y contribuir en proyectos de Tecnología aplicada en Medicina.</p>
        {accordionItems.map((item, index) => (
          <div key={index} className={`accordion-item ${activeTab === index ? 'active' : ''}`}>
            <button className="accordion-title" onClick={() => toggleTab(index)}>
              {item.title}
              <span className={`arrow ${activeTab === index ? 'up' : 'down'}`}></span>
            </button>
            <div className="accordion-content">
              {activeTab === index && <p>{item.description}</p>}
            </div>
          </div>
        ))}
      </div>
      <div className={`image-section ${animationClass}`}>
        <img src={Logo} alt="Nuestra Plataforma" />
      </div>
    </div>
  );
};

export default PorqueElegirnos;
