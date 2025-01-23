import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
  Animated,
  Modal,
  Dimensions,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
import { API_ENDPOINTS } from '../config/api';
import axiosInstance from '../config/api';

const { height } = Dimensions.get('window');

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [emailOrUsernameFocused, setEmailOrUsernameFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [emailOrUsernameLabelPosition] = useState(new Animated.Value(0));
  const [passwordLabelPosition] = useState(new Animated.Value(0));

  // Animation values
  const [contentOpacity] = useState(new Animated.Value(0));
  const [contentTranslateY] = useState(new Animated.Value(50));
  const [titleScale] = useState(new Animated.Value(0.7));
  const [titleTranslateY] = useState(new Animated.Value(-50));

  useEffect(() => {
    // Start entrance animations
    Animated.parallel([
      // Fade in and slide up content
      Animated.timing(contentOpacity, {
        toValue: 1,
        duration: 800,
        delay: 100,
        useNativeDriver: true,
      }),
      Animated.timing(contentTranslateY, {
        toValue: 0,
        duration: 800,
        delay: 100,
        useNativeDriver: true,
      }),
      // Title animations
      Animated.timing(titleScale, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(titleTranslateY, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleLogin = async () => {
    try {
      if (!username || !password) {
        Alert.alert('Error', 'Username dan password harus diisi');
        return;
      }

      // Admin login check
      if (username === 'admin@tiketku.com' && password === 'dpmkel7') {
        await AsyncStorage.setItem('userData', JSON.stringify({
          nama: "Administrator",
          email: "admin@tiketku.com",
          role: "admin"
        }));
        await AsyncStorage.setItem('isAdmin', 'true');
        navigation.reset({
          index: 0,
          routes: [{ name: 'NowPlaying' }],
        });
        return;
      }

      setLoading(true);
      console.log('Making login request to:', API_ENDPOINTS.login);
      console.log('With credentials:', { email: username, password: '***' });

      const response = await axiosInstance.post(API_ENDPOINTS.login, {
        email: username,
        password: password
      });

      console.log('Login response:', response.data);

      if (response.data.success) {
        const userData = response.data.data;
        
        if (!userData || !userData.token || !userData.user) {
          throw new Error('Invalid response format');
        }

        await AsyncStorage.setItem('userData', JSON.stringify(userData));
        await AsyncStorage.setItem('token', userData.token);

        navigation.reset({
          index: 0,
          routes: [{ name: 'NowPlaying' }],
        });
      } else {
        throw new Error(response.data.message || 'Login failed');
      }
    } catch (error) {
      console.error('Login error full details:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
        url: error.config?.url,
        method: error.config?.method,
        data: error.config?.data
      });

      let errorMessage = 'Login gagal. ';
      if (error.message === 'Network Error') {
        errorMessage += 'Tidak dapat terhubung ke server. Periksa koneksi Anda dan pastikan server berjalan.';
      } else if (error.response?.data?.message) {
        errorMessage += error.response.data.message;
      } else {
        errorMessage += 'Silakan coba lagi.';
      }

      Alert.alert('Error', errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleFocus = (setFocused, labelPosition) => {
    setFocused(true);
    Animated.timing(labelPosition, {
      toValue: -7,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const handleBlur = (setFocused, value, labelPosition) => {
    if (!value) {
      setFocused(false);
      Animated.timing(labelPosition, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }
  };

  return (
    <View style={styles.container}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>SELECT MODE</Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, { backgroundColor: "#007AFF" }]}
                onPress={() => {
                  setModalVisible(false);
                  navigation.replace("BackendScreen");
                }}
              >
                <Text style={styles.modalButtonText}>BACKEND</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, { backgroundColor: "#007AFF" }]}
                onPress={() => {
                  setModalVisible(false);
                  navigation.replace("NowPlaying");
                }}
              >
                <Text style={styles.modalButtonText}>FRONTEND</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <Animated.View style={[
        styles.titleContainer,
        {
          transform: [
            { scale: titleScale },
            { translateY: titleTranslateY }
          ]
        }
      ]}>
        <Text style={styles.titleT}>T</Text>
        <Text style={styles.titleRest}>iketKu</Text>
      </Animated.View>

      <Animated.View style={{
        opacity: contentOpacity,
        transform: [{ translateY: contentTranslateY }],
        flex: 1,
      }}>
        <Text style={styles.subtitle}>Welcome back, you've been missed!</Text>

        <View style={styles.inputContainer}>
          <Animated.Text
            style={[
              styles.label,
              { transform: [{ translateY: emailOrUsernameLabelPosition }] },
              emailOrUsernameFocused && styles.focusedLabel,
            ]}
          >
            Email
          </Animated.Text>
          <TextInput
            style={styles.input}
            value={username}
            onChangeText={setUsername}
            keyboardType="email-address"
            autoCapitalize="none"
            onFocus={() => handleFocus(setEmailOrUsernameFocused, emailOrUsernameLabelPosition)}
            onBlur={() =>
              handleBlur(setEmailOrUsernameFocused, username, emailOrUsernameLabelPosition)
            }
            placeholder="Enter your email"
            placeholderTextColor="#999"
          />
        </View>

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
            onFocus={() => handleFocus(setPasswordFocused, passwordLabelPosition)}
            onBlur={() =>
              handleBlur(setPasswordFocused, password, passwordLabelPosition)
            }
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
            Don't have an account?{" "}
            <Text style={styles.registerLink}>Register</Text>
          </Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 0,
    marginTop: 200,
    zIndex: 2,
  },
  titleT: {
    fontSize: 70,
    fontWeight: "bold",
    color: "#1e90ff",
  },
  titleRest: {
    fontSize: 70,
    fontWeight: "bold",
    color: "#000",
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginBottom: 30,
  },
  inputContainer: {
    marginBottom: 15,
    position: "relative",
  },
  label: {
    position: "absolute",
    left: 20,
    top: 18,
    color: "#999",
    fontSize: 16,
    fontWeight: "bold",
  },
  focusedLabel: {
    color: "#000",
    top: -10,
    fontSize: 12,
  },
  input: {
    backgroundColor: "#f5f5f5",
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    marginBottom: 15,
  },
  passwordContainer: {
    position: "relative",
    marginBottom: 15,
  },
  passwordInput: {
    paddingRight: 45,
  },
  iconContainer: {
    position: "absolute",
    right: 15,
    top: 15,
  },
  forgotPasswordContainer: {
    alignItems: "flex-end",
    marginBottom: 20,
  },
  forgotPassword: {
    color: "#1e90ff",
    fontSize: 14,
  },
  loginButton: {
    backgroundColor: "#1e90ff",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 15,
  },
  loginButtonDisabled: {
    backgroundColor: "#ccc",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  registerContainer: {
    alignItems: "center",
  },
  registerText: {
    color: "#666",
    fontSize: 14,
  },
  registerLink: {
    color: "#1e90ff",
    fontWeight: "bold",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 20,
    width: "80%",
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 30,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 10,
  },
  modalButton: {
    borderRadius: 10,
    padding: 15,
    width: "45%",
    alignItems: "center",
  },
  modalButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default LoginScreen;