import { useEffect, useState, useRef, useCallback } from "react";
import api from "../../services/api";
import { Link } from "react-router-dom";
import './Home.css';

function Home() {
    const [nowPlaying, setNowPlaying] = useState([]);
    const [popular, setPopular] = useState([]);
    const [upcoming, setUpcoming] = useState([]);
    const [loading, setLoading] = useState(true);

    // Hero slider state
    const [activeSlide, setActiveSlide] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const heroFilmes = nowPlaying.slice(0, 5);
    const timerRef = useRef(null);

    useEffect(() => {
        async function loadFilmes() {
            const apiKey = '44a7b159745153cc47f8ff3f3c206f84';
            const lang = 'pt-BR';

            const [nowRes, popRes, upRes] = await Promise.all([
                api.get('movie/now_playing', { params: { api_key: apiKey, language: lang, page: 1 } }),
                api.get('movie/popular', { params: { api_key: apiKey, language: lang, page: 1 } }),
                api.get('movie/upcoming', { params: { api_key: apiKey, language: lang, page: 1 } }),
            ]);

            setNowPlaying(nowRes.data.results.slice(0, 18));
            setPopular(popRes.data.results.slice(0, 10));
            setUpcoming(upRes.data.results.slice(0, 10));
            setLoading(false);
        }

        loadFilmes();
    }, []);

    // Auto-play slider
    const goToSlide = useCallback((index) => {
        if (isTransitioning) return;
        setIsTransitioning(true);
        setActiveSlide(index);
        setTimeout(() => setIsTransitioning(false), 600);
    }, [isTransitioning]);

    useEffect(() => {
        if (heroFilmes.length === 0) return;

        timerRef.current = setInterval(() => {
            setActiveSlide((prev) => (prev + 1) % heroFilmes.length);
        }, 5000);

        return () => clearInterval(timerRef.current);
    }, [heroFilmes.length]);

    function handleSlideClick(index) {
        clearInterval(timerRef.current);
        goToSlide(index);
        // Restart auto-play
        timerRef.current = setInterval(() => {
            setActiveSlide((prev) => (prev + 1) % heroFilmes.length);
        }, 5000);
    }

    if (loading) {
        return (
            <main className="home">
                <div className="hero-skeleton">
                    <div className="hero-skeleton__inner">
                        <div className="sk sk--label"></div>
                        <div className="sk sk--title"></div>
                        <div className="sk sk--text"></div>
                        <div className="sk sk--text sk--short"></div>
                        <div className="sk sk--btn"></div>
                    </div>
                    <div className="hero-skeleton__cards">
                        {[...Array(3)].map((_, i) => (
                            <div className="sk sk--slide-card" key={i}></div>
                        ))}
                    </div>
                </div>

                <div className="section" style={{ padding: '48px 32px' }}>
                    <div className="sk sk--heading" style={{ marginBottom: '24px' }}></div>
                    <div className="top10-scroll">
                        {[...Array(5)].map((_, i) => (
                            <div className="top10-card-skeleton" key={i}>
                                <div className="sk sk--poster"></div>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        );
    }

    const currentFilme = heroFilmes[activeSlide];

    return (
        <main className="home">
            {/* ──────── HERO SLIDER ──────── */}
            <section className="hero" id="hero-section">
                {/* Background slides */}
                {heroFilmes.map((filme, index) => (
                    <div
                        className={`hero__slide ${index === activeSlide ? 'hero__slide--active' : ''}`}
                        key={filme.id}
                    >
                        <img
                            src={`https://image.tmdb.org/t/p/original${filme.backdrop_path}`}
                            alt={filme.title}
                        />
                    </div>
                ))}
                <div className="hero__gradient"></div>
                <div className="hero__vignette"></div>

                {/* Content */}
                <div className="hero__body">
                    {/* Left — Info */}
                    <div className="hero__info" key={currentFilme?.id}>
                        <span className="hero__label">Em destaque</span>
                        <h1 className="hero__title">{currentFilme?.title}</h1>
                        <p className="hero__desc">
                            {currentFilme?.overview
                                ? currentFilme.overview.length > 160
                                    ? currentFilme.overview.substring(0, 160) + '...'
                                    : currentFilme.overview
                                : 'Sinopse não disponível.'}
                        </p>
                        <div className="hero__meta">
                            <span className="hero__star">★ {currentFilme?.vote_average?.toFixed(1)}</span>
                            <span className="hero__divider"></span>
                            <span className="hero__year">{currentFilme?.release_date?.split('-')[0]}</span>
                        </div>
                        <Link to={`/filme/${currentFilme?.id}`} className="hero__btn">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M8 5v14l11-7z"/>
                            </svg>
                            Ver detalhes
                        </Link>

                        {/* Slide indicators */}
                        <div className="hero__dots">
                            {heroFilmes.map((_, index) => (
                                <button
                                    key={index}
                                    className={`hero__dot ${index === activeSlide ? 'hero__dot--active' : ''}`}
                                    onClick={() => handleSlideClick(index)}
                                    aria-label={`Slide ${index + 1}`}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Right — Poster Cards */}
                    <div className="hero__cards">
                        {heroFilmes.map((filme, index) => (
                            <button
                                key={filme.id}
                                className={`hero__card ${index === activeSlide ? 'hero__card--active' : ''}`}
                                onClick={() => handleSlideClick(index)}
                            >
                                <img
                                    src={`https://image.tmdb.org/t/p/w500${filme.poster_path}`}
                                    alt={filme.title}
                                />
                                <div className="hero__card-overlay">
                                    <span className="hero__card-title">{filme.title}</span>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* ──────── 1. EM CARTAZ ──────── */}
            <section className="section" id="now-playing-section">
                <div className="section__header">
                    <div>
                        <h2 className="section__title">Em Cartaz</h2>
                        <p className="section__subtitle">Confira os lançamentos nos cinemas</p>
                    </div>
                </div>

                <div className="movies-grid">
                    {nowPlaying.slice(5).map((filme, index) => (
                        <Link
                            to={`/filme/${filme.id}`}
                            className="movie-card"
                            key={filme.id}
                            style={{ animationDelay: `${index * 0.05}s` }}
                        >
                            <div className="movie-card__poster">
                                <img
                                    src={`https://image.tmdb.org/t/p/w500${filme.poster_path}`}
                                    alt={filme.title}
                                    loading="lazy"
                                />
                                <div className="movie-card__overlay">
                                    <p className="movie-card__synopsis">
                                        {filme.overview
                                            ? filme.overview.length > 100
                                                ? filme.overview.substring(0, 100) + '...'
                                                : filme.overview
                                            : ''}
                                    </p>
                                    <span className="movie-card__cta">
                                        Ver mais
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M5 12h14M12 5l7 7-7 7"/>
                                        </svg>
                                    </span>
                                </div>
                            </div>
                            <div className="movie-card__info">
                                <h3 className="movie-card__title">{filme.title}</h3>
                                <div className="movie-card__meta">
                                    <span className="movie-card__rating">★ {filme.vote_average?.toFixed(1)}</span>
                                    <span className="movie-card__year">{filme.release_date?.split('-')[0]}</span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>

            {/* ──────── 2. TOP 10 — MELHORES ──────── */}
            <section className="section" id="top-10-section">
                <div className="section__header">
                    <div>
                        <h2 className="section__title">Top 10 — Melhores da Semana</h2>
                        <p className="section__subtitle">Os filmes mais populares no momento</p>
                    </div>
                </div>

                <div className="top10-scroll">
                    {popular.map((filme, index) => (
                        <Link
                            to={`/filme/${filme.id}`}
                            className="top10-card"
                            key={filme.id}
                            style={{ animationDelay: `${index * 0.07}s` }}
                        >
                            <span className="top10-card__number">{index + 1}</span>
                            <div className="top10-card__poster">
                                <img
                                    src={`https://image.tmdb.org/t/p/w500${filme.poster_path}`}
                                    alt={filme.title}
                                    loading="lazy"
                                />
                                <div className="top10-card__hover">
                                    <span className="top10-card__rating">★ {filme.vote_average?.toFixed(1)}</span>
                                </div>
                            </div>
                            <span className="top10-card__title">{filme.title}</span>
                        </Link>
                    ))}
                </div>
            </section>

            {/* ──────── 3. MAIS ESPERADOS DO ANO ──────── */}
            <section className="section" id="upcoming-section">
                <div className="section__header">
                    <div>
                        <h2 className="section__title">Mais Esperados do Ano</h2>
                        <p className="section__subtitle">Próximos lançamentos que você não pode perder</p>
                    </div>
                </div>

                <div className="trending-grid">
                    {upcoming.slice(0, 6).map((filme, index) => (
                        <Link
                            to={`/filme/${filme.id}`}
                            className="trending-card"
                            key={filme.id}
                            style={{ animationDelay: `${index * 0.08}s` }}
                        >
                            <div className="trending-card__img">
                                <img
                                    src={`https://image.tmdb.org/t/p/w780${filme.backdrop_path || filme.poster_path}`}
                                    alt={filme.title}
                                    loading="lazy"
                                />
                                <div className="trending-card__overlay">
                                    <div className="trending-card__info">
                                        <span className="trending-card__rating">★ {filme.vote_average?.toFixed(1)}</span>
                                        <span className="trending-card__year">{filme.release_date?.split('-')[0]}</span>
                                    </div>
                                </div>
                                <div className="trending-card__rank">Em breve</div>
                            </div>
                            <h3 className="trending-card__title">{filme.title}</h3>
                            <p className="trending-card__synopsis">
                                {filme.overview
                                    ? filme.overview.length > 80
                                        ? filme.overview.substring(0, 80) + '...'
                                        : filme.overview
                                    : ''}
                            </p>
                        </Link>
                    ))}
                </div>
            </section>
        </main>
    );
}

export default Home;