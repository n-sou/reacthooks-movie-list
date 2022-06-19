const API_KEY = process.env.REACT_APP_TMDB_API_KEY;

const requests = {
    fetchTrending: `/trending/movie/week?api_key=${API_KEY}&language=en-us`,
    fetchDetails: `?api_key=${API_KEY}&language=en-us`
}

export default requests