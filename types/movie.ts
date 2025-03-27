export interface Movie {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
}

export interface MovieDetails extends Movie {
  Genre: string;
  Plot: string;
  imdbRating: string;
  Director: string;
  Actors: string;
  Runtime: string;
}

export interface SearchResponse {
  Search: Movie[];
  totalResults: string;
  Response: string;
}