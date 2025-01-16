import Button from "@components/Button";
import Input from "@components/Input";
import React, { useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { register } from "@authService";

type UserData = {
  username: string;
  password: string;
};

const StartScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [userData, setUser] = useState<UserData>({
    username: "",
    password: "",
  });

  const signUp = (email: string, password: string) => {
    register(email, password)
      .then((user) => {
        console.log(`user with ${user.user.email} was created!`);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <View style={styles.screenContainer}>
      <Button
        styling={{ button: styles.buttonStyle }}
        title="Log In"
        onPress={() => navigation.navigate("Login")}
      />
      <Button
        styling={{ button: styles.buttonStyle }}
        title="Sign Up"
        onPress={() => navigation.navigate("Register")}
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
