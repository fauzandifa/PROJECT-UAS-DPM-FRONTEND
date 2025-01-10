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
import { useRoute } from "@react-navigation/native";

const PaymentScreen = ({ navigation }) => {
  const route = useRoute();
  const { movieData } = route.params;
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedDate, setSelectedDate] = useState(0);
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedSeat, setSelectedSeat] = useState(null);
  const [paymentDetails, setPaymentDetails] = useState({
    cardName: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });

  const dates = [
    { day: "Fri", date: "17" },
    { day: "Sat", date: "18" },
    { day: "Sun", date: "19" },
    { day: "Mon", date: "20" },
    { day: "Tue", date: "21" },
  ];

  const times = [
    { time: "13:00", price: "$5.28" },
    { time: "15:45", price: "$5.99" },
    { time: "18:50", price: "$4.50" },
    { time: "20:30", price: "$5.65" },
  ];

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

      <View style={styles.genreContainer}>
        <Text style={styles.genre}>Action</Text>
        <Text style={styles.genre}>Sci-Fi</Text>
      </View>

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
    <View style={styles.container}>
      <TouchableOpacity onPress={() => setCurrentStep(0)}>
        <Text style={styles.backButton}>{"<"}</Text>
      </TouchableOpacity>

      <Text style={styles.title}>{movieData.title}</Text>

      <View style={styles.dateList}>
        {dates.map((date, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.dateItem,
              selectedDate === index && styles.selectedDate,
            ]}
            onPress={() => setSelectedDate(index)}
          >
            <Text style={styles.dayText}>{date.day}</Text>
            <Text style={styles.dateText}>{date.date}</Text>
          </TouchableOpacity>
        ))}
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
            <Text style={styles.timeText}>{item.time}</Text>
            <Text style={styles.priceText}>{item.price}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.seatMap}>
        <Text style={styles.seatTitle}>Screen This Way</Text>
        {/* Add seat selection grid here */}
      </View>

      <TouchableOpacity
        style={styles.continueButton}
        onPress={() => setCurrentStep(2)}
      >
        <Text style={styles.continueButtonText}>Continue</Text>
      </TouchableOpacity>
    </View>
  );

  const renderPayment = () => (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => setCurrentStep(1)}>
        <Text style={styles.backButton}>{"<"}</Text>
      </TouchableOpacity>

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

      <View style={styles.cardRow}>
        <TextInput
          style={[styles.input, styles.halfInput]}
          placeholder="Expiring date"
          value={paymentDetails.expiryDate}
          onChangeText={(text) =>
            setPaymentDetails({ ...paymentDetails, expiryDate: text })
          }
        />
        <TextInput
          style={[styles.input, styles.halfInput]}
          placeholder="CVV"
          keyboardType="numeric"
          value={paymentDetails.cvv}
          onChangeText={(text) =>
            setPaymentDetails({ ...paymentDetails, cvv: text })
          }
        />
      </View>

      <View style={styles.totalContainer}>
        <Text style={styles.totalLabel}>Sub-total</Text>
        <Text style={styles.totalAmount}>$40.00</Text>
      </View>

      <View style={styles.totalContainer}>
        <Text style={styles.totalLabel}>Total</Text>
        <Text style={styles.totalAmount}>$40.00</Text>
      </View>

      <TouchableOpacity
        style={styles.payButton}
        onPress={() => setCurrentStep(3)}
      >
        <Text style={styles.payButtonText}>Pay</Text>
      </TouchableOpacity>
    </View>
  );

  const renderSuccess = () => (
    <View style={styles.successContainer}>
      <Text style={styles.successTitle}>Successful</Text>
      <View style={styles.successIcon}>
        <Text style={styles.checkmark}>✓</Text>
      </View>
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

  return <View style={styles.mainContainer}>{renderContent()}</View>;
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    padding: 20,
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
  duration: {
    fontSize: 14,
    color: "#666",
    marginBottom: 10,
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
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  buyButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  dateList: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 20,
  },
  dateItem: {
    padding: 10,
    alignItems: "center",
    borderRadius: 8,
  },
  selectedDate: {
    backgroundColor: "#1e90ff",
  },
  timeList: {
    marginVertical: 20,
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
  payButton: {
    backgroundColor: "#ff0000",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
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
  returnButton: {
    backgroundColor: "#666",
    padding: 15,
    borderRadius: 8,
    width: "100%",
    alignItems: "center",
    marginTop: 20,
  },
  backButton: {
    fontSize: 24,
    marginBottom: 10,
  },
});

export default PaymentScreen;
