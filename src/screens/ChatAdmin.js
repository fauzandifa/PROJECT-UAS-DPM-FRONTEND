import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

const ChatAdmin = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    {
      sender: "admin",
      text: "Halo, bagaimana saya bisa membantu Anda?",
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      }),
    },
  ]);
  const navigation = useNavigation();

  const handleSendMessage = () => {
    if (message.trim()) {
      const currentTime = new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });
      setMessages([
        ...messages,
        { sender: "user", text: message, time: currentTime },
      ]);
      setMessage("");

      setTimeout(() => {
        const userMessage = message.toLowerCase();
        let adminResponse = "";

        if (
          userMessage.includes("bantuan") ||
          userMessage.includes("masalah")
        ) {
          adminResponse =
            "Terima kasih telah menghubungi kami! Kami akan segera membantu Anda menyelesaikan masalah.";
        } else if (userMessage.includes("pertanyaan")) {
          adminResponse = "Silakan ajukan pertanyaan Anda, kami siap membantu!";
        } else {
          adminResponse =
            "ini merupakan cara memesan tiket di platform kami:\n" +
            "1. pesan tiket film yang anda inginkan;\n" +
            "2. pilih tanggal, bangku, dan waktu yang tertera;\n" +
            "3. masukkan nomor bank anda;\n" +
            "4. klik tombol bayar;\n" +
            "5. anda berhasil memesan tiket di bioskop kami.";
        }

        const responseTime = new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        });
        const response = {
          sender: "admin",
          text: adminResponse,
          time: responseTime,
        };
        setMessages((prevMessages) => [...prevMessages, response]);
      }, 2000);
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
                  uri: "https://i.pinimg.com/736x/2b/10/ca/2b10cafe7d3cc637bd72a0149ba200f5.jpg",
                }}
                style={styles.avatar}
              />
            )}
            <View
              style={
                msg.sender === "user" ? styles.userMessage : styles.adminMessage
              }
            >
              <Text style={styles.messageText}>{msg.text}</Text>
              <Text style={styles.messageTime}>{msg.time}</Text>
            </View>
            {msg.sender === "user" && (
              <Image
                source={{
                  uri: "https://i.pinimg.com/736x/2b/10/ca/2b10cafe7d3cc637bd72a0149ba200f5.jpg",
                }}
                style={styles.avatar}
              />
            )}
          </View>
        ))}
      </ScrollView>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={message}
          onChangeText={setMessage}
          placeholder="Write something..."
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
    color: "#ffff",
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
    color: "#fff", // Ubah warna jam menjadi putih
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
    borderRadius: 50, // Membuat tombol bulat
    width: 50,
    height: 50,
  },
  sendIcon: {
    width: 24,
    height: 24,
  },
});

export default ChatAdmin;
