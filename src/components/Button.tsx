import React from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  TextStyle,
  ViewStyle,
} from "react-native";
import colors from "@colors";

type ButtonProps = {
  title?: string;
  onPress?: () => void;
  styling?: {
    button?: ViewStyle | ViewStyle[];
    title?: TextStyle | TextStyle[];
  };
  rippleConfig?: {
    color?: string;
    borderless?: boolean;
    radius?: number;
  };
  disabled?: boolean;
};

const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  styling,
  rippleConfig,
  disabled = false,
}) => {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        defaultStyles.buttonStyle,
        colors.primaryButton,
        styling?.button,
        disabled ? defaultStyles.disabledButton : undefined,
        pressed && !disabled && { opacity: 0.9 },
      ]}
      android_ripple={
        !disabled
          ? {
              color: rippleConfig?.color || "rgba(0, 0, 0, 0.2)",
              borderless: rippleConfig?.borderless || false,
              radius: rippleConfig?.radius,
            }
          : undefined
      }
      disabled={disabled}
    >
      <Text
        style={[
          defaultStyles.titleStyle,
          styling?.title,
          disabled ? defaultStyles.disabledTitle : undefined,
        ]}
      >
        {title}
      </Text>
    </Pressable>
  );
};

const defaultStyles = StyleSheet.create({
  titleStyle: {
    color: "#ffffff",
    fontSize: 20,
    padding: 10,
  },
  disabledTitle: {
    color: "#888888",
  },
  buttonStyle: {
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  disabledButton: {
    backgroundColor: "#cccccc",
  },
});

export default Button;
