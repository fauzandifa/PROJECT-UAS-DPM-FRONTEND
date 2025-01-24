import React, { useState, useEffect } from "react";
import {
  ScrollView,
  Text,
  TextInput,
  View,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { fetchMovies, searchMovies } from "../api/TMDBApi";
import MovieList from "../components/MovieList";
import Navbar from "../components/Navbar";
import styles from "../styles/styles";
import AsyncStorage from '@react-native-async-storage/async-storage';

const NowPlayingPage = () => {
  const [popularMovies, setPopularMovies] = useState([]);
  const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activePage, setActivePage] = useState("NowPlaying");
  const [userData, setUserData] = useState({ nama: '' });

  useEffect(() => {
    const getUserData = async () => {
      try {
        const userDataString = await AsyncStorage.getItem("userData");
        if (userDataString) {
          const parsedData = JSON.parse(userDataString);
          setUserData(parsedData.user || { nama: '' });
        }
      } catch (error) {
        console.error("Error getting user data:", error);
        setUserData({ nama: '' });
      }
    };

    getUserData();
  }, []);

  useEffect(() => {
    const loadMovies = async () => {
      setIsLoading(true);
      try {
        const popular = await fetchMovies("/movie/popular");
        const nowPlaying = await fetchMovies("/movie/now_playing");

        // Sort popular movies by rating in descending order
        const sortedPopular = popular.sort(
          (a, b) => b.vote_average - a.vote_average
        );

        setPopularMovies(sortedPopular);
        setNowPlayingMovies(nowPlaying);
      } catch (error) {
        console.error("Error fetching movies:", error);
      } finally {
        setIsLoading(false);
      }
    };
    loadMovies();
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

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>
          Welcome {userData?.nama || 'Guest'}!
        </Text>
        <Text style={styles.headersubText}>
          What movie do you want to order?
        </Text>
      </View>
      <TextInput
        style={styles.searchInput}
        placeholder="Search films"
        placeholderTextColor="#aaa"
        value={searchQuery}
        onChangeText={handleSearch}
      />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {isLoading ? (
          <ActivityIndicator
            size="large"
            color="#00ff00"
            style={{ marginTop: 80 }}
          />
        ) : searchResults.length > 0 ? (
          <MovieList 
            title="Search Results" 
            movies={searchResults} 
            navigateTo="MovieDetail"
            containerStyle={styles.movieListContainer}
          />
        ) : (
          <>
            <MovieList 
              title="Popular Movies" 
              movies={popularMovies} 
              navigateTo="MovieDetail"
              containerStyle={styles.movieListContainer}
            />
            <MovieList 
              title="Now Playing" 
              movies={nowPlayingMovies} 
              navigateTo="MovieDetail"
              containerStyle={styles.movieListContainer}
            />
          </>
        )}
      </ScrollView>
      <Navbar
        activePage={activePage}
        setActivePage={setActivePage}
        disabled={searchQuery !== ""}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  scrollContent: {
    paddingBottom: 80,
    paddingHorizontal: 15,
  },
  movieListContainer: {
    paddingHorizontal: 5,
  }
});

export default NowPlayingPage;