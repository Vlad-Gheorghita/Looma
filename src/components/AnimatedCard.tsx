import React from "react";
import { Pressable, StyleProp, StyleSheet, ViewStyle } from "react-native";
import Animated, { useAnimatedStyle } from "react-native-reanimated";

type AnimatedCardProps = {
  children: React.ReactNode;
  animatedStyle: any;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
};

const AnimatedCard: React.FC<AnimatedCardProps> = ({
  children,
  style,
  animatedStyle,
  onPress,
}) => {
  const CardContent = () => (
    <Animated.View style={[styles.card, style, animatedStyle]}>
      {children}
    </Animated.View>
  );

  return onPress ? (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [{ opacity: pressed ? 0.8 : 1 }]}
    >
      <CardContent />
    </Pressable>
  ) : (
    <CardContent />
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
