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
import axios from "axios";

const { height } = Dimensions.get('window');

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
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
    if (!email || !password) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }
  
    try {
      setLoading(true);
      console.log('Attempting login with:', { email, password });
  
      // Mock Admin check
      if (email === "admin@tiketku.com" && password === "dpmkel7") {
        console.log('Admin login detected');
        const adminData = {
          id: "admin",
          email: "admin@tiketku.com",
          username: "admin",
          nama: "Administrator",
        };
  
        await AsyncStorage.setItem("userToken", "admin-token");
        await AsyncStorage.setItem("userData", JSON.stringify(adminData));
  
        setModalVisible(true);
        setLoading(false);
        return;
      }
  
      const response = await axios.post(API_ENDPOINTS.login, {
        email: email,
        password: password,
      });
  
      console.log('Response:', response.data); // Log full response
  
      if (response.data.success) {
        console.log('Login successful, saving user data');
        await AsyncStorage.setItem("userToken", response.data.data.token);
        await AsyncStorage.setItem("userData", JSON.stringify(response.data.data.user));
        navigation.replace("Home");
      } else {
        console.log('Login failed:', response.data.message);
        Alert.alert("Login Failed", response.data.message || "Invalid credentials");
      }
    } catch (error) {
      console.error("Login error details:", {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
        url: error.config?.url
      });
      Alert.alert(
        "Error",
        error.response?.data?.message || error.message || "Unable to connect to server"
      );
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
                  navigation.replace("Home");
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
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            onFocus={() => handleFocus(setEmailOrUsernameFocused, emailOrUsernameLabelPosition)}
            onBlur={() =>
              handleBlur(setEmailOrUsernameFocused, email, emailOrUsernameLabelPosition)
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