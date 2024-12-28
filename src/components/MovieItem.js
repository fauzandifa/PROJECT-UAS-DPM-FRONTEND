import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Alert,
  Modal,
  StyleSheet,
  TextInput,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import AsyncStorage from "@react-native-async-storage/async-storage";

const MovieItem = ({ item }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [ticketCount, setTicketCount] = useState(1);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedTime, setSelectedTime] = useState(new Date());
  const [showTimePicker, setShowTimePicker] = useState(false);

  const handlePayment = async () => {
    try {
      const newPayment = {
        title: item.title,
        date: selectedDate.toDateString(),
        time: selectedTime.toLocaleTimeString(),
        tickets: ticketCount,
      };

      const existingPayments = await AsyncStorage.getItem("paymentHistory");
      const updatedPayments = existingPayments
        ? [...JSON.parse(existingPayments), newPayment]
        : [newPayment];

      await AsyncStorage.setItem("paymentHistory", JSON.stringify(updatedPayments));

      Alert.alert(
        "Pembayaran",
        `Tiket untuk ${item.title} berhasil dipesan!\nTanggal: ${selectedDate.toDateString()}\nWaktu: ${selectedTime.toLocaleTimeString()}`
      );

      setModalVisible(false);
    } catch (error) {
      Alert.alert("Error", "Terjadi kesalahan saat memproses pembayaran.");
      console.error("Error saving payment history:", error);
    }
  };

  const onDateChange = (event, date) => {
    setShowDatePicker(false);
    if (date) {
      setSelectedDate(date);
    }
  };

  const onTimeChange = (event, time) => {
    setShowTimePicker(false);
    if (time) {
      setSelectedTime(time);
    }
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
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.messageButtonText}>Pesan Tiket</Text>
      </TouchableOpacity>

      {/* Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {/* Header */}
            <Image
              source={{
                uri: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
              }}
              style={styles.modalImage}
            />
            <Text style={styles.modalTitle}>{item.title}</Text>
            <Text style={styles.modalSubtitle}>
              {item.overview ? item.overview : "Deskripsi tidak tersedia."}
            </Text>

            {/* Input Tiket */}
            <TextInput
              style={styles.input}
              placeholder="Jumlah Tiket"
              keyboardType="numeric"
              value={String(ticketCount)}
              onChangeText={(value) => setTicketCount(Number(value))}
            />

            {/* Pilih Tanggal */}
            <TouchableOpacity
              style={styles.buttonSecondary}
              onPress={() => setShowDatePicker(true)}
            >
              <Text style={styles.buttonSecondaryText}>
                Pilih Tanggal: {selectedDate.toDateString()}
              </Text>
            </TouchableOpacity>
            {showDatePicker && (
              <DateTimePicker
                value={selectedDate}
                mode="date"
                display="default"
                onChange={onDateChange}
              />
            )}

            {/* Pilih Waktu */}
            <TouchableOpacity
              style={styles.buttonSecondary}
              onPress={() => setShowTimePicker(true)}
            >
              <Text style={styles.buttonSecondaryText}>
                Pilih Waktu: {selectedTime.toLocaleTimeString()}
              </Text>
            </TouchableOpacity>
            {showTimePicker && (
              <DateTimePicker
                value={selectedTime}
                mode="time"
                display="default"
                onChange={onTimeChange}
              />
            )}

            {/* Buttons */}
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.buttonPrimary}
                onPress={handlePayment}
              >
                <Text style={styles.buttonPrimaryText}>Bayar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.buttonCancel}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.buttonSecondaryText}>Batal</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
  },
  modalImage: {
    width: "100%",
    height: 200,
    borderRadius: 8,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 10,
    textAlign: "center",
  },
  modalSubtitle: {
    fontSize: 14,
    color: "#555",
    textAlign: "center",
    marginBottom: 10,
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 12,
    marginBottom: 15,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  buttonPrimary: {
    backgroundColor: "#1e90ff",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginBottom: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonSecondary: {
    backgroundColor: "#1e90ff",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginBottom: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonCancel: {
    backgroundColor: "#ff0000",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginBottom: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonPrimaryText: {
    color: "#fff",
    fontWeight: "bold",
  },
  buttonSecondaryText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default MovieItem;
