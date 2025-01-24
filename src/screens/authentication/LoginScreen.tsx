import colors from "@colors";
import Button from "@components/Button";
import Input from "@components/Input";
import { navigate } from "@navigationService";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useAuth } from "state/AuthContext";

type UserData = {
  email: string;
  password: string;
};

const LoginScreen: React.FC = () => {
  const { login } = useAuth();
  const [userData, setUserData] = useState<UserData>({
    email: "",
    password: "",
  });

  const handleLogin = async (userData: UserData) => {
    try {
      await login(userData.email, userData.password);
    } catch (error: any) {
      console.log(error.message);
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
          placeholder="Password"
          secureTextEntry
          value={userData.password}
          onChangeText={(inputPassword) =>
            setUserData({ ...userData, password: inputPassword })
          }
        />
        <View style={{ width: "80%", marginBottom: "5%" }}>
          <Text style={{ textAlign: "right" }}>Forgot your password?</Text>
        </View>
      </View>
      <Button
        styling={{ button: styles.buttonStyle }}
        title="Log In"
        onPress={() => handleLogin(userData)}
      />
      <View style={{ marginTop: "3%" }}>
        <Text>
          Don't have an account?{" "}
          <Text
            style={colors.primaryColor}
            onPress={() => navigate("Auth", { screen: "Register" })}
          >
            Sign Up
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

export default LoginScreen;
