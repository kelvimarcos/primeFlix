import {useEffect, useState} from "react";
import {useParams, useNavigate, replace} from "react-router-dom";

import api from "../../services/api";

import './filme-info.css';


function Filme() {
    const { id } = useParams();

    const navigate = useNavigate();

    const [filme, setFilme] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {


        async function loadFilme() {
    await api.get(`/movie/${id}`, {
        params: {
             api_key: '44a7b159745153cc47f8ff3f3c206f84', language: 'pt-BR',
        }
    })
    .then((response) => {
        setFilme(response.data);
        setLoading(false);
    })
    .catch(() => {
        navigate('/', { replace: true});
        return; 

    });
}

    loadFilme();

    return () => {
    console.log('componente desmontado');
    }

    }, [navigate, id])

    function salvarFilme() {
        const minhaLista = localStorage.getItem('@primeflix');

        let filmesSalvos = JSON.parse(minhaLista) || [];

        const hasFilme = filmesSalvos.some((filme) => filme.id === filme.id);

        if (hasFilme) {
           alert('Esse filme já está na sua lista!');
           return;
        }
        
        filmesSalvos.push(filme);
        localStorage.setItem('@primeflix', JSON.stringify(filmesSalvos));
        alert('Filme salvo com sucesso!');
    }

    if(loading){
        return(
            <div className="filme-info">
                <h1>Carregando detalhes...</h1>
            </div>
        );
    }

    return (
        <div className="filme-info">
            <h1>{filme.title}</h1>
            <img src={`https://image.tmdb.org/t/p/original${filme.backdrop_path}`} alt={filme.title} />
            <h3>Sinopse</h3>
            <span>{filme.overview}</span>
            <strong>Avaliação: {filme.vote_average} / 10</strong>
        
        
            <div className="area-buttons">


                 <button onClick={salvarFilme}>Salvar</button>
                
                 <button>
                    <a href={`https://youtube.com/results?search_query=${filme.title} trailer`} target="_blank" rel="external noreferrer">
                        Trailer
                    </a>
                 </button>
                
               


            


            </div>
        
        
            </div>
    );
}


export default Filme;