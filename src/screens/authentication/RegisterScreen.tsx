import { Button, Input } from "@components";
import { usePopOutAnimation } from "@hooks";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Animated, { useAnimatedStyle } from "react-native-reanimated";
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
  const { scale, opacity } = usePopOutAnimation();
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

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
        <Animated.Image
          source={require("@icons/register-icon.png")}
          style={[styles.registerIconStyle, animatedStyle]}
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
        <Button
          styling={{ button: styles.buttonStyle }}
          title="Sign Up"
          onPress={() => handleRegister(userData)}
        />
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
  buttonStyle: {
    width: "80%",
  },
  registerIconStyle: {
    height: "20%",
    marginBottom: "5%",
    aspectRatio: 1,
    resizeMode: "contain",
  },
});

export default RegisterScreen;
