import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  ImageBackground,
  Dimensions,
  Alert,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';

const BookFilmScreen = ({ route, navigation }) => {
  const { movieData } = route.params;
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const timeSlots = ['10:00', '13:00', '16:00', '19:00', '22:00'];
  const PRICE_PER_SEAT = 50000;
  const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

  // Definisikan layout kursi
  const rows = ['A', 'B', 'C', 'D', 'E', 'F'];
  const seatsPerRow = 5;

  // Tambahkan konstanta harga tiket
  const TICKET_PRICE = 50000; // Rp 50.000 per tiket

  // Tambahkan fungsi calculateTotalPrice
  const calculateTotalPrice = () => {
    return selectedSeats.length * TICKET_PRICE;
  };

  const handleDateChange = (event, date) => {
    setShowDatePicker(false);
    if (date) {
      setSelectedDate(date);
    }
  };

  const handleSeatSelection = (seatId) => {
    if (selectedSeats.includes(seatId)) {
      setSelectedSeats(selectedSeats.filter(seat => seat !== seatId));
    } else {
      setSelectedSeats([...selectedSeats, seatId]);
    }
  };

  const handleBooking = () => {
    if (!selectedDate || !selectedTime || selectedSeats.length === 0) {
      Alert.alert('Error', 'Please select date, time and seats');
      return;
    }

    navigation.navigate('PasswordPayment', {
      movieData,
      bookingDetails: {
        date: selectedDate,
        time: selectedTime,
        seats: selectedSeats,
        totalPrice: calculateTotalPrice(),
        ticketPrice: TICKET_PRICE,
        numberOfTickets: selectedSeats.length
      }
    });
  };

  const renderSeats = () => {
    return rows.map((row) => (
      <View key={row} style={styles.rowContainer}>
        <Text style={styles.rowLabel}>{row}</Text>
        <View style={styles.seatsRow}>
          {[...Array(seatsPerRow)].map((_, index) => {
            const seatId = `${row}${index + 1}`;
            return (
              <TouchableOpacity
                key={seatId}
                style={[
                  styles.seat,
                  selectedSeats.includes(seatId) && styles.selectedSeat
                ]}
                onPress={() => handleSeatSelection(seatId)}
              >
                <Text 
                  style={[
                    styles.seatText,
                    selectedSeats.includes(seatId) && styles.selectedSeatText
                  ]}
                >
                  {index + 1}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    ));
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={{ uri: `${IMAGE_BASE_URL}${movieData.poster_path}` }}
        style={styles.backgroundImage}
      >
        <LinearGradient
          colors={['rgba(0,0,0,0.7)', 'rgba(0,0,0,0.9)']}
          style={styles.gradient}
        >
          <ScrollView style={styles.content}>
            <Text style={styles.movieTitle}>{movieData.title}</Text>
            
            {/* Date Selection */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>
                <MaterialIcons name="date-range" size={24} color="#1e90ff" />
                {' '}Select Date
              </Text>
              <TouchableOpacity 
                style={styles.dateButton}
                onPress={() => setShowDatePicker(true)}
              >
                <Text style={styles.dateText}>{selectedDate.toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}</Text>
              </TouchableOpacity>
              {showDatePicker && (
                <DateTimePicker
                  value={selectedDate}
                  mode="date"
                  onChange={handleDateChange}
                  minimumDate={new Date()}
                />
              )}
            </View>

            {/* Time Selection */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>
                <Ionicons name="time-outline" size={24} color="#1e90ff" />
                {' '}Select Time
              </Text>
              <View style={styles.timeContainer}>
                {timeSlots.map((time) => (
                  <TouchableOpacity
                    key={time}
                    style={[
                      styles.timeSlot,
                      selectedTime === time && styles.selectedTimeSlot
                    ]}
                    onPress={() => setSelectedTime(time)}
                  >
                    <Text style={selectedTime === time ? styles.selectedTimeText : styles.timeText}>
                      {time}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Seat Selection */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>
                <MaterialIcons name="event-seat" size={24} color="#1e90ff" />
                {' '}Select Seats
              </Text>
              <View style={styles.screen}>
                <Text style={styles.screenText}>SCREEN</Text>
              </View>
              <View style={styles.seatsContainer}>
                {renderSeats()}
              </View>
              <View style={styles.legendContainer}>
                <View style={styles.legendItem}>
                  <View style={styles.legendSeat} />
                  <Text style={styles.legendText}>Available</Text>
                </View>
                <View style={styles.legendItem}>
                  <View style={[styles.legendSeat, styles.selectedSeat]} />
                  <Text style={styles.legendText}>Selected</Text>
                </View>
                <View style={styles.legendItem}>
                  <View style={[styles.legendSeat, styles.bookedSeat]} />
                  <Text style={styles.legendText}>Booked</Text>
                </View>
              </View>
            </View>

            {/* Price Summary */}
            <View style={styles.priceContainer}>
              <Text style={styles.priceLabel}>Total Price:</Text>
              <Text style={styles.priceAmount}>
                Rp {(selectedSeats.length * PRICE_PER_SEAT).toLocaleString()}
              </Text>
            </View>

            <TouchableOpacity
              style={[
                styles.continueButton,
                (!selectedTime || selectedSeats.length === 0) && styles.disabledButton
              ]}
              onPress={handleBooking}
              disabled={!selectedTime || selectedSeats.length === 0}
            >
              <Text style={styles.continueButtonText}>Continue to Payment</Text>
            </TouchableOpacity>
          </ScrollView>
        </LinearGradient>
      </ImageBackground>
    </View>
  );
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
  },
  gradient: {
    flex: 1,
  },
  content: {
    padding: 20,
  },
  movieTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 25,
    textAlign: 'center',
  },
  section: {
    marginBottom: 25,
    backgroundColor: 'rgba(255,255,255,0.1)',
    padding: 15,
    borderRadius: 15,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateButton: {
    padding: 15,
    backgroundColor: 'rgba(30,144,255,0.2)',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#1e90ff',
  },
  dateText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
  timeContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    justifyContent: 'center',
  },
  timeSlot: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#1e90ff',
    backgroundColor: 'rgba(30,144,255,0.2)',
  },
  selectedTimeSlot: {
    backgroundColor: '#1e90ff',
  },
  timeText: {
    color: '#fff',
    fontSize: 16,
  },
  selectedTimeText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  screen: {
    width: '80%',
    height: 40,
    backgroundColor: 'rgba(255,255,255,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginBottom: 30,
    alignSelf: 'center',
    transform: [{perspective: 500}, {rotateX: '-30deg'}],
    borderWidth: 2,
    borderColor: 'rgba(30,144,255,0.5)',
  },
  screenText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  seatsContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  rowLabel: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    width: 30,
    textAlign: 'center',
  },
  seatsRow: {
    flexDirection: 'row',
    gap: 10,
  },
  seat: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderWidth: 1,
    borderColor: '#1e90ff',
    margin: 2,
  },
  selectedSeat: {
    backgroundColor: '#1e90ff',
  },
  seatText: {
    color: '#fff',
    fontSize: 14,
  },
  selectedSeatText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  legendContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 30,
    gap: 20,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  legendSeat: {
    width: 20,
    height: 20,
    borderRadius: 5,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderWidth: 1,
    borderColor: '#1e90ff',
  },
  legendText: {
    color: '#fff',
    fontSize: 12,
  },
  bookedSeat: {
    backgroundColor: 'rgba(255,0,0,0.2)',
    borderColor: '#ff0000',
  },
  priceContainer: {
    marginVertical: 20,
    padding: 20,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 15,
  },
  priceLabel: {
    color: '#fff',
    fontSize: 18,
    marginBottom: 5,
  },
  priceAmount: {
    color: '#1e90ff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  continueButton: {
    backgroundColor: '#1e90ff',
    padding: 18,
    borderRadius: 30,
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#1e90ff',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 8,
  },
  disabledButton: {
    backgroundColor: 'rgba(30,144,255,0.5)',
    shadowOpacity: 0,
    elevation: 0,
  },
  continueButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default BookFilmScreen; 