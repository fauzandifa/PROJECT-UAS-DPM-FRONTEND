import React, { useState, useEffect } from "react";
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import styles from "../styles/styles";
import { API_ENDPOINTS } from '../config/api';
import api from '../config/api';  // Import instance axios yang sudah dikonfigurasi
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const ProfilePage = () => {
  const [userData, setUserData] = useState(null); // State to hold user data
  const [isModalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    // Fetch user data from backend
    const fetchUserData = async () => {
      try {
        const userDataString = await AsyncStorage.getItem("userData");
        if (userDataString) {
          const userData = JSON.parse(userDataString);
          setUserData(userData);
        }

        const token = await AsyncStorage.getItem("userToken");
        console.log('Token:', token); // Debug log
        
        if (token === 'admin-token') {
          return;
        }
        
        if (token) {
          try {
            console.log('Making request to:', API_ENDPOINTS.profile);
            const response = await axios.get(API_ENDPOINTS.profile, {
              headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
              }
            });
            console.log('Response:', response.data);

            if (response.data.success) {
              setUserData(response.data.data);
              await AsyncStorage.setItem("userData", JSON.stringify(response.data.data));
            }
          } catch (apiError) {
            console.error("API Error details:", {
              message: apiError.message,
              status: apiError.response?.status,
              data: apiError.response?.data,
              url: apiError.config?.url
            });
          }
        }
      } catch (error) {
        console.error("Error in fetchUserData:", error);
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = () => {
    setModalVisible(false);
    navigation.replace("Login");
  };

  const openLogoutConfirmation = () => setModalVisible(true);
  const closeLogoutConfirmation = () => setModalVisible(false);

  return (
    <ScrollView style={styles.profileContainer}>
      <View style={styles.profileHeader}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>
            {userData?.nama?.slice(0, 2).toUpperCase() || "NA"}
          </Text>
        </View>
        <Text style={styles.userName}>{userData?.nama || "Loading..."}</Text>
        <Text style={styles.userTagline}>
          {userData?.email || "Loading..."}
        </Text>
        <Text style={styles.userInfo}>
          Username: <Text style={styles.usernameText}>{userData?.username || "Loading..."}</Text>
        </Text>
      </View>

      <View style={styles.menuSection}>
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => navigation.navigate("HistoryScreen")}
        >
          <Ionicons name="card-outline" size={24} color="#000" />
          <Text style={styles.menuItemText}> payment history</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => navigation.navigate("ChatAdmin")}
        >
          <Ionicons name="help-circle-outline" size={24} color="#000" />
          <Text style={styles.menuItemText}> contact admin</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.logoutButton}
        onPress={openLogoutConfirmation}
      >
        <Text style={styles.logoutText}>Log Out</Text>
      </TouchableOpacity>

      {/* Modal Konfirmasi Logout */}
      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={closeLogoutConfirmation}
      >
        <View style={modalStyles.modalOverlay}>
          <View style={modalStyles.modalContent}>
            <Text style={modalStyles.modalTitle}>Confirm Log Out</Text>
            <Text style={modalStyles.modalMessage}>
              do you really want to log out?
            </Text>
            <View style={modalStyles.buttonContainer}>
              <TouchableOpacity
                style={modalStyles.noButton}
                onPress={closeLogoutConfirmation}
              >
                <Text style={modalStyles.noButtonText}>cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={modalStyles.yesButton}
                onPress={handleLogout}
              >
                <Text style={modalStyles.yesButtonText}>Yes</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

export default ProfilePage;

// Gaya untuk modal
const modalStyles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: "80%",
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalMessage: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  noButton: {
    backgroundColor: "#007BFF", // Blue color
    padding: 10,
    borderRadius: 5,
    flex: 1,
    alignItems: "center",
    marginRight: 5,
  },
  yesButton: {
    backgroundColor: "#FF0000", // Red color
    padding: 10,
    borderRadius: 5,
    flex: 1,
    alignItems: "center",
    marginLeft: 5,
  },
  noButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  yesButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});
