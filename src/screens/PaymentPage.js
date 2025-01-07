import React from "react";
import { View, StyleSheet } from "react-native";
import PaymentScreen from "../components/PaymentScreen";

const PaymentPage = () => {
  return (
    <View style={styles.container}>
      <PaymentScreen />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});

export default PaymentPage;
