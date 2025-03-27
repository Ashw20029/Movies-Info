import { View, FlatList, StyleSheet, Text } from 'react-native';
import { useRouter } from 'expo-router';
import MovieCard from '@/components/MovieCard';
import { useFavorites } from '@/hooks/useFavorites';

export default function FavoritesScreen() {
  const router = useRouter();
  const { favorites, removeFavorite, isFavorite } = useFavorites();

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Favorite Movies</Text>
      {favorites.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No favorite movies yet</Text>
        </View>
      ) : (
        <FlatList
          data={favorites}
          renderItem={({ item }) => (
            <MovieCard
              movie={item}
              onPress={() => router.push(`/movie/${item.imdbID}`)}
              isFavorite={isFavorite(item.imdbID)}
              onToggleFavorite={() => removeFavorite(item.imdbID)}
            />
          )}
          keyExtractor={(item) => item.imdbID}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingTop: 48,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    margin: 16,
    color: '#E50914',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
  },
});