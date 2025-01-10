import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const Navbar = ({ activePage, setActivePage, disabled }) => {
  const navigation = useNavigation();

  const handleNavigation = (route) => {
    if (!disabled) {
      setActivePage(route);
      navigation.navigate(route);
    }
  };

  return (
    <View style={styles.navbar}>
      <TouchableOpacity
        style={styles.navItem}
        onPress={() => handleNavigation("Home")}
      >
        <Ionicons
          name="film-outline"
          size={24}
          color={activePage === "NowPlaying" ? "#1e90ff" : "#555"}
        />
        <Text
          style={[
            styles.navText,
            { color: activePage === "NowPlaying" ? "#1e90ff" : "#555" },
          ]}
        >
          Film
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.navItem}
        onPress={() => handleNavigation("ComingSoon")}
      >
        <Ionicons
          name="time-outline"
          size={24}
          color={activePage === "ComingSoon" ? "#1e90ff" : "#555"}
        />
        <Text
          style={[
            styles.navText,
            { color: activePage === "ComingSoon" ? "#1e90ff" : "#555" },
          ]}
        >
          Coming Soon
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.navItem}
        onPress={() => handleNavigation("Profile")}
      >
        <Ionicons
          name="person-outline"
          size={24}
          color={activePage === "Profile" ? "#1e90ff" : "#555"}
        />
        <Text
          style={[
            styles.navText,
            { color: activePage === "Profile" ? "#1e90ff" : "#555" },
          ]}
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
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
  navItem: {
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
  navText: {
    fontSize: 12,
    fontFamily: "bold",
    color: "#555",
  },
});

export default Navbar;