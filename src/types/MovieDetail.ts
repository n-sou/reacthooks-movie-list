type Genre = {
    id: string;
    name: string;
}

export type MovieDetail = {
    id?: string;
    genres?: Array<Genre>;
    homepage?: string;
    original_title?: string;
    overview?: string;
    poster_path?: string;
    backdrop_path?: string;
    vote_average?: number;
    vote_count?: number;
    tagline?: string;
}