import React, { useState, useEffect } from 'react';
import '../css/Navbar.css';
import logo from '../assets/Logo_Cytech.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faProjectDiagram, faUsers, faHome } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

function NavbarUser() {

    const [scrolled, setScrolled] = useState(false);
    const [user, setUser] = useState(null);
    let navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (token) {
            fetch('http://localhost:3001/api/perfil', {
                method: 'GET',
                headers: {
                    'Authorization': token,
                },
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Token inválido o ausente');
                    }
                    return response.json();
                })
                .then(data => {
                    setUser(data); // Actualiza el estado con la información del usuario
                })
                .catch(error => {
                    console.error('Error:', error);
                    localStorage.removeItem('token'); // Remover el token inválido o caducado
                    localStorage.removeItem('userId'); // Remover el ID del usuario
                    navigate('/login'); // Redirige al usuario a la página de inicio de sesión
                });
        } else {
            navigate('/login'); // Si no hay token, redirige al inicio de sesión
        }
    }, [navigate]);

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

            <div className="navbar-user">
                {user && (
                    <>
                    <a href="/usuario">
                        <img src={user.profilePictureURL} alt="Perfil" className="navbar-logo-2" />
                        <span className="navbar-user">{user.username}</span>
                    </a>
                    </>
                )}
            </div>
        </nav>
    );
}

export default NavbarUser;

