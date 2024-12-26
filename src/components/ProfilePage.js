import React, { useState } from "react";
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

const ProfilePage = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();

  const handleLogout = () => {
    // Tutup modal dan navigasi ke halaman login
    setModalVisible(false);
    navigation.replace("Login");
  };

  const openLogoutConfirmation = () => {
    // Tampilkan modal konfirmasi
    setModalVisible(true);
  };

  const closeLogoutConfirmation = () => {
    // Tutup modal tanpa keluar
    setModalVisible(false);
  };

  return (
    <ScrollView style={styles.profileContainer}>
      <View style={styles.profileHeader}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>VK</Text>
        </View>
        <Text style={styles.userName}>Vishal Khadok</Text>
        <Text style={styles.userTagline}>I love fast food</Text>
      </View>

      <View style={styles.menuSection}>
        <MenuItem icon="person-outline" title="info pribadi" />
        <MenuItem icon="notifications-outline" title="notifikasi" />
        <MenuItem icon="card-outline" title="History Pembayaran" />
        <MenuItem icon="help-circle-outline" title="hubungi admin" />
        <MenuItem icon="settings-outline" title="pengaturan" />
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
    backgroundColor: "#007BFF", // Warna biru
    padding: 10,
    borderRadius: 5,
    flex: 1,
    alignItems: "center",
    marginRight: 5,
  },
  yesButton: {
    backgroundColor: "#FF0000", // Warna merah
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
