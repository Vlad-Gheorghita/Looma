import React from "react";
import { StyleSheet, View } from "react-native";
import { navigate } from "@navigationService";
import { Button } from "@components";
import Animated, { useAnimatedStyle } from "react-native-reanimated";
import { usePopOutAnimation } from "@hooks";
import GoogleIcon from "@icons/google-icon.svg";
import { useAuth } from "state/AuthContext";

const StartScreen: React.FC = () => {
  const { login } = useAuth();
  const { scale, opacity } = usePopOutAnimation();
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  const handleGoogleLogin = async (): Promise<void> => {
    try {
      await login({ loginType: "google" });
    } catch (error: any) {
      console.log(error.message);
    }
  };

  return (
    <View style={styles.screenContainer}>
      <Animated.Image
        source={require("@images/looma-logo_no-bg.png")}
        style={[styles.logoStyle, animatedStyle]}
      />
      <View style={styles.loginContainerStyle}>
      <Button
        styling={{button: {flex: 1}}}
        title="Log In"
        onPress={() => navigate("Auth", { screen: "Login" })}
      />
      <Button
        icon={<GoogleIcon />}
        styling={{
          button: [
            { flex: 1, backgroundColor: "transparent" },
          ],
        }}
        onPress={handleGoogleLogin}
      />
      </View>
      <Button
        styling={{ button: styles.buttonStyle }}
        title="Sign Up"
        onPress={() => navigate("Auth", { screen: "Register" })}
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
    gap: 15,
  },
  buttonStyle: {
    width: "60%",
  },
  logoStyle: {
    height: "30%",
    aspectRatio: 1,
    resizeMode: "contain",
  },
  loginContainerStyle: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "60%",
  },
});

export default StartScreen;
