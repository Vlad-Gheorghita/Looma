import { Button, SafeAreaView, StyleSheet, Text, View } from "react-native";
import AppNavigator from "./src/navigation/AppNavigator";
import React, { useState } from "react";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <AppNavigator isLoggedIn={isLoggedIn} />
      {!isLoggedIn && (
        <Button title="Log In" onPress={() => setIsLoggedIn(true)} />
      )}
      {isLoggedIn && (
        <Button title="Log Out" onPress={() => setIsLoggedIn(false)} />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
