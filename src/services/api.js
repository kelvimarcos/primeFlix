
import axios from 'axios';


//url da api
//url da api: https://api.themoviedb.org/3/movie/now_playing?api_key=44a7b159745153cc47f8ff3f3c206f84


const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3'
});

export default api;
