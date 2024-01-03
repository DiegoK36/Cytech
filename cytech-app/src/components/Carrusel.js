import React from 'react';
import '../css/Carrusel.css'; // Asegúrate de que este es el archivo CSS correcto para tu componente Carrusel

const Carrusel = ({ items }) => {
    // Duplica los elementos para crear un flujo continuo calvo
    const duplicatedItems = [...items, ...items];

    return (
        <div className="carrusel-container">
            <div className="carrusel">
                {duplicatedItems.map((item, index) => (
                    <div className="carrusel-item" key={index}>
                        <img src={item.imgUrl} alt={item.title} />
                        <h3><a href="tu-enlace-aquí">{item.title}</a></h3>
                        <p>{item.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Carrusel;

