import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  RefreshControl,
} from 'react-native';
import axios from 'axios';

const UserAccScreen = () => {
  const [users, setUsers] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://192.168.1.5:5000/api/users');
      setUsers(response.data.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    fetchUsers().finally(() => setRefreshing(false));
  }, []);

  return (
    <ScrollView 
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <Text style={styles.title}>Registered Users</Text>
      {users.map((user) => (
        <View key={user._id} style={styles.card}>
          <Text style={styles.cardTitle}>{user.nama}</Text>
          <Text style={styles.cardText}>Username: {user.username}</Text>
          <Text style={styles.cardText}>Email: {user.email}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    margin: 15,
  },
  card: {
    backgroundColor: '#1e1e1e',
    padding: 15,
    margin: 10,
    borderRadius: 10,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1e90ff',
    marginBottom: 10,
  },
  cardText: {
    color: '#fff',
    marginBottom: 5,
  },
});

export default UserAccScreen; 