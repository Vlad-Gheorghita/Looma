import React from "react";
import { StyleSheet, TextInput, TextInputProps } from "react-native";

const Input: React.FC<TextInputProps> = ({ style, ...props }) => {
  return (
    <TextInput
      style={[defaultStyles.textInputStyle, style]}
      autoCapitalize="none"
      autoComplete="off"
      {...props}
    />
  );
};

const defaultStyles = StyleSheet.create({
  textInputStyle: {
    marginBottom: 15,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    backgroundColor: "#ffffff",
  },
});

export default Input;
