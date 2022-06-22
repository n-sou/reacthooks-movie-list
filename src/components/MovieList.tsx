import { Movie } from '../types/Movie'
import { MovieItem } from './MovieItem'
import styled from 'styled-components'

const MovieListWrapper = styled.div`
    padding: 40px 80px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
`

export const MovieList = ({ movieList }: { movieList: Movie[] }) => {
    const imageBaseUrl = 'https://image.tmdb.org/t/p/original/'
    return (
        <MovieListWrapper>
            {movieList.map((movie: Movie) => (
                <MovieItem
                    key={movie.id}
                    movieId={movie.id}
                    movieImg={`${imageBaseUrl}${movie.backdrop_path}`}
                    movieName={movie.title}
                    voteCount={movie.vote_count}
                    movieRate={movie.vote_average}
                />
            ))}
        </MovieListWrapper>
    );
}