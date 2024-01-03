import React, { useState, useEffect } from 'react';
import '../css/CTA.css';

const CTA = () => {
    const [isVisible, setIsVisible] = useState(true);
  
    useEffect(() => {
      const checkPosition = () => {
        const footer = document.querySelector('footer');
        const footerPosition = footer.getBoundingClientRect().top;
        const screenHeight = window.innerHeight;
  
        if (footerPosition <= screenHeight) {
          setIsVisible(false);
        } else {
          setIsVisible(true);
        }
      };
  
      window.addEventListener('scroll', checkPosition);
      checkPosition(); // Llama a checkPosition al montar para establecer la visibilidad inicial
  
      return () => {
        window.removeEventListener('scroll', checkPosition);
      };
    }, []); // Las dependencias están vacías, por lo que el efecto solo se ejecuta al montar y desmontar
  
    return (
      <div className="cta-container" style={{ display: isVisible ? 'block' : 'none' }}>
        <a href='#newsletter'>
          <button className="cta-button">
          Únete a Nosotros
          </button>
        </a>
      </div>
    );
  };
  
  export default CTA;