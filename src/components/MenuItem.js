import React from "react";
import { TouchableOpacity, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const MenuItem = ({ icon, title }) => (
  <TouchableOpacity style={styles.menuItem}>
    <Ionicons name={icon} size={24} color="#555" />
    <Text style={styles.menuText}>{title}</Text>
  </TouchableOpacity>
);

const styles = {
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#ECECEC",
  },
  menuText: {
    marginLeft: 15,
    fontSize: 16,
    color: "#333",
  },
};

export default MenuItem;
