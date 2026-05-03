import './header.css';
import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

function Header() {
    const location = useLocation();
    const [scrolled, setScrolled] = useState(false);
    const [favCount, setFavCount] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const minhaLista = localStorage.getItem('@primeflix');
        const filmes = JSON.parse(minhaLista) || [];
        setFavCount(filmes.length);
    }, [location]);

    return (
        <header className={`header ${scrolled ? 'header--scrolled' : ''}`}>
            <nav className="header__nav">
                <Link className="header__logo" to="/">
                    {/* Custom film strip SVG icon */}
                    <svg className="header__logo-svg" width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="2" y="4" width="20" height="16" rx="2" stroke="currentColor" strokeWidth="1.5"/>
                        <rect x="5" y="4" width="3" height="3" fill="currentColor" opacity="0.4"/>
                        <rect x="10" y="4" width="3" height="3" fill="currentColor" opacity="0.4"/>
                        <rect x="16" y="4" width="3" height="3" fill="currentColor" opacity="0.4"/>
                        <rect x="5" y="17" width="3" height="3" fill="currentColor" opacity="0.4"/>
                        <rect x="10" y="17" width="3" height="3" fill="currentColor" opacity="0.4"/>
                        <rect x="16" y="17" width="3" height="3" fill="currentColor" opacity="0.4"/>
                        <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5"/>
                    </svg>
                    <span className="header__logo-text">
                        Prime<span className="header__logo-accent">Flix</span>
                    </span>
                </Link>

                <div className="header__links">
                    <Link
                        className={`header__link ${location.pathname === '/' ? 'header__link--active' : ''}`}
                        to="/"
                    >
                        Início
                    </Link>
                    <Link
                        className={`header__link ${location.pathname === '/favoritos' ? 'header__link--active' : ''}`}
                        to="/favoritos"
                    >
                        Meus Filmes
                        {favCount > 0 && (
                            <span className="header__badge">{favCount}</span>
                        )}
                    </Link>
                </div>
            </nav>
        </header>
    );
}

export default Header;