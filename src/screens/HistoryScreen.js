import React, { useState, useEffect } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const HistoryScreen = () => {
  const [history, setHistory] = useState([]);

const fetchHistory = async () => {
  try {
    const storedHistory = await AsyncStorage.getItem("paymentHistory");
    if (storedHistory) {
      // Parsing data dari AsyncStorage
      const parsedHistory = JSON.parse(storedHistory);

      // Debugging untuk memastikan format waktu
      console.log("Parsed History: ", parsedHistory);

      // Cek jika 'time' dalam format yang bisa dikenali oleh new Date()
      const sortedHistory = parsedHistory.sort((a, b) => {
        // Pastikan 'time' sudah dalam format yang valid untuk new Date()
        const dateA = new Date(a.time);
        const dateB = new Date(b.time);

        // Debugging untuk melihat hasil konversi waktu
        console.log(`Date A: ${dateA}, Date B: ${dateB}`);

        // Mengurutkan berdasarkan waktu
        return dateB - dateA;
      });

      setHistory(sortedHistory);
    }
  } catch (error) {
    console.error("Error fetching history:", error);
  }
};


  useEffect(() => {
    fetchHistory();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.historyItem}>
      <Text style={styles.movieTitle}>{item.title}</Text>
      <Text style={styles.details}>Tanggal: {item.date}</Text>
      <Text style={styles.details}>Waktu: {item.time}</Text>
      <Text style={styles.details}>Jumlah Tiket: {item.tickets}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Riwayat Pemesanan Tiket</Text>
      {history.length > 0 ? (
        <FlatList
          data={history}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={styles.list}
        />
      ) : (
        <Text style={styles.emptyText}>Belum ada riwayat pemesanan tiket.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f4f8", // Soft background color
    padding: 20,
    justifyContent: "center",
  },
  header: {
    fontSize: 22,
    fontWeight: "600",
    color: "#333",
    marginBottom: 20,
    textAlign: "center",
  },
  list: {
    paddingBottom: 20,
  },
  historyItem: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 20,
    marginBottom: 15,
    elevation: 5, // Elevated shadow effect
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    flexDirection: "column",
    alignItems: "flex-start", // Align content to the left
  },
  movieTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#2b2b2b", // Dark text for title
    marginBottom: 8,
  },
  details: {
    fontSize: 14,
    color: "#757575", // Light grey for details text
    marginBottom: 4,
  },
  emptyText: {
    textAlign: "center",
    fontSize: 16,
    color: "#a0a0a0",
    marginTop: 40,
  },
});

export default HistoryScreen;
