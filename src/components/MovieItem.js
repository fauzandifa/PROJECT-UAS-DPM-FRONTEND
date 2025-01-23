import React from "react";
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";

const MovieItem = ({ item }) => {
  const navigation = useNavigation();

  // Fungsi untuk menampilkan bintang berdasarkan rating
  const renderStars = (rating) => {
    const fullStars = Math.floor(rating / 2); // Bintang penuh
    const halfStar = rating % 2 >= 1 ? 1 : 0; // Bintang setengah jika nilai rating desimal >= 0.5
    const emptyStars = 5 - fullStars - halfStar; // Bintang kosong

    return (
      <>
        {Array(fullStars)
          .fill()
          .map((_, index) => (
            <FontAwesome
              key={`full-${index}`}
              name="star"
              size={14}
              color="#FFD700"
            />
          ))}
        {halfStar === 1 && (
          <FontAwesome name="star-half" size={14} color="#FFD700" />
        )}
        {Array(emptyStars)
          .fill()
          .map((_, index) => (
            <FontAwesome
              key={`empty-${index}`}
              name="star-o"
              size={14}
              color="#FFD700"
            />
          ))}
      </>
    );
  };

  return (
    <View style={styles.movieItem}>
      <ImageBackground
        source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }}
        style={styles.movieImage}
      >
        <View style={styles.gradientOverlay} />
        <View style={styles.movieContent}>
          <Text style={styles.movieTitle}>{item.title}</Text>
          <View style={styles.ratingRow}>
            {renderStars(item.vote_average)}
            <Text style={styles.reviewCount}>
              {" "}
              ({item.vote_count || "0"})
            </Text>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  movieItem: {
    width: 180,
    borderRadius: 16,
    overflow: "hidden",
    marginRight: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },
  movieImage: {
    width: "100%",
    height: 250,
    justifyContent: "flex-end",
  },
  gradientOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    opacity: 1,
  },
  movieContent: {
    padding: 12,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
  movieTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 8,
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  reviewCount: {
    fontSize: 12,
    color: "#fff",
    marginLeft: 4,
  },
});

export default MovieItem;
