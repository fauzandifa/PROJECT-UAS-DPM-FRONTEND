import React, { useState, useEffect } from "react";
import {
  ScrollView,
  Text,
  TextInput,
  View,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import { fetchMovies, searchMovies } from "../api/TMDBApi";
import Navbar from "../components/Navbar";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';

const ComingSoonScreen = () => {
  const navigation = useNavigation();
  const [comingSoonMovies, setComingSoonMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activePage, setActivePage] = useState("ComingSoon");
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const getUserData = async () => {
      try {
        const userData = await AsyncStorage.getItem('userData');
        if (userData) {
          const { user } = JSON.parse(userData);
          setUserName(user.nama);
        }
      } catch (error) {
        console.error('Error getting user data:', error);
      }
    };

    getUserData();
  }, []);

  useEffect(() => {
    const loadComingSoonMovies = async () => {
      setIsLoading(true);
      try {
        const movies = await fetchMovies("/movie/upcoming");
        setComingSoonMovies(movies);
      } catch (error) {
        console.error("Error fetching movies:", error);
      } finally {
        setIsLoading(false);
      }
    };
    loadComingSoonMovies();
  }, []);

  const handleSearch = async (query) => {
    setSearchQuery(query);
    if (query) {
      const results = await searchMovies(query);
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  };

  const handleMoviePress = (movie) => {
    navigation.navigate('ComingSoonDetail', { movieData: movie });
  };

  const renderMovieCard = (movie) => {
    return (
      <TouchableOpacity
        key={movie.id}
        style={styles.movieCard}
        onPress={() => handleMoviePress(movie)}
      >
        <Image
          source={{ uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}` }}
          style={styles.movieImage}
        />
        <View style={styles.movieInfo}>
          <Text style={styles.movieTitle}>{movie.title}</Text>
          <Text style={styles.movieDate}>
            Release Date: {movie.release_date}
          </Text>
          <Text style={styles.movieRating}>
            Rating: {movie.vote_average.toFixed(1)}/10
          </Text>
          <Text style={styles.movieOverview} numberOfLines={3}>
            {movie.overview}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#1e90ff', '#00bfff']}
        style={styles.headerGradient}
      >
        <View style={styles.header}>
          <Text style={styles.headerText}>
            Welcome, {userName || 'Guest'}!
          </Text>
          <Text style={styles.headerSubText}>
            Check out these upcoming movies!
          </Text>
        </View>
      </LinearGradient>

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search movies..."
          placeholderTextColor="#888"
          value={searchQuery}
          onChangeText={handleSearch}
        />
      </View>

      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
      >
        {isLoading ? (
          <ActivityIndicator
            size="large"
            color="#1e90ff"
            style={styles.loader}
          />
        ) : (
          <View style={styles.moviesContainer}>
            {(searchQuery ? searchResults : comingSoonMovies).map(renderMovieCard)}
          </View>
        )}
      </ScrollView>
      <Navbar activePage={activePage} setActivePage={setActivePage} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  headerGradient: {
    paddingTop: 60,
    paddingBottom: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  header: {
    paddingHorizontal: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  headerSubText: {
    fontSize: 16,
    color: '#fff',
    opacity: 0.9,
  },
  searchContainer: {
    paddingHorizontal: 20,
    marginTop: -20,
    marginBottom: 10,
  },
  searchInput: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 25,
    fontSize: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 80,
  },
  moviesContainer: {
    padding: 15,
  },
  movieCard: {
    backgroundColor: '#fff',
    borderRadius: 15,
    marginBottom: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  movieImage: {
    width: '100%',
    height: 200,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  movieInfo: {
    padding: 15,
  },
  movieTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  movieDate: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  movieRating: {
    fontSize: 14,
    color: '#1e90ff',
    marginBottom: 8,
  },
  movieOverview: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  loader: {
    marginTop: 80,
  }
});

export default ComingSoonScreen;
