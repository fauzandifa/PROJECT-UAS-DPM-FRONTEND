import React from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
} from "react-native";

const ComingSoonDetailScreen = ({ route }) => {
  const { movieData } = route.params;

  return (
    <ScrollView style={styles.container}>
      <Image
        source={{ uri: `https://image.tmdb.org/t/p/w500${movieData.poster_path}` }}
        style={styles.poster}
      />
      
      <View style={styles.contentContainer}>
        <Text style={styles.title}>{movieData.title}</Text>
        
        <View style={styles.infoContainer}>
          <View style={styles.ratingContainer}>
            <Text style={styles.ratingText}>
              Rating: {movieData.vote_average.toFixed(1)}/10
            </Text>
          </View>
          
          <Text style={styles.releaseDate}>
            Release Date: {movieData.release_date}
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Overview</Text>
          <Text style={styles.overview}>{movieData.overview}</Text>
        </View>

        <View style={styles.comingSoonBadge}>
          <Text style={styles.comingSoonText}>Coming Soon</Text>
          <Text style={styles.comingSoonSubText}>
            This movie is not yet available for booking
          </Text>
        </View>
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
    color: '#000',
    marginBottom: 15,
  },
  infoContainer: {
    marginBottom: 20,
  },
  ratingContainer: {
    marginBottom: 8,
  },
  ratingText: {
    fontSize: 16,
    color: '#1e90ff',
    fontWeight: '600',
  },
  releaseDate: {
    fontSize: 16,
    color: '#666',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 10,
  },
  overview: {
    fontSize: 16,
    color: '#444',
    lineHeight: 24,
  },
  comingSoonBadge: {
    backgroundColor: '#f0f0f0',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  comingSoonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1e90ff',
    marginBottom: 5,
  },
  comingSoonSubText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
});

export default ComingSoonDetailScreen; 