import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Fungsi untuk menangani login
  const handleLogin = () => {
    // Mengecek apakah email dan password sesuai
    if (email === "123" && password === "123") {
      navigation.navigate("Home"); // Arahkan ke HomeScreen jika cocok
    } else {
      alert("Invalid email or password");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login here</Text>
      <Text style={styles.subtitle}>Welcome back you've been missed!</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry={true}
        value={password}
        onChangeText={setPassword}
      />
      <Text
        style={styles.forgotPassword}
        onPress={() => navigation.navigate("ForgotPassword")}
      >
        Forgot your password?
      </Text>
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <Text
        style={styles.createAccount}
        onPress={() => navigation.navigate("Register")}
      >
        Create new account
      </Text>
      <Text style={styles.continueText}>Or continue with</Text>
      <View style={styles.iconContainer}>
        <Image
          source={{ uri: "https://placeholder-google-icon" }}
          style={styles.icon}
        />
        <Image
          source={{ uri: "https://placeholder-apple-icon" }}
          style={styles.icon}
        />
        <Image
          source={{ uri: "https://placeholder-facebook-icon" }}
          style={styles.icon}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    color: "#1e90ff",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    width: "100%",
    padding: 12,
    marginVertical: 10,
  },
  loginButton: {
    backgroundColor: "#1e90ff",
    padding: 15,
    borderRadius: 10,
    width: "100%",
    alignItems: "center",
    marginBottom: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  forgotPassword: {
    alignSelf: "flex-end",
    color: "#1e90ff",
    marginBottom: 20,
  },
  createAccount: {
    marginTop: 10,
    color: "#666",
    fontSize: 14,
  },
  continueText: {
    marginVertical: 10,
    color: "#666",
  },
  iconContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "50%",
  },
  icon: {
    width: 40,
    height: 40,
  },
});

export default LoginScreen;
