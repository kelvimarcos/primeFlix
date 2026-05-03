import { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import api from "../../services/api";
import './filme-info.css';

function Filme() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [filme, setFilme] = useState({});
    const [loading, setLoading] = useState(true);
    const [isSaved, setIsSaved] = useState(false);
    const [toast, setToast] = useState(null);

    const checkIfSaved = useCallback(() => {
        const minhaLista = localStorage.getItem('@primeflix');
        const filmesSalvos = JSON.parse(minhaLista) || [];
        const saved = filmesSalvos.some((item) => item.id === Number(id));
        setIsSaved(saved);
    }, [id]);

    useEffect(() => {
        async function loadFilme() {
            await api.get(`/movie/${id}`, {
                params: {
                    api_key: '44a7b159745153cc47f8ff3f3c206f84',
                    language: 'pt-BR',
                }
            })
            .then((response) => {
                setFilme(response.data);
                setLoading(false);
            })
            .catch(() => {
                navigate('/', { replace: true });
                return;
            });
        }

        loadFilme();
        checkIfSaved();

        return () => {
            console.log('componente desmontado');
        }
    }, [navigate, id, checkIfSaved]);

    function showToast(message, type = 'success') {
        setToast({ message, type });
        setTimeout(() => setToast(null), 3000);
    }

    function salvarFilme() {
        const minhaLista = localStorage.getItem('@primeflix');
        let filmesSalvos = JSON.parse(minhaLista) || [];

        // FIX: was comparing filme.id === filme.id (same variable name shadowing)
        const hasFilme = filmesSalvos.some((item) => item.id === filme.id);

        if (hasFilme) {
            showToast('Este filme já está na sua lista', 'info');
            return;
        }

        filmesSalvos.push(filme);
        localStorage.setItem('@primeflix', JSON.stringify(filmesSalvos));
        setIsSaved(true);
        showToast('Filme adicionado à sua coleção', 'success');
    }

    function removerFilme() {
        const minhaLista = localStorage.getItem('@primeflix');
        let filmesSalvos = JSON.parse(minhaLista) || [];
        const novaLista = filmesSalvos.filter((item) => item.id !== filme.id);
        localStorage.setItem('@primeflix', JSON.stringify(novaLista));
        setIsSaved(false);
        showToast('Filme removido da coleção', 'error');
    }

    function renderStars(rating) {
        const stars = Math.round(rating / 2);
        return (
            <div className="stars">
                {[...Array(5)].map((_, i) => (
                    <span
                        key={i}
                        className={`star ${i < stars ? 'star--on' : 'star--off'}`}
                        style={{ animationDelay: `${i * 0.1}s` }}
                    >
                        ★
                    </span>
                ))}
                <span className="stars__value">{rating?.toFixed(1)}</span>
            </div>
        );
    }

    if (loading) {
        return (
            <main className="filme-page">
                <div className="filme-loading">
                    <div className="filme-loading__ring"></div>
                    <p>Carregando detalhes...</p>
                </div>
            </main>
        );
    }

    return (
        <main className="filme-page">
            {/* Toast */}
            {toast && (
                <div className="toast-container">
                    <div className={`toast toast-${toast.type}`}>
                        <span className="toast-dot"></span>
                        {toast.message}
                    </div>
                </div>
            )}

            {/* Backdrop */}
            <section className="filme-hero">
                <div className="filme-hero__bg">
                    <img
                        src={`https://image.tmdb.org/t/p/original${filme.backdrop_path}`}
                        alt={filme.title}
                    />
                    <div className="filme-hero__fade"></div>
                </div>
            </section>

            {/* Content */}
            <section className="filme-content">
                <div className="filme-grid">
                    {/* Poster */}
                    <div className="filme-poster">
                        <img
                            src={`https://image.tmdb.org/t/p/w500${filme.poster_path}`}
                            alt={filme.title}
                        />
                    </div>

                    {/* Details */}
                    <div className="filme-details">
                        <h1 className="filme-details__title">{filme.title}</h1>

                        {/* Genre Tags */}
                        <div className="filme-tags">
                            {filme.genres?.map((genre) => (
                                <span className="filme-tag" key={genre.id}>{genre.name}</span>
                            ))}
                        </div>

                        {/* Rating */}
                        <div className="filme-rating">
                            {renderStars(filme.vote_average)}
                            <span className="filme-rating__count">
                                {filme.vote_count?.toLocaleString()} votos
                            </span>
                        </div>

                        {/* Meta info */}
                        <div className="filme-meta">
                            {filme.release_date && (
                                <span className="filme-meta__item">
                                    {new Date(filme.release_date).toLocaleDateString('pt-BR')}
                                </span>
                            )}
                            {filme.runtime > 0 && (
                                <span className="filme-meta__item">
                                    {Math.floor(filme.runtime / 60)}h {filme.runtime % 60}min
                                </span>
                            )}
                        </div>

                        {/* Synopsis */}
                        <div className="filme-synopsis">
                            <h3>Sinopse</h3>
                            <p>{filme.overview || 'Sinopse não disponível para este filme.'}</p>
                        </div>

                        {/* Actions */}
                        <div className="filme-actions">
                            <button
                                className={`filme-btn ${isSaved ? 'filme-btn--saved' : 'filme-btn--primary'}`}
                                onClick={isSaved ? removerFilme : salvarFilme}
                            >
                                {isSaved ? (
                                    <>
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                                        </svg>
                                        Salvo
                                    </>
                                ) : (
                                    <>
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                                        </svg>
                                        Salvar
                                    </>
                                )}
                            </button>

                            <a
                                className="filme-btn filme-btn--outline"
                                href={`https://youtube.com/results?search_query=${filme.title} trailer`}
                                target="_blank"
                                rel="external noreferrer"
                            >
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M8 5v14l11-7z"/>
                                </svg>
                                Trailer
                            </a>

                            <a
                                className="filme-btn filme-btn--outline"
                                href={`https://www.google.com/maps/search/cinema+perto+de+mim`}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                                    <circle cx="12" cy="10" r="3"/>
                                </svg>
                                Cinema próximo
                            </a>

                            <Link to="/" className="filme-btn filme-btn--ghost">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M19 12H5M12 19l-7-7 7-7"/>
                                </svg>
                                Voltar
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}

export default Filme;