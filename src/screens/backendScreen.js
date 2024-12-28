import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
  SafeAreaView,
  RefreshControl,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";

const BackendScreen = ({ navigation }) => {
  const [refreshing, setRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState("users"); // 'users', 'tickets', 'chats'

  // Sample data - replace with your actual API calls
  const users = [
    { id: 1, username: "john_doe", password: "********", fullName: "John Doe" },
    {
      id: 2,
      username: "jane_smith",
      password: "********",
      fullName: "Jane Smith",
    },
  ];

  const tickets = [
    {
      id: 1,
      movieTitle: "Avengers",
      buyer: "John Doe",
      date: "2024-12-24",
      status: "Paid",
    },
    {
      id: 2,
      movieTitle: "Spider-Man",
      buyer: "Jane Smith",
      date: "2024-12-25",
      status: "Pending",
    },
  ];

  const chats = [
    {
      id: 1,
      username: "john_doe",
      lastMessage: "Need help with booking",
      unread: 2,
    },
    {
      id: 2,
      username: "jane_smith",
      lastMessage: "Ticket refund inquiry",
      unread: 0,
    },
  ];

  const handleLogout = async () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Yes",
        onPress: async () => {
          try {
            await AsyncStorage.clear();
            navigation.replace("Login");
          } catch (error) {
            console.error("Logout error:", error);
            Alert.alert("Error", "Failed to logout. Please try again.");
          }
        },
      },
    ]);
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    // Add your refresh logic here
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const renderUsersList = () => (
    <View style={styles.sectionContent}>
      <Text style={styles.sectionTitle}>Registered Users</Text>
      {users.map((user) => (
        <View key={user.id} style={styles.card}>
          <View style={styles.cardHeader}>
            <Ionicons name="person-circle-outline" size={24} color="#1e90ff" />
            <Text style={styles.cardTitle}>{user.fullName}</Text>
          </View>
          <View style={styles.cardContent}>
            <Text style={styles.cardText}>Username: {user.username}</Text>
            <Text style={styles.cardText}>Password: {user.password}</Text>
          </View>
          <TouchableOpacity
            style={styles.cardButton}
            onPress={() =>
              Alert.alert(
                "Edit User",
                "Edit user functionality will be implemented here"
              )
            }
          >
            <Text style={styles.cardButtonText}>Edit User</Text>
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );

  const renderTicketsList = () => (
    <View style={styles.sectionContent}>
      <Text style={styles.sectionTitle}>Ticket Purchases</Text>
      {tickets.map((ticket) => (
        <View key={ticket.id} style={styles.card}>
          <View style={styles.cardHeader}>
            <Ionicons name="ticket-outline" size={24} color="#1e90ff" />
            <Text style={styles.cardTitle}>{ticket.movieTitle}</Text>
          </View>
          <View style={styles.cardContent}>
            <Text style={styles.cardText}>Buyer: {ticket.buyer}</Text>
            <Text style={styles.cardText}>Date: {ticket.date}</Text>
            <Text style={styles.cardText}>Status: {ticket.status}</Text>
          </View>
          <TouchableOpacity
            style={styles.cardButton}
            onPress={() =>
              Alert.alert("View Details", "Ticket details will be shown here")
            }
          >
            <Text style={styles.cardButtonText}>View Details</Text>
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );

  const renderChatsList = () => (
    <View style={styles.sectionContent}>
      <Text style={styles.sectionTitle}>Admin Messages</Text>
      {chats.map((chat) => (
        <TouchableOpacity
          key={chat.id}
          style={styles.card}
          onPress={() =>
            Alert.alert(
              "Open Chat",
              `Chat with ${chat.username} will open here`
            )
          }
        >
          <View style={styles.cardHeader}>
            <Ionicons name="chatbubble-outline" size={24} color="#1e90ff" />
            <Text style={styles.cardTitle}>{chat.username}</Text>
            {chat.unread > 0 && (
              <View style={styles.unreadBadge}>
                <Text style={styles.unreadText}>{chat.unread}</Text>
              </View>
            )}
          </View>
          <View style={styles.cardContent}>
            <Text style={styles.cardText} numberOfLines={1}>
              {chat.lastMessage}
            </Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="logo-react" size={32} color="#1e90ff" />
        <Text style={styles.headerTitle}>Admin Dashboard</Text>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={24} color="#FF3B30" />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.content}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {activeTab === "users" && renderUsersList()}
        {activeTab === "tickets" && renderTicketsList()}
        {activeTab === "chats" && renderChatsList()}
      </ScrollView>

      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === "users" && styles.activeTab]}
          onPress={() => setActiveTab("users")}
        >
          <Ionicons
            name="people-outline"
            size={24}
            color={activeTab === "users" ? "#fff" : "#666"}
          />
          <Text
            style={[
              styles.tabText,
              activeTab === "users" && styles.activeTabText,
            ]}
          >
            Users
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === "tickets" && styles.activeTab]}
          onPress={() => setActiveTab("tickets")}
        >
          <Ionicons
            name="ticket-outline"
            size={24}
            color={activeTab === "tickets" ? "#fff" : "#666"}
          />
          <Text
            style={[
              styles.tabText,
              activeTab === "tickets" && styles.activeTabText,
            ]}
          >
            Tickets
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === "chats" && styles.activeTab]}
          onPress={() => setActiveTab("chats")}
        >
          <Ionicons
            name="chatbubble-outline"
            size={24}
            color={activeTab === "chats" ? "#fff" : "#666"}
          />
          <Text
            style={[
              styles.tabText,
              activeTab === "chats" && styles.activeTabText,
            ]}
          >
            Chats
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    backgroundColor: "#fff",
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1e90ff",
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  logoutText: {
    color: "#FF3B30",
    marginLeft: 5,
    fontWeight: "500",
  },
  tabContainer: {
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: "#ddd",
  },
  tab: {
    flex: 1,
    padding: 10,
    alignItems: "center",
    borderRadius: 5,
  },
  activeTab: {
    backgroundColor: "#1e90ff",
  },
  tabText: {
    color: "#666",
    fontWeight: "500",
  },
  activeTabText: {
    color: "#fff",
  },
  content: {
    flex: 1,
  },
  sectionContent: {
    padding: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#333",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 10,
    color: "#333",
  },
  cardContent: {
    marginBottom: 10,
  },
  cardText: {
    fontSize: 14,
    color: "#666",
    marginBottom: 5,
  },
  cardButton: {
    backgroundColor: "#1e90ff",
    padding: 8,
    borderRadius: 5,
    alignItems: "center",
  },
  cardButtonText: {
    color: "#fff",
    fontWeight: "500",
  },
  unreadBadge: {
    backgroundColor: "#FF3B30",
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: "auto",
  },
  unreadText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
    paddingHorizontal: 5,
  },
});

export default BackendScreen;
