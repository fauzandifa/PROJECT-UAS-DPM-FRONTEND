import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Navbar from "../components/Navbar";
import { useNavigation } from '@react-navigation/native';
import Modal from 'react-native-modal';

const ProfileScreen = () => {
  const navigation = useNavigation();
  const [userProfile, setUserProfile] = useState({
    nama: 'Guest',
    email: '',
    username: ''
  });
  const [activePage, setActivePage] = useState("Profile");
  const [isLogoutModalVisible, setLogoutModalVisible] = useState(false);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        // Ambil data pengguna dari AsyncStorage
        const userDataString = await AsyncStorage.getItem('userData');
        
        if (!userDataString) {
          console.warn('Tidak ada data pengguna');
          return;
        }

        // Parse data JSON dengan penanganan kesalahan
        let userData;
        try {
          userData = JSON.parse(userDataString);
        } catch (parseError) {
          console.error('Kesalahan parsing data:', parseError);
          return;
        }

        // Validasi struktur data
        const profileData = userData.user || userData;
        
        if (!profileData) {
          console.error('Struktur data tidak valid', userData);
          return;
        }

        // Set profil pengguna dengan data yang ditemukan
        setUserProfile({
          nama: profileData.nama || profileData.name || 'Guest',
          email: profileData.email || '',
          username: profileData.username || profileData.name || ''
        });

      } catch (error) {
        console.error('Kesalahan mengambil profil:', error);
      }
    };

    fetchUserProfile();
  }, []);

  const handleLogout = () => {
    setLogoutModalVisible(true);
  };

  const handleLogoutConfirm = async () => {
    try {
      // Hapus data pengguna dari AsyncStorage
      await AsyncStorage.multiRemove(['userData', 'userToken']);
      setLogoutModalVisible(false);
      
      // Reset navigasi ke layar login
      navigation.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      });
    } catch (error) {
      console.error('Kesalahan logout:', error);
      Alert.alert('Kesalahan', 'Gagal melakukan logout. Silakan coba lagi.');
    }
  };

  return (
    <View style={styles.mainContainer}>
      <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
        <View style={styles.headerSpace} />
        <LinearGradient
          colors={['#1e90ff', '#00bfff']}
          style={styles.headerGradient}
        >
          <View style={styles.header}>
            <View style={styles.profileIconContainer}>
              <View style={styles.profileIcon}>
                <Ionicons name="person-circle" size={100} color="#fff" />
              </View>
              <Text style={styles.profileName}>{userProfile.nama}</Text>
            </View>
          </View>
        </LinearGradient>

        <View style={styles.cardContainer}>
          <View style={styles.infoCard}>
            <View style={styles.infoContainer}>
              <View style={styles.infoItem}>
                <Text style={styles.label}>Email</Text>
                <Text style={styles.value}>{userProfile.email}</Text>
              </View>
              <View style={styles.divider} />
              <View style={styles.infoItem}>
                <Text style={styles.label}>Username</Text>
                <Text style={styles.value}>{userProfile.username}</Text>
              </View>
            </View>
          </View>

          <View style={styles.menuContainer}>
            <TouchableOpacity 
              style={styles.menuItem}
              onPress={() => navigation.navigate('HistoryScreen')}
            >
              <View style={styles.menuIconContainer}>
                <Ionicons name="ticket-outline" size={24} color="#fff" />
              </View>
              <Text style={styles.menuText}>Booking History</Text>
              <Ionicons name="chevron-forward" size={24} color="#666" />
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.menuItem}
              onPress={() => navigation.navigate('ChatAdmin')}
            >
              <View style={[styles.menuIconContainer, { backgroundColor: '#4CAF50' }]}>
                <Ionicons name="chatbubble-outline" size={24} color="#fff" />
              </View>
              <Text style={styles.menuText}>Chat With Admin</Text>
              <Ionicons name="chevron-forward" size={24} color="#666" />
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.logoutButton}
              onPress={handleLogout}
            >
              <LinearGradient
                colors={['#ff4444', '#ff0000']}
                style={styles.logoutGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              >
                <View style={styles.logoutContent}>
                  <Ionicons name="log-out-outline" size={24} color="#fff" />
                  <Text style={styles.logoutText}>LOGOUT</Text>
                </View>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      <Navbar activePage={activePage} setActivePage={setActivePage} />

      <Modal
        isVisible={isLogoutModalVisible}
        onBackdropPress={() => setLogoutModalVisible(false)}
        backdropOpacity={0.5}
        animationIn="fadeIn"
        animationOut="fadeOut"
        useNativeDriver
        style={styles.modal}
      >
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Ionicons name="log-out" size={40} color="#ff4444" />
            <Text style={styles.modalTitle}>Konfirmasi Logout</Text>
          </View>
          
          <Text style={styles.modalMessage}>
            Apakah Anda yakin ingin keluar dari aplikasi?
          </Text>

          <View style={styles.modalButtons}>
            <TouchableOpacity
              style={[styles.modalButton, styles.cancelButton]}
              onPress={() => setLogoutModalVisible(false)}
            >
              <Text style={styles.cancelButtonText}>Batal</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.modalButton, styles.logoutModalButton]}
              onPress={handleLogoutConfirm}
            >
              <Text style={styles.logoutModalButtonText}>Logout</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 100,
  },
  headerSpace: {
    height: 70,
  },
  headerGradient: {
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  header: {
    padding: 20,
    paddingBottom: 60,
    marginTop: 30,
  },
  profileIconContainer: {
    alignItems: 'center',
  },
  profileIcon: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 25,
    borderWidth: 3,
    borderColor: '#fff',
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  cardContainer: {
    padding: 20,
    marginTop: -30,
  },
  infoCard: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  infoContainer: {
    marginBottom: 10,
  },
  infoItem: {
    marginVertical: 10,
  },
  divider: {
    height: 1,
    backgroundColor: '#eee',
    marginVertical: 10,
  },
  label: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
    fontWeight: '500',
  },
  value: {
    fontSize: 16,
    color: '#333',
    fontWeight: '600',
  },
  menuContainer: {
    marginTop: 20,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 15,
    marginBottom: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  menuIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#1e90ff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  menuText: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  logoutButton: {
    marginTop: 30,
    marginHorizontal: 10,
    borderRadius: 15,
    elevation: 5,
    shadowColor: '#ff0000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    overflow: 'hidden',
  },
  logoutGradient: {
    width: '100%',
    height: 55,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoutContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
    letterSpacing: 1,
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  modal: {
    margin: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    width: '85%',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  modalHeader: {
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 10,
  },
  modalMessage: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 25,
    lineHeight: 22,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 10,
  },
  modalButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    marginHorizontal: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  cancelButton: {
    backgroundColor: '#f8f9fa',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  logoutModalButton: {
    backgroundColor: '#ff4444',
  },
  cancelButtonText: {
    color: '#666',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  logoutModalButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default ProfileScreen;
