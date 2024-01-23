import NavbarUser from '../components/NavbarUser';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CTA from '../components/CTA';
import TypingEffect from '../components/TypingEffect';
import NeuroSync from '../assets/NeuroSync.png';
import cat1 from '../assets/cat1.png'
import cat2 from '../assets/cat2.png'
import cat3 from '../assets/cat3.png'
import cat4 from '../assets/cat4.png'
import '../css/Categoria.css';

const staticText = "Contribuye en Proyectos sobre ";
const words = ["Neurotecnología", "Tratamientos IA", "Prótesis Inteligentes", "Salud Digital"];
const colors = ["#00bbff", "#ff7700", "#00FF00", "#00FF00"];

<<<<<<< HEAD
=======
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
const proyecto = [
    {
        imgUrl: NeuroSync,
        title: 'NeuroSync - Neurorehabilitación',
        category_class: 'neurotecnologia',
        category: 'Neurotecnología',
        description: 'NeuroSync es un innovador sistema de realidad virtual que acelera la recuperación de pacientes con lesiones cerebrales.'
    },
    {
        imgUrl: CardioNet,
        title: 'CardioNet - Monitoreo Cardíaco',
        category_class: 'otro',
        category: 'Otros',
        description: 'CardioNet es un dispositivo portátil que proporciona monitoreo cardíaco en tiempo real utilizando inteligencia artificial.'
    },
    {
        imgUrl: SkinScan,
        title: 'SkinScan - Diagnóstico de Piel',
        category_class: 'otro',
        category: 'Otros',
        description: 'SkinScan es una aplicación móvil avanzada que utiliza el aprendizaje automático para analizar y diagnosticar una variedad de condiciones de la piel.'
    },
    {
        imgUrl: MediPrint,
        title: 'MediPrint - Prótesis en 3D',
        category_class: 'protesis',
        category: 'Prótesis',
        description: 'MediPrint revoluciona el campo de las prótesis con su tecnología de impresión 3D, ofreciendo soluciones personalizadas y de bajo costo.'
    },
    {
        imgUrl: OncoTech,
        title: 'OncoTech - Genóma del Cáncer',
        category_class: 'medicina',
        category: 'Medicina',
        description: 'OncoTech es una plataforma de análisis genómico que proporciona una comprensión profunda de la genética del cáncer.'
    },
    {
        imgUrl: NeuroSync,
        title: 'NeuroSync - Neurorehabilitación',
        category_class: 'neurotecnologia',
        category: 'Neurotecnología',
        description: 'NeuroSync es un innovador sistema de realidad virtual que acelera la recuperación de pacientes con lesiones cerebrales.'
    },
    {
        imgUrl: CardioNet,
        title: 'CardioNet - Monitoreo Cardíaco',
        category_class: 'otro',
        category: 'Otros',
        description: 'CardioNet es un dispositivo portátil que proporciona monitoreo cardíaco en tiempo real utilizando inteligencia artificial.'
    },
    {
        imgUrl: SkinScan,
        title: 'SkinScan - Diagnóstico de Piel',
        category_class: 'otro',
        category: 'Otros',
        description: 'SkinScan es una aplicación móvil avanzada que utiliza el aprendizaje automático para analizar y diagnosticar una variedad de condiciones de la piel.'
    },
    {
        imgUrl: MediPrint,
        title: 'MediPrint - Prótesis en 3D',
        category_class: 'protesis',
        category: 'Prótesis',
        description: 'MediPrint revoluciona el campo de las prótesis con su tecnología de impresión 3D, ofreciendo soluciones personalizadas y de bajo costo.'
    },
    {
        imgUrl: OncoTech,
        title: 'OncoTech - Genóma del Cáncer',
        category_class: 'medicina',
        category: 'Medicina',
        description: 'OncoTech es una plataforma de análisis genómico que proporciona una comprensión profunda de la genética del cáncer.'
    },
];
>>>>>>> 7824f2aa1e97586b9b247432966f360be774d8f5
const Categorias = () => {
    const [activeCategoria, setActiveCategoria] = useState(null);
    const [filteredProyectos, setFilteredProyectos] = useState(proyecto);

    const handleCategoriaClick = (categoria) => {
        setActiveCategoria(categoria);

        // Aplica el filtro o restablece si la categoría es null
        setFilteredProyectos(
            categoria
                ? proyecto.filter((proyecto) => proyecto.category === categoria)
                : proyecto
        );
    };


    // Verifica si existe un token en el almacenamiento local
    const hasToken = !!localStorage.getItem('token');

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
                            <TypingEffect staticText={staticText} dynamicWords={words} colors={colors} speed={200} />
                            <p>Escoge una de nuestras categorías, explora y contrubuye sobre los proyectos más innovadores de la industria digital en medicina.</p>
                        </section>
                    </div>
                    <div className="cards-container">
                        <div className="card-container">
                            <div className="container noselect">
                                <div className="canvas">
                                    <div className="tracker tr-1"></div>
                                    <div className="tracker tr-2"></div>
                                    <div className="tracker tr-3"></div>
                                    <div className="tracker tr-4"></div>
                                    <div className="tracker tr-5"></div>
                                    <div className="tracker tr-6"></div>
                                    <div className="tracker tr-7"></div>
                                    <div className="tracker tr-8"></div>
                                    <div className="tracker tr-9"></div>
                                    <div className="tracker tr-10"></div>
                                    <div className="tracker tr-11"></div>
                                    <div className="tracker tr-12"></div>
                                    <div className="tracker tr-13"></div>
                                    <div className="tracker tr-14"></div>
                                    <div className="tracker tr-15"></div>
                                    <div className="tracker tr-16"></div>
                                    <div className="tracker tr-17"></div>
                                    <div className="tracker tr-18"></div>
                                    <div className="tracker tr-19"></div>
                                    <div className="tracker tr-20"></div>
                                    <div className="tracker tr-21"></div>
                                    <div className="tracker tr-22"></div>
                                    <div className="tracker tr-23"></div>
                                    <div className="tracker tr-24"></div>
                                    <div className="tracker tr-25"></div>
                                    <div id="card" className="card card-color-1">
                                            <img src={cat1} alt="Imagen de Neurotecnología" className="card-image" />
                                            <p className="prompt prompt-1">Neurotecnología</p>
                                    </div>
                                </div>
                            </div>
                        </div>
<<<<<<< HEAD
                        <div className="card-container">
                            <div className="container noselect">
                                <div className="canvas">
                                    <div className="tracker tr-1"></div>
                                    <div className="tracker tr-2"></div>
                                    <div className="tracker tr-3"></div>
                                    <div className="tracker tr-4"></div>
                                    <div className="tracker tr-5"></div>
                                    <div className="tracker tr-6"></div>
                                    <div className="tracker tr-7"></div>
                                    <div className="tracker tr-8"></div>
                                    <div className="tracker tr-9"></div>
                                    <div className="tracker tr-10"></div>
                                    <div className="tracker tr-11"></div>
                                    <div className="tracker tr-12"></div>
                                    <div className="tracker tr-13"></div>
                                    <div className="tracker tr-14"></div>
                                    <div className="tracker tr-15"></div>
                                    <div className="tracker tr-16"></div>
                                    <div className="tracker tr-17"></div>
                                    <div className="tracker tr-18"></div>
                                    <div className="tracker tr-19"></div>
                                    <div className="tracker tr-20"></div>
                                    <div className="tracker tr-21"></div>
                                    <div className="tracker tr-22"></div>
                                    <div className="tracker tr-23"></div>
                                    <div className="tracker tr-24"></div>
                                    <div className="tracker tr-25"></div>
                                    <div id="card" className="card card-color-2">
                                            <img src={cat2} alt="Imagen de Neurotecnología" className="card-image" />
                                            <p className="prompt prompt-2">Tratamientos IA</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="card-container">
                            <div className="container noselect">
                                <div className="canvas">
                                    <div className="tracker tr-1"></div>
                                    <div className="tracker tr-2"></div>
                                    <div className="tracker tr-3"></div>
                                    <div className="tracker tr-4"></div>
                                    <div className="tracker tr-5"></div>
                                    <div className="tracker tr-6"></div>
                                    <div className="tracker tr-7"></div>
                                    <div className="tracker tr-8"></div>
                                    <div className="tracker tr-9"></div>
                                    <div className="tracker tr-10"></div>
                                    <div className="tracker tr-11"></div>
                                    <div className="tracker tr-12"></div>
                                    <div className="tracker tr-13"></div>
                                    <div className="tracker tr-14"></div>
                                    <div className="tracker tr-15"></div>
                                    <div className="tracker tr-16"></div>
                                    <div className="tracker tr-17"></div>
                                    <div className="tracker tr-18"></div>
                                    <div className="tracker tr-19"></div>
                                    <div className="tracker tr-20"></div>
                                    <div className="tracker tr-21"></div>
                                    <div className="tracker tr-22"></div>
                                    <div className="tracker tr-23"></div>
                                    <div className="tracker tr-24"></div>
                                    <div className="tracker tr-25"></div>
                                    <div id="card" className="card card-color-3">
                                        <img src={cat3} alt="Imagen de Neurotecnología" className="card-image" />
                                        <p className="prompt prompt-3">Prótesis Inteligentes</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="card-container">
                            <div className="container noselect">
                                <div className="canvas">
                                    <div className="tracker tr-1"></div>
                                    <div className="tracker tr-2"></div>
                                    <div className="tracker tr-3"></div>
                                    <div className="tracker tr-4"></div>
                                    <div className="tracker tr-5"></div>
                                    <div className="tracker tr-6"></div>
                                    <div className="tracker tr-7"></div>
                                    <div className="tracker tr-8"></div>
                                    <div className="tracker tr-9"></div>
                                    <div className="tracker tr-10"></div>
                                    <div className="tracker tr-11"></div>
                                    <div className="tracker tr-12"></div>
                                    <div className="tracker tr-13"></div>
                                    <div className="tracker tr-14"></div>
                                    <div className="tracker tr-15"></div>
                                    <div className="tracker tr-16"></div>
                                    <div className="tracker tr-17"></div>
                                    <div className="tracker tr-18"></div>
                                    <div className="tracker tr-19"></div>
                                    <div className="tracker tr-20"></div>
                                    <div className="tracker tr-21"></div>
                                    <div className="tracker tr-22"></div>
                                    <div className="tracker tr-23"></div>
                                    <div className="tracker tr-24"></div>
                                    <div className="tracker tr-25"></div>
                                    <div id="card" className="card card-color-4">
                                        <img src={cat4} alt="Imagen de Neurotecnología" className="card-image" />
                                        <p className="prompt prompt-4">Salud Digital</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
=======
                    </section>
                </div>
                    <div className="section-title-container">
                    <h3 className="section-title">Categorías</h3>
                    </div>
                    <Categoria items={items} onCategoriaClick={handleCategoriaClick} />
                    <div className="section-title-container">
                    <h3 className="section-title">Proyectos</h3>
                    </div>
                    <Proyecto proyecto={filteredProyectos} />
>>>>>>> 7824f2aa1e97586b9b247432966f360be774d8f5
                    <CTA />
                </main>
                <Footer />
            </div>
        </>
    );
}
export default Categorias;