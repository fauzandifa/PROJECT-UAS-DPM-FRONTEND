import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // Logika untuk melakukan login
    // Jika berhasil, navigasi ke halaman HomeScreen
    navigation.navigate("Home");
  };

  const handleRegister = () => {
    // Navigasi ke halaman RegisterScreen
    navigation.navigate("Register");
  };

  const handleForgotPassword = () => {
    // Navigasi ke halaman ForgotPasswordScreen
    navigation.navigate("ForgotPassword");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.forgotButton} onPress={handleForgotPassword}>
        <Text style={styles.forgotButtonText}>Lupa Password?</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
        <Text style={styles.registerButtonText}>Belum punya akun? Register</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: "blue",
    paddingVertical: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontSize: 16,
  },
  forgotButton: {
    marginBottom: 20,
  },
  forgotButtonText: {
    textAlign: "center",
    color: "blue",
    textDecorationLine: "underline",
  },
  registerButton: {
    marginTop: 20,
  },
  registerButtonText: {
    textAlign: "center",
  },
});

export default LoginScreen;