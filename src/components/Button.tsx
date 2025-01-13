import React from "react";
import {
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
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
};

const Button: React.FC<ButtonProps> = ({ title, onPress, styling }) => {
  return (
    <TouchableOpacity
      style={[defaultStyles.buttonStyle, colors.primaryButton, styling?.button]}
    >
      <Text style={[defaultStyles.titleStyle, styling?.title]}>{title}</Text>
    </TouchableOpacity>
  );
};

const defaultStyles = StyleSheet.create({
  titleStyle: {
    color: "#ffffff",
    fontSize: 20,
    padding: 10,
  },
  buttonStyle: {
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Button;
