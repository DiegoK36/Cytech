import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CTA from '../components/CTA'; 
import TypingEffect from '../components/TypingEffect';
import Carrusel from '../components/Carrusel';
import Mision from '../components/Mision';
import PorqueElegirnos from '../components/PorqueElegirnos';
import NeuroSync from '../assets/NeuroSync.png';
import CardioNet from '../assets/Cardionet.png';
import SkinScan from '../assets/SkinScan.png';
import MediPrint from '../assets/MediPrint.png';
import OncoTech from '../assets/OncoTech.png';
import '../css/Inicio.css';


const staticText = "Contribuye en Proyectos sobre ";
const words = ["Innovación", "Tecnología", "Medicina"];
const colors = ["#00bbff", "#ff7700", "#00FF00"];

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

const Inicio = () => {
    
    const [, setScrollPosition] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const position = window.pageYOffset;
            setScrollPosition(position);
        };
    
        window.addEventListener('scroll', handleScroll, { passive: true });
    
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

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
    const handleClickCategory = () => {
        window.location.href = '/categorias';
    };
    return (
        <>
            <Navbar />
            <div className="home-container">
                <main className="main-content">
                <div className="hero-container">
                    <section className="hero" style={{ transform: getTransformValue() }}>
                        <TypingEffect staticText={staticText} dynamicWords={words} colors={colors} speed={200} />
                        <p>Descubre y financia los proyectos más innovadores en el ámbito de la tecnología y la medicina.</p>
                        <div className="hero-buttons">
                            <button className="bn632-hover bn23" onClick={handleClickCategory}>Explorar Proyectos</button>
                            <button className="bn3">Comenzar un Proyecto</button>
                        </div>
                    </section>
                </div>
                    <Carrusel items={items} />
                    <CTA />
                    <PorqueElegirnos />
                    <Mision />
                </main>
                <Footer />
            </div>
        </>
    );
}

export default Inicio;
