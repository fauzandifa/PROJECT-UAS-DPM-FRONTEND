import React, { useState, useEffect } from "react";
import {
  ScrollView,
  Text,
  TextInput,
  View,
  ActivityIndicator,
} from "react-native";
import { fetchMovies, searchMovies } from "../api/TMDBApi";
import MovieList from "../components/MovieList";
import Navbar from "../components/Navbar";
import styles from "../styles/styles";

const ComingSoonPage = () => {
  const [comingSoonMovies, setComingSoonMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

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

  return (
    <View style={styles.container}>
      <Text style={styles.greeting}>Coming Soon Movies</Text>
      <TextInput
        style={styles.searchBar}
        placeholder="Search films"
        placeholderTextColor="#aaa"
        value={searchQuery}
        onChangeText={handleSearch}
      />
      <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
        {isLoading ? (
          <ActivityIndicator
            size="large"
            color="#00ff00"
            style={{ marginTop: 20 }}
          />
        ) : searchResults.length > 0 ? (
          <MovieList title="Search Results" movies={searchResults} />
        ) : (
          <MovieList title="Coming Soon" movies={comingSoonMovies} />
        )}
      </ScrollView>
      <Navbar disabled={searchQuery !== ""} />
    </View>
  );
};

export default ComingSoonPage;
