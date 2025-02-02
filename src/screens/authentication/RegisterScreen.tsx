import colors from "@colors";
import { Button, Input } from "@components";
import { navigate } from "@navigationService";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useAuth } from "state/AuthContext";

type UserData = {
  email: string;
  password: string;
  username: string;
};

const RegisterScreen: React.FC = () => {
  const { register } = useAuth();
  const [userData, setUserData] = useState<UserData>({
    email: "",
    password: "",
    username: "",
  });

  const handleRegister = async (userData: UserData) => {
    try {
      await register(userData.email, userData.password, userData.username);
    } catch (err: any) {
      console.log(err.message);
    }
  };

  return (
    <View style={styles.screenContainer}>
      <View style={styles.loginContainer}>
        <Input
          style={styles.input}
          placeholder="Email"
          value={userData.email}
          onChangeText={(inputEmail) =>
            setUserData({ ...userData, email: inputEmail })
          }
        />
        <Input
          style={styles.input}
          placeholder="Username"
          value={userData.username}
          onChangeText={(inputUsername) =>
            setUserData({ ...userData, username: inputUsername })
          }
        />
        <Input
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          value={userData.password}
          onChangeText={(inputPassword) =>
            setUserData({ ...userData, password: inputPassword })
          }
        />
      </View>
      <Button
        styling={{ button: styles.buttonStyle }}
        title="Sign Up"
        onPress={() => handleRegister(userData)}
      />
      <View style={{ marginTop: "3%" }}>
        <Text>
          Already have an account?{" "}
          <Text
            style={colors.primaryColor}
            onPress={() => navigate("Auth", { screen: "Login" })}
          >
            Log In
          </Text>
        </Text>
      </View>
      <Button
        title="navigate to start"
        onPress={() => navigate("Auth", { screen: "Start" })}
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
  loginContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8f9fa",
  },
  input: {
    width: "80%",
    height: 50,
  },
  buttonStyle: {
    width: "80%",
    margin: "1%",
  },
});

export default RegisterScreen;
