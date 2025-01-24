import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Alert
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const HistoryScreen = () => {
  const [bookingHistory, setBookingHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    loadUserDataAndHistory();
  }, []);

  const loadUserDataAndHistory = async () => {
    try {
      setLoading(true);
      const userDataString = await AsyncStorage.getItem('userData');
      
      if (!userDataString) {
        throw new Error('No user data found');
      }

      const userData = JSON.parse(userDataString);
      console.log('User Data:', userData);
      setUserData(userData);

      const response = await axios.get(
        `http://192.168.1.5:5000/api/book/history/${userData.username}`
      );

      console.log('History Response:', response.data);

      if (response.data.success) {
        setBookingHistory(response.data.bookings || []);
      }
    } catch (error) {
      console.error('Error fetching history:', error);
      Alert.alert('Error', 'Failed to load booking history');
    } finally {
      setLoading(false);
    }
  };

  const renderBookingItem = ({ item }) => (
    <View style={styles.bookingItem}>
      <Text style={styles.movieTitle}>{item.movieData.title}</Text>
      <Text>Date: {new Date(item.bookingDetails.date).toLocaleDateString()}</Text>
      <Text>Time: {item.bookingDetails.time}</Text>
      <Text>Seats: {item.bookingDetails.selectedSeats.join(', ')}</Text>
      <Text>Total: Rp {item.bookingDetails.totalAmount}</Text>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Booking History</Text>
      {bookingHistory.length > 0 ? (
        <FlatList
          data={bookingHistory}
          renderItem={renderBookingItem}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={styles.listContainer}
        />
      ) : (
        <Text style={styles.noBookings}>No booking history found</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff'
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16
  },
  bookingItem: {
    padding: 16,
    marginVertical: 8,
    backgroundColor: '#f5f5f5',
    borderRadius: 8
  },
  movieTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8
  },
  listContainer: {
    paddingBottom: 16
  },
  noBookings: {
    textAlign: 'center',
    fontSize: 16,
    color: '#666'
  }
});

export default HistoryScreen;
