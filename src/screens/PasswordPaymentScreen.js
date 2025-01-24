import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';

const PasswordPaymentScreen = ({ route, navigation }) => {
  const { movieData, bookingDetails } = route.params;
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState('');
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const getUserData = async () => {
      try {
        const userDataString = await AsyncStorage.getItem('userData');
        if (userDataString) {
          const data = JSON.parse(userDataString);
          setUserData(data);
          setUsername(data.user.username || '');
        }
      } catch (error) {
        console.error('Error getting username:', error);
      }
    };
    getUserData();
  }, []);

  const handlePayment = async () => {
    if (!password) {
      Alert.alert('Error', 'Please enter your password');
      return;
    }
  
    try {
      const response = await axios.post(
        'http://192.168.1.5:5000/api/book/verify-password',
        {
          username,
          password,
          movieData,
          bookingDetails
        }
      );
  
      if (response.data.success) {
        Alert.alert('Payment Successful', 'Your booking has been confirmed!');
        navigation.navigate('ReceiptScreen', {
          movieData,
          bookingDetails,
          userData: {
            nama: userData.user.nama,
            username: userData.user.username
          }
        });
      }
    } catch (error) {
      Alert.alert('Payment Failed', 'Please check your password and try again.');
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={{ uri: `https://image.tmdb.org/t/p/w500${movieData.poster_path}` }}
        style={styles.backgroundImage}
      >
        <LinearGradient
          colors={['rgba(0,0,0,0.7)', 'rgba(0,0,0,0.9)']}
          style={styles.gradient}
        >
          <View style={styles.content}>
            <Text style={styles.title}>Payment Confirmation</Text>
            <Text style={styles.subtitle}>
              Please enter your password {username} to confirm payment
            </Text>
            
            <View style={styles.passwordContainer}>
              <TextInput
                style={styles.passwordInput}
                placeholder="Enter your password"
                placeholderTextColor="#999"
                secureTextEntry={!showPassword}
                value={password}
                onChangeText={setPassword}
              />
              <TouchableOpacity 
                style={styles.eyeIcon}
                onPress={toggleShowPassword}
              >
                <Ionicons 
                  name={showPassword ? "eye-off" : "eye"} 
                  size={24} 
                  color="#1e90ff"
                />
              </TouchableOpacity>
            </View>

            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[styles.button, styles.cancelButton]}
                onPress={() => navigation.goBack()}
              >
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={[styles.button, styles.confirmButton]}
                onPress={handlePayment}
              >
                <Text style={styles.buttonText}>Confirm Payment</Text>
              </TouchableOpacity>
            </View>
          </View>
        </LinearGradient>
      </ImageBackground>
    </View>
  );
};

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
    justifyContent: 'center',
  },
  content: {
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#ccc',
    marginBottom: 30,
    textAlign: 'center',
  },
  passwordContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    position: 'relative',
  },
  passwordInput: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 10,
    padding: 15,
    paddingRight: 50,
    color: '#fff',
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#1e90ff',
  },
  eyeIcon: {
    position: 'absolute',
    right: 15,
    padding: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 20,
  },
  button: {
    padding: 15,
    borderRadius: 10,
    width: 150,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#ff4444',
  },
  confirmButton: {
    backgroundColor: '#1e90ff',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default PasswordPaymentScreen; 