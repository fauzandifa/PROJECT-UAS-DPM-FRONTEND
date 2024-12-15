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
      <MenuItem icon="map-outline" title="Addresses" />
      <MenuItem icon="heart-outline" title="bookmark" />
      <MenuItem icon="notifications-outline" title="Notifications" />
      <MenuItem icon="card-outline" title="Payment Method" />
      <MenuItem icon="help-circle-outline" title="FAQs" />
      <MenuItem icon="star-outline" title="User Reviews" />
      <MenuItem icon="settings-outline" title="Settings" />
    </View>

    <TouchableOpacity style={styles.logoutButton}>
      <Text style={styles.logoutText}>Log Out</Text>
    </TouchableOpacity>
  </ScrollView>
);

export default ProfilePage;
