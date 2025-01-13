import Button from "@components/Button";
import React from "react";
import { StyleSheet, View } from "react-native";

const StartScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Button styling={{button: styles.buttonStyle}} title="Log In" />
      <Button styling={{button: styles.buttonStyle}} title="Sign Up" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8f9fa",
  },
  box: {
    width: "80%",
    height: "20%",
    backgroundColor: "#4caf50",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  buttonStyle: {
    width: "50%",
    margin: "1%"
  }
});

export default StartScreen;
