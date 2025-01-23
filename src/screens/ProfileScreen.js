import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
} from "react-native";
import { Ionicons } from '@expo/vector-icons';
import Navbar from "../components/Navbar";
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProfileScreen = () => {
  const [activePage, setActivePage] = useState("Profile");
  const [isAdmin, setIsAdmin] = useState(false);

  React.useEffect(() => {
    const checkAdmin = async () => {
      const userDataString = await AsyncStorage.getItem('userData');
      if (userDataString) {
        const userData = JSON.parse(userDataString);
        setIsAdmin(userData.role === 'admin');
      }
    };
    checkAdmin();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <View style={styles.profileIcon}>
            <Ionicons name="person-circle" size={100} color="#666" />
          </View>
          <Text style={styles.title}>
            {isAdmin ? "Administrator" : "User Profile"}
          </Text>
          <Text style={styles.subtitle}>
            {isAdmin ? "admin@tiketku.com" : "user@tiketku.com"}
          </Text>
        </View>
        
        <View style={styles.infoSection}>
          <Text style={styles.sectionTitle}>Account Information</Text>
          <View style={styles.infoItem}>
            <Text style={styles.label}>Role:</Text>
            <Text style={styles.value}>{isAdmin ? "Administrator" : "User"}</Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.label}>Status:</Text>
            <Text style={styles.value}>Active</Text>
          </View>
        </View>
      </View>
      <Navbar activePage={activePage} setActivePage={setActivePage} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 30,
  },
  profileIcon: {
    marginBottom: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
  infoSection: {
    backgroundColor: '#f8f8f8',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  infoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  label: {
    fontSize: 16,
    color: '#666',
  },
  value: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
});

export default ProfileScreen;
