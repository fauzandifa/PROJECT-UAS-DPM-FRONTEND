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
} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';

const API_BASE_URL = 'http://192.168.10.15:5000/api/auth';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false); // State baru untuk password
  const [emailLabelPosition] = useState(new Animated.Value(0));
  const [passwordLabelPosition] = useState(new Animated.Value(0)); // Animasi untuk password

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(`${API_BASE_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (data.success) {
        await AsyncStorage.setItem('userToken', data.data.token);
        await AsyncStorage.setItem('userData', JSON.stringify(data.data.user));

        navigation.replace("Home");
      } else {
        Alert.alert("Login Failed", data.message || "Invalid credentials");
      }
    } catch (error) {
      console.error('Login error:', error);
      Alert.alert(
        "Error",
        "Unable to connect to server. Please check your internet connection."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleEmailFocus = () => {
    setEmailFocused(true);
    Animated.timing(emailLabelPosition, {
      toValue: -7,  // Position above the input field
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const handleEmailBlur = () => {
    if (email === "") {
      setEmailFocused(false);
      Animated.timing(emailLabelPosition, {
        toValue: 0,  // Original position
        duration: 200,
        useNativeDriver: true,
      }).start();
    }
  };

  const handlePasswordFocus = () => {
    setPasswordFocused(true);
    Animated.timing(passwordLabelPosition, {
      toValue: -7,  // Position above the input field
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const handlePasswordBlur = () => {
    if (password === "") {
      setPasswordFocused(false);
      Animated.timing(passwordLabelPosition, {
        toValue: 0,  // Original position
        duration: 200,
        useNativeDriver: true,
      }).start();
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>TiketKu</Text>
      <Text style={styles.subtitle}>Welcome back you've been missed!</Text>

      <View style={styles.inputContainer}>
        <Animated.Text
          style={[
            styles.label,
            { transform: [{ translateY: emailLabelPosition }] },
            emailFocused && styles.focusedLabel,
          ]}
        >
          Email
        </Animated.Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          onFocus={handleEmailFocus}
          onBlur={handleEmailBlur}
          placeholder="Email" // Placeholder tetap ada
          placeholderTextColor="#999"
        />
      </View>

      {/* Kolom Password */}
      <View style={styles.passwordContainer}>
        <Animated.Text
          style={[
            styles.label,
            { transform: [{ translateY: passwordLabelPosition }] },
            passwordFocused && styles.focusedLabel,
          ]}
        >
          Password
        </Animated.Text>
        <TextInput
          style={[styles.input, styles.passwordInput]}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword}
          placeholderTextColor="#999"
          onFocus={handlePasswordFocus}
          onBlur={handlePasswordBlur}
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

      <TouchableOpacity
        onPress={() => navigation.navigate("ForgotPassword")}
        style={styles.forgotPasswordContainer}
      >
        <Text style={styles.forgotPassword}>Forgot your password?</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.loginButton, loading && styles.loginButtonDisabled]}
        onPress={handleLogin}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Login</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate("Register")}
        style={styles.registerContainer}
      >
        <Text style={styles.registerText}>
          Don't have an account? <Text style={styles.registerLink}>Register</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    marginBottom: 15,
    marginTop: 40,  // Menurunkan kolom email lebih jauh ke bawah
    position: 'relative',
  },
  label: {
    position: 'absolute',
    left: 20,
    top: 18,
    color: '#999',
    fontSize: 16,
    fontWeight: 'bold',
    transition: 'all 0.3s ease',
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
  passwordContainer: {
    position: 'relative',
    marginBottom: 15,
    marginTop: 20,
  },
  passwordInput: {
    paddingRight: 45,
  },
  iconContainer: {
    position: 'absolute',
    right: 15,
    top: 15,
  },
  forgotPasswordContainer: {
    alignItems: 'flex-end',
    marginBottom: 20,
  },
  forgotPassword: {
    color: '#1e90ff',
    fontSize: 14,
  },
  loginButton: {
    backgroundColor: '#1e90ff',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  loginButtonDisabled: {
    backgroundColor: '#cccccc',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  registerContainer: {
    alignItems: 'center',
  },
  registerText: {
    color: '#666',
    fontSize: 14,
  },
  registerLink: {
    color: '#1e90ff',
    fontWeight: 'bold',
  },
});

export default LoginScreen;
