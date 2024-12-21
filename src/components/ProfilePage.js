import React from "react";
import { ScrollView, View, Text, TouchableOpacity } from "react-native";
import MenuItem from "./MenuItem";
import styles from "../styles/styles";

const ProfilePage = () => (
  <ScrollView style={styles.profileContainer}>
    <View style={styles.profileHeader}>
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>VK</Text>
      </View>
      <Text style={styles.userName}>Vishal Khadok</Text>
      <Text style={styles.userTagline}>I love fast food</Text>
    </View>

    <View style={styles.menuSection}>
      <MenuItem icon="person-outline" title="Personal Info" />
      <MenuItem icon="notifications-outline" title="Notifications" />
      <MenuItem icon="card-outline" title="Payment History" />
      <MenuItem icon="costumer-service" title="Costumer Service" />
      <MenuItem icon="settings-outline" title="Settings" />
    </View>

    <TouchableOpacity style={styles.logoutButton}>
      <Text style={styles.logoutText}>Log Out</Text>
    </TouchableOpacity>
  </ScrollView>
);

export default ProfilePage;
