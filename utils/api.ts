const API_KEY = 'd329de90';
const BASE_URL = 'https://www.omdbapi.com';

export const searchMovies = async (query: string, page: number = 1): Promise<any> => {
  try {
    const response = await fetch(
      `${BASE_URL}/?apikey=${API_KEY}&s=${encodeURIComponent(query)}&page=${page}`
    );
    return await response.json();
  } catch (error) {
    console.error('Error searching movies:', error);
    throw error;
  }
};

export const getMovieDetails = async (imdbID: string): Promise<any> => {
  try {
    const response = await fetch(
      `${BASE_URL}/?apikey=${API_KEY}&i=${imdbID}`
    );
    return await response.json();
  } catch (error) {
    console.error('Error fetching movie details:', error);
    throw error;
  }
};