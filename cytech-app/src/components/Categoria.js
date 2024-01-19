import React from 'react';
import '../css/Categoria.css';

const Categoria = ({ items }) => {
    return (
        <div className="categoria-container">
            <div className="categoria">
                {items.map((item, index) => (
                    <div className="categoria-item" key={index}>
                        <img src={item.imgUrl} alt={item.title} />
                        <h3>{item.title}</h3>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Categoria;