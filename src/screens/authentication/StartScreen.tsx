import React from "react";
import { StyleSheet, View } from "react-native";
import { navigate } from "@navigationService";
import { Button } from "@components";
import Animated, { useAnimatedStyle } from "react-native-reanimated";
import { usePopOutAnimation } from "@hooks";

const StartScreen: React.FC = () => {
  const { scale, opacity } = usePopOutAnimation();
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  return (
    <View style={styles.screenContainer}>
      <Animated.Image source={require("@images/looma-logo_no-bg.png")} style={[styles.logoStyle, animatedStyle]}/>
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
    gap: 15

  },
  buttonStyle: {
    width: "60%",
  },
  logoStyle: {
    height: "30%",
    aspectRatio: 1,
    resizeMode: "contain"
  }
});

export default StartScreen;
