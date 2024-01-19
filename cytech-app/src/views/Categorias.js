import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CTA from '../components/CTA'; 
import TypingEffect from '../components/TypingEffect';
import Categoria from '../components/Categoria';
import cerebro from '../assets/cerebro.svg';
import brazo from '../assets/brazo.svg';
import medicina from '../assets/medicina.svg';
import mas from '../assets/mas.svg';
import '../css/Inicio.css';


const staticText = "Contribuye en Proyectos sobre ";
const words = ["Innovación", "Tecnología", "Medicina"];
const colors = ["#00bbff", "#ff7700", "#00FF00"];

const items = [
    {
        imgUrl: cerebro,
        title: 'Neurotecnología',
    },
    {
        imgUrl: brazo,
        title: 'Prótesis',
    },
    {
        imgUrl: medicina,
        title: 'Medicina',
    },
    {
        imgUrl: mas,
        title: 'Otros',
    },
];

const Categorias = () => {

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
            <Navbar />
            <div className="home-container">
                <main className="main-content">
                <div className="hero-container">
                    <section className="hero" style={{ transform: getTransformValue() }}>
                        <TypingEffect staticText={staticText} dynamicWords={words} colors={colors} speed={200} />
                        <p>Descubre y financia los proyectos más innovadores en el ámbito de la tecnología y la medicina.</p>
                        <div className="hero-buttons">
                            <button className="bn3">Comenzar un Proyecto</button>
                        </div>
                    </section>
                </div>
                    <Categoria items={items} />
                    <CTA />
                </main>
                <Footer />
            </div>
        </>
    );
}
export default Categorias;