import Button from "@components/Button";
import Input from "@components/Input";
import React, { useState } from "react";
import { StyleSheet, View, Text } from "react-native";

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

  return (
    <View style={styles.container}>
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
        autoCapitalize="none"
        autoComplete="off"
      />
      <Button
        styling={{ button: styles.buttonStyle }}
        title="Log In"
        onPress={() => setUser({ ...userData, username })}
      />
      <Button
        styling={{ button: styles.buttonStyle }}
        title="Sign Up"
        onPress={() => setUser({ ...userData, password })}
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
    height: '6%',
  },
  buttonStyle: {
    width: "50%",
    margin: "1%",
  },
});

export default StartScreen;
