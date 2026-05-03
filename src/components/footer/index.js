import './footer.css';
import { Link } from 'react-router-dom';

function Footer() {
    return (
        <footer className="footer">
            <div className="footer__inner">
                {/* Brand */}
                <div className="footer__brand">
                    <Link to="/" className="footer__logo">
                        <svg className="footer__logo-svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <rect x="2" y="4" width="20" height="16" rx="2" stroke="currentColor" strokeWidth="1.5"/>
                            <rect x="5" y="4" width="3" height="3" fill="currentColor" opacity="0.4"/>
                            <rect x="10" y="4" width="3" height="3" fill="currentColor" opacity="0.4"/>
                            <rect x="16" y="4" width="3" height="3" fill="currentColor" opacity="0.4"/>
                            <rect x="5" y="17" width="3" height="3" fill="currentColor" opacity="0.4"/>
                            <rect x="10" y="17" width="3" height="3" fill="currentColor" opacity="0.4"/>
                            <rect x="16" y="17" width="3" height="3" fill="currentColor" opacity="0.4"/>
                            <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5"/>
                        </svg>
                        <span>Prime<span className="footer__accent">Flix</span></span>
                    </Link>
                    <p className="footer__tagline">
                        Sua plataforma de filmes. Descubra, salve e assista.
                    </p>
                </div>


                {/* Credits */}
                <div className="footer__links">
                    <h4 className="footer__links-title">Créditos</h4>
                    <a
                        href="https://www.themoviedb.org/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="footer__link"
                    >
                        Dados por TMDB
                    </a>
                    <a
                        href="https://github.com/kelvimarcos"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="footer__link"
                    >
                        GitHub
                    </a>
                </div>
            </div>

            {/* Bottom bar */}
            <div className="footer__bottom">
                <p>&copy; {new Date().getFullYear()} PrimeFlix. Todos os direitos reservados.</p>
            </div>
        </footer>
    );
}

export default Footer;
