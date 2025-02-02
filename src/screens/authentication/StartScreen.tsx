import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { navigate } from "@navigationService";
import { Button } from "@components";
const StartScreen: React.FC = () => {

  return (
    <View style={styles.screenContainer}>
      <Button
        styling={{ button: styles.buttonStyle }}
        title="Log In"
        onPress={() => navigate("Auth",{screen: 'Login'})}
      />
      <Button
        styling={{ button: styles.buttonStyle }}
        title="Sign Up"
        onPress={() => navigate("Auth",{screen: 'Register'})}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8f9fa",
  },
  buttonStyle: {
    width: "80%",
    margin: "1%",
  },
});

export default StartScreen;
