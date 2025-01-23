import React from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const MovieDetailScreen = ({ route, navigation }) => {
  const { movieData } = route.params;
  const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

  const handleBooking = () => {
    navigation.navigate("BookFilm", { movieData });
  };

  return (
    <ScrollView style={styles.container}>
      <Image
        source={{ uri: `${IMAGE_BASE_URL}${movieData.poster_path}` }}
        style={styles.poster}
      />
      <View style={styles.contentContainer}>
        <Text style={styles.title}>{movieData.title}</Text>
        <Text style={styles.rating}>Rating: {movieData.vote_average}/10</Text>
        <Text style={styles.releaseDate}>
          Release Date: {movieData.release_date}
        </Text>
        <Text style={styles.overview}>{movieData.overview}</Text>
        
        <TouchableOpacity
          style={styles.bookButton}
          onPress={handleBooking}
        >
          <Text style={styles.bookButtonText}>Book Now</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  poster: {
    width: '100%',
    height: 450,
    resizeMode: 'cover',
  },
  contentContainer: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  rating: {
    fontSize: 16,
    color: '#666',
    marginBottom: 5,
  },
  releaseDate: {
    fontSize: 16,
    color: '#666',
    marginBottom: 15,
  },
  overview: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 20,
  },
  bookButton: {
    backgroundColor: '#1e90ff',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  bookButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default MovieDetailScreen; 