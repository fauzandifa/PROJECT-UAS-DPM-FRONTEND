import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const Navbar = ({ activePage, setActivePage, disabled }) => {
  const handlePress = (page) => {
    if (!disabled) {
      setActivePage(page);
    }
  };

  return (
    <View style={styles.navbar}>
      <TouchableOpacity
        style={styles.navItem}
        onPress={() => handlePress('film')}
      >
        <Ionicons
          name="film-outline"
          size={24}
          color={activePage === 'film' ? '#1e90ff' : '#555'}
        />
        <Text
          style={[styles.navText, { color: activePage === 'film' ? '#1e90ff' : '#555' }]}
        >
          Film
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.navItem}
        onPress={() => handlePress('comingSoon')}
      >
        <Ionicons
          name="time-outline"
          size={24}
          color={activePage === 'comingSoon' ? '#1e90ff' : '#555'}
        />
        <Text
          style={[styles.navText, { color: activePage === 'comingSoon' ? '#1e90ff' : '#555' }]}
        >
          Coming Soon
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.navItem}
        onPress={() => handlePress('profile')}
      >
        <Ionicons
          name="person-outline"
          size={24}
          color={activePage === 'profile' ? '#1e90ff' : '#555'}
        />
        <Text
          style={[styles.navText, { color: activePage === 'profile' ? '#1e90ff' : '#555' }]}
        >
          Profile
        </Text>
      </TouchableOpacity>
    </View>
  );
};



const styles = StyleSheet.create({
  navbar: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#fff",
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: "#ddd",
  },
  navItem: {
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
  activeNavItem: {
    borderBottomWidth: 2,
    borderBottomColor: "#1e90ff",
  },
  navText: {
    fontSize: 12,
    fontFamily:"bold",
    color: "#000",
  },
});

export default Navbar;
