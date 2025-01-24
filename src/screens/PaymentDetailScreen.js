import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
  ImageBackground,
  Modal,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { API_ENDPOINTS } from '../config/api';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';

const PaymentDetailScreen = ({ route, navigation }) => {
  const { movieData = {}, bookingDetails = {} } = route.params || {};
  
  useEffect(() => {
    if (!movieData.id || !bookingDetails.date || !bookingDetails.time || !bookingDetails.seats) {
      Alert.alert(
        'Error',
        'Invalid booking details',
        [
          {
            text: 'OK',
            onPress: () => navigation.goBack()
          }
        ]
      );
    }
  }, []);

  if (!movieData || !bookingDetails) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>No booking details available</Text>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (!movieData?.id || !movieData?.title || !movieData?.poster_path) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Invalid movie data</Text>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const [cardName, setCardName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showReceipt, setShowReceipt] = useState(false);
  const [userData, setUserData] = useState(null);
  const [password, setPassword] = useState('');

  const formatCardNumber = (text) => {
    // Remove any spaces and non-digits
    const cleaned = text.replace(/\s+/g, '').replace(/\D/g, '');
    // Add space after every 4 digits
    const formatted = cleaned.replace(/(\d{4})/g, '$1 ').trim();
    return formatted;
  };

  const formatExpiryDate = (text) => {
    // Remove any slashes and non-digits
    const cleaned = text.replace(/\//g, '').replace(/\D/g, '');
    // Add slash after first 2 digits
    if (cleaned.length >= 2) {
      return cleaned.slice(0, 2) + '/' + cleaned.slice(2, 4);
    }
    return cleaned;
  };

  const handlePayment = async () => {
    if (!cardName || !cardNumber || !expiryDate || !cvv) {
      Alert.alert('Error', 'Please fill in all payment details');
      return;
    }

    if (cardNumber.replace(/\s+/g, '').length !== 16) {
      Alert.alert('Error', 'Please enter a valid 16-digit card number');
      return;
    }

    if (cvv.length !== 3) {
      Alert.alert('Error', 'Please enter a valid 3-digit CVV');
      return;
    }

    try {
      setIsLoading(true);
      const token = await AsyncStorage.getItem('userToken');
      
      const response = await axios.post(
        API_ENDPOINTS.bookings + '/create',
        {
          movieId: movieData.id,
          movieTitle: movieData.title,
          date: bookingDetails.date,
          time: bookingDetails.time,
          seats: bookingDetails.seats,
          totalPrice: bookingDetails.totalPrice,
          paymentDetails: {
            cardName,
            cardNumber: cardNumber.replace(/\s+/g, ''),
            status: 'completed'
          }
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      if (response.data.success) {
        Alert.alert(
          'Success',
          'Your booking has been confirmed!',
          [
            {
              text: 'OK',
              onPress: () => navigation.navigate('Home')
            }
          ]
        );
      }
    } catch (error) {
      console.error('Payment error:', error);
      Alert.alert(
        'Error',
        error.response?.data?.message || 'Failed to process payment'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const getUserData = async () => {
    try {
      const userDataString = await AsyncStorage.getItem('userData');
      if (userDataString) {
        setUserData(JSON.parse(userDataString));
      }
    } catch (error) {
      console.error('Error getting user data:', error);
    }
  };

  const handlePasswordSubmit = async () => {
    try {
      const userDataString = await AsyncStorage.getItem('userData');
      const userData = JSON.parse(userDataString);

      // Kirim request ke backend untuk verifikasi password
      const response = await axios.post(
        `${API_ENDPOINTS.verifyPassword}`,
        {
          username: userData.user.username,
          password: password
        },
        {
          headers: {
            'Authorization': `Bearer ${userData.token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.data.success) {
        setShowPasswordModal(false);
        // Lanjutkan dengan pembuatan booking
        handlePayment();
      } else {
        Alert.alert('Error', 'Password incorrect');
      }
    } catch (error) {
      console.error('Password verification error:', error);
      Alert.alert(
        'Error',
        error.response?.data?.message || 'Failed to verify password'
      );
    }
  };

  const Receipt = () => (
    <Modal
      visible={showReceipt}
      transparent={true}
      animationType="slide"
    >
      <View style={styles.modalContainer}>
        <View style={styles.receiptCard}>
          <Text style={styles.receiptTitle}>Payment Receipt</Text>
          <View style={styles.receiptDivider} />
          
          {/* Customer Info */}
          <View style={styles.receiptSection}>
            <Text style={styles.receiptLabel}>Customer Name:</Text>
            <Text style={styles.receiptValue}>{userData?.nama}</Text>
            <Text style={styles.receiptLabel}>Username:</Text>
            <Text style={styles.receiptValue}>{userData?.username}</Text>
          </View>

          {/* Movie Info */}
          <View style={styles.receiptSection}>
            <Text style={styles.receiptLabel}>Movie:</Text>
            <Text style={styles.receiptValue}>{movieData.title}</Text>
            <Text style={styles.receiptLabel}>Date:</Text>
            <Text style={styles.receiptValue}>
              {new Date(bookingDetails.date).toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </Text>
            <Text style={styles.receiptLabel}>Time:</Text>
            <Text style={styles.receiptValue}>{bookingDetails.time}</Text>
            <Text style={styles.receiptLabel}>Seats:</Text>
            <Text style={styles.receiptValue}>{bookingDetails.seats.join(', ')}</Text>
          </View>

          {/* Payment Info */}
          <View style={styles.receiptSection}>
            <Text style={styles.receiptLabel}>Total Amount:</Text>
            <Text style={styles.receiptAmount}>
              Rp {bookingDetails.totalPrice.toLocaleString()}
            </Text>
          </View>

          <View style={styles.receiptDivider} />
          <Text style={styles.receiptThankYou}>Thank you for your purchase!</Text>

          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => {
              setShowReceipt(false);
              navigation.navigate('HistoryScreen');
            }}
          >
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );

  const PasswordModal = () => (
    <Modal
      visible={showPasswordModal}
      transparent={true}
      animationType="slide"
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Enter Password</Text>
          <Text style={styles.modalSubtitle}>
            Please enter your password to confirm payment
          </Text>
          <TextInput
            style={styles.passwordInput}
            placeholder="Enter your password"
            placeholderTextColor="#999"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
          <View style={styles.modalButtons}>
            <TouchableOpacity
              style={[styles.modalButton, styles.cancelButton]}
              onPress={() => setShowPasswordModal(false)}
            >
              <Text style={styles.modalButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.modalButton, styles.confirmButton]}
              onPress={handlePasswordSubmit}
            >
              <Text style={styles.modalButtonText}>Confirm</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );

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
            <Text style={styles.title}>Payment Details</Text>

            {/* Movie Info */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Movie</Text>
              <Text style={styles.movieTitle}>{movieData.title}</Text>
              <Text style={styles.movieInfo}>Rating: {movieData.vote_average}/10</Text>
            </View>

            {/* Booking Details */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Booking Information</Text>
              <View style={styles.detailRow}>
                <MaterialIcons name="date-range" size={20} color="#1e90ff" />
                <Text style={styles.detailText}>
                  Date: {formatDate(bookingDetails.date)}
                </Text>
              </View>
              <View style={styles.detailRow}>
                <MaterialIcons name="access-time" size={20} color="#1e90ff" />
                <Text style={styles.detailText}>
                  Time: {bookingDetails.time}
                </Text>
              </View>
              <View style={styles.detailRow}>
                <MaterialIcons name="event-seat" size={20} color="#1e90ff" />
                <Text style={styles.detailText}>
                  Seats: {bookingDetails.seats.join(', ')}
                </Text>
              </View>
            </View>

            {/* Price Summary */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Price Summary</Text>
              <View style={styles.priceRow}>
                <Text style={styles.priceLabel}>Total Price:</Text>
                <Text style={styles.priceAmount}>
                  Rp {bookingDetails.totalPrice.toLocaleString()}
                </Text>
              </View>
            </View>

            {/* Payment Button */}
            <TouchableOpacity
              style={[styles.paymentButton, isLoading && styles.paymentButtonDisabled]}
              onPress={() => setShowPasswordModal(true)}
              disabled={isLoading}
            >
              <Text style={styles.paymentButtonText}>
                {isLoading ? 'Processing...' : 'Proceed to Payment'}
              </Text>
            </TouchableOpacity>
          </ScrollView>

          <PasswordModal />
          <Receipt />
        </LinearGradient>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 18,
    color: '#666',
    marginBottom: 20,
  },
  backButton: {
    padding: 10,
    backgroundColor: '#1e90ff',
    borderRadius: 8,
  },
  backButtonText: {
    color: '#fff',
    fontSize: 16,
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
  title: {
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
  },
  movieTitle: {
    fontSize: 24,
    color: '#fff',
    marginBottom: 5,
  },
  movieInfo: {
    fontSize: 16,
    color: '#ccc',
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    gap: 10,
  },
  detailText: {
    color: '#fff',
    fontSize: 16,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  priceLabel: {
    color: '#fff',
    fontSize: 18,
  },
  priceAmount: {
    color: '#1e90ff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  paymentButton: {
    backgroundColor: '#1e90ff',
    padding: 18,
    borderRadius: 30,
    alignItems: 'center',
    marginVertical: 20,
    shadowColor: '#1e90ff',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 8,
  },
  paymentButtonDisabled: {
    backgroundColor: '#ccc',
  },
  paymentButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    width: '80%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalSubtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
    textAlign: 'center',
  },
  passwordInput: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    fontSize: 16,
  },
  modalButtons: {
    flexDirection: 'row',
    gap: 10,
  },
  modalButton: {
    padding: 15,
    borderRadius: 10,
    width: 120,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#ff4444',
  },
  confirmButton: {
    backgroundColor: '#1e90ff',
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  receiptCard: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    width: '90%',
    maxHeight: '80%',
  },
  receiptTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  receiptDivider: {
    height: 1,
    backgroundColor: '#ddd',
    marginVertical: 10,
  },
  receiptSection: {
    marginVertical: 10,
  },
  receiptLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  receiptValue: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 10,
  },
  receiptAmount: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1e90ff',
  },
  receiptThankYou: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666',
    marginVertical: 10,
  },
  closeButton: {
    backgroundColor: '#1e90ff',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default PaymentDetailScreen; 