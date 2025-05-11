import { globalColors } from "@styling";
import React from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";

type ButtonProps = {
  title?: string;
  onPress?: () => void;
  primary?: boolean;
  styling?: {
    button?: ViewStyle | ViewStyle[];
    title?: TextStyle | TextStyle[];
    icon?: ViewStyle | ViewStyle[];
  };
  rippleConfig?: {
    color?: string;
    borderless?: boolean;
    radius?: number;
  };
  disabled?: boolean;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
};

const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  primary = true,
  styling,
  rippleConfig,
  disabled = false,
  icon,
  iconPosition = "left",
}) => {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        defaultStyles.buttonStyle,
        primary? globalColors.primaryButton: globalColors.secondaryButton,
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
      {icon && iconPosition === "left" && (
        <View style={[defaultStyles.iconStyle, styling?.icon]}>{icon}</View>
      )}
      {title && (
        <Text
          style={[
            defaultStyles.titleStyle,
            styling?.title,
            disabled ? defaultStyles.disabledTitle : undefined,
          ]}
        >
          {title}
        </Text>
      )}
      {icon && iconPosition === "right" && (
        <View style={[defaultStyles.iconStyle, styling?.icon]}>{icon}</View>
      )}
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
  iconStyle: {
    marginHorizontal: 8,
  },
});

export default Button;
