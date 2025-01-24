import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  RefreshControl,
  Alert
} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BookingUserScreen = () => {
  const [bookings, setBookings] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [username, setUsername] = useState('');

  useEffect(() => {
    const getUserDataAndBookings = async () => {
      try {
        // Get userData from AsyncStorage
        const userDataString = await AsyncStorage.getItem('userData');
        if (userDataString) {
          const userData = JSON.parse(userDataString);
          setUsername(userData.username);
          
          // Fetch bookings with username
          if (userData.username) {
            const response = await axios.get(`http://192.168.1.5:5000/api/book/user-bookings?username=${userData.username}`);
            console.log('Bookings response:', response.data);
            if (response.data.success) {
              setBookings(response.data.data);
            }
          }
        }
      } catch (error) {
        console.error('Error:', error);
        Alert.alert('Error', 'Failed to load bookings');
      }
    };

    getUserDataAndBookings();
  }, []);

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    try {
      if (username) {
        const response = await axios.get(`http://192.168.1.5:5000/api/book/user-bookings?username=${username}`);
        if (response.data.success) {
          setBookings(response.data.data);
        }
      }
    } catch (error) {
      console.error('Error refreshing:', error);
      Alert.alert('Error', 'Failed to refresh bookings');
    } finally {
      setRefreshing(false);
    }
  }, [username]);

  const renderSeats = (seats) => {
    if (!seats || !Array.isArray(seats) || seats.length === 0) {
      return 'No seats';
    }
    return seats.join(', ');
  };

  const formatDate = (dateString) => {
    try {
      return new Date(dateString).toLocaleDateString();
    } catch {
      return 'Invalid date';
    }
  };

  return (
    <ScrollView 
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <Text style={styles.title}>My Bookings</Text>
      {bookings && bookings.length > 0 ? (
        bookings.map((booking) => (
          <View key={booking._id} style={styles.card}>
            <Text style={styles.cardTitle}>
              {booking.movieData?.title || 'Untitled Movie'}
            </Text>
            <Text style={styles.cardText}>
              Date: {formatDate(booking.bookingDetails?.date)}
            </Text>
            <Text style={styles.cardText}>
              Time: {booking.bookingDetails?.time || 'No time specified'}
            </Text>
            <Text style={styles.cardText}>
              Seats: {renderSeats(booking.bookingDetails?.selectedSeats)}
            </Text>
            <Text style={styles.cardText}>
              Total: Rp {(booking.bookingDetails?.totalAmount || 0).toLocaleString()}
            </Text>
          </View>
        ))
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No bookings found</Text>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    margin: 15,
  },
  card: {
    backgroundColor: '#1e1e1e',
    padding: 15,
    margin: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#333',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1e90ff',
    marginBottom: 10,
  },
  cardText: {
    color: '#fff',
    marginBottom: 5,
  },
  emptyContainer: {
    padding: 20,
    alignItems: 'center',
  },
  emptyText: {
    color: '#fff',
    fontSize: 16,
  }
});

export default BookingUserScreen;