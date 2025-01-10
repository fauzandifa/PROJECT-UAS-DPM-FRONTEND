import React, { useState, useEffect } from "react";
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
} from "react-native";
import MenuItem from "./MenuItem";
import styles from "../styles/styles";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

const ProfilePage = () => {
  const [userData, setUserData] = useState(null); // State to hold user data
  const [isModalVisible, setModalVisible] = useState(false);
  const [isSettingsModalVisible, setSettingsModalVisible] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    // Fetch user data from backend
    const fetchUserData = async () => {
      try {
        const response = await fetch("http://192.168.1.5:5000/api/auth"); // Replace with your API endpoint
        const data = await response.json();
        setUserData(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
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

  const openSettingsModal = () => setSettingsModalVisible(true);
  const closeSettingsModal = () => setSettingsModalVisible(false);

  return (
    <ScrollView style={styles.profileContainer}>
      <View style={styles.profileHeader}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>
            {userData?.nama?.slice(0, 2).toUpperCase() || "NA"}
          </Text>
        </View>
        <Text style={styles.userName}>{userData?.nama || "Loading..."}</Text>
        <Text style={styles.userTagline}>{userData?.email || "Loading..."}</Text>
        <Text style={styles.userInfo}>Username: {userData?.username || "Loading..."}</Text>
      </View>

      <View style={styles.menuSection}>
        <MenuItem icon="person-outline" title="Info Pribadi" />
        <MenuItem icon="notifications-outline" title="Notifikasi" />
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => navigation.navigate("HistoryScreen")}
        >
          <Ionicons name="card-outline" size={24} color="#000" />
          <Text style={styles.menuItemText}> History Pembayaran</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => navigation.navigate("ChatAdmin")}
        >
          <Ionicons name="help-circle-outline" size={24} color="#000" />
          <Text style={styles.menuItemText}> Hubungi Admin</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={openSettingsModal}>
          <Ionicons name="settings-outline" size={24} color="#000" />
          <Text style={styles.menuItemText}> Pengaturan</Text>
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
            <Text style={modalStyles.modalTitle}>Konfirmasi Logout</Text>
            <Text style={modalStyles.modalMessage}>
              Apakah Anda yakin ingin keluar?
            </Text>
            <View style={modalStyles.buttonContainer}>
              <TouchableOpacity
                style={modalStyles.noButton}
                onPress={closeLogoutConfirmation}
              >
                <Text style={modalStyles.noButtonText}>Tidak</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={modalStyles.yesButton}
                onPress={handleLogout}
              >
                <Text style={modalStyles.yesButtonText}>Ya</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Settings Modal */}
      <Modal
        visible={isSettingsModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={closeSettingsModal}
      >
        <View style={modalStyles.modalOverlay}>
          <View style={modalStyles.modalContent}>
            <Text style={modalStyles.modalTitle}>Pengaturan</Text>
            <View style={modalStyles.settingsOptions}>
              <TouchableOpacity
                style={modalStyles.optionButton}
                onPress={() => navigation.navigate("ChangePasswordScreen")}
              >
                <Text style={modalStyles.optionText}>Ubah Kata Sandi</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={modalStyles.optionButton}
                onPress={() => console.log("Change Notifications Preferences")}
              >
                <Text style={modalStyles.optionText}>
                  Preferensi Notifikasi
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={modalStyles.optionButton}
                onPress={() => console.log("Theme Settings")}
              >
                <Text style={modalStyles.optionText}>Tema Aplikasi</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={modalStyles.closeButton}
              onPress={closeSettingsModal}
            >
              <Text style={modalStyles.closeButtonText}>Tutup</Text>
            </TouchableOpacity>
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
  // Styling for settings modal
  settingsOptions: {
    marginVertical: 20,
  },
  optionButton: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: "#ddd",
    width: "100%",
    alignItems: "center",
  },
  optionText: {
    fontSize: 16,
    color: "#333",
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: "#FF6347",
    padding: 10,
    borderRadius: 5,
  },
  closeButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});
