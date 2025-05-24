import React from "react";
import { StyleProp, StyleSheet, ViewStyle } from "react-native";
import Animated, { useAnimatedStyle } from "react-native-reanimated";

type AnimatedCardProps = {
  children: React.ReactNode;
  animatedStyle: any;
  style?: StyleProp<ViewStyle>;
};

const AnimatedCard: React.FC<AnimatedCardProps> = ({ children, style, animatedStyle }) => {
  return (
    <Animated.View style={[styles.card, style, animatedStyle]}>
      {children}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    backgroundColor: "#fff",
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
});

export default AnimatedCard;
