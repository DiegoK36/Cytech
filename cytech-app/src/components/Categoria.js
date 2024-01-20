import React, { useState } from 'react';
import '../css/Categoria.css';

const Categoria = ({ items, onCategoriaClick }) => {
    const [activeItem, setActiveItem] = useState(null);

    const handleCategoriaClick = (categoria) => {
        // Si se hace clic en la misma categoría activa, elimina el filtro
        if (activeItem === categoria) {
            onCategoriaClick(null);
            setActiveItem(null);
        } else {
            // Si se hace clic en una categoría diferente, aplica el filtro
            onCategoriaClick(categoria);
            setActiveItem(categoria);
        }
    };

    return (
        <div className="categoria-container">
            <div className="categoria">
                {items.map((item, index) => (
                    <div
                        className={`categoria-item ${activeItem === item.title ? 'active' : ''}`}
                        key={index}
                        onClick={() => handleCategoriaClick(item.title)}
                    >
                        <img src={item.imgUrl} alt={item.title} />
                        <h3>{item.title}</h3>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Categoria;
