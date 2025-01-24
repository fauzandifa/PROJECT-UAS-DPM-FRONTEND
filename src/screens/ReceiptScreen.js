import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const ReceiptScreen = ({ route, navigation }) => {
  const { movieData, bookingDetails, userData } = route.params;

  const handleDone = () => {
    navigation.navigate('NowPlaying');
  };

  const formatCurrency = (amount) => {
    return typeof amount === 'number' 
      ? `Rp ${amount.toLocaleString()}`
      : 'Rp 0';
  };

  const formatDate = (dateString) => {
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch {
      return 'Invalid date';
    }
  };

  const renderSeats = (seats) => {
    // Gunakan selectedSeats jika seats tidak ada
    const seatsArray = seats || bookingDetails?.selectedSeats;
    if (!seatsArray || !Array.isArray(seatsArray)) {
      return 'No seats selected';
    }
    return seatsArray.join(', ');
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#1e90ff', '#000']}
        style={styles.gradient}
      >
        <ScrollView style={styles.content}>
          <View style={styles.receiptCard}>
            <Text style={styles.receiptTitle}>Payment Receipt</Text>
            <View style={styles.divider} />

            {/* Customer Info */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Customer Information</Text>
              <Text style={styles.label}>Name:</Text>
              <Text style={styles.value}>{userData?.nama || 'N/A'}</Text>
              <Text style={styles.label}>Username:</Text>
              <Text style={styles.value}>{userData?.username || 'N/A'}</Text>
            </View>

            {/* Movie Info */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Movie Details</Text>
              <Text style={styles.label}>Movie:</Text>
              <Text style={styles.value}>{movieData?.title || 'N/A'}</Text>
              <Text style={styles.label}>Date:</Text>
              <Text style={styles.value}>
                {formatDate(bookingDetails?.date)}
              </Text>
              <Text style={styles.label}>Time:</Text>
              <Text style={styles.value}>{bookingDetails?.time || 'N/A'}</Text>
              <Text style={styles.label}>Seats:</Text>
              <Text style={styles.value}>{renderSeats(bookingDetails?.seats)}</Text>
            </View>

            {/* Payment Info */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Payment Details</Text>
              <Text style={styles.label}>Total Amount:</Text>
              <Text style={styles.amount}>
                {formatCurrency(bookingDetails?.totalAmount || bookingDetails?.totalPrice)}
              </Text>
            </View>

            <View style={styles.divider} />
            <Text style={styles.thankYou}>Thank you for your purchase!</Text>

            <TouchableOpacity
              style={styles.doneButton}
              onPress={handleDone}
            >
              <Text style={styles.doneButtonText}>Done</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  content: {
    padding: 20,
  },
  receiptCard: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    marginVertical: 20,
  },
  receiptTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#000',
  },
  divider: {
    height: 1,
    backgroundColor: '#ddd',
    marginVertical: 15,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1e90ff',
    marginBottom: 10,
  },
  label: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  value: {
    fontSize: 16,
    color: '#000',
    marginBottom: 10,
  },
  amount: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1e90ff',
  },
  thankYou: {
    textAlign: 'center',
    fontSize: 16,
    color: '#666',
    marginVertical: 10,
  },
  doneButton: {
    backgroundColor: '#1e90ff',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  doneButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ReceiptScreen;