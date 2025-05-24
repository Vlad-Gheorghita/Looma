import { useCardPopOutAnimation } from "@hooks";
import React, { useEffect, useState } from "react";
import {
  Dimensions,
  Pressable,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from "react-native";
import Animated, {
  runOnJS,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

type AnimatedPopupCardProps = {
  children: React.ReactNode;
  visible: boolean;
  onClose: () => void;
  popupStyle?: StyleProp<ViewStyle>;
};

const { width, height } = Dimensions.get("window");

const AnimatedPopupCard: React.FC<AnimatedPopupCardProps> = ({
  children,
  visible,
  popupStyle,
  onClose,
}) => {
  const [shouldRender, setShouldRender] = useState(visible);
  const { scale } = useCardPopOutAnimation(visible);

  useEffect(() => {
    if (visible) {
      setShouldRender(true);
    } else {
      scale.value = withTiming(0, { duration: 200 }, () => {
        runOnJS(setShouldRender)(false);
      });
    }
  }, [visible]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: scale.value,
  }));

  if (!shouldRender) return null;

  return (
    <View style={styles.wrapper}>
      <Pressable style={styles.overlay} onPress={onClose} />

      <Animated.View style={[styles.popup, popupStyle, animatedStyle]}>
        {children}
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    position: "absolute",
    top: 0,
    left: 0,
    width,
    height,
    justifyContent: "center",
    alignItems: "center",
  },

  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.2)",
  },
  popup: {
    width: width * 0.8,
    backgroundColor: "#fff",
    padding: 24,
    borderRadius: 16,
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
});

export default AnimatedPopupCard;
