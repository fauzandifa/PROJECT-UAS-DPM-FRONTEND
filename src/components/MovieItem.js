import React from "react";
import { View, Text, Image, TouchableOpacity, Alert } from "react-native";

const MovieItem = ({ item }) => (
  <View style={styles.movieItem}>
    <Image
      source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }}
      style={styles.movieImage}
    />
    <Text style={styles.movieTitle}>{item.title}</Text>
    <Text style={styles.movieDetails}>Release Date: {item.release_date}</Text>
    <TouchableOpacity
      style={styles.messageButton}
      onPress={() => Alert.alert("Message", `Send message about ${item.title}`)}
    >
      <Text style={styles.messageButtonText}>Message</Text>
    </TouchableOpacity>
  </View>
);

const styles = {
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
};

export default MovieItem;
