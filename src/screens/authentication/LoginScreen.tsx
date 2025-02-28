import { Button, Input } from "@components";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useAuth } from "state/AuthContext";
import GoogleIcon from "../../../assets/google-icons/google-icon.svg";
import { usePopOutAnimation } from "@hooks";
import Animated, { useAnimatedStyle } from "react-native-reanimated";

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
  const { scale, opacity } = usePopOutAnimation();
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  const handleLogin = async (userData: UserData): Promise<void> => {
    try {
      await login({
        loginType: "email_and_password",
        email: userData.email,
        password: userData.password,
      });
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const handleGoogleLogin = async (): Promise<void> => {
    try {
      await login({ loginType: "google" });
    } catch (error: any) {
      console.log(error.message);
    }
  };

  return (
    <View style={styles.screenContainer}>
      <View style={styles.loginContainer}>
        <Animated.Image
          source={require("@icons/login-icon.png")}
          style={[styles.loginIconStyle, animatedStyle]}
        />
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
        <View style={{ alignSelf: "flex-end", marginRight: "10%" }}>
          <Text>Forgot your password?</Text>
        </View>
        <View style={styles.buttonContainerStyle}>
          <Button
            styling={{ button: styles.buttonStyle }}
            title="Log In"
            onPress={() => handleLogin(userData)}
          />
          <Button
            icon={<GoogleIcon />}
            styling={{ button: [styles.buttonStyle, { width: "15%" }] }}
            onPress={handleGoogleLogin}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "stretch",
    backgroundColor: "#f8f9fa",
  },
  loginContainer: {
    justifyContent: "center",
    alignItems: "center",
    gap: 15,
  },
  input: {
    width: "80%",
    height: 50,
  },
  buttonContainerStyle: {
    flexDirection: "row",
    gap: 15,
  },
  buttonStyle: {
    width: "40%",
  },
  loginIconStyle: {
    height: "20%",
    marginBottom: "5%",
    aspectRatio: 1,
    resizeMode: "contain",
  },
});

export default LoginScreen;
