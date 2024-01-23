import React, { useState, useEffect } from 'react';
import '../css/Navbar.css';
import logo from '../assets/Logo_Cytech.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faProjectDiagram, faUsers, faHome } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

function Navbar() {

    let navigate = useNavigate();

    const handleRegisterClick = () => {
      navigate('/registro');
    };
    const handleLoginClick = () => {
        navigate('/login');
    };

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

            <div className="navbar-links">
                <a href="/"><FontAwesomeIcon icon={faHome} /> Inicio</a>
                <a href="/categorias"><FontAwesomeIcon icon={faProjectDiagram} /> Proyectos</a>
                <a href="/"><FontAwesomeIcon icon={faUsers} /> Sobre Nosotros</a>
            </div>

            {/* Botones de inicio de sesión y registro a la derecha */}
            <div className="navbar-buttons">
                <button className="btn-light" onClick={handleLoginClick}>Iniciar Sesión</button>
                <button className="btn btn-dark" onClick={handleRegisterClick}>Registrarse</button>
            </div>
        </nav>
    );
}

export default Navbar;

