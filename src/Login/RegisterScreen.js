import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";

const RegisterScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create account</Text>
      <Text style={styles.subtitle}>
        Create an account so you can explore all the existing jobs
      </Text>
      <TextInput style={styles.input} placeholder="Name" />
      <TextInput style={styles.input} placeholder="Email" />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry={true}
      />
      <TouchableOpacity style={styles.loginButton}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
      {/* Teks Already have an account, onPress untuk navigasi ke Login Screen */}
      <Text
        style={styles.createAccount}
        onPress={() => navigation.navigate("Login")}
      >
        Already have an account
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
    marginBottom: 10, // Tambahkan jarak untuk "Already have an account"
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  createAccount: {
    marginTop: 10,
    color: "#666",
    fontSize: 14,
    textDecorationLine: "underline", // Menambahkan garis bawah untuk membedakan
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

export default RegisterScreen;
