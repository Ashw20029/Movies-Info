import { useState } from 'react';
import { View, TextInput, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Search } from 'lucide-react-native';
import { searchMovies } from '@/utils/api';
import { Movie, SearchResponse } from '@/types/movie';
import MovieCard from '@/components/MovieCard';
import { useFavorites } from '@/hooks/useFavorites';

export default function SearchScreen() {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();

  const handleSearch = async (searchQuery: string, pageNum: number = 1) => {
    if (!searchQuery.trim()) return;
    
    try {
      setLoading(true);
      const response: SearchResponse = await searchMovies(searchQuery, pageNum);
      
      if (response.Response === 'True') {
        if (pageNum === 1) {
          setMovies(response.Search);
        } else {
          setMovies(prev => [...prev, ...response.Search]);
        }
        setTotalResults(parseInt(response.totalResults));
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const loadMore = () => {
    if (loading || movies.length >= totalResults) return;
    const nextPage = page + 1;
    setPage(nextPage);
    handleSearch(query, nextPage);
  };

  const handleMoviePress = (movie: Movie) => {
    router.push(`/movie/${movie.imdbID}`);
  };

  const toggleFavorite = (movie: Movie) => {
    if (isFavorite(movie.imdbID)) {
      removeFavorite(movie.imdbID);
    } else {
      addFavorite(movie);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Search size={20} color="#666" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search movies..."
          value={query}
          onChangeText={(text) => {
            setQuery(text);
            setPage(1);
            handleSearch(text, 1);
          }}
        />
      </View>

      <FlatList
        data={movies}
        renderItem={({ item }) => (
          <MovieCard
            movie={item}
            onPress={() => handleMoviePress(item)}
            isFavorite={isFavorite(item.imdbID)}
            onToggleFavorite={() => toggleFavorite(item)}
          />
        )}
        keyExtractor={(item) => item.imdbID}
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={() =>
          loading && <ActivityIndicator size="large" color="#E50914" />
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingTop: 48,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    margin: 16,
    borderRadius: 8,
    paddingHorizontal: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 48,
    fontSize: 16,
  },
});