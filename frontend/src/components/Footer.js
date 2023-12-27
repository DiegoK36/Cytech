import React from 'react';
import '../css/Footer.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faInstagram, faTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons';

function Footer() {
    return (
        <footer className="footer">
            <div className="footer-top">
                <div className="newsletter-description">
                    <h3>Recibe más Información</h3>
                    <p>Estate al tanto de proyectos nuevos y en tendencia.</p>
                </div>
                <div className="newsletter-subscribe">
                    <input type="email" placeholder="Introduce tu Email" aria-label="Email para Contactarte" />
                    <button type="submit">¡Envíamelo!</button>
                </div>
            </div>
            <hr />
            <div className="footer-bottom">
                <p>© 2023 Cytech Company, Inc. All rights reserved.</p>
                <div className="social-icons">
                    <a href="https://github.com/DiegoK36/Cytech" aria-label="GitHub">
                        <FontAwesomeIcon icon={faGithub} />
                    </a>
                    <a href="https://instagram.com" aria-label="Instagram">
                        <FontAwesomeIcon icon={faInstagram} />
                    </a>
                    <a href="https://twitter.com" aria-label="Twitter">
                        <FontAwesomeIcon icon={faTwitter} />
                    </a>
                    <a href="https://youtube.com" aria-label="Youtube">
                        <FontAwesomeIcon icon={faYoutube} />
                    </a>
                </div>
            </div>
        </footer>
    );
}

export default Footer;

