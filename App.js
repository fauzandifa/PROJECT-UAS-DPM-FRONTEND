import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Opening from "./src/opening/SpalshScreen";
import LoginScreen from "./src/Login/LoginScreen";
import RegisterScreen from "./src/Login/RegisterScreen";
import ForgotPasswordScreen from "./src/Login/ForgotPassword";
import NowPlayingPage from "./src/screens/NowPlayingPage";
import ComingSoonPage from "./src/screens/ComingSoonPage";
import ProfileScreen from "./src/screens/ProfileScreen";
import HistoryScreen from "./src/screens/HistoryScreen";
import BackendScreen from "./src/screens/backendScreen";
import ChatAdmin from "./src/screens/ChatAdmin";

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Opening"
        screenOptions={{
          headerStyle: {
            backgroundColor: "#1e90ff",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      >
        <Stack.Screen
          name="Opening"
          component={Opening}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ForgotPassword"
          component={ForgotPasswordScreen}
          options={{ title: "Forgot Password" }}
        />
        <Stack.Screen
          name="Home"
          component={NowPlayingPage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ComingSoon"
          component={ComingSoonPage}
          options={{ title: "Coming Soon" }}
        />
        <Stack.Screen
          name="Profile"
          component={ProfileScreen}
          options={{ title: "Profile" }}
        />
        <Stack.Screen
          name="HistoryScreen"
          component={HistoryScreen}
          options={{ title: "Riwayat Pembayaran" }}
        />
        <Stack.Screen
          name="BackendScreen"
          component={BackendScreen}
          options={{ title: "Backend Screen" }}
        />
        <Stack.Screen
          name="ChatAdmin"
          component={ChatAdmin}
          options={{ title: "Chat with Admin" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
