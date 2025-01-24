import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  Linking,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const ChatAdmin = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    {
      sender: "admin",
      text: "Halo, bagaimana saya bisa membantu Anda?\nKetik 1 untuk tutorial pemesanan tiket.\nKetik 2 untuk nomor kontak kami.",
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      }),
    },
  ]);

  const handleSendMessage = () => {
    if (message.trim()) {
      const currentTime = new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });

      // Tambahkan pesan pengguna ke dalam array messages
      setMessages([
        ...messages,
        { sender: "user", text: message, time: currentTime },
      ]);
      const userMessage = message.trim();
      setMessage("");

      // Jawaban admin berdasarkan input pengguna
      setTimeout(() => {
        let adminResponse = "";
        if (userMessage === "1") {
          adminResponse =
            "Berikut adalah tutorial pemesanan tiket:\n1. Pilih film yang diinginkan.\n2. Pilih tanggal, waktu, dan tempat duduk.\n3. Masukkan informasi pembayaran.\n4. Klik 'Bayar' dan tiket akan dikonfirmasi.";
        } else if (userMessage === "2") {
          adminResponse =
            "Anda dapat menghubungi kami dengan mengklik tautan dibawah ini:\nwa.me/62823905638223";
        } else {
          adminResponse =
            "Maaf, saya tidak memahami pesan Anda. Ketik 1 untuk tutorial pemesanan tiket atau 2 untuk nomor kontak kami.";
        }

        const responseTime = new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        });

        setMessages((prevMessages) => [
          ...prevMessages,
          { sender: "admin", text: adminResponse, time: responseTime },
        ]);
      }, 2000); // Simulasi waktu respons admin
    }
  };

  const handleLinkPress = async (url) => {
    try {
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      }
    } catch (error) {
      console.error("Gagal membuka link:", error);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.chatContainer}>
        {messages.map((msg, index) => (
          <View
            key={index}
            style={
              msg.sender === "user"
                ? styles.userMessageContainer
                : styles.adminMessageContainer
            }
          >
            {msg.sender === "admin" && (
              <Image
                source={{
                  uri: "https://i.pinimg.com/736x/2e/84/73/2e84730aec76756e7812bafbba7f18fc.jpg",
                }}
                style={styles.avatar}
              />
            )}
            <View
              style={
                msg.sender === "user" ? styles.userMessage : styles.adminMessage
              }
            >
              {msg.text.includes("wa.me") ? (
                <View>
                  <Text style={styles.messageText}>
                    Anda dapat menghubungi kami dengan mengklik tautan dibawah ini:
                  </Text>
                  <TouchableOpacity
                    onPress={() => handleLinkPress("https://wa.me/6282390563822")}
                  >
                    <Text style={[styles.messageText, styles.linkText]}>
                      wa.me/62823905638223
                    </Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <Text style={styles.messageText}>{msg.text}</Text>
              )}
              <Text style={styles.messageTime}>{msg.time}</Text>
            </View>
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
          <Ionicons name="send" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F8FA",
  },
  chatContainer: {
    padding: 10,
  },
  userMessageContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "flex-end",
    marginVertical: 5,
  },
  adminMessageContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "flex-start",
    marginVertical: 5,
  },
  userMessage: {
    backgroundColor: "#007BFF",
    padding: 10,
    borderRadius: 15,
    maxWidth: "75%",
  },
  adminMessage: {
    backgroundColor: "#494d4a",
    padding: 10,
    borderRadius: 15,
    maxWidth: "75%",
  },
  messageText: {
    fontSize: 16,
    color: "white",
  },
  messageTime: {
    fontSize: 12,
    color: "#fff",
    alignSelf: "flex-end",
    marginTop: 5,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginHorizontal: 10,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: "#ccc",
    backgroundColor: "#FFF",
  },
  input: {
    flex: 1,
    borderRadius: 25,
    padding: 10,
    backgroundColor: "#F1F1F1",
    marginRight: 10,
  },
  sendButton: {
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#007BFF",
    borderRadius: 50,
    width: 50,
    height: 50,
  },
  linkText: {
    color: "#007BFF",
  },
});

export default ChatAdmin;
