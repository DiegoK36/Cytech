import React, { useState, useEffect } from 'react';
import '../css/Navbar.css';
import logo from '../assets/Logo_Cytech.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faProjectDiagram, faThList, faUsers, faQuestionCircle } from '@fortawesome/free-solid-svg-icons';

function Navbar() {

    const [scrolled, setScrolled] = useState(false);

    const handleScroll = () => {
        const offset = window.scrollY;
        if (offset > 10) {
            setScrolled(true);
        } else {
            setScrolled(false);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    let navbarClasses = ['navbar'];
    if (scrolled) {
        navbarClasses.push('scrolled');
    }

    return (
        <nav className={navbarClasses.join(' ')}>
            <div className="navbar-brand">
                <img src={logo} alt="Cytech Logo" className="navbar-logo" />
                <span className="navbar-title">Cytech</span>
            </div>

            {/* Los enlaces centrados */}
            <div className="navbar-links">
                <a href="/home"><FontAwesomeIcon icon={faHome} /> Inicio</a>
                <a href="/projects"><FontAwesomeIcon icon={faProjectDiagram} /> Proyectos</a>
                <a href="/categories"><FontAwesomeIcon icon={faThList} /> Categorías</a>
                <a href="/about-us"><FontAwesomeIcon icon={faUsers} /> Sobre Nosotros</a>
                <a href="/support"><FontAwesomeIcon icon={faQuestionCircle} /> Soporte</a>
            </div>

            {/* Botones de inicio de sesión y registro a la derecha */}
            <div className="navbar-buttons">
                <button className="btn btn-light">Iniciar Sesión</button>
                <button className="btn btn-dark">Registrarse</button>
            </div>
        </nav>
    );
}

export default Navbar;

