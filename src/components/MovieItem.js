import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

const MovieItem = ({ item }) => {
  const navigation = useNavigation();

  const handleTicketPress = () => {
    navigation.navigate("Payment", {
      movieData: {
        title: item.title,
        poster_path: item.poster_path,
        overview: item.overview,
        release_date: item.release_date,
      },
    });
  };

  return (
    <View style={styles.movieItem}>
      <Image
        source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }}
        style={styles.movieImage}
      />
      <Text style={styles.movieTitle}>{item.title}</Text>
      <Text style={styles.movieDetails}>Release Date: {item.release_date}</Text>
      <TouchableOpacity
        style={styles.messageButton}
        onPress={handleTicketPress}
      >
        <Text style={styles.messageButtonText}>Pesan Tiket</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  movieItem: {
    width: 140,
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
    padding: 8,
    marginRight: 12,
  },
  movieImage: {
    width: "100%",
    height: 180,
    borderRadius: 8,
    marginBottom: 8,
  },
  movieTitle: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 4,
  },
  movieDetails: {
    fontSize: 12,
    color: "#555",
  },
  messageButton: {
    backgroundColor: "#1e90ff",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginTop: 8,
    alignItems: "center",
  },
  messageButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default MovieItem;
