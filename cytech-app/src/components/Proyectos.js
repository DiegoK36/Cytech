import React from 'react';
import '../css/Proyectos.css'; // Asegúrate de que este es el archivo CSS correcto para tu componente Carrusel

const Proyectos = ({ proyecto }) => {
    return (
        <div className="proyectos-container">
            <div className="proyectos">
                {proyecto.map((proyecto, index) => (
                    <div className="proyectos-item" key={index}>
                        <img src={proyecto.imgUrl} alt={proyecto.title} />
                        <h3>{proyecto.title}</h3>
                        <h4 className={proyecto.category_class}>{proyecto.category}</h4>
                        <p>{proyecto.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};


export default Proyectos;