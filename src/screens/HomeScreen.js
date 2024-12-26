import React, { useState, useEffect } from "react";
import { ScrollView, Text, TextInput, View } from "react-native";
import { fetchMovies, searchMovies } from "../api/TMDBApi";
import MovieList from "../components/MovieList";
import Navbar from "../components/Navbar";
import ProfilePage from "../components/ProfilePage"; // Import ProfilePage
import styles from "../styles/styles";

const HomeScreen = () => {
  const [activePage, setActivePage] = useState("film");
  const [popularMovies, setPopularMovies] = useState([]);
  const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
  const [comingSoonMovies, setComingSoonMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); // State untuk query pencarian
  const [searchResults, setSearchResults] = useState([]); // State untuk hasil pencarian

  useEffect(() => {
    const fetchAllMovies = async () => {
      setPopularMovies(await fetchMovies("/movie/popular"));
      setNowPlayingMovies(await fetchMovies("/movie/now_playing"));
      setComingSoonMovies(await fetchMovies("/movie/upcoming"));
    };
    fetchAllMovies();
  }, []);

  // Fungsi untuk menangani perubahan input pencarian
  const handleSearch = async (query) => {
    setSearchQuery(query);
    if (query) {
      // Jika ada query, lakukan pencarian film
      const results = await searchMovies(query);
      setSearchResults(results);
    } else {
      // Jika tidak ada query, tampilkan hasil film yang sudah ada
      setSearchResults([]);
    }
  };

  const renderPageContent = () => {
    switch (activePage) {
      case "film":
        return (
          <>
            <MovieList title="Popular Movies" movies={popularMovies} />
            <MovieList title="Now Playing" movies={nowPlayingMovies} />
          </>
        );
      case "comingSoon":
        return <MovieList title="Coming Soon" movies={comingSoonMovies} />;
      case "profile":
        return <ProfilePage />;
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.greeting}>Welcome to the App</Text>
      <Text style={styles.subGreeting}>Please enjoy :D</Text>
      {activePage !== "profile" && (
        <TextInput
          style={styles.searchBar}
          placeholder="Search movies, genres..."
          placeholderTextColor="#aaa"
          value={searchQuery}
          onChangeText={handleSearch} // Mengupdate query pencarian
        />
      )}
      <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
        {/* Jika ada hasil pencarian, tampilkan hasil tersebut */}
        {searchResults.length > 0 ? (
          <MovieList title="Search Results" movies={searchResults} />
        ) : (
          renderPageContent()
        )}
      </ScrollView>
      <Navbar activePage={activePage} setActivePage={setActivePage} />
    </View>
  );
};

export default HomeScreen;
