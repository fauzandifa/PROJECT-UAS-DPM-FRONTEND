import React from 'react';
import { View, Text, FlatList } from 'react-native';
import MovieItem from './MovieItem';

const MovieList = ({ title, movies }) => (
  <View style={styles.movieListContainer}>
    <View style={styles.listHeaderContainer}>
      <Text style={styles.header}>{title}</Text>
      <Text style={styles.seeAll}>See All</Text>
    </View>
    <FlatList
      horizontal
      showsHorizontalScrollIndicator={false}
      data={movies || []}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => <MovieItem item={item} />}
    />
  </View>
);

const styles = {
  movieListContainer: {
    marginBottom: 24,
  },
  listHeaderContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
  },
  seeAll: {
    fontSize: 14,
    color: "#1e90ff",
  },
};

export default MovieList;
