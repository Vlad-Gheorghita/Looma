import Button from "@components/Button";
import Input from "@components/Input";
import React, { useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { register } from "services/firebase/authService";
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";

type UserData = {
  username: string;
  password: string;
};

const StartScreen: React.FC = () => {
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
    <View style={styles.container}>
      {/* to be removed, only during implementation */}
      <Text>
        Username:{userData.username} Password:{userData.password}
      </Text>
      <Input
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <Input
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button
        styling={{ button: styles.buttonStyle }}
        title="Log In"
        onPress={() => setUser({ ...userData, username })}
      />
      <Button
        styling={{ button: styles.buttonStyle }}
        title="Sign Up"
        onPress={() => {
          signUp(username, password);
        }}
      />
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
  input: {
    width: "80%",
    height: 50,
  },
  buttonStyle: {
    width: "50%",
    margin: "1%",
  },
});

export default StartScreen;
