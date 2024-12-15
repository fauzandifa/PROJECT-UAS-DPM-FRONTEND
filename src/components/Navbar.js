import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from '../styles/styles';

const Navbar = ({ activePage, setActivePage }) => (
  <View style={styles.navbar}>
    <TouchableOpacity
      style={styles.navItem}
      onPress={() => setActivePage('film')}
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
      onPress={() => setActivePage('comingSoon')}
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
      onPress={() => setActivePage('profile')}
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

export default Navbar;
