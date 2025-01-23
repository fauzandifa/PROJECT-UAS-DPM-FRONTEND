import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NowPlayingScreen from '../screens/NowPlayingScreen';
import ProfileScreen from '../screens/ProfileScreen';
import UserAccScreen from '../screens/UserAccScreen';
import BookingUserScreen from '../screens/BookingUserScreen';

const Tab = createBottomTabNavigator();

const MainNavigator = () => {
  const [isAdmin, setIsAdmin] = React.useState(false);

  React.useEffect(() => {
    checkAdminStatus();
  }, []);

  const checkAdminStatus = async () => {
    try {
      const userData = await AsyncStorage.getItem('userData');
      if (userData) {
        const user = JSON.parse(userData);
        setIsAdmin(user.role === 'admin');
      }
    } catch (error) {
      console.error('Error checking admin status:', error);
    }
  };

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: { backgroundColor: '#000' },
        tabBarActiveTintColor: '#1e90ff',
        tabBarInactiveTintColor: '#666',
        headerStyle: { backgroundColor: '#000' },
        headerTintColor: '#fff'
      }}
    >
      <Tab.Screen
        name="Movies"
        component={NowPlayingScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="film-outline" size={size} color={color} />
          )
        }}
      />
      
      {/* Tab khusus admin */}
      {isAdmin && (
        <Tab.Screen
          name="Users"
          component={UserAccScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="people-outline" size={size} color={color} />
            )
          }}
        />
      )}
      
      {isAdmin && (
        <Tab.Screen
          name="Bookings"
          component={BookingUserScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="calendar-outline" size={size} color={color} />
            )
          }}
        />
      )}

      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-outline" size={size} color={color} />
          )
        }}
      />
    </Tab.Navigator>
  );
};

export default MainNavigator; 