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

const ComingSoonScreen = () => {
  const navigation = useNavigation();
  const [comingSoonMovies, setComingSoonMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activePage, setActivePage] = useState("ComingSoon");
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const getUserData = async () => {
      try {
        const userDataString = await AsyncStorage.getItem("userData");
        if (userDataString) {
          const userData = JSON.parse(userDataString);
          setUserData(userData);
        }
      } catch (error) {
        console.error("Error getting user data:", error);
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
        style={comingSoonStyles.movieCard}
        onPress={() => handleMoviePress(movie)}
      >
        <Image
          source={{ uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}` }}
          style={comingSoonStyles.movieImage}
        />
        <View style={comingSoonStyles.movieInfo}>
          <Text style={comingSoonStyles.movieTitle}>{movie.title}</Text>
          <Text style={comingSoonStyles.movieDate}>
            Release Date: {movie.release_date}
          </Text>
          <Text style={comingSoonStyles.movieRating}>
            Rating: {movie.vote_average.toFixed(1)}/10
          </Text>
          <Text style={comingSoonStyles.movieOverview} numberOfLines={3}>
            {movie.overview}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={comingSoonStyles.container}>
      <View style={comingSoonStyles.header}>
        <Text style={comingSoonStyles.welcomeText}>
          Welcome {userData?.nama || 'to the apps'}!
        </Text>
        <Text style={comingSoonStyles.subText}>
          Check out these upcoming movies!
        </Text>
      </View>

      <View style={comingSoonStyles.searchContainer}>
        <TextInput
          style={comingSoonStyles.searchInput}
          placeholder="Search upcoming films..."
          placeholderTextColor="#666"
          value={searchQuery}
          onChangeText={handleSearch}
        />
      </View>

      <ScrollView 
        style={comingSoonStyles.scrollView}
        contentContainerStyle={comingSoonStyles.scrollContent}
      >
        {isLoading ? (
          <ActivityIndicator
            size="large"
            color="#1e90ff"
            style={comingSoonStyles.loader}
          />
        ) : (
          <View style={comingSoonStyles.moviesContainer}>
            {(searchQuery ? searchResults : comingSoonMovies).map(renderMovieCard)}
          </View>
        )}
      </ScrollView>
      <Navbar activePage={activePage} setActivePage={setActivePage} />
    </View>
  );
};

const comingSoonStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 20,
    backgroundColor: '#1e90ff',
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  subText: {
    fontSize: 16,
    color: '#fff',
    opacity: 0.9,
  },
  searchContainer: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  searchInput: {
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
    color: '#333',
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
    marginTop: 100,
  }
});

export default ComingSoonScreen;
