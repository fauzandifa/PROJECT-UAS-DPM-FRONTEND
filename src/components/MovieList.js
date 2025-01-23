import React from 'react';
import { View, Text, FlatList, ScrollView, TouchableOpacity } from 'react-native';
import MovieItem from './MovieItem';
import { useNavigation } from '@react-navigation/native';

const MovieList = ({ title, movies, navigateTo }) => {
  const navigation = useNavigation();

  const handleMoviePress = (movie) => {
    navigation.navigate(navigateTo || 'MovieDetail', { movieData: movie });
  };

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {movies.map((movie) => (
          <TouchableOpacity
            key={movie.id}
            style={styles.movieCard}
            onPress={() => handleMoviePress(movie)}
          >
            <MovieItem item={movie} />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = {
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
  movieCard: {
    marginRight: 16,
  },
};

export default MovieList;
