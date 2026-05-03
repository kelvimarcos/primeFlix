import { Link } from "react-router-dom";
import './erro.css';

function Erro() {
    return (
        <main className="erro-page">
            <div className="erro-inner">
                {/* Film reel SVG */}
                <svg className="erro-illustration" width="80" height="80" viewBox="0 0 80 80" fill="none">
                    <circle cx="40" cy="40" r="32" stroke="var(--text-muted)" strokeWidth="1.5" strokeDasharray="4 3"/>
                    <circle cx="40" cy="40" r="8" stroke="var(--accent)" strokeWidth="1.5" opacity="0.6"/>
                    <circle cx="40" cy="18" r="4" fill="var(--bg-tertiary)"/>
                    <circle cx="40" cy="62" r="4" fill="var(--bg-tertiary)"/>
                    <circle cx="18" cy="40" r="4" fill="var(--bg-tertiary)"/>
                    <circle cx="62" cy="40" r="4" fill="var(--bg-tertiary)"/>
                    <circle cx="24.5" cy="24.5" r="3.5" fill="var(--bg-tertiary)"/>
                    <circle cx="55.5" cy="55.5" r="3.5" fill="var(--bg-tertiary)"/>
                    <circle cx="55.5" cy="24.5" r="3.5" fill="var(--bg-tertiary)"/>
                    <circle cx="24.5" cy="55.5" r="3.5" fill="var(--bg-tertiary)"/>
                </svg>

                <h1 className="erro-code">
                    <span className="erro-glitch" data-text="404">404</span>
                </h1>
                <h2 className="erro-title">Cena não encontrada</h2>
                <p className="erro-text">
                    Esta cena foi cortada da edição final.
                    <br />
                    O diretor removeu esta página do roteiro.
                </p>
                <Link to="/" className="erro-btn">
                    Voltar ao início
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                </Link>
            </div>
        </main>
    );
}

export default Erro;