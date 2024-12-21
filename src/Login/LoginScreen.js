import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from "react-native";

const API_BASE_URL = 'http://10.0.2.2:5000/api';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false); // State untuk mengecek admin

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
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });
  
      const data = await response.json();
  
      if (response.ok) {
        // Cek apakah pengguna adalah admin
        if (email === "admin@tiketku.com" && password === "kel7dpm") {
          setIsAdmin(true); // Set admin mode
        } else {
          navigation.navigate("Home"); // Navigasi ke Home jika bukan admin
        }
      } else {
        Alert.alert("Error", data.message || "Login failed");
      }
    } catch (error) {
      Alert.alert("Error", "An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleModeSelection = (mode) => {
    if (mode === "frontend") {
      navigation.navigate("Home"); // Navigasi ke HomeScreen
    } else {
      // Navigasi ke Backend Screen (ganti dengan nama layar backend yang sesuai)
      navigation.navigate("BackendScreen");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>TiketKu</Text>
      <Text style={styles.subtitle}>Welcome back you've been missed!</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity onPress={() => navigation.navigate("ForgotPassword")}>
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
        style={styles.registerButton}
      >
        <Text style={styles.registerText}>Create new account</Text>
      </TouchableOpacity>

      {isAdmin && (
        <View style={styles.modeSelection}>
          <Text style={styles.modeTitle}>Select Mode:</Text>
          <TouchableOpacity 
            style={styles.modeButton}
            onPress={() => handleModeSelection("frontend")}
          >
            <Text style={styles.modeButtonText}>Frontend</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.modeButton}
            onPress={() => handleModeSelection("backend")}
          >
            <Text style={styles.modeButtonText}>Backend</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    justifyContent: ' center'
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1e90ff',
    textAlign: 'center',
    marginBottom: 10
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 30
  },
  input: {
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 15
  },
  forgotPassword: {
    color: '#1e90ff',
    textAlign: 'right',
    marginBottom: 20
  },
  loginButton: {
    backgroundColor: '#1e90ff',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 15
  },
  loginButtonDisabled: {
    backgroundColor: '#ccc'
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold'
  },
  registerButton: {
    alignItems: 'center'
  },
  registerText: {
    color: '#666',
    fontSize: 14
  },
  modeSelection: {
    marginTop: 20,
    alignItems: 'center'
  },
  modeTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10
  },
  modeButton: {
    backgroundColor: '#1e90ff',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    alignItems: 'center',
    width: '80%'
  },
  modeButtonText: {
    color: '#fff',
    fontSize: 16
  }
});

export default LoginScreen;