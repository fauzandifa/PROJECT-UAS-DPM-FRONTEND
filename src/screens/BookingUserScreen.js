import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  RefreshControl,
} from 'react-native';
import axios from 'axios';
import { API_ENDPOINTS } from '../config/api';

const BookingUserScreen = () => {
  const [bookings, setBookings] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const fetchBookings = async () => {
    try {
      const response = await axios.get(API_ENDPOINTS.allBookings);
      setBookings(response.data.data);
    } catch (error) {
      console.error('Error fetching bookings:', error);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    fetchBookings().finally(() => setRefreshing(false));
  }, []);

  return (
    <ScrollView 
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <Text style={styles.title}>All Bookings</Text>
      {bookings.map((booking) => (
        <View key={booking._id} style={styles.card}>
          <Text style={styles.cardTitle}>{booking.movieData.title}</Text>
          <Text style={styles.cardText}>
            Date: {new Date(booking.bookingDetails.date).toLocaleDateString()}
          </Text>
          <Text style={styles.cardText}>Time: {booking.bookingDetails.time}</Text>
          <Text style={styles.cardText}>
            Seats: {booking.bookingDetails.seats.join(', ')}
          </Text>
          <Text style={styles.cardText}>
            Total: Rp {booking.bookingDetails.totalPrice.toLocaleString()}
          </Text>
        </View>
      ))}
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
});

export default BookingUserScreen; 