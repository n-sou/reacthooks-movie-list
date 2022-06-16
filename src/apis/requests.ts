const API_KEY = process.env.REACT_APP_TMDB_API_KEY;

const requests = {
    fetchTrending: `/trending/movie/week?api_key=${API_KEY}&language=en-us`,
    // fetchNetflixOriginals: `/discover/tv?api_key=${API_KEY}&with_networks=213`,
    // fetchTopRated: `/discover/tv?api_key=${API_KEY}&languager=en-us`,
}

export default requests