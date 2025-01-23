import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const Navbar = ({ activePage, setActivePage }) => {
  const navigation = useNavigation();

  const handlePress = (page) => {
    setActivePage(page);
    switch (page) {
      case 'NowPlaying':
        navigation.navigate('NowPlaying');
        break;
      case 'ComingSoon':
        navigation.navigate('ComingSoon');
        break;
      case 'Profile':
        navigation.navigate('Profile');
        break;
      default:
        break;
    }
  };

  return (
    <View style={styles.navbar}>
      <TouchableOpacity
        style={styles.navItem}
        onPress={() => handlePress('NowPlaying')}
      >
        <Ionicons
          name={activePage === 'NowPlaying' ? 'film' : 'film-outline'}
          size={24}
          color={activePage === 'NowPlaying' ? '#1e90ff' : '#000'}
        />
        <Text style={[
          styles.navText,
          activePage === 'NowPlaying' && styles.activeText
        ]}>
          Home
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.navItem}
        onPress={() => handlePress('ComingSoon')}
      >
        <Ionicons
          name={activePage === 'ComingSoon' ? 'time' : 'time-outline'}
          size={24}
          color={activePage === 'ComingSoon' ? '#1e90ff' : '#000'}
        />
        <Text style={[
          styles.navText,
          activePage === 'ComingSoon' && styles.activeText
        ]}>
          Coming Soon
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.navItem}
        onPress={() => handlePress('Profile')}
      >
        <Ionicons
          name={activePage === 'Profile' ? 'person' : 'person-outline'}
          size={24}
          color={activePage === 'Profile' ? '#1e90ff' : '#000'}
        />
        <Text style={[
          styles.navText,
          activePage === 'Profile' && styles.activeText
        ]}>
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
    alignItems: "center",
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
    alignItems: 'center',
    padding: 10,
  },
  navText: {
    fontSize: 12,
    marginTop: 4,
    color: '#000',
  },
  activeText: {
    color: '#1e90ff',
    fontWeight: 'bold',
  },
});

export default Navbar;