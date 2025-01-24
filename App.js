import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator, CardStyleInterpolators } from "@react-navigation/stack";
import Opening from "./src/opening/SpalshScreen";
import LoginScreen from "./src/Login/LoginScreen";
import RegisterScreen from "./src/Login/RegisterScreen";
import ForgotPasswordScreen from "./src/Login/ForgotPassword";
import NowPlayingScreen from "./src/screens/NowPlayingScreen";
import ComingSoonScreen from "./src/screens/ComingSoonScreen";
import ProfileScreen from "./src/screens/ProfileScreen";
import HistoryScreen from "./src/screens/HistoryScreen";
import BackendScreen from "./src/screens/backendScreen";
import ChatAdmin from "./src/screens/ChatAdmin";
import MovieDetailScreen from './src/screens/MovieDetailScreen';
import BookFilmScreen from './src/screens/BookFilmScreen';
import ComingSoonDetailScreen from './src/screens/ComingSoonDetailScreen';
import PasswordPaymentScreen from './src/screens/PasswordPaymentScreen';
import ReceiptScreen from './src/screens/ReceiptScreen';
import BookingUserScreen from './src/screens/BookingUserScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Opening"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#fff',
          },
          headerTintColor: '#000',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen name="Opening" component={Opening} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
        <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} options={{ title: "Forgot Password" }} />
        <Stack.Screen name="NowPlaying" component={NowPlayingScreen} options={{ headerShown: false }} />
        <Stack.Screen name="ComingSoon" component={ComingSoonScreen} options={{ headerShown: false }} />
        <Stack.Screen name="MovieDetail" component={MovieDetailScreen} options={{ title: 'Movie Detail' }} />
        <Stack.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false }} />
        <Stack.Screen name="BookFilm" component={BookFilmScreen} options={{ title: 'Book Ticket' }} />
        <Stack.Screen 
          name="History"
          component={HistoryScreen} 
          options={{ title: 'History' }} 
        />
        <Stack.Screen name="ChatAdmin" component={ChatAdmin} options={{ title: 'Chat Admin' }} />
        <Stack.Screen 
          name="ComingSoonDetail" 
          component={ComingSoonDetailScreen} 
          options={{ title: 'Movie Detail' }}
        />
        <Stack.Screen 
          name="PasswordPayment" 
          component={PasswordPaymentScreen} 
          options={{ title: 'Payment Confirmation' }}
        />
        <Stack.Screen 
          name="ReceiptScreen" 
          component={ReceiptScreen} 
          options={{ 
            headerShown: false,
            title: 'Booking Receipt',
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          }}
        />
        <Stack.Screen 
          name="BookingUser" 
          component={BookingUserScreen} 
          options={{ title: 'Booking History' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
