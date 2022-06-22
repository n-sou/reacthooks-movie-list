import { useState, useEffect, useRef, useCallback } from 'react'
import { MovieList } from './MovieList'
import { Search } from './Search'
import { Movie } from '../types/Movie'
import requests from '../apis/requests'
import styled from 'styled-components'
import { instance } from '../apis/axios'

const PageTitle = styled.h1`
  color: #fff;
  position: relative;
  padding: 0 65px;
  text-align: center;
  font-family: 'Joan', serif;
  &:before {
    position: absolute;
    top: calc(50% - 1px);
    left: 0;
    width: 100%;
    height: 2px;
    content: '';
    background: #fff;
  }
  span{
    position: relative;
    padding: 0 1em;
    background: #203d4a;
    cursor: pointer;
  }
`

function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const fetchTrendingData = useCallback(async () => {
    const request = await instance.get(requests.fetchTrending);
    setMovies(filterMovieList(request.data.results));
    return request;
  }, [])

  const fetchMovieDataByKeyword = async (keyword: string) => {
    const encodedKeyword = encodeURIComponent(keyword);
    const request = await instance.get(`/search/movie/${requests.fetchDetails}&query=${encodedKeyword}`);
    setMovies(filterMovieList(request.data.results));
  }

  useEffect(() => {
    fetchTrendingData();
  }, [fetchTrendingData]);

  const searchEl = useRef<HTMLInputElement>(null);

  const handleSearchMovie = () => {
    if (searchEl.current?.value === '') {
      resetData()
    } else {
      fetchMovieDataByKeyword(searchEl.current!.value);
    }
  }

  const resetData = () => {
    fetchTrendingData();
    searchEl.current!.value = '';
  }

  const filterMovieList = (movieList: Movie[]) => {
    const filtered = movieList.filter((movie: Movie) => movie.backdrop_path !== null && movie.poster_path !== null);
    return filtered;
  }

  return (
    <>
      <PageTitle><span onClick={resetData}>Trending Movies</span></PageTitle>
      <Search searchEl={searchEl} doSearch={handleSearchMovie} />
      <MovieList movieList={movies} />
    </>
  );
}

export default App;