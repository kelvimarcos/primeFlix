import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import './favoritos.css';

function Favoritos() {
    const [filmes, setFilmes] = useState([]);
    const [removingId, setRemovingId] = useState(null);
    const [toast, setToast] = useState(null);

    useEffect(() => {
        const minhaLista = localStorage.getItem('@primeflix');
        setFilmes(JSON.parse(minhaLista) || []);
    }, []);

    function showToast(message, type = 'success') {
        setToast({ message, type });
        setTimeout(() => setToast(null), 3000);
    }

    function excluirFilme(id) {
        setRemovingId(id);

        setTimeout(() => {
            const novaLista = filmes.filter((item) => item.id !== id);
            setFilmes(novaLista);
            localStorage.setItem('@primeflix', JSON.stringify(novaLista));
            setRemovingId(null);
            showToast('Filme removido da coleção', 'error');
        }, 350);
    }

    return (
        <main className="favoritos-page">
            {/* Toast */}
            {toast && (
                <div className="toast-container">
                    <div className={`toast toast-${toast.type}`}>
                        <span className="toast-dot"></span>
                        {toast.message}
                    </div>
                </div>
            )}

            {/* Page Header */}
            <section className="fav-header">
                <h1 className="fav-header__title">Minha Coleção</h1>
                <p className="fav-header__count">
                    {filmes.length > 0
                        ? `${filmes.length} ${filmes.length === 1 ? 'filme salvo' : 'filmes salvos'}`
                        : 'Nenhum filme salvo'
                    }
                </p>
            </section>

            {filmes.length === 0 ? (
                /* Empty State */
                <section className="fav-empty">
                    <div className="fav-empty__inner">
                        {/* Film strip SVG illustration */}
                        <svg className="fav-empty__illustration" width="120" height="120" viewBox="0 0 120 120" fill="none">
                            <rect x="20" y="30" width="80" height="60" rx="6" stroke="var(--text-muted)" strokeWidth="1.5" strokeDasharray="4 3"/>
                            <rect x="28" y="30" width="8" height="8" fill="var(--bg-tertiary)"/>
                            <rect x="42" y="30" width="8" height="8" fill="var(--bg-tertiary)"/>
                            <rect x="56" y="30" width="8" height="8" fill="var(--bg-tertiary)"/>
                            <rect x="70" y="30" width="8" height="8" fill="var(--bg-tertiary)"/>
                            <rect x="84" y="30" width="8" height="8" fill="var(--bg-tertiary)"/>
                            <rect x="28" y="82" width="8" height="8" fill="var(--bg-tertiary)"/>
                            <rect x="42" y="82" width="8" height="8" fill="var(--bg-tertiary)"/>
                            <rect x="56" y="82" width="8" height="8" fill="var(--bg-tertiary)"/>
                            <rect x="70" y="82" width="8" height="8" fill="var(--bg-tertiary)"/>
                            <rect x="84" y="82" width="8" height="8" fill="var(--bg-tertiary)"/>
                            <circle cx="60" cy="60" r="12" stroke="var(--accent)" strokeWidth="1.5" opacity="0.5"/>
                            <path d="M56 54v12l10-6z" fill="var(--accent)" opacity="0.5"/>
                        </svg>
                        <h2 className="fav-empty__title">Sua coleção está vazia</h2>
                        <p className="fav-empty__text">
                            Explore os filmes em cartaz e salve os que você quer assistir.
                        </p>
                        <Link to="/" className="fav-empty__btn">
                            Explorar filmes
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M5 12h14M12 5l7 7-7 7"/>
                            </svg>
                        </Link>
                    </div>
                </section>
            ) : (
                /* Grid */
                <section className="fav-grid-section">
                    <div className="fav-grid">
                        {filmes.map((item, index) => (
                            <article
                                className={`fav-card ${removingId === item.id ? 'fav-card--exit' : ''}`}
                                key={item.id}
                                style={{ animationDelay: `${index * 0.07}s` }}
                            >
                                {/* Poster */}
                                <Link to={`/filme/${item.id}`} className="fav-card__poster">
                                    <img
                                        src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                                        alt={item.title}
                                        loading="lazy"
                                    />
                                    <div className="fav-card__play">
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M8 5v14l11-7z"/>
                                        </svg>
                                    </div>
                                </Link>

                                {/* Info */}
                                <div className="fav-card__body">
                                    <h3 className="fav-card__title">
                                        <Link to={`/filme/${item.id}`}>{item.title}</Link>
                                    </h3>

                                    <div className="fav-card__meta">
                                        {item.vote_average && (
                                            <span className="fav-card__rating">★ {item.vote_average.toFixed(1)}</span>
                                        )}
                                        {item.release_date && (
                                            <span className="fav-card__year">{item.release_date.split('-')[0]}</span>
                                        )}
                                    </div>

                                    {item.overview && (
                                        <p className="fav-card__desc">
                                            {item.overview.length > 90
                                                ? item.overview.substring(0, 90) + '...'
                                                : item.overview}
                                        </p>
                                    )}

                                    <div className="fav-card__actions">
                                        <Link to={`/filme/${item.id}`} className="fav-btn fav-btn--outline">
                                            Detalhes
                                        </Link>
                                        <button
                                            className="fav-btn fav-btn--danger"
                                            onClick={() => excluirFilme(item.id)}
                                        >
                                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <polyline points="3 6 5 6 21 6"/>
                                                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                                            </svg>
                                            Excluir
                                        </button>
                                    </div>
                                </div>

                                {/* Decorative divider */}
                                <div className="fav-card__divider"></div>
                            </article>
                        ))}
                    </div>
                </section>
            )}
        </main>
    );
}

export default Favoritos;