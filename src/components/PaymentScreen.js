import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  TextInput,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

const PaymentScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { movieData } = route.params;

  console.log(movieData); // Log movieData to check its contents

  const [currentStep, setCurrentStep] = useState(0);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [paymentDetails, setPaymentDetails] = useState({
    cardName: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });
  const [selectedSeats, setSelectedSeats] = useState([]);

  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

  const dates = Array.from({ length: daysInMonth }, (_, i) => ({
    day: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][
      (firstDayOfMonth + i) % 7
    ],
    date: i + 1,
  }));

  // Add empty elements to align the first day of the month correctly
  const calendarDays = Array(firstDayOfMonth).fill(null).concat(dates);

  const times = [
    { time: "13:00", price: 5.28 },
    { time: "15:45", price: 5.99 },
    { time: "18:50", price: 4.5 },
    { time: "20:30", price: 5.65 },
  ];

  const [seats, setSeats] = useState([
    [
      { id: 1, status: "available" },
      { id: 2, status: "available" },
      { id: 3, status: "reserved" },
      { id: 4, status: "reserved" },
      { id: 5, status: "available" },
      { id: 6, status: "available" },
    ],
    [
      { id: 7, status: "available" },
      { id: 8, status: "available" },
      { id: 9, status: "reserved" },
      { id: 10, status: "reserved" },
      { id: 11, status: "available" },
      { id: 12, status: "available" },
    ],
    [
      { id: 13, status: "available" },
      { id: 14, status: "available" },
      { id: 15, status: "available" },
      { id: 16, status: "available" },
      { id: 17, status: "available" },
      { id: 18, status: "available" },
    ],
    [
      { id: 19, status: "available" },
      { id: 20, status: "reserved" },
      { id: 21, status: "reserved" },
      { id: 22, status: "reserved" },
      { id: 23, status: "reserved" },
      { id: 24, status: "available" },
    ],
    [
      { id: 25, status: "available" },
      { id: 26, status: "available" },
      { id: 27, status: "available" },
      { id: 28, status: "available" },
      { id: 29, status: "available" },
      { id: 30, status: "available" },
    ],
  ]);

  const handleSeatSelect = (rowIndex, colIndex) => {
    setSeats((prevSeats) => {
      const updatedSeats = prevSeats.map((row, rIdx) =>
        row.map((seat, cIdx) => {
          if (rIdx === rowIndex && cIdx === colIndex) {
            if (seat.status === "available") {
              setSelectedSeats([...selectedSeats, seat.id]);
              return { ...seat, status: "selected" };
            } else if (seat.status === "selected") {
              setSelectedSeats(selectedSeats.filter((id) => id !== seat.id));
              return { ...seat, status: "available" };
            }
          }
          return seat;
        })
      );
      return updatedSeats;
    });
  };

  const calculateTotalPrice = () => {
    if (selectedTime !== null) {
      const pricePerSeat = times[selectedTime].price;
      return (pricePerSeat * selectedSeats.length).toFixed(2);
    }
    return "0.00";
  };

  const renderMovieDetails = () => (
    <ScrollView style={styles.container}>
      <Image
        source={{
          uri: `https://image.tmdb.org/t/p/w500${movieData.poster_path}`,
        }}
        style={styles.movieImage}
      />
      <Text style={styles.title}>{movieData.title}</Text>
      <Text style={styles.duration}>152 minutes • 7.0 (IMDb)</Text>
      <Text style={styles.synopsis}>{movieData.overview}</Text>
      <TouchableOpacity
        style={styles.buyButton}
        onPress={() => setCurrentStep(1)}
      >
        <Text style={styles.buyButtonText}>Buy Ticket</Text>
      </TouchableOpacity>
    </ScrollView>
  );

  const renderTimeDate = () => (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
    >
      <Text style={styles.title}>{movieData.title}</Text>

      {/* Kalender */}
      <View style={styles.calendarContainer}>
        {/* Header Hari */}
        <View style={styles.calendarHeader}>
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
            (day, index) => (
              <Text key={index} style={styles.dayLabel}>
                {day}
              </Text>
            )
          )}
        </View>

        {/* Grid Tanggal */}
        <View style={styles.calendarBody}>
          {calendarDays.map((date, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.calendarDay,
                selectedDate === index && styles.selectedCalendarDay,
              ]}
              onPress={() => date && setSelectedDate(index)}
              disabled={!date}
            >
              <Text
                style={[
                  styles.calendarDayText,
                  selectedDate === index && styles.selectedCalendarDayText,
                ]}
              >
                {date ? date.date : ""}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.timeList}>
        {times.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.timeItem,
              selectedTime === index && styles.selectedTime,
            ]}
            onPress={() => setSelectedTime(index)}
          >
            <Text
              style={[
                styles.timeText,
                selectedTime === index && styles.selectedTimeText,
              ]}
            >
              {item.time}
            </Text>
            <Text
              style={[
                styles.priceText,
                selectedTime === index && styles.selectedTimeText,
              ]}
            >
              {item.price}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.seatMap}>
        <Text style={styles.seatTitle}>Screen This Way</Text>
        {/* Add seat selection grid here */}
        <View style={styles.seatGrid}>
          {seats.map((row, rowIndex) => (
            <View key={rowIndex} style={styles.seatRow}>
              {row.map((seat, colIndex) => (
                <TouchableOpacity
                  key={colIndex}
                  style={[
                    styles.seat,
                    seat.status === "reserved" && styles.reservedSeat,
                    seat.status === "selected" && styles.selectedSeat,
                  ]}
                  onPress={() => handleSeatSelect(rowIndex, colIndex)}
                  disabled={seat.status === "reserved"}
                >
                  <Text style={styles.seatText}>
                    {seat.status === "selected" ? "✔" : ""}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          ))}
        </View>
      </View>

      <View style={styles.totalContainer}>
        <Text style={styles.totalLabel}>Total</Text>
        <Text style={styles.totalAmount}>${calculateTotalPrice()}</Text>
      </View>

      <TouchableOpacity
        style={styles.buyButton}
        onPress={() => setCurrentStep(2)}
      >
        <Text style={styles.continueButtonText}>Continue</Text>
      </TouchableOpacity>
    </ScrollView>
  );

  const renderPayment = () => (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
    >
      <Text style={styles.paymentTitle}>Payment</Text>
      <TextInput
        style={styles.input}
        placeholder="Card Name"
        value={paymentDetails.cardName}
        onChangeText={(text) =>
          setPaymentDetails({ ...paymentDetails, cardName: text })
        }
      />

      <TextInput
        style={styles.input}
        placeholder="Card Number"
        keyboardType="numeric"
        value={paymentDetails.cardNumber}
        onChangeText={(text) =>
          setPaymentDetails({ ...paymentDetails, cardNumber: text })
        }
      />

      <View style={styles.totalContainer}>
        <Text style={styles.totalLabel}>Sub-total</Text>
        <Text style={styles.totalAmount}>${calculateTotalPrice()}</Text>
      </View>

      <View style={styles.totalContainer}>
        <Text style={styles.totalLabel}>Total</Text>
        <Text style={styles.totalAmount}>${calculateTotalPrice()}</Text>
      </View>

      <TouchableOpacity
        style={styles.payButton}
        onPress={() => setCurrentStep(3)}
      >
        <Text style={styles.payButtonText}>Pay</Text>
      </TouchableOpacity>
    </ScrollView>
  );

  const renderSuccess = () => (
    <View style={styles.successContainer}>
      <Text style={styles.successTitle}>Successful</Text>
      <View style={[styles.successIcon, { backgroundColor: "#1e90ff" }]}>
        <Text style={styles.checkmark}>✓</Text>
      </View>
      <Text style={styles.successText}>
        Your ticket has been booked for {dates[selectedDate]?.day},{" "}
        {dates[selectedDate]?.date} at {times[selectedTime]?.time}
      </Text>
      <TouchableOpacity
        style={styles.returnButton}
        onPress={() => navigation.navigate("Home")}
      >
        <Text style={styles.returnButtonText}>Return Home</Text>
      </TouchableOpacity>
    </View>
  );

  const renderContent = () => {
    switch (currentStep) {
      case 0:
        return renderMovieDetails();
      case 1:
        return renderTimeDate();
      case 2:
        return renderPayment();
      case 3:
        return renderSuccess();
      default:
        return renderMovieDetails();
    }
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => setCurrentStep(0)}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>payment</Text>
      </View>
      {renderContent()}
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1e90ff",
    padding: 15,
    paddingTop: 50,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginLeft: 20,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  movieImage: {
    width: "100%",
    height: 400,
    borderRadius: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 10,
  },
  genreContainer: {
    flexDirection: "row",
    marginBottom: 15,
  },
  genre: {
    backgroundColor: "#f0f0f0",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 16,
    marginRight: 8,
  },
  buyButton: {
    backgroundColor: "#1e90ff",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 20,
  },
  buyButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  calendarContainer: {
    marginVertical: 20,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    backgroundColor: "#f9f9f9",
  },
  calendarHeader: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
    backgroundColor: "#f0f0f0",
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  dayLabel: {
    flex: 1,
    textAlign: "center",
    fontWeight: "bold",
    color: "#666",
  },
  calendarBody: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    paddingVertical: 10,
    backgroundColor: "#fff",
  },
  calendarDay: {
    width: "13%",
    aspectRatio: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    marginVertical: 5,
    backgroundColor: "#f9f9f9",
  },
  selectedCalendarDay: {
    backgroundColor: "#1e90ff",
    borderRadius: 10,
  },
  calendarDayText: {
    color: "#444",
    fontWeight: "600",
  },
  selectedCalendarDayText: {
    color: "#fff",
  },
  seatMap: {
    alignItems: "center",
    marginVertical: 20,
  },
  seatTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  seatGrid: {
    width: "100%",
    padding: 10,
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
  },
  seatRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 5,
  },
  seat: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    backgroundColor: "#d3d3d3",
  },
  reservedSeat: {
    backgroundColor: "#ff4d4d",
  },
  selectedSeat: {
    backgroundColor: "#1e90ff",
  },
  seatText: {
    color: "#fff",
    fontWeight: "bold",
  },
  payButton: {
    backgroundColor: "#1e90ff",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
    color: "#fff",
  },
  payButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  continueButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  successContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  successIcon: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#4CAF50",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 20,
  },
  checkmark: {
    color: "#fff",
    fontSize: 50,
  },
  successText: {
    fontSize: 18,
    textAlign: "center",
    marginVertical: 10,
    fontWeight: "bold",
  },
  returnButton: {
    backgroundColor: "#1e90ff",
    padding: 15,
    borderRadius: 8,
    width: "100%",
    alignItems: "center",
    marginTop: 20,
  },
  returnButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  backButton: {
    fontSize: 24,
    marginBottom: 10,
  },
  dateScrollContainer: {
    flexDirection: "row",
    paddingHorizontal: 10,
    alignItems: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
  },
  cardRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  halfInput: {
    width: "48%",
  },
  totalContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  timeList: {
    marginVertical: 20,
    color: "#000",
  },
  timeItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    backgroundColor: "#f0f0f0",
  },
  selectedTime: {
    backgroundColor: "#1e90ff",
  },
  selectedTimeText: {
    color: "#fff",
  },
  timeText: {
    color: "#000",
  },
  priceText: {
    color: "#000",
  },
  successTitle: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
});

export default PaymentScreen;
