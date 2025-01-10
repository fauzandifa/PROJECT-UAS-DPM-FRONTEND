import React from "react";
import { View, StyleSheet } from "react-native";
import ProfilePage from "../components/ProfilePage";
import Navbar from "../components/Navbar";

const ProfileScreen = () => {
  const [activePage, setActivePage] = React.useState("Profile");

  return (
    <View style={styles.container}>
      <ProfilePage />
      <Navbar activePage={activePage} setActivePage={setActivePage} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ProfileScreen;
