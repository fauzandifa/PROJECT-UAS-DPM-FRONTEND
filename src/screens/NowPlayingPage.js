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

const NowPlayingPage = () => {
  const [popularMovies, setPopularMovies] = useState([]);
  const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activePage, setActivePage] = useState("NowPlaying");

  useEffect(() => {
    const loadMovies = async () => {
      setIsLoading(true);
      try {
        const popular = await fetchMovies("/movie/popular");
        const nowPlaying = await fetchMovies("/movie/now_playing");

        setPopularMovies(popular);
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
        <Text style={styles.greeting}>Now Playing Movies</Text>
        <Text style={styles.greeting}>please enjoy</Text>
      </View>
      <TextInput
        style={{
          backgroundColor: "#fff",
          borderRadius: 8,
          paddingHorizontal: 16,
          paddingVertical: 10,
          fontSize: 16,
          color: "#333",
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 3,
          borderWidth: 1,
          borderColor: "#ddd",
        }}
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
          <>
            <MovieList title="Popular Movies" movies={popularMovies} />
            <MovieList title="Now Playing" movies={nowPlayingMovies} />
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

export default NowPlayingPage;