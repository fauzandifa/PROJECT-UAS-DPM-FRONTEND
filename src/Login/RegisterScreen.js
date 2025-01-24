import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
  Animated,
  ScrollView,
} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from "@expo/vector-icons";
import axios from 'axios';
import { API_ENDPOINTS, BASE_URL } from '../config/api';

const RegisterScreen = ({ navigation }) => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    nama: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [usernameFocused, setUsernameFocused] = useState(false);
  const [fullnameFocused, setFullnameFocused] = useState(false);
  const [emailLabelPosition] = useState(new Animated.Value(0));
  const [passwordLabelPosition] = useState(new Animated.Value(0));
  const [usernameLabelPosition] = useState(new Animated.Value(0));
  const [fullnameLabelPosition] = useState(new Animated.Value(0));

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleFocus = (field) => {
    switch(field) {
      case 'username':
        setUsernameFocused(true);
        Animated.timing(usernameLabelPosition, {
          toValue: -7,
          duration: 200,
          useNativeDriver: true,
        }).start();
        break;
      case 'fullname':
        setFullnameFocused(true);
        Animated.timing(fullnameLabelPosition, {
          toValue: -7,
          duration: 200,
          useNativeDriver: true,
        }).start();
        break;
      case 'email':
        setEmailFocused(true);
        Animated.timing(emailLabelPosition, {
          toValue: -7,
          duration: 200,
          useNativeDriver: true,
        }).start();
        break;
      case 'password':
        setPasswordFocused(true);
        Animated.timing(passwordLabelPosition, {
          toValue: -7,
          duration: 200,
          useNativeDriver: true,
        }).start();
        break;
      default:
        break;
    }
  };

  const handleBlur = (field) => {
    switch(field) {
      case 'username':
        if (formData.username === "") {
          setUsernameFocused(false);
          Animated.timing(usernameLabelPosition, {
            toValue: 0,
            duration: 200,
            useNativeDriver: true,
          }).start();
        }
        break;
      case 'fullname':
        if (formData.nama === "") {
          setFullnameFocused(false);
          Animated.timing(fullnameLabelPosition, {
            toValue: 0,
            duration: 200,
            useNativeDriver: true,
          }).start();
        }
        break;
      case 'email':
        if (formData.email === "") {
          setEmailFocused(false);
          Animated.timing(emailLabelPosition, {
            toValue: 0,
            duration: 200,
            useNativeDriver: true,
          }).start();
        }
        break;
      case 'password':
        if (formData.password === "") {
          setPasswordFocused(false);
          Animated.timing(passwordLabelPosition, {
            toValue: 0,
            duration: 200,
            useNativeDriver: true,
          }).start();
        }
        break;
      default:
        break;
    }
  };

  const validateForm = () => {
    const { username, email, password, nama } = formData;
    
    if (!username || !email || !password || !nama) {
      Alert.alert("Error", "Please fill in all fields");
      return false;
    }

    if (password.length < 6) {
      Alert.alert("Error", "Password must be at least 6 characters long");
      return false;
    }

    if (!email.includes('@')) {
      Alert.alert("Error", "Please enter a valid email address");
      return false;
    }

    return true;
  };

  const handleRegister = async () => {
    if (!validateForm()) return;

    try {
      setLoading(true);
      
      const response = await axios.post('http://192.168.1.5:5002/api/auth/register', {
        email: formData.email,
        nama: formData.nama,
        password: formData.password,
        username: formData.username
      });
      
      if (response.data.success) {
        Alert.alert(
          "Success",
          "Registration successful!",
          [{ text: "OK", onPress: () => navigation.replace("Login") }]
        );
      }
    } catch (error) {
      console.error("Registration error:", error.response?.data);
      Alert.alert(
        "Error",
        error.response?.data?.message || 'Registration failed'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Create Account</Text>
      <Text style={styles.subtitle}>Please fill in the details to create an account</Text>

      <View style={styles.inputContainer}>
        <Animated.Text
          style={[
            styles.label, 
            { transform: [{ translateY: usernameLabelPosition }] }, 
            usernameFocused && styles.focusedLabel
          ]}
        >
          Username
        </Animated.Text>
        <TextInput
          style={styles.input}
          placeholder="Username"
          value={formData.username}
          onChangeText={(value) => handleInputChange('username', value)}
          autoCapitalize="none"
          placeholderTextColor="#999"
          onFocus={() => handleFocus('username')}
          onBlur={() => handleBlur('username')}
        />
      </View>

      <View style={styles.inputContainer}>
        <Animated.Text
          style={[
            styles.label, 
            { transform: [{ translateY: fullnameLabelPosition }] }, 
            fullnameFocused && styles.focusedLabel
          ]}
        >
          Full Name
        </Animated.Text>
        <TextInput
          style={styles.input}
          placeholder="Full Name"
          value={formData.nama}
          onChangeText={(value) => handleInputChange('nama', value)}
          autoCapitalize="words"
          placeholderTextColor="#999"
          onFocus={() => handleFocus('fullname')}
          onBlur={() => handleBlur('fullname')}
        />
      </View>

      <View style={styles.inputContainer}>
        <Animated.Text
          style={[
            styles.label, 
            { transform: [{ translateY: emailLabelPosition }] }, 
            emailFocused && styles.focusedLabel
          ]}
        >
          Email
        </Animated.Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={formData.email}
          onChangeText={(value) => handleInputChange('email', value)}
          keyboardType="email-address"
          autoCapitalize="none"
          placeholderTextColor="#999"
          onFocus={() => handleFocus('email')}
          onBlur={() => handleBlur('email')}
        />
      </View>

      <View style={styles.inputContainer}>
        <Animated.Text
          style={[
            styles.label, 
            { transform: [{ translateY: passwordLabelPosition }] }, 
            passwordFocused && styles.focusedLabel
          ]}
        >
          Password
        </Animated.Text>
        <View style={styles.passwordContainer}>
          <TextInput
            style={[styles.input, styles.passwordInput]}
            placeholder="Password"
            value={formData.password}
            onChangeText={(value) => handleInputChange('password', value)}
            secureTextEntry={!showPassword}
            placeholderTextColor="#999"
            onFocus={() => handleFocus('password')}
            onBlur={() => handleBlur('password')}
          />
          <TouchableOpacity
            style={styles.iconContainer}
            onPress={() => setShowPassword(!showPassword)}
          >
            <Ionicons
              name={showPassword ? "eye-off-outline" : "eye-outline"}
              size={24}
              color="#999"
            />
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity 
        style={[styles.registerButton, loading && styles.registerButtonDisabled]}
        onPress={handleRegister}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Register</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity 
        onPress={() => navigation.navigate("Login")}
        style={styles.loginContainer}
      >
        <Text style={styles.loginText}>
          Already have an account? <Text style={styles.loginLink}>Login</Text>
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1e90ff',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 30,
  },
  inputContainer: {
    marginBottom: 20,
    marginTop: 10,
    position: 'relative',
  },
  passwordContainer: {
    position: 'relative',
    width: '100%',
  },
  label: {
    position: 'absolute',
    left: 20,
    top: 18,
    color: '#999',
    fontSize: 16,
    fontWeight: 'bold',
  },
  focusedLabel: {
    color: '#000',
    top: -10,
    fontSize: 12,
  },
  input: {
    backgroundColor: '#f5f5f5',
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    fontSize: 16,
  },
  passwordInput: {
    paddingRight: 45,
  },
  iconContainer: {
    position: 'absolute',
    right: 15,
    top: 15,
  },
  registerButton: {
    backgroundColor: '#1e90ff',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
  registerButtonDisabled: {
    backgroundColor: '#cccccc',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loginContainer: {
    alignItems: 'center',
  },
  loginText: {
    color: '#666',
    fontSize: 14,
  },
  loginLink: {
    color: '#1e90ff',
    fontWeight: 'bold',
  },
});

export default RegisterScreen;