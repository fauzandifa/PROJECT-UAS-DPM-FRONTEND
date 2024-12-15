import React, { useEffect } from "react";
import { View, Image, StyleSheet } from "react-native";
import * as SplashScreen from "expo-splash-screen";

const Opening = ({ navigation }) => {
  useEffect(() => {
    async function hideSplashScreen() {
      await SplashScreen.hideAsync();
      navigation.replace("Login");
    }

    setTimeout(hideSplashScreen, 3000); // Tampilkan splash screen selama 3 detik
  }, []);

  return (
    <View style={styles.container}>
      <Image source={require("../../assets/tiket.jpg")} style={styles.logo} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ffffff",
  },
  logo: {
    width: 200,
    height: 200,
    resizeMode: "contain",
  },
});

export default Opening;