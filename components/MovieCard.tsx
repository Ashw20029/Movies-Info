import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Movie } from '@/types/movie';
import { Heart } from 'lucide-react-native';

interface MovieCardProps {
  movie: Movie;
  onPress: () => void;
  isFavorite: boolean;
  onToggleFavorite: () => void;
}

export default function MovieCard({ movie, onPress, isFavorite, onToggleFavorite }: MovieCardProps) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image
        source={{ uri: movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/300x450' }}
        style={styles.poster}
      />
      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={2}>{movie.Title}</Text>
        <Text style={styles.year}>{movie.Year}</Text>
      </View>
      <TouchableOpacity style={styles.favoriteButton} onPress={onToggleFavorite}>
        <Heart
          size={24}
          color={isFavorite ? '#E50914' : '#666'}
          fill={isFavorite ? '#E50914' : 'none'}
        />
      </TouchableOpacity>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 8,
    marginHorizontal: 16,
    marginVertical: 8,
    padding: 8,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  poster: {
    width: 80,
    height: 120,
    borderRadius: 4,
  },
  info: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  year: {
    fontSize: 14,
    color: '#666',
  },
  favoriteButton: {
    padding: 8,
    justifyContent: 'center',
  },
});