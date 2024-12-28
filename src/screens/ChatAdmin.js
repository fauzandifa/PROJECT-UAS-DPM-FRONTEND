import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";

const ChatAdmin = () => {
  const [message, setMessage] = useState(""); // Pesan yang dikirim oleh pengguna
  const [messages, setMessages] = useState([
    { sender: "admin", text: "Halo, bagaimana saya bisa membantu Anda?" }, // Pesan pertama dari admin
  ]);
  const navigation = useNavigation();

  // Fungsi untuk menangani pengiriman pesan pengguna
  const handleSendMessage = () => {
    if (message.trim()) {
      // Kirim pesan dari pengguna
      setMessages([...messages, { sender: "user", text: message }]);
      setMessage(""); // Kosongkan input setelah pesan dikirim

      // Menentukan respons admin berdasarkan kata kunci
      setTimeout(() => {
        const userMessage = message.toLowerCase(); // Ubah pesan pengguna menjadi lowercase
        let adminResponse = "";

        if (userMessage.includes("bantuan") || userMessage.includes("masalah")) {
          adminResponse =
            "Terima kasih telah menghubungi kami! Kami akan segera membantu Anda menyelesaikan masalah.";
        } else if (userMessage.includes("pertanyaan")) {
          adminResponse =
            "Silakan ajukan pertanyaan Anda, kami siap membantu!";
        } else {
          adminResponse = "Terima kasih telah menghubungi kami. Ada yang bisa saya bantu?";
        }

        const response = {
          sender: "admin",
          text: adminResponse,
        };
        setMessages((prevMessages) => [...prevMessages, response]); // Tambahkan pesan admin
      }, 2000); // Respons admin setelah 2 detik
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.chatContainer}>
        {messages.map((msg, index) => (
          <View key={index} style={msg.sender === "user" ? styles.userMessage : styles.adminMessage}>
            <Text style={styles.messageText}>{msg.text}</Text>
          </View>
        ))}
      </ScrollView>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={message}
          onChangeText={setMessage}
          placeholder="Tulis pesan..."
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSendMessage}>
          <Text style={styles.sendButtonText}>Kirim</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
  chatContainer: {
    padding: 10,
  },
  userMessage: {
    alignSelf: "flex-end",
    backgroundColor: "#DCF8C6",
    padding: 10,
    borderRadius: 10,
    marginBottom: 5,
    maxWidth: "80%",
  },
  adminMessage: {
    alignSelf: "flex-start",
    backgroundColor: "#ECECEC",
    padding: 10,
    borderRadius: 10,
    marginBottom: 5,
    maxWidth: "80%",
  },
  messageText: {
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: "row",
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: "#ccc",
  },
  input: {
    flex: 1,
    borderRadius: 5,
    padding: 10,
    backgroundColor: "#f1f1f1",
  },
  sendButton: {
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#007BFF",
    borderRadius: 5,
    marginLeft: 10,
  },
  sendButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default ChatAdmin;
