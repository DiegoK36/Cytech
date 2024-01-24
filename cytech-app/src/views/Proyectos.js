import { useEffect, useState } from 'react';
import NavbarUser from '../components/NavbarUser';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CTA from '../components/CTA';
import { useNavigate } from 'react-router-dom';
import '../css/Proyectos.css';
import NeuroSync from '../assets/NeuroSync.png';
import CardioNet from '../assets/Cardionet.png';
import SkinScan from '../assets/SkinScan.png';
import MediPrint from '../assets/MediPrint.png';
import OncoTech from '../assets/OncoTech.png';

const items = [
    {
        imgUrl: NeuroSync,
        title: 'NeuroSync - Neurorehabilitación',
        description: 'NeuroSync es un innovador sistema de realidad virtual que acelera la recuperación de pacientes con lesiones cerebrales.'
    },
    {
        imgUrl: CardioNet,
        title: 'CardioNet - Monitoreo Cardíaco',
        description: 'CardioNet es un dispositivo portátil que proporciona monitoreo cardíaco en tiempo real utilizando inteligencia artificial.'
    },
    {
        imgUrl: SkinScan,
        title: 'SkinScan - Diagnóstico de Piel',
        description: 'SkinScan es una aplicación móvil avanzada que utiliza el aprendizaje automático para analizar y diagnosticar una variedad de condiciones de la piel.'
    },
    {
        imgUrl: MediPrint,
        title: 'MediPrint - Prótesis en 3D',
        description: 'MediPrint revoluciona el campo de las prótesis con su tecnología de impresión 3D, ofreciendo soluciones personalizadas y de bajo costo.'
    },
    {
        imgUrl: OncoTech,
        title: 'OncoTech - Genóma del Cáncer',
        description: 'OncoTech es una plataforma de análisis genómico que proporciona una comprensión profunda de la genética del cáncer.'
    }
];

const Proyectos = () => {
    // Verifica si existe un token en el almacenamiento local
    const hasToken = !!localStorage.getItem('token');
    const [setProyectos] = useState([]);
    const selectedCategory = localStorage.getItem('selectedCategory');
    const navigate = useNavigate();

    useEffect(() => {
        // Realiza una solicitud GET al servidor para obtener proyectos de la categoría seleccionada
        fetch(`https://localhost:3001/api/obtener-proyectos?category=${encodeURIComponent(selectedCategory)}`)
            .then((response) => response.json())
            .then((data) => {
                setProyectos(data); // Almacena los proyectos en el estado
            })
            .catch((error) => {
                console.error('Error al obtener proyectos:', error);
            });
    }, [selectedCategory]);


    const getTransformValue = () => {
        const displacementFactor = 9; // FACTOR DE DESPLAZAMIENTO
        const heroSection = document.querySelector('.hero');
        if (heroSection) {
            const heroHeight = heroSection.offsetHeight;
            const maxDisplacement = heroHeight * displacementFactor;
            const displacement = Math.min(displacementFactor, maxDisplacement);
            return `translateX(${displacement}px)`;
        }
        return 'translateX(0px)';
    };

    return (
        <>
            {hasToken ? <NavbarUser /> : <Navbar />} {/* Muestra NavbarUser si hay token, de lo contrario, muestra el Navbar normal */}
            <div className="home-container">
                <main className="main-content">
                    <div className="hero-container">
                        <section className="hero" style={{ transform: getTransformValue() }}>
                            <h2>¡Descubre nuestra lista de <span className="title">Proyectos!</span></h2>
                            <p>A continuación se muestran todos los proyectos de la categoría en cuestión</p>
                        </section>
                    </div>
                    <div className="carrusel-container2">
                        {items.map((proyecto, index) => (
                            <div className="carrusel-item1" key={index}>
                                <img src={proyecto.imgUrl} alt={proyecto.title} />
                                <h3><a href="tu-enlace-aquí">{proyecto.title}</a></h3>
                                <p>{proyecto.description}</p>
                                <div className="barra-donaciones">
                                    {/* Aquí puedes añadir la barra de donaciones */}
                                    <progress value={Math.floor(Math.random() * 100)} max="100"></progress>
                                </div>
                                <button className="btn-ver-mas" onClick={() => navigate(`/proyecto`)}>Ver más</button>
                            </div>
                        ))}
                    </div>
                    <CTA />
                </main >
                <Footer />
            </div >
        </>
    );
};

export default Proyectos;