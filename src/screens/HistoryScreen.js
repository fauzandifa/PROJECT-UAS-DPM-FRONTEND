import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import Navbar from "../components/Navbar";
import axios from 'axios';
import axiosInstance, { API_ENDPOINTS } from '../config/api';

const HistoryScreen = () => {
  const [bookingHistory, setBookingHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activePage, setActivePage] = useState("History");

  useEffect(() => {
    fetchBookingHistory();
  }, []);

  const fetchBookingHistory = async () => {
    try {
      setLoading(true);
      const userData = await AsyncStorage.getItem('userData');
      
      if (!userData) {
        console.log('No user data found');
        setLoading(false);
        return;
      }

      const { user } = JSON.parse(userData);
      console.log('Fetching history for user:', user.username);
      
      const response = await axiosInstance.get(API_ENDPOINTS.bookingHistory(user.username));
      
      console.log('Response received:', response.data);
      
      if (response.data.success) {
        setBookingHistory(response.data.data);
      } else {
        console.error('Failed to fetch booking history:', response.data.message);
      }
    } catch (error) {
      console.error('Error details:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status
      });
      setBookingHistory([]);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const options = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString('id-ID', options);
  };

  // Update tampilan booking card untuk menampilkan data yang sesuai
  const renderBookingCard = (booking) => (
    <View key={booking._id} style={styles.bookingCard}>
      <View style={styles.bookingHeader}>
        <Text style={styles.bookingId}>Booking #{booking._id.slice(-6)}</Text>
        <Text style={[
          styles.bookingStatus,
          { color: booking.status === 'completed' ? '#4CAF50' : '#FFA000' }
        ]}>
          {booking.status.toUpperCase()}
        </Text>
      </View>
      
      <View style={styles.bookingDetails}>
        <View style={styles.detailRow}>
          <Text style={styles.label}>Film:</Text>
          <Text style={styles.value}>{booking.movieTitle}</Text>
        </View>
        
        <View style={styles.detailRow}>
          <Text style={styles.label}>Tanggal:</Text>
          <Text style={styles.value}>{booking.date}</Text>
        </View>
        
        <View style={styles.detailRow}>
          <Text style={styles.label}>Waktu:</Text>
          <Text style={styles.value}>{booking.time}</Text>
        </View>
        
        <View style={styles.detailRow}>
          <Text style={styles.label}>Kursi:</Text>
          <Text style={styles.value}>{booking.seats.join(', ')}</Text>
        </View>
        
        <View style={styles.detailRow}>
          <Text style={styles.label}>Total:</Text>
          <Text style={styles.value}>Rp {booking.totalPrice.toLocaleString()}</Text>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#1e90ff', '#00bfff']}
        style={styles.header}
      >
        <Text style={styles.headerTitle}>Booking History</Text>
      </LinearGradient>

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#1e90ff" />
        </View>
      ) : (
        <ScrollView style={styles.content}>
          {bookingHistory.length > 0 ? (
            bookingHistory.map(renderBookingCard)
          ) : (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No booking history found</Text>
            </View>
          )}
        </ScrollView>
      )}
      <Navbar activePage={activePage} setActivePage={setActivePage} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 20,
    paddingTop: 60,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    padding: 15,
  },
  bookingCard: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  bookingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  bookingId: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  bookingStatus: {
    fontSize: 14,
    color: '#1e90ff',
    fontWeight: '500',
  },
  bookingDetails: {
    gap: 10,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    fontSize: 14,
    color: '#666',
  },
  value: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 50,
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
});

export default HistoryScreen;
