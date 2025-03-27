import { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, StyleSheet, ActivityIndicator } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { getMovieDetails } from '@/utils/api';
import { MovieDetails } from '@/types/movie';
import { Heart } from 'lucide-react-native';
import { useFavorites } from '@/hooks/useFavorites';

export default function MovieDetailsScreen() {
  const { id } = useLocalSearchParams();
  const [movie, setMovie] = useState<MovieDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();

  useEffect(() => {
    loadMovieDetails();
  }, [id]);

  const loadMovieDetails = async () => {
    try {
      const details = await getMovieDetails(id as string);
      setMovie(details);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#E50914" />
      </View>
    );
  }

  if (!movie) {
    return (
      <View style={styles.errorContainer}>
        <Text>Failed to load movie details</Text>
      </View>
    );
  }

  const toggleFavorite = () => {
    if (isFavorite(movie.imdbID)) {
      removeFavorite(movie.imdbID);
    } else {
      addFavorite(movie);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Image
        source={{
          uri: movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/300x450',
        }}
        style={styles.poster}
      />
      <View style={styles.content}>
        <View style={styles.headerContainer}>
          <Text style={styles.title}>{movie.Title}</Text>
          <Heart
            size={24}
            color={isFavorite(movie.imdbID) ? '#E50914' : '#666'}
            fill={isFavorite(movie.imdbID) ? '#E50914' : 'none'}
            onPress={toggleFavorite}
          />
        </View>
        <Text style={styles.year}>{movie.Year} • {movie.Runtime}</Text>
        <Text style={styles.genre}>{movie.Genre}</Text>
        <Text style={styles.rating}>IMDb Rating: ⭐ {movie.imdbRating}</Text>
        
        <Text style={styles.sectionTitle}>Plot</Text>
        <Text style={styles.plot}>{movie.Plot}</Text>
        
        <Text style={styles.sectionTitle}>Director</Text>
        <Text style={styles.info}>{movie.Director}</Text>
        
        <Text style={styles.sectionTitle}>Cast</Text>
        <Text style={styles.info}>{movie.Actors}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  poster: {
    width: '100%',
    height: 450,
    resizeMode: 'cover',
  },
  content: {
    padding: 16,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    flex: 1,
    marginRight: 16,
  },
  year: {
    fontSize: 16,
    color: '#666',
    marginTop: 4,
  },
  genre: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  rating: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 8,
    color: '#E50914',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
  },
  plot: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
  },
  info: {
    fontSize: 16,
    color: '#333',
  },
});