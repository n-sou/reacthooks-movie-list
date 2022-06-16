import React, { useState, useEffect } from 'react'
import { instance } from '../apis/axios'
import { Movie } from '../types/Movie'
import { MovieItem } from './MovieItem'
import styled from 'styled-components'

type Props = {
    fetchUrl: string;
}

const MovieListWrapper = styled.div`
    padding: 40px 80px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
`

export const MovieList = ({ fetchUrl }: Props) => {
    const [movies, setMovies] = useState<Movie[]>([]);

    useEffect(() => {
        async function fetchData() {
            const request = await instance.get(fetchUrl);
            setMovies(request.data.results);
            return request;
        }
        fetchData();
    }, [fetchUrl]);

    console.log(movies);

    const imageBaseUrl = 'https://image.tmdb.org/t/p/original/'

    return (
        <MovieListWrapper>
            {movies.map((movie, i) => (
                <MovieItem
                    key={movie.id}
                    movieImg={`${imageBaseUrl}${movie.backdrop_path}`}
                    movieName={movie.title}
                    voteCount={movie.vote_count}
                    movieRate={movie.vote_average}
                />
            ))}
        </MovieListWrapper>
    );
}